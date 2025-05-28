describe("결제하기 버튼 테스트", () => {
  it("토큰 → 바우처 순 결제 시나리오 (QR 수동 입력 포함)", () => {
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

    cy.contains("결제 완료", { timeout: 10000 }).should("be.visible");
    cy.contains("확인").click();

    cy.visit("/payment");
    cy.url().should("include", "/payment");

    cy.contains("QR 코드 인식이 안되나요?").click();
    cy.get('[data-cy="manual-transaction-input"]').type("m104s682025");
    cy.contains("확인").click();
    
    cy.get('[data-testid="carousel-next-button"]', { timeout: 10000 })
      .should("exist")
      .should("be.visible")
      .click();

    cy.contains("결제 금액 입력", { timeout: 10000 }).should("be.visible");

    cy.get('[data-testid="amount-input"]', { timeout: 10000 }).should("be.visible").clear().type("100");
    cy.get('[data-testid="amount-submit-button"]').click();

    cy.contains("간편 비밀번호 입력").should("be.visible");
    [..."123456"].forEach((digit) => {
      cy.contains(digit).click();
    });

    cy.contains("결제 완료", { timeout: 10000 }).should("be.visible");
    cy.contains("확인").click();
  });
});
