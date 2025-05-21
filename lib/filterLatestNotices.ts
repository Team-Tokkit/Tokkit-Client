export function filterLatestNoticeIds(notices: { id: number; createdAt: string }[]): number[] {
    const now = new Date();

    return notices
        .filter((notice) => {
            const createdAt = new Date(notice.createdAt);
            const diffInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
            return diffInDays <= 3;
        })
        .map((n) => n.id);
}