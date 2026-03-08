// 구현 규칙 데이터 - 조건별 템플릿 선택, CTA 분기, 레이아웃 분기 등

export interface ConditionRule {
  condition: string;
  result: string;
  category: string;
}

// ── 사이트 유형 판별 ──
export const siteTypeRules: ConditionRule[] = [
  { condition: "단일 진료과, 의원급, 지역 밀착", result: "지역 의원형 — 위치/전화 CTA 최우선", category: "사이트 유형" },
  { condition: "2인 이상 전문의, 전문 진료 강조", result: "전문의 신뢰형 — 의료진 섹션 상단 배치", category: "사이트 유형" },
  { condition: "건강검진 프로그램 다수", result: "검진센터형 — 프로그램 비교 + 예약 CTA", category: "사이트 유형" },
  { condition: "온라인 예약 가능, 다수 문의", result: "예약 유도형 — 예약 CTA 전면 배치", category: "사이트 유형" },
  { condition: "진료과 다수, 정보량 많음", result: "정보 제공형 — 탭/필터 중심 탐색", category: "사이트 유형" },
];

// ── CTA 우선순위 ──
export const ctaPriorityRules: ConditionRule[] = [
  { condition: "온라인 예약 시스템 있음", result: "1순위: 온라인 예약, 2순위: 전화, 3순위: 오시는 길", category: "CTA 우선순위" },
  { condition: "온라인 예약 없음", result: "1순위: 전화 문의, 2순위: 오시는 길, 3순위: 진료시간 확인", category: "CTA 우선순위" },
  { condition: "검진센터형", result: "1순위: 검진 예약, 2순위: 프로그램 비교, 3순위: 전화", category: "CTA 우선순위" },
  { condition: "야간 진료 운영", result: "야간 진료 가능 배지 + 진료시간 CTA 강조", category: "CTA 우선순위" },
];

// ── 레이아웃 분기 ──
export const layoutRules: ConditionRule[] = [
  { condition: "의료진 3인 이상, 사진 보유", result: "의료진 중심형 — 홈 3번째 섹션에 의료진 그리드", category: "레이아웃" },
  { condition: "의료진 1인, 사진 보유", result: "의료진 카드 1개를 히어로 하단에 배치", category: "레이아웃" },
  { condition: "의료진 정보 부족 (사진 없음)", result: "텍스트 프로필 (이름+직위+경력) 카드, 사진 영역 생략", category: "레이아웃" },
  { condition: "시설 사진 5장 이상", result: "갤러리 섹션 포함, 가로 스크롤 또는 그리드", category: "레이아웃" },
  { condition: "시설 사진 부족 (2장 미만)", result: "갤러리 섹션 생략, 아이콘 기반 시설 설명으로 대체", category: "레이아웃" },
  { condition: "진료과 5개 이상", result: "탭 또는 아코디언 형태로 진료과 탐색", category: "레이아웃" },
  { condition: "진료과 2~4개", result: "카드 그리드로 한 화면에 표시", category: "레이아웃" },
];

// ── 조건부 블록 ──
export const conditionalBlocks: ConditionRule[] = [
  { condition: "검진센터형", result: "검진 프로그램 비교 블록, 비급여 가격표 추가", category: "조건부 블록" },
  { condition: "비급여 안내 필요", result: "비급여 테이블 페이지 및 홈 링크 추가", category: "조건부 블록" },
  { condition: "블로그/칼럼 운영", result: "건강정보 섹션 + 최신글 카드 홈에 추가", category: "조건부 블록" },
  { condition: "다국어 필요", result: "언어 전환 UI 헤더에 추가, 핵심 페이지 번역", category: "조건부 블록" },
  { condition: "야간/주말 진료", result: "Quick Info Bar에 야간진료 배지, 진료시간 강조", category: "조건부 블록" },
];

// ── 기관 유형별 세부 분기 ──
export interface InstitutionTypeRule {
  type: string;
  emphasis: string[];
  additionalPages: string[];
  ctaPriority: string;
  layoutHint: string;
}

export const institutionTypeRules: InstitutionTypeRule[] = [
  {
    type: "의원",
    emphasis: ["접근성", "진료시간", "위치", "전화 CTA"],
    additionalPages: [],
    ctaPriority: "전화 > 오시는 길 > 진료시간",
    layoutHint: "간결한 단일 페이지형 또는 최소 5페이지 구성",
  },
  {
    type: "병원",
    emphasis: ["진료과별 안내", "의료진 다수", "시설 갤러리"],
    additionalPages: ["진료과별 상세 페이지", "의료진 개별 페이지"],
    ctaPriority: "진료과 선택 > 의료진 찾기 > 예약",
    layoutHint: "진료과 탭/필터 중심, 의료진 그리드",
  },
  {
    type: "검진센터",
    emphasis: ["검진 프로그램 비교", "비급여 가격표", "예약 CTA"],
    additionalPages: ["검진 프로그램 페이지", "비급여 안내 페이지"],
    ctaPriority: "검진 예약 > 프로그램 비교 > 전화",
    layoutHint: "프로그램 비교 테이블 중심, 예약 CTA 전면 배치",
  },
  {
    type: "전문클리닉",
    emphasis: ["전문 진료 분야", "의료진 전문성", "시술/치료 설명"],
    additionalPages: ["시술/치료 상세 페이지", "증상별 안내"],
    ctaPriority: "상담 예약 > 진료 문의 > 전화",
    layoutHint: "전문 분야 히어로 강조, 의료진 프로필 상세",
  },
];

// ── 브리프 조건별 상세 분기 규칙 ──
export interface DetailedBranchRule {
  field: string;
  condition: string;
  include: string[];
  exclude: string[];
  note: string;
}

export const detailedBranchRules: DetailedBranchRule[] = [
  // 진료과 수
  { field: "departments", condition: "1개", include: ["단일 진료과 히어로"], exclude: ["진료과 탭/필터", "진료과 비교 카드"], note: "진료과 선택 UI 불필요" },
  { field: "departments", condition: "2~4개", include: ["진료과 카드 그리드"], exclude: ["탭/아코디언 형태"], note: "한 화면에 카드 표시" },
  { field: "departments", condition: "5개 이상", include: ["진료과 탭 또는 아코디언", "카테고리 필터"], exclude: [], note: "탐색형 UI 필수" },
  // 의료진 수
  { field: "doctorCount", condition: "1명", include: ["히어로 하단 단일 의료진 카드"], exclude: ["의료진 그리드", "의료진 필터"], note: "단일 카드로 대체" },
  { field: "doctorCount", condition: "2~3명", include: ["의료진 카드 그리드 (2~3열)"], exclude: [], note: "전원 한 화면 표시" },
  { field: "doctorCount", condition: "4명 이상", include: ["의료진 그리드 + 필터", "개별 상세 페이지"], exclude: [], note: "그리드+상세 구조" },
  // 사진 보유
  { field: "photoTypes", condition: "의료진 사진 있음", include: ["사진 포함 의료진 카드"], exclude: [], note: "" },
  { field: "photoTypes", condition: "의료진 사진 없음", include: ["이니셜 아바타 + 텍스트 프로필"], exclude: ["사진 기반 의료진 카드"], note: "사진 영역 생략" },
  { field: "photoTypes", condition: "시설 사진 3장 이상", include: ["시설 갤러리 섹션"], exclude: [], note: "가로 스크롤 또는 그리드" },
  { field: "photoTypes", condition: "시설 사진 없음", include: ["아이콘 기반 시설 설명"], exclude: ["갤러리 섹션"], note: "섹션 생략 또는 대체" },
  // 온라인 예약
  { field: "bookingMethod", condition: "온라인 예약 있음", include: ["예약 폼 페이지", "모바일 예약 CTA"], exclude: [], note: "예약 CTA 1순위" },
  { field: "bookingMethod", condition: "온라인 예약 없음", include: ["전화 CTA 강조", "진료시간 노출 강화"], exclude: ["예약 폼", "예약 버튼"], note: "전화 CTA 전면 배치" },
  // 비급여
  { field: "nonCoveredInfo", condition: "필요", include: ["비급여 안내 페이지", "홈 비급여 링크"], exclude: [], note: "가격 변동 안내 필수" },
  { field: "nonCoveredInfo", condition: "불필요", include: [], exclude: ["비급여 페이지"], note: "전화 문의 안내로 대체" },
  // 칼럼/블로그
  { field: "blogColumn", condition: "운영", include: ["건강정보/칼럼 페이지", "홈 최신글 카드"], exclude: [], note: "Article JSON-LD 적용" },
  { field: "blogColumn", condition: "미운영", include: [], exclude: ["건강정보 섹션", "칼럼 페이지"], note: "해당 블록 제거" },
  // 다국어
  { field: "multilingual", condition: "필요", include: ["언어 전환 UI", "핵심 페이지 번역"], exclude: [], note: "헤더에 언어 전환 추가" },
  { field: "multilingual", condition: "불필요", include: [], exclude: ["언어 전환 UI"], note: "" },
];

// ── 예산/일정별 스케일링 ──
export const budgetScaling: { level: string; include: string[]; exclude: string[]; pageCount: string; timeline: string }[] = [
  {
    level: "최소 구성 (빠른 제작)",
    include: ["홈페이지", "진료과목", "의료진", "오시는 길", "진료시간", "모바일 하단 CTA"],
    exclude: ["블로그", "FAQ 전용 페이지", "비급여 전용 페이지", "갤러리", "증상별 안내"],
    pageCount: "5~6페이지",
    timeline: "1~2주",
  },
  {
    level: "표준 구성",
    include: ["홈페이지", "진료과목", "의료진", "오시는 길", "진료시간", "예약", "FAQ", "병원 소개"],
    exclude: ["블로그", "증상별 안내 개별 페이지", "비급여 전용 페이지"],
    pageCount: "8~10페이지",
    timeline: "2~4주",
  },
  {
    level: "풀 구성",
    include: ["전체 템플릿 페이지 포함", "증상별 안내", "블로그/칼럼", "비급여 안내", "갤러리"],
    exclude: [],
    pageCount: "12~15+페이지",
    timeline: "4~6주",
  },
];

// ── 핵심 유지 블록 (어떤 예산에서도 제거 불가) ──
export const coreBlocks = [
  "Quick Info Bar",
  "히어로 (진료 범위 + CTA)",
  "진료과목 카드",
  "의료진 소개",
  "진료시간/휴진",
  "위치/오시는 길",
  "최종 CTA",
  "Footer",
  "모바일 하단 고정 CTA 바",
];

// ── 컴플라이언스 검토 우선순위 ──
export const compliancePriorityBlocks = [
  { block: "의료진 소개", level: "critical" as const, reason: "자격/경력 사실 확인 필수" },
  { block: "예약 폼", level: "critical" as const, reason: "개인정보 수집 동의 필수" },
  { block: "진료 설명", level: "high" as const, reason: "과장/단정 표현 검토" },
  { block: "히어로 카피", level: "high" as const, reason: "광고성 문구 검토" },
  { block: "비급여 가격", level: "high" as const, reason: "가격 정확성, 변동 안내" },
  { block: "후기/사례", level: "critical" as const, reason: "동의, 사실 확인" },
  { block: "이벤트", level: "high" as const, reason: "부당 유인 여부" },
];
