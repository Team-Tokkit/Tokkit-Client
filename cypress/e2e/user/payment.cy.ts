describe("결제하기 버튼 테스트", () => {
  it("토큰 → 바우처 순 결제 시나리오 (QR 수동 입력 포함)", () => {
    cy.visit("/login");
    cy.get("#email").type("ryj0330@naver.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();

    // 대시보드 진입 후 결제 페이지 이동
    cy.url({ timeout: 10000 }).should("include", "/dashboard");
    cy.get('[data-testid="floating-payment-button"]').click();
    cy.url({ timeout: 10000 }).should("include", "/payment");

    // 수동 입력 모드 진입 및 거래 ID 입력
    cy.contains("QR 코드 인식이 안되나요?").click();
    cy.get('[data-cy="manual-transaction-input"]').type("m104s682025");
    cy.contains("확인").click();

    // 금액 입력 후 결제하기
    cy.get('[data-testid="amount-input"]', { timeout: 10000 }).should("be.visible").clear().type("100");
    cy.get('[data-testid="amount-submit-button"]').click();

    // 간편 비밀번호 입력
    cy.contains("간편 비밀번호 입력").should("be.visible");
    [..."123456"].forEach((digit) => {
      cy.contains(digit).click();
    });

    // 결제 완료까지 기다림
    cy.contains("결제 완료", { timeout: 10000 }).should("be.visible");
    cy.contains("확인").click();

    // 다시 /payment로 이동
    cy.visit("/payment");
    cy.url().should("include", "/payment");

    // 다시 수동 입력 → 동일 거래번호
    cy.contains("QR 코드 인식이 안되나요?").click();
    cy.get('[data-cy="manual-transaction-input"]').type("m104s682025");
    cy.contains("확인").click();

    // 화살표 오른쪽 클릭 (바우처 선택)
    cy.get('[data-testid="carousel-next-button"]').click();

    // 금액 입력 후 결제
    cy.get('[data-testid="amount-input"]', { timeout: 10000 }).should("be.visible").clear().type("100");
    cy.get('[data-testid="amount-submit-button"]').click();

    // 비밀번호 입력
    cy.contains("간편 비밀번호 입력").should("be.visible");
    [..."123456"].forEach((digit) => {
      cy.contains(digit).click();
    });

    // 결제 완료 검증
    cy.contains("결제 완료", { timeout: 10000 }).should("be.visible");
    cy.contains("확인").click();
  });
});
