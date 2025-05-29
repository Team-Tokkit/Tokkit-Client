import "cypress-file-upload";

describe("가맹점주 회원가입 테스트 플로우", () => {
  it("1. 첫 화면 진입 - 회원가입 버튼 클릭 → 약관 동의 화면으로 이동", () => {
    cy.visit("/merchant");
    cy.contains("전자지갑 개설 및 회원가입").click();
    cy.url().should("include", "/merchant/signup");
    cy.contains("모든 약관에 동의합니다").should("be.visible");
    cy.get("button").contains("다음").should("be.disabled");
  });

  it("2. 약관 동의 - 사업자등록증 화면으로 이동", () => {
    cy.visit("/merchant/signup");
    cy.contains("모든 약관에 동의합니다").click();
    cy.get("button").contains("다음").should("not.be.disabled").click();
    cy.url().should("include", "/merchant/signup/business");
  });

  it("3. 사업자등록증 업로드 - OCR 결과 확인 → 주소 검색 및 카테고리 선택", () => {
    cy.intercept("POST", "/api/ocr/business", {
      statusCode: 200,
      body: {
        isSuccess: true,
        code: "COMMON200",
        message: "성공입니다",
        result: {
          businessNumber: "111-11-11111",
          storeName: "테스트 상점",
          representativeName: "홍길동",
          roadAddress: "서울특별시 종로구",
        },
      },
    }).as("ocrMock");

    // 사업자등록증 이미지로 선택
    cy.visit("/merchant/signup/business");
    cy.contains("이미지 업로드").click();

    cy.get('input[type="file"]').attachFile("사업자등록증_예시.png", {
      force: true,
    });
    cy.wait("@ocrMock");
    cy.wait(1000);

    // OCR 결과 확인
    cy.get('[data-cy="business-number-input"]').should(
      "have.value",
      "111-11-11111"
    );
    cy.get('[data-cy="store-name-input"]').should("have.value", "테스트 상점");
    cy.get('[data-cy="representative-name-input"]').should(
      "have.value",
      "홍길동"
    );
    cy.get('[data-cy="road-address-input"]').should(
      "have.value",
      "서울특별시 종로구"
    );

    // 주소 검색
    cy.get('[data-cy="road-address-input"]').click();
    cy.get('[data-cy="address-search-keyword-input"]')
      .clear()
      .type("서울특별시 종로구");
    cy.get('[data-cy="address-search-button"]').click();

    cy.get('[data-cy="address-result-item"]', { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );

    cy.get('[data-cy="road-address-input"]').should("include.value", "서울");

    // 시/도, 시/군/구, 카테고리 선택
    cy.get('[data-cy="sido-select"]').click();
    cy.contains('[role="option"]', "서울특별시", { timeout: 5000 }).click();

    cy.get('[data-cy="sigungu-select"]').click();
    cy.contains('[role="option"]', "종로구", { timeout: 5000 }).click();

    cy.get('[data-cy="category-select"]').click();
    cy.contains('[role="option"]', "서비스", { timeout: 5000 }).click();

    // 다음 화면으로 이동
    cy.get("button").contains("다음").should("not.be.disabled").click();
    cy.url().should("include", "/merchant/signup/wallet");
  });
});

describe("전자지갑 개설 테스트 플로우", () => {
  it("1. 약관 동의 → 본인인증 페이지 이동", () => {
    cy.visit("/merchant/signup/wallet/terms");
    cy.contains("모든 약관에 동의합니다").click();
    cy.get("button").contains("다음").should("not.be.disabled").click();
    cy.url().should("include", "/merchant/signup/wallet/verify");
  });

  it("2. 전자지갑 본인인증 - 신분증 이미지 업로드 후 OCR → 리뷰 페이지 이동", () => {
    cy.intercept("POST", "**/ocr/**", {
      statusCode: 200,
      body: {
        isSuccess: true,
        code: "COMMON200",
        message: "성공입니다",
        result: {
          name: "둘리",
          rrnFront: "830422",
          rrnBack: "1185600",
          issuedDate: "20030422",
        },
      },
    }).as("mockOcr");

    cy.visit("/merchant/signup/wallet/verify");
    cy.contains("이미지 업로드").click();
    cy.get('input[type="file"]').attachFile("신분증_예시.png", { force: true });
    cy.wait("@mockOcr");

    cy.get('[data-cy="name-input"]').should("have.value", "둘리");
    cy.get('[data-cy="resident-id-front-input"]').should(
      "have.value",
      "830422"
    );
    cy.get('[data-cy="resident-id-back-input"]').should(
      "have.value",
      "1******"
    );

    cy.get('[data-cy="issue-date-input"]').should("have.value", "20030422");

    cy.get('[data-cy="submit-button"]').click();
    cy.url().should("include", "/merchant/signup/wallet/contact");
  });

  it("3. 연락처 입력 - 이메일 인증, 비밀번호 설정, 전화번호 입력 후 다음 이동", () => {
    // 인터셉트는 visit 전에 선언
    cy.intercept("POST", "**/merchants/emailCheck**", {
      statusCode: 200,
      body: { isSuccess: true },
    }).as("mockEmailCheck");

    cy.intercept("POST", "**/merchants/verification", {
      statusCode: 200,
      body: { isSuccess: true },
    }).as("mockEmailVerify");

    cy.visit("/merchant/signup/wallet/contact");

    // 이메일 입력 및 인증 요청
    cy.get("input#email").type("test@example.com");
    cy.contains("인증요청").click();
    cy.wait("@mockEmailCheck");

    // 인증코드 입력
    cy.get("input#verificationCode", { timeout: 5000 })
      .should("exist")
      .type("123456");
    cy.contains("확인").click();
    cy.wait("@mockEmailVerify");

    // 비밀번호, 전화번호 입력
    cy.get("input#password").type("Abcde!12");
    cy.get("input#confirmPassword").type("Abcde!12");
    cy.get("input#phoneNumber").type("010-1234-5678");

    // 다음 버튼 클릭 및 이동
    cy.get("button").contains("다음").should("not.be.disabled").click();
    cy.url().should("include", "/merchant/signup/wallet/password");
  });

  it("4. 간편 비밀번호 설정 - 6자리 숫자 입력 2회 후 완료 → 완료 페이지 이동", () => {
    cy.visit("/merchant/signup/wallet/password", {
      onBeforeLoad(win) {
        win.sessionStorage.setItem(
          "signupPayload",
          JSON.stringify({
            name: "둘리",
            email: "test@example.com",
            password: "Abcde!12",
            phoneNumber: "01012345678",
          })
        );
        win.sessionStorage.setItem(
          "businessInfo",
          JSON.stringify({
            businessNumber: "1234567890",
            storeName: "테스트상점",
            roadAddress: "서울시 중구",
            sido: "서울특별시",
            sigungu: "중구",
            storeCategory: "서비스",
          })
        );
      },
    });

    const password = "123456";

    // 간편 비밀번호 
    [...password].forEach((digit) => {
      cy.get(`[data-cy="digit-button-${digit}"]`).click();
    });

    cy.contains("간편 비밀번호 재입력").should("be.visible");

    [...password].forEach((digit) => {
      cy.get(`[data-cy="digit-button-${digit}"]`).click();
    });
  });
});
