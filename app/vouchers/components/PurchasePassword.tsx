import { motion } from "framer-motion";
import VirtualKeypad from "@/components/virtual-keypad";

interface SimplePassWordProps {
  onComplete: (password: string) => void;
  isConfirm?: boolean;
}

export default function PurchasePassowrd({
  onComplete,
  isConfirm = false,
}: SimplePassWordProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <VirtualKeypad onComplete={onComplete} />
    </motion.div>
  );
}
