describe("예금 → 토큰 전환 전체 플로우 테스트", () => {
  beforeEach(() => {
    cy.session("logged-in-merchant", () => {
      cy.visit("/merchant/login");
      cy.get("input#businessId").type("746-19-02334");
      cy.get("input#password").type("Test123!!!");
      cy.get("button[type=submit]").click();
      cy.url().should("include", "/merchant/dashboard");
    });

    cy.visit("/merchant/dashboard");
  });

  it("금액 입력 → 전환 → 비밀번호 입력 → 완료", () => {
    // 1. 예금 전환 버튼 클릭
    cy.get("button").contains("예금 전환").click();
    cy.url({ timeout: 10000 }).should("include", "/merchant/wallet/convert");

    // 2. 금액 입력 전에 잔액 로드 대기
    cy.get('[data-testid="amount-input"]').should("be.visible");
    cy.wait(2000);

    // 3. 금액 입력
    cy.get('[data-testid="amount-input"]', { timeout: 10000 })
      .clear()
      .type("100");
    cy.contains("계속하기").click();

    // 4. 전환 정보 확인
    cy.contains("전환하기", { timeout: 10000 }).should("be.visible").click();

    // 5. 비밀번호 입력 (성공)
    const correctPassword = "021128";

    [...correctPassword].forEach((digit) => {
      cy.get(`[data-cy="digit-button-${digit}"]`).click();
    });

    // 6. 완료
    cy.contains("완료", { timeout: 10000 }).should("be.visible");
    cy.contains("지갑으로 돌아가기").click();
    cy.url({ timeout: 10000 }).should("include", "/merchant/wallet");
  });
});
