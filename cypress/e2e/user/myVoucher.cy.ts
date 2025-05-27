/// <reference types="cypress" />

describe("내 바우처 리스트, 필터, 검색 기능 테스트", () => {
  it("로그인 후 /my-vouchers 진입 → 리스트 확인 및 필터/검색 작동 확인", () => {
    // 1. 로그인
    cy.visit("/login");
    cy.get("#email").type("dlwjdals0726@gmail.com");
    cy.get("#password").type("Nji0Zd");
    cy.get("form").submit();
    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    // 2. 내 바우처 페이지로 이동
    cy.contains("내 바우처").click();
    cy.url().should("include", "/my-vouchers");

    // 3. 내 바우처 리스트가 1개 이상 렌더링되는지 확인
    cy.get("[data-cy=my-voucher-card]").should("have.length.greaterThan", 0);

    // 4. 필터 탭: 금액순 클릭
    cy.contains("금액순").click();
    cy.url().should("include", "sort=amount");

    // 5. 필터 탭: 만료순 클릭
    cy.contains("만료순").click();
    cy.url().should("include", "sort=expiry");

    // 6. 필터 탭: 최신순 클릭
    cy.contains("최신순").click();
    cy.url().should("include", "sort=recent");

    // 7. 검색바에 "시그니엘" 입력 후 검색 결과 확인
    cy.get("input[placeholder='바우처 검색']").clear().type("시그니엘");

    // 8. 검색 결과가 나타날 때까지 기다리고 확인
    cy.get("[data-cy=my-voucher-card]", { timeout: 10000 }).should("exist");
  });
});
