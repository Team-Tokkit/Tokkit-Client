"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Term } from "../data/merchant-terms"

interface Props {
    term: Term | null
    isVisible: boolean
    onClose: () => void
    onAgree: () => void
}

export default function TermsModal({ term, isVisible, onClose, onAgree }: Props) {
    const modalVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 50, scale: 0.95 },
    }

    return (
        <AnimatePresence>
            {isVisible && term && (
                <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="bg-white  rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 ">
                            <h3 className="text-lg font-bold text-gray-800 ">{term.title}</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="rounded-full h-8 w-8 hover:bg-gray-100  text-gray-500 "
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 text-sm text-gray-700  whitespace-pre-line scrollbar-thin scrollbar-thumb-gray-200  scrollbar-track-transparent">
                            {term.content}
                        </div>

                        <div className="p-5 border-t border-gray-100 ">
                            <Button
                                className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500]   text-white  font-medium rounded-xl shadow-md transition-all duration-200"
                                onClick={onAgree}
                            >
                                동의합니다
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
