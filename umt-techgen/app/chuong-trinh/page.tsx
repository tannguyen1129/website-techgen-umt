import { Target, Cpu, BookOpen, GraduationCap, Video, Users, CheckCircle, Zap } from "lucide-react";

export default function ProgramPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. HERO HEADER */}
      {/* Responsive: Giảm py-20 xuống py-16 trên mobile */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-12 -translate-x-10"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-800 border border-blue-700 text-blue-200 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
            Tổng quan cuộc thi
          </span>
          {/* Responsive: text-3xl cho mobile, text-6xl cho desktop */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
            Chương trình & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Mục đích</span>
          </h1>
          <p className="text-blue-100 max-w-5xl mx-auto text-base md:text-xl leading-relaxed px-2">
            Không chỉ là một kỳ thi, UMT TechGen là hành trình khai phá tiềm năng, nơi kiến thức Toán học và Tin học giao thoa để giải quyết các vấn đề thực tiễn.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 md:-mt-10 relative z-20">
        
        {/* 2. MỤC ĐÍCH (GOALS) */}
        {/* Grid tự động: 1 cột trên mobile, 3 cột trên desktop */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 md:mb-20">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-2 transition duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <Target size={28} className="md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Sân chơi chuyên nghiệp</h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Tạo môi trường thi đấu công bằng cho học sinh THPT toàn quốc, giúp các em cọ xát và làm quen với áp lực thi đấu chuẩn quốc tế.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-2 transition duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <Zap size={28} className="md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Khơi nguồn đam mê</h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Khơi dậy tư duy thuật toán và kỹ năng giải quyết vấn đề - những hành trang cốt lõi cho kỷ nguyên số.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-2 transition duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <GraduationCap size={28} className="md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Tìm kiếm tài năng</h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Phát hiện và bồi dưỡng các nhân tố xuất sắc, tạo nguồn tuyển sinh chất lượng cao cho ngành CNTT.
            </p>
          </div>
        </div>

        {/* 3. NỘI DUNG CHUYÊN MÔN */}
        {/* Flex-col trên mobile (dọc), Flex-row trên desktop (ngang) */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-16 md:mb-24">
          <div className="w-full md:w-1/2 relative flex justify-center">
             {/* Decorative box */}
             <div className="w-full max-w-[320px] md:max-w-full aspect-square bg-slate-900 rounded-2xl p-4 md:p-6 relative overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm text-blue-200 opacity-80 mt-2">
                   <p><span className="text-purple-400">const</span> <span className="text-yellow-300">exam</span> = &#123;</p>
                   <p className="pl-4">type: <span className="text-green-300">"Competitive Programming"</span>,</p>
                   <p className="pl-4">subjects: [<span className="text-green-300">"Math"</span>, <span className="text-green-300">"Informatics"</span>],</p>
                   <p className="pl-4">platform: <span className="text-green-300">"UMTOJ"</span>,</p>
                   <p className="pl-4">difficulty: <span className="text-red-400">"High"</span></p>
                   <p>&#125;;</p>
                </div>
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                   <div className="flex items-center gap-2 text-white font-bold text-lg md:text-xl">
                      <Cpu className="animate-spin-slow" size={20} /> UMT TechGen
                   </div>
                </div>
             </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
             <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Nội dung thi đấu</h2>
             <p className="text-base md:text-lg text-slate-600">
                Đề thi được xây dựng bám sát chương trình, mở rộng với hướng tiếp cận hiện đại:
             </p>
             
             <ul className="space-y-4">
                <li className="flex items-start gap-3">
                   <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 shrink-0"><CheckCircle size={16} /></div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-sm md:text-base">Kết hợp Toán & Tin</h4>
                      <p className="text-slate-500 text-xs md:text-sm">Vận dụng tư duy toán học để tối ưu hóa giải thuật lập trình.</p>
                   </div>
                </li>
                <li className="flex items-start gap-3">
                   <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 shrink-0"><CheckCircle size={16} /></div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-sm md:text-base">Kỹ năng giải quyết vấn đề</h4>
                      <p className="text-slate-500 text-xs md:text-sm">Đánh giá khả năng phân tích bài toán thực tế và chuyển hóa thành code.</p>
                   </div>
                </li>
                <li className="flex items-start gap-3">
                   <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 shrink-0"><CheckCircle size={16} /></div>
                   <div>
                      <h4 className="font-bold text-slate-800 text-sm md:text-base">Hệ thống chấm tự động</h4>
                      <p className="text-slate-500 text-xs md:text-sm">Thi trực tuyến trên hệ thống UMT Online Judge (UMTOJ) chuẩn ACM/ICPC.</p>
                   </div>
                </li>
             </ul>
          </div>
        </div>

        {/* 4. ĐIỂM NHẤN: TRAINING & SUPPORT */}
        <div className="bg-blue-50 rounded-2xl md:rounded-3xl p-6 md:p-12 mb-16 md:mb-20 border border-blue-100">
           <div className="text-center mb-8 md:mb-12">
             <span className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Quyền lợi đặc biệt</span>
             <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">Chuỗi Hướng dẫn chuyên môn (Training)</h2>
             <p className="text-slate-800 font-medium max-w-3xl mx-auto mt-4 text-base md:text-lg">
                 Không để thí sinh "bơi" một mình, BTC tổ chức các buổi training xen kẽ giữa các vòng thi để trang bị kiến thức nền tảng vững chắc.
             </p>
           </div>

           <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 md:mb-6">
                    <Video size={20} className="md:w-6 md:h-6" />
                 </div>
                 <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 md:mb-3">Học trực tuyến</h4>
                 <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                   Tổ chức qua Microsoft Teams, linh hoạt cho thí sinh cả nước tham gia.
                 </p>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 md:mb-6">
                    <BookOpen size={20} className="md:w-6 md:h-6" />
                 </div>
                 <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 md:mb-3">Nội dung chuyên sâu</h4>
                 <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                   Ôn tập Toán - Tin trọng tâm, tư duy thuật toán và kỹ thuật lập trình nâng cao.
                 </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4 md:mb-6">
                    <Users size={20} className="md:w-6 md:h-6" />
                 </div>
                 <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 md:mb-3">Mentor chất lượng</h4>
                 <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                   Được hướng dẫn trực tiếp bởi Giảng viên và sinh viên Khoa Công Nghệ đạt giải Olympic Tin học sinh viên.
                 </p>
              </div>
           </div>

           {/* Lịch trình dự kiến */}
           <div className="mt-8 md:mt-12 border-t border-blue-200/60 pt-8">
             <h4 className="font-bold text-slate-900 mb-6 text-center text-base md:text-lg">Lộ trình Training dự kiến</h4>
             
             <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
                 {/* Item 1 */}
                 <div className="bg-white px-4 py-3 rounded-xl border border-blue-100 text-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 transition flex items-center gap-2 w-full sm:w-auto">
                   <div className="bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold px-2 py-1 rounded uppercase shrink-0">Đợt 1</div>
                   <span className="text-sm font-medium">Trước Vòng Chính thức 1 <span className="text-slate-400 mx-1 hidden sm:inline">|</span> <span className="block sm:inline text-xs sm:text-sm text-slate-500 sm:text-slate-700">Tháng 01/2026</span></span>
                 </div>

                 {/* Item 2 */}
                 <div className="bg-white px-4 py-3 rounded-xl border border-blue-100 text-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 transition flex items-center gap-2 w-full sm:w-auto">
                   <div className="bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold px-2 py-1 rounded uppercase shrink-0">Đợt 2</div>
                   <span className="text-sm font-medium">Trước Vòng Chính thức 2 <span className="text-slate-400 mx-1 hidden sm:inline">|</span> <span className="block sm:inline text-xs sm:text-sm text-slate-500 sm:text-slate-700">Tháng 03/2026</span></span>
                 </div>

                 {/* Item 3 */}
                 <div className="bg-white px-4 py-3 rounded-xl border border-blue-100 text-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 transition flex items-center gap-2 w-full sm:w-auto">
                   <div className="bg-orange-100 text-orange-700 text-[10px] md:text-xs font-bold px-2 py-1 rounded uppercase shrink-0">Đợt 3</div>
                   <span className="text-sm font-medium">Trước Vòng Chung kết <span className="text-slate-400 mx-1 hidden sm:inline">|</span> <span className="block sm:inline text-xs sm:text-sm text-slate-500 sm:text-slate-700">Tháng 04/2026</span></span>
                 </div>
             </div>
           </div>
        </div>

        {/* 5. QUYỀN LỢI HỌC BỔNG */}
        <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8">Cơ cấu Học bổng hấp dẫn</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="p-6 border-2 border-slate-100 rounded-xl hover:border-blue-500 transition cursor-default bg-white">
                    <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-2">100%</div>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs md:text-sm">Học bổng Global</h3>
                    <p className="text-slate-500 text-xs mt-2">01 suất</p>
                </div>
                <div className="p-6 border-2 border-slate-100 rounded-xl hover:border-blue-500 transition cursor-default bg-white">
                    <div className="text-3xl md:text-4xl font-extrabold text-blue-500 mb-2">60%</div>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs md:text-sm">Học bổng Unique</h3>
                    <p className="text-slate-500 text-xs mt-2">02 suất</p>
                </div>
                <div className="p-6 border-2 border-slate-100 rounded-xl hover:border-blue-500 transition cursor-default bg-white">
                    <div className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-2">50%</div>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs md:text-sm">Học bổng Liberal</h3>
                    <p className="text-slate-500 text-xs mt-2">02 suất</p>
                </div>
            </div>
            <p className="mt-6 md:mt-8 text-slate-500 text-xs md:text-sm italic px-4">
                * Học bổng được áp dụng cho toàn khóa học và có giá trị bảo lưu tối đa 02 năm.
            </p>
        </div>

      </div>
    </div>
  );
}