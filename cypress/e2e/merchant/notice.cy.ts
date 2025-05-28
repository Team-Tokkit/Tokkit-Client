describe("가맹점 공지사항 테스트 플로우", () => {
  beforeEach(() => {
    cy.session("logged-in-merchant", () => {
      cy.visit("/merchant/login");
      cy.get("input#businessId").type("123-45-67891");
      cy.get("input#password").type("Dlwjdals3022@");
      cy.get("button[type=submit]").click();
      cy.url().should("include", "/merchant/dashboard");
    });

    cy.visit("/merchant/dashboard");
  });

  it("공지사항 전체보기 → 상세 → 목록 → 대시보드", () => {
    // 1. 대시보드 → 공지사항 전체보기
    cy.contains("전체보기").click();
    cy.url().should("include", "/merchant/notice");
    cy.contains("공지사항").should("be.visible");

    // 2. 공지사항 클릭 → 상세페이지
    cy.get('[data-cy^="notice-item-"]').first().should("be.visible").click();
    cy.url().should("match", /\/merchant\/notice\/\d+\?page=\d+/);
    cy.get("h2", { timeout: 10000 }).should("be.visible");

    // 3. ← 상세 → 목록
    cy.get('[data-testid="back-button"]').click();
    cy.url().should("include", "/merchant/notice");
    cy.contains("공지사항").should("be.visible");

    // 4. ← 목록 → 대시보드
    cy.get('[data-testid="back-button"]').click();
    cy.url().should("include", "/merchant/dashboard");

    // 5. 대시보드 진입 검증
    cy.contains("예금 전환", { timeout: 10000 }).should("be.visible");
  });
});
