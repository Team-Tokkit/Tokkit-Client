"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Camera, Upload, AlertCircle, RefreshCw } from "lucide-react"
import type { RefObject } from "react"

interface BusinessCaptureStepProps {
    activeTab: string
    setActiveTab: (tab: string) => void
    fileInputRef: RefObject<HTMLInputElement>
    videoRef: RefObject<HTMLVideoElement>
    canvasRef: RefObject<HTMLCanvasElement>
    cameraError: string | null
    initCamera: () => void
    captureImage: () => void
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    processingOcr: boolean
}

export default function BusinessCaptureStep({
                                                activeTab,
                                                setActiveTab,
                                                fileInputRef,
                                                videoRef,
                                                canvasRef,
                                                cameraError,
                                                initCamera,
                                                captureImage,
                                                handleFileChange,
                                                processingOcr,
                                            }: BusinessCaptureStepProps) {
    return (
        <Tabs defaultValue="camera" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="camera">카메라 촬영</TabsTrigger>
                <TabsTrigger value="upload">이미지 업로드</TabsTrigger>
            </TabsList>

            <TabsContent value="camera">
                <div className="relative aspect-[3/4] w-full bg-black rounded-xl overflow-hidden mb-4">
                    {cameraError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                            <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
                            <p className="text-center mb-4">{cameraError}</p>
                            <Button onClick={initCamera} className="bg-white text-black hover:bg-gray-200">
                                <RefreshCw className="h-4 w-4 mr-2" /> 다시 시도
                            </Button>
                        </div>
                    ) : (
                        <>
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="border-2 border-dashed border-white/70 rounded-lg w-[85%] h-[60%] flex items-center justify-center">
                                    <p className="text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">
                                        사업자등록증을 영역 안에 맞춰주세요
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                </div>
                <Button
                    onClick={captureImage}
                    disabled={!!cameraError}
                    className="w-full h-14 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md"
                >
                    <Camera className="h-5 w-5 mr-2" /> 촬영하기
                </Button>
            </TabsContent>

            <TabsContent value="upload">
                <div className="w-full">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        className="sr-only"
                        id="certificate-upload"
                    />

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#E0E0E0] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#FFB020] aspect-[3/4] mb-4"
                    >
                        <Upload className="h-12 w-12 text-[#999999] mb-4" />
                        <p className="text-base font-medium text-[#666666] text-center mb-2">사업자등록증 업로드</p>
                        <p className="text-xs text-[#999999] text-center">JPG, PNG, PDF 파일 (최대 5MB)</p>
                    </div>

                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-14 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md"
                    >
                        <Upload className="h-5 w-5 mr-2" /> 파일 선택하기
                    </Button>
                </div>
            </TabsContent>

            {processingOcr && (
                <div className="mt-6 p-4 bg-white rounded-xl border border-[#E0E0E0] flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-[#3182CE] animate-spin mr-3" />
                    <p className="text-sm text-[#3182CE]">사업자등록증 정보를 인식하고 있습니다...</p>
                </div>
            )}
        </Tabs>
    )
}
