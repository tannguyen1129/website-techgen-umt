"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Clock, CalendarDays, CheckCircle, Loader2, UploadCloud, User, Calendar, CreditCard, Phone, Mail, School, MapPin, GraduationCap, Award, FileCheck, AlertCircle, X, ChevronDown, Search, Check } from "lucide-react";
import Link from "next/link";
import { registerCandidate } from "@/app/actions/register";

// --- DANH SÁCH 34 TỈNH THÀNH VIỆT NAM ---
const VIETNAM_PROVINCES = [
  "Tỉnh Tuyên Quang",        // sáp nhập Hà Giang – Tuyên Quang
  "Tỉnh Lào Cai",            // sáp nhập Yên Bái – Lào Cai
  "Tỉnh Thái Nguyên",        // sáp nhập Bắc Kạn – Thái Nguyên
  "Tỉnh Phú Thọ",            // sáp nhập Vĩnh Phúc – Hòa Bình – Phú Thọ
  "Tỉnh Bắc Ninh",           // sáp nhập Bắc Giang – Bắc Ninh
  "Tỉnh Hưng Yên",           // sáp nhập Thái Bình – Hưng Yên
  "Thành phố Hải Phòng",     // sáp nhập Hải Dương – Hải Phòng
  "Tỉnh Ninh Bình",          // sáp nhập Hà Nam – Nam Định – Ninh Bình
  "Tỉnh Quảng Trị",          // sáp nhập Quảng Bình – Quảng Trị
  "Thành phố Đà Nẵng",       // sáp nhập Quảng Nam – Đà Nẵng
  "Tỉnh Quảng Ngãi",         // sáp nhập Kon Tum – Quảng Ngãi
  "Tỉnh Gia Lai",            // sáp nhập Bình Định – Gia Lai
  "Tỉnh Khánh Hòa",          // sáp nhập Ninh Thuận – Khánh Hòa
  "Tỉnh Điện Biên",
  "Thành phố Hà Nội",
  "Tỉnh Hà Tĩnh",
  "Tỉnh Lạng Sơn",
  "Tỉnh Lai Châu",
  "Tỉnh Nghệ An",
  "Tỉnh Quảng Ninh",
  "Tỉnh Sơn La",
  "Tỉnh Thanh Hóa",
  "Tỉnh Cao Bằng",
  "Thành phố Huế",
  "Tỉnh Lâm Đồng",           // sáp nhập Đắk Nông – Bình Thuận – Lâm Đồng
  "Tỉnh Đắk Lắk",            // sáp nhập Phú Yên – Đắk Lắk
  "Thành phố Hồ Chí Minh",   // sáp nhập Bà Rịa – Vũng Tàu – Bình Dương – TP.HCM
  "Tỉnh Đồng Nai",           // sáp nhập Bình Phước – Đồng Nai
  "Tỉnh Tây Ninh",           // sáp nhập Long An – Tây Ninh
  "Thành phố Cần Thơ",       // sáp nhập Sóc Trăng – Hậu Giang – Cần Thơ
  "Tỉnh Vĩnh Long",          // sáp nhập Bến Tre – Trà Vinh – Vĩnh Long
  "Tỉnh Đồng Tháp",          // sáp nhập Tiền Giang – Đồng Tháp
  "Tỉnh Cà Mau",             // sáp nhập Bạc Liêu – Cà Mau
  "Tỉnh An Giang"            // sáp nhập Kiên Giang – An Giang
].sort();

// --- TOAST COMPONENT (Giữ nguyên) ---
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-24 right-4 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-fade-in-up backdrop-blur-md ${
      type === 'success' ? 'bg-white/90 border-green-100 text-green-800' : 'bg-white/90 border-red-100 text-red-800'
    }`}>
      {type === 'success' ? <CheckCircle size={24} className="text-green-500" /> : <AlertCircle size={24} className="text-red-500" />}
      <div>
        <h4 className="font-bold text-sm">{type === 'success' ? 'Thành công!' : 'Lỗi!'}</h4>
        <p className="text-sm text-slate-600">{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 text-slate-400 hover:text-slate-600"><X size={18} /></button>
    </div>
  );
};

// --- SCHEMA VALIDATION ---
const formSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ và tên"),
  dob: z.string().min(1, "Vui lòng chọn ngày sinh"),
  gender: z.enum(["Nam", "Nữ"], { message: "Vui lòng chọn giới tính" }),
  cccd: z.string().min(9, "Số CCCD không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  email: z.string().email("Email không hợp lệ"),
  school: z.string().min(5, "Vui lòng nhập tên trường"),
  province: z.string().min(1, "Vui lòng chọn Tỉnh/Thành phố"), 
  grade: z.enum(["10", "11", "12"], { message: "Vui lòng chọn khối lớp" }),
  className: z.string().min(1, "Vui lòng nhập tên lớp"),
  studentId: z.string().optional(),
  table: z.enum(["A", "B"], { message: "Vui lòng chọn bảng thi" }),
  achievements: z.string().optional(),
  
  confirmInfo: z.boolean().refine((val) => val === true, {
    message: "Bạn phải cam kết thông tin là chính xác",
  }),
  confirmRules: z.boolean().refine((val) => val === true, {
    message: "Bạn phải đồng ý tuân thủ quy định",
  }),
});

type FormDataSchema = z.infer<typeof formSchema>;

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Custom Select State
  const [isOpenProvince, setIsOpenProvince] = useState(false);
  const [searchProvince, setSearchProvince] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // File State
  const [cccdFrontFile, setCccdFrontFile] = useState<File | null>(null);
  const [cccdBackFile, setCccdBackFile] = useState<File | null>(null);
  const [studentCardFile, setStudentCardFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { studentId: "", achievements: "", province: "" },
  });

  const selectedProvince = watch("province");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenProvince(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProvinces = VIETNAM_PROVINCES.filter(p => 
    p.toLowerCase().includes(searchProvince.toLowerCase())
  );

  const onSubmit = async (data: FormDataSchema) => {
    if (!studentCardFile) { setToast({message: "Thiếu ảnh Thẻ học sinh", type: 'error'}); return; }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
         if (key !== 'confirmInfo' && key !== 'confirmRules') {
             formData.append(key, value as string);
         }
      });
      
      if (cccdFrontFile) formData.append("cccdFrontFile", cccdFrontFile);
      if (cccdBackFile) formData.append("cccdBackFile", cccdBackFile);
      formData.append("studentCardFile", studentCardFile);

      const result = await registerCandidate(formData);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        setToast({ message: result.message, type: 'error' });
      }
    } catch (error) {
      console.error(error);
      setToast({ message: "Lỗi kết nối, vui lòng thử lại.", type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- MÀN HÌNH THÀNH CÔNG ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-10 rounded-[2rem] shadow-2xl max-w-md w-full text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce-slow">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Đăng ký thành công!</h2>
          <p className="text-slate-600 mb-8 text-lg">Hồ sơ của bạn đã được ghi nhận. Ban tổ chức sẽ liên hệ sớm nhất qua email.</p>
          <Link href="/" className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 font-sans text-slate-600">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Đơn đăng ký tham dự</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                Hãy điền đầy đủ thông tin mà BTC yêu cầu bên dưới để tham gia tranh tài tại <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-lg">UMT TechGen 2026</span>.
            </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* --- 1. THÔNG TIN CÁ NHÂN --- */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-white relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><User size={20} /></span> 
                Thông tin thí sinh
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Họ và tên <span className="text-red-500">*</span></label>
                    <div className="relative group/input">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                        <input {...register("fullName")} placeholder="Nguyễn Văn A" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition outline-none font-medium" />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs font-medium ml-1">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Ngày sinh <span className="text-red-500">*</span></label>
                    <div className="relative group/input">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                        <input {...register("dob")} type="date" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition outline-none font-medium" />
                    </div>
                    {errors.dob && <p className="text-red-500 text-xs font-medium ml-1">{errors.dob.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Giới tính <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <label className="relative flex-1 cursor-pointer">
                            <input {...register("gender")} type="radio" value="Nam" className="peer sr-only" />
                            <div className="w-full p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-600 text-center font-bold peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-checked:border-blue-500 transition-all hover:bg-white shadow-sm">Nam</div>
                        </label>
                        <label className="relative flex-1 cursor-pointer">
                            <input {...register("gender")} type="radio" value="Nữ" className="peer sr-only" />
                            <div className="w-full p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-600 text-center font-bold peer-checked:bg-pink-50 peer-checked:text-pink-700 peer-checked:border-pink-500 transition-all hover:bg-white shadow-sm">Nữ</div>
                        </label>
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs font-medium ml-1">{errors.gender.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Số CCCD <span className="text-red-500">*</span></label>
                    <div className="relative group/input">
                        <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                        <input {...register("cccd")} placeholder="12 số trên CCCD" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition outline-none font-medium" />
                    </div>
                    {errors.cccd && <p className="text-red-500 text-xs font-medium ml-1">{errors.cccd.message}</p>}
                </div>
                
                {/* --- ĐÃ ẨN PHẦN UPLOAD FILE CCCD --- */}
                {/* <div className="md:col-span-2 grid md:grid-cols-2 gap-6 mt-2">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">CCCD Mặt trước <span className="text-red-500">*</span></label>
                        <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-blue-50/50 hover:border-blue-400 transition cursor-pointer group text-center h-40">
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                                <UploadCloud className="text-slate-400 group-hover:text-blue-500 transition" />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Upload ảnh</span>
                            <span className="text-xs text-slate-400 font-medium truncate max-w-full px-2">
                                {cccdFrontFile ? <span className="text-blue-600">{cccdFrontFile.name}</span> : "Kéo thả hoặc chọn ảnh"}
                            </span>
                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && setCccdFrontFile(e.target.files[0])} /> 
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">CCCD Mặt sau <span className="text-red-500">*</span></label>
                         <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-blue-50/50 hover:border-blue-400 transition cursor-pointer group text-center h-40">
                             <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                                <UploadCloud className="text-slate-400 group-hover:text-blue-500 transition" />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Upload ảnh</span>
                            <span className="text-xs text-slate-400 font-medium truncate max-w-full px-2">
                                {cccdBackFile ? <span className="text-blue-600">{cccdBackFile.name}</span> : "Kéo thả hoặc chọn ảnh"}
                            </span>
                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && setCccdBackFile(e.target.files[0])} /> 
                        </div>
                    </div>
                </div> 
                */}

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Số điện thoại <span className="text-red-500">*</span></label>
                    <div className="relative group/input">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                        <input {...register("phone")} placeholder="090..." className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition outline-none font-medium" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs font-medium ml-1">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email <span className="text-red-500">*</span></label>
                    <div className="relative group/input">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" />
                        <input {...register("email")} type="email" placeholder="example@gmail.com" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition outline-none font-medium" />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs font-medium ml-1">{errors.email.message}</p>}
                </div>
            </div>
          </div>

          {/* --- 2. THÔNG TIN TRƯỜNG --- */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-white relative overflow-hidden group hover:shadow-xl transition-all duration-300">
             <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
             <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><School size={20} /></span> 
                Thông tin trường học
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Tên Trường THPT <span className="text-red-500">*</span></label>
                    <div className="relative group/input">
                         <School size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-emerald-500 transition-colors" />
                        <input {...register("school")} placeholder="Nhập tên trường đầy đủ" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition outline-none font-medium" />
                    </div>
                    {errors.school && <p className="text-red-500 text-xs font-medium ml-1">{errors.school.message}</p>}
                </div>
                
                {/* --- CUSTOM SOFT DROPDOWN --- */}
                <div className="space-y-2" ref={dropdownRef}>
                    <label className="text-sm font-bold text-slate-700 ml-1">Tỉnh/Thành phố đang học tập<span className="text-red-500">*</span></label>
                    <div className="relative">
                        {/* Trigger Button */}
                        <div 
                            onClick={() => setIsOpenProvince(!isOpenProvince)}
                            className={`w-full pl-11 pr-10 py-3.5 rounded-2xl border bg-white cursor-pointer flex items-center justify-between transition-all duration-300 shadow-sm
                            ${isOpenProvince ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-slate-200 hover:border-emerald-400 hover:shadow-md'}
                            `}
                        >
                            <MapPin size={18} className={`absolute left-4 text-slate-400 transition-colors ${isOpenProvince ? 'text-emerald-500' : ''}`} />
                            <span className={`font-medium ${selectedProvince ? 'text-slate-900' : 'text-slate-400'}`}>
                                {selectedProvince || "Chọn Tỉnh/Thành phố"}
                            </span>
                            <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isOpenProvince ? 'rotate-180 text-emerald-500' : ''}`} />
                        </div>

                        {/* Dropdown Menu */}
                        <div className={`absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top transform 
                            ${isOpenProvince ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
                        `}>
                            {/* Search Box inside Dropdown */}
                            <div className="p-3 border-b border-slate-100 bg-slate-50/50 sticky top-0 backdrop-blur-sm">
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        autoFocus
                                        type="text" 
                                        placeholder="Tìm nhanh tỉnh thành..." 
                                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
                                        value={searchProvince}
                                        onChange={(e) => setSearchProvince(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            {/* List */}
                            <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent p-2">
                                {filteredProvinces.length > 0 ? (
                                    filteredProvinces.map((prov) => (
                                        <div 
                                            key={prov}
                                            onClick={() => {
                                                setValue("province", prov);
                                                setIsOpenProvince(false);
                                                setSearchProvince(""); // Reset search
                                            }}
                                            className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-colors mb-1 last:mb-0
                                            ${selectedProvince === prov ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}
                                            `}
                                        >
                                            {prov}
                                            {selectedProvince === prov && <Check size={16} className="text-emerald-600" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-sm text-slate-400">Không tìm thấy kết quả</div>
                                )}
                            </div>
                        </div>
                    </div>
                    {errors.province && <p className="text-red-500 text-xs font-medium ml-1">{errors.province.message}</p>}
                </div>
                {/* ---------------------------- */}

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Khối lớp <span className="text-red-500">*</span></label>
                    <div className="flex gap-3">
                        {["10", "11", "12"].map(g => (
                            <label key={g} className="relative flex-1 cursor-pointer group">
                                <input {...register("grade")} type="radio" value={g} className="peer sr-only" />
                                <div className="w-full py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-600 text-center font-bold peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-all hover:bg-white shadow-sm group-hover:-translate-y-0.5">Khối {g}</div>
                            </label>
                        ))}
                    </div>
                    {errors.grade && <p className="text-red-500 text-xs font-medium ml-1">{errors.grade.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Lớp <span className="text-red-500">*</span></label>
                    <div className="relative group/input">
                        <input {...register("className")} placeholder="VD: 10A1" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition outline-none font-medium" />
                    </div>
                    {errors.className && <p className="text-red-500 text-xs font-medium ml-1">{errors.className.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Mã học sinh (nếu có)</label>
                    <div className="relative group/input">
                        <input {...register("studentId")} placeholder="MSSV..." className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition outline-none font-medium" />
                    </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Ảnh Thẻ học sinh <span className="text-red-500">*</span></label>
                    <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-emerald-50/50 hover:border-emerald-500 transition cursor-pointer group text-center h-40">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                             <UploadCloud className="text-slate-400 group-hover:text-emerald-500 transition" />
                        </div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Upload ảnh</span>
                        <span className="text-xs text-slate-400 font-medium truncate max-w-full px-2">
                            {studentCardFile ? <span className="text-emerald-600">{studentCardFile.name}</span> : "Kéo thả hoặc chọn ảnh thẻ"}
                        </span>
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && setStudentCardFile(e.target.files[0])} />
                    </div>
                </div>
            </div>
          </div>

          {/* --- 3. ĐĂNG KÝ BẢNG THI --- */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-white relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-orange-500"></div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><GraduationCap size={20} /></span> 
                Nội dung đăng ký thi
            </h2>
            
            <div className="bg-orange-50/50 p-6 rounded-2xl text-sm text-slate-700 mb-8 border border-orange-100/50">
                <p className="mb-2 font-bold text-orange-800 uppercase tracking-wide flex items-center gap-2"><AlertCircle size={16}/> Lưu ý chọn bảng thi:</p>
                <ul className="space-y-2 ml-1">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></span><span><strong>Bảng A:</strong> Dành cho học sinh Chuyên Tin hoặc đã có giải thưởng cấp Tỉnh, không đạt giải Quốc gia</span></li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"></span><span><strong>Bảng B:</strong> Dành cho học sinh không chuyên, chưa có giải thưởng.</span></li>
                </ul>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 ml-1">Chọn bảng thi <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="relative flex items-start gap-4 cursor-pointer bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition group h-full">
                            <input {...register("table")} type="radio" value="A" className="mt-1 w-5 h-5 accent-blue-600" /> 
                            <div>
                                <span className="block text-lg font-bold text-slate-800 group-hover:text-blue-700 mb-1">Bảng A</span>
                                <span className="text-sm text-slate-500">Chuyên Tin hoặc có giải cấp tỉnh</span>
                            </div>
                        </label>
                        <label className="relative flex items-start gap-4 cursor-pointer bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50/30 transition group h-full">
                            <input {...register("table")} type="radio" value="B" className="mt-1 w-5 h-5 accent-teal-600" /> 
                            <div>
                                <span className="block text-lg font-bold text-slate-800 group-hover:text-teal-700 mb-1">Bảng B</span>
                                <span className="text-sm text-slate-500">Không chuyên hoặc mới bắt đầu</span>
                            </div>
                        </label>
                    </div>
                    {errors.table && <p className="text-red-500 text-xs font-medium ml-1">{errors.table.message}</p>}
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Thành tích liên quan (nếu có)</label>
                    <div className="relative group/input">
                        <Award size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-orange-500 transition-colors" />
                        <input {...register("achievements")} placeholder="Ví dụ: Giải Nhất HSG Tỉnh 2024..." className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition outline-none font-medium" />
                    </div>
                </div>
            </div>
          </div>

          {/* --- 4. CAM KẾT --- */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-white relative overflow-hidden group hover:shadow-xl transition-all duration-300">
             <div className="absolute top-0 left-0 w-2 h-full bg-slate-800"></div>
             <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                 <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"><FileCheck size={20} /></span>
                 Cam kết & Xác nhận
             </h2>
             <div className="space-y-4">
                 <label className="flex gap-4 cursor-pointer items-start group bg-slate-50/50 p-4 rounded-xl hover:bg-slate-100/50 transition border border-transparent hover:border-slate-200">
                     <input {...register("confirmInfo")} type="checkbox" className="mt-1 w-5 h-5 accent-blue-600 rounded cursor-pointer" />
                     <span className="text-sm text-slate-600 group-hover:text-slate-900 transition leading-relaxed">Tôi cam kết toàn bộ thông tin khai báo trên là hoàn toàn chính xác và chịu trách nhiệm về tính trung thực của hồ sơ.</span>
                 </label>
                 {errors.confirmInfo && <p className="text-red-500 text-xs ml-2 font-medium">{errors.confirmInfo.message}</p>}

                 <label className="flex gap-4 cursor-pointer items-start group bg-slate-50/50 p-4 rounded-xl hover:bg-slate-100/50 transition border border-transparent hover:border-slate-200">
                     <input {...register("confirmRules")} type="checkbox" className="mt-1 w-5 h-5 accent-blue-600 rounded cursor-pointer" />
                     <span className="text-sm text-slate-600 group-hover:text-slate-900 transition leading-relaxed">Tôi đã đọc, hiểu rõ và đồng ý tuân thủ mọi quy định trong <Link href="/the-le" target="_blank" className="text-blue-600 font-bold hover:underline">Thể lệ cuộc thi</Link>.</span>
                 </label>
                 {errors.confirmRules && <p className="text-red-500 text-xs ml-2 font-medium">{errors.confirmRules.message}</p>}
             </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-6 gap-4">
            <Link href="/" className="w-full md:w-auto px-8 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition text-center">
                Hủy bỏ & Quay lại
            </Link>
            <button 
                disabled={isSubmitting} 
                type="submit" 
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active:scale-95"
            >
              {isSubmitting ? <><Loader2 className="animate-spin" size={24} /> Đang xử lý...</> : "Gửi đơn đăng ký ngay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
