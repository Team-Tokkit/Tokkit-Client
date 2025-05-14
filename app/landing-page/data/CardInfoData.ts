export interface CardInfo {
    cardKey: string
    title: string
    description: string
    color: string
    icon: string
}

export const cardInfoData: CardInfo[] = [
    {
        cardKey: "CBDC",
        title: "CBDC란?",
        description:
            "중앙은행 디지털 화폐(CBDC)는 중앙은행이 발행하는 디지털 형태의 법정 화폐입니다. 실물 화폐와 동일한 가치를 지니며, 블록체인 기술을 기반으로 합니다.",
        color: "#FFB020",
        icon: "💰",
    },
    {
        cardKey: "SECURE",
        title: "안전한 거래",
        description:
            "CBDC는 중앙은행의 신뢰를 바탕으로 안전하고 투명한 거래를 보장합니다. 모든 거래는 암호화되어 보안성이 뛰어납니다.",
        color: "#FF4A4A",
        icon: "🔒",
    },
    {
        cardKey: "FAST",
        title: "빠른 송금",
        description:
            "가맹점은 결제 즉시 정산이 이루어져 자금 흐름이 원활해집니다. 기존 카드 결제 대비 정산 기간이 대폭 단축됩니다.",
        color: "#3B82F6",
        icon: "⚡",
    },
    {
        cardKey: "INCLUSION",
        title: "금융 포용성",
        description:
            "지역 화폐와 연계된 바우처 시스템으로 지역 소비를 촉진하고 지역 경제를 활성화합니다.",
        color: "#10B981",
        icon: "🌍",
    },
]
