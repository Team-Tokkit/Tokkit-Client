"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Camera, Upload, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractIdCardInfo } from "@/app/merchant/signup/wallet/verify/api/ocr";
import Image from "next/image";

interface CaptureStepProps {
    onNext: () => void;
    onRetry: () => void;
    onBack: () => void;
    setCapturedData: (data: {
        name: string;
        residentIdFront: string;
        residentIdBack: string;
        issueDate: string;
    }) => void;
    selectedMethod: "camera" | "upload" | null;
    setSelectedMethod: (method: "camera" | "upload") => void;
}

export default function CaptureStep({
                                        onNext,
                                        onRetry,
                                        onBack,
                                        setCapturedData,
                                        selectedMethod,
                                        setSelectedMethod,
                                    }: CaptureStepProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showCamera, setShowCamera] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
        if (showCamera) {
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: "environment" } })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(() => alert("카메라 접근 실패"));
        }

        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [showCamera]);

    const handleCapture = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(imgUrl);
        setShowCamera(false);
        processOcr(imgUrl);
    };

    const processOcr = async (base64Image: string) => {
        try {
            setIsProcessing(true);
            const file = await fetch(base64Image)
                .then((res) => res.blob())
                .then(
                    (blob) => new File([blob], "capture.jpg", { type: "image/jpeg" })
                );

            const data = await extractIdCardInfo(file);
            const rrnRaw = data.residentId ?? "";
            const residentIdFront = rrnRaw.slice(0, 6);
            const residentIdBack = rrnRaw[6] ? rrnRaw[6] + "******" : "*".repeat(7);

            setCapturedData({
                name: data.name ?? "",
                residentIdFront,
                residentIdBack,
                issueDate: (data.issueDate ?? "").replaceAll(".", ""),
            });

            onNext();
        } catch (e) {
            alert("OCR 인식 실패: " + (e as Error).message);
            onRetry();
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            processOcr(dataUrl);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-[#F0F0F0]">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">신분증 인식</h3>
                    <p className="text-sm text-[#666666]">
                        주민등록증을 촬영하거나 이미지를 업로드하세요.
                        <br />
                        신분증의 모든 정보가 선명하게 보이도록 해주세요.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className={`h-32 flex flex-col items-center justify-center bg-white border-2 rounded-xl transition ${
                            selectedMethod === "camera"
                                ? "bg-[#FFF8E8] border-[#FFB020]"
                                : "border-dashed border-[#E0E0E0] hover:border-[#FFB020] hover:bg-[#FFF8E8]"
                        } text-[#666666]`}
                        onClick={() => {
                            setShowCamera(true);
                            setSelectedMethod("camera");
                        }}
                    >
                        <Camera className="h-6 w-6 mb-2" />
                        <span>카메라로 촬영</span>
                    </Button>

                    <label
                        className={`h-32 flex flex-col items-center justify-center bg-white border-2 rounded-xl transition cursor-pointer ${
                            selectedMethod === "upload"
                                ? "bg-[#FFF8E8] border-[#FFB020]"
                                : "border-dashed border-[#E0E0E0] hover:border-[#FFB020] hover:bg-[#FFF8E8]"
                        } text-[#666666]`}
                    >
                        <Upload className="h-6 w-6 mb-2" />
                        <span>이미지 업로드</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUpload(file);
                                setSelectedMethod("upload");
                            }}
                        />
                    </label>
                </div>
            </div>

            {showCamera && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-medium">신분증 촬영</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowCamera(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="aspect-[4/3] bg-black relative">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="w-[90%] h-[70%] mx-auto mt-[15%] border-2 border-white rounded-lg"></div>
                                <p className="text-white text-center text-sm mt-2">
                                    신분증을 영역 안에 맞춰주세요
                                </p>
                            </div>
                            <canvas ref={canvasRef} className="hidden" />
                        </div>

                        <div className="p-4 flex justify-between">
                            <Button variant="outline" onClick={() => setShowCamera(false)}>
                                취소
                            </Button>
                            <Button
                                className="bg-[#FFB020] hover:bg-[#FF9500] text-white"
                                onClick={handleCapture}
                            >
                                촬영하기
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {isProcessing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center text-white">
                        <RefreshCw className="h-8 w-8 animate-spin mb-2" />
                        <p>OCR 인식 중...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
