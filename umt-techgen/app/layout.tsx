import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar"; 
import Link from "next/link";
import Image from "next/image";
import { Lock, Code, Facebook, Globe, Mail, Phone, MapPin } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UMT TechGen 2026",
  description: "Giải mã công nghệ - Khơi nguồn đam mê",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        
        {/* 2. SỬ DỤNG NAVBAR MỚI Ở ĐÂY */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="pt-24 min-h-screen">
            {children}
        </main>

        {/* FOOTER - THIẾT KẾ MỚI */}
        <footer className="bg-[#0B1120] text-slate-400 py-16 border-t border-slate-800">
          <div className="container mx-auto px-4">
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm mb-16">
                {/* Cột 1: Đơn vị tổ chức */}
                <div className="flex flex-col items-start">
    <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs border-b-2 border-blue-600 pb-1 inline-block">Đơn vị tổ chức</h5>
    {/* Giữ nguyên container h-16 w-48 để không bị lệch dòng */}
    <div className="relative h-16 w-48 mb-4">
        <Image
            src="/images/logo-umt-white-edit.png"
            alt="UMT"
            fill
            // THÊM vào đây: scale-[1.3] để phóng to 130% và origin-left để phóng từ góc trái ra
            className="object-contain object-left scale-[1.3] origin-left"
        />
    </div>
    <p className="leading-relaxed text-slate-400">
        Trường Đại học Quản lý và Công nghệ Thành phố Hồ Chí Minh (UMT)
    </p>
</div>

                {/* Cột 2: Đơn vị chuyên môn */}
                <div className="flex flex-col items-start">
                    <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs border-b-2 border-blue-600 pb-1 inline-block">Đơn vị chuyên môn</h5>
                    <div className="relative h-16 w-56 mb-4">
                         {/* Logo trắng không nền */}
                        <Image src="/images/logo-kcn-white-1.png" alt="Khoa Công Nghệ" fill className="object-contain object-left" />
                    </div>
                    <p className="leading-relaxed text-slate-400">
                        Khoa Công nghệ (School of Technology)
                    </p>
                </div>

                {/* Cột 3: Đơn vị vận hành */}
                <div className="flex flex-col items-start">
                    <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs border-b-2 border-blue-600 pb-1 inline-block">Đơn vị vận hành</h5>
                    <div className="relative h-16 w-48 mb-4">
                        {/* Logo APC ngang không nền */}
                        <Image src="/images/logo-apc-ngang.png" alt="APC" fill className="object-contain object-left" />
                    </div>
                    <p className="leading-relaxed text-slate-400">
                        Câu lạc bộ Lập trình ứng dụng (APC) - Đơn vị trực thuộc Khoa Công Nghệ
                    </p>
                </div>

                {/* Cột 4: Liên hệ chi tiết */}
                <div>
                    <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs border-b-2 border-blue-600 pb-1 inline-block">Liên hệ</h5>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <MapPin size={16} className="text-blue-500 shrink-0 mt-1" />
                            <span>Văn phòng Khoa Công Nghệ, P508, Tầng 5, Tòa nhà Sáng tạo, Trường Đại học Quản lý và Công nghệ Thành phố Hồ Chí Minh, Số 2 Khu phố 9, Đường 60CL, Phường Cát Lái, Thành phố Hồ Chí Minh</span>
                        </li>
                        <li className="flex gap-3">
                            <Phone size={16} className="text-green-500 shrink-0 mt-1" />
                            <div>
                                <p>Mr. Trung: <a href="tel:0767138667" className="hover:text-white transition">0767 138 667</a></p>
                                <p>Mr. Tân: <a href="tel:0818126177" className="hover:text-white transition">0818 126 177 (Liên hệ khẩn cấp)</a></p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <Mail size={16} className="text-orange-500 shrink-0 mt-1" />
                            <div>
                                <a href="mailto:techgen@umt.edu.vn" className="block hover:text-white transition">techgen@umt.edu.vn</a>
                                <a href="mailto:trung.huynhlephu@umt.edu.vn" className="block hover:text-white transition">trung.huynhlephu@umt.edu.vn</a>
                            </div>
                        </li>
                    </ul>

                    {/* Kênh thông tin chính thức (Icons) */}
                    <div className="mt-6 pt-6 border-t border-slate-800 flex gap-4">
                        <a href="https://www.facebook.com/UMTUniversity" target="_blank" title="Facebook UMT" className="text-slate-500 hover:text-blue-500 transition"><Facebook size={18} /></a>
                        <a href="https://www.umt.edu.vn/vi-vn/" target="_blank" title="Website UMT" className="text-slate-500 hover:text-blue-400 transition"><Globe size={18} /></a>
                        <a href="https://www.facebook.com/sotumthcmc" target="_blank" title="Facebook Khoa CN" className="text-slate-500 hover:text-blue-600 transition"><Facebook size={18} /></a>
                        <a href="https://www.facebook.com/apc.umt" target="_blank" title="Facebook APC" className="text-slate-500 hover:text-orange-500 transition"><Facebook size={18} /></a>
                        <a href="https://sot.umtoj.edu.vn" target="_blank" title="UMTOJ" className="text-slate-500 hover:text-green-500 transition font-bold text-xs border border-slate-600 px-1 rounded">OJ</a>
                    </div>
                </div>
            </div>

            {/* DÒNG BẢN QUYỀN & CREDITS */}
            <div className="text-center pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col items-center gap-4">
                <p>© 2026 UMT TechGen. Bản quyền thuộc về Trường Đại học Quản lý và Công nghệ Thành phố Hồ Chí Minh.</p>
                
                {/* Credit line - Highlight nhẹ */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-blue-900/50 transition group cursor-default"><Code size={14} className="text-blue-500 group-hover:text-blue-400" />
                    <span> Website cuộc thi do đội ngũ{" "} <a href="https://www.facebook.com/apc.umt" target="_blank" className="text-slate-300 font-medium hover:text-blue-400 transition" rel="noopener noreferrer">Câu lạc bộ Lập trình ứng dụng (APC)</a>{" "} thuộc Khoa Công Nghệ xây dựng và vận hành</span>
                </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}