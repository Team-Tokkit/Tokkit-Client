export default function BlockchainDetailsLoading() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] max-w-md mx-auto">
            <header className="bg-white p-5 pt-8 shadow-sm">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse mr-4"></div>
                    <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </header>

            <div className="p-5">
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                        <div>
                            <div className="w-20 h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between px-4 py-4 border-b border-gray-100 ${
                                index % 2 === 1 ? "bg-gray-50" : ""
                            }`}
                        >
                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
