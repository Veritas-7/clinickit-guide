// 업종별 설정 - 병원/의원 기본형
// 다른 업종(치과, 한의원, 성형외과 등)으로 분기 시 이 파일을 교체/확장합니다.

export interface IndustryConfig {
  id: string;
  name: string;
  nameShort: string;
  description: string;
  targetAudience: string[];
  coreValues: string[];
  visualKeywords: string[];
  primaryCTAs: string[];
  trustFactors: string[];
  complianceLevel: "standard" | "high" | "very-high";
  subtypes: { id: string; name: string; emphasis: string; primaryCTA: string }[];
}

export const medicalClinicConfig: IndustryConfig = {
  id: "medical-clinic",
  name: "병원/의원",
  nameShort: "의원",
  description: "내과, 가정의학과, 소아청소년과, 정형외과, 이비인후과, 재활의학과, 검진센터형, 지역 기반 의원형 등 일반적인 병원/의원",
  targetAudience: ["환자 본인", "보호자(부모, 자녀)", "건강검진 대상자", "만성질환 관리 환자", "초진 방문자"],
  coreValues: ["신뢰 형성", "명확한 정보 전달", "지역 기반 접근성", "모바일 우선", "과장 없는 전문성"],
  visualKeywords: ["Trustworthy", "Calm", "Precise", "Accessible", "Modern", "Reassuring", "Professional", "Information-driven", "Clean but warm"],
  primaryCTAs: ["전화 문의", "진료 예약", "오시는 길", "진료시간 확인"],
  trustFactors: ["전문의 경력/자격", "실제 시설 사진", "정확한 진료 정보", "투명한 비급여 공개", "정확한 위치/접근 정보"],
  complianceLevel: "high",
  subtypes: [
    { id: "local-clinic", name: "지역 의원형", emphasis: "접근성, 진료시간, 위치", primaryCTA: "전화, 오시는 길" },
    { id: "specialist", name: "전문클리닉형", emphasis: "진료 분야 전문성, 의료진", primaryCTA: "상담 예약, 진료 문의" },
    { id: "checkup-center", name: "검진센터형", emphasis: "검진 프로그램, 비급여 안내", primaryCTA: "검진 예약, 프로그램 비교" },
    { id: "multi-dept", name: "복합 병원형", emphasis: "진료과별 안내, 의료진 다수", primaryCTA: "진료과 선택, 의료진 찾기" },
  ],
};

// 확장 예정 업종 (placeholder)
export const futureIndustries = [
  { id: "dermatology", name: "피부과/미용", status: "planned" },
  { id: "dental", name: "치과", status: "planned" },
  { id: "oriental", name: "한의원", status: "planned" },
  { id: "plastic-surgery", name: "성형외과", status: "planned" },
  { id: "university-hospital", name: "대학병원", status: "planned" },
] as const;

export const currentConfig = medicalClinicConfig;
