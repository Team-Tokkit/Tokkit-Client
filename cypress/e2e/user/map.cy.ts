describe("가맹점 지도 핀/목록/내 위치 기능 테스트", () => {
  it("지도 핀 클릭, 목록 보기 클릭, 목록 아이템 클릭, 내 위치 이동 확인", () => {
    cy.visit("/login");

    cy.get("#email").type("dlwjdals0726@gmail.com");
    cy.get("#password").type("Password@!");
    cy.get("form").submit();
    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    cy.contains("가맹점").click();
    cy.url({ timeout: 10000 }).should("include", "/offline-stores");

    cy.contains("이 지역 재검색", { timeout: 20000 })
      .should("be.visible")
      .should("not.be.disabled");

    cy.get("img[src*='marker']").first().click({ force: true });

    cy.contains("목록 보기").click();

    cy.get("[data-cy=store-list-item]").first().click();

    cy.get('[aria-label="locate-button"]').click({ force: true });
  });
});
