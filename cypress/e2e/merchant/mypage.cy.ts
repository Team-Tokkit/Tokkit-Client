describe("가맹점주 마이페이지 테스트 플로우", () => {
  beforeEach(() => {
    cy.session("logged-in-merchant", () => {
      cy.visit("/merchant/login");
      cy.get("input#businessId").type("746-19-02334");
      cy.get("input#password").type("Test123!!!");
      cy.get("button[type=submit]").click();
      cy.url().should("include", "/merchant/dashboard");
    });

    cy.visit("/merchant/mypage");
    cy.url().should("include", "/merchant/mypage");
  });

  it("마이페이지 각 메뉴 테스트", () => {
    // 1. QR 코드 확인, 결제 내역, 공지사항 메뉴 클릭
    cy.contains("QR코드 확인하기").click();
    cy.url().should("include", "/merchant/mypage/qr-code");
    cy.go("back");

    cy.contains("결제 내역").click();
    cy.url().should("include", "/merchant/wallet/totaltransaction");
    cy.go("back");

    cy.contains("공지사항").click();
    cy.url().should("include", "/merchant/notice");
    cy.go("back");

    // 2. 비밀번호 변경 테스트
    cy.contains("비밀번호 변경").click();
    cy.url().should("include", "/merchant/mypage/change-password");

    cy.contains("현재 비밀번호").should("be.visible");

    cy.get('[data-cy="current-password-input"]').type("Test123!!!");
    cy.get('[data-cy="new-password-input"]').type("Test456!!!");
    cy.get('[data-cy="confirm-password-input"]').type("Test456!!!");

    cy.get("button[type=submit]").click();

    cy.contains("비밀번호가 성공적으로 변경되었습니다").should("be.visible");
    cy.get('[data-cy="complete-button"]').should("be.visible").click();
    cy.url().should("include", "/merchant/mypage");

    // 3. 간편 비밀번호 변경
    cy.contains("간편 비밀번호 변경").click();
    cy.url().should("include", "/merchant/mypage/change-simple-password");

    [..."021128"].forEach((digit) => {
      cy.get(`[data-cy="digit-button-${digit}"]`).click();
    });
    cy.get('[data-cy="submit-button"]').click();

    [..."111111"].forEach((digit) => {
      cy.get(`[data-cy="digit-button-${digit}"]`).click();
    });
    cy.get('[data-cy="submit-button"]').click();

    [..."111111"].forEach((digit) => {
      cy.get(`[data-cy="digit-button-${digit}"]`).click();
    });
    cy.get('[data-cy="submit-button"]').click();

    cy.contains("간편 비밀번호가 성공적으로 변경되었습니다.").should(
      "be.visible"
    );
    cy.get('[data-cy="complete-button"]').click();
    cy.url().should("include", "/merchant/mypage");
  });
});
