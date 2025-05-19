import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    error?: string | null;
    success?: string | null;
}

export default function FormFeedbackMessage({ error, success }: Props) {
    if (!error && !success) return null;

    return (
        <motion.div
            className={`flex items-start space-x-2 p-3 rounded-lg text-sm transition-all
        ${error ? "text-[#FF6B6B] bg-[#FFF0F0]" : "text-[#38A169] bg-[#F0FFF4]"}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {error ? (
                <AlertCircle className="h-5 w-5 mt-0.5" />
            ) : (
                <CheckCircle2 className="h-5 w-5 mt-0.5" />
            )}
            <p>{error || success}</p>
        </motion.div>
    );
}