"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ManualBoxProps {
  onSubmit: (transactionId: string) => void;
  onCancel: () => void;
}

export default function ManualBox({ onSubmit, onCancel }: ManualBoxProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) {
      setError("거래번호를 입력해주세요.");
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
          거래번호 직접 입력
        </h3>
        <p className="text-sm text-[#666666] mb-6 leading-relaxed">
          가맹점에 비치된 QR 안내판 아래의{" "}
          <span className="font-medium text-[#1A1A1A]">코드를</span> 입력해주세요.
        </p>

        <div className="flex justify-center mb-1">
          <img
            src="/images/manual-example.png"
            alt="거래번호 예시"
            className="w-[200px] sm:w-[220px] md:w-[205px] object-contain"
          />
        </div>

        <input
          type="text"
          placeholder="예: m001s00001"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError("");
          }}
          className="w-full h-12 px-4 border border-gray-300 rounded-lg text-base"
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      <div className="flex space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-12"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          type="submit"
          className="flex-1 h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white"
          disabled={!input.trim()}
        >
          확인
        </Button>
      </div>
    </form>
  );
}
