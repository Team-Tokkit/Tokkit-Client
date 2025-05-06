"use client"

import { Badge } from "@/components/ui/badge"

interface Props {
  isUsed: boolean
}

export default function StatusBadge({ isUsed }: Props) {
  const label = isUsed ? "만료됨" : "사용 가능"
  const className = isUsed
    ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"

  return <Badge className={className}>{label}</Badge>
}
