import Image from "next/image";
import { Cpu, Users, Star } from "lucide-react";

export default function PartnersPage() {
  // DATA ĐỐI TÁC
  const strategicPartners = [
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
    <div className="bg-white min-h-screen font-sans text-slate-600">
      
      {/* --- HEADER --- */}
      <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 md:w-96 md:h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-48 h-48 md:w-64 md:h-64 bg-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-64 h-64 md:w-80 md:h-80 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-blue-100 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-white/10 backdrop-blur-sm">
                UMT TechGen 2026
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight">
                Đơn vị Tổ chức & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 block md:inline mt-2 md:mt-0">Đồng hành</span>
            </h1>
            <p className="text-blue-100/90 text-base md:text-xl max-w-5xl mx-auto leading-relaxed font-light px-2 text-center">
               Sự thành công của cuộc thi được kiến tạo bởi sự hợp tác chặt chẽ giữa các đơn vị uy tín hàng đầu, 
               {/* Thẻ này sẽ ngắt dòng trên PC, nhưng ẩn đi trên Mobile để chữ chảy tự nhiên */}
               <br className="hidden md:inline" />
               cùng chung sứ mệnh ươm mầm tài năng công nghệ trẻ.
            </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-8 md:h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-24 max-w-6xl">
        
        {/* --- 1. ĐỐI TÁC CHIẾN LƯỢC --- */}
        <section className="text-center">
            <div className="mb-8 md:mb-10">
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">
                    Đối tác Chiến lược
                </h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0 max-w-4xl mx-auto">
                {strategicPartners.map((partner) => (
                    // Đổi từ div sang thẻ a để gắn link
                    <a 
                        key={partner.id} 
                        href={partner.website} // Link website sẽ được lấy từ data ở trên
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block h-40 md:h-48 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300 group cursor-pointer"
                    >
                        <div className="relative w-full h-full">
                            <Image 
                                src={partner.src} 
                                alt={partner.name} 
                                fill 
                                // Đã xóa class grayscale để hiện màu luôn
                                className="object-contain transition duration-500 group-hover:scale-105" 
                            />
                        </div>
                    </a>
                ))}
            </div>
        </section>

        {/* --- 2. ĐỐI TÁC ĐỒNG HÀNH --- */}
        <section className="text-center">
            <div className="mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 md:mb-4">
                    Đối tác Đồng hành
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
                    Cảm ơn sự đồng hành quý báu từ các doanh nghiệp và tổ chức giáo dục.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 px-2 md:px-0">
                {companionPartners.map((partner) => (
                    <a 
                        key={partner.id} 
                        href={partner.website}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block h-24 md:h-32 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-4 hover:border-blue-200 hover:shadow-md transition duration-300 group cursor-pointer"
                    >
                         <div className="relative w-full h-full">
                            <Image 
                                src={partner.src} 
                                alt={partner.name} 
                                fill 
                                // Đã xóa class grayscale
                                className="object-contain transition duration-300 group-hover:scale-110" 
                            />
                        </div>
                    </a>
                ))}
            </div>
        </section>

        {/* Separator Line */}
        <div className="w-full h-px bg-slate-100"></div>

        {/* --- 2. ĐƠN VỊ TỔ CHỨC (UMT) --- */}
        <section className="relative">
            <div className="text-center mb-8 md:mb-12">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg">
                    Đơn vị Tổ chức
                </span>
            </div>

            {/* Card UMT Nổi Bật */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-slate-100 overflow-hidden relative mx-2 md:mx-0">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-r from-blue-900 to-blue-700"></div>
                <div className="absolute top-2 right-2 md:top-4 md:right-4 text-white/20">
                    <Star size={80} className="md:w-[120px] md:h-[120px]" />
                </div>

                <div className="relative pt-12 md:pt-16 px-4 md:px-8 pb-8 md:pb-12 flex flex-col items-center text-center">
                    {/* Logo Container nổi lên */}
                    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-6 md:mb-8 border border-slate-50">
                        {/* Responsive Logo Size */}
                        <div className="relative h-16 w-56 sm:h-24 sm:w-72 md:h-32 md:w-96">
                            <Image src="/images/logo-umt.png" alt="Trường Đại học UMT" fill className="object-contain" />
                        </div>
                    </div>

                    <div className="w-full max-w-4xl">
                        <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 px-2">
                            Trường Đại học Quản lý và Công nghệ Thành phố Hồ Chí Minh
                        </h3>
                        
                        <p className="text-slate-600 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto mb-6 md:mb-0">
                            Đơn vị chủ quản, chịu trách nhiệm chỉ đạo toàn diện, đảm bảo nguồn lực tài chính, cơ sở vật chất và tính pháp lý cho toàn bộ cuộc thi. UMT cam kết mang đến một sân chơi học thuật chuẩn mực, chuyên nghiệp và đẳng cấp quốc tế cho học sinh THPT.
                        </p>
                        
                        {/* Tags scrollable on mobile */}
                        <div className="mt-6 md:mt-8 flex flex-row justify-start md:justify-center gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-2 no-scrollbar px-2">
                            <div className="bg-blue-100 text-blue-800 px-3 py-2 md:px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-sm whitespace-nowrap flex-shrink-0">
                                Chuyên nghiệp
                            </div>
                            <div className="bg-emerald-100 text-emerald-800 px-3 py-2 md:px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-sm whitespace-nowrap flex-shrink-0">
                                Hòa hợp
                            </div>
                            <div className="bg-orange-100 text-orange-800 px-3 py-2 md:px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-sm whitespace-nowrap flex-shrink-0">
                                Khai phóng
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- 3. ĐƠN VỊ CHUYÊN MÔN (KHOA CN) --- */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl md:rounded-3xl p-6 md:p-16 shadow-sm border border-blue-100/50 mx-2 md:mx-0">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                {/* Left: Logo Box */}
                <div className="md:w-5/12 w-full flex justify-center">
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-3/4 md:w-full aspect-square max-w-[280px] md:max-w-[320px] flex items-center justify-center transition duration-500">
                        <div className="relative w-full h-full">
                            <Image src="/images/sot-xanh.png" alt="Khoa Công Nghệ" fill className="object-contain" />
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="md:w-7/12 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider mb-3 md:mb-4 text-xs md:text-sm">
                        <Cpu size={16} className="md:w-[18px] md:h-[18px]" /> Đơn vị Chuyên môn
                    </div>

                    <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 md:mb-6">
                        Khoa Công Nghệ
                    </h3>

                    <p className="text-slate-600 text-sm md:text-lg mb-6 leading-relaxed">
                        Chịu trách nhiệm toàn bộ về nội dung học thuật: Xây dựng đề thi, thành lập Hội đồng ra đề và chấm thi, tổ chức các buổi hướng dẫn chuyên môn (training) và đảm bảo chất lượng chuyên môn cao nhất cho kỳ thi.
                    </p>

                    <div className="space-y-3 text-sm md:text-base">
                        <div className="flex items-start gap-3 text-slate-700 justify-start text-left">
                            <div className="mt-1.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full shrink-0"></div>
                            <p>Hội đồng giám khảo uy tín do PGS.TS. Trần Đan Thư - Trưởng Khoa Công Nghệ làm Chủ tịch Hội đồng Giám khảo.</p>
                        </div>

                        <div className="flex items-start gap-3 text-slate-700 justify-start text-left">
                            <div className="mt-1.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full shrink-0"></div>
                            <p>Đội ngũ giảng viên & Mentor giàu kinh nghiệm.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* --- 4. ĐƠN VỊ VẬN HÀNH (APC) --- */}
        <section className="bg-[#FFF9F5] rounded-2xl md:rounded-3xl p-6 md:p-16 border border-orange-100 mx-2 md:mx-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
                
                {/* Left: Text Content */}
                {/* Responsive order: Text dưới logo trên mobile */}
                <div className="md:w-3/5 text-center md:text-left order-2 md:order-1">
                    <div className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase tracking-wider mb-4 md:mb-6 text-xs md:text-sm">
                        <Users size={16} className="md:w-[18px] md:h-[18px]" /> Đơn vị Vận hành hệ thống
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 md:mb-6">
                        CLB Lập trình ứng dụng (APC) thuộc <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 block md:inline mt-2 md:mt-0">Khoa Công Nghệ</span>
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6 md:mb-8 text-sm md:text-lg">
                        Đội ngũ kỹ thuật nòng cốt, chịu trách nhiệm triển khai và vận hành hệ thống chấm thi trực tuyến <strong>UMT Online Judge (UMTOJ)</strong>. APC đảm bảo hệ thống hoạt động ổn định, công bằng và hỗ trợ kỹ thuật xuyên suốt cho thí sinh trong quá trình thi đấu.
                    </p>
                    <div className="inline-block bg-white text-orange-800 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold border border-orange-200 text-xs md:text-sm shadow-sm hover:shadow-md transition-shadow">
                        "Applied Programming Club - Nơi đam mê tỏa sáng"
                    </div>
                </div>

                {/* Right: Logo APC */}
                {/* Responsive order: Logo trên text dưới trên mobile */}
                <div className="md:w-2/5 flex justify-center order-1 md:order-2">
                    {/* Resize circle on mobile */}
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 flex items-center justify-center bg-white rounded-full shadow-[0_20px_50px_rgba(251,146,60,0.15)] p-10 md:p-16 border border-white/50">
                        <div className="relative w-full h-full transition-transform duration-500 hover:scale-105">
                             <Image 
                                src="/images/logo-apc.png" 
                                alt="CLB APC" 
                                fill 
                                className="object-contain" 
                             />
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}