import { motion } from "framer-motion";
import { Store, Wallet } from "lucide-react";

interface Props {
    accountNumber: string;
    isMerchant: boolean;
    businessName: string;
}

export default function AccountNumberCard({
                                              accountNumber,
                                              isMerchant,
                                              businessName,
                                          }: Props) {
    return (
        <motion.div className="px-6 mb-6">
            <div className="bg-gradient-to-r from-[#FFB020] to-[#FF9500] rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        {isMerchant ? <Store className="h-5 w-5 text-white" /> : <Wallet className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                        <p className="text-sm font-medium">전자지갑 계좌번호</p>
                        <p className="text-xs opacity-80">{isMerchant ? `${businessName} 가맹점` : "Tokkit 전자지갑"}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold tracking-wider">{accountNumber}</p>
                </div>
            </div>
        </motion.div>
    );
}
