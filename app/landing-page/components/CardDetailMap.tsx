"use client"

import React from "react"
import CbdcIntroCard from "@/app/landing-page/components/token-detail/CBDCIntroCard"
import QRCodeCard from "@/app/landing-page/components/token-detail/QRCodeCard"
import FastTransferCard from "@/app/landing-page/components/token-detail/FastTransferCard"
import FinanceAccessCard from "@/app/landing-page/components/token-detail/FinanceAccessCard"

export const cardDetailMap: Record<string, React.ReactNode> = {
    CBDC: <CbdcIntroCard />,
    SECURE: <QRCodeCard />,
    FAST: <FastTransferCard icon="⚡" />,
    INCLUSION: <FinanceAccessCard icon="🌍" />,
}
