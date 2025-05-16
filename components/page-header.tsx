"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description?: string
  isAnimating?: boolean
}

export function PageHeader({ title, description, isAnimating = false }: PageHeaderProps) {
  return (
    <>
      <motion.h1
        className="text-xl font-bold text-[#1A1A1A]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -20 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {title}
      </motion.h1>

        {description && (
        <motion.p
          className="text-center text-[#666666]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -20 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </>
  )
}
