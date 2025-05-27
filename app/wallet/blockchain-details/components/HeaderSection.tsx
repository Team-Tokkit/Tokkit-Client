import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function HeaderSection() {
    const router = useRouter()

    return (
        <header className="bg-white p-5 pt-8 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-lg font-semibold text-[#111827]">블록체인 상세</h1>
                </div>
            </div>
        </header>
    )
}
