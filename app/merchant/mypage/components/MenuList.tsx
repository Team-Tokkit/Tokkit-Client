"use client"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useMenuItems } from "../data/menu-items"

export default function MenuList() {
    const menuItems = useMenuItems()

    return (
        <div>
            <h3 className="text-sm font-medium text-[#111827] mb-4 px-1 flex items-center">
                <span className="bg-gradient-to-r from-[#4F6EF7] to-[#3A5BD9] w-1 h-4 rounded-full mr-2 inline-block" />
                전체 메뉴
            </h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {menuItems.map((item, i) => (
                    <div
                        key={i}
                        className="border-b last:border-b-0 border-gray-100"
                    >
                        <button
                            onClick={item.action}
                            className="flex items-center justify-between w-full p-4 transition-colors hover:bg-[#F9FAFB]"
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`bg-gradient-to-br ${item.color} p-2 rounded-full`}>
                                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                                </div>
                                <span>{item.title}</span>
                            </div>
                            <div className="flex items-center">
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
