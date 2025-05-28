import "cypress-file-upload";

describe("가맹점주 회원가입 플로우", () => {
  it("1. 첫 화면 진입 → 회원가입 버튼 클릭 → 약관 동의 화면으로 이동", () => {
    cy.visit("/merchant");
    cy.contains("전자지갑 개설 및 회원가입").click();
    cy.url().should("include", "/merchant/signup");
    cy.contains("모든 약관에 동의합니다").should("be.visible");
    cy.get("button").contains("다음").should("be.disabled");
  });

  it("2. 약관 전체 동의 → 다음 클릭 → 사업자등록증 화면 이동", () => {
    cy.visit("/merchant/signup");
    cy.contains("모든 약관에 동의합니다").click();
    cy.get("button").contains("다음").should("not.be.disabled").click();
    cy.url().should("include", "/merchant/signup/business");
  });

  it("3. 사업자등록증 업로드 → OCR 결과 확인 → 주소 검색 및 카테고리 선택 → 다음 이동", () => {
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

