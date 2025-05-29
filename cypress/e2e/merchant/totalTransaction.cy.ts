describe("가맹점 전체 거래내역 페이지 테스트", () => {
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

  it("검색, 캘린더, 새로고침 통합 테스트", () => {
    // 1. 전체 거래내역 페이지 이동
    cy.contains("전체 거래내역 보기").click();
    cy.url().should("include", "/merchant/wallet/totaltransaction");

    // 2. 검색어 필터 테스트
    cy.get("input[placeholder='가맹점 검색']").clear().type("시");
    cy.contains("바우처 정산", { timeout: 3000 }).should("be.visible");

    cy.get("input[placeholder='가맹점 검색']").clear().type("없는 검색어");
    cy.contains("표시할 거래 내역이 없습니다.").should("be.visible");

    // ** 새로고침
    cy.intercept("GET", "/api/merchants/wallet/transactions").as(
      "refreshRequest"
    );
    cy.get("[data-testid='refresh-button']").click();
    cy.wait("@refreshRequest");

    // 3. 캘린더 테스트
    // 거래 내역 없을 때
    cy.get("[data-testid='calendar-trigger']").click();
    cy.get(".rdp").should("be.visible");
    cy.get("button[role='gridcell']").contains(/^7$/).click();
    cy.get("button[role='gridcell']").contains(/^9$/).click();
    cy.contains("표시할 거래 내역이 없습니다.").should("be.visible");
    cy.get("[data-cy^='transaction-item-']").should("not.exist");

    // 거래 내역 있을 때
    cy.get("[data-testid='calendar-trigger']").click();
    cy.get(".rdp").should("be.visible");
    cy.get("button[role='gridcell']").contains(/^22$/).click();
    cy.get("button[role='gridcell']").contains(/^24$/).click();

    // ** 새로고침
    cy.intercept("GET", "/api/merchants/wallet/transactions").as(
      "refreshRequest"
    );
    cy.get("[data-testid='refresh-button']").click();
    cy.wait("@refreshRequest");

    // 4. 거래 유형, 기간 설정 필터 테스트
    cy.contains("전체").click();
    cy.get("[role='option']").contains("변환").click();

    cy.contains("전체 기간").click();
    cy.get("[role='option']").contains("최근 1주일").click();

    // 5. 거래 상세 페이지로 이동
    cy.get("div.rounded-lg.border").first().click();
    cy.url().should("include", "/merchant/wallet/totaltransaction/");
    cy.contains("상세 내역").should("be.visible");
  });
});
