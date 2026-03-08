import { SectionHeading } from "@/components/SectionHeading";
import { GuideCard } from "@/components/GuideCard";
import {
  Building2, Palette, Component, Route, FileText, PenTool,
  ShieldCheck, Search, CheckSquare, Phone, Clock, MapPin,
  Users, Stethoscope, CalendarCheck, Smartphone, Heart, Shield,
  ClipboardList, Map, Settings,
} from "lucide-react";

const quickNav = [
  { title: "Industry Overview", desc: "병원/의원 업종 특성과 사용자 행동 패턴", icon: <Building2 className="h-5 w-5" />, to: "/industry-overview" },
  { title: "Design Guide", desc: "컬러, 타이포, 간격, 이미지 스타일 기준", icon: <Palette className="h-5 w-5" />, to: "/design-guide" },
  { title: "UI Guide", desc: "헤더, 카드, CTA, 폼 등 핵심 UI 패턴", icon: <Component className="h-5 w-5" />, to: "/ui-guide" },
  { title: "UX Guide", desc: "사용자 여정, 정보 위계, 전환 흐름", icon: <Route className="h-5 w-5" />, to: "/ux-guide" },
  { title: "Page Templates", desc: "블록 기반 페이지 템플릿 시스템", icon: <FileText className="h-5 w-5" />, to: "/page-templates" },
  { title: "Content Guide", desc: "카피 톤, 문장 템플릿, 금지 표현", icon: <PenTool className="h-5 w-5" />, to: "/content-guide" },
  { title: "Compliance", desc: "법률/광고 검토 포인트와 체크리스트", icon: <ShieldCheck className="h-5 w-5" />, to: "/compliance-guide" },
  { title: "SEO/GEO", desc: "메타, 구조화 데이터, 로컬 SEO 전략", icon: <Search className="h-5 w-5" />, to: "/seo-geo" },
  { title: "Checklist", desc: "제작 전/후 실무 점검 체크리스트", icon: <CheckSquare className="h-5 w-5" />, to: "/checklist" },
];

const toolNav = [
  { title: "Client Brief", desc: "고객사 정보 수집 및 브리프 정리 도구", icon: <ClipboardList className="h-5 w-5" />, to: "/client-brief" },
  { title: "Site Blueprint", desc: "브리프 기반 사이트 구조 자동 도출", icon: <Map className="h-5 w-5" />, to: "/site-blueprint" },
  { title: "Implementation Rules", desc: "조건별 템플릿 선택, CTA 분기, 축소 구조", icon: <Settings className="h-5 w-5" />, to: "/implementation-rules" },
];

const coreInfo = [
  { icon: <Stethoscope className="h-5 w-5" />, label: "진료과목·서비스", desc: "어떤 진료를 하는 곳인지 즉시 확인" },
  { icon: <Users className="h-5 w-5" />, label: "의료진 정보", desc: "전문의 경력·전공·신뢰 요소" },
  { icon: <Clock className="h-5 w-5" />, label: "진료시간·휴진", desc: "오늘 진료 가능한지 바로 확인" },
  { icon: <MapPin className="h-5 w-5" />, label: "위치·오시는 길", desc: "주소, 지도, 주차, 건물 정보" },
  { icon: <Phone className="h-5 w-5" />, label: "전화·예약", desc: "즉시 전화 또는 온라인 예약" },
  { icon: <CalendarCheck className="h-5 w-5" />, label: "방문 준비사항", desc: "초진, 준비물, 소요 시간 안내" },
];

const principles = [
  { icon: <Shield className="h-4 w-4" />, title: "신뢰 형성 우선", desc: "과장 없이 전문성과 투명한 정보로 신뢰를 쌓는다" },
  { icon: <Smartphone className="h-4 w-4" />, title: "모바일 우선 설계", desc: "80% 이상의 방문이 모바일이라는 전제로 설계한다" },
  { icon: <Heart className="h-4 w-4" />, title: "환자 관점 정보 구조", desc: "의료기관이 보여주고 싶은 것이 아닌, 환자가 필요로 하는 것을 우선한다" },
  { icon: <MapPin className="h-4 w-4" />, title: "지역 기반 최적화", desc: "로컬 검색과 지도 기반 탐색에 최적화된 구조로 설계한다" },
];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="mb-12">
        <div className="guide-badge-info mb-4">내부 제작 기준서 v2.0</div>
        <SectionHeading
          tag="h1"
          sub="병원·의원 업종 고객사 프로젝트를 빠르고 일관성 있게 제작하기 위한 내부용 가이드 시스템. 디자인 시스템, UI/UX 패턴, 블록 기반 페이지 템플릿, 콘텐츠 가이드, 컴플라이언스 체크포인트, SEO/GEO 전략, 고객사 브리프 도구, 사이트 블루프린트 생성까지 한 곳에서 참조할 수 있습니다."
        >
          병원/의원 웹사이트 제작 가이드
        </SectionHeading>
      </section>

      {/* 환자가 가장 먼저 원하는 정보 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="병원/의원 사이트 방문자가 첫 화면에서 기대하는 핵심 정보 6가지">
          환자/보호자가 가장 먼저 확인하는 정보
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreInfo.map((item) => (
            <div key={item.label} className="guide-card flex items-start gap-3">
              <div className="text-accent mt-0.5">{item.icon}</div>
              <div>
                <p className="font-semibold text-sm text-card-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 핵심 디자인 원칙 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="이 가이드 전체를 관통하는 설계 원칙">
          핵심 디자인 원칙
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((p) => (
            <div key={p.title} className="guide-card-accent">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent">{p.icon}</span>
                <h3 className="font-semibold text-sm text-card-foreground">{p.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 가이드 메뉴 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="각 가이드 섹션으로 빠르게 이동하세요">
          가이드 구성
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickNav.map((item) => (
            <GuideCard key={item.to} title={item.title} description={item.desc} icon={item.icon} to={item.to} />
          ))}
        </div>
      </section>

      {/* 제작 도구 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="고객사 브리프 정리부터 사이트 구조 도출까지">
          제작 도구
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolNav.map((item) => (
            <GuideCard key={item.to} title={item.title} description={item.desc} icon={item.icon} to={item.to} variant="accent" />
          ))}
        </div>
      </section>

      {/* 공개용 사이트 추천 구조 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="실제 고객사 병원/의원 홈페이지의 권장 섹션 순서">
          공개용 사이트 추천 구조
        </SectionHeading>
        <div className="guide-card">
          <ol className="space-y-3 text-sm">
            {[
              "Hero — 어떤 진료를 하는 곳인지, 누구를 위한 곳인지 즉시 전달",
              "Quick Info Bar — 전화 / 진료시간 / 위치 / 예약",
              "진료과목 또는 주요 진료 — 카드형 빠른 탐색",
              "증상/상황별 안내 — 방문자 관점 진입",
              "의료진 소개 — 경력과 전문 분야 중심 신뢰 정보",
              "진료시간 / 휴진 / 방문안내",
              "시설/환경 미리보기 — 실제 공간 사진",
              "위치 / 주차 / 오시는 길",
              "FAQ — 자주 묻는 질문",
              "최종 CTA — 예약·전화·오시는 길",
              "Footer — 병원 정보, 법적 고지, 사이트맵",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                <span className="text-foreground/85">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 추천 제작 순서 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="새 프로젝트 착수 시 권장 진행 순서">
          추천 제작 순서
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { step: "1", title: "고객사 브리프 수집", desc: "Client Brief 도구로 병원 정보, 진료과, 브랜드 톤 정리" },
            { step: "2", title: "사이트 블루프린트 생성", desc: "브리프 기반 사이트 유형, 페이지 구조, CTA 전략 도출" },
            { step: "3", title: "디자인 시스템 적용", desc: "컬러, 타이포, 컴포넌트 토큰 설정" },
            { step: "4", title: "블록 기반 템플릿 적용", desc: "필수/선택/조건부 블록으로 페이지 조립" },
            { step: "5", title: "콘텐츠 작성·검수", desc: "카피 작성, 이미지 준비, 컴플라이언스 검토" },
            { step: "6", title: "SEO/GEO 최적화", desc: "메타, 구조화 데이터, 로컬 정보 일관성" },
            { step: "7", title: "QA 및 체크리스트", desc: "반응형, 접근성, 성능, 법률 최종 점검" },
            { step: "8", title: "런칭 및 모니터링", desc: "배포, 서치콘솔 등록, 초기 성과 모니터링" },
          ].map((item) => (
            <div key={item.step} className="guide-card flex items-start gap-3">
              <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">{item.step}</span>
              <div>
                <p className="font-semibold text-sm text-card-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 모바일 우선 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="의원급 사이트 방문의 80% 이상이 모바일에서 발생합니다">
          모바일 우선 설계 요약
        </SectionHeading>
        <div className="guide-notice-info">
          <ul className="space-y-2 text-sm">
            <li>• 하단 고정 CTA 바 (전화 / 예약 / 오시는 길) 필수</li>
            <li>• 전화번호 탭 시 즉시 발신 연결</li>
            <li>• 지도 탭 시 네이버 지도 / 카카오맵 앱 연동</li>
            <li>• 진료시간은 스크롤 없이 확인 가능한 위치</li>
            <li>• 폼 필드 최소화, 자동완성 활용</li>
            <li>• 이미지 지연 로딩, 핵심 텍스트 우선 렌더링</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="guide-section text-center">
        <p className="text-muted-foreground text-sm mb-4">
          각 가이드 섹션에서 상세 기준과 예시를 확인하세요.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/client-brief" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity">
            고객사 브리프 시작
          </a>
          <a href="/design-guide" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            디자인 가이드 보기
          </a>
          <a href="/checklist" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground hover:bg-secondary transition-colors">
            체크리스트 보기
          </a>
        </div>
      </section>
    </div>
  );
}
