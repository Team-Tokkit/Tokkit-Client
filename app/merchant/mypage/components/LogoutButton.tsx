"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>로그아웃 하시겠습니까?</DialogTitle>
                    <DialogDescription>로그아웃 하시면 서비스 이용을 위해 다시 로그인해야 합니다.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">취소</Button>
                    <Button onClick={() => router.push("/merchant/login")}>로그아웃</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
