import { motion } from "framer-motion";
import { forwardRef } from "react";
import VirtualKeypad, { VirtualKeypadHandle } from "@/components/virtual-keypad"; // <-- import 추가

interface SimplePassWordProps {
  onComplete: (password: string) => void;
  isConfirm?: boolean;
}

const PurchasePassword = forwardRef<VirtualKeypadHandle, SimplePassWordProps>(
  ({ onComplete, isConfirm = false }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <VirtualKeypad ref={ref} onComplete={onComplete} />
      </motion.div>
    );
  }
);

export default PurchasePassword;
