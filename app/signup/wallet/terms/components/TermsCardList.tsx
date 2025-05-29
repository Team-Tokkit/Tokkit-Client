"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Term } from "@/app/signup/wallet/terms/data/walletTerms";
import { FC } from "react";

interface TermsCardListProps {
    terms: Term[];
    agreedTerms: string[];
    viewedTerms: string[];
    allAgreed: boolean;
    onToggleAll: () => void;
    onToggleTerm: (termId: string) => void;
    onViewTerm: (termId: string) => void;
}

const TermsCardList: FC<TermsCardListProps> = ({
                                                   terms,
                                                   agreedTerms,
                                                   viewedTerms,
                                                   allAgreed,
                                                   onToggleAll,
                                                   onToggleTerm,
                                                   onViewTerm,
                                               }) => {
    return (
        <motion.div
            className="bg-white  p-5 rounded-xl shadow-md border border-gray-100  mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            {/* 모두 동의하기 */}
            <div className="flex items-center border-b border-gray-100  pb-4">
                <motion.div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 cursor-pointer transition-colors duration-200 ${
                        allAgreed
                            ? "bg-[#FFB020] "
                            : "border-2 border-[#FFB020]/50 "
                    }`}
                    onClick={onToggleAll}
                    variants={{
                        checked: { scale: 1 },
                        unchecked: { scale: 0.9 }
                    }}
                    animate={allAgreed ? "checked" : "unchecked"}
                >
                    {allAgreed && <Check className="h-4 w-4 text-white " />}
                </motion.div>
                <span
                    className="font-semibold text-gray-800  cursor-pointer"
                    onClick={onToggleAll}
                >
          모든 약관에 동의합니다
        </span>
            </div>

            {/* 개별 약관 */}
            {terms.map((term, index) => (
                <motion.div
                    key={term.id}
                    className={`flex items-center justify-between py-4 ${
                        index < terms.length - 1
                            ? "border-b border-gray-100 "
                            : ""
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                >
                    <div className="flex items-center">
                        <motion.div
                            className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 cursor-pointer transition-colors duration-200 ${
                                agreedTerms.includes(term.id)
                                    ? "bg-[#FFB020] "
                                    : "border-2 border-[#FFB020]/40 "
                            } ${!viewedTerms.includes(term.id) ? "opacity-50" : ""}`}
                            onClick={() => onToggleTerm(term.id)}
                            variants={{
                                checked: { scale: 1 },
                                unchecked: { scale: 0.9 }
                            }}
                            animate={agreedTerms.includes(term.id) ? "checked" : "unchecked"}
                        >
                            {agreedTerms.includes(term.id) && (
                                <Check className="h-3 w-3 text-white " />
                            )}
                        </motion.div>
                        <div>
                            <label
                                htmlFor={`term-${term.id}`}
                                className="text-sm font-medium text-gray-800  cursor-pointer"
                            >
                                {term.title}
                            </label>
                            {term.required ? (
                                <span className="text-red-500 ml-1 text-xs">(필수)</span>
                            ) : (
                                <span className="text-gray-400 ml-1 text-xs">(선택)</span>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#FFB020] hover:text-[#FF9500]   hover:bg-[#FFF8E8]  p-2 h-8 rounded-lg transition-all duration-200"
                        onClick={() => onViewTerm(term.id)}
                    >
                        보기 <Eye className="h-4 w-4 ml-1" />
                    </Button>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default TermsCardList;