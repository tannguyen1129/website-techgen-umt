'use server'

import { cookies } from 'next/headers';

// 1. Ưu tiên lấy từ biến môi trường, nếu không có thì mới dùng IP cứng (Fallback)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Hàm loginAdmin
export async function loginAdmin(formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            const error = await res.json();
            return { success: false, message: error.message || 'Sai tài khoản hoặc mật khẩu' };
        }

        // Backend trả về: { access_token: "...", role: "ADMIN" hoặc "VIEWER" }
        const data = await res.json();
        
        const cookieStore = await cookies(); 
        
        // 2. Lưu Token (Quan trọng: httpOnly = true để bảo mật)
        cookieStore.set('admin_token', data.access_token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400, // 1 ngày
            path: '/',
        });

        // 3. Lưu Role (httpOnly = false để Client/Server đều đọc được dễ dàng cho việc ẩn hiện UI)
        // Mặc định là 'VIEWER' nếu backend không trả về role
        cookieStore.set('user_role', data.role || 'VIEWER', { 
            httpOnly: false, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400, 
            path: '/',
        });

        return { success: true };
    } catch (e) {
        console.error("Lỗi đăng nhập:", e);
        return { success: false, message: 'Lỗi kết nối đến máy chủ' };
    }
}

// Hàm logoutAdmin
export async function logoutAdmin() {
    const cookieStore = await cookies();
    // Xóa cả Token và Role
    cookieStore.delete('admin_token');
    cookieStore.delete('user_role');
}

// 4. Hàm helper mới: Lấy Role hiện tại
export async function getCurrentRole() {
    const cookieStore = await cookies();
    const role = cookieStore.get('user_role')?.value;
    return role || 'VIEWER'; // Mặc định an toàn là VIEWER
}