import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Kiểm tra xem user có đang cố vào trang admin không
  if (request.nextUrl.pathname.startsWith("/admin")) {
    
    // Ngoại lệ: Cho phép vào trang login mà không cần check
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // 2. Kiểm tra cookie 'admin_token'
    const token = request.cookies.get("admin_token");

    // 3. Nếu không có token -> Đá về trang login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// Cấu hình matcher để middleware chỉ chạy trên route /admin
export const config = {
  matcher: "/admin/:path*",
};