// 마이페이지 비밀번호 / 간편 비밀번호 변경 테스트 

describe("마이페이지 비밀번호 및 간편 비밀번호 변경 테스트", () => {
  it("비밀번호 변경 완료 후 마이페이지로 돌아가서 간편 비밀번호 변경", () => {
    cy.visit("/login");
    cy.get("#email").type("Dlwjdals0726@gmail.com");
    cy.get("#password").type("Password@!");
    cy.get("form").submit();

    cy.url({ timeout: 10000 }).should("include", "/dashboard");

    cy.get('[data-testid="user-button"]').click();
    cy.url({ timeout: 10000 }).should("include", "/mypage");

    cy.contains("비밀번호 변경").click();
    cy.url().should("include", "/mypage/change-password");
    cy.get('[data-testid="input-current"]').type("Password@!");
    cy.get('[data-testid="input-new"]').type("Password@");
    cy.get('[data-testid="input-confirm"]').type("Password@");
    cy.get('[data-testid="submit-button"]').click();
    cy.contains("비밀번호가 성공적으로 변경되었습니다.").should("be.visible");

    cy.contains("마이페이지로 돌아가기").click();
    cy.url().should("include", "/mypage");

    cy.contains("간편 비밀번호 변경").click();
    cy.url().should("include", "/mypage/change-pin");

    [..."222222"].forEach((digit) => {
      cy.contains(digit).click();
    });

    cy.contains("새 비밀번호 입력").should("be.visible");
    [..."111111"].forEach((digit) => {
      cy.contains(digit).click();
    });

    cy.contains("비밀번호 확인").should("be.visible");
    [..."111111"].forEach((digit) => {
      cy.contains(digit).click();
    });

    cy.contains("간편 비밀번호가 성공적으로 변경되었습니다").should("be.visible");


  });
});
