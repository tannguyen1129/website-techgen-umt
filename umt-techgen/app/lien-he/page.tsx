"use client";

import { MapPin, Phone, Mail, Send, Facebook, Globe, Loader2, CheckCircle, AlertCircle, X, ExternalLink, ChevronDown, ChevronUp, HelpCircle, Users, QrCode } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { submitContact } from "@/app/actions/contact";

const FAQS = [
    {
        question: "Đối tượng nào được tham gia TechGen 2026?",
        answer: "Tất cả học sinh THPT (lớp 10-12) trên toàn quốc. Có 2 bảng: Bảng A và Bảng B."
    },
    {
        question: "Lệ phí thi là bao nhiêu?",
        answer: "Hoàn toàn MIỄN PHÍ. UMT tài trợ 100% chi phí tổ chức."
    },
    {
        question: "Tôi cần chuẩn bị gì cho vòng Sơ loại?",
        answer: "Bạn cần máy tính có kết nối Internet ổn định. Thi trực tuyến trên hệ thống UMTOJ với các bài toán tư duy logic và lập trình cơ bản (C++, Python, Java)."
    },
    {
        question: "Cơ cấu giải thưởng như thế nào?",
        answer: "Tổng giải thưởng lên đến 100 triệu đồng, bao gồm hiện kim, hiện vật và các suất học bổng tuyển thẳng vào UMT."
    }
];

// --- TOAST COMPONENT ---
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
    useEffect(() => {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }, [onClose]);
  
    return (
      <div className={`fixed top-24 right-4 z-[100] flex items-start gap-3 px-5 py-4 rounded-2xl shadow-xl border animate-in slide-in-from-right-10 duration-300 backdrop-blur-md max-w-sm w-full
        ${type === 'success' ? 'bg-white/95 border-emerald-100 text-emerald-800 ring-1 ring-emerald-500/10' : 'bg-white/95 border-red-100 text-red-800 ring-1 ring-red-500/10'}
      `}>
        <div className={`mt-0.5 p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm mb-0.5">{type === 'success' ? 'Thành công!' : 'Gửi thất bại!'}</h4>
          <p className="text-sm opacity-90 leading-snug">{message}</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-black/5 transition"><X size={16} /></button>
      </div>
    );
};

// --- QR CODE MODAL ---
const ZaloModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="bg-blue-600 p-6 text-center relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition"><X size={20}/></button>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Users size={32} className="text-blue-600"/>
                    </div>
                    <h3 className="text-white font-bold text-lg">Cộng đồng TechGen 2026</h3>
                    <p className="text-blue-100 text-sm">Quét mã để tham gia nhóm Zalo</p>
                </div>
                <div className="p-8 flex flex-col items-center">
                    {/*  - Placeholder for user's QR image */}
                    <div className="border-2 border-dashed border-blue-100 p-2 rounded-xl mb-6">
                        {/* Thay đường dẫn ảnh QR của bạn vào đây */}
                        <Image 
                            src="/images/QR_Zalo_TechGen.jpg" 
                            alt="QR Zalo TechGen" 
                            width={200} 
                            height={200} 
                            className="rounded-lg"
                        />
                    </div>
                    <Link 
                        href="https://zalo.me/g/nhom-cua-ban" // Thay link nhóm Zalo của bạn vào đây
                        target="_blank"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                    >
                        Bấm để tham gia ngay <ExternalLink size={18}/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showZaloModal, setShowZaloModal] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
        const res = await submitContact(formData);
        if (res.success) {
            setToast({ message: "Cảm ơn bạn đã liên hệ! BTC sẽ phản hồi sớm nhất qua email.", type: 'success' });
            const form = document.getElementById("contact-form") as HTMLFormElement;
            if (form) form.reset();
        } else {
            setToast({ message: res.message || "Có lỗi xảy ra, vui lòng thử lại.", type: 'error' });
        }
    } catch (error) {
        setToast({ message: "Lỗi kết nối hệ thống.", type: 'error' });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-600 relative overflow-x-hidden">
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <ZaloModal isOpen={showZaloModal} onClose={() => setShowZaloModal(false)} />

      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">Hỗ trợ 24/7</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Liên hệ Ban Tổ Chức</h1>
          <p className="text-blue-100 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn về cuộc thi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* 2. CỘT TRÁI: THÔNG TIN + SOCIAL (Chiếm 5/12) */}
          <div className="lg:col-span-5 space-y-6 h-fit lg:sticky lg:top-28">
              
             {/* Block 1: Thông tin liên hệ */}
             <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                    Thông tin trực tiếp
                </h3>
                
                <div className="space-y-8">
                    {/* VĂN PHÒNG */}
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition shadow-sm">
                            <MapPin size={22} />
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">Văn phòng Ban Tổ Chức</span>
                            <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                Văn phòng Khoa Công nghệ (P.508), Tòa nhà Sáng tạo, Trường Đại học Quản lý và Công nghệ Thành phố Hồ Chí Minh.
                            </p>
                        </div>
                    </div>

                    {/* HOTLINE/ZALO */}
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition shadow-sm">
                            <Phone size={22} />
                        </div>
                        <div className="w-full">
                            <span className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Hotline</span>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="bg-slate-50 p-3 rounded-lg hover:bg-white hover:shadow-md transition border border-transparent hover:border-slate-100">
                                    <p className="text-slate-800 font-bold text-sm">Mr. Huỳnh Lê Phú Trung</p>
                                    <p className="text-slate-500 text-[11px] mb-1 uppercase tracking-wide">Trưởng Ban Tổ chức</p>
                                    <a href="tel:0767138667" className="text-green-600 font-bold hover:underline block text-sm">(+84) 767 138 667</a>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg hover:bg-white hover:shadow-md transition border border-transparent hover:border-slate-100">
                                    <p className="text-slate-800 font-bold text-sm">Mr. Sơn Tân</p>
                                    <p className="text-slate-500 text-[11px] mb-1 uppercase tracking-wide">Phó Ban Tổ chức (Liên hệ khẩn cấp)</p>
                                    <a href="tel:0818126177" className="text-green-600 font-bold hover:underline block text-sm">(+84) 818 126 177</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EMAIL HỖ TRỢ */}
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition shadow-sm">
                            <Mail size={22} />
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Email hỗ trợ</span>
                            <div className="space-y-1">
                                <a href="mailto:techgen@umt.edu.vn" className="text-slate-700 text-sm hover:text-blue-600 transition block font-medium">
                                    techgen@umt.edu.vn
                                </a>
                                <a href="mailto:trung.huynhlephu@umt.edu.vn" className="text-slate-700 text-sm hover:text-blue-600 transition block font-medium">
                                    trung.huynhlephu@umt.edu.vn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
             </div>

             {/* Block 2: Kênh thông tin & ZALO GROUP */}
             <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-6 md:p-8 rounded-2xl shadow-xl text-white">
                <h3 className="font-bold text-lg mb-4 border-b border-white/20 pb-2">Kênh thông tin & Cộng đồng</h3>
                <div className="space-y-3">
                    {/* ZALO GROUP BUTTON */}
                    <button 
                        onClick={() => setShowZaloModal(true)}
                        className="w-full flex items-center gap-3 p-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition group border border-blue-400/50 shadow-lg shadow-blue-900/50 mb-4 animate-pulse hover:animate-none"
                    >
                        <div className="bg-white p-1.5 rounded-lg text-blue-600 shrink-0"><QrCode size={20} /></div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-white">Tham gia Nhóm Zalo Thí sinh</span>
                            <span className="text-xs text-blue-200">Cập nhật thông báo & Hỏi đáp nhanh</span>
                        </div>
                    </button>

                    <Link href="https://www.facebook.com/UMTUniversity" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group border border-white/5 hover:border-white/20">
                        <div className="bg-white/10 p-1.5 rounded-lg text-blue-200 group-hover:text-white"><Facebook size={18} /></div>
                        <span className="text-sm font-medium">Facebook Trường UMT</span>
                    </Link>
                    <Link href="https://www.umt.edu.vn/vi-vn/" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group border border-white/5 hover:border-white/20">
                        <div className="bg-white/10 p-1.5 rounded-lg text-blue-200 group-hover:text-white"><Globe size={18} /></div>
                        <span className="text-sm font-medium">Website Trường UMT</span>
                    </Link>
                    <Link href="https://www.facebook.com/sotumthcmc" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group border border-white/5 hover:border-white/20">
                        <div className="bg-white/10 p-1.5 rounded-lg text-blue-200 group-hover:text-white"><Facebook size={18} /></div>
                        <span className="text-sm font-medium">Facebook Khoa Công Nghệ</span>
                    </Link>
                    <Link href="https://sot.umtoj.edu.vn" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group border border-white/5 hover:border-white/20">
                        <div className="bg-white/10 p-1.5 rounded-lg text-green-200 group-hover:text-white"><ExternalLink size={18} /></div>
                        <span className="text-sm font-medium">Hệ thống UMTOJ</span>
                    </Link>
                </div>
             </div>
          </div>

          {/* 3. CỘT PHẢI: FORM (Chiếm 7/12) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 h-full">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Gửi tin nhắn cho chúng tôi</h2>
                    <p className="text-slate-500 text-sm">Điền thông tin vào biểu mẫu bên dưới, BTC sẽ phản hồi qua email trong vòng 24h làm việc.</p>
                </div>
                
                <form id="contact-form" action={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Họ và tên <span className="text-red-500">*</span></label>
                            <input name="fullName" type="text" placeholder="Nguyễn Văn A" required className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition bg-slate-50 focus:bg-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Email liên hệ <span className="text-red-500">*</span></label>
                            <input name="email" type="email" placeholder="example@gmail.com" required className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition bg-slate-50 focus:bg-white" />
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Số điện thoại</label>
                            <input name="phone" type="tel" placeholder="090..." className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition bg-slate-50 focus:bg-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Chủ đề cần hỗ trợ</label>
                            <div className="relative">
                                <select name="subject" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition bg-slate-50 focus:bg-white appearance-none cursor-pointer">
                                    <option value="Đăng ký dự thi">Vấn đề đăng ký dự thi</option>
                                    <option value="Thể lệ & Bảng đấu">Hỏi về thể lệ & Bảng đấu</option>
                                    <option value="Kỹ thuật UMTOJ">Hỗ trợ kỹ thuật UMTOJ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Nội dung tin nhắn <span className="text-red-500">*</span></label>
                        <textarea name="message" rows={6} required placeholder="Nhập nội dung thắc mắc của bạn..." className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition resize-none bg-slate-50 focus:bg-white"></textarea>
                    </div>

                    <button 
                        disabled={isSubmitting}
                        className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {isSubmitting ? <><Loader2 className="animate-spin" size={20}/> Đang gửi...</> : <>Gửi tin nhắn <Send size={20} /></>}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <HelpCircle size={20} className="text-orange-500" /> Câu hỏi thường gặp
                    </h3>
                    <div className="space-y-3">
                        {FAQS.map((faq, index) => (
                            <div key={index} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                                <button 
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center p-4 hover:bg-slate-100 transition text-left"
                                >
                                    <span className="font-bold text-sm text-slate-700 pr-2">{faq.question}</span>
                                    {openFaqIndex === index ? <ChevronUp size={18} className="text-blue-600 shrink-0"/> : <ChevronDown size={18} className="text-slate-400 shrink-0"/>}
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100/50">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
          </div>
        </div>

        {/* 4. MAP SECTION */}
<div className="bg-white p-3 rounded-3xl shadow-xl border border-slate-100 relative group">
  <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.664319478147!2d106.77259437573523!3d10.760337259492823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525a7a72d730b%3A0xc3c6046e7f22977f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBRdeG6o24gbMO9IHbDoCBDw7RuZyBuZ2jhu4cgVFAuSENNIChVTVQp!5e0!3m2!1svi!2s!4v1705649000000!5m2!1svi!2s"
      className="w-full h-full"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Bản đồ địa điểm trường UMT"
    />
    
    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2.5 rounded-xl shadow-md border border-slate-200">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Trụ sở chính</p>
      <p className="text-sm font-bold text-slate-800">Trường Đại học Quản lý và Công nghệ TP.HCM (UMT)</p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}