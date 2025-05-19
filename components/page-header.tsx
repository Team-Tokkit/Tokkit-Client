"use client"

import { motion } from "framer-motion"
import {ReactNode} from "react";

interface PageHeaderProps {
    title: string
    description?: ReactNode
    isAnimating?: boolean
    className?: string
}

export function PageHeader({ title, description, isAnimating = false }: PageHeaderProps) {
  return (
    <>
      <motion.h1
        className="text-3xl font-bold text-center text-[#1A1A1A] mb-4"
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
