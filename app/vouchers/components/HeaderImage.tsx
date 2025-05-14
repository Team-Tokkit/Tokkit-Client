"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface HeaderImageProps {
  image: string
  title: string
  contact: string
}

export default function HeaderImage({ image, title, contact }: HeaderImageProps) {
  const router = useRouter()

  return (
    <div className="relative h-64">
      <Image src={image} alt={title|| "이미지 설명 없음"} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      

      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md text-white transition"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-4 right-4">
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80 text-[#1A1A1A] shadow-sm mb-2">
          {contact}
        </span>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
    </div>
  )
}
