"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, Trophy, Users, Star, Sparkles, Calendar, Zap, BellRing } from "lucide-react"; // Import thêm icon
import RunningText from '@/components/RunningText';

export default function Home() {
  const heroImages = [
    "/images/Logo_Techgen_2025.jpg",
    "/images/Banner01.jpg", 
    "/images/logo-umt.png",
    "/images/logo-kcn.png",
    "/images/logo-apc-ngang.png",
    "/images/umt-01.jpg",
    "/images/umt-02.jpg",
    "/images/umt-03.jpg",
    "/images/umt-04.jpg",
    "/images/umt-05.jpg",
    "/images/umt-06.jpg",
  ];

const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dynamicDateText, setDynamicDateText] = useState("");

  useEffect(() => {
    // Slideshow
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 1000);

    // Logic ngày
    const now = new Date();
    const deadline = new Date("2026-01-31T23:59:59");
    const displayDate = now < deadline ? now : deadline;
    const d = displayDate.getDate();
    const m = displayDate.getMonth() + 1;
    const y = displayDate.getFullYear();
    setDynamicDateText(`${d} tháng ${m} năm ${y}`);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Nội dung chữ chạy (Tách ra biến để dùng lại cho việc nhân đôi)
  const marqueeContent = (
    <div className="flex items-center gap-4 mx-4 md:mx-8">
        <span className="flex items-center gap-2 text-yellow-300 font-black uppercase tracking-wider text-sm md:text-base whitespace-nowrap">
            <BellRing className="w-5 h-5 animate-bounce" /> THÔNG BÁO:
        </span>
        <span className="text-white font-bold text-sm md:text-lg whitespace-nowrap">
            Đến ngày <span className="text-yellow-300 underline decoration-2 underline-offset-4">{dynamicDateText}</span> Kỳ thi TechGen 2026 vẫn nhận đơn đăng ký
        </span>
        <span className="flex items-center gap-1 text-white/90 text-sm md:text-base italic whitespace-nowrap">
             — <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400"/> Nhanh tay đăng ký tranh tài để giành các giải thưởng hấp dẫn với tổng giải thưởng hơn 100 triệu đồng! 
        </span>
    </div>
  );

  // DATA ĐỐI TÁC
  const strategicPartners = [
    { id: 0, name: "UMT", src: "/images/logo_umt_ntt.png", isHost: true }, 
    { id: 1, name: "Hội Tin học TP.HCM", src: "/images/hca_hcm.png", website: "https://www.hca.org.vn/" },
    { id: 2, name: "VNetwork", src: "/images/14_Vnetwork.png", website: "https://www.vnetwork.vn/" },
    { id: 3, name: "ZaloPay", src: "/images/Zalopay_logo_umt.png", website: "https://zalopay.vn/" },
    { id: 4, name: "SITC", src: "/images/sitc.png", website: "https://www.sitc.edu.vn/" },
  ];

  const companionPartners = [
    { id: 5, name: "Vinasa", src: "/images/13_vinasa.png", website: "https://vinasa.org.vn/" },
    { id: 6, name: "VNPT", src: "/images/vnpt-1.png", website: "https://vinhlong.vnpt.vn/" },
    { id: 6, name: "Vinaphone", src: "/images/vinaphone.png", website: "https://vinhlong.vnpt.vn/" },
    { id: 7, name: "BytePlus", src: "/images/BytePlus_Company_Logo.png", website: "https://www.byteplus.com/en" },
    { id: 8, name: "Đoàn Thanh Niên", src: "/images/logo-doan-thanh-nien.png", website: "https://www.facebook.com/profile.php?id=61582599270594" },
    { id: 9, name: "THD", src: "/images/5_thd.png", website: "https://thdcybersecurity.com/" },
    { id: 10, name: "InnoEx", src: "/images/6_innoex.png", website: "https://innoex.vn/vi/" },
    { id: 11, name: "IVS", src: "/images/7_ivs.png", website: "https://indivisys.vn/" },
    { id: 12, name: "Braney", src: "/images/8_braney.png", website: "https://braney.vn/" },
    { id: 13, name: "PVcomBank", src: "/images/9_pvcombank.png", website: "https://www.pvcombank.com.vn/" },
    { id: 14, name: "QuickCom", src: "/images/10_quickcom1.png", website: "https://quickom.net/" },
    { id: 15, name: "SoftWorld", src: "/images/11_softworld_co.png", website: "https://softworldvietnam.com/" },
    { id: 16, name: "VietDynamic", src: "/images/12_vietdynamic.png", website: "https://vietdynamic.com.vn/" },
    { id: 17, name: "AIHAY", src: "/images/4_AIHAY.png", website: "https://ai-hay.vn/" },
    { id: 18, name: "WESET", src: "/images/15_weset.png", website: "https://weset.edu.vn/" },
  ];

  return (
    <div className="flex flex-col gap-0 font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-slate-50 pt-8 pb-16 overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-400/10 rounded-full blur-[60px] md:blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-indigo-500/10 rounded-full blur-[40px] md:blur-[80px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto px-4">

            {/* --- 2. THÊM MỚI: DÒNG CHỮ CHẠY (TICKER) --- */}
            <div className="relative z-30 max-w-5xl mx-auto mb-8 md:mb-12">
                <div className="relative overflow-hidden rounded-xl md:rounded-full bg-gradient-to-r from-red-600 via-orange-600 to-red-600 shadow-xl shadow-orange-500/30 border-2 border-white/20">
                    
                    <div className="flex py-3 md:py-4 w-full overflow-hidden group">
                        
                        {/* THAY ĐỔI: Thêm class [animation-duration:20s] để ghi đè thời gian 40s mặc định.
                            Số càng nhỏ chạy càng nhanh.
                        */}
                        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around group-hover:[animation-play-state:paused] [animation-duration:20s]">
                            {marqueeContent}
                        </div>

                        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around group-hover:[animation-play-state:paused] [animation-duration:20s]" aria-hidden="true">
                            {marqueeContent}
                        </div>

                    </div>
                    
                    {/* Hiệu ứng bóng kính */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                </div>
            </div>
            
            {/* --- PHẦN NHÀ TÀI TRỢ --- */}
            <div className="relative z-20 mb-8 md:mb-12 animate-fade-in-down">
                <div className="bg-white/60 backdrop-blur-md border border-white/60 shadow-xl shadow-blue-900/5 rounded-2xl md:rounded-[2rem] p-4 md:p-10 text-center">
                    <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 md:mb-8">
                        Đơn vị tổ chức & Đối tác chiến lược
                    </p>
                    
                    {/* Logo Chiến Lược - Responsive Size */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-20 mb-6 md:mb-10">
                        {strategicPartners.map((partner) => (
    <div 
        key={partner.id} 
        // Mobile: h-12 w-24 | PC: h-24 w-48
        // SỬA DÒNG DƯỚI ĐÂY:
        className={`group relative h-12 w-24 md:h-24 md:w-48 transition-all duration-300 hover:scale-105 ${
            partner.id === 2 ? 'scale-110 md:scale-125' : ''
        }`}
    >
        <Image 
            src={partner.src} 
            alt={partner.name} 
            fill 
            className="object-contain filter drop-shadow-sm" 
            title={partner.name}
        />
    </div>
))}
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6 md:my-8 max-w-4xl mx-auto"></div>
                    
                    {/* Logo Đồng Hành */}
                    <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-6">
                        Đơn vị đồng hành
                    </p>
                    {/* Gap nhỏ hơn trên mobile (gap-x-6) để xếp được nhiều logo hơn */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-6 md:gap-x-10 md:gap-y-8 opacity-90">
                         {companionPartners.map((partner) => (
                                <div key={partner.id} className="relative h-6 w-16 md:h-12 md:w-28 transition duration-300 hover:scale-110 cursor-pointer" title={partner.name}>
                                    <Image src={partner.src} alt={partner.name} fill className="object-contain" />
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* PHẦN GIỮA: CONTENT & SLIDESHOW */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
                
                {/* LEFT: TEXT CONTENT */}
                <div className="space-y-4 md:space-y-6 text-center lg:text-left animate-fade-in-up">
                    
                    {/* Main Title - Sử dụng text-balance để tránh rớt chữ xấu */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.15] md:leading-[1.1] tracking-tight text-balance">
                        UMT TechGen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block">2026</span>
                    </h1>
                    
                    {/* Slogan & Description */}
                    <div className="space-y-3 md:space-y-4">
                        <p className="text-lg md:text-2xl font-bold text-slate-700 leading-relaxed text-balance">
                            Giải mã công nghệ, khơi nguồn đam mê
                        </p>
                        <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium text-pretty">
                            Sân chơi lập trình quy mô toàn quốc. Nơi tài năng trẻ tỏa sáng và cơ hội nhận học bổng đại học giá trị.
                        </p>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start px-4 sm:px-0">
                        <Link href="/dang-ky" className="group bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-1 w-full sm:w-auto">
                            <Sparkles size={18} className="fill-white/20" />
                            Đăng ký ngay
                        </Link>
                        <Link href="/chuong-trinh" className="group bg-white text-slate-700 border border-slate-200 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                            Tìm hiểu thêm
                        </Link>
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                         {['#UMTTechGen2026', '#GiaiMaCongNghe', '#KhoiNguonDamMe', '#UMTOJ'].map((tag, idx) => (
                            <span key={idx} className="text-[10px] md:text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT: SLIDESHOW */}
                {/* Mobile: h-[280px] để không chiếm hết màn hình dọc */}
                <div className="relative order-first lg:order-last h-[280px] sm:h-[450px] lg:h-[550px] w-full flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[2rem] md:rounded-[3rem] -rotate-3 -z-10"></div>
                    
                    <div className="relative w-full h-full bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all hover:scale-[1.01] duration-500">
                         <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-50">
                            {heroImages.map((src, index) => (
                                <div 
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center bg-white ${
                                        index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                    }`}
                                >
                                    <Image 
                                        src={src} 
                                        alt={`TechGen Highlight ${index}`} 
                                        fill 
                                        className="object-contain p-2 md:p-4" 
                                        priority={index === 0}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                            {heroImages.map((_, idx) => (
                                <div 
                                    key={idx}
                                    className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-4 md:w-6 bg-white" : "w-1 md:w-1.5 bg-white/50"}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </section>

      <RunningText />

      {/* 2. PROGRAM SUMMARY */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-xs md:text-sm block mb-2">Về cuộc thi</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4 md:mb-6 text-center text-balance">
            Mục tiêu & Giá trị
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto text-center text-pretty">
            TechGen 2026 không chỉ là một kỳ thi, mà là bệ phóng tài năng công nghệ trẻ. 
            Chúng tôi tìm kiếm những "chiến binh" xuất sắc nhất để trao tặng các suất học bổng toàn phần.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16 text-left">
             <div className="group p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center text-orange-500 mb-4 md:mb-6 shadow-sm border border-orange-100 group-hover:scale-110 transition"><Trophy size={24} className="md:w-7 md:h-7" /></div>
                <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 md:mb-3">Giải thưởng lớn</h4>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">Giải thưởng trị giá 100 triệu đồng tiền mặt, học bổng 100% học phí toàn khóa và nhiều phần quà hấp dẫn khác.</p>
             </div>
             <div className="group p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 md:mb-6 shadow-sm border border-blue-100 group-hover:scale-110 transition"><Users size={24} className="md:w-7 md:h-7" /></div>
                <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 md:mb-3">Kết nối chuyên gia</h4>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">Được mentoring trực tiếp bởi giảng viên Khoa Công nghệ và chuyên gia doanh nghiệp.</p>
             </div>
             <div className="group p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center text-yellow-500 mb-4 md:mb-6 shadow-sm border border-yellow-100 group-hover:scale-110 transition"><Star size={24} className="md:w-7 md:h-7" /></div>
                <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 md:mb-3">Trải nghiệm Đại học</h4>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">Tham quan Campus UMT hiện đại chuẩn quốc tế và trải nghiệm môi trường sinh viên.</p>
             </div>
          </div>

          <Link href="/chuong-trinh" className="inline-flex items-center gap-2 text-blue-600 font-bold text-base md:text-lg hover:gap-3 transition-all hover:underline">
            Xem chi tiết chương trình <ArrowRight size={18} className="md:w-5 md:h-5" />
          </Link>
        </div>
      </section>

      {/* 3. TIMELINE SUMMARY */}
      <section className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white">Lộ trình cuộc thi</h2>
                    <p className="text-slate-400 max-w-3xl text-base md:text-lg">Hành trình 5 tháng từ Sơ loại đến Chung kết vinh quang.</p>
                </div>
                <Link href="/lich-trinh" className="bg-white/10 hover:bg-white/20 px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-semibold transition backdrop-blur-md shrink-0 border border-white/10 text-white flex items-center gap-2 text-sm md:text-base">
                    Xem lịch trình chi tiết <ArrowRight size={16}/>
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting Line - Chỉ hiện trên Desktop */}
                <div className="hidden md:block absolute top-[2.5rem] left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-slate-700 via-blue-900 to-slate-700 -z-0"></div>
                
                {/* Card 1 */}
                <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500 transition group hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 border-4 border-blue-600 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mb-4 md:mb-6 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition text-white mx-auto md:mx-0">
                        01
                    </div>
                    <div className="text-blue-400 font-bold text-xs md:text-sm mb-2 uppercase tracking-wider">Tháng 12/2025</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white">Vòng Sơ loại</h3>
                    <p className="text-sm md:text-base text-slate-400">Thi trực tuyến trên hệ thống UMTOJ. Thử thách tư duy logic và kỹ năng lập trình cơ bản.</p>
                </div>

                {/* Card 2 */}
                <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500 transition group hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 border-4 border-blue-500 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mb-4 md:mb-6 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition text-white mx-auto md:mx-0">
                        02
                    </div>
                    <div className="text-blue-400 font-bold text-xs md:text-sm mb-2 uppercase tracking-wider">Tháng 01 - 03/2026</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white">Vòng Chính thức</h3>
                    <p className="text-sm md:text-base text-slate-400">Thi đấu tập trung. Giải quyết các bài toán thuật toán nâng cao. Training cùng chuyên gia.</p>
                </div>

                {/* Card 3 */}
                <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500 transition group hover:-translate-y-2 duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 border-4 border-orange-500 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mb-4 md:mb-6 shadow-lg shadow-orange-900/50 group-hover:scale-110 transition text-white mx-auto md:mx-0">
                        03
                    </div>
                    <div className="text-orange-400 font-bold text-xs md:text-sm mb-2 uppercase tracking-wider">Tháng 04/2026</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white">Vòng Chung kết</h3>
                    <p className="text-sm md:text-base text-slate-400">Tranh tài trực tuyến thời gian thực & Lễ trao giải vinh danh tại UMT.</p>
                </div>
            </div>
        </div>
      </section>

      {/* 4. RULES SUMMARY */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6 text-balance">Bạn thuộc bảng đấu nào?</h2>
                <p className="text-slate-600 text-base md:text-lg max-w-4xl mx-auto text-pretty">Cuộc thi được thiết kế phân bảng để đảm bảo tính công bằng cho mọi đối tượng học sinh THPT.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {/* Giảm padding từ p-10 xuống p-6 trên mobile */}
                <Link href="/the-le" className="group bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:shadow-blue-900/10 transition duration-300 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white transition duration-300 transform group-hover:rotate-12">
                        <span className="text-2xl md:text-4xl font-black">A</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">Bảng A</h3>
                    <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg">Dành cho học sinh lớp Chuyên Tin hoặc đã có giải thưởng Tin học cấp Tỉnh/Thành phố (chưa đạt giải quốc gia).</p>
                    <span className="text-blue-600 font-bold text-sm md:text-base group-hover:underline flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                        Xem điều kiện <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                    </span>
                </Link>

                <Link href="/the-le" className="group bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-lg hover:shadow-2xl hover:shadow-teal-900/10 transition duration-300 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:bg-teal-600 group-hover:text-white transition duration-300 transform group-hover:rotate-12">
                        <span className="text-2xl md:text-4xl font-black">B</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">Bảng B</h3>
                    <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg">Dành cho học sinh THPT thuộc các trường hợp còn lại.</p>
                    <span className="text-teal-600 font-bold text-sm md:text-base group-hover:underline flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full group-hover:bg-teal-600 group-hover:text-white transition">
                        Xem điều kiện <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                    </span>
                </Link>
            </div>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
        <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-8 tracking-tight text-balance">Sẵn sàng chinh phục <br className="hidden md:block"/> đỉnh cao công nghệ?</h2>
            <p className="text-blue-100 mb-8 md:mb-12 max-w-4xl mx-auto text-base md:text-xl font-medium text-pretty">Đừng bỏ lỡ cơ hội khẳng định bản thân và giành lấy những suất học bổng giá trị từ UMT.</p>
            <Link href="/dang-ky" className="inline-block bg-white text-blue-700 px-8 py-4 md:px-12 md:py-5 rounded-full font-extrabold text-lg md:text-xl hover:bg-blue-50 transition shadow-2xl shadow-blue-900/20 transform hover:scale-105 hover:-translate-y-1 w-full md:w-auto">
                Đăng ký tham gia ngay
            </Link>
        </div>
      </section>

    </div>
  );
}