"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface MenuItem {
    title: string
    icon: React.ElementType
    action: () => void
    badge?: string
    color: string
    iconColor: string
}

interface Props {
    menuItems: MenuItem[]
}

export default function MenuList({ menuItems }: Props) {
    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <h3 className="text-m font-medium text-[#111827] mb-4 px-1 flex items-center">
                <span className="bg-gradient-to-r from-[#4F6EF7] to-[#3A5BD9] w-1 h-4 rounded-full mr-2 inline-block"></span>
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
                                {item.badge && <span className="mr-2 text-sm font-medium">{item.badge}</span>}
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
