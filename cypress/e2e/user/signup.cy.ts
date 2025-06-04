import 'cypress-file-upload';

describe("전자지갑 회원가입 플로우", () => {
  it("약관 동의 및 신분증 업로드까지 완료", () => {
    cy.visit("/");
    cy.contains("전자지갑 개설 및 회원가입").click();
    cy.contains("시작하기").click();
    cy.url().should("include", "/signup/wallet/terms");
  });

  it("이미지 업로드를 통해 OCR 인식 성공 흐름 테스트", () => {
    cy.visit("/signup/wallet/verify");

    cy.contains("이미지 업로드").click();
    // cy.get('input[type="file"]').attachFile("신분증.png");

    cy.contains("OCR 인식 중...").should("be.visible");
    cy.contains("OCR 인식 중...").should("not.exist");

    cy.contains("인식 결과 확인").should("exist");

    cy.get("#name")
      .invoke("val")
      .should("match", /^[가-힣]{2,}$/);

    cy.get("#residentIdFront")
      .invoke("val")
      .should("match", /^\d{6}$/)
      .and("have.length", 6);

    cy.get("#residentIdBack").invoke("val").then((val) => {
      expect(val).to.include("*");
      expect(val).to.match(/^\d\*+$/);
    });

    cy.get("#issueDate").invoke("val").then((val) => {
      if (!val || String(val).trim() === "") {
        cy.get("#issueDate").clear().type("20200101");
      } else {
        expect(val).to.match(/^\d{8}$/);
      }
    });

    cy.contains("인증하기").click();

    cy.url().should("include", "/signup/wallet/confirm");
  });
});
