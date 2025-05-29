"use client"

import {
    Camera,
    Upload,
    AlertCircle,
    RefreshCw
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {requestBusinessOcr} from "@/app/merchant/signup/business/api/business-ocr";

interface CaptureStepProps {
    onNext: () => void
}

export default function CaptureStep({ onNext }: CaptureStepProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [activeTab, setActiveTab] = useState("camera")
    const [cameraError, setCameraError] = useState<string | null>(null)
    const [processingOcr, setProcessingOcr] = useState(false)

    useEffect(() => {
        if (activeTab === "camera") {
            initCamera()
        } else {
            stopCamera()
        }

        return () => stopCamera()
    }, [activeTab])

    const initCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setCameraError(null)
        } catch (err) {
            console.error("카메라 접근 오류:", err)
            setCameraError("카메라에 접근할 수 없습니다. 권한을 확인해주세요.")
            setActiveTab("upload")
        }
    }

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream
            stream.getTracks().forEach((track) => track.stop())
            videoRef.current.srcObject = null
        }
    }

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            if (!ctx) return

            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], "business.jpg", { type: "image/jpeg" })
                    processOCR(file)
                }
            }, "image/jpeg", 0.95)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.match("image/jpeg|image/png|application/pdf")) {
            alert("JPG, PNG, PDF 파일만 업로드 가능합니다.")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("파일 크기는 5MB를 초과할 수 없습니다.")
            return
        }

        processOCR(file)
    }

    const processOCR = async (file: File) => {
        setProcessingOcr(true)

        try {
            const result = await requestBusinessOcr(file)

            // OCR 결과를 sessionStorage에 저장
            sessionStorage.setItem("businessNumber", result.businessNumber)
            sessionStorage.setItem("storeName", result.storeName)
            sessionStorage.setItem("name", result.representativeName)
            sessionStorage.setItem("roadAddress", result.roadAddress)

            // 다음 단계로 전환
            onNext()
        } catch (err: any) {
            alert(err.message || "OCR 처리 중 오류가 발생했습니다.")
        } finally {
            setProcessingOcr(false)
        }
    }


    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-[#1A1A1A]  mb-2 text-center">
                사업자등록증 촬영
            </h2>
            <p className="text-sm text-[#666666]  mb-6 text-center">
                사업자등록증을 촬영하거나 이미지를 업로드해주세요
            </p>

            <Tabs defaultValue="camera" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="camera" className="text-sm">카메라 촬영</TabsTrigger>
                    <TabsTrigger value="upload" className="text-sm">이미지 업로드</TabsTrigger>
                </TabsList>

                <TabsContent value="camera">
                    <div className="relative w-full h-[320px] bg-black rounded-xl overflow-hidden mb-4">
                    {cameraError ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                                <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
                                <p className="text-center mb-4">{cameraError}</p>
                                <Button onClick={initCamera} className="bg-white text-black hover:bg-gray-200">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    다시 시도
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
                        className="w-full h-14 bg-[#FFB020] hover:bg-[#FF9500]   text-white  font-medium rounded-xl shadow-md"
                    >
                        <Camera className="h-5 w-5 mr-2" />
                        촬영하기
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
                            className="border-2 border-dashed border-[#E0E0E0] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#FFB020] transition-colors h-[320px] mb-4"
                        >
                            <Upload className="h-4 w-12 text-[#999999] mb-4" />
                            <p className="text-base font-medium text-[#666666]  text-center mb-2">
                                사업자등록증 업로드
                            </p>
                            <p className="text-xs text-[#999999] text-center">
                                JPG, PNG, PDF 파일 (최대 5MB)
                            </p>
                        </div>

                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-14 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md"
                        >
                            <Upload className="h-5 w-5 mr-2" />
                            파일 선택하기
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>

            {processingOcr && (
                <div className="mt-6 p-4 bg-white  rounded-xl border border-[#E0E0E0]  flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-[#3182CE]  animate-spin mr-3" />
                    <p className="text-sm text-[#3182CE] ">사업자등록증 정보를 인식하고 있습니다...</p>
                </div>
            )}
        </div>
    )
}
