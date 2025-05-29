describe("전자지갑 페이지 통합 테스트", () => {
  it("지갑 정보, 거래내역, 안내 버튼 동작 확인", () => {
    cy.session("logged-in-merchant", () => {
      cy.visit("/merchant/login");
      cy.get("#businessId").type("746-19-02334");
      cy.get("#password").type("Test123!!!");
      cy.get("button[type=submit]").click();
      cy.url().should("include", "/merchant/dashboard");
    });

    cy.visit("/merchant/wallet");

    // 지갑 정보 확인
    cy.contains("님의 지갑").should("exist");
    cy.contains("TKT").should("exist");
    cy.contains("원").should("exist");

    // 예금 전환 버튼
    cy.contains("예금으로 전환하기").should("be.visible").click();
    cy.url().should("include", "/merchant/wallet/convert");
    cy.go("back");

    // 전체 거래내역 보기 버튼
    cy.contains("전체 거래내역 보기").click({ force: true });
    cy.url().should("include", "/merchant/wallet/totaltransaction");
    cy.go("back");

    // 전자지갑 이용 안내 버튼
    cy.contains("전자지갑 이용 안내").click({ force: true });
    cy.url().should("include", "/merchant/wallet/guide");
    cy.go("back");
  });
});
