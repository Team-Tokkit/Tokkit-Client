"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import {useState} from "react";
import {merchantLogout} from "@/app/merchant/mypage/api/merchant-logout";

export default function LogoutButton() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            merchantLogout()
            router.push("/merchant/login")
        } catch (error) {
            console.error("로그아웃 실패", error)
            alert("로그아웃 중 오류가 발생했습니다.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mt-4 text-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="text-gray-500 hover:text-gray-700 items-center justify-center gap-2">
                        <LogOut className="h-4 w-4" />
                        로그아웃
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white w-[90%] max-w-sm rounded-2xl p-8 shadow-lg border-0">
                    <DialogHeader>
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-[#FFB020] bg-opacity-20 rounded-full p-3 mb-4">
                                <LogOut className="h-7 w-7 text-[#FFB020]" />
                            </div>
                            <DialogTitle className="text-xl font-bold text-[#1A1A1A] mb-2">로그아웃 하시겠습니까?</DialogTitle>
                            <DialogDescription className="text-base text-gray-500 text-center leading-relaxed">
                                로그아웃 하시면 서비스 이용을 위해<br />다시 로그인해야 합니다.
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="pt-4">
                        <div className="flex w-full justify-center space-x-3">
                            <DialogClose asChild>
                                <Button variant="outline" className="w-28 h-11 rounded-lg border-gray-300 text-[#1A1A1A] bg-white hover:bg-gray-100">
                                    취소
                                </Button>
                            </DialogClose>
                            <Button
                                onClick={handleLogout}
                                className="w-28 h-11 rounded-lg bg-[#FFB020] hover:bg-[#FF9500] text-white font-semibold shadow-none border-0"
                            >
                                로그아웃
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}