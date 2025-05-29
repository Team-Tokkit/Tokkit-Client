"use client"

import { Badge } from "@/components/ui/badge"

interface Props {
  status: string
}

export default function StatusBadge({ status }: Props) {
  let label = ""
  let className = ""

  switch (status) {
    case "AVAILABLE":
      label = "사용 가능"
      className = "bg-green-100 text-green-800  "
      break
    case "USED":
      label = "사용 완료"
      className = "bg-gray-100 text-gray-800  "
      break
    case "EXPIRED":
      label = "기간 만료"
      className = "bg-yellow-100 text-yellow-800  "
      break
    case "CANCELLED":
      label = "취소됨"
      className = "bg-red-100 text-red-800  "
      break
    default:
      label = "알 수 없음"
      className = "bg-gray-200 text-gray-800"
  }

  return <Badge className={className}>{label}</Badge>
}
