<p align="center">
  <img src="https://github.com/user-attachments/assets/cea3445b-9f02-44b9-925c-dff472d896ae" width="180" alt="Tokkit Logo"/>
</p>
<p align="center"><i>“토큰이 있으면, 토킷이 있다.”</i></p>

# 🐰 Tokkit-Client

_“토큰이 있으면, 토킷이 있다.”_  
**Tokkit**은 우리은행 예금 토큰 기반의 전자지갑 서비스입니다.  
이 저장소는 **프론트엔드(Next.js)** 클라이언트 코드로, 사용자 인터페이스와 이벤트형 UX 구현을 담당합니다.

---


## ✨ 주요 기능 (프론트 주석 기준)

- `/wallet` : 예금 토큰 잔액 확인 및 입출금 기능
- `/store` : 바우처 카테고리별 탐색, 구매, 사용
- `/mission` : 미션 달성 시 보상 시스템
- `/admin` : 관리자용 바우처 및 사용자 관리
- `/event` : 출석, 룰렛, 친구 초대 등 인터랙티브 이벤트

---



## 🌿 브랜치 규칙

- `main` : 배포 브랜치
- `dev` : 개발 통합 브랜치
- `feat/#{ISSUE_NUMBER}-작업 내용 (한글)` : 기능 개발 브랜치 
- `fix/#{ISSUE_NUMBER}-작업 내용 (한글)` : 버그 수정 브랜치
- `hotfix/#{ISSUE_NUMBER}-작업 내용 (한글)` : 긴급 핫픽스

---

## 🧾 커밋 메시지 규칙

```bash
태그:  작업 내용 (한글)

예:
feat: 로그인 화면 UI 구현
fix: 바우처 미표시 버그 수정
```

---

### ✅ 주요 태그

| 태그 | 의미 |
|------|------|
| `Feat` | 기능 추가 |
| `Fix` | 버그 수정 |
| `Style` | 스타일, 포맷팅 |
| `Refactor` | 코드 리팩토링 |
| `Chore` | 설정, 의존성 작업 |
| `Docs` | 문서 작업 |
| `Test` | 테스트 코드 추가 |

---

### 🏷️ 라벨 체계

| 라벨 | 설명 | 
|------|--------|
| `FEAT` | 기능 추가 관련 PR/이슈 |
| `FIX` | 버그 수정 관련 | 
| `STYLE` | UI/스타일/레이아웃 관련 | 
| `REFACTOR` | 리팩토링 관련 | 
| `CHORE` | 기타 설정 및 패키지 |
| `TEST` | 테스트 코드 작업 | 
| `DOCS` | 문서/주석 관련 |

---
