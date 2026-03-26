'use server'

// 1. Sửa dòng này
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function submitContact(formData: FormData) {
    const name = formData.get('fullName') || formData.get('name'); 
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    if (!name || !email || !message) {
        return { success: false, message: "Vui lòng điền đủ thông tin." };
    }

    try {
        const res = await fetch(`${API_URL}/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: name.toString(), 
                email: email.toString(), 
                phone: phone ? phone.toString() : "", 
                message: message.toString() 
            }),
        });

        if (!res.ok) return { success: false, message: "Gửi thất bại." };
        return { success: true, message: "Gửi liên hệ thành công!" };
    } catch (error) {
        return { success: false, message: "Lỗi kết nối server." };
    }
}

// ... (Giữ nguyên các hàm getContacts, deleteContact, updateContact cũ của bạn)
// Đảm bảo hàm getContacts, deleteContact, updateContact vẫn y hệt như bản bạn gửi trước đó để Admin chạy ngon.
export async function getContacts({ page = 1, limit = 10, status = 'ALL', search = '' }: any = {}) {
    try {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            status: status !== 'ALL' ? status : '',
            search: search
        });
        const res = await fetch(`${API_URL}/contacts?${queryParams.toString()}`, { cache: 'no-store' });
        if (!res.ok) return { contacts: [], totalPages: 0, totalItems: 0 };
        return await res.json();
    } catch (e) {
        return { contacts: [], totalPages: 0, totalItems: 0 };
    }
}

export async function deleteContact(id: string) {
    try {
        const res = await fetch(`${API_URL}/contacts/${id}`, { method: 'DELETE' });
        return { success: res.ok };
    } catch (error) { return { success: false }; }
}

export async function updateContact(id: string, data: any) {
    try {
        const res = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return { success: res.ok };
    } catch (error) { return { success: false }; }
}