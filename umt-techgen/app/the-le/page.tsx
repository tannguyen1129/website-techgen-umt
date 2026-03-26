import { CheckCircle, AlertTriangle, Trophy, Clock, Calendar, MapPin, Award, FileText, ShieldAlert, Info, Users, Monitor, PenTool, DollarSign } from "lucide-react";

export default function RulesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header */}
      <div className="bg-blue-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 uppercase">Thể lệ cuộc thi</h1>
          <p className="text-blue-200 max-w-3xl mx-auto text-sm md:text-lg px-2">
            Quy định chính thức về đối tượng, hình thức thi và cơ cấu giải thưởng.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 md:-mt-8 relative z-20 max-w-5xl space-y-6 md:space-y-12">
        
        {/* Điều 1: Mục đích & Phạm vi */}
        <section className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-100 pb-3 md:pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 shrink-0">
              <FileText size={18} className="md:w-5 md:h-5" />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-slate-900">Điều 1: Mục đích & Phạm vi</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-slate-700">
            <div>
              <h3 className="font-bold text-blue-800 mb-2 md:mb-3 uppercase text-xs md:text-sm tracking-wider">1. Mục đích</h3>
              <ul className="space-y-2 md:space-y-3 list-disc pl-4 md:pl-5 marker:text-blue-500 text-sm md:text-base">
                <li>Tạo sân chơi lập trình chuyên nghiệp và công bằng cho học sinh THPT toàn quốc.</li>
                <li>Khơi dậy niềm đam mê công nghệ, tư duy thuật toán và kỹ năng giải quyết vấn đề.</li>
                <li>Tìm kiếm và bồi dưỡng tài năng trẻ, tạo nguồn tuyển sinh chất lượng cao.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-800 mb-2 md:mb-3 uppercase text-xs md:text-sm tracking-wider">2. Phạm vi</h3>
              <p className="text-sm md:text-base">Kỳ thi được tổ chức quy mô toàn quốc dành cho học sinh các trường Trung học Phổ thông (THPT).</p>
            </div>
          </div>
        </section>

        {/* Điều 2: Đối tượng & Bảng thi */}
        <section className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-100 pb-3 md:pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700 shrink-0">
              <Users size={18} className="md:w-5 md:h-5" />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-slate-900">Điều 2: Đối tượng & Bảng thi</h2>
          </div>

          <div className="mb-6 md:mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-slate-700 text-sm md:text-lg">
              <strong>Đối tượng chung:</strong> Học sinh là công dân Việt Nam đang theo học tại các trường THPT trên cả nước.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Bảng A */}
            <div className="border-2 border-blue-100 bg-blue-50/30 rounded-xl p-5 md:p-6 relative hover:border-blue-400 transition group h-full">
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-3 md:mb-4">Bảng A</h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex gap-2 items-start">
                  <CheckCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Học sinh có giải thưởng Tin học cấp Tỉnh (chưa đạt giải Quốc gia).</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Học sinh thuộc các lớp Chuyên Tin của trường THPT Chuyên.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-start gap-2 text-xs text-orange-700 bg-orange-50 p-2 rounded border border-orange-100">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span>Lưu ý: Thí sinh đạt giải Quốc gia <strong>không được</strong> đăng ký dự thi.</span>
              </div>
            </div>

            {/* Bảng B */}
            <div className="border-2 border-teal-100 bg-teal-50/30 rounded-xl p-5 md:p-6 relative hover:border-teal-400 transition group h-full">
              <h3 className="text-lg md:text-xl font-bold text-teal-900 mb-3 md:mb-4">Bảng B</h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex gap-2 items-start">
                  <CheckCircle size={16} className="text-teal-600 shrink-0 mt-0.5" />
                  <span>Dành cho học sinh THPT thuộc các trường hợp còn lại.</span>
                </li>
              </ul>
              <div className="mt-4 flex items-start gap-2 text-xs text-red-700 bg-red-50 p-2 rounded border border-red-100">
                <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                <span>Nghiêm cấm: Thí sinh thuộc đối tượng Bảng A đăng ký thi Bảng B.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Điều 3: Nội dung, Phương thức, Thời gian & Địa điểm */}
        <section className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-slate-100 pb-3 md:pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700 shrink-0">
              <Monitor size={18} className="md:w-5 md:h-5" />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-slate-900">Điều 3: Nội dung & Thời gian</h2>
          </div>
          
          {/* Nội dung & Phương thức */}
          <div className="mb-8 md:mb-10 space-y-4 md:space-y-6">
             <div className="bg-slate-50 p-5 md:p-6 rounded-xl border border-slate-100">
                <h3 className="text-base md:text-lg font-bold text-purple-800 mb-2 md:mb-3 flex items-center gap-2">
                    <FileText size={18}/> 1. Nội dung thi
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                    Đề thi bám sát chương trình kết hợp kiến thức Toán học và Tin học ứng dụng. Đánh giá năng lực tư duy thuật toán, kỹ năng lập trình và khả năng giải quyết vấn đề của thí sinh.
                </p>
             </div>

             <div className="bg-slate-50 p-5 md:p-6 rounded-xl border border-slate-100">
                <h3 className="text-base md:text-lg font-bold text-purple-800 mb-2 md:mb-3 flex items-center gap-2">
                    <Monitor size={18}/> 2. Phương thức thi
                </h3>
                <ul className="list-disc pl-4 md:pl-5 text-slate-700 space-y-2 text-sm md:text-base marker:text-purple-500">
                    <li>Thi trực tuyến trên hệ thống <strong>UMT Online Judge</strong>.</li>
                    <li>Sử dụng hệ thống chấm thi trắc nghiệm trực tuyến và hệ thống giám sát của Trường UMT.</li>
                    <li>Có các buổi Hướng dẫn chuyên môn trực tuyến (qua Microsoft Teams) xen kẽ các vòng thi.</li>
                </ul>
             </div>
          </div>

          {/* Thời gian & Địa điểm */}
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pl-2 border-l-4 border-orange-500">
             3. Thời gian và địa điểm tổ chức
          </h3>

          <div className="space-y-6">
            {/* Vòng Sơ loại */}
            <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-blue-100 shadow-sm hover:border-blue-300 transition-colors">
                <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
                    <h4 className="font-bold text-blue-700 uppercase tracking-wide text-sm md:text-base mb-1">Vòng Sơ loại</h4>
                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-1 rounded w-fit border border-blue-100">Trực tuyến</span>
                </div>
                <div className="md:w-2/3 text-slate-700 text-sm space-y-2 pl-0 md:pl-2">
                    <div className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span> 
                        <span><strong>Vòng 1:</strong> Từ ngày 30 tháng 11 đến ngày 06 tháng 12 năm 2025</span>
                    </div>
                    
                    {/* Cập nhật ngày kết thúc 24/12 */}
                    <div className="flex gap-3">
                        <span className="text-blue-400 font-bold">•</span> 
                        <span><strong>Vòng 2:</strong> Từ ngày 22 tháng 12 đến ngày 28 tháng 12 năm 2025</span>
                    </div>

                    {/* Cập nhật hiệu ứng gạch bỏ */}
                    <div className="flex gap-3 text-slate-400 opacity-70">
                        <span className="text-slate-300 font-bold">•</span> 
                        <span className="line-through decoration-slate-400"><strong>Vòng 3:</strong> Từ ngày 25 tháng 12 đến ngày 30 tháng 12 năm 2025</span>
                    </div>
                </div>
            </div>

            {/* Vòng Chính thức */}
            <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-purple-100 shadow-sm hover:border-purple-300 transition-colors">
                <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
                    <h4 className="font-bold text-purple-700 uppercase tracking-wide text-sm md:text-base mb-1">Vòng Chính thức</h4>
                    <span className="text-xs font-semibold text-purple-500 bg-purple-50 px-2 py-1 rounded w-fit border border-purple-100">Trực tuyến</span>
                </div>
                <div className="md:w-2/3 text-slate-700 text-sm space-y-2 pl-0 md:pl-2">
                    <div className="flex gap-3"><span className="text-purple-400 font-bold">•</span> <span><strong>Vòng 1:</strong> Từ ngày 26 tháng 01 đến ngày 01 tháng 02 năm 2026</span></div>
                    <div className="flex gap-3"><span className="text-purple-400 font-bold">•</span> <span><strong>Vòng 2:</strong> Từ ngày 15 tháng 12 đến ngày 20 tháng 12 năm 2026</span></div>
                </div>
            </div>

            {/* Vòng Chung kết */}
            <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-orange-100 shadow-sm hover:border-orange-300 transition-colors">
                <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
                    <h4 className="font-bold text-orange-700 uppercase tracking-wide text-sm md:text-base mb-1">Vòng Chung kết</h4>
                    <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded w-fit border border-orange-100">Trực tuyến</span>
                </div>
                <div className="md:w-2/3 text-slate-700 text-sm space-y-2 pl-0 md:pl-2 flex items-center">
                    <div className="flex gap-3"><span className="text-orange-400 font-bold">•</span> <span><strong>Thời gian:</strong> Từ ngày 06 tháng 04 đến ngày 12 tháng 04 năm 2026</span></div>
                </div>
            </div>

            {/* Lễ Tổng kết */}
            <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-red-100 shadow-sm hover:border-red-300 transition-colors">
                <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
                    <h4 className="font-bold text-red-700 uppercase tracking-wide text-sm md:text-base mb-1">Tổng kết & Trao giải</h4>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded w-fit border border-red-100">TRỰC TIẾP</span>
                </div>
                <div className="md:w-2/3 text-slate-700 text-sm space-y-2 pl-0 md:pl-2">
                    <div className="flex gap-3"><span className="text-red-400 font-bold">•</span> <span><strong>Dự kiến:</strong> Ngày 20 tháng 04 năm 2026</span></div>
                    <div className="flex gap-3 items-start">
                        <span className="text-red-400 font-bold mt-0.5">•</span> 
                        <span className="flex gap-2 text-slate-600">
                            <MapPin size={16} className="shrink-0 mt-0.5" />
                            <span>Hội trường lầu 9, Tòa nhà Sáng tạo, Trường Đại học Quản lý và Công nghệ Thành phố Hồ Chí Minh (UMT)</span>
                        </span>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Điều 4: Đăng ký dự thi */}
        <section className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200">
           <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-100 pb-3 md:pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 shrink-0">
              <PenTool size={18} className="md:w-5 md:h-5" />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-slate-900">Điều 4: Đăng ký dự thi</h2>
          </div>
          <div className="space-y-4 text-slate-700 text-sm md:text-base bg-cyan-50/50 p-4 md:p-6 rounded-xl border border-cyan-100">
             <ul className="space-y-3 md:space-y-4 list-disc pl-4 md:pl-5 marker:text-cyan-600">
                <li>Thí sinh là học sinh đăng ký dự thi theo mẫu do Ban Tổ chức cung cấp trên các nền tảng mạng xã hội của Trường, Khoa hoặc website cuộc thi.</li>
                <li>Thí sinh cần đọc kỹ quy định và đăng ký đúng với bảng thi của mình.</li>
                <li>Thông tin đăng ký sẽ được đối chiếu, rà soát và tiến hành xác minh với các trường THPT.</li>
             </ul>
          </div>
        </section>

        {/* Điều 5: Quyền lợi & Giải thưởng */}
<section className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200">
  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-700 shrink-0 shadow-sm">
      <Award size={20} />
    </div>
    <h2 className="text-lg md:text-2xl font-bold text-slate-900">Điều 5: Cơ cấu Giải thưởng</h2>
  </div>

  {/* Table Container: Bo tròn mềm mại, shadow nhẹ */}
  <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-8">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-600 min-w-[700px]">
        {/* Header: Nền xám rất nhạt, chữ hoa nhỏ gọn gàng */}
        <thead className="text-xs text-slate-500 font-bold uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 tracking-wider">Hạng mục giải</th>
            <th className="px-4 py-4 text-center">Bảng A</th>
            <th className="px-4 py-4 text-center">Bảng B</th>
            <th className="px-6 py-4 text-right">Tiền thưởng</th>
            <th className="px-6 py-4 text-right">Học bổng UMT</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-slate-100">
          {/* Row: Giải Đặc Biệt - Highlight nền vàng nhạt */}
          <tr className="bg-gradient-to-r from-yellow-50/60 to-white hover:bg-yellow-50 transition-colors">
            <td className="px-6 py-4">
              <span className="flex items-center gap-2 font-bold text-yellow-700 text-base">
                <Trophy size={16} className="fill-yellow-500 text-yellow-600" /> 
                Giải Đặc Biệt
              </span>
            </td>
            {/* Merge cột số lượng vì là giải chung */}
            <td colSpan={2} className="px-4 py-4 text-center italic text-slate-500">
              01 giải chung
            </td>
            <td className="px-6 py-4 text-right font-bold text-slate-800 text-base">
              10.000.000 VNĐ
            </td>
            <td className="px-6 py-4 text-right font-bold text-blue-600">
              100% (Global)
            </td>
          </tr>

          {/* Row: Giải Nhất */}
          <tr className="bg-white hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-semibold text-slate-800">Giải Nhất</td>
            <td className="px-4 py-4 text-center">02</td>
            <td className="px-4 py-4 text-center">02</td>
            <td className="px-6 py-4 text-right font-bold text-slate-700">6.000.000 VNĐ</td>
            <td className="px-6 py-4 text-right font-bold text-blue-500">60% (Unique)</td>
          </tr>

          {/* Row: Giải Nhì */}
          <tr className="bg-white hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-semibold text-slate-800">Giải Nhì</td>
            <td className="px-4 py-4 text-center">03</td>
            <td className="px-4 py-4 text-center">03</td>
            <td className="px-6 py-4 text-right font-bold text-slate-700">3.000.000 VNĐ</td>
            <td className="px-6 py-4 text-right font-bold text-blue-400">50% (Liberal)</td>
          </tr>

          {/* Row: Giải Ba */}
          <tr className="bg-white hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-700">Giải Ba</td>
            <td className="px-4 py-4 text-center text-slate-500">05</td>
            <td className="px-4 py-4 text-center text-slate-500">05</td>
            <td className="px-6 py-4 text-right font-bold text-slate-600">1.000.000 VNĐ</td>
            <td className="px-6 py-4 text-right text-slate-400">-</td>
          </tr>

          {/* Row: Giải Khuyến Khích */}
          <tr className="bg-white hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-700">Khuyến Khích</td>
            <td className="px-4 py-4 text-center text-slate-500">10</td>
            <td className="px-4 py-4 text-center text-slate-500">10</td>
            <td className="px-6 py-4 text-right font-bold text-slate-600">500.000 VNĐ</td>
            <td className="px-6 py-4 text-right text-slate-400">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  {/* Note Section */}
  <div className="bg-blue-50/50 p-5 rounded-xl text-sm text-slate-600 space-y-3 border border-blue-100">
    <p className="flex gap-3 items-start">
      <Info size={18} className="text-blue-600 shrink-0 mt-0.5"/> 
      <span><strong>Học bổng:</strong> Áp dụng cho toàn khóa học khi trúng tuyển vào Khoa Công nghệ UMT.</span>
    </p>
    <p className="flex gap-3 items-start">
      <Clock size={18} className="text-blue-600 shrink-0 mt-0.5"/> 
      <span><strong>Bảo lưu:</strong> Học bổng được bảo lưu tối đa <strong>02 năm</strong> kể từ ngày công bố giải thưởng.</span>
    </p>
    <p className="flex gap-3 items-start">
      <Award size={18} className="text-blue-600 shrink-0 mt-0.5"/> 
      <span><strong>Chứng nhận:</strong> Tất cả thí sinh tham gia vòng chính thức đều được cấp Giấy chứng nhận (Certificate).</span>
    </p>
  </div>
</section>

        {/* Điều 6: Kinh phí tổ chức */}
        <section className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200">
           <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-100 pb-3 md:pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 shrink-0">
              <DollarSign size={18} className="md:w-5 md:h-5" />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-slate-900">Điều 6: Kinh phí tổ chức</h2>
          </div>
          
        </section>

        {/* Điều 7: Quy định khác */}
        <section className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200">
           <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-100 pb-3 md:pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-700 shrink-0">
              <ShieldAlert size={18} className="md:w-5 md:h-5" />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-slate-900">Điều 7: Các quy định khác</h2>
          </div>
          <ul className="space-y-3 md:space-y-4 text-slate-700 list-decimal pl-4 md:pl-5 marker:font-bold marker:text-slate-500 text-sm md:text-base">
            <li>Thí sinh phải cung cấp trung thực, chính xác thông tin cá nhân; Ban Tổ chức sẽ phối hợp với trường THPT của thí sinh để xác minh thông tin khi cần thiết.</li>
            <li>Thí sinh tham gia thi trực tuyến phải tuân thủ quy định về đường truyền internet và hệ thống giám sát của Ban Tổ chức.</li>
            <li>Thông tin, hình ảnh của thí sinh có thể được Ban Tổ chức sử dụng để thông báo kết quả thi hoặc quảng bá, truyền thông cho Kỳ thi.</li>
            <li>Nếu có vi phạm trong quá trình tham gia Kỳ thi, thì tùy theo mức độ vi phạm, Ban Tổ chức sẽ xem xét xử lý kỷ luật hoặc kiến nghị các cơ quan chức năng xử lý theo quy định hiện hành.</li>
            <li>Trong quá trình tổ chức thực hiện, nếu cần sửa đổi Thể lệ này, Ban Tổ chức sẽ xem xét, quyết định và thông báo công khai bằng văn bản.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}