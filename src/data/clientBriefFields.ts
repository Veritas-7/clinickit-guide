// 고객사 브리프 필드 정의
export type FieldType = "text" | "textarea" | "select" | "multiselect" | "radio" | "checkbox" | "number";

export interface BriefField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required: boolean;
  group: string;
  helpText?: string;
}

export const briefFields: BriefField[] = [
  // 기본 정보
  { id: "hospitalName", label: "병원명", type: "text", placeholder: "예: OO내과의원", required: true, group: "기본 정보" },
  { id: "institutionType", label: "기관 유형", type: "select", options: ["의원", "병원", "검진센터", "전문클리닉"], required: true, group: "기본 정보" },
  { id: "departments", label: "진료과목", type: "multiselect", options: ["내과", "가정의학과", "소아청소년과", "정형외과", "이비인후과", "재활의학과", "신경과", "비뇨의학과", "산부인과", "안과", "외과", "기타"], required: true, group: "기본 정보" },
  { id: "coreTreatment", label: "핵심 진료 영역", type: "textarea", placeholder: "예: 만성질환 관리, 건강검진, 소아 예방접종", required: false, group: "기본 정보" },
  
  // 위치/접근
  { id: "region", label: "지역 (시/구/동)", type: "text", placeholder: "예: 서울 강남구 역삼동", required: true, group: "위치/접근" },
  { id: "address", label: "상세 주소", type: "text", placeholder: "예: 역삼동 123-45 OO빌딩 3층", required: true, group: "위치/접근" },
  { id: "phone", label: "대표 전화번호", type: "text", placeholder: "예: 02-1234-5678", required: true, group: "위치/접근" },
  { id: "parking", label: "주차 가능 여부", type: "radio", options: ["가능 (무료)", "가능 (유료/부분 무료)", "불가"], required: true, group: "위치/접근" },
  { id: "transit", label: "지하철/버스 접근 정보", type: "textarea", placeholder: "예: 역삼역 3번 출구 도보 3분", required: false, group: "위치/접근" },

  // 진료시간
  { id: "weekdayHours", label: "평일 진료시간", type: "text", placeholder: "예: 09:00-18:00", required: true, group: "진료시간" },
  { id: "saturdayHours", label: "토요일 진료시간", type: "text", placeholder: "예: 09:00-13:00 (없으면 '휴진')", required: true, group: "진료시간" },
  { id: "lunchHours", label: "점심시간", type: "text", placeholder: "예: 13:00-14:00", required: false, group: "진료시간" },
  { id: "closedDays", label: "휴진일", type: "text", placeholder: "예: 일요일, 공휴일", required: true, group: "진료시간" },

  // 예약/의료진
  { id: "bookingMethod", label: "예약 방식", type: "multiselect", options: ["전화 예약", "온라인 예약 (자체)", "온라인 예약 (외부 서비스)", "네이버 예약", "카카오 예약", "예약 없이 접수"], required: true, group: "예약/의료진" },
  { id: "doctorCount", label: "의료진 수", type: "number", placeholder: "예: 2", required: true, group: "예약/의료진" },
  { id: "doctorInfoReady", label: "의료진 정보 보유 여부", type: "radio", options: ["사진+경력 모두 보유", "경력만 보유 (사진 없음)", "미확정"], required: true, group: "예약/의료진" },

  // 콘텐츠/기능
  { id: "firstVisitGuide", label: "초진 안내 필요 여부", type: "radio", options: ["필요", "불필요"], required: false, group: "콘텐츠/기능" },
  { id: "nonCoveredInfo", label: "비급여 안내 필요 여부", type: "radio", options: ["필요", "불필요"], required: false, group: "콘텐츠/기능" },
  { id: "noticeBoard", label: "공지사항 운영 여부", type: "radio", options: ["운영", "미운영"], required: false, group: "콘텐츠/기능" },
  { id: "blogColumn", label: "블로그/칼럼 운영 여부", type: "radio", options: ["운영", "미운영"], required: false, group: "콘텐츠/기능" },

  // 브랜드/타겟
  { id: "ctaPriority", label: "핵심 CTA 우선순위", type: "multiselect", options: ["전화 문의", "온라인 예약", "오시는 길", "진료시간 확인", "진료과목 보기", "검진 예약"], required: true, group: "브랜드/타겟" },
  { id: "brandTone", label: "브랜드 톤", type: "multiselect", options: ["차분하고 신뢰감 있는", "따뜻하고 친근한", "전문적이고 권위 있는", "모던하고 깔끔한", "지역 밀착형"], required: false, group: "브랜드/타겟" },
  { id: "photoTypes", label: "보유 사진 종류", type: "multiselect", options: ["의료진 프로필", "진료실/시설", "대기실/로비", "장비", "외관/건물", "없음"], required: false, group: "브랜드/타겟" },
  { id: "targetPatients", label: "타겟 환자층", type: "textarea", placeholder: "예: 30~60대 직장인, 지역 주민, 영유아 보호자", required: false, group: "브랜드/타겟" },
  { id: "multilingual", label: "다국어 필요 여부", type: "radio", options: ["불필요", "영어", "중국어", "기타"], required: false, group: "브랜드/타겟" },

  // 페이지/컴플라이언스
  { id: "requiredPages", label: "필수 페이지", type: "multiselect", options: ["홈", "진료과목", "의료진", "진료시간/방문안내", "오시는 길", "예약/문의", "FAQ", "병원 소개", "건강정보/칼럼", "비급여 안내", "증상/질환 안내"], required: true, group: "페이지/컴플라이언스" },
  { id: "complianceSensitive", label: "법률 검토 민감 요소", type: "multiselect", options: ["의료진 경력/수상", "비급여 가격", "치료 사례/후기", "비포/애프터", "이벤트/프로모션", "해당 없음"], required: false, group: "페이지/컴플라이언스" },
  { id: "restrictions", label: "금지 표현/주의사항", type: "textarea", placeholder: "예: 특정 경쟁 병원 언급 금지, 가격 비교 금지", required: false, group: "페이지/컴플라이언스" },
];

export const briefGroups = [...new Set(briefFields.map(f => f.group))];
