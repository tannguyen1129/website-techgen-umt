"use client";

import { useState, useEffect } from "react";
import { getAnnouncements } from "@/app/actions/announcement"; 
import { 
  Megaphone, ListChecks, Calendar, ChevronRight, 
  Search, X, FileText, Download, Paperclip, FileBadge, 
  Eye, EyeOff, Loader2, ExternalLink
} from "lucide-react";

// Helper Colors
const getTypeConfig = (type: string) => {
    switch (type) {
        case 'RESULT':
            return { label: 'Kết quả thi', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: <ListChecks size={18} className="text-blue-600"/>, modalHeader: 'bg-blue-50/50 border-blue-100' };
        case 'OFFICIAL':
            return { label: 'Văn bản', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-100', icon: <FileBadge size={18} className="text-rose-600"/>, modalHeader: 'bg-rose-50/50 border-rose-100' };
        default:
            return { label: 'Thông báo', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', icon: <Megaphone size={18} className="text-orange-500"/>, modalHeader: 'bg-orange-50/50 border-orange-100' };
    }
}

// Helper File Type
const getPreviewType = (fileName: string) => {
    if (!fileName) return 'unknown';
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext || '')) return 'image';
    if (ext === 'pdf') return 'pdf';
    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext || '')) return 'office';
    return 'other';
}

const DetailModal = ({ item, onClose }: { item: any, onClose: () => void }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    
    if (!item) return null;

    // --- XỬ LÝ URL CHUẨN ---
    // Lưu ý: Phải cấu hình biến môi trường NEXT_PUBLIC_API_URL trên Production
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    // Lấy domain gốc (VD: https://api.techgen.umt.edu.vn) bằng cách bỏ đuôi /api
    const DOMAIN = API_BASE.replace(/\/api\/?$/, ""); 
    // Đường dẫn file (Backend serve tại /uploads)
    const fileUrl = `${DOMAIN}${item.filePath}`; 

    const previewType = getPreviewType(item.fileName);
    const canPreview = previewType !== 'other' && previewType !== 'unknown';
    
    // Check localhost để ẩn Preview Office (vì Google Docs không đọc được localhost)
    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    const showOfficePreview = previewType === 'office' && !isLocalhost;

    const googleDocsViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;

    const handleDownload = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDownloading(true);
        try {
            const response = await fetch(fileUrl, { mode: 'cors' });
            if (!response.ok) throw new Error("Network response was not ok");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = item.fileName || "document";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download fallback:", error);
            // Fallback: Mở tab mới nếu fetch thất bại (thường do CORS chặn hoặc URL sai)
            window.open(fileUrl, '_blank');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                
                {/* HEADER */}
                <div className={`p-6 border-b flex justify-between items-start gap-4 ${getTypeConfig(item.type).modalHeader}`}>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getTypeConfig(item.type).bg} ${getTypeConfig(item.type).color} ${getTypeConfig(item.type).border}`}>
                                {getTypeConfig(item.type).label}
                            </span>
                            <span className="text-slate-500 text-sm flex items-center gap-1">
                                <Calendar size={14}/> {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{item.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100 transition"><X size={20}/></button>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white custom-scrollbar">
                    
                    {item.filePath && (
                        <div className="mb-8">
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-4 items-center justify-between group hover:border-blue-300 transition-colors shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2 max-w-[200px] md:max-w-md truncate" title={item.fileName}>
                                            {item.fileName || "Tài liệu đính kèm"}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium mt-0.5">Văn bản chính thức từ BTC</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    {/* Nút Xem trước: Chỉ hiện nếu hỗ trợ và (nếu là office thì phải ko phải localhost) */}
                                    {canPreview && (previewType !== 'office' || showOfficePreview) && (
                                        <button 
                                            onClick={() => setShowPreview(!showPreview)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition border ${showPreview ? 'bg-slate-200 text-slate-800 border-slate-300' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                                        >
                                            {showPreview ? <EyeOff size={16}/> : <Eye size={16}/>}
                                            <span className="hidden sm:inline">{showPreview ? 'Đóng' : 'Xem trước'}</span>
                                        </button>
                                    )}
                                    
                                    <button 
                                        onClick={handleDownload}
                                        disabled={isDownloading}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 font-bold text-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    >
                                        {isDownloading ? <Loader2 size={16} className="animate-spin"/> : <Download size={16} />} 
                                        <span className="hidden sm:inline">{isDownloading ? 'Đang tải...' : 'Tải về'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* PREVIEW BOX */}
                            {showPreview && (
                                <div className="mt-4 border rounded-xl overflow-hidden shadow-inner bg-slate-100 h-[500px] md:h-[600px] animate-in slide-in-from-top-2 relative">
                                    {previewType === 'pdf' ? (
                                        <iframe src={fileUrl} className="w-full h-full" title="PDF Preview"></iframe>
                                    ) : previewType === 'image' ? (
                                        <div className="w-full h-full flex items-center justify-center overflow-auto p-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={fileUrl} alt="Preview" className="max-w-full max-h-full object-contain shadow-lg" />
                                        </div>
                                    ) : (showOfficePreview) ? (
                                        <iframe src={googleDocsViewerUrl} className="w-full h-full" title="Office Preview"></iframe>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 flex-col gap-2">
                                            <ExternalLink size={32} className="opacity-50"/>
                                            <p>Vui lòng tải về để xem nội dung.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AnnouncementsPage() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    async function fetch() {
        const res = await getAnnouncements();
        if (Array.isArray(res)) setData(res);
    }
    fetch();
  }, []);

  const filteredData = data.filter(item => filter === "ALL" || item.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 pt-28 pb-20 relative overflow-hidden">
        {/* Banner decorations... */}
        <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="text-blue-300 font-bold tracking-wider uppercase text-sm mb-3 block animate-fade-in-up">News Center</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-up delay-100">Thông báo & Kết quả</h1>
            <p className="text-blue-100/80 max-w-2xl mx-auto text-lg animate-fade-in-up delay-200">Cập nhật tin tức mới nhất về cuộc thi.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20 max-w-5xl">
        {/* Filter Bar */}
        <div className="bg-white p-1.5 rounded-xl shadow-lg shadow-blue-900/5 border border-slate-200 flex flex-wrap gap-1 mb-10 justify-center w-fit mx-auto">
            <button onClick={() => setFilter("ALL")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'ALL' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>Tất cả</button>
            <button onClick={() => setFilter("RESULT")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'RESULT' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}><ListChecks size={16}/> Kết quả</button>
            <button onClick={() => setFilter("NEWS")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'NEWS' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}><Megaphone size={16}/> Tin tức</button>
            <button onClick={() => setFilter("OFFICIAL")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'OFFICIAL' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}><FileBadge size={16}/> Văn bản</button>
        </div>

        {/* Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {filteredData.map((item) => {
                const config = getTypeConfig(item.type);
                return (
                    <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:static transition-transform group-hover:scale-110 duration-300">
                            {config.icon}
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-auto md:ml-0 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group-card" onClick={() => setSelectedItem(item)}>
                            <div className="flex justify-between items-start mb-3">
                                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${config.bg} ${config.color} ${config.border}`}>
                                    {config.label}
                                </span>
                                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">{new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{item.summary}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex items-center text-blue-600 text-sm font-bold group/btn">Xem chi tiết <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform"/></div>
                                {item.filePath && <div className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded"><Paperclip size={12} /> File đính kèm</div>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        {filteredData.length === 0 && (
            <div className="text-center py-20 text-slate-400"><Search size={48} className="mx-auto mb-4 opacity-50"/><p>Chưa có thông báo nào.</p></div>
        )}
      </div>
    </div>
  );
}