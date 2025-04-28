"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import Image from "next/image"
import {
  ChevronRight,
  Bell,
  Clock,
  FileText,
  History,
  Wallet,
  ArrowRight,
  Tag,
  Gift,
  MapPin,
  User,
  Megaphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Notice {
  id: string
  title: string
  content: string
  date: string
  isEvent: boolean
  isNew: boolean
}

export default function DashboardPage() {
  const [currentVoucher, setCurrentVoucher] = useState(0)
  const [currentNotice, setCurrentNotice] = useState(0)
  const [paymentDrawerState, setPaymentDrawerState] = useState<"closed" | "peek" | "open">("closed")
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const paymentDrawerRef = useRef<HTMLDivElement>(null)
  const userName = "이정민" // 사용자 이름
  const router = useRouter()

  // 추천 바우처 데이터
  const recommendedVouchers = [
    {
      department: "고용노동부",
      title: "취업 지원 바우처",
      description: "구직활동 및 직업훈련 비용 지원",
      deadline: "2023.10.31",
      amount: "월 250,000원",
      color: "#FFB020",
      icon: "💼",
      image: "/images/voucher-job.png", // JOB 이미지
    },
    {
      department: "문화체육관광부",
      title: "문화누리 바우처",
      description: "문화, 여행, 스포츠 활동 지원",
      deadline: "2023.12.15",
      amount: "연 100,000원",
      color: "#4F6EF7",
      icon: "🎭",
      image: "/images/voucher-culture.png", // 문화누리 이미지
    },
    {
      department: "보건복지부",
      title: "의료비 지원 바우처",
      description: "저소득층 의료비 부담 경감",
      deadline: "2023.11.30",
      amount: "최대 500,000원",
      color: "#10B981",
      icon: "🏥",
      image: "/images/voucher-medical.png", // 의료 지원 이미지
    },
  ]

  // 공지사항 데이터
  const notices: Notice[] = [
    {
      id: "1",
      title: "서비스 점검 안내",
      content: "2023년 9월 15일 오전 2시부터 6시까지 서비스 점검이 예정되어 있습니다. 이용에 참고 부탁드립니다.",
      date: "2023.09.10",
      isEvent: false,
      isNew: true,
    },
    {
      id: "2",
      title: "추석 맞이 이벤트",
      content: "추석을 맞이하여 특별 이벤트를 진행합니다. 최대 10만원 캐시백 혜택을 놓치지 마세요!",
      date: "2023.09.08",
      isEvent: true,
      isNew: true,
    },
    {
      id: "3",
      title: "개인정보처리방침 개정 안내",
      content: "2023년 10월 1일부터 개인정보처리방침이 개정됩니다. 자세한 내용은 공지사항을 확인해주세요.",
      date: "2023.09.01",
      isEvent: false,
      isNew: false,
    },
  ]

  // 이벤트 데이터
  const currentEvents = [
    {
      title: "여름 맞이 할인 이벤트",
      description: "선정된 가맹점에서 최대 30% 할인",
      period: "2023.07.01 ~ 2023.08.31",
      color: "#4F6EF7",
      icon: <Tag className="h-5 w-5" />,
      image: "/images/beach.png", // 바다 이미지
    },
    {
      title: "신규 가입 이벤트",
      description: "신규 가입자 첫 결제 시 5,000원 캐시백",
      period: "2023.07.15 ~ 2023.09.15",
      color: "#FF4A4A",
      icon: <Gift className="h-5 w-5" />,
      image: "/images/beach.png", // 바다 이미지
    },
  ]

  // 자동 슬라이드 기능
  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentVoucher((prev) => (prev + 1) % recommendedVouchers.length)
      }, 5000) // 5초마다 슬라이드
    }

    const startNoticeSlide = () => {
      noticeSlideTimerRef.current = setInterval(() => {
        setCurrentNotice((prev) => (prev + 1) % notices.length)
      }, 4000) // 4초마다 슬라이드
    }

    startAutoSlide()
    startNoticeSlide()

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current)
      }
      if (noticeSlideTimerRef.current) {
        clearInterval(noticeSlideTimerRef.current)
      }
    }
  }, [recommendedVouchers.length, notices.length])

  // 수동으로 바우처 변경 시 타이머 재설정
  const handleVoucherChange = (index: number) => {
    setCurrentVoucher(index)

    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current)
    }

    autoSlideTimerRef.current = setInterval(() => {
      setCurrentVoucher((prev) => (prev + 1) % recommendedVouchers.length)
    }, 5000)
  }

  // 수동으로 공지사항 변경 시 타이머 재설정
  const handleNoticeChange = (index: number) => {
    setCurrentNotice(index)

    if (noticeSlideTimerRef.current) {
      clearInterval(noticeSlideTimerRef.current)
    }

    noticeSlideTimerRef.current = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length)
    }, 4000)
  }

  // 결제 드로어 핸들링
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info

    if (offset.y < -50 || velocity.y < -500) {
      // 위로 드래그 - 결제 페이지로 이동
      router.push("/payment")
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col max-w-md mx-auto">
      {/* 헤더 */}
      <header className="bg-[#F8F9FA]  p-5 pt-8 pb-6">
        {/* 로고 및 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-6 px-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#666666]  h-10 w-10 hover:bg-[#FFD485]/20"
            onClick={() => router.push("/notifications")}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <div className="relative h-10 w-32">
            <Image src="/images/tokkit-logo.png" alt="Tokkit Logo" fill className="object-contain" priority />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#666666]  h-10 w-10 hover:bg-[#FFD485]/20"
            onClick={() => router.push("/mypage")}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>

        {/* 계좌 정보 카드 - 세련된 디자인 */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFB020] to-[#FF9500] shadow-lg mx-4 cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => router.push("/wallet")}
        >
          {/* 배경 효과 */}
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>

          {/* 3D 효과를 위한 카드 내부 */}
          <div className="relative z-10 p-5">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 shadow-md">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{userName} 님의 지갑</p>
                <p className="text-xs text-white/80">우리 1020-9564-9584</p>
              </div>
            </div>

            {/* 카드 하단 정보 */}
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs text-white/80">예금 토큰 잔액</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-3xl font-bold text-white">0</p>
                  <p className="ml-1 text-lg text-white/90">원</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-white/20 text-white hover:bg-white/30 rounded-lg text-xs px-4 py-1 h-9 shadow-sm flex items-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push("/wallet/convert-to-token")
                  }}
                >
                  <span>토큰 충전</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-[#FFB020] hover:bg-white/90 rounded-lg text-xs px-4 py-1 h-9 shadow-md font-medium"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push("/wallet/convert-to-deposit")
                  }}
                >
                  예금 전환
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col p-5 px-6 pt-8 pb-24">
        {/* 빠른 메뉴 */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-md font-medium text-[#1A1A1A]
           mb-3 px-2">빠른 메뉴</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* 바우처 신청하기 */}
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/vouchers")}
            >
              <div className="w-10 h-10 rounded-full bg-[#FFB020]/20 flex items-center justify-center mb-2">
                <FileText className="h-5 w-5 text-[#FFB020]" />
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A] ">바우처 신청하기</h4>
              <p className="text-xs text-[#666666]  mt-1">새로운 바우처 신청</p>
            </motion.div>

            {/* 내 바우처 바로가기 (이전의 바우처 이용내역) */}
            <motion.div
              className="bg-white  rounded-xl p-4 shadow-sm flex flex-col cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/my-vouchers")}
            >
              <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-2">
                <History className="h-5 w-5 text-[#10B981]" />
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A]">내 바우처 바로가기</h4>
              <p className="text-xs text-[#666666]  mt-1">보유한 바우처 확인</p>
            </motion.div>

            {/* 오프라인 사용처 조회 */}
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/offline-stores")}
            >
              <div className="w-10 h-10 rounded-full bg-[#4F6EF7]/20 flex items-center justify-center mb-2">
                <MapPin className="h-5 w-5 text-[#4F6EF7]" />
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A] ">오프라인 사용처</h4>
              <p className="text-xs text-[#666666]  mt-1">가맹점 위치 조회</p>
            </motion.div>
          </div>
        </motion.div>

        {/* 맞춤 추천 바우처 */}
        <div className="mb-8 px-2">
          <div className="flex items-center justify-between mb-3">
            <motion.h3
              className="text-md font-medium text-[#1A1A1A] flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <span className="mr-2">✨</span>
              맞춤 추천 바우처
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-[#666666]  p-0 h-auto"
                onClick={() => router.push("/vouchers")}
              >
                전체보기 <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </motion.div>
          </div>

          <div className="relative overflow-hidden h-[320px]">
            {/* 왼쪽 화살표 - 심플한 스타일 */}
            {currentVoucher > 0 && (
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/50 hover:bg-white/70 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                  onClick={() => handleVoucherChange(currentVoucher - 1)}
                >
                  <ChevronRight className="h-5 w-5 text-gray-800 rotate-180" />
                </Button>
              </div>
            )}

            {/* 오른쪽 화살표 - 심플한 스타일 */}
            {currentVoucher < recommendedVouchers.length - 1 && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/50 hover:bg-white/70 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                  onClick={() => handleVoucherChange(currentVoucher + 1)}
                >
                  <ChevronRight className="h-5 w-5 text-gray-800" />
                </Button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {recommendedVouchers.map(
                (voucher, index) =>
                  index === currentVoucher && (
                    <motion.div
                      key={voucher.title}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl p-6 shadow-sm h-[280px] relative overflow-hidden cursor-pointer"
                      onClick={() => router.push(`/vouchers/${index + 1}`)}
                    >
                      {/* 배경 이미지 */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={voucher.image || "/placeholder.svg"}
                          alt={voucher.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                      </div>

                      <div className="flex flex-col justify-between h-full relative z-20">
                        <div>
                          <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80 ">
                            {voucher.department}
                          </span>
                          <h4 className="text-2xl font-bold text-white mt-4 mb-2 drop-shadow-md">{voucher.title}</h4>
                          <p className="text-base text-white/90 mb-4 line-clamp-2 drop-shadow-md">
                            {voucher.description}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="flex items-center mb-4">
                            <Clock className="h-4 w-4 text-white/80 mr-2" />
                            <span className="text-sm text-white/80">신청마감: {voucher.deadline}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-white drop-shadow-md">{voucher.amount}</span>
                            <Button
                              className="rounded-lg px-5 py-2 text-white shadow-md text-sm h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/vouchers/apply/${index + 1}`)
                              }}
                            >
                              신청하기
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>

            {/* 페이지 인디케이터 */}
            <div className="flex justify-center gap-2 mt-6">
              {recommendedVouchers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleVoucherChange(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentVoucher === index ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 공지사항 섹션 */}
        <div className="mb-10 px-2">
          <div className="flex items-center justify-between mb-3">
            <motion.h3
              className="text-md font-medium text-[#1A1A1A] flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <span className="mr-2">📢</span>
              공지사항
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-[#666666] p-0 h-auto"
                onClick={() => router.push("/notices")}
              >
                전체보기 <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="relative h-[120px]">
              <AnimatePresence mode="wait">
                {notices.map(
                  (notice, index) =>
                    index === currentNotice && (
                      <motion.div
                        key={notice.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 cursor-pointer"
                        onClick={() => router.push(`/notices/${notice.id}`)}
                      >
                        <div className="flex items-center mb-2">
                          <div
                            className={`w-8 h-8 rounded-full ${notice.isEvent ? "bg-[#FF4A4A]/10" : "bg-[#4F6EF7]/10"} flex items-center justify-center mr-3`}
                          >
                            {notice.isEvent ? (
                              <Gift className={`h-4 w-4 ${notice.isEvent ? "text-[#FF4A4A]" : "text-[#4F6EF7]"}`} />
                            ) : (
                              <Megaphone
                                className={`h-4 w-4 ${notice.isEvent ? "text-[#FF4A4A]" : "text-[#4F6EF7]"}`}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="text-base font-medium text-[#1A1A1A] ">{notice.title}</h4>
                              {notice.isNew && (
                                <span className="ml-2 text-xs px-1.5 py-0.5 bg-[#FF4A4A] text-white rounded-full">
                                  N
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#999999]">{notice.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-[#666666]  line-clamp-2">{notice.content}</p>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>

              {/* 페이지 인디케이터 */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {notices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleNoticeChange(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentNotice === index ? "w-6 bg-[#FFB020]" : "w-1.5 bg-[#E0E0E0] "
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 결제하기 컴포넌트 - 하단에 고정 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        <motion.div
          className="bg-[#FFB020] text-white rounded-t-xl shadow-lg"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="flex items-center justify-center py-2">
            <div className="w-10 h-1 bg-white/30 rounded-full" />
          </div>
          <div className="px-4 py-2 flex items-center justify-center">
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              className="mr-2"
            >
              💳
            </motion.span>
            <span className="font-medium">결제하기</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
