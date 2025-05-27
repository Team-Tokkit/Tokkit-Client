// 공지사항 전체 조회 및 상세 조회

describe("공지사항 전체보기 및 상세 이동 테스트", () => {
  it("대시보드 → 전체보기 → 공지사항 아이템 클릭 → 상세페이지 진입", () => {
    cy.visit("/login");
    cy.get("#email").type("ryj0330@naver.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();

    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    cy.contains("전체보기").should("be.visible").click();
    cy.url({ timeout: 10000 }).should("include", "/notice");

    cy.get('[data-testid^="notice-item-"]').first().click();

    cy.url({ timeout: 10000 }).should("match", /\/notice\/\d+\?page=\d+/);
  });
});
