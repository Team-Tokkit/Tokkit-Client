describe("내 바우처 리스트, 필터, 검색 기능 테스트", () => {
  it("로그인 후 /my-vouchers 진입 → 리스트 확인 및 필터/검색 작동 확인", () => {
    cy.visit("/login");
    cy.get("#email").type("ryj0330@naver.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    cy.contains("내 바우처").click();
    cy.url().should("include", "/my-vouchers");

    cy.get("[data-cy=my-voucher-card]").should("have.length.greaterThan", 0);

    cy.contains("금액순").click();
    cy.url().should("include", "sort=amount");

    cy.contains("만료순").click();
    cy.url().should("include", "sort=expiry");

    cy.contains("최신순").click();
    cy.url().should("include", "sort=recent");

    cy.get("input[placeholder='바우처 검색']").clear().type("시그니엘");

    cy.get("[data-cy=my-voucher-card]", { timeout: 10000 }).should("exist");
  });
});
