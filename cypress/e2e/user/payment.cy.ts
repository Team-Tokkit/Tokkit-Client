describe("결제하기 버튼 테스트", () => {
  it("대시보드에서 결제하기 버튼 클릭 후 수동 입력으로 이동 및 자동 입력 확인", () => {
    cy.visit("/login");
    cy.get("#email").type("ryj0330@naver.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();

    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    cy.get('[data-testid="floating-payment-button"]').click();
    cy.url({ timeout: 10000 }).should("include", "/payment");

    cy.contains("QR 코드 인식이 안되나요?").click();

    cy.get('[data-cy="manual-transaction-input"]').type("m104s682025");
    cy.contains("확인").click();

    cy.get('[data-testid="amount-input"]', { timeout: 10000 }).should("be.visible").clear().type("100");
    cy.get('[data-testid="amount-submit-button"]').click();

    cy.contains("간편 비밀번호 입력").should("be.visible");

    [..."123456"].forEach((digit) => {
      cy.contains(digit).click();
    });
  });
});
