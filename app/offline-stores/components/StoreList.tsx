/*
"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, X } from "lucide-react"
import { Store } from "@/app/offline-stores/types"
import StoreItem from "@/app/offline-stores/components/StoreItem"

interface StoreListProps {
    stores: Store[]
    selectedStore: number | null
    onSelect: (id: number) => void
    onClose: () => void
    show: boolean
}

export default function StoreList({
                                      stores,
                                      selectedStore,
                                      onSelect,
                                      onClose,
                                      show,
                                  }: StoreListProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-20 overflow-y-auto max-h-[70vh]"
                >
                    <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                        <h3 className="font-bold">매장 목록 ({stores.length})</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {stores.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p>검색 결과가 없습니다</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {stores.map((store) => (
                                <StoreItem
                                    key={store.id}
                                    store={store}
                                    isSelected={selectedStore === store.id}
                                    onClick={() => onSelect(store.id)}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
*/
"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, X } from "lucide-react"
import { Store } from "@/app/offline-stores/types"
import StoreItem from "@/app/offline-stores/components/StoreItem"
import { FixedSizeList as VirtualList, ListChildComponentProps } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

interface StoreListProps {
    stores: Store[]
    selectedStore: number | null
    onSelect: (id: number) => void
    onClose: () => void
    show: boolean
}

// VirtualList에서 각 아이템을 렌더링하는 함수
function Row({
                 data,
                 index,
                 style,
             }: ListChildComponentProps<{
    stores: Store[]
    selectedStore: number | null
    onSelect: (id: number) => void
}>) {
    const { stores, selectedStore, onSelect } = data
    const store = stores[index]

    return (
        <div style={style} key={store.id}>
            <StoreItem
                store={store}
                isSelected={selectedStore === store.id}
                onClick={() => onSelect(store.id)}
            />
        </div>
    )
}

export default function StoreList({
                                      stores,
                                      selectedStore,
                                      onSelect,
                                      onClose,
                                      show,
                                  }: StoreListProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-20 overflow-hidden max-h-[70vh]"
                >
                    <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
                        <h3 className="font-bold">매장 목록 ({stores.length})</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {stores.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p>검색 결과가 없습니다</p>
                        </div>
                    ) : (
                        <div className="h-[calc(70vh-64px)]">
                            <AutoSizer>
                                {({ height, width }) => (
                                    <VirtualList
                                        height={height}
                                        width={width}
                                        itemCount={stores.length}
                                        itemSize={100} // 각 StoreItem 높이(px 단위) 조절 가능
                                        itemData={{ stores, selectedStore, onSelect }}
                                    >
                                        {Row}
                                    </VirtualList>
                                )}
                            </AutoSizer>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
