"use client"

import { MapPin } from "lucide-react"
import { Store } from "@/app/offline-stores/types"

interface StoreItemProps {
    store: Store
    isSelected: boolean
    onClick: () => void
}

export default function StoreItem({ store, isSelected, onClick }: StoreItemProps) {
    return (
        <div
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                isSelected ? "bg-blue-50" : ""
            }`}
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center">
            <span className="text-xs px-2 py-0.5 bg-[#4F6EF7]/10 text-[#4F6EF7] rounded-full mr-2">
              {store.storeCategory}
            </span>
                    </div>
                    <h3 className="font-bold mt-1">{store.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{store.roadAddress}</p>
                </div>
                <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-[#4F6EF7] mr-1" />
                    <span className="text-sm font-medium">
            {(store.distance / 1000).toFixed(1)}km
          </span>
                </div>
            </div>
        </div>
    )
}
