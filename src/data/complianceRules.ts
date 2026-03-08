// 컴플라이언스 규칙 데이터
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface ComplianceArea {
  id: string;
  title: string;
  riskLevel: RiskLevel;
  checkPoints: string[];
  allowedExamples?: string[];
  cautionExamples?: string[];
  forbiddenExamples?: string[];
}

export interface PageComplianceMap {
  page: string;
  areas: string[];
  priority: RiskLevel;
}

export const complianceAreas: ComplianceArea[] = [
  {
    id: "doctor-info",
    title: "의료진 정보",
    riskLevel: "critical",
    checkPoints: [
      "전문의 자격 표기의 정확성",
      "학력/경력/수상 이력의 사실 여부",
      "과장된 수식어 사용 여부",
      "퇴직 의료진 정보 즉시 삭제 여부",
      "프로필 사진이 실제 의료진 본인인지",
    ],
    allowedExamples: ["OO대학 졸업, OO병원 수련, 내과 전문의"],
    cautionExamples: ["경력 20년의 베테랑 전문의"],
    forbiddenExamples: ["지역 최고의 명의", "업계 최고 경력의 의사"],
  },
  {
    id: "treatment-copy",
    title: "진료 설명/카피",
    riskLevel: "high",
    checkPoints: [
      "치료 결과 단정 표현 여부",
      "과장/비교/우월 표현 여부",
      "환자 불안 과도 자극 여부",
      "자가진단 유도 여부",
      "비교 광고 해당 여부",
    ],
    allowedExamples: ["고혈압, 당뇨 등 만성질환 관리를 도와드립니다"],
    cautionExamples: ["효과적인 만성질환 치료를 제공합니다"],
    forbiddenExamples: ["완벽한 치료를 약속합니다", "부작용 없이 안전하게"],
  },
  {
    id: "reviews",
    title: "후기/사례/경험담",
    riskLevel: "critical",
    checkPoints: [
      "실제 환자 동의 여부",
      "허위 또는 조작 여부",
      "결과 보장처럼 오해될 수 있는지",
      "개인정보 노출 여부",
      "대가성 후기 표시 여부",
    ],
    forbiddenExamples: ["허위 후기", "허위 별점", "조작된 치료 성과"],
  },
  {
    id: "before-after",
    title: "비포/애프터 사진",
    riskLevel: "critical",
    checkPoints: [
      "환자 동의 확보 여부",
      "과도한 보정 여부",
      "오해를 유발하는 연출 여부",
      "촬영 조건 일관성",
    ],
  },
  {
    id: "events",
    title: "이벤트/프로모션",
    riskLevel: "high",
    checkPoints: [
      "할인/무료 표현의 적법성",
      "의료 행위에 대한 부당 유인 여부",
      "기간/조건 명시 여부",
      "광고 심의 필요 여부",
    ],
  },
  {
    id: "ranking",
    title: "랭킹/수상/인증",
    riskLevel: "high",
    checkPoints: [
      "출처와 기준의 명확성",
      "허위 또는 과장 여부",
      "오래된 정보의 현행성",
      "인증 기관의 신뢰성",
    ],
    forbiddenExamples: ["지역 1위 병원", "환자 만족도 99%"],
  },
  {
    id: "media",
    title: "언론 노출/기사",
    riskLevel: "high",
    checkPoints: [
      "실제 보도 사실 여부",
      "광고성 기사와의 구분",
      "인용 맥락의 정확성",
    ],
  },
  {
    id: "pricing",
    title: "비급여 가격 표시",
    riskLevel: "high",
    checkPoints: [
      "가격 표시의 정확성",
      "변동 가능성 안내 여부",
      "관련 법적 요건 준수",
      "최종 업데이트 일자 표시",
    ],
  },
  {
    id: "privacy",
    title: "개인정보 수집/예약 폼",
    riskLevel: "critical",
    checkPoints: [
      "개인정보 수집·이용 동의 절차 포함",
      "수집 항목 명시",
      "보유 기간 안내",
      "제3자 제공 여부 안내",
      "동의 철회 방법 안내",
    ],
  },
  {
    id: "images",
    title: "이미지/사진 사용",
    riskLevel: "medium",
    checkPoints: [
      "스톡 사진 사용 여부 (의료진 사진은 실제만)",
      "환자 사진 동의 여부",
      "과시적 연출 여부",
      "이미지 출처 권리 확보",
    ],
  },
];

export const pageComplianceMap: PageComplianceMap[] = [
  { page: "홈페이지", areas: ["treatment-copy", "doctor-info", "images"], priority: "high" },
  { page: "진료과목", areas: ["treatment-copy"], priority: "high" },
  { page: "의료진", areas: ["doctor-info", "ranking", "media", "images"], priority: "critical" },
  { page: "증상/질환", areas: ["treatment-copy"], priority: "high" },
  { page: "예약/문의", areas: ["privacy"], priority: "critical" },
  { page: "비급여", areas: ["pricing"], priority: "high" },
  { page: "블로그/칼럼", areas: ["treatment-copy", "media"], priority: "medium" },
  { page: "FAQ", areas: ["treatment-copy"], priority: "medium" },
  { page: "병원 소개", areas: ["ranking", "media", "images"], priority: "high" },
  { page: "이벤트", areas: ["events"], priority: "high" },
];

export const prelaunchChecklist = [
  { step: 1, title: "콘텐츠 초안 작성 완료", desc: "모든 페이지의 텍스트, 이미지가 준비됨" },
  { step: 2, title: "내부 컴플라이언스 체크리스트 점검", desc: "이 가이드의 기준으로 자체 검토" },
  { step: 3, title: "검토 필요 항목 목록 추출", desc: "high-risk, critical 라벨 항목만 별도 정리" },
  { step: 4, title: "법률/광고 전문가 검토 의뢰", desc: "추출 목록을 전문가에게 전달" },
  { step: 5, title: "피드백 반영 및 수정", desc: "검토 의견 반영 후 재확인" },
  { step: 6, title: "최종 확인 후 배포", desc: "수정 완료 확인, 배포 승인" },
];

export const operationRecheck = [
  { trigger: "의료진 변경 (입사/퇴사/자격 변경)", areas: ["doctor-info"], urgency: "즉시" },
  { trigger: "진료과목 추가/변경", areas: ["treatment-copy"], urgency: "1주 이내" },
  { trigger: "비급여 가격 변경", areas: ["pricing"], urgency: "즉시" },
  { trigger: "블로그/칼럼 신규 게시", areas: ["treatment-copy", "media"], urgency: "게시 전" },
  { trigger: "이벤트/프로모션 등록", areas: ["events"], urgency: "게시 전" },
  { trigger: "환자 후기 추가", areas: ["reviews"], urgency: "게시 전" },
  { trigger: "비포/애프터 사진 추가", areas: ["before-after"], urgency: "게시 전" },
];
