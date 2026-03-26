import React from 'react';
import { Sparkles } from 'lucide-react'; // Hoặc icon nào bạn thích

const RunningTextSection = () => {
  const content = [
    "Chào mừng các bạn học sinh đến với UMT TechGen 2026!",
    "Ban Tổ chức chân thành cảm ơn và tri ân các đối tác chiến lược: Hội Tin học Thành phồ Hồ Chí Minh, Công Ty Cổ Phần VNETWORK, Ứng dụng Zalopay thuộc Công ty Cổ phần Zion,  và Trường Trung cấp Công nghệ thông tin Sài Gòn",
    "Ban Tổ chức chân thành cảm ơn và tri ân các đối tác đồng hành: Hiệp hội Phần mềm và Dịch vụ Công nghệ thông tin Việt Nam, Vinaphone Vĩnh Long, VNPT Vĩnh Long, BytePlus Việt Nam, Đoàn Thanh niên Cộng sản Hồ Chí Minh Trường Đại học Quản lý và Công nghệ TPHCM, Công ty Cổ phần An ninh mạng THD, Tổ chức InnoEx, Công ty Cổ phần IVS, Công Ty TNHH Braney, Ngân hàng TMCP Đại Chúng Việt Nam, Công ty Cổ phần Công nghệ Quickom, Công ty TNHH Softworld Việt Nam, Công ty Cổ phần VIET DYNAMIC, Công ty Cổ phần AI HAY và Trung tâm Anh ngữ WESET"
  ];

  // Gợi ý thêm nội dung (bạn có thể bỏ comment để dùng)
  const extraContent = [
    "Hãy theo dõi trang web và các kênh truyền thông của UMT TechGen để cập nhật thông tin mới nhất về cuộc thi!"
  ];

  // Gộp nội dung
  const fullContent = [...content, ...extraContent];

  return (
    <div className="relative bg-blue-900 text-white py-3 overflow-hidden border-y border-blue-800">
      {/* Hiệu ứng mờ 2 bên để cảm giác chữ biến mất mượt hơn */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-blue-900 to-transparent z-10"></div>

      {/* Container chứa animation - Group hover để dừng khi rê chuột */}
      <div className="flex whitespace-nowrap hover:[animation-play-state:paused] group">
        
        {/* Render Lần 1 */}
        <div className="flex animate-marquee min-w-full shrink-0 items-center">
          {fullContent.map((text, index) => (
            <div key={`loop1-${index}`} className="flex items-center px-4">
              <span className="text-sm md:text-base font-medium tracking-wide">
                {text}
              </span>
              {/* Icon phân cách */}
              <Sparkles size={14} className="ml-8 text-yellow-400 opacity-80" />
            </div>
          ))}
        </div>

        {/* Render Lần 2 (Duplicate để lặp vô tận không bị ngắt quãng) */}
        <div className="flex animate-marquee min-w-full shrink-0 items-center">
          {fullContent.map((text, index) => (
            <div key={`loop2-${index}`} className="flex items-center px-4">
              <span className="text-sm md:text-base font-medium tracking-wide">
                {text}
              </span>
              {/* Icon phân cách */}
              <Sparkles size={14} className="ml-8 text-yellow-400 opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunningTextSection;