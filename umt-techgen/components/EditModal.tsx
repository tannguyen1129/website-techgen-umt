import { useState } from "react";
import { X, Pencil, Loader2 } from "lucide-react";

// Thêm từ khóa 'export' vào trước const
export const EditModal = ({ candidate, onClose, onSave }: any) => {
    const [formData, setFormData] = useState({ ...candidate });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSaving(true);
        await onSave(candidate.id, formData);
        setIsSaving(false);
    };

    if (!candidate) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Pencil size={18} className="text-blue-600"/> Cập nhật thông tin thí sinh</h3>
                    <button onClick={onClose}><X size={24} className="text-slate-400 hover:text-slate-600"/></button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nhóm Thông tin Cá nhân */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-700 border-b pb-2 text-sm uppercase">Cá nhân</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Họ và tên</label>
                                    <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Ngày sinh (YYYY-MM-DD)</label>
                                        <input type="date" name="dob" value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Giới tính</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm">
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">CCCD</label>
                                        <input required name="cccd" value={formData.cccd} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Điện thoại</label>
                                        <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Nhóm Trường & Dự thi */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-700 border-b pb-2 text-sm uppercase">Trường & Dự thi</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Trường THPT</label>
                                    <input required name="school" value={formData.school} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Tỉnh/Thành phố</label>
                                        <input required name="province" value={formData.province} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Mã Học sinh</label>
                                        <input name="studentId" value={formData.studentId || ''} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" placeholder="Không bắt buộc" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Khối lớp</label>
                                        <select name="grade" value={formData.grade} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm">
                                            <option value="10">Khối 10</option>
                                            <option value="11">Khối 11</option>
                                            <option value="12">Khối 12</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Tên Lớp</label>
                                        <input required name="className" value={formData.className} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Bảng thi</label>
                                    <select name="table" value={formData.table} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm">
                                        <option value="A">Bảng A (Chuyên)</option>
                                        <option value="B">Bảng B (Không chuyên)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Thành tích</label>
                                    <textarea name="achievements" value={formData.achievements || ''} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm h-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Hủy</button>
                        <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-600/20 flex items-center gap-2">
                            {isSaving ? <Loader2 size={16} className="animate-spin"/> : <Pencil size={16}/>} Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};