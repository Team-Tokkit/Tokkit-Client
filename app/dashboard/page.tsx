import QuickMenuSection from "@/components/dashboard/quickmenu/QuickMenuSection";
import RecommendedVouchersSection from "@/components/dashboard/voucher/RecommendedVouchersSection";
import NoticesSection from "@/components/dashboard/notices/NoticesSection";
import Header from "@/components/dashboard/Header";
import PaymentDrawer from "@/components/dashboard/payment_drawer/PaymentDrawer";
import {Suspense} from "react";
import WalletFetcher from "@/components/dashboard/walletcard/WalletFetcher";


export default function DashboardPage() {
  return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col max-w-md mx-auto">
        <header className="bg-[#F8F9FA] p-5 pt-8 pb-6">
          <Header />
      
            <WalletFetcher />
        </header>
        <div className="flex-1 flex flex-col p-5 px-6 pt-8 pb-24">
          <QuickMenuSection />
          <RecommendedVouchersSection />
          <NoticesSection />
        </div>
        <PaymentDrawer />
      </div>
  );
}
