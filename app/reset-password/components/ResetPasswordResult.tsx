import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    email: string;
    onComplete: () => void;
}

export default function ResetPasswordResult({ email, onComplete }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
        >
            <h2 className="text-xl font-bold mb-2">비밀번호 초기화 완료</h2>
            <p className="text-[#666666] mb-6">
                임시 비밀번호가 <span className="font-semibold">{email}</span>로 <br />발송되었습니다
                <br />
                📮 메일함을 확인해 주세요!
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">임시 비밀번호로 로그인 후 보안을 위해 비밀번호를 변경해주세요.</p>
            </div>

            <Button
                className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
                onClick={onComplete}
            >
                로그인 화면으로 돌아가기
            </Button>
        </motion.div>
    );
}
