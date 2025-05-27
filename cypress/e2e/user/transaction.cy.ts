/// <reference types="cypress" />

describe("대시보드 → 전체 거래내역 페이지 이동 및 검색 테스트", () => {
  it("로그인 후 전체 거래내역 보기 클릭 → 검색창에 '토큰' 입력 시 결과 필터링 확인", () => {
    // 1. 로그인
    cy.visit("/login");
    cy.get("#email").type("ryj0330@naver.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();

    // 2. 대시보드 진입 확인
    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    // 3. '전체 거래내역 보기' 버튼 클릭
    cy.contains("전체 거래내역 보기").click();

    // 4. 거래내역 페이지로 이동 확인
    cy.url({ timeout: 10000 }).should("include", "/wallet/totaltransaction");

    // 5. 검색어 '토큰' 입력
    cy.get("input[placeholder='거래내역 검색']").type("토큰");

    // 6. 거래 내역 렌더링될 때까지 대기
    cy.get("[data-cy=transaction-item]", { timeout: 10000 }).should("have.length.greaterThan", 0);

    // 7. 검색 결과가 '토큰' 포함하는지 확인
    cy.get("[data-cy=transaction-item]").each(($el) => {
      cy.wrap($el).should("contain.text", "토큰");
    });
  });
});
