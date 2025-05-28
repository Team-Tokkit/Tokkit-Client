describe("로그인 후 바우처 구매 및 상세 보기 플로우 통합 테스트", () => {
  it("바우처 구매 후 상세 진입 및 전체 사용처 보기", () => {
    cy.visit("/login");
    cy.get("#email").type("ryj0330@naver.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    cy.contains("바우처").click();
    cy.url().should("include", "/vouchers");

    cy.get("button").contains("구매하기").first().click();
    cy.url({ timeout: 10000 }).should("include", "/vouchers/purchase");

    cy.contains("결제하기", { timeout: 10000 }).click();
    cy.url({ timeout: 10000 }).should("include", "/vouchers/purchase/verify");

    const password = "123456";
    password.split("").forEach((num) => {
      cy.get("button").contains(num).click();
    });

    cy.url({ timeout: 10000 }).should("include", "/wallet/voucher/purchase");
    cy.contains("바우처 구매 성공", { timeout: 10000 }).should("be.visible");

    cy.visit("/vouchers");
    cy.url().should("include", "/vouchers");

    cy.get("[data-cy=voucher-card]").first().click();
    cy.url({ timeout: 10000 }).should("include", "/vouchers/details");

    cy.contains("전체 보기", { timeout: 10000 }).should("be.visible").click();
    cy.contains("전체 사용처").should("be.visible");
    cy.get("ul").find("li").should("have.length.greaterThan", 0);
  });
});
