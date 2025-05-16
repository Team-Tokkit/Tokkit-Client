"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { logout } from "@/app/mypage/api/user-logout";

export default function LogoutDialog() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout(); // API 호출

            // 쿠키 삭제
            document.cookie = "accessToken=; path=/; max-age=0";
            document.cookie = "refreshToken=; path=/; max-age=0";

            router.push("/login");
        } catch (err) {
            console.error("로그아웃 실패:", err);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="mt-4 text-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                        <LogOut className="h-4 w-4 mr-2" />
                        로그아웃
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white w-[90%] max-w-sm rounded-xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">로그아웃 하시겠습니까?</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            로그아웃 하시면 서비스 이용을 위해 <br /> 다시 로그인해야 합니다.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="pt-6">
                        <div className="flex w-full justify-center space-x-2">
                            <DialogClose asChild>
                                <Button variant="outline" className="w-24 h-10">취소</Button>
                            </DialogClose>
                            <Button onClick={handleLogout} className="w-24 h-10 bg-gray-800 text-white">
                                로그아웃
                            </Button>
                        </div>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}
