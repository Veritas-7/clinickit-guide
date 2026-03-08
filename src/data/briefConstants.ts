// Brief storage constants
export const BRIEF_STORAGE_KEY = "clientBrief";
export const BRIEF_SCHEMA_VERSION = "1.0";

export type BriefData = Record<string, string | string[]>;

export interface StoredBrief {
  version: string;
  updatedAt: string;
  data: BriefData;
}

/** Normalize brief data: trim strings, filter empty arrays */
export function normalizeBriefData(data: BriefData): BriefData {
  const result: BriefData = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      const cleaned = value.filter(v => typeof v === "string" && v.trim() !== "");
      if (cleaned.length > 0) result[key] = cleaned;
    } else if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed !== "") result[key] = trimmed;
    }
  }
  return result;
}

/** Load brief from localStorage with schema check */
export function loadBrief(): BriefData {
  try {
    const stored = localStorage.getItem(BRIEF_STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored) as StoredBrief;
    if (parsed.version === BRIEF_SCHEMA_VERSION) {
      return parsed.data || {};
    }
    // Old format fallback
    return (parsed as any).data || parsed as unknown as BriefData;
  } catch {
    return {};
  }
}

/** Save brief to localStorage */
export function saveBrief(data: BriefData): StoredBrief {
  const stored: StoredBrief = {
    version: BRIEF_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    data: normalizeBriefData(data),
  };
  localStorage.setItem(BRIEF_STORAGE_KEY, JSON.stringify(stored));
  return stored;
}

/** Infer site type from brief */
export function inferSiteType(data: BriefData): { type: string; reasons: string[] } {
  const instType = (data.institutionType as string) || "";
  const depts = (data.departments as string[]) || [];
  const doctors = parseInt((data.doctorCount as string) || "1");
  const booking = (data.bookingMethod as string[]) || [];
  const hasOnline = booking.some(b => b.includes("온라인") || b.includes("네이버") || b.includes("카카오"));
  const reasons: string[] = [];

  if (instType === "검진센터") { reasons.push("기관 유형: 검진센터"); return { type: "검진센터형", reasons }; }
  if (doctors >= 3 && depts.length >= 3) { reasons.push(`의료진 ${doctors}명`, `진료과 ${depts.length}개`); return { type: "정보 제공형", reasons }; }
  if (doctors >= 2) { reasons.push(`전문의 ${doctors}명`); return { type: "전문의 신뢰형", reasons }; }
  if (hasOnline) { reasons.push("온라인 예약 가능"); return { type: "예약 유도형", reasons }; }
  reasons.push("단일/소규모 의원, 지역 밀착");
  return { type: "지역 의원형", reasons };
}

export function hasOnlineBooking(data: BriefData): boolean {
  const booking = (data.bookingMethod as string[]) || [];
  return booking.some(b => b.includes("온라인") || b.includes("네이버") || b.includes("카카오"));
}
