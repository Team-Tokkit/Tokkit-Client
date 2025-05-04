import {
  ArrowDownUp,
  CreditCard,
  QrCode,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

interface GuideItem {
  value: string;
  icon: LucideIcon;
  title: string;
  content: string;
}

export const guideItems: GuideItem[] = [
  {
    value: "token-balance",
    icon: CreditCard,
    title: "토큰 잔액 조회",
    content:
      "전자지갑 메인 화면에서 토큰 잔액을 확인할 수 있습니다. 토큰은 1:1 비율로 원화와 동일한 가치를 가지며, 예금을 토큰으로 전환하거나 토큰을 예금으로 전환할 수 있습니다.",
  },
  {
    value: "convert-to-token",
    icon: ArrowDownUp,
    title: "예금을 토큰으로 전환",
    content: `1. 전자지갑 메인 화면에서 '예금 → 토큰' 버튼을 클릭합니다.
2. 전환할 금액을 입력합니다.
3. 전환 정보를 확인하고 '전환하기' 버튼을 클릭합니다.
4. 간편 비밀번호를 입력하여 전환을 완료합니다.

전환은 즉시 처리되며, 수수료는 없습니다.`,
  },
  {
    value: "convert-to-deposit",
    icon: ArrowDownUp,
    title: "토큰을 예금으로 전환",
    content: `1. 전자지갑 메인 화면에서 '토큰 → 예금' 버튼을 클릭합니다.
2. 전환할 금액을 입력합니다.
3. 전환 정보를 확인하고 '전환하기' 버튼을 클릭합니다.
4. 간편 비밀번호를 입력하여 전환을 완료합니다.

전환은 즉시 처리되며, 수수료는 없습니다.`,
  },
  {
    value: "payment",
    icon: QrCode,
    title: "토큰으로 결제",
    content: `<strong>QR 코드 보여주기</strong>
1. 전자지갑 메인 화면에서 '토큰으로 결제하기' 버튼을 클릭합니다.
2. 'QR 코드 보여주기'를 선택합니다.
3. 간편 비밀번호를 입력합니다.
4. 생성된 QR 코드를 가맹점의 스캐너에 보여줍니다.

<strong>QR 코드 스캔하기</strong>
1. 전자지갑 메인 화면에서 '토큰으로 결제하기' 버튼을 클릭합니다.
2. 'QR 코드 스캔하기'를 선택합니다.
3. 간편 비밀번호를 입력합니다.
4. 가맹점의 QR 코드를 스캔합니다.

결제 후에는 결제 내역을 확인할 수 있습니다.`,
  },
  {
    value: "security",
    icon: ShieldCheck,
    title: "보안 및 주의사항",
    content: `<strong>보안 관리</strong>
- 간편 비밀번호는 타인에게 절대 공유하지 마세요.
- 정기적으로 비밀번호를 변경하는 것이 좋습니다.
- 공용 Wi-Fi에서는 가급적 전자지갑 서비스 이용을 자제해주세요.

<strong>주의사항</strong>
- 결제 전 금액을 꼭 확인해주세요.
- 토큰 전환 시 금액을 정확히 입력했는지 확인해주세요.
- 문제가 발생한 경우 고객센터로 문의해주세요.`,
  },
];
