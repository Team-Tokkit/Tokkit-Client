import "cypress-file-upload";

it("1. 첫 화면 진입 -> 회원가입 버튼 클릭 -> 약관 동의 화면으로 이동", () => {
  // 첫 화면 접속
  cy.visit("/merchant");
  cy.contains("전자지갑 개설 및 회원가입").click();

  // 약관 동의 페이지로 이동 확인
  cy.url().should("include", "/merchant/signup");

  // 약관 관련 요소 확인
  cy.contains("모든 약관에 동의합니다").should("be.visible");
  cy.get("button").contains("다음").should("be.disabled");
});

it("2. 약관 전체 동의 시 다음 버튼 활성화 및 사업자등록증 화면으로 이동", () => {
  // 약관 동의 페이지 진입
  cy.visit("/merchant/signup");

  // 전체 약관 체크 (직접)
  cy.contains("모든 약관에 동의합니다").click();

  // 다음 버튼 활성화 후 클릭
  cy.get("button").contains("다음").should("not.be.disabled").click();

  // 사업자등록증 화면으로 이동했는지 확인
  cy.url().should("include", "/merchant/signup/business");
});

it("3. 이미지 업로드 → OCR → 시군구/카테고리 선택 → 다음 화면 이동", () => {
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

  cy.visit("/merchant/signup/business");
  cy.contains("이미지 업로드").click();

  // 파일 업로드 후 OCR 대기
  cy.get('input[type="file"]').attachFile("사업자등록증_예시.png", {
    force: true,
  });
  cy.wait("@ocrMock");
  cy.wait(1000);

  // OCR 값 확인
  cy.get('input[placeholder="0000000000"]')
    .invoke("val")
    .should("eq", "111-11-11111");
  cy.get('input[placeholder="상호명을 입력하세요"]')
    .invoke("val")
    .should("eq", "테스트 상점");
  cy.get('input[placeholder="대표자명을 입력하세요"]')
    .invoke("val")
    .should("eq", "홍길동");
  cy.get('input[placeholder="주소 검색 버튼을 클릭하세요"]')
    .invoke("val")
    .should("eq", "서울특별시 종로구");

  // ✅ 시/도, 시/군/구, 카테고리 선택
  cy.contains("시/도 선택").click();
  cy.get("body").should("have.css", "pointer-events", "auto");
  cy.contains("서울특별시").click();

  cy.contains("시/군/구 선택").click();
  cy.get("body").should("have.css", "pointer-events", "auto");
  cy.contains("종로구").click();

  cy.contains("카테고리 선택").click();
  cy.get("body").should("have.css", "pointer-events", "auto");
  cy.contains("서비스").click();

  cy.get("button").contains("다음").should("not.be.disabled").click();
  cy.url().should("include", "/merchant/signup/wallet");
});
