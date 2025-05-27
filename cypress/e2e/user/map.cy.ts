// /// <reference types="cypress" />

// describe("가맹점 필터 및 검색 기능 테스트", () => {
//   it("카테고리 필터 및 검색 작동 확인", () => {
//     // 1. 로그인
//     cy.visit("/login");
//     cy.get("#email").type("dlwjdals0726@gmail.com");
//     cy.get("#password").type("Nji0Zd");
//     cy.get("form").submit();
//     cy.url({ timeout: 10000 }).should("include", "/dashboard");

//     // 2. 가맹점 페이지로 이동
//     cy.contains("가맹점").click();
//     cy.url({ timeout: 10000 }).should("include", "/offline-stores");

//     // 3. '이 지역 재검색' 버튼이 등장하고, 활성화될 때까지 기다림
//     cy.contains("이 지역 재검색", { timeout: 20000 }) 
//       .should("be.visible")
//       .should("not.be.disabled");

//     // 4. 필터 토글 열기 (두 번째 버튼으로 가정)
//     cy.get("button").filter(":visible").eq(1).click();

//     // 5. 카테고리 필터 테스트
//     const categories = ["음식", "의료", "서비스", "관광", "숙박", "교육"];
//     categories.forEach((category) => {
//       cy.contains("button", category).click();

//       // 버튼이 활성화될 때까지 기다리고 클릭
//       cy.contains("이 지역 재검색", { timeout: 15000 })
//         .should("be.visible")
//         .should("not.be.disabled")
//         .click();

//       // 검색 결과 나올 때까지 대기
//       cy.get(".custom-overlay, .overlay-name", { timeout: 10000 }).should("exist");
//     });

//     // 6. 검색어에 '바로' 입력하고 재검색
//     cy.get("input[placeholder='매장명, 주소 검색']")
//       .clear()
//       .type("바로");

//     // 검색 버튼 활성화 대기 후 클릭
//     cy.contains("이 지역 재검색", { timeout: 15000 })
//       .should("be.visible")
//       .should("not.be.disabled")
//       .click();

//     cy.get(".custom-overlay, .overlay-name", { timeout: 10000 }).should("exist");
//   });
// });
