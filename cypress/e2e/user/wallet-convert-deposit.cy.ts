describe("예금 → 토큰 전환 전체 플로우 테스트", () => {
  it("금액 입력 → 전환 → 비밀번호 입력 → 완료까지 진행", () => {
    cy.visit("/login");
    cy.get("#email").type("ryj0330@naver.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();

    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    cy.contains("님의 지갑").click();
    cy.url().should("include", "/wallet");

    cy.get('[data-testid="convert-token-to-deposit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/wallet/convert/token-to-deposit");

    cy.get('[data-testid="amount-input"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type("100");

    cy.contains("계속하기").click();

    cy.contains("전환하기", { timeout: 10000 }).should("be.visible").click();

    const password = "123456";
    [...password].forEach((digit) => {
      cy.contains(digit).click();
    });

    cy.contains("완료", { timeout: 10000 }).should("be.visible");

    cy.contains("지갑으로 돌아가기").click();

    cy.url({ timeout: 10000 }).should("include", "/wallet");
  });
});
