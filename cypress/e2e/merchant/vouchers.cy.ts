describe("가맹점 바우처 페이지 통합 테스트", () => {
  beforeEach(() => {
    cy.session("logged-in-merchant", () => {
      cy.visit("/merchant/login");
      cy.get("input#businessId").type("746-19-02334");
      cy.get("input#password").type("Test123!!!");
      cy.get("button[type=submit]").click();
      cy.url().should("include", "/merchant/dashboard");
    });
  });

  it("바우처 목록 -> 바우처 검색 -> 검색 확인", () => {
    // 1. 대시보드에서 바우처 목록 버튼 클릭
    cy.visit("/merchant/dashboard");
    cy.contains("바우처 목록").click();
    cy.url().should("include", "/merchant/vouchers");

    // 2. 검색 기능 테스트
    cy.get('input[placeholder="바우처 검색"]').type("시그니엘");
    cy.intercept("GET", "/api/merchants/vouchers*").as("getVouchers");
    cy.wait("@getVouchers", { timeout: 10000 });

    // 3. 바우처 목록이 제대로 표시되는지 확인
    cy.get("h3", { timeout: 10000 }).should("have.length.greaterThan", 0);

    // 4. 검색 결과가 있는 경우 확인
    cy.get("p").should("contain", "시그니엘");

    // 5. 검색 결과가 없을 경우 확인
    cy.get('input[placeholder="바우처 검색"]').clear().type("우리FISA");
    cy.wait("@getVouchers", { timeout: 10000 });
    cy.get(".no-results-message").should("contain", "검색 결과가 없습니다");
  });
});
