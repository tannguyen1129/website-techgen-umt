"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/actions/auth"; 
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, Loader2, ShieldCheck, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");
    
    try {
        // Gọi Server Action loginAdmin
        const res = await loginAdmin(formData);
        
        if (res.success) {
          // Đăng nhập thành công -> Cookie (Token + Role) đã được lưu -> Chuyển hướng
          router.push("/admin"); 
          // Có thể dùng router.refresh() để đảm bảo middleware nhận cookie mới ngay lập tức
          router.refresh(); 
        } else {
          setError(res.message || "Tài khoản hoặc mật khẩu không đúng");
          setIsLoading(false);
        }
    } catch (e) {
        setError("Lỗi kết nối đến hệ thống. Vui lòng thử lại sau.");
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 md:p-0">
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row min-h-[600px] animate-in fade-in duration-500">
        
        {/* Left Side: Banner */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                        <ShieldCheck size={24} className="text-blue-200" />
                    </div>
                    <span className="font-bold text-lg tracking-wide uppercase text-blue-100">UMT TechGen Admin</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    Quản trị <br/> Hệ thống
                </h2>
                <p className="text-blue-100 text-lg max-w-sm leading-relaxed">
                    Truy cập dashboard để quản lý hồ sơ thí sinh, thống kê và duyệt thông tin tham dự.
                </p>
            </div>
            
            {/* Footer nhỏ bên trái */}
            <div className="relative z-10 mt-auto opacity-80 text-sm">
                <p>Phiên bản 2.0 - Hỗ trợ phân quyền Viewer</p>
            </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
            <div className="mb-10">
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Đăng nhập</h3>
                <p className="text-slate-500">Vui lòng nhập thông tin quản trị viên.</p>
            </div>

            <form action={handleSubmit} className="space-y-6">
                
                {/* Username */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Tài khoản</label>
                    <div className="relative group">
                        <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            name="username"
                            type="text"
                            placeholder="Tên đăng nhập"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none font-medium"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Mật khẩu</label>
                    <div className="relative group">
                        <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none font-medium"
                            required
                        />
                    </div>
                </div>
                
                {/* Error Alert */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={20} className="text-red-500 shrink-0"/>
                        <p className="text-red-600 text-sm font-medium">{error}</p>
                    </div>
                )}
                
                {/* Submit Button */}
                <button 
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" /> Đang xử lý...
                        </>
                    ) : (
                        <>
                            Đăng nhập <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">
                    &copy; 2026 UMT TechGen. Protected by Admin Shield.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}