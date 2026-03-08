// 라우트별 SEO 메타데이터 설정 — 단일 도메인 상수 기반
export const BASE_URL = "https://medical-guide.example.com";
export const SITE_NAME = "병원/의원 웹사이트 제작 가이드";
export const DEFAULT_OG_IMAGE = "/og-image.png";

export type SchemaType =
  | "WebSite" | "WebPage" | "FAQPage" | "Article"
  | "CollectionPage" | "HowTo" | "ProfilePage"
  | "MedicalBusiness" | "Physician";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface RouteMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string[];
  noindex?: boolean;
  robots?: string;
  schemaType?: SchemaType;
  jsonLd?: Record<string, unknown>;
  breadcrumb?: BreadcrumbItem[];
  hasFaq?: boolean;
}

const guideBreadcrumb = (name: string, url: string): BreadcrumbItem[] => [
  { name: "홈", url: "/" },
  { name, url },
];

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "병원/의원 웹사이트 제작 가이드 | 의료기관 홈페이지 기준서",
    description: "병원·의원 업종 홈페이지를 빠르게 제작하기 위한 내부용 디자인·UI·UX·콘텐츠·컴플라이언스·SEO 가이드 사이트",
    keywords: ["병원 홈페이지", "의원 웹사이트", "의료기관 디자인 가이드"],
    schemaType: "WebSite",
    robots: "index, follow",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
      description: "병원·의원 업종 홈페이지 제작을 위한 통합 가이드 시스템",
    },
    breadcrumb: [{ name: "홈", url: "/" }],
  },
  "/industry-overview": {
    title: "병원/의원 업종 특성 | 의료기관 웹사이트 가이드",
    description: "병원/의원 홈페이지가 일반 서비스업과 다른 점, 사용자 행동 패턴, 신뢰 형성 요소, 의료기관 유형별 차이를 정리합니다.",
    keywords: ["의료기관 업종 특성", "병원 사용자 행동", "의원 신뢰 형성"],
    schemaType: "WebPage",
    robots: "index, follow",
    breadcrumb: guideBreadcrumb("업종 특성", "/industry-overview"),
  },
  "/design-guide": {
    title: "디자인 가이드 | 병원/의원 디자인 시스템",
    description: "병원/의원 업종에 최적화된 컬러, 타이포그래피, 간격, 이미지, 접근성 디자인 시스템.",
    keywords: ["병원 디자인 시스템", "의료기관 컬러 토큰", "의원 타이포그래피"],
    schemaType: "WebPage",
    robots: "index, follow",
    breadcrumb: guideBreadcrumb("디자인 가이드", "/design-guide"),
  },
  "/ui-guide": {
    title: "UI 가이드 | 병원/의원 UI 컴포넌트 패턴",
    description: "병원/의원 사이트의 핵심 UI 패턴: Quick Info Bar, 히어로, 진료과목 카드, 의료진 카드, CTA, FAQ, 모바일 고정 바 등.",
    keywords: ["병원 UI 패턴", "의원 컴포넌트", "의료기관 CTA"],
    schemaType: "CollectionPage",
    robots: "index, follow",
    breadcrumb: guideBreadcrumb("UI 가이드", "/ui-guide"),
  },
  "/ux-guide": {
    title: "UX 가이드 | 병원/의원 사용자 경험 설계",
    description: "병원/의원 방문자의 사용자 여정, 정보 우선순위, 전환 흐름, 모바일 UX 전략을 정리합니다.",
    keywords: ["병원 UX", "의원 사용자 여정", "의료기관 전환 최적화"],
    schemaType: "WebPage",
    robots: "index, follow",
    breadcrumb: guideBreadcrumb("UX 가이드", "/ux-guide"),
  },
  "/page-templates": {
    title: "페이지 템플릿 | 병원/의원 홈페이지 블록 시스템",
    description: "병원/의원 홈페이지 제작을 위한 페이지별 블록 템플릿. 필수/선택/조건부 블록, CTA, 신뢰 요소 포함.",
    keywords: ["병원 페이지 템플릿", "의원 홈페이지 구조"],
    schemaType: "CollectionPage",
    robots: "index, follow",
    breadcrumb: guideBreadcrumb("페이지 템플릿", "/page-templates"),
  },
  "/content-guide": {
    title: "콘텐츠 가이드 | 병원/의원 카피라이팅",
    description: "병원/의원 웹사이트의 카피 톤, 문장 템플릿, CTA 문구, 금지 표현. 신뢰를 높이고 법적 리스크를 줄이는 기준.",
    keywords: ["병원 카피라이팅", "의원 콘텐츠"],
    schemaType: "WebPage",
    robots: "index, follow",
    breadcrumb: guideBreadcrumb("콘텐츠 가이드", "/content-guide"),
  },
  "/compliance-guide": {
    title: "컴플라이언스 가이드 | 병원/의원 법률 검토 기준",
    description: "병원/의원 웹사이트의 법률/광고 검토 포인트. 의료진 정보, 진료 카피, 후기, 비급여, 이벤트 등 검토 체계.",
    keywords: ["의료광고 심의", "병원 컴플라이언스"],
    schemaType: "WebPage",
    robots: "index, follow",
    hasFaq: true,
    breadcrumb: guideBreadcrumb("컴플라이언스", "/compliance-guide"),
  },
  "/seo-geo": {
    title: "SEO/GEO 가이드 | 병원/의원 검색 최적화",
    description: "병원/의원 사이트의 메타 데이터, URL 구조, 구조화 데이터, 로컬 SEO, 지역 기반 검색 최적화 전략.",
    keywords: ["병원 SEO", "의원 로컬 SEO"],
    schemaType: "HowTo",
    robots: "index, follow",
    breadcrumb: guideBreadcrumb("SEO/GEO", "/seo-geo"),
  },
  "/checklist": {
    title: "실무 체크리스트 | 병원/의원 홈페이지 QA",
    description: "병원/의원 웹사이트 제작 전/후 실무 체크리스트. 디자인, UI, UX, 콘텐츠, 컴플라이언스, SEO 점검.",
    keywords: ["병원 홈페이지 체크리스트", "의원 QA"],
    schemaType: "WebPage",
    robots: "index, follow",
    breadcrumb: guideBreadcrumb("체크리스트", "/checklist"),
  },
  "/client-brief": {
    title: "고객사 브리프 | 병원/의원 프로젝트 정보 수집",
    description: "병원/의원 고객사의 기본 정보를 체계적으로 정리하는 브리프 도구. JSON 내보내기, 예시 데이터 자동 채우기 지원.",
    keywords: ["병원 브리프", "의원 프로젝트"],
    schemaType: "WebPage",
    noindex: true,
    robots: "noindex, nofollow",
    breadcrumb: guideBreadcrumb("고객사 브리프", "/client-brief"),
  },
  "/site-blueprint": {
    title: "사이트 블루프린트 | 병원/의원 구조 자동 설계",
    description: "고객사 브리프 기반으로 공개용 병원/의원 사이트의 페이지 구조, CTA, SEO, Lovable 프롬프트를 자동 도출합니다.",
    keywords: ["병원 사이트 구조", "의원 블루프린트"],
    schemaType: "WebPage",
    noindex: true,
    robots: "noindex, nofollow",
    breadcrumb: guideBreadcrumb("사이트 블루프린트", "/site-blueprint"),
  },
  "/implementation-rules": {
    title: "구현 규칙 | 병원/의원 제작 실무 기준",
    description: "브리프 기반 조건별 템플릿 선택, CTA 우선순위, 레이아웃 분기, 축소 구조 등 동적 구현 규칙 엔진.",
    keywords: ["병원 제작 규칙", "의원 구현 가이드"],
    schemaType: "WebPage",
    noindex: true,
    robots: "noindex, nofollow",
    breadcrumb: guideBreadcrumb("구현 규칙", "/implementation-rules"),
  },
};

/** 404/기타 페이지용 fallback — routeMeta와 동일한 구조 */
export const fallbackMeta: RouteMeta = {
  title: "페이지를 찾을 수 없습니다 | 병원/의원 웹사이트 제작 가이드",
  description: "요청하신 페이지를 찾을 수 없습니다. 가이드 홈 또는 주요 문서로 이동하세요.",
  noindex: true,
  robots: "noindex, nofollow",
  ogTitle: "페이지를 찾을 수 없습니다",
  ogDescription: "요청하신 페이지가 존재하지 않습니다.",
  schemaType: "WebPage",
  breadcrumb: [{ name: "홈", url: "/" }, { name: "404", url: "" }],
};

// JSON-LD 템플릿들 (공개용 사이트에서 사용)
export const jsonLdTemplates = {
  medicalBusiness: `{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "[병원명]",
  "image": "[대표 이미지 URL]",
  "telephone": "[전화번호]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[도로명주소]",
    "addressLocality": "[시/구]",
    "addressRegion": "[시/도]",
    "postalCode": "[우편번호]",
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[위도]",
    "longitude": "[경도]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "url": "[사이트 URL]",
  "priceRange": "$$"
}`,
  physician: `{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "[의료진명]",
  "medicalSpecialty": "[전문 분야]",
  "memberOf": {
    "@type": "MedicalOrganization",
    "name": "[병원명]"
  },
  "qualifications": "[자격/학력]"
}`,
  faqPage: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[질문]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[답변]"
      }
    }
  ]
}`,
  article: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[제목]",
  "author": { "@type": "Person", "name": "[작성자]" },
  "datePublished": "[날짜]",
  "publisher": {
    "@type": "Organization",
    "name": "[병원명]"
  }
}`,
};

export const sitemapStructure = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/departments", priority: "0.9", changefreq: "monthly" },
  { url: "/departments/[slug]", priority: "0.8", changefreq: "monthly" },
  { url: "/doctors", priority: "0.9", changefreq: "monthly" },
  { url: "/doctors/[slug]", priority: "0.8", changefreq: "monthly" },
  { url: "/symptoms/[slug]", priority: "0.7", changefreq: "monthly" },
  { url: "/visit-info", priority: "0.8", changefreq: "weekly" },
  { url: "/location", priority: "0.8", changefreq: "monthly" },
  { url: "/reservation", priority: "0.9", changefreq: "monthly" },
  { url: "/faq", priority: "0.7", changefreq: "monthly" },
  { url: "/notice", priority: "0.6", changefreq: "weekly" },
  { url: "/health-info", priority: "0.6", changefreq: "weekly" },
  { url: "/non-covered-services", priority: "0.5", changefreq: "monthly" },
];
