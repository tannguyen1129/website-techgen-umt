"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  MapPin,
  Video,
  Monitor,
  Star,
  Award,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Filter,
} from "lucide-react";

// -------------------- Types --------------------
type PhaseColor = "blue" | "purple" | "orange";
type TimelineType = "Online" | "Training" | "Final" | "Event" | "Support";

type DateRangeISO = { start: string; end: string };

interface TimelineItem {
  dateLabel: string;
  dateOld?: string;
  dateNew?: string;
  dateRange?: DateRangeISO;
  title: string;
  type: TimelineType;
  location: string;
  desc: string;
  highlight?: boolean;
  isCancelled?: boolean;
  isBackup?: boolean;
  icon?: React.ReactElement;
}

interface TimelinePhase {
  id: number;
  phase: string;
  desc?: string;
  color: PhaseColor;
  items: TimelineItem[];
}

// -------------------- Theme Configuration --------------------
const PHASE_THEME: Record<
  PhaseColor,
  {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
    line: string;
  }
> = {
  blue: {
    bg: "bg-blue-50/50",
    border: "border-blue-200",
    text: "text-blue-700",
    iconBg: "bg-blue-100 text-blue-600",
    line: "bg-blue-200",
  },
  purple: {
    bg: "bg-purple-50/50",
    border: "border-purple-200",
    text: "text-purple-700",
    iconBg: "bg-purple-100 text-purple-600",
    line: "bg-purple-200",
  },
  orange: {
    bg: "bg-orange-50/50",
    border: "border-orange-200",
    text: "text-orange-700",
    iconBg: "bg-orange-100 text-orange-600",
    line: "bg-orange-200",
  },
};

const TYPE_COLORS: Record<TimelineType, string> = {
  Online: "text-blue-600 bg-blue-50 border-blue-100",
  Training: "text-purple-600 bg-purple-50 border-purple-100",
  Support: "text-emerald-600 bg-emerald-50 border-emerald-100",
  Final: "text-amber-700 bg-amber-50 border-amber-100",
  Event: "text-rose-600 bg-rose-50 border-rose-100",
};

// -------------------- Helpers --------------------
function parseISO(input?: string) {
  if (!input) return null;
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

function inRange(now: Date, r?: DateRangeISO) {
  if (!r) return false;
  const s = parseISO(r.start);
  const e = parseISO(r.end);
  if (!s || !e) return false;
  return now >= s && now <= e;
}

function ended(now: Date, r?: DateRangeISO) {
  if (!r) return false;
  const e = parseISO(r.end);
  if (!e) return false;
  return now > e;
}

function LocationIcon({ location }: { location: string }) {
  const l = location.toLowerCase();
  if (l.includes("teams") || l.includes("zoom") || l.includes("meet")) {
    return <Video size={14} className="mr-1.5" />;
  }
  if (l.includes("umtoj") || l.includes("online") || l.includes("hệ thống")) {
    return <Monitor size={14} className="mr-1.5" />;
  }
  return <MapPin size={14} className="mr-1.5" />;
}

// -------------------- Main Component --------------------
export default function TimelineRedesigned() {
  const now = useMemo(() => new Date(), []);

  // --- DATA ---
  const phases: TimelinePhase[] = [
    {
      id: 1,
      phase: "VÒNG SƠ LOẠI",
      desc: "Khởi động hành trình & tích lũy điểm số",
      color: "blue",
      items: [
        {
          dateLabel: "01/12 - 06/12/2025",
          dateRange: { start: "2025-12-01", end: "2025-12-06T23:59:59" },
          title: "Vòng Sơ loại 1",
          type: "Online",
          location: "Hệ thống trắc nghiệm / UMTOJ",
          desc: "Thí sinh làm bài thi trắc nghiệm và lập trình cơ bản trực tuyến.",
          icon: <Star />,
        },
        {
          dateLabel: "28/12/2025",
          dateOld: "15/12 - 24/12/2025",
          dateNew: "14:00 - 16:00, 28/12/2025",
          dateRange: { start: "2025-12-28T14:00:00", end: "2025-12-28T16:00:00" },
          title: "Vòng Sơ loại 1A",
          type: "Online",
          location: "Hệ thống UMTOJ",
          desc: "Cơ hội bổ sung để thí sinh tích lũy điểm số quan trọng.",
          icon: <CheckCircle2 />,
        },
        {
          dateLabel: "25/12 - 30/12/2025",
          title: "Vòng Sơ loại 3",
          type: "Online",
          location: "Hệ thống UMTOJ",
          desc: "Đợt sơ loại (đóng/không áp dụng theo lịch cập nhật).",
          isCancelled: true,
          icon: <Star />,
        },
        {
          dateLabel: "14:00 - 16:00, 24/01/2026",
          dateRange: { start: "2026-01-24T14:00:00", end: "2026-01-24T16:00:00" },
          title: "Vòng Sơ loại 2",
          type: "Online",
          location: "Hệ thống UMTOJ",
          desc: "Vòng loại quan trọng trước khi bước vào giai đoạn chính thức.",
          highlight: true,
          icon: <CheckCircle2 />,
        },
        {
          dateLabel: "31/01 - 04/02/2026",
          title: "Vòng Sơ loại Dự phòng",
          type: "Support",
          location: "Hệ thống UMTOJ",
          desc: "Dành cho thí sinh gặp sự cố kỹ thuật hoặc cần hỗ trợ đặc biệt.",
          isBackup: true,
          icon: <ShieldAlert />,
        },
      ],
    },
    {
      id: 2,
      phase: "TRAINING & THI ĐẤU",
      desc: "Nâng kỹ năng & thử thách chuyên sâu",
      color: "purple",
      items: [
        {
          dateLabel: "01/02 - 06/02/2026",
          dateRange: { start: "2026-02-01", end: "2026-02-06T23:59:59" },
          title: "Training Đợt 1",
          type: "Training",
          location: "Microsoft Teams",
          desc: "Ôn tập kiến thức nền tảng Toán - Tin cùng đội ngũ Mentor.",
          icon: <Sparkles />,
        },
        {
          dateLabel: "26/01 - 07/02/2026",
          dateRange: { start: "2026-01-26", end: "2026-02-07T23:59:59" },
          title: "Vòng thi Chính thức 1",
          type: "Online",
          location: "Hệ thống UMTOJ",
          desc: "Bài thi nâng cao – sàng lọc các thí sinh mạnh nhất.",
          highlight: true,
          icon: <Star />,
        },
        {
          dateLabel: "02/02 - 01/03/2026",
          dateRange: { start: "2026-02-02", end: "2026-03-01T23:59:59" },
          title: "Training Đợt 2",
          type: "Training",
          location: "Microsoft Teams",
          desc: "Chuyên đề nâng cao: cấu trúc dữ liệu và giải thuật trọng tâm.",
          icon: <Sparkles />,
        },
        {
          dateLabel: "02/03 - 08/03/2026",
          dateRange: { start: "2026-03-02", end: "2026-03-08T23:59:59" },
          title: "Vòng thi Chính thức 2",
          type: "Online",
          location: "Hệ thống UMTOJ",
          desc: "Chặng quyết định để chọn ra Top thí sinh vào Chung kết.",
          highlight: true,
          icon: <CheckCircle2 />,
        },
      ],
    },
    {
      id: 3,
      phase: "VỀ ĐÍCH",
      desc: "Tỏa sáng tại đấu trường đỉnh cao",
      color: "orange",
      items: [
        {
          dateLabel: "09/03 - 05/04/2026",
          dateRange: { start: "2026-03-09", end: "2026-04-05T23:59:59" },
          title: "Training Đợt 3",
          type: "Training",
          location: "Microsoft Teams",
          desc: "Huấn luyện kỹ năng thực chiến và tâm lý thi đấu.",
          icon: <Sparkles />,
        },
        {
          dateLabel: "06/04 - 12/04/2026",
          dateRange: { start: "2026-04-06", end: "2026-04-12T23:59:59" },
          title: "Vòng Chung kết TechGen",
          type: "Final",
          location: "Trực tuyến / Tập trung",
          desc: "Cuộc đối đầu giữa các tài năng xuất sắc nhất toàn quốc.",
          highlight: true,
          icon: <Star />,
        },
        {
          dateLabel: "Đầu tháng 05/2026",
          dateRange: { start: "2026-05-01", end: "2026-05-10T23:59:59" },
          title: "Lễ Tổng kết & Trao giải",
          type: "Event",
          location: "Hội trường Sáng tạo, UMT",
          desc: "Vinh danh Quán quân và trao các suất học bổng giá trị.",
          highlight: true,
          icon: <Award />,
        },
      ],
    },
  ];

  // --- LOGIC ---
  const [typeFilter, setTypeFilter] = useState<TimelineType | "All">("All");
  const [onlyHighlights, setOnlyHighlights] = useState(false);

  const filteredPhases = useMemo(() => {
    return phases.map((p) => ({
      ...p,
      items: p.items.filter((it) => {
        if (onlyHighlights && !it.highlight) return false;
        if (typeFilter !== "All" && it.type !== typeFilter) return false;
        return true;
      }),
    }));
  }, [phases, onlyHighlights, typeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">
      {/* HEADER - ĐÃ SỬA MÀU NỀN VÀ MÀU CHỮ */}
      <header className="bg-blue-900 py-12 px-4 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Đổi màu tiêu đề thành trắng */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Hành trình chinh phục công nghệ
          </h1>
          {/* Đổi màu mô tả thành trắng mờ */}
          <p className="text-lg text-blue-100 max-w-5xl mx-auto">
            Theo dõi các mốc thời gian quan trọng, lịch training và các vòng thi đấu để chuẩn bị tốt nhất.
          </p>

          {/* Simple Stats - ĐÃ SỬA MÀU CHO DỄ ĐỌC TRÊN NỀN TỐI */}
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-white">12</span> {/* Đổi màu số */}
              <span className="text-blue-200 font-medium">Sự kiện</span> {/* Đổi màu nhãn */}
            </div>
            <div className="w-px h-10 bg-blue-800"></div> {/* Đổi màu đường kẻ */}
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-white">03</span>
              <span className="text-blue-200 font-medium">Giai đoạn</span>
            </div>
            <div className="w-px h-10 bg-blue-800"></div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-white">03</span>
              <span className="text-blue-200 font-medium">Đợt Train</span>
            </div>
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <Filter size={16} />
            <span className="hidden sm:inline">Bộ lọc hiển thị</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 no-scrollbar overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setTypeFilter("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                typeFilter === "All"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tất cả
            </button>
            {(["Online", "Training", "Support", "Final", "Event"] as TimelineType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                  typeFilter === t
                    ? "bg-white border-slate-900 text-slate-900 shadow-sm"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
            <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>
            <button
              onClick={() => setOnlyHighlights((v) => !v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                onlyHighlights
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              ★ Quan trọng
            </button>
          </div>
        </div>
      </div>

      {/* TIMELINE CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="space-y-20">
          {filteredPhases.map((phase) => {
            const theme = PHASE_THEME[phase.color];

            // Render Phase
            return (
              <section key={phase.id} className="relative">
                {/* Phase Header */}
                <div className="flex items-start gap-4 mb-10 md:mb-12">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shadow-sm ${theme.bg} ${theme.text}`}
                  >
                    0{phase.id}
                  </div>
                  <div className="pt-1">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                      {phase.phase}
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">{phase.desc}</p>
                  </div>
                </div>

                {/* Items Container */}
                <div className="relative pl-6 md:pl-0">
                  {/* Vertical Line (Desktop Left Aligned with content) */}
                  <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-200 hidden md:block md:left-[180px]"></div>
                  
                  {/* Mobile Line */}
                  <div className="absolute left-2 top-2 bottom-0 w-px bg-slate-200 border-l border-dashed border-slate-300 md:hidden"></div>

                  <div className="space-y-8">
                    {phase.items.map((item, idx) => {
                      const isFinished = ended(now, item.dateRange);
                      const isRunning = inRange(now, item.dateRange) && !item.isCancelled;
                      const isCancelled = item.isCancelled;

                      return (
                        <div
                          key={idx}
                          className={`relative grid md:grid-cols-[180px_1fr] gap-4 md:gap-10 group ${
                            isCancelled ? "opacity-60 grayscale" : ""
                          }`}
                        >
                          {/* Dot / Connector */}
                          <div
                            className={`absolute left-[-20px] md:left-[174px] top-5 md:top-6 w-3 h-3 rounded-full border-2 bg-white z-10 transition-all duration-300
                              ${
                                isRunning
                                  ? "border-rose-500 scale-125 shadow-[0_0_0_4px_rgba(244,63,94,0.2)]"
                                  : isFinished
                                  ? "border-slate-400 bg-slate-200"
                                  : "border-slate-300 group-hover:border-blue-500 group-hover:scale-110"
                              }
                            `}
                          ></div>

                          {/* LEFT COLUMN: Date (Desktop) */}
                          <div className="hidden md:flex flex-col items-end text-right pt-4 pr-6">
                            {item.dateOld && (
                              <span className="text-xs text-slate-400 line-through decoration-slate-400/50 mb-0.5">
                                {item.dateOld}
                              </span>
                            )}
                            <span
                              className={`font-bold text-sm ${
                                isRunning ? "text-rose-600" : "text-slate-700"
                              }`}
                            >
                              {item.dateNew ?? item.dateLabel}
                            </span>
                            <span className="text-xs text-slate-400 font-medium mt-1">
                              {item.dateNew || item.dateLabel.includes(",")
                                ? "Cố định"
                                : "Theo kế hoạch"}
                            </span>
                          </div>

                          {/* RIGHT COLUMN: Card/Content */}
                          <div className="pl-4 md:pl-0">
                             {/* Mobile Date */}
                             <div className="md:hidden flex flex-wrap items-center gap-2 mb-2">
                                {item.dateOld && (
                                  <span className="text-xs text-slate-400 line-through">
                                    {item.dateOld}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-md px-2 py-1 shadow-sm">
                                  <Calendar size={12} />
                                  {item.dateNew ?? item.dateLabel}
                                </span>
                             </div>

                            <div
                              className={`
                                relative p-5 rounded-2xl border transition-all duration-200 bg-white
                                ${
                                  item.highlight && !isCancelled
                                    ? "border-amber-200 shadow-lg shadow-amber-100/50 ring-1 ring-amber-100"
                                    : "border-slate-200 hover:border-blue-200 hover:shadow-md"
                                }
                                ${isRunning ? "ring-1 ring-rose-200 border-rose-200" : ""}
                                ${isCancelled ? "bg-slate-50 border-slate-200 border-dashed" : ""}
                              `}
                            >
                              {/* Content Header */}
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                      isCancelled
                                        ? "bg-slate-100 text-slate-400"
                                        : item.highlight
                                        ? "bg-amber-100 text-amber-600"
                                        : theme.iconBg
                                    }`}
                                  >
                                    {React.cloneElement(item.icon as React.ReactElement, { size: 16 } as any)}
                                  </div>
                                  <div>
                                    <h3 className={`font-bold text-lg leading-tight ${isCancelled ? "text-slate-500 line-through" : "text-slate-900"}`}>
                                      {item.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                      <span
                                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${
                                          TYPE_COLORS[item.type]
                                        }`}
                                      >
                                        {item.type}
                                      </span>
                                      
                                      {isRunning && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded animate-pulse">
                                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                          ĐANG DIỄN RA
                                        </span>
                                      )}

                                      {isFinished && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                          <CheckCircle2 size={10} /> ĐÃ XONG
                                        </span>
                                      )}
                                      
                                      {item.isBackup && (
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                                          DỰ PHÒNG
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                {item.desc}
                              </p>

                              {/* Footer (Location) */}
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-3">
                                <LocationIcon location={item.location} />
                                <span className="truncate max-w-[200px] sm:max-w-none">{item.location}</span>
                                {item.highlight && !isCancelled && (
                                  <div className="ml-auto flex items-center text-amber-600">
                                    <Star size={12} className="mr-1 fill-amber-600" />
                                    Quan trọng
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {phase.items.length === 0 && (
                      <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-slate-500 font-medium text-sm">Không tìm thấy hoạt động nào.</p>
                        <button 
                          onClick={() => {setTypeFilter("All"); setOnlyHighlights(false);}}
                          className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                        >
                          Xóa bộ lọc
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
        
        {/* Footer Note */}
        <div className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
           Thời gian có thể thay đổi tùy thuộc vào tình hình thực tế. BTC sẽ thông báo qua Email và Teams.
        </div>
      </main>
    </div>
  );
}