describe("로그인 테스트", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("이메일과 비밀번호 입력 후 로그인 성공", () => {
    cy.get("#email").should("be.visible").type("ryj0330@naver.com");
    cy.get("#password").should("be.visible").type("1234");

    cy.get("form").submit();

    cy.url({ timeout: 10000 }).should("include", "/dashboard");
  });
});
