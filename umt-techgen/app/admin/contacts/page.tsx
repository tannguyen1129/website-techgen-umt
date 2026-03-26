"use client";

import { useEffect, useState } from "react";
import { getContacts, updateContact, deleteContact } from "@/app/actions/contact";
import * as XLSX from "xlsx";
import { 
  Check, X, Eye, Trash2, Search, Filter, MessageSquare, 
  ChevronLeft, ChevronRight, Loader2, Mail, Phone, User, 
  Calendar, AlertCircle, CheckCircle, Clock, FileSpreadsheet, AlertTriangle 
} from "lucide-react";
import Link from "next/link";

// --- TYPES ---
type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

// --- HELPER FORMAT DATE (dd/mm/yyyy) ---
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

const formatTime = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
        return new Date(dateString).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});
    } catch (e) {
        return "";
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
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-red-50/50">
              <Trash2 size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed px-4">{message}</p>
          </div>
          <div className="grid grid-cols-2 border-t border-slate-100 bg-slate-50/50">
            <button onClick={onCancel} className="py-4 text-slate-600 font-bold hover:bg-white transition border-r border-slate-100 text-sm uppercase tracking-wide">
              Hủy bỏ
            </button>
            <button onClick={onConfirm} className="py-4 text-red-600 font-bold hover:bg-white transition text-sm uppercase tracking-wide">
              Xóa bỏ
            </button>
          </div>
        </div>
      </div>
    );
};

// --- DETAIL MODAL ---
const ContactDetailModal = ({ contact, onClose }: { contact: Contact; onClose: () => void }) => {
    if (!contact) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200" onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><MessageSquare size={20} /></div>
                        Chi tiết liên hệ
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-700 transition"><X size={20}/></button>
                </div>
                <div className="p-8 space-y-6 bg-white">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Người gửi</span>
                            <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <User size={18} className="text-blue-500" /> {contact.name}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Thời gian</span>
                            <p className="text-lg font-medium text-slate-900 flex items-center gap-2">
                                <Clock size={18} className="text-orange-500" /> 
                                {formatDate(contact.createdAt)} <span className="text-sm text-slate-400 font-normal">({formatTime(contact.createdAt)})</span>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email</span>
                            <p className="text-base text-slate-700 flex items-center gap-2">
                                <Mail size={18} className="text-slate-400" /> 
                                <a href={`mailto:${contact.email}`} className="hover:text-blue-600 hover:underline transition">{contact.email}</a>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Số điện thoại</span>
                            <p className="text-base text-slate-700 flex items-center gap-2">
                                <Phone size={18} className="text-slate-400" /> {contact.phone || "---"}
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-3 block flex items-center gap-2">
                            <MessageSquare size={14}/> Nội dung tin nhắn
                        </span>
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed text-base">
                            {contact.message}
                        </p>
                    </div>
                </div>
                <div className="p-5 border-t border-slate-100 bg-slate-50/30 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition font-medium shadow-lg shadow-slate-900/10">
                        Đóng lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Pagination & Filter
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL, READ, UNREAD

  // Modals
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void } | null>(null);

  useEffect(() => {
    loadData();
  }, [page, statusFilter]); 

  const loadData = async () => {
    setLoading(true);
    try {
        const data = await getContacts({ page, status: statusFilter, search });
        
        // XỬ LÝ LINH HOẠT DỮ LIỆU TRẢ VỀ
        // Trường hợp 1: Trả về { contacts: [...], total... }
        if (data && Array.isArray(data.contacts)) {
            setContacts(data.contacts as unknown as Contact[]);
            setTotalPages(data.totalPages || 1);
            setTotalItems(data.totalItems || 0);
        } 
        // Trường hợp 2: Trả về mảng trực tiếp [...]
        else if (Array.isArray(data)) {
             setContacts(data as unknown as Contact[]);
             setTotalPages(1);
             setTotalItems(data.length);
        }
        // Trường hợp 3: Lỗi hoặc rỗng
        else {
            setContacts([]);
            setTotalItems(0);
        }
    } catch (err) {
        console.error("Lỗi tải danh sách liên hệ:", err);
        setContacts([]);
    } finally {
        setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      setPage(1); 
      loadData();
  };

  const handleDelete = (id: string) => {
      setConfirmModal({
          isOpen: true,
          title: "Xóa liên hệ",
          message: "Bạn có chắc chắn muốn xóa tin nhắn liên hệ này không? Hành động này không thể hoàn tác.",
          onConfirm: async () => {
              setConfirmModal(null);
              const res = await deleteContact(id);
              if (res.success) {
                  setContacts(prev => prev.filter(c => c.id !== id));
                  setTotalItems(prev => Math.max(0, prev - 1));
                  if (selectedContact?.id === id) setSelectedContact(null);
                  setToast({ message: "Đã xóa liên hệ thành công!", type: 'success' });
              } else {
                  setToast({ message: "Xóa thất bại, vui lòng thử lại.", type: 'error' });
              }
          }
      });
  };

  const handleViewDetail = async (contact: Contact) => {
      setSelectedContact(contact);
      if (!contact.isRead) {
          await updateContact(contact.id, { isRead: true });
          // Cập nhật UI ngay lập tức
          setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, isRead: true } : c));
      }
  };

  const exportExcel = async () => {
    // Lấy toàn bộ danh sách (limit lớn)
    const data = await getContacts({ page: 1, limit: 10000, status: statusFilter, search });
    let fullList: Contact[] = [];

    // Xử lý dữ liệu trả về tương tự loadData
    if (data && Array.isArray(data.contacts)) {
        fullList = data.contacts as unknown as Contact[];
    } else if (Array.isArray(data)) {
        fullList = data as unknown as Contact[];
    }

    const dataToExport = fullList.map((c) => ({
        "Họ tên": c.name,
        "Email": c.email,
        "Số điện thoại": c.phone || "",
        "Nội dung tin nhắn": c.message,
        "Trạng thái": c.isRead ? "Đã đọc" : "Chưa đọc",
        "Ngày gửi": formatDate(c.createdAt), // Format chuẩn dd/mm/yyyy
        "Giờ gửi": formatTime(c.createdAt)
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    const sheetName = statusFilter === "ALL" ? "Contacts" : `Contacts_${statusFilter}`;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const fileName = `Danh_sach_lien_he_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    setToast({ message: "Xuất file Excel thành công!", type: 'success' });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans relative">
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {confirmModal && (
        <ConfirmModal 
          isOpen={confirmModal.isOpen} 
          title={confirmModal.title} 
          message={confirmModal.message} 
          onConfirm={confirmModal.onConfirm} 
          onCancel={() => setConfirmModal(null)} 
        />
      )}

      {selectedContact && (
        <ContactDetailModal 
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
        />
      )}

      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200/60 p-6 md:p-8 max-w-[1600px] mx-auto min-h-[85vh] flex flex-col">
        
        {/* Header Dashboard */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 pb-6 border-b border-slate-100 gap-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-700">
                    <ChevronLeft />
                </Link>
                Hộp thư liên hệ
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium ml-12 flex items-center gap-2">
                Tổng số tin nhắn: <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{totalItems}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
             {/* Search Form */}
             <form onSubmit={handleSearch} className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Tìm theo tên, email..." 
                    className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 text-sm transition font-medium placeholder:text-slate-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
             </form>

             <div className="h-8 w-px bg-slate-200 mx-2 hidden lg:block"></div>

             {/* Filter Status */}
             <div className="relative group">
                <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition" size={18} />
                <select 
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    className="pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer font-bold text-sm appearance-none hover:bg-white transition min-w-[180px]"
                >
                    <option value="ALL">Tất cả tin nhắn</option>
                    <option value="UNREAD">Chưa đọc</option>
                    <option value="READ">Đã đọc</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronLeft size={16} className="-rotate-90"/>
                </div>
             </div>
             
             <button onClick={exportExcel} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 font-bold text-sm active:scale-95">
                <FileSpreadsheet size={18} /> Xuất Excel
             </button>
          </div>
        </div>

        {/* Danh sách tin nhắn */}
        <div className="flex-1 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4 w-1/4">Người gửi</th>
                <th className="px-6 py-4 w-1/4">Thông tin liên hệ</th>
                <th className="px-6 py-4 w-1/3">Nội dung tóm tắt</th>
                <th className="px-6 py-4 text-center w-24">Thời gian</th>
                <th className="px-6 py-4 text-center w-24">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                  <tr><td colSpan={5} className="px-6 py-24 text-center text-slate-400 font-medium"><div className="flex flex-col items-center gap-3"><Loader2 className="animate-spin text-blue-500" size={32}/>Đang tải dữ liệu...</div></td></tr>
              ) : contacts.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-24 text-center text-slate-400 italic bg-slate-50/30 flex flex-col items-center justify-center"><MessageSquare size={32} className="mb-2 opacity-30"/>Không có tin nhắn nào.</td></tr>
              ) : (
                  contacts.map((c) => (
                    <tr 
                        key={c?.id || Math.random()} 
                        className={`hover:bg-blue-50/50 transition-colors duration-200 group cursor-pointer ${!c?.isRead ? 'bg-blue-50/30' : 'bg-white'}`}
                        onClick={() => handleViewDetail(c)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm uppercase transition-colors ${!c.isRead ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                {c.name.charAt(0)}
                             </div>
                             <div>
                                <div className={`text-base ${!c?.isRead ? 'text-blue-800 font-bold' : 'text-slate-900 font-semibold'}`}>
                                    {c?.name}
                                    {!c?.isRead && <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>}
                                </div>
                             </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700 font-medium">{c?.email}</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Phone size={10}/> {c?.phone || "---"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <p className={`line-clamp-2 ${!c.isRead ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>{c?.message}</p>
                      </td>
                      <td className="px-6 py-4 text-center text-xs text-slate-500 whitespace-nowrap">
                          <div className="font-bold text-slate-600">{formatDate(c?.createdAt)}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{formatTime(c?.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => handleViewDetail(c)} className="p-2 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition shadow-sm active:scale-95" title="Xem chi tiết">
                                <Eye size={18} />
                            </button>
                            <button onClick={() => handleDelete(c.id)} className="p-2 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition shadow-sm active:scale-95" title="Xóa">
                                <Trash2 size={18} />
                            </button>
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
                <button 
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 flex items-center gap-1 text-sm font-bold text-slate-600 transition bg-slate-50"
                >
                    <ChevronLeft size={16} /> Trước
                </button>
                <button 
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 flex items-center gap-1 text-sm font-bold text-slate-600 transition bg-slate-50"
                >
                    Sau <ChevronRight size={16} />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}