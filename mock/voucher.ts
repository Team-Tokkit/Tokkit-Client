import { Voucher } from "@/types/voucher"

export const mockVouchers: Voucher[] = [
  {
    id: 1,
    name: "취업 지원 바우처",
    description: "구직활동 및 직업훈련 비용 지원",
    category: "job",
    price: 250000,
    validDate: "2024-06-30T23:59:59",
    detailDescription:
      "취업 지원 바우처는 구직자의 취업 역량 강화를 위한 다양한 서비스를 지원합니다. 직업훈련, 자격증 취득, 면접 준비, 취업 컨설팅 등에 사용할 수 있으며, 개인별 맞춤형 취업 지원 서비스를 제공합니다.",
    stores: ["지정 교육기관", "자격증 시험센터", "취업컨설팅 기관"],
    refundPolicy:
      "바우처 유효기간 내 미사용 금액은 자동 소멸되며 환불되지 않습니다. 취업 성공 시 잔여 금액은 인센티브로 지급됩니다.",
    contact: "고용노동부 취업지원과 02-1234-5678",
    merchant: "고용노동부",
    image: "/images/voucher-job.png",
  },
  {
    id: 2,
    name: "문화누리 바우처",
    description: "문화, 여행, 스포츠 활동 지원",
    category: "culture",
    price: 100000,
    validDate: "2024-12-15T23:59:59",
    detailDescription:
      "문화누리 바우처는 경제적 여건 등으로 문화 생활에 어려움을 겪는 분들에게 공연, 영화, 전시, 스포츠 관람, 여행 등 다양한 문화 활동을 지원합니다.",
    stores: ["영화관", "공연장", "미술관", "체육시설", "여행사"],
    refundPolicy: "바우처 유효기간 내 미사용 금액은 자동 소멸되며 환불되지 않습니다.",
    contact: "문화누리 고객센터 1544-3412",
    merchant: "문화체육관광부",
    image: "/images/voucher-culture.png",
  },
  {
    id: 3,
    name: "의료비 지원 바우처",
    description: "저소득층 의료비 부담 경감",
    category: "health",
    price: 500000,
    validDate: "2024-11-30T23:59:59",
    detailDescription:
      "의료비 지원 바우처는 저소득층의 의료비 부담을 경감하기 위해 제공됩니다. 병원 진료비, 약제비, 검사비 등 다양한 의료 서비스에 사용할 수 있습니다.",
    stores: ["지정 병원", "약국", "보건소"],
    refundPolicy:
      "바우처 유효기간 내 미사용 금액은 자동 소멸되며 환불되지 않습니다. 단, 사망 시 가족에게 잔액의 50%가 환불됩니다.",
    contact: "보건복지부 의료지원과 02-9876-5432",
    merchant: "보건복지부",
    image: "/images/voucher-medical.png",
  },
  {
    id: 4,
    name: "교육비 지원 바우처",
    description: "저소득층 학생의 교육비 지원",
    category: "education",
    price: 300000,
    validDate: "2024-09-30T23:59:59",
    detailDescription:
      "교육비 지원 바우처는 저소득층 학생들의 학업을 지원하기 위해 제공됩니다. 학비, 교재비, 학용품 구매 등에 사용할 수 있습니다.",
    stores: ["학교", "서점", "문구점"],
    refundPolicy:
      "바우처 유효기간 내 미사용 금액은 자동 소멸되며 환불되지 않습니다.",
    contact: "교육부 교육지원과 02-5678-1234",
    merchant: "교육부",
    image: "/images/voucher-education.png",
  },
  {
    id: 5,
    name: "육아 지원 바우처",
    description: "육아 비용 경감을 위한 지원",
    category: "childcare",
    price: 200000,
    validDate: "2024-08-31T23:59:59",
    detailDescription:
      "육아 지원 바우처는 부모의 육아 부담을 줄이기 위해 제공됩니다. 보육비, 유아용품 구매, 교육비 등에 사용할 수 있습니다.",
    stores: ["보육원", "유아용품점", "교육기관"],
    refundPolicy:
      "바우처 유효기간 내 미사용 금액은 자동 소멸되며 환불되지 않습니다.",
    contact: "보건복지부 육아지원과 02-8765-4321",
    merchant: "보건복지부",
    image: "/images/voucher-childcare.png",
  },
]