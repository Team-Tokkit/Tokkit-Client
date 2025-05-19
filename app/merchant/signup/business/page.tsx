"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import BusinessHeader from "./components/BusinessHeader"
import BusinessIntroBanner from "./components/BusinessIntroBanner"
import BusinessCaptureStep from "./components/BusinessCaptureStep"
import BusinessInfoForm from "./components/BusinessInfoForm"
import BusinessAddressSearchModal from "./components/BusinessAddressSearchModal"
import { requestBusinessOcr } from "./api/business-ocr"

export default function BusinessInfoPage() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [formStep, setFormStep] = useState<"capture" | "info">("capture")
    const [activeTab, setActiveTab] = useState("camera")
    const [cameraError, setCameraError] = useState<string | null>(null)
    const [processingOcr, setProcessingOcr] = useState(false)
    const [certificateFile, setCertificateFile] = useState<File | null>(null)

    const [businessNumber, setBusinessNumber] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [ownerName, setOwnerName] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [detailAddress, setDetailAddress] = useState("")
    const [selectedSido, setSelectedSido] = useState("")
    const [selectedSigungu, setSelectedSigungu] = useState("")
    const [sigunguList, setSigunguList] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const [showAddressSearch, setShowAddressSearch] = useState(false)
    const [addressKeyword, setAddressKeyword] = useState("")
    const [addressResults, setAddressResults] = useState<any[]>([])
    const [searchingAddress, setSearchingAddress] = useState(false)

    useEffect(() => {
        if (selectedSido) {
            fetch(`/api/regions/sigungu?sido=${selectedSido}`)
                .then((res) => res.json())
                .then((data) => setSigunguList(data.result || []))
                .catch(() => setSigunguList([]))
        }
    }, [selectedSido])

    useEffect(() => {
        if (activeTab === "camera") {
            initCamera()
        }
    }, [activeTab])


    const initCamera = async () => {
        if (activeTab !== "camera") return
        try {
            setCameraError(null)
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            if (videoRef.current) videoRef.current.srcObject = stream
        } catch (error) {
            setCameraError("카메라에 접근할 수 없습니다.")
            setActiveTab("upload")
        }
    }

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d")
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth
                canvasRef.current.height = videoRef.current.videoHeight
                context.drawImage(videoRef.current, 0, 0)
                canvasRef.current.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], "capture.jpg", { type: "image/jpeg" })
                        setCertificateFile(file)
                        processOCR(file)
                    }
                })
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setCertificateFile(file)
            processOCR(file)
        }
    }

    const processOCR = async (file: File) => {
        setProcessingOcr(true)

        try {
            const result = await requestBusinessOcr(file)

            setBusinessNumber(result.businessNumber || "")
            setBusinessName(result.storeName || "")
            setOwnerName(result.representativeName || "")
            setBusinessAddress(result.roadAddress || "")
            setFormStep("info")

        } catch (error: any) {
            console.error("OCR 실패:", error)
            alert(error.message || "사업자등록증 인식에 실패했습니다.")
        } finally {
            setProcessingOcr(false)
        }
    }

    const handleAddressSearch = async () => {
        if (!addressKeyword.trim()) return
        setSearchingAddress(true)
        try {
            const res = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(addressKeyword)}`, {
                headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` },
            })
            const data = await res.json()
            setAddressResults(data.documents || [])
        } catch (e) {
            console.error("주소 검색 실패", e)
        } finally {
            setSearchingAddress(false)
        }
    }

    const handleAddressSelect = (item: any) => {
        setBusinessAddress(item.road_address_name || item.address_name)
        setShowAddressSearch(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            name: ownerName,
            email: "merchant@email.com",
            phoneNumber: "01012345678",
            password: "password",
            simplePassword: "123456",
            businessNumber: businessNumber.replace(/-/g, ""),
            storeName: businessName,
            roadAddress: businessAddress,
            sidoName: selectedSido,
            sigunguName: selectedSigungu,
            storeCategory: selectedCategory,
        }
        await fetch("/api/merchants/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        router.push("/signup/wallet")
    }

    const formatBusinessNumber = (val: string) => {
        const n = val.replace(/\D/g, "")
        if (n.length <= 3) return n
        if (n.length <= 5) return `${n.slice(0, 3)}-${n.slice(3)}`
        return `${n.slice(0, 3)}-${n.slice(3, 5)}-${n.slice(5, 10)}`
    }

    return (
        <motion.div
            className="min-h-screen bg-[#FAFAFA] dark:bg-[#121212] flex flex-col"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
            }}
            transition={{ duration: 0.3 }}
        >
            <BusinessHeader />
            <div className="flex-1 flex flex-col p-6">
                <BusinessIntroBanner />

                {formStep === "capture" ? (
                    <BusinessCaptureStep
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        fileInputRef={fileInputRef}
                        videoRef={videoRef}
                        canvasRef={canvasRef}
                        cameraError={cameraError}
                        initCamera={initCamera}
                        captureImage={captureImage}
                        handleFileChange={handleFileChange}
                        processingOcr={processingOcr}
                    />
                ) : (
                    <BusinessInfoForm
                        businessNumber={businessNumber}
                        setBusinessNumber={setBusinessNumber}
                        businessName={businessName}
                        setBusinessName={setBusinessName}
                        ownerName={ownerName}
                        setOwnerName={setOwnerName}
                        businessAddress={businessAddress}
                        setBusinessAddress={setBusinessAddress}
                        detailAddress={detailAddress}
                        setDetailAddress={setDetailAddress}
                        selectedSido={selectedSido}
                        setSelectedSido={setSelectedSido}
                        selectedSigungu={selectedSigungu}
                        setSelectedSigungu={setSelectedSigungu}
                        sigunguList={sigunguList}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        loading={false}
                        onSubmit={handleSubmit}
                        onClickAddressSearch={() => setShowAddressSearch(true)}
                        formatBusinessNumber={formatBusinessNumber}
                    />
                )}
            </div>

            <BusinessAddressSearchModal
                show={showAddressSearch}
                keyword={addressKeyword}
                onChangeKeyword={setAddressKeyword}
                onSearch={handleAddressSearch}
                searching={searchingAddress}
                results={addressResults}
                onSelect={handleAddressSelect}
                onClose={() => setShowAddressSearch(false)}
            />
        </motion.div>
    )
}
