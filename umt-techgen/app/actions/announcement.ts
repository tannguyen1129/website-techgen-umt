'use server'

import { revalidatePath } from "next/cache";

// Sử dụng biến môi trường, fallback về localhost nếu thiếu
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// 1. Lấy danh sách
export async function getAnnouncements() {
  try {
    const res = await fetch(`${API_BASE}/announcements`, { 
        cache: 'no-store',
        next: { tags: ['announcements'] } 
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// 2. Tạo thông báo mới (Đã sửa để nhận FormData)
export async function createAnnouncement(formData: FormData) {
  try {
    const res = await fetch(`${API_BASE}/announcements`, {
      method: 'POST',
      // KHÔNG set Content-Type: application/json ở đây vì ta gửi FormData
      body: formData,
      // @ts-ignore
      duplex: 'half', // Bắt buộc cho Next.js khi upload file
    });
    
    if (!res.ok) {
        const err = await res.json();
        return { success: false, message: err.message || "Lỗi tạo bài viết" };
    }
    
    revalidatePath('/admin/announcements'); // Làm mới dữ liệu
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Lỗi kết nối Server" };
  }
}

// 3. Cập nhật thông báo (Đã sửa để nhận FormData)
export async function updateAnnouncement(id: number, formData: FormData) {
  try {
    const res = await fetch(`${API_BASE}/announcements/${id}`, {
      method: 'PUT',
      // KHÔNG set Content-Type: application/json
      body: formData,
      // @ts-ignore
      duplex: 'half',
    });

    if (!res.ok) return { success: false, message: "Lỗi cập nhật" };
    
    revalidatePath('/admin/announcements');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Lỗi kết nối server" };
  }
}

// 4. Xóa thông báo
export async function deleteAnnouncement(id: number) {
  try {
    await fetch(`${API_BASE}/announcements/${id}`, { method: 'DELETE' });
    revalidatePath('/admin/announcements');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}