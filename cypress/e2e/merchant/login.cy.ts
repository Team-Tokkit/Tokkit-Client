describe("가맹점주 로그인 테스트 플로우", () => {
  beforeEach(() => {
    cy.visit("/merchant/login");
  });

  it("1. 유효한 사업자번호와 비밀번호로 로그인 성공 → 대시보드 이동", () => {
    cy.get("input#businessId").type("123-45-67891");
    cy.get("input#password").type("Dlwjdals3022@");
    cy.get("button[type=submit]").contains("로그인").click();

    cy.url({ timeout: 10000 }).should("include", "/merchant/dashboard");
  });

  it("2. 비밀번호가 틀린 경우 로그인 실패 및 알림 확인", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });

    cy.get("input#businessId").type("123-45-67891");
    cy.get("input#password").type("wrongPassword123!");
    cy.get("button[type=submit]").contains("로그인").click();

    cy.get("@alertStub").should("have.been.calledOnce");
    cy.get("@alertStub").should(
      "have.been.calledWith",
      "자격 증명에 실패하였습니다."
    );
  });

  it("3. 사업자번호 또는 비밀번호 미입력 시 submit 버튼 비활성은 아니지만, HTML required로 막힘", () => {
    cy.get("input#businessId").should("exist");
    cy.get("input#password").should("exist");

    // 한쪽만 입력
    cy.get("input#businessId").type("123-45-67891");
    cy.get("button[type=submit]").click();
    cy.get("input#password:invalid").should("have.length", 1);

    // 다른 쪽만 입력
    cy.get("input#businessId").clear();
    cy.get("input#password").type("Dlwjdals3022@");
    cy.get("button[type=submit]").click();
    cy.get("input#businessId:invalid").should("have.length", 1);
  });
});
