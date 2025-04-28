// data/notices.ts

export interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    isEvent: boolean;
    isNew: boolean;
}

export const notices: Notice[] = [
    {
        id: "1",
        title: "서비스 점검 안내",
        content: "2023년 9월 15일 오전 2시부터 6시까지 서비스 점검이 예정되어 있습니다. 이용에 참고 부탁드립니다.",
        date: "2023.09.10",
        isEvent: false,
        isNew: true,
    },
    {
        id: "2",
        title: "추석 맞이 이벤트",
        content: "추석을 맞이하여 특별 이벤트를 진행합니다. 최대 10만원 캐시백 혜택을 놓치지 마세요!",
        date: "2023.09.08",
        isEvent: true,
        isNew: true,
    },
    {
        id: "3",
        title: "개인정보처리방침 개정 안내",
        content: "2023년 10월 1일부터 개인정보처리방침이 개정됩니다. 자세한 내용은 공지사항을 확인해주세요.",
        date: "2023.09.01",
        isEvent: false,
        isNew: false,
    },
];
