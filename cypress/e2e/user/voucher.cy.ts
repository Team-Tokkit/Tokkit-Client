/// <reference types="cypress" />

describe("로그인 후 바우처 구매 및 상세 보기 플로우 통합 테스트", () => {
  it("구매 페이지 진입 후 뒤로가기 → 바우처 상세 진입 및 전체 사용처 보기", () => {
    // 1. 로그인 → 대시보드
    cy.visit("/login");
    cy.get("#email").type("dlwjdals0726@gmail.com");
    cy.get("#password").type("Nji0Zd");
    cy.get("form").submit();
    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    // 2. 바우처 페이지 이동
    cy.contains("바우처").click();
    cy.url().should("include", "/vouchers");

    // 3. 리스트에서 구매하기 버튼 클릭 → 구매 페이지 이동
    cy.get("button").contains("구매하기").first().click();
    cy.url({ timeout: 10000 }).should("include", "/vouchers/purchase");

    // 4. 뒤로가기 → 다시 바우처 리스트 페이지
    cy.go("back");
    cy.url().should("include", "/vouchers");

    // 5. 바우처 카드 클릭 → 상세 페이지 진입
    cy.get("[data-cy=voucher-card]").first().click();
    cy.url({ timeout: 10000 }).should("include", "/vouchers/details");

    // 6. 전체 사용처 보기 버튼 클릭 → 모달 열림 및 항목 확인
    cy.contains("전체 보기", { timeout: 10000 }) // ✅ 버튼이 나타날 때까지 기다림
      .should("be.visible")
      .click();

    cy.contains("전체 사용처").should("be.visible");
    cy.get("ul").find("li").should("have.length.greaterThan", 0);
  });
});
