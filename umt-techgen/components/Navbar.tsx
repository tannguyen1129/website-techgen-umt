"use client"; // Bắt buộc dòng này để dùng useState

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icon menu và đóng

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 md:h-24 flex justify-between items-center">
        
        {/* LOGO GROUP */}
        <Link href="/" className="flex items-center gap-2 md:gap-6">
          {/* Logo UMT */}
          <div className="relative h-14 w-40 sm:h-24 sm:w-80 shrink-0">
    <Image
      src="/images/logo-umt-2dong-xanh.png"
      alt="UMT"
      fill
      className="object-contain object-left"
    />
  </div>
          
          {/* Đường kẻ dọc - Hiện luôn trên mọi màn hình */}
          <div className="h-6 w-[1px] bg-slate-300 sm:h-8"></div>
          
          {/* Logo Khoa Công Nghệ - Đã xóa 'hidden' */}
          <div className="relative h-6 w-26 sm:h-14 sm:w-50 shrink-0">
            <Image src="/images/sot-xanh.png" alt="KCN" fill className="object-contain object-left" />
          </div>
        </Link>

        {/* DESKTOP MENU (Ẩn trên Mobile) */}
        <div className="hidden xl:flex gap-8 text-base font-semibold text-slate-700">
          <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
          <Link href="/chuong-trinh" className="hover:text-blue-600 transition">Chương trình</Link>
          <Link href="/lich-trinh" className="hover:text-blue-600 transition">Mốc thời gian</Link>
          <Link href="/the-le" className="hover:text-blue-600 transition">Thể lệ</Link>
          <Link href="/doi-tac" className="hover:text-blue-600 transition">Đối tác</Link>
          <Link href="/thong-bao" className="hover:text-blue-600 transition">Thông báo</Link>
          <Link href="/lien-he" className="hover:text-blue-600 transition">Liên hệ</Link>
        </div>

        {/* BUTTON ĐĂNG KÝ (Desktop) */}
        <div className="hidden xl:block">
            <Link href="/dang-ky" className="bg-blue-900 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition shadow-lg hover:shadow-blue-900/20">
            Đăng ký ngay
            </Link>
        </div>

        {/* MOBILE MENU TOGGLE (Hiện trên Mobile) */}
        <button 
            className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {/* Hiển thị khi isOpen = true */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-fade-in-down">
            <Link href="/" onClick={() => setIsOpen(false)} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold text-slate-700">Trang chủ</Link>
            <Link href="/chuong-trinh" onClick={() => setIsOpen(false)} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold text-slate-700">Chương trình</Link>
            <Link href="/lich-trinh" onClick={() => setIsOpen(false)} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold text-slate-700">Mốc thời gian</Link>
            <Link href="/the-le" onClick={() => setIsOpen(false)} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold text-slate-700">Thể lệ</Link>
            <Link href="/doi-tac" onClick={() => setIsOpen(false)} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold text-slate-700">Đối tác</Link>
            <Link href="/thong-bao" onClick={() => setIsOpen(false)} className="p-4 bg-blue-50 text-blue-700 rounded-xl font-bold text-lg border-b border-blue-100">Thông báo</Link>
            <Link href="/lien-he" onClick={() => setIsOpen(false)} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold text-slate-700">Liên hệ</Link>
            <Link href="/dang-ky" onClick={() => setIsOpen(false)} className="bg-blue-900 text-center text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition shadow-lg mt-2">
              Đăng ký ngay
            </Link>
        </div>
      )}
    </nav>
  );
}