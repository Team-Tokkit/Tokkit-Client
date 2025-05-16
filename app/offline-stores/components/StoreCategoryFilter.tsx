"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CATEGORIES } from "@/app/offline-stores/utils/map-utils"

interface Props {
    show: boolean
    selectedCategory: string
    setSelectedCategory: (category: string) => void
}

export default function StoreCategoryFilter({
                                                show,
                                                selectedCategory,
                                                setSelectedCategory,
                                            }: Props) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white px-4 z-10"
                >
                    <div className="flex flex-wrap gap-2 py-2">
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                className={`text-xs rounded-full ${
                                    selectedCategory === category
                                        ? "bg-[#4F6EF7] text-white"
                                        : "bg-transparent"
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
