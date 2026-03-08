// 페이지 템플릿 블록 시스템 데이터
export type BlockType = "required" | "optional" | "conditional" | "forbidden";

export interface TemplateBlock {
  title: string;
  purpose: string;
  type: BlockType;
  cta?: string;
  complianceLevel?: "none" | "review" | "high-risk";
  seoRelevant?: boolean;
  mobileBehavior?: string;
  photoFallback?: string;
  noBookingFallback?: string;
}

export interface PageTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  blocks: TemplateBlock[];
  primaryCTA: string;
  secondaryCTA?: string;
  trustElements: string[];
  mobileRule: string;
  seoPoints: string[];
  compliancePoints: string[];
}

export const pageTemplates: PageTemplate[] = [
  {
    id: "homepage",
    name: "홈페이지",
    emoji: "🏠",
    description: "병원/의원의 첫인상. 진료 범위, 의료진 신뢰, 핵심 CTA를 즉시 전달",
    primaryCTA: "진료 예약 / 전화 문의",
    secondaryCTA: "진료과목 보기 / 오시는 길",
    trustElements: ["전문의 경력 요약", "실제 시설 사진", "진료시간 명시", "위치 정보"],
    mobileRule: "Quick Info Bar 축약, 하단 고정 CTA, 카드 2열 그리드, 긴 섹션 접기",
    seoPoints: ["H1에 지역+진료과+병원명", "MedicalBusiness JSON-LD", "OG/Twitter 메타"],
    compliancePoints: ["히어로 카피 과장 여부", "의료진 소개 정확성", "진료 설명 단정 표현"],
    blocks: [
      { title: "Quick Info Bar", purpose: "전화, 진료시간, 위치, 예약 즉시 노출", type: "required", seoRelevant: true, mobileBehavior: "아이콘 축약, 전화 탭 발신" },
      { title: "히어로 섹션", purpose: "어떤 진료를 하는 곳인지 + 핵심 CTA", type: "required", cta: "진료 예약 / 진료과목 보기", complianceLevel: "review", seoRelevant: true, mobileBehavior: "텍스트 상단, 이미지 배경 오버레이", photoFallback: "컬러 배경 + 텍스트 중심 히어로" },
      { title: "진료과목/주요 진료", purpose: "카드형으로 진료 범위 빠르게 탐색", type: "required", cta: "진료과목 상세", seoRelevant: true, mobileBehavior: "2열 그리드 또는 가로 스크롤" },
      { title: "증상/상황별 안내", purpose: "방문자 관점 진입 (나의 증상 → 적합한 진료)", type: "optional", mobileBehavior: "아코디언 형태" },
      { title: "의료진 소개", purpose: "전문의 경력·사진으로 신뢰 형성", type: "required", cta: "의료진 더보기", complianceLevel: "high-risk", mobileBehavior: "가로 스크롤 카드", photoFallback: "텍스트 중심 프로필 (이름+직위+경력)" },
      { title: "진료시간/방문안내", purpose: "오늘 진료 가능 여부 즉시 확인", type: "required", seoRelevant: true, mobileBehavior: "오늘 요일 하이라이트" },
      { title: "시설/환경 미리보기", purpose: "실제 공간 사진으로 안심 유도", type: "optional", mobileBehavior: "가로 스크롤 갤러리", photoFallback: "섹션 생략 또는 아이콘 기반 설명" },
      { title: "위치/오시는 길", purpose: "지도, 주소, 주차, 교통 정보", type: "required", cta: "지도 앱 열기", seoRelevant: true, mobileBehavior: "지도 탭 시 앱 연동" },
      { title: "FAQ", purpose: "초진, 준비물, 주차 등 자주 묻는 질문", type: "optional", seoRelevant: true, mobileBehavior: "아코디언" },
      { title: "최종 CTA 블록", purpose: "전화/예약/오시는 길 종합 전환", type: "required", cta: "전화 문의 / 온라인 예약 / 오시는 길", mobileBehavior: "풀 폭 버튼 스택", noBookingFallback: "전화 CTA 강조 + 진료시간 안내" },
      { title: "Footer", purpose: "병원 정보, 법적 고지, 사이트맵", type: "required", seoRelevant: true, mobileBehavior: "1열 스택" },
      { title: "팝업/모달 광고", purpose: "—", type: "forbidden" },
      { title: "자동재생 비디오", purpose: "—", type: "forbidden" },
    ],
  },
  {
    id: "departments",
    name: "진료과목/서비스 소개",
    emoji: "🩺",
    description: "전체 진료과를 탐색하고 상세 정보로 진입하는 허브 페이지",
    primaryCTA: "진료 문의 / 예약",
    trustElements: ["진료 범위 명시", "대상 환자 안내", "관련 의료진 링크"],
    mobileRule: "아코디언 형태로 진료과별 접기/펼치기",
    seoPoints: ["진료과별 개별 URL", "각 진료과 H2", "BreadcrumbList JSON-LD"],
    compliancePoints: ["진료 설명 과장 여부", "적응증 표현 정확성"],
    blocks: [
      { title: "페이지 히어로", purpose: "진료과목 페이지임을 즉시 인지", type: "required", seoRelevant: true, mobileBehavior: "간결한 텍스트 히어로" },
      { title: "진료과목 목록", purpose: "카드 또는 탭으로 전체 진료과 표시", type: "required", seoRelevant: true, mobileBehavior: "2열 카드 또는 아코디언" },
      { title: "각 진료과 상세", purpose: "대상 환자, 주요 증상, 진료 범위 설명", type: "required", complianceLevel: "review", mobileBehavior: "펼치기/접기" },
      { title: "관련 의료진", purpose: "해당 진료과 담당 의료진 링크", type: "optional", mobileBehavior: "카드 링크" },
      { title: "CTA", purpose: "진료 문의 또는 예약", type: "required", cta: "진료 문의 / 예약", noBookingFallback: "전화 문의 CTA" },
    ],
  },
  {
    id: "symptoms",
    name: "증상/질환 안내",
    emoji: "🔍",
    description: "특정 증상/질환에 대한 안내와 적합한 진료 연결",
    primaryCTA: "진료 예약",
    trustElements: ["쉬운 언어 설명", "관련 진료과 링크"],
    mobileRule: "핵심 증상 목록 → 설명 → CTA 순서로 축약",
    seoPoints: ["증상 키워드 H1", "FAQ 스키마 적용 가능", "내부 링크(진료과↔증상)"],
    compliancePoints: ["자가진단 유도 여부", "증상 설명 정확성", "치료 결과 단정 금지"],
    blocks: [
      { title: "페이지 히어로", purpose: "어떤 증상/질환에 대한 안내인지 명시", type: "required", seoRelevant: true, mobileBehavior: "텍스트 중심" },
      { title: "증상 개요", purpose: "쉬운 언어로 증상 설명", type: "required", complianceLevel: "review", mobileBehavior: "카드 형태" },
      { title: "관련 진료", purpose: "이 증상에 해당하는 진료과/서비스 안내", type: "required", seoRelevant: true, mobileBehavior: "링크 카드" },
      { title: "방문 전 안내", purpose: "내원 전 준비사항, 검사 안내", type: "optional", mobileBehavior: "접기" },
      { title: "FAQ", purpose: "해당 증상 관련 자주 묻는 질문", type: "optional", seoRelevant: true, mobileBehavior: "아코디언" },
      { title: "CTA", purpose: "진료 예약 또는 전화 문의", type: "required", cta: "진료 예약" },
      { title: "자가진단 도구", purpose: "—", type: "forbidden" },
    ],
  },
  {
    id: "doctors",
    name: "의료진 소개",
    emoji: "👨‍⚕️",
    description: "의료진의 전문성과 신뢰를 전달하는 프로필 페이지",
    primaryCTA: "진료 예약",
    trustElements: ["실제 사진", "전문의 자격", "학력/경력", "전공 분야"],
    mobileRule: "1열 카드 리스트, 사진 + 핵심 정보 축약",
    seoPoints: ["Physician JSON-LD", "의료진별 개별 URL 가능"],
    compliancePoints: ["자격/경력 사실 확인", "과장 수식어", "수상/언론 정보 검증"],
    blocks: [
      { title: "의료진 목록", purpose: "사진, 이름, 직위, 전공 한눈에", type: "required", seoRelevant: true, mobileBehavior: "1열 카드", photoFallback: "이니셜 아바타 + 텍스트 프로필" },
      { title: "개별 의료진 상세", purpose: "학력, 경력, 전문 분야, 인사말", type: "required", complianceLevel: "high-risk", mobileBehavior: "풀 폭 프로필" },
      { title: "CTA", purpose: "해당 의료진 진료 예약", type: "required", cta: "진료 예약", noBookingFallback: "전화 문의" },
    ],
  },
  {
    id: "about",
    name: "병원/의원 소개",
    emoji: "🏥",
    description: "병원의 미션, 역사, 시설을 소개하는 페이지",
    primaryCTA: "오시는 길 / 예약",
    trustElements: ["사실 기반 인증 정보", "실제 시설 사진", "연혁"],
    mobileRule: "연혁은 접기, 시설 사진 가로 스크롤",
    seoPoints: ["Organization JSON-LD", "병원 소개 H1"],
    compliancePoints: ["인증/수상 사실 확인", "과장 표현"],
    blocks: [
      { title: "병원 소개 히어로", purpose: "병원 미션/비전 또는 핵심 메시지", type: "required", mobileBehavior: "텍스트 중심" },
      { title: "연혁/역사", purpose: "주요 이정표 (간결하게)", type: "optional", mobileBehavior: "접기/펼치기" },
      { title: "시설/환경 갤러리", purpose: "실제 공간 사진", type: "optional", mobileBehavior: "가로 스크롤", photoFallback: "아이콘 기반 시설 설명" },
      { title: "인증/수상", purpose: "사실 기반 인증 정보만", type: "conditional", complianceLevel: "high-risk" },
      { title: "CTA", purpose: "진료 예약 또는 방문 안내", type: "required", cta: "오시는 길 / 예약" },
    ],
  },
  {
    id: "visit-info",
    name: "진료시간/방문안내",
    emoji: "🕐",
    description: "진료시간, 초진 안내, 준비사항을 제공하는 페이지",
    primaryCTA: "전화 문의",
    trustElements: ["정확한 진료시간", "초진 절차 안내"],
    mobileRule: "오늘 요일 하이라이트, 지도 탭 시 앱 실행",
    seoPoints: ["OpeningHoursSpecification", "진료시간 테이블"],
    compliancePoints: ["진료시간 정확성"],
    blocks: [
      { title: "진료시간 테이블", purpose: "요일별 진료시간, 점심, 휴진", type: "required", seoRelevant: true, mobileBehavior: "오늘 하이라이트" },
      { title: "특이사항 공지", purpose: "임시 휴진, 변경 사항 안내", type: "conditional", mobileBehavior: "상단 배너" },
      { title: "초진 안내", purpose: "첫 방문 시 준비물, 절차 설명", type: "optional", mobileBehavior: "카드" },
      { title: "오시는 길 요약", purpose: "주소, 지도, 주차", type: "required", cta: "지도 앱 열기" },
    ],
  },
  {
    id: "location",
    name: "위치/오시는 길",
    emoji: "📍",
    description: "병원 위치, 교통편, 주차 안내 페이지",
    primaryCTA: "전화 문의",
    trustElements: ["정확한 주소", "지도", "주차 정보"],
    mobileRule: "지도 탭 시 네이버 지도/카카오맵 앱 연동",
    seoPoints: ["GeoCoordinates", "NAP 일관성", "LocalBusiness"],
    compliancePoints: [],
    blocks: [
      { title: "지도 임베드", purpose: "위치를 시각적으로 표시", type: "required", seoRelevant: true, mobileBehavior: "탭 시 앱 연동" },
      { title: "주소/연락처", purpose: "복사 가능한 주소, 전화번호", type: "required", seoRelevant: true },
      { title: "대중교통", purpose: "지하철, 버스 노선 안내", type: "optional" },
      { title: "주차 안내", purpose: "주차장 위치, 무료 시간, 요금", type: "optional" },
      { title: "CTA", purpose: "전화 / 예약", type: "required", cta: "전화 문의" },
    ],
  },
  {
    id: "reservation",
    name: "예약/문의",
    emoji: "📅",
    description: "온라인 예약 폼 또는 전화 예약 안내 페이지",
    primaryCTA: "예약 제출",
    trustElements: ["개인정보 처리 안내", "예약 확인 절차"],
    mobileRule: "필드 최소화, 전화번호 키패드 자동 표시",
    seoPoints: ["예약 페이지 메타"],
    compliancePoints: ["개인정보 수집 동의", "예약 조건 안내"],
    blocks: [
      { title: "예약 폼", purpose: "이름, 연락처, 희망 일시, 문의 내용", type: "required", complianceLevel: "review", mobileBehavior: "필드 최소화, 키패드 자동" },
      { title: "전화 문의 안내", purpose: "폼 대신 전화를 선호하는 방문자용", type: "required", mobileBehavior: "tel: 링크" },
      { title: "진료시간 요약", purpose: "예약 가능 시간 참고", type: "optional" },
      { title: "안내 문구", purpose: "개인정보 처리, 예약 확인 절차 안내", type: "required", complianceLevel: "high-risk" },
    ],
  },
  {
    id: "faq",
    name: "FAQ",
    emoji: "❓",
    description: "자주 묻는 질문 모음 페이지",
    primaryCTA: "전화 문의",
    trustElements: ["실제 환자 질문 기반"],
    mobileRule: "아코디언 형태, 터치 영역 충분히 확보",
    seoPoints: ["FAQPage JSON-LD", "질문 키워드"],
    compliancePoints: ["답변 내 치료 결과 단정 여부"],
    blocks: [
      { title: "카테고리 필터", purpose: "진료, 예약, 방문, 비용 등 분류", type: "optional", mobileBehavior: "가로 스크롤 칩" },
      { title: "FAQ 목록", purpose: "질문-답변 아코디언", type: "required", seoRelevant: true, mobileBehavior: "아코디언, 터치 44px+" },
      { title: "추가 문의 CTA", purpose: "답변을 찾지 못한 경우 전화/문의", type: "required", cta: "전화 문의" },
    ],
  },
  {
    id: "notice",
    name: "공지/건강정보/칼럼",
    emoji: "📰",
    description: "병원 공지사항, 건강 관련 정보성 콘텐츠 페이지",
    primaryCTA: "진료 예약",
    trustElements: ["정확한 의학 정보", "작성자/날짜 명시"],
    mobileRule: "카드 리스트, 카테고리 필터 상단 고정",
    seoPoints: ["Article JSON-LD", "카테고리별 URL"],
    compliancePoints: ["의학 정보 정확성", "광고성 콘텐츠 혼재 여부"],
    blocks: [
      { title: "카테고리 탭", purpose: "공지사항, 건강정보, 칼럼 분류", type: "optional", mobileBehavior: "탭 또는 칩" },
      { title: "글 목록", purpose: "제목, 날짜, 요약이 보이는 카드 리스트", type: "required", mobileBehavior: "1열 카드" },
      { title: "글 상세", purpose: "본문, 관련 진료 링크", type: "required", complianceLevel: "review", seoRelevant: true },
      { title: "CTA", purpose: "관련 진료 예약 또는 전화 문의", type: "required", cta: "진료 예약" },
    ],
  },
  {
    id: "non-covered",
    name: "비급여 안내",
    emoji: "💰",
    description: "비급여 항목의 가격과 안내 정보 페이지 (선택)",
    primaryCTA: "전화 문의 / 상담 예약",
    trustElements: ["투명한 가격 공개", "변동 안내"],
    mobileRule: "테이블 가로 스크롤 가능하게",
    seoPoints: ["비급여 키워드"],
    compliancePoints: ["가격 정확성", "변동 가능성 안내", "관련 법적 요건"],
    blocks: [
      { title: "비급여 항목 테이블", purpose: "항목명, 가격(범위), 비고", type: "required", complianceLevel: "high-risk", mobileBehavior: "가로 스크롤 테이블" },
      { title: "안내 문구", purpose: "가격 변동 가능성, 상담 권유", type: "required", complianceLevel: "review" },
      { title: "CTA", purpose: "상담 문의", type: "required", cta: "전화 문의 / 상담 예약" },
    ],
  },
];
