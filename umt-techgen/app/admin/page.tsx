"use client";

import { useEffect, useState } from "react";
import { getCandidates, updateStatus, deleteCandidate, updateCandidateInfo } from "@/app/actions/register";
import * as XLSX from "xlsx";
import { 
  Download, Check, X, Eye, LogOut, Filter, MessageSquare, 
  ChevronLeft, ChevronRight, User, Calendar, CreditCard, 
  Phone, Mail, School, Award, FileBadge, CheckCircle, AlertCircle, 
  Loader2, Clock, FileSpreadsheet, AlertTriangle,
  Trash2, LayoutDashboard, StickyNote, Save, Pencil, Megaphone,
  Search, SlidersHorizontal, ArrowRight,
  Send,
} from "lucide-react";
import Link from "next/link";
import { logoutAdmin, getCurrentRole } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { EditModal } from "@/components/EditModal";
import { sendEmailNotification } from "@/app/actions/register";

// --- CẤU HÌNH ĐỊA CHỈ BACKEND ---
const BACKEND_URL = ""; 

const getImageUrl = (path: string | null | undefined) => {
    if (!path) return null;
    if (path.startsWith("http")) return path; 
    return `${BACKEND_URL}${path}`;
};

// --- TYPES ---
type Candidate = {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  cccd: string;
  phone: string;
  email: string;
  school: string;
  province: string;
  grade: string;
  className: string;
  studentId?: string | null;
  table: string;
  achievements?: string | null;
  cccdPath?: string | null;
  cccdBackPath?: string | null;
  studentCardPath?: string | null;
  status: string;
  note?: string; 
  createdAt: string;
};

// --- HELPER FORMAT DATE ---
const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "---";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "---";
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (e) {
        return "---";
    }
};

// --- TOAST COMPONENT ---
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
    useEffect(() => {
      const timer = setTimeout(onClose, 3000);
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
          <h4 className="font-bold text-sm mb-0.5">{type === 'success' ? 'Thành công!' : 'Lỗi!'}</h4>
          <p className="text-sm opacity-90 leading-snug">{message}</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-black/5 transition"><X size={16} /></button>
      </div>
    );
};

// --- CONFIRM MODAL COMPONENT ---
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: { isOpen: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onCancel}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform scale-100 transition-all" onClick={e => e.stopPropagation()}>
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-amber-50/50">
              <AlertTriangle size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed px-4">{message}</p>
          </div>
          <div className="grid grid-cols-2 border-t border-slate-100 bg-slate-50/50">
            <button onClick={onCancel} className="py-4 text-slate-600 font-bold hover:bg-white transition border-r border-slate-100 text-sm uppercase tracking-wide">
              Hủy bỏ
            </button>
            <button onClick={onConfirm} className="py-4 text-blue-600 font-bold hover:bg-white transition text-sm uppercase tracking-wide">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    );
};

// --- MODAL XEM ẢNH ---
const ImageModal = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => {
  if (!src) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative bg-transparent w-full max-w-5xl flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition backdrop-blur-sm z-50">
            <X size={24} />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="max-h-[80vh] w-auto object-contain shadow-2xl rounded-lg border border-white/10" />
        <div className="mt-6 flex items-center gap-4 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
            <span className="text-white font-medium text-lg">{alt}</span>
            <div className="w-px h-6 bg-white/20"></div>
            <a href={src} target="_blank" download className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-sm transition uppercase tracking-wide">
                <Download size={16} /> Tải ảnh gốc
            </a>
        </div>
      </div>
    </div>
  );
};

// --- MODAL CHI TIẾT ---
const DetailModal = ({ 
    candidate, 
    role, 
    onClose, 
    onVerify, 
    onDelete, 
    onSaveNote, 
    onViewImage 
}: { 
    candidate: Candidate; 
    role: string;
    onClose: () => void; 
    onVerify: (id: string, status: string, note?: string) => void; 
    onDelete: (id: string) => void; 
    onSaveNote: (id: string, note: string) => void; 
    onViewImage: (src: string, alt: string) => void 
}) => {
    const [note, setNote] = useState(candidate.note || "");
    const [isSaving, setIsSaving] = useState(false);
    const [emailNote, setEmailNote] = useState("");
    const [isSendingMail, setIsSendingMail] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);

    const handleSaveNoteClick = async () => {
        setIsSaving(true);
        await onSaveNote(candidate.id, note);
        setIsSaving(false);
    };
    
    const handleSendEmail = async () => {
        if (!emailNote.trim()) return;
        setIsSendingMail(true);
        const res = await sendEmailNotification(candidate.id, emailNote);
        if (res.success) {
            alert("Đã gửi email thành công!");
            setShowEmailForm(false);
            setEmailNote("");
        } else {
            alert("Gửi thất bại: " + res.message);
        }
        setIsSendingMail(false);
    };

    if (!candidate) return null;
    const isViewer = role === 'VIEWER';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200" onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100" onClick={e => e.stopPropagation()}>
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50 backdrop-blur-sm">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/20">
                            {candidate.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{candidate.fullName}</h2>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md text-xs font-mono border border-slate-200">ID: {candidate.id.slice(0, 8)}</span>
                                <span className="text-xs text-slate-400">•</span>
                                <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12}/> Đăng ký: {formatDate(candidate.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30 custom-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Cột Trái: Thông tin */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 text-lg">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><User size={18}/></div>
                                    Thông tin cá nhân
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    <div>
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Ngày sinh</span>
                                        <p className="text-slate-900 font-medium flex items-center gap-2"><Calendar size={16} className="text-slate-400"/> {formatDate(candidate.dob)}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Giới tính</span>
                                        <p className="text-slate-900 font-medium">{candidate.gender}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Số CCCD</span>
                                        <p className="text-slate-900 font-medium flex items-center gap-2"><CreditCard size={16} className="text-slate-400"/> {candidate.cccd}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Điện thoại</span>
                                        <p className="text-blue-600 font-bold flex items-center gap-2"><Phone size={16} className="text-slate-400"/> {candidate.phone}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Email liên hệ</span>
                                        <p className="text-slate-900 font-medium flex items-center gap-2"><Mail size={16} className="text-slate-400"/> {candidate.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 text-lg">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><School size={18}/></div>
                                    Thông tin trường học
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Trường THPT</span>
                                        <p className="text-slate-900 font-medium text-lg">{candidate.school}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Tỉnh/Thành phố</span>
                                            <p className="text-slate-900 font-medium">{candidate.province}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Lớp học</span>
                                            <p className="text-slate-900 font-medium">Khối {candidate.grade} - Lớp {candidate.className}</p>
                                        </div>
                                    </div>
                                    {candidate.studentId && (
                                        <div className="pt-3 border-t border-slate-50">
                                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Mã học sinh</span>
                                            <p className="text-slate-900 font-mono bg-slate-100 px-2 py-1 rounded w-fit">{candidate.studentId}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Cột Phải */}
                        <div className="lg:col-span-5 space-y-6">
                             {/* Ghi chú Admin */}
                             <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 shadow-sm mt-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-blue-800 flex items-center gap-2">
                    <Mail size={18}/> Gửi Email cho thí sinh
                </h3>
                <button 
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="text-xs bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-lg font-bold hover:bg-blue-100 transition"
                >
                    {showEmailForm ? "Đóng" : "Soạn mail"}
                </button>
            </div>
            
            {showEmailForm && (
                <div className="animate-in fade-in slide-in-from-top-2">
                    <textarea 
                        className="w-full text-sm p-3 rounded-xl border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 min-h-[80px] mb-2"
                        placeholder="Nhập nội dung cần nhắn gửi (Ví dụ: Em cần gửi lại ảnh rõ hơn)..."
                        value={emailNote}
                        onChange={(e) => setEmailNote(e.target.value)}
                    ></textarea>
                    <button 
                        onClick={handleSendEmail}
                        disabled={isSendingMail || !emailNote}
                        className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isSendingMail ? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>}
                        Gửi ngay
                    </button>
                </div>
            )}
        </div>

                             <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                                        <StickyNote size={18}/> Ghi chú Admin
                                    </h3>
                                    {!isViewer && (
                                        <button 
                                            onClick={handleSaveNoteClick}
                                            disabled={isSaving}
                                            className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1 disabled:opacity-50"
                                        >
                                            {isSaving ? <Loader2 size={12} className="animate-spin"/> : <Save size={12}/>} Lưu
                                        </button>
                                    )}
                                </div>
                                <textarea 
                                    className="w-full text-sm p-3 rounded-xl border border-yellow-200 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 min-h-[100px]"
                                    placeholder={isViewer ? "Không có ghi chú" : "Ghi chú vấn đề hồ sơ..."}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    readOnly={isViewer}
                                ></textarea>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
                                <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 text-lg">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Award size={18}/></div>
                                    Nội dung dự thi
                                </h3>
                                <div className="mb-5">
                                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">Bảng thi đấu</span>
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${
                                        candidate.table === 'A' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-teal-50 border-teal-200 text-teal-700'
                                    }`}>
                                        <span className="font-bold text-lg">Bảng {candidate.table}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">Thành tích liên quan</span>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 italic leading-relaxed">
                                        {candidate.achievements ? `"${candidate.achievements}"` : "Thí sinh không ghi chú thêm thành tích."}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 text-lg">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FileBadge size={18}/></div>
                                    Hồ sơ minh chứng
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { src: getImageUrl(candidate.cccdPath), title: "CCCD Mặt trước" },
                                        { src: getImageUrl(candidate.cccdBackPath), title: "CCCD Mặt sau" },
                                        { src: getImageUrl(candidate.studentCardPath), title: "Thẻ Học sinh", full: true }
                                    ].map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => img.src && onViewImage(img.src, `${img.title} - ${candidate.fullName}`)}
                                            className={`relative group cursor-pointer rounded-xl overflow-hidden border border-slate-200 bg-slate-100 transition-all hover:shadow-md ${img.full ? 'col-span-2 aspect-[3/1]' : 'aspect-[4/3]'}`}
                                        >
                                            {img.src ? (
                                                <>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={img.src} alt={img.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
                                                        <Eye className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition duration-300" size={28} />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                    <AlertCircle size={24} className="mb-1 opacity-50"/>
                                                    <span className="text-xs font-medium">Chưa có ảnh</span>
                                                </div>
                                            )}
                                            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                                {img.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                {!isViewer && (
                    <div className="p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Trạng thái:</span>
                                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold flex items-center gap-1.5 ${
                                    candidate.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                                    candidate.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {candidate.status === 'APPROVED' && <CheckCircle size={12}/>}
                                    {candidate.status === 'REJECTED' && <AlertCircle size={12}/>}
                                    {candidate.status === 'PENDING' && <Loader2 size={12} className="animate-spin"/>}
                                    {candidate.status === 'PENDING' ? 'Chờ duyệt' : candidate.status === 'APPROVED' ? 'Đã duyệt' : 'Đã từ chối'}
                                </span>
                            </div>
                            <button 
                                onClick={() => onDelete(candidate.id)}
                                className="px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition font-bold text-xs flex items-center gap-2 group h-full"
                                title="Xóa hồ sơ"
                            >
                                <Trash2 size={16} className="group-hover:text-red-600"/> 
                                <span className="hidden sm:inline">Xóa</span>
                            </button>
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={() => onVerify(candidate.id, "REJECTED", note)} className="flex-1 sm:flex-none px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition font-bold text-sm flex items-center justify-center gap-2">
                                <X size={18}/> Từ chối
                            </button>
                            <button onClick={() => onVerify(candidate.id, "APPROVED", note)} className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition font-bold text-sm flex items-center justify-center gap-2">
                                <Check size={18}/> Duyệt hồ sơ
                            </button>
                        </div>
                    </div>
                )}
                {isViewer && (
                    <div className="p-4 border-t border-slate-100 bg-white text-center text-slate-500 text-sm">
                        Chế độ xem (View Only) - Không thể chỉnh sửa
                    </div>
                )}
            </div>
        </div>
    );
};

// --- COMPONENT CHÍNH ---
export default function AdminPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [role, setRole] = useState<string>("VIEWER");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [filterTable, setFilterTable] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void } | null>(null);
  const [editCandidate, setEditCandidate] = useState<Candidate | null>(null);

  const router = useRouter();

  useEffect(() => { 
      loadData(); 
      const fetchRole = async () => {
          const r = await getCurrentRole();
          setRole(r);
      };
      fetchRole();
  }, [page, filterTable, filterStatus, fromDate, toDate]); 

  const loadData = async () => {
    setLoading(true);
    try {
        const data = await getCandidates({ page: page, limit: 10, table: filterTable, status: filterStatus, fromDate: fromDate, toDate: toDate });
        if (data && Array.isArray(data.candidates)) {
            const validData = data.candidates.filter((c: any) => c && c.id);
            setCandidates(validData as unknown as Candidate[]); 
            setTotalPages(data.totalPages || 1);
            setTotalItems(data.totalItems || 0);
        } else {
            setCandidates([]);
        }
    } catch (error) {
        console.error("Failed to load candidates", error);
        setCandidates([]);
    } finally {
        setLoading(false);
    }
  };

  const handleVerify = (id: string, status: string, note: string = "") => {
    const actionText = status === 'APPROVED' ? 'DUYỆT' : 'TỪ CHỐI';
    setConfirmModal({
      isOpen: true,
      title: `Xác nhận ${actionText.toLowerCase()}`,
      message: `Bạn có chắc chắn muốn ${actionText} hồ sơ thí sinh này không? Hành động này sẽ cập nhật trạng thái trên hệ thống.`,
      onConfirm: async () => {
        setConfirmModal(null); 
        const res = await updateStatus(id, status, note);
        if (res.success) {
            setCandidates(prev => prev.map(c => c.id === id ? { ...c, status, note } : c));
            if (selectedCandidate && selectedCandidate.id === id) {
                setSelectedCandidate(prev => prev ? { ...prev, status, note } : null);
            }
            setToast({ message: `Đã ${actionText.toLowerCase()} hồ sơ thành công!`, type: 'success' });
        } else {
            setToast({ message: "Cập nhật thất bại, vui lòng thử lại.", type: 'error' });
        }
      }
    });
  };

  const handleSaveNote = async (id: string, note: string) => {
      const currentCandidate = candidates.find(c => c.id === id);
      const currentStatus = currentCandidate ? currentCandidate.status : "PENDING"; 
      const res = await updateStatus(id, currentStatus, note);
      if (res.success) {
          setCandidates(prev => prev.map(c => c.id === id ? { ...c, note } : c));
          if (selectedCandidate?.id === id) {
              setSelectedCandidate(prev => prev ? { ...prev, note } : null);
          }
          setToast({ message: "Đã lưu ghi chú thành công!", type: 'success' });
      } else {
          setToast({ message: "Lỗi khi lưu ghi chú.", type: 'error' });
      }
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
        isOpen: true,
        title: "Xác nhận xóa hồ sơ",
        message: "Hành động này KHÔNG THỂ hoàn tác. Bạn có chắc chắn muốn xóa hoàn toàn dữ liệu thí sinh này khỏi hệ thống không?",
        onConfirm: async () => {
          setConfirmModal(null); 
          const res = await deleteCandidate(id);
          if (res.success) {
              setCandidates(prev => prev.filter(c => c.id !== id));
              setTotalItems(prev => prev - 1);
              if (selectedCandidate && selectedCandidate.id === id) setSelectedCandidate(null);
              setToast({ message: "Đã xóa hồ sơ thành công!", type: 'success' });
          } else {
              setToast({ message: res.message || "Xóa thất bại, vui lòng thử lại.", type: 'error' });
          }
        }
      });
  }

  const exportExcel = async () => {
    const data = await getCandidates({ page: 1, limit: 10000, table: filterTable, status: filterStatus });
    let fullList = (data.candidates || []) as unknown as Candidate[];
    if (fromDate) {
        const from = new Date(fromDate);
        fullList = fullList.filter(c => new Date(c.createdAt) >= from);
    }
    if (toDate) {
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);
        fullList = fullList.filter(c => new Date(c.createdAt) <= to);
    }
    const dataToExport = fullList.map((c) => ({
        "Họ tên": c.fullName,
        "Ngày sinh": formatDate(c.dob), 
        "Giới tính": c.gender,
        "CCCD": c.cccd,
        "SĐT": c.phone,
        "Email": c.email,
        "Trường": c.school,
        "Tỉnh": c.province,
        "Khối": c.grade,
        "Lớp": c.className,
        "Bảng thi": c.table,
        "Trạng thái": c.status === 'APPROVED' ? 'Đã duyệt' : c.status === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt',
        "Ghi chú": c.note || "",
        "Link ảnh CCCD Trước": c.cccdPath ? BACKEND_URL + c.cccdPath : "",
        "Link ảnh CCCD Sau": c.cccdBackPath ? BACKEND_URL + c.cccdBackPath : "",
        "Link ảnh Thẻ HS": c.studentCardPath ? BACKEND_URL + c.studentCardPath : "",
        "Ngày đăng ký": formatDate(c.createdAt) 
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    const sheetName = filterTable === "ALL" ? "All_Candidates" : `Bang_${filterTable}`;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    let fileName = `DS_ThiSinh`;
    if(filterTable !== 'ALL') fileName += `_${filterTable}`;
    if(fromDate) fileName += `_tu_${fromDate}`;
    if(toDate) fileName += `_den_${toDate}`;
    fileName += `.xlsx`;
    XLSX.writeFile(workbook, fileName);
    setToast({ message: `Đã xuất ${fullList.length} hồ sơ ra Excel!`, type: 'success' });
  };

  const handleUpdateInfo = async (id: string, newData: any) => {
    const res = await updateCandidateInfo(id, newData);
    if (res.success) {
        setCandidates(prev => prev.map(c => c.id === id ? { ...c, ...newData } : c));
        if (selectedCandidate?.id === id) setSelectedCandidate(prev => prev ? { ...prev, ...newData } : null);
        setEditCandidate(null);
        setToast({ message: "Cập nhật thành công!", type: 'success' });
    } else {
        setToast({ message: "Lỗi cập nhật", type: 'error' });
    }
  };

  const handleLogout = async () => {
      await logoutAdmin();
      router.push("/admin/login");
  };

  const isViewer = role === 'VIEWER';

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans relative">
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {previewImage && <ImageModal src={previewImage.src} alt={previewImage.alt} onClose={() => setPreviewImage(null)} />}
      {confirmModal && <ConfirmModal isOpen={confirmModal.isOpen} title={confirmModal.title} message={confirmModal.message} onConfirm={confirmModal.onConfirm} onCancel={() => setConfirmModal(null)} />}
      {!isViewer && editCandidate && <EditModal candidate={editCandidate} onClose={() => setEditCandidate(null)} onSave={handleUpdateInfo} />}
      {selectedCandidate && <DetailModal candidate={selectedCandidate} role={role} onClose={() => setSelectedCandidate(null)} onVerify={handleVerify} onDelete={handleDelete} onSaveNote={handleSaveNote} onViewImage={(src, alt) => setPreviewImage({ src, alt })} />}

      <div className="max-w-[1600px] mx-auto min-h-[85vh] flex flex-col gap-6">
        
        {/* --- HEADER RIÊNG BIỆT --- */}
        <div className="flex justify-between items-center bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
             <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <Award size={18} />
                    </div>
                    Quản trị viên <span className="text-slate-300 font-light">|</span> UMT TechGen
                </h1>
                <p className="text-slate-500 text-xs mt-1 font-medium ml-10">
                    Phiên: <span className="font-bold text-blue-600 uppercase">{role}</span> • Tổng hồ sơ: <span className="font-bold text-slate-900">{totalItems}</span>
                </p>
             </div>
             
             <button onClick={handleLogout} className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-600 hover:text-white hover:border-red-600 transition font-bold text-sm group">
                <LogOut size={16} /> <span className="hidden sm:inline">Đăng xuất</span>
             </button>
        </div>
        
        {/* --- TOOLBAR CÂN ĐỐI --- */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
             
             {/* Nhóm 1: Điều hướng */}
             <div className="flex flex-wrap gap-2 w-full xl:w-auto">
                <Link href="/admin/dashboard" className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm shadow-sm">
                    <LayoutDashboard size={18}/> Dashboard
                </Link>
                <Link href="/admin/announcements" className="bg-white text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-slate-50 hover:text-orange-600 transition font-bold text-sm">
                    <Megaphone size={18}/> Thông báo
                </Link>
                <Link href="/admin/contacts" className="bg-white text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-slate-50 hover:text-slate-900 transition font-bold text-sm">
                    <MessageSquare size={18} /> Hộp thư
                </Link>
             </div>

             <div className="w-full h-px bg-slate-100 xl:hidden"></div>

             {/* Nhóm 2 & 3: Bộ lọc & Hành động */}
             <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto items-center">
                 
                 {/* Khối lọc ngày tháng */}
                 <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 w-full md:w-auto">
                     <div className="relative flex-1">
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full pl-2 pr-1 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-blue-500" title="Từ ngày"/>
                     </div>
                     <ArrowRight size={14} className="text-slate-400"/>
                     <div className="relative flex-1">
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full pl-2 pr-1 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-blue-500" title="Đến ngày"/>
                     </div>
                 </div>

                 {/* Khối Select Filters */}
                 <div className="flex gap-2 w-full md:w-auto">
                     <div className="relative flex-1 md:w-[150px]">
                        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer font-bold text-sm appearance-none hover:bg-slate-50 transition">
                            <option value="ALL">Mọi trạng thái</option>
                            <option value="PENDING">Chờ duyệt</option>
                            <option value="APPROVED">Đã duyệt</option>
                            <option value="REJECTED">Từ chối</option>
                        </select>
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                     </div>

                     <div className="relative flex-1 md:w-[140px]">
                        <select value={filterTable} onChange={(e) => { setFilterTable(e.target.value); setPage(1); }} className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer font-bold text-sm appearance-none hover:bg-slate-50 transition">
                            <option value="ALL">Tất cả bảng</option>
                            <option value="A">Bảng A</option>
                            <option value="B">Bảng B</option>
                        </select>
                        <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                     </div>
                 </div>

                 {/* Nút Xuất Excel */}
                 <button onClick={exportExcel} className="w-full md:w-auto bg-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 font-bold text-sm active:scale-95 whitespace-nowrap">
                    <FileSpreadsheet size={18} /> <span className="hidden lg:inline">Xuất Excel</span>
                 </button>
             </div>
        </div>

        {/* Bảng Danh sách */}
        <div className="flex-1 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Thông tin thí sinh</th>
                <th className="px-6 py-4">Trường & Lớp</th>
                <th className="px-6 py-4 text-center">Bảng thi</th>
                <th className="px-6 py-4 text-center">Ngày đăng ký</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4">Ghi chú</th> 
                <th className="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                  <tr><td colSpan={7} className="px-6 py-24 text-center text-slate-400 font-medium"><div className="flex flex-col items-center gap-3"><Loader2 className="animate-spin text-blue-500" size={32}/>Đang tải dữ liệu...</div></td></tr>
              ) : candidates.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-24 text-center text-slate-400 italic bg-slate-50/30">Chưa có dữ liệu nào phù hợp.</td></tr>
              ) : (
                  candidates.map((c) => (
                    <tr key={c.id} className="bg-white hover:bg-slate-50/80 transition-colors duration-200 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                                {c.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition cursor-pointer" onClick={() => setSelectedCandidate(c)}>
                                    {c.fullName}
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5 font-medium uppercase tracking-wide flex items-center gap-1">
                                    {c.gender} • {formatDate(c.dob)}
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                    <CreditCard size={10}/> {c.cccd}
                                </div>
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800 text-sm">{c.school}</div>
                        <div className="text-xs text-slate-500 mt-1">{c.province}</div>
                        <div className="mt-1.5 inline-block px-2 py-0.5 bg-slate-100 rounded-md text-[11px] font-bold text-slate-600 border border-slate-200">
                            Khối {c.grade} • {c.className}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${c.table === 'A' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-teal-50 text-teal-700 border-teal-200'}`}>
                            Bảng {c.table}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                          <div className="text-xs font-mono font-medium bg-slate-50 px-2 py-1 rounded border border-slate-100 inline-block text-slate-600">
                            {formatDate(c.createdAt)}
                          </div>
                      </td>
                      
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wide font-bold border flex items-center justify-center gap-1.5 mx-auto w-fit min-w-[100px] ${
                            c.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                            c.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                            {c.status === 'APPROVED' && <CheckCircle size={12}/>}
                            {c.status === 'REJECTED' && <X size={12}/>}
                            {c.status === 'PENDING' && <Loader2 size={12} className="animate-spin"/>}
                            {c.status === 'PENDING' ? 'Chờ duyệt' : c.status === 'APPROVED' ? 'Đã duyệt' : 'Từ chối'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {c.note ? (
                            <span className="text-xs text-slate-500 italic truncate max-w-[150px] block border-b border-dashed border-slate-300 pb-0.5" title={c.note}>
                                {c.note}
                            </span>
                        ) : (
                            <span className="text-xs text-slate-300">-</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                            <button onClick={() => setSelectedCandidate(c)} className="p-2 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition shadow-sm active:scale-95" title="Xem chi tiết">
                                <Eye size={16} />
                            </button>

                            {!isViewer && (
                                <>
                                    <button onClick={(e) => { e.stopPropagation(); setEditCandidate(c); }} className="p-2 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition shadow-sm active:scale-95" title="Cập nhật thông tin">
                                        <Pencil size={16} />
                                    </button>
                                    {c.status !== 'APPROVED' && (
                                        <button onClick={() => handleVerify(c.id, "APPROVED")} className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition border border-emerald-200 active:scale-95 shadow-sm" title="Duyệt nhanh">
                                            <Check size={16} strokeWidth={3} />
                                        </button>
                                    )}
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }} className="p-2 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition shadow-sm active:scale-95" title="Xóa hồ sơ">
                                        <Trash2 size={16} />
                                    </button>
                                </>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trang {page} / {totalPages > 0 ? totalPages : 1}</span>
            <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 flex items-center gap-1 text-sm font-bold text-slate-600 transition bg-slate-50">
                    <ChevronLeft size={16} /> Trước
                </button>
                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 flex items-center gap-1 text-sm font-bold text-slate-600 transition bg-slate-50">
                    Sau <ChevronRight size={16} />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}