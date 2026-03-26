"use client";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/actions/register"; 
import Link from "next/link";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend 
} from 'recharts';
import { 
  Users, CheckCircle, AlertCircle, Clock, TrendingUp, 
  MapPin, Loader2, Award, CalendarDays, ArrowLeft, GraduationCap, 
  X, Search, Maximize2 
} from "lucide-react";

// Màu sắc
const COLORS_STATUS = { APPROVED: '#10B981', PENDING: '#F59E0B', REJECTED: '#EF4444' };
const COLORS_TABLE = ['#3B82F6', '#14B8A6']; 
const COLORS_GENDER = ['#EC4899', '#3B82F6', '#94A3B8'];

// --- COMPONENT MODAL THỐNG KÊ TỈNH (MỚI) ---
const ProvinceModal = ({ data, total, onClose }: any) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter((p: any) => 
        (p.province || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200" onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden border border-slate-100" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <MapPin className="text-indigo-600" size={20}/> Phân bố địa lý
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">Thống kê chi tiết thí sinh theo Tỉnh/Thành phố</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-slate-700 transition shadow-sm border border-transparent hover:border-slate-200">
                        <X size={24}/>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                        <input 
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition" 
                            placeholder="Tìm kiếm tỉnh thành..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 custom-scrollbar">
                    <div className="space-y-3">
                        {filteredData.length > 0 ? filteredData.map((p: any, idx: number) => (
                            <div key={idx} className="relative bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors">
                                <div className="flex justify-between items-center text-sm mb-2 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${idx < 3 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-slate-100 text-slate-500'}`}>
                                            {idx + 1}
                                        </span>
                                        <span className="font-bold text-slate-700">{p.province || "Chưa cập nhật"}</span>
                                    </div>
                                    <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{p.count} thí sinh</span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden relative z-0">
                                    <div 
                                        className={`h-2 rounded-full ${idx < 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-indigo-500'}`} 
                                        style={{ width: `${(p.count / total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-10 text-slate-400 italic">Không tìm thấy kết quả</div>
                        )}
                    </div>
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t border-slate-100 bg-white text-center text-xs text-slate-500 font-medium">
                    Tổng cộng: {filteredData.length} Tỉnh/Thành phố có thí sinh
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // State mở modal tỉnh
  const [showProvinceModal, setShowProvinceModal] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getDashboardStats();
      if (data) processData(data);
      setLoading(false);
    }
    load();
  }, []);

  const processData = (data: any) => {
    // 1. Status
    const statusData = [
      { name: 'Đã duyệt', value: Number(data.status.find((s: any) => s.c_status === 'APPROVED')?.count || 0), color: COLORS_STATUS.APPROVED },
      { name: 'Chờ duyệt', value: Number(data.status.find((s: any) => s.c_status === 'PENDING')?.count || 0), color: COLORS_STATUS.PENDING },
      { name: 'Từ chối', value: Number(data.status.find((s: any) => s.c_status === 'REJECTED')?.count || 0), color: COLORS_STATUS.REJECTED },
    ].filter(item => item.value > 0);

    // 2. Table
    const tableData = data.table.map((t: any, index: number) => ({
      name: `Bảng ${t.c_table}`, value: Number(t.count), color: COLORS_TABLE[index % COLORS_TABLE.length]
    }));

    // 3. Province (Lấy hết data, không cắt top 5 ở đây nữa)
    const provinceData = data.province.map((p: any) => ({ province: p.c_province, count: Number(p.count) }));

    // 4. Timeline
    const timelineData = data.timeline.map((t: any) => ({
        date: new Date(t.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        count: Number(t.count)
    }));

    // 5. Gender
    const genderData = (data.gender || []).map((g: any) => ({
        name: g.c_gender || 'Khác', 
        value: Number(g.count),
        color: g.c_gender === 'Nữ' ? COLORS_GENDER[0] : (g.c_gender === 'Nam' ? COLORS_GENDER[1] : COLORS_GENDER[2])
    }));

    // 6. Grade
    const gradeData = (data.grade || []).map((g: any) => ({
        name: `Khối ${g.c_grade}`, value: Number(g.count)
    }));

    setStats({ 
        ...data, 
        statusChart: statusData, tableChart: tableData, province: provinceData, timelineChart: timelineData,
        genderChart: genderData, gradeChart: gradeData
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-100 text-slate-500 gap-2"><Loader2 className="animate-spin"/> Đang tải dữ liệu...</div>;
  if (!stats) return <div className="p-10 text-center">Không thể tải dữ liệu thống kê.</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* MODAL TỈNH THÀNH (Hiện khi bấm nút) */}
        {showProvinceModal && (
            <ProvinceModal 
                data={stats.province} 
                total={stats.total} 
                onClose={() => setShowProvinceModal(false)}
            />
        )}

        {/* Header & Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="text-blue-600" /> Dashboard Thống kê
                </h1>
                <p className="text-slate-500 text-sm mt-1">Tổng quan dữ liệu cuộc thi UMT TechGen</p>
            </div>
            <Link href="/admin" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:text-blue-600 transition shadow-sm active:scale-95">
                <ArrowLeft size={18} /> Quay lại Quản lý
            </Link>
        </div>

        {/* 1. OVERVIEW CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Tổng hồ sơ" value={stats.total} icon={<Users className="text-blue-600" size={20}/>} bg="bg-blue-50" border="border-blue-200" text="text-blue-900" />
          <StatCard title="Đã duyệt" value={stats.statusChart.find((s:any)=>s.name==='Đã duyệt')?.value||0} icon={<CheckCircle className="text-emerald-600" size={20}/>} bg="bg-emerald-50" border="border-emerald-200" text="text-emerald-900" />
          <StatCard title="Chờ xử lý" value={stats.statusChart.find((s:any)=>s.name==='Chờ duyệt')?.value||0} icon={<Clock className="text-amber-600" size={20}/>} bg="bg-amber-50" border="border-amber-200" text="text-amber-900" />
          <StatCard title="Bị từ chối" value={stats.statusChart.find((s:any)=>s.name==='Từ chối')?.value||0} icon={<AlertCircle className="text-red-600" size={20}/>} bg="bg-red-50" border="border-red-200" text="text-red-900" />
        </div>

        {/* 2. MAIN CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><CalendarDays size={18} className="text-slate-400"/> Xu hướng đăng ký</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.timelineChart}>
                            <defs><linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0"/>
                            <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false}/>
                            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false}/>
                            <Tooltip contentStyle={{borderRadius:'12px', border:'none', boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                            <Area type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" name="Số lượng" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><GraduationCap size={18} className="text-slate-400"/> Phân bố Khối lớp</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.gradeChart} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0"/>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false}/>
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius:'8px'}}/>
                            <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={30} name="Thí sinh">
                                {stats.gradeChart.map((entry:any, index:number) => (
                                     <Cell key={`cell-${index}`} fill={index === 0 ? '#A78BFA' : index === 1 ? '#8B5CF6' : '#7C3AED'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* 3. MIDDLE: Province & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* --- TOP TỈNH (ĐÃ CẬP NHẬT) --- */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><MapPin size={18} className="text-slate-400"/> Top Tỉnh/Thành phố</h3>
                    {/* NÚT MỞ MODAL */}
                    <button 
                        onClick={() => setShowProvinceModal(true)} 
                        className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                        <Maximize2 size={12}/> Xem tất cả
                    </button>
                </div>
                
                <div className="space-y-3">
                    {/* CHỈ HIỂN THỊ 5 TỈNH ĐẦU TIÊN Ở ĐÂY */}
                    {stats.province.slice(0, 5).map((p: any, idx: number) => (
                        <div key={idx} className="relative">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-700">{p.province || "Chưa cập nhật"}</span>
                                <span className="font-bold text-slate-900">{p.count}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(p.count / stats.total) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* ----------------------------- */}

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center">
                <h3 className="font-bold text-slate-800 mb-2 w-full text-left flex items-center gap-2"><Users size={18} className="text-slate-400"/> Giới tính</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={stats.genderChart} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                                {stats.genderChart.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />)}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
             </div>
        </div>

        {/* 4. BOTTOM: Status & Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center">
                <h3 className="font-bold text-slate-800 mb-2 w-full text-left flex items-center gap-2"><Loader2 size={18} className="text-slate-400"/> Tỷ lệ xét duyệt</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={stats.statusChart} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                                {stats.statusChart.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />)}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center">
                <h3 className="font-bold text-slate-800 mb-2 w-full text-left flex items-center gap-2"><Award size={18} className="text-slate-400"/> Bảng thi</h3>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={stats.tableChart} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                                {stats.tableChart.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />)}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg, border, text }: any) {
    return (
        <div className={`p-5 rounded-2xl border shadow-sm ${bg} ${border}`}>
            <div className="flex justify-between items-start mb-3">
                <div className="bg-white p-2.5 rounded-xl shadow-sm border border-white/50">{icon}</div>
            </div>
            <div>
                <p className={`text-xs font-bold opacity-70 mb-0.5 uppercase tracking-wider ${text}`}>{title}</p>
                <h4 className={`text-2xl font-extrabold ${text}`}>{value}</h4>
            </div>
        </div>
    )
}