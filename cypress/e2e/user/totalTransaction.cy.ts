/// <reference types="cypress" />

describe("대시보드 → 전체 거래내역 페이지 검색 및 필터링 테스트", () => {
  it("검색어, 거래유형 필터, 조회기간 필터 적용 흐름 확인", () => {
    // 1. 로그인
    cy.visit("/login");
    cy.get("#email").type("ryj0330@naver.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    // 2. '전체 거래내역 보기' 클릭
    cy.contains("전체 거래내역 보기").click();
    cy.url({ timeout: 10000 }).should("include", "/wallet/totaltransaction");

    // 3. 검색어 '토큰' 입력
    cy.get("input[placeholder='거래내역 검색']").type("토큰");

    // 4. 검색 결과 확인
    cy.get("[data-cy=transaction-item]", { timeout: 10000 }).should("have.length.greaterThan", 0);
    cy.get("[data-cy=transaction-item]").each(($el) => {
      cy.wrap($el).should("contain.text", "토큰");
    });

    // 5. 검색어 삭제
    cy.get("input[placeholder='거래내역 검색']").clear();

    // 6. 거래유형 필터 '결제' 선택
    cy.get('[data-cy=type-select]').first().click();
    cy.get('[data-cy=type-option-결제]').click();
    cy.wait(1000);
    cy.get("[data-cy=transaction-item]").should("have.length.greaterThan", 0);

    // 7. 거래유형 필터 다시 열고 '변환' 선택
    cy.get('[data-cy=type-select]').first().click();
    cy.get('[data-cy=type-option-변환]').click();
    cy.wait(1000);
    cy.get("[data-cy=transaction-item]").should("have.length.greaterThan", 0);

    // 8. 거래유형 필터 다시 열고 '전체' 선택
    cy.get('[data-cy=type-select]').first().click();
    cy.get('[data-cy=type-option-전체]').click();
    cy.wait(1000);
    cy.get("[data-cy=transaction-item]").should("have.length.greaterThan", 0);

    // 9. 조회 기간 필터 '최근 1주일' 선택
    cy.get('[data-cy=type-select]').eq(1).click(); 
    cy.get('[data-cy=type-option-최근\\ 1주일]').click();
    cy.wait(1000);
    cy.get("[data-cy=transaction-item]").should("have.length.greaterThan", 0);

    // 10. 조회 기간 필터 '최근 1개월' 선택
    cy.get('[data-cy=type-select]').eq(1).click();
    cy.get('[data-cy=type-option-최근\\ 1개월]').click();
    cy.wait(1000);
    cy.get("[data-cy=transaction-item]").should("have.length.greaterThan", 0);

    // 11. 조회 기간 필터 '전체 기간' 선택
    cy.get('[data-cy=type-select]').eq(1).click();
    cy.get('[data-cy=type-option-전체\\ 기간]').click();
    cy.wait(1000);
    cy.get("[data-cy=transaction-item]").should("have.length.greaterThan", 0);
  });
});
