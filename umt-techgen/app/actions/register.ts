'use server'

// Địa chỉ gốc của API Backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// 1. Đăng ký thí sinh
export async function registerCandidate(formData: FormData) {
  try {
    // --- ĐOẠN CODE DEBUG QUAN TRỌNG ---
    const file = formData.get('studentCardFile') as File;
    console.log("------------------------------------------------");
    console.log("Server Action nhận được request đăng ký:");
    console.log("- Tên thí sinh:", formData.get('fullName'));
    
    if (file && file.size > 0) {
        console.log("- Ảnh thẻ:", file.name, "| Kích thước:", file.size, "bytes", "| Type:", file.type);
    } else {
        console.error("!!! CẢNH BÁO: Không tìm thấy file ảnh hoặc file rỗng !!!");
    }
    console.log("------------------------------------------------");
    // ----------------------------------

    // PHẢI THÊM /candidates VÀO SAU API_BASE
    const res = await fetch(`${API_BASE}/candidates`, { 
      method: 'POST',
      body: formData,
      // @ts-ignore
      duplex: 'half', // Bắt buộc để gửi file
    });

    const result = await res.json();

    if (!res.ok) {
        console.error("Backend trả về lỗi:", result); // Log lỗi từ backend trả về
        return { success: false, message: result.message || result.error || "Lỗi đăng ký" };
    }

    return { success: true, message: "Đăng ký thành công!" };
  } catch (error) {
    console.error("Lỗi gọi Backend:", error);
    return { success: false, message: "Lỗi kết nối server" };
  }
}

// 2. Lấy danh sách thí sinh (Thêm tham số status)
export async function getCandidates({ 
  page = 1, 
  limit = 10, 
  table = "ALL", 
  status = "ALL",
  fromDate = "",  // <-- Thêm
  toDate = ""     // <-- Thêm
}: any) {
  try {
    // Xây dựng URL query string
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      table,
      status,
    });

    // Chỉ push vào nếu có dữ liệu
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    const res = await fetch(`${API_BASE}/candidates?${params.toString()}`, { 
      cache: 'no-store' 
    });

    if (!res.ok) return { candidates: [], totalPages: 0, totalItems: 0 };
    return await res.json();
  } catch (error) {
    console.error(error);
    return { candidates: [], totalPages: 0, totalItems: 0 };
  }
}

// 3. Cập nhật trạng thái (Thêm tham số note)
export async function updateStatus(id: string, status: string, note: string = "") {
  try {
    await fetch(`${API_BASE}/candidates/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note }) // Gửi cả note lên
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// 4. Xóa thí sinh
export async function deleteCandidate(id: string) {
  try {
    // Gọi method DELETE
    const res = await fetch(`${API_BASE}/candidates/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
        // Có thể đọc lỗi từ server nếu cần
        return { success: false, message: "Không thể xóa hồ sơ" };
    }
    
    return { success: true, message: "Xóa thành công" };
  } catch (error) {
    console.error("Lỗi xóa thí sinh:", error);
    return { success: false, message: "Lỗi kết nối server" };
  }
}

// 5. Lấy dữ liệu thống kê Dashboard
export async function getDashboardStats() {
  try {
    // Gọi vào route /candidates/statistics mà ta vừa tạo ở Backend
    const res = await fetch(`${API_BASE}/candidates/statistics`, { 
        cache: 'no-store', // Không cache để số liệu luôn mới
        next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        console.error("Lỗi API Stats:", res.status, res.statusText);
        return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi kết nối lấy thống kê:", error);
    return null;
  }
}

// 6. Cập nhật riêng ghi chú (Không đổi trạng thái)
export async function updateNoteOnly(id: string, note: string) {
  try {
    // Tận dụng API updateStatus nhưng giữ nguyên status cũ hoặc gửi 1 flag riêng
    // Tuy nhiên, cách tốt nhất là Backend nên hỗ trợ PATCH note.
    // Nếu Backend chưa có, ta dùng lại updateStatus với logic: gửi kèm status hiện tại
    // Nhưng ở đây để đơn giản, mình giả định dùng chung endpoint updateStatus
    // Bạn cần đảm bảo Backend không reset status nếu status gửi lên là null/undefined hoặc giữ nguyên.
    
    // Cách an toàn nhất với code backend hiện tại:
    // Gọi API updateStatus với status="CURRENT_STATUS" (Cần xử lý ở UI để truyền status cũ vào)
    // HOẶC: Tạo 1 server action gọi fetch PUT
    
    await fetch(`${API_BASE}/candidates/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }) // Chỉ gửi note, Backend cần xử lý nếu thiếu status thì giữ nguyên
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// 7. Cập nhật thông tin thí sinh (Edit Info)
export async function updateCandidateInfo(id: string, data: any) {
  try {
    const res = await fetch(`${API_BASE}/candidates/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
        return { success: false, message: "Lỗi cập nhật server" };
    }
    return { success: true, message: "Cập nhật thành công!" };
  } catch (error) {
    console.error("Lỗi update info:", error);
    return { success: false, message: "Lỗi kết nối" };
  }
}

export async function sendEmailNotification(id: string, message: string) {
    const API_URL = process.env.SERVER_API_URL || "http://10.11.10.21:4000/api";
    try {
        const res = await fetch(`${API_URL}/candidates/${id}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        if (!res.ok) return { success: false, message: "Lỗi gửi mail" };
        return await res.json();
    } catch (error) {
        return { success: false, message: "Lỗi kết nối" };
    }
}