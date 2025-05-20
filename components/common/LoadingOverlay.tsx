"use client"

import { motion } from "framer-motion"

interface LoadingOverlayProps {
  message?: string
}

export default function LoadingOverlay({ message = "처리 중입니다. 잠시만 기다려주세요..." }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="flex flex-col items-center bg-white px-8 py-6 rounded-lg shadow-lg"
      >
        <svg
          className="animate-spin h-8 w-8 text-green-500 mb-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-base font-medium text-green-600">
          {message}
        </span>
      </motion.div>
    </div>
  )
}
