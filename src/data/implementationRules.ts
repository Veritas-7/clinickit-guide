// 구현 규칙 데이터 - 조건별 템플릿 선택, CTA 분기, 레이아웃 분기 등

export interface ConditionRule {
  condition: string;
  result: string;
  category: string;
}

export const siteTypeRules: ConditionRule[] = [
  { condition: "단일 진료과, 의원급, 지역 밀착", result: "지역 의원형 — 위치/전화 CTA 최우선", category: "사이트 유형" },
  { condition: "2인 이상 전문의, 전문 진료 강조", result: "전문의 신뢰형 — 의료진 섹션 상단 배치", category: "사이트 유형" },
  { condition: "건강검진 프로그램 다수", result: "검진센터형 — 프로그램 비교 + 예약 CTA", category: "사이트 유형" },
  { condition: "온라인 예약 가능, 다수 문의", result: "예약 유도형 — 예약 CTA 전면 배치", category: "사이트 유형" },
  { condition: "진료과 다수, 정보량 많음", result: "정보 제공형 — 탭/필터 중심 탐색", category: "사이트 유형" },
];

export const ctaPriorityRules: ConditionRule[] = [
  { condition: "온라인 예약 시스템 있음", result: "1순위: 온라인 예약, 2순위: 전화, 3순위: 오시는 길", category: "CTA 우선순위" },
  { condition: "온라인 예약 없음", result: "1순위: 전화 문의, 2순위: 오시는 길, 3순위: 진료시간 확인", category: "CTA 우선순위" },
  { condition: "검진센터형", result: "1순위: 검진 예약, 2순위: 프로그램 비교, 3순위: 전화", category: "CTA 우선순위" },
  { condition: "야간 진료 운영", result: "야간 진료 가능 배지 + 진료시간 CTA 강조", category: "CTA 우선순위" },
];

export const layoutRules: ConditionRule[] = [
  { condition: "의료진 3인 이상, 사진 보유", result: "의료진 중심형 — 홈 3번째 섹션에 의료진 그리드", category: "레이아웃" },
  { condition: "의료진 1인, 사진 보유", result: "의료진 카드 1개를 히어로 하단에 배치", category: "레이아웃" },
  { condition: "의료진 정보 부족 (사진 없음)", result: "텍스트 프로필 (이름+직위+경력) 카드, 사진 영역 생략", category: "레이아웃" },
  { condition: "시설 사진 5장 이상", result: "갤러리 섹션 포함, 가로 스크롤 또는 그리드", category: "레이아웃" },
  { condition: "시설 사진 부족 (2장 미만)", result: "갤러리 섹션 생략, 아이콘 기반 시설 설명으로 대체", category: "레이아웃" },
  { condition: "진료과 5개 이상", result: "탭 또는 아코디언 형태로 진료과 탐색", category: "레이아웃" },
  { condition: "진료과 2~4개", result: "카드 그리드로 한 화면에 표시", category: "레이아웃" },
];

export const conditionalBlocks: ConditionRule[] = [
  { condition: "검진센터형", result: "검진 프로그램 비교 블록, 비급여 가격표 추가", category: "조건부 블록" },
  { condition: "비급여 안내 필요", result: "비급여 테이블 페이지 및 홈 링크 추가", category: "조건부 블록" },
  { condition: "블로그/칼럼 운영", result: "건강정보 섹션 + 최신글 카드 홈에 추가", category: "조건부 블록" },
  { condition: "다국어 필요", result: "언어 전환 UI 헤더에 추가, 핵심 페이지 번역", category: "조건부 블록" },
  { condition: "야간/주말 진료", result: "Quick Info Bar에 야간진료 배지, 진료시간 강조", category: "조건부 블록" },
];

export const budgetScaling: { level: string; include: string[]; exclude: string[] }[] = [
  {
    level: "최소 구성 (빠른 제작)",
    include: ["홈페이지", "진료과목", "의료진", "오시는 길", "진료시간", "모바일 하단 CTA"],
    exclude: ["블로그", "FAQ 전용 페이지", "비급여 전용 페이지", "갤러리", "증상별 안내"],
  },
  {
    level: "표준 구성",
    include: ["홈페이지", "진료과목", "의료진", "오시는 길", "진료시간", "예약", "FAQ", "병원 소개"],
    exclude: ["블로그", "증상별 안내 개별 페이지", "비급여 전용 페이지"],
  },
  {
    level: "풀 구성",
    include: ["전체 템플릿 페이지 포함", "증상별 안내", "블로그/칼럼", "비급여 안내", "갤러리"],
    exclude: [],
  },
];

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

export const compliancePriorityBlocks = [
  { block: "의료진 소개", level: "critical" as const, reason: "자격/경력 사실 확인 필수" },
  { block: "예약 폼", level: "critical" as const, reason: "개인정보 수집 동의 필수" },
  { block: "진료 설명", level: "high" as const, reason: "과장/단정 표현 검토" },
  { block: "히어로 카피", level: "high" as const, reason: "광고성 문구 검토" },
  { block: "비급여 가격", level: "high" as const, reason: "가격 정확성, 변동 안내" },
  { block: "후기/사례", level: "critical" as const, reason: "동의, 사실 확인" },
  { block: "이벤트", level: "high" as const, reason: "부당 유인 여부" },
];
