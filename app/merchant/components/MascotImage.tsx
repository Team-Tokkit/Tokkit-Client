"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface MascotImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    isAnimating?: boolean
    className?: string
}

export function MascotImage({ src, alt, width = 180, height = 180, isAnimating = false, className ="" }: MascotImageProps) {
    return (
        <motion.div
            className={`mb-6 ${className}`}
            initial={{ scale: 0 }}
            animate={{ scale: isAnimating ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className="mx-auto" />
        </motion.div>
    )
}
