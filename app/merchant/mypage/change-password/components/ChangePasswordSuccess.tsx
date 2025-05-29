"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordSuccess() {
  const router = useRouter();

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardContent className="p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="rounded-full bg-amber-100 p-3 mb-4">
            <CheckCircle className="h-10 w-10 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">비밀번호 변경 완료!</h3>
          <p className="text-gray-600 mb-6">
            비밀번호가 성공적으로 변경되었습니다.
          </p>
          <Button
            data-cy="complete-button"
            onClick={() => router.push("/merchant/mypage")}
            className="bg-amber-500 hover:bg-amber-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all"
          >
            마이페이지로 돌아가기
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
