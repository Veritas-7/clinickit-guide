import { SectionHeading } from "@/components/SectionHeading";
import { uiComponents, type UiComponentDef } from "@/data/uiComponentDefinitions";
import { Phone, Clock, MapPin, Calendar, ChevronRight, ChevronDown, Star, Menu, ArrowRight, Search, AlertCircle, CheckCircle2, XCircle, Image, FileText, Navigation, Hash } from "lucide-react";
import { useState } from "react";

// Table of contents anchors
const tocSections = [
  { id: "quick-ref", label: "빠른 참조표" },
  { id: "demos", label: "컴포넌트 데모" },
];

function ConversionBadge({ impact }: { impact: string }) {
  const cls = impact === "high" ? "guide-badge-emergency" : impact === "medium" ? "guide-badge-warning" : "guide-badge-success";
  return <span className={`${cls} text-[10px]`}>전환 {impact === "high" ? "높음" : impact === "medium" ? "중간" : "낮음"}</span>;
}

function ComponentDetail({ comp }: { comp: UiComponentDef }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm mt-3">
      <div><span className="font-medium text-foreground">사용 목적:</span> <span className="text-muted-foreground">{comp.purpose}</span></div>
      <div><span className="font-medium text-foreground">사용 위치:</span> <span className="text-muted-foreground">{comp.where}</span></div>
      <div><span className="font-medium text-foreground">사용 금지:</span> <span className="text-muted-foreground">{comp.notWhen}</span></div>
      <div><span className="font-medium text-foreground">데스크톱:</span> <span className="text-muted-foreground">{comp.desktopNote}</span></div>
      <div><span className="font-medium text-foreground">모바일:</span> <span className="text-muted-foreground">{comp.mobileNote}</span></div>
      {comp.textLength && <div><span className="font-medium text-foreground">권장 텍스트:</span> <span className="text-muted-foreground">{comp.textLength}</span></div>}
      <div><span className="font-medium text-foreground">접근성:</span> <span className="text-muted-foreground">{comp.a11y}</span></div>
      <div><span className="font-medium text-foreground">SEO 관련:</span> <span className="text-muted-foreground">{comp.seoRelevant ? "예" : "아니오"}</span></div>
      <div><span className="font-medium text-foreground">필수/선택:</span> <span className="text-muted-foreground">{comp.required ? "필수" : "선택"}</span></div>
    </div>
  );
}

// Demo components for visual examples
function QuickInfoBarDemo() {
  return (
    <div className="bg-primary text-primary-foreground rounded-lg p-3 text-sm flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> 02-1234-5678</span>
        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 평일 09:00–18:00</span>
        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> 서울 강남구 역삼동</span>
      </div>
      <span className="flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-medium">
        <Calendar className="h-3 w-3" /> 예약하기
      </span>
    </div>
  );
}

function HeaderDemo() {
  return (
    <div className="bg-card border rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">H</div>
        <span className="font-semibold text-sm text-card-foreground">OO의원</span>
      </div>
      <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
        <span>진료과목</span><span>의료진</span><span>진료안내</span><span>오시는 길</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden md:inline-flex items-center gap-1 text-sm bg-accent text-accent-foreground px-3 py-1.5 rounded font-medium">예약하기</span>
        <Menu className="h-5 w-5 md:hidden text-muted-foreground" />
      </div>
    </div>
  );
}

function HeroDemo() {
  return (
    <div className="bg-primary rounded-lg p-6 md:p-8 text-primary-foreground">
      <p className="text-xs opacity-70 mb-2">예시 데이터</p>
      <h2 className="text-xl md:text-2xl font-bold mb-2">가족 모두의 건강을 함께합니다</h2>
      <p className="text-sm opacity-80 mb-4">내과·가정의학과 전문의 진료 | 평일 야간 진료 가능</p>
      <div className="flex gap-2">
        <span className="bg-accent text-accent-foreground px-4 py-2 rounded text-sm font-medium">진료 예약</span>
        <span className="border border-primary-foreground/30 px-4 py-2 rounded text-sm">진료과목 보기</span>
      </div>
    </div>
  );
}

function DepartmentCardDemo() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {["내과", "가정의학과", "소아청소년과", "건강검진"].map((dept) => (
        <div key={dept} className="bg-surface rounded-lg p-4 text-center hover:shadow-sm transition-shadow cursor-pointer border border-border/50">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
            <Star className="h-5 w-5 text-accent" />
          </div>
          <p className="font-medium text-sm text-card-foreground">{dept}</p>
          <p className="text-xs text-muted-foreground mt-0.5">전문의 진료</p>
        </div>
      ))}
    </div>
  );
}

function SymptomCardDemo() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { symptom: "기침이 오래갈 때", dept: "호흡기내과" },
        { symptom: "허리·관절 통증", dept: "정형외과" },
        { symptom: "소화가 안 될 때", dept: "소화기내과" },
        { symptom: "아이가 열이 날 때", dept: "소아청소년과" },
      ].map((s) => (
        <div key={s.symptom} className="bg-surface rounded-lg p-3 border border-border/50 hover:shadow-sm cursor-pointer transition-shadow">
          <p className="font-medium text-sm text-card-foreground">{s.symptom}</p>
          <p className="text-xs text-accent mt-1">{s.dept} →</p>
        </div>
      ))}
    </div>
  );
}

function DoctorCardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {[
        { name: "홍길동", title: "원장 | 내과 전문의", career: "OO대학교 의과대학 졸업 · OO병원 내과 전공의 수련" },
        { name: "김의사", title: "부원장 | 가정의학과 전문의", career: "OO의대 졸업 · OO대학병원 가정의학과 전임의" },
      ].map((doc) => (
        <div key={doc.name} className="bg-surface rounded-lg p-4 flex items-start gap-4 border border-border/50">
          <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <span className="text-muted-foreground text-xs">사진</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-card-foreground">{doc.name}</p>
            <p className="text-xs text-accent font-medium">{doc.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{doc.career}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DoctorDetailDemo() {
  return (
    <div className="bg-surface rounded-lg p-5 border border-border/50 flex flex-col md:flex-row gap-5">
      <div className="h-40 w-32 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <span className="text-muted-foreground text-xs">프로필 사진</span>
      </div>
      <div>
        <h4 className="font-bold text-base text-card-foreground">홍길동 원장</h4>
        <p className="text-sm text-accent font-medium mb-2">내과 전문의</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• OO대학교 의과대학 졸업</li>
          <li>• OO병원 내과 전공의 수련</li>
          <li>• 대한내과학회 정회원</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-3 italic">"지역 주민분들의 건강을 가까이에서 함께하겠습니다."</p>
      </div>
    </div>
  );
}

function HoursBlockDemo() {
  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-border/50">
      <table className="w-full text-sm">
        <caption className="sr-only">진료시간 안내</caption>
        <thead><tr className="bg-secondary"><th scope="col" className="px-4 py-2 text-left font-medium">요일</th><th scope="col" className="px-4 py-2 text-left font-medium">진료시간</th><th scope="col" className="px-4 py-2 text-left font-medium">비고</th></tr></thead>
        <tbody>
          <tr className="border-t border-border/40"><td className="px-4 py-2">월–금</td><td className="px-4 py-2">09:00–18:00</td><td className="px-4 py-2 text-muted-foreground">점심 13:00–14:00</td></tr>
          <tr className="border-t border-border/40"><td className="px-4 py-2">토요일</td><td className="px-4 py-2">09:00–13:00</td><td className="px-4 py-2 text-muted-foreground">오전 진료</td></tr>
          <tr className="border-t border-border/40"><td className="px-4 py-2">일·공휴일</td><td className="px-4 py-2 text-emergency font-medium">휴진</td><td className="px-4 py-2"></td></tr>
        </tbody>
      </table>
    </div>
  );
}

function CtaBlockDemo() {
  return (
    <div className="bg-primary rounded-lg p-6 text-primary-foreground text-center">
      <p className="text-xs opacity-70 mb-1">예시 데이터</p>
      <h3 className="font-bold text-lg mb-1">지금 바로 진료 예약하세요</h3>
      <p className="text-sm opacity-80 mb-4">전화 상담 또는 온라인 예약이 가능합니다</p>
      <div className="flex flex-wrap justify-center gap-3">
        <span className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5"><Phone className="h-4 w-4" /> 전화 문의</span>
        <span className="bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5"><Calendar className="h-4 w-4" /> 온라인 예약</span>
        <span className="bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5"><MapPin className="h-4 w-4" /> 오시는 길</span>
      </div>
    </div>
  );
}

function MobileFixedCtaDemo() {
  return (
    <div className="bg-card border-t-2 border-accent rounded-b-lg p-2 flex items-center justify-around max-w-sm mx-auto">
      {[
        { icon: <Phone className="h-5 w-5" />, label: "전화" },
        { icon: <Calendar className="h-5 w-5" />, label: "예약" },
        { icon: <MapPin className="h-5 w-5" />, label: "오시는 길" },
        { icon: <Clock className="h-5 w-5" />, label: "진료시간" },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1 py-1.5 px-3 text-accent cursor-pointer">
          {item.icon}
          <span className="text-[10px] font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function LocationMapDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-muted rounded-lg h-48 flex items-center justify-center border border-border/50">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">지도 임베드 영역</p>
          <p className="text-xs">(네이버 지도 / 카카오맵)</p>
        </div>
      </div>
      <div className="bg-surface rounded-lg p-4 border border-border/50 text-sm space-y-2">
        <p className="font-semibold text-card-foreground">OO의원</p>
        <p className="text-muted-foreground">서울 강남구 역삼동 123-45 OO빌딩 3층</p>
        <p className="text-muted-foreground">Tel. 02-1234-5678</p>
        <hr className="border-border/50" />
        <p className="text-muted-foreground">🚇 역삼역 3번 출구 도보 3분</p>
        <p className="text-muted-foreground">🅿️ 건물 지하 주차장 (진료 시 2시간 무료)</p>
        <div className="flex gap-2 pt-1">
          <span className="bg-accent text-accent-foreground px-3 py-1.5 rounded text-xs font-medium">지도 앱 열기</span>
          <span className="border border-border px-3 py-1.5 rounded text-xs">주소 복사</span>
        </div>
      </div>
    </div>
  );
}

function FacilityGalleryDemo() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {["진료실", "대기실", "접수대", "외관"].map((name) => (
        <div key={name} className="bg-muted rounded-lg h-32 w-48 flex-shrink-0 flex items-center justify-center border border-border/50">
          <div className="text-center text-muted-foreground">
            <Image className="h-5 w-5 mx-auto mb-1" />
            <p className="text-xs">{name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function NoticeBannerDemo() {
  return (
    <div className="space-y-2">
      <div className="bg-warning/10 border-l-3 border-warning rounded-lg p-3 flex items-center justify-between" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(var(--warning))" }}>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-warning shrink-0" />
          <p className="text-sm"><strong>임시 휴진 안내:</strong> 2025년 1월 1일(수) 신정 휴진입니다.</p>
        </div>
        <button className="text-muted-foreground text-xs shrink-0">✕</button>
      </div>
      <div className="bg-emergency/10 rounded-lg p-3 flex items-center gap-2" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(var(--emergency))" }}>
        <AlertCircle className="h-4 w-4 text-emergency shrink-0" />
        <p className="text-sm"><strong>진료시간 변경:</strong> 12월 24일(화) 오전 진료만 운영합니다.</p>
      </div>
    </div>
  );
}

function ReservationFormDemo() {
  return (
    <div className="bg-surface rounded-lg p-5 border border-border/50 max-w-md">
      <h4 className="font-semibold text-sm text-card-foreground mb-3">진료 예약</h4>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">이름 <span className="text-emergency">*</span></label>
          <input className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card" placeholder="이름을 입력하세요" readOnly />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">연락처 <span className="text-emergency">*</span></label>
          <input className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card" placeholder="010-0000-0000" readOnly />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">희망 일시</label>
          <input className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card" placeholder="예: 1월 15일 오전" readOnly />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">문의 내용</label>
          <textarea className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card h-16" placeholder="간단히 작성해 주세요" readOnly />
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="mt-0.5" readOnly />
          개인정보 수집·이용에 동의합니다. <span className="text-accent underline">전문보기</span>
        </label>
        <button className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg text-sm font-medium">예약 신청</button>
      </div>
    </div>
  );
}

function FaqAccordionDemo() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "초진 시 준비물이 있나요?", a: "신분증과 건강보험증을 지참해 주세요. 타 병원 검사 결과가 있다면 함께 가져오시면 도움이 됩니다." },
    { q: "주차가 가능한가요?", a: "건물 지하 주차장을 이용하실 수 있습니다. 진료 시 2시간 무료 주차가 가능합니다." },
    { q: "예약 없이 방문해도 되나요?", a: "예약 없이 방문하셔도 진료가 가능합니다. 다만 예약 환자가 우선 진료되므로 사전 예약을 권장합니다." },
  ];
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border/60 rounded-lg">
          <button
            className="w-full px-4 py-3 flex items-center justify-between text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-sm text-card-foreground">{faq.q}</span>
            {open === i ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </button>
          {open === i && <div className="px-4 pb-3 text-sm text-muted-foreground">{faq.a}</div>}
        </div>
      ))}
    </div>
  );
}

function NonCoveredTableDemo() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-border/50 rounded-lg overflow-hidden">
        <caption className="sr-only">비급여 항목 안내</caption>
        <thead><tr className="bg-secondary"><th scope="col" className="px-4 py-2 text-left font-medium">항목</th><th scope="col" className="px-4 py-2 text-left font-medium">가격</th><th scope="col" className="px-4 py-2 text-left font-medium">비고</th></tr></thead>
        <tbody>
          <tr className="border-t border-border/40"><td className="px-4 py-2">일반 건강검진</td><td className="px-4 py-2">80,000~150,000원</td><td className="px-4 py-2 text-muted-foreground">프로그램별 상이</td></tr>
          <tr className="border-t border-border/40"><td className="px-4 py-2">독감 예방접종</td><td className="px-4 py-2">30,000~40,000원</td><td className="px-4 py-2 text-muted-foreground">성인 기준</td></tr>
          <tr className="border-t border-border/40"><td className="px-4 py-2">영양 수액</td><td className="px-4 py-2">50,000~80,000원</td><td className="px-4 py-2 text-muted-foreground">종류별 상이</td></tr>
        </tbody>
      </table>
      <p className="text-xs text-warning mt-2">※ 예시 데이터입니다. 가격은 변동될 수 있으며, 정확한 가격은 내원 시 문의해 주세요. (최종 업데이트: 2025.01)</p>
    </div>
  );
}

function HealthArticleCardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {[
        { title: "겨울철 독감 예방법", date: "2025.01.10", cat: "건강정보" },
        { title: "고혈압 관리 Q&A", date: "2025.01.05", cat: "칼럼" },
        { title: "영유아 예방접종 시기", date: "2024.12.28", cat: "건강정보" },
      ].map((a) => (
        <div key={a.title} className="bg-surface rounded-lg p-4 border border-border/50 hover:shadow-sm cursor-pointer transition-shadow">
          <span className="guide-badge-info text-[10px]">{a.cat}</span>
          <h4 className="font-medium text-sm text-card-foreground mt-2">{a.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{a.date}</p>
        </div>
      ))}
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <div className="bg-surface rounded-lg p-8 border border-border/50 text-center">
      <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
      <p className="font-medium text-sm text-card-foreground">검색 결과가 없습니다</p>
      <p className="text-xs text-muted-foreground mt-1">다른 검색어로 시도해 보세요.</p>
      <button className="mt-3 border border-border px-4 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-secondary transition-colors">전체 목록 보기</button>
    </div>
  );
}

function ClosedStateDemo() {
  return (
    <div className="space-y-3">
      <div className="bg-clinic-closed/10 rounded-lg p-3 flex items-center gap-3" style={{ borderLeftWidth: 3, borderLeftColor: "hsl(var(--clinic-closed))" }}>
        <Clock className="h-4 w-4 text-clinic-closed shrink-0" />
        <div>
          <p className="text-sm font-medium" style={{ color: "hsl(var(--clinic-closed))" }}>현재 진료시간이 아닙니다</p>
          <p className="text-xs text-muted-foreground">평일 09:00부터 진료 가능합니다. 전화 예약은 진료시간에 가능합니다.</p>
        </div>
      </div>
      <div className="bg-card border-t-2 border-clinic-closed rounded-b-lg p-2 flex items-center justify-around max-w-sm mx-auto opacity-70">
        <div className="flex flex-col items-center gap-1 py-1.5 px-3 text-clinic-closed">
          <Phone className="h-5 w-5" />
          <span className="text-[10px] font-medium">진료시간 외</span>
        </div>
        <div className="flex flex-col items-center gap-1 py-1.5 px-3 text-accent">
          <MapPin className="h-5 w-5" />
          <span className="text-[10px] font-medium">오시는 길</span>
        </div>
        <div className="flex flex-col items-center gap-1 py-1.5 px-3 text-accent">
          <Clock className="h-5 w-5" />
          <span className="text-[10px] font-medium">진료시간</span>
        </div>
      </div>
    </div>
  );
}

function ButtonSystemDemo() {
  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">Primary</button>
        <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2">Accent</button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">Secondary</button>
        <button className="border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">Outline</button>
        <button className="text-accent text-sm font-medium flex items-center gap-1 focus:outline-none focus:underline">Text Link <ArrowRight className="h-3.5 w-3.5" /></button>
      </div>
      <div className="flex flex-wrap gap-3 mb-3">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed" disabled aria-disabled="true">Disabled</button>
        <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium ring-2 ring-accent/50 ring-offset-2">Focus 상태</button>
      </div>
    </div>
  );
}

function FormFieldDemo() {
  return (
    <div className="max-w-sm space-y-3">
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">이름 (기본)</label>
        <input className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent" placeholder="이름을 입력하세요" readOnly />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">연락처 (포커스)</label>
        <input className="w-full border-2 border-accent rounded-lg px-3 py-2 text-sm bg-card ring-2 ring-accent/20" placeholder="010-0000-0000" readOnly />
      </div>
      <div>
        <label className="text-sm font-medium text-emergency mb-1 block">이메일 (에러)</label>
        <input className="w-full border border-emergency rounded-lg px-3 py-2 text-sm bg-card" placeholder="올바른 이메일을 입력해 주세요" readOnly aria-invalid="true" />
        <p className="text-xs text-emergency mt-1" role="alert">이메일 형식이 올바르지 않습니다.</p>
      </div>
      <div>
        <label className="text-sm font-medium text-success mb-1 block">확인 완료 (성공)</label>
        <div className="relative">
          <input className="w-full border border-success rounded-lg px-3 py-2 text-sm bg-card pr-8" value="홍길동" readOnly />
          <CheckCircle2 className="h-4 w-4 text-success absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1 block">비활성 필드</label>
        <input className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-muted opacity-50 cursor-not-allowed" placeholder="입력 불가" disabled readOnly />
      </div>
    </div>
  );
}

function FooterDemo() {
  return (
    <div className="bg-primary text-primary-foreground rounded-lg p-5 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="font-semibold mb-1">OO의원</p>
          <p className="opacity-70 text-xs">서울 강남구 역삼동 123-45 OO빌딩 3층</p>
          <p className="opacity-70 text-xs">Tel. 02-1234-5678</p>
        </div>
        <div>
          <p className="font-semibold mb-1">진료시간</p>
          <p className="opacity-70 text-xs">평일 09:00–18:00 / 토 09:00–13:00</p>
          <p className="opacity-70 text-xs">점심 13:00–14:00 / 일·공휴일 휴진</p>
        </div>
        <div>
          <p className="font-semibold mb-1">바로가기</p>
          <p className="opacity-70 text-xs">진료과목 · 의료진 · 오시는 길 · 예약</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-primary-foreground/15 text-xs opacity-50">
        © 2025 OO의원. All rights reserved. ※ 예시 데이터입니다.
      </div>
    </div>
  );
}

function DepartmentTabsDemo() {
  const [active, setActive] = useState(0);
  const tabs = ["내과", "가정의학과", "소아청소년과", "건강검진"];
  return (
    <div>
      <div className="flex gap-1 border-b border-border overflow-x-auto" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${active === i ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm text-muted-foreground" role="tabpanel">
        {tabs[active]} 진료과에 대한 설명이 표시되는 영역입니다.
      </div>
    </div>
  );
}

function FilterChipDemo() {
  const [selected, setSelected] = useState("전체");
  const chips = ["전체", "진료", "예약", "방문", "비용"];
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="radiogroup" aria-label="FAQ 카테고리">
      {chips.map((chip) => (
        <button
          key={chip}
          role="radio"
          aria-checked={selected === chip}
          onClick={() => setSelected(chip)}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${selected === chip ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:bg-muted"}`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

function BreadcrumbDemo() {
  return (
    <nav aria-label="breadcrumb" className="text-xs text-muted-foreground flex items-center gap-1.5">
      <a href="#" className="hover:text-accent transition-colors">홈</a>
      <ChevronRight className="h-3 w-3" />
      <a href="#" className="hover:text-accent transition-colors">진료과목</a>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground font-medium" aria-current="page">내과</span>
    </nav>
  );
}

function PrivacyConsentDemo() {
  return (
    <div className="bg-surface rounded-lg p-4 border border-border/50 max-w-md space-y-2">
      <label className="flex items-start gap-2 text-sm cursor-pointer">
        <input type="checkbox" className="mt-1 accent-accent" readOnly />
        <span className="text-foreground"><span className="text-emergency">[필수]</span> 개인정보 수집·이용에 동의합니다. <a href="#" className="text-accent underline">전문보기</a></span>
      </label>
      <label className="flex items-start gap-2 text-sm cursor-pointer">
        <input type="checkbox" className="mt-1 accent-accent" readOnly />
        <span className="text-muted-foreground">[선택] 마케팅 정보 수신에 동의합니다.</span>
      </label>
    </div>
  );
}

// Map component IDs to demo components
const demoMap: Record<string, React.ReactNode> = {
  "quick-info-bar": <QuickInfoBarDemo />,
  "global-header": <HeaderDemo />,
  "hero": <HeroDemo />,
  "department-card": <DepartmentCardDemo />,
  "symptom-card": <SymptomCardDemo />,
  "doctor-card": <DoctorCardDemo />,
  "doctor-detail": <DoctorDetailDemo />,
  "hours-block": <HoursBlockDemo />,
  "cta-block": <CtaBlockDemo />,
  "mobile-fixed-cta": <MobileFixedCtaDemo />,
  "location-map": <LocationMapDemo />,
  "facility-gallery": <FacilityGalleryDemo />,
  "notice-banner": <NoticeBannerDemo />,
  "reservation-form": <ReservationFormDemo />,
  "privacy-consent": <PrivacyConsentDemo />,
  "faq-accordion": <FaqAccordionDemo />,
  "department-tabs": <DepartmentTabsDemo />,
  "filter-chips": <FilterChipDemo />,
  "info-table": <HoursBlockDemo />,
  "non-covered-table": <NonCoveredTableDemo />,
  "health-article-card": <HealthArticleCardDemo />,
  "empty-state": <EmptyStateDemo />,
  "closed-state": <ClosedStateDemo />,
  "phone-cta": null,
  "booking-cta": null,
  "directions-cta": null,
  "breadcrumb": <BreadcrumbDemo />,
  "button-system": <ButtonSystemDemo />,
  "form-fields": <FormFieldDemo />,
  "footer": <FooterDemo />,
};

export default function UiGuide() {
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 사이트에서 반복 사용되는 핵심 UI 패턴과 컴포넌트. 각 패턴별 사용 목적, 위치, 접근성, 전환 영향도, 컴플라이언스 검토 여부를 통일된 포맷으로 정리합니다."
      >
        UI 가이드
      </SectionHeading>

      {/* 빠른 요약 */}
      <div className="guide-notice-info mb-8">
        <p className="text-sm font-semibold mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-sm space-y-0.5">
          <li>• 총 <strong>{uiComponents.length}개</strong> 컴포넌트 · 필수 <strong>{uiComponents.filter(c => c.required).length}개</strong> / 선택 <strong>{uiComponents.filter(c => !c.required).length}개</strong></li>
          <li>• 모든 컴포넌트에 사용 목적, 위치, 금지 상황, 데스크톱/모바일 패턴, 접근성, 전환 영향도 포함</li>
          <li>• 예시 데이터는 실제 병원 정보가 아닙니다</li>
        </ul>
      </div>

      {/* Quick reference table */}
      <section id="quick-ref" className="guide-section">
        <SectionHeading tag="h2" sub="전체 컴포넌트의 필수 여부, 전환 영향도, 컴플라이언스 여부를 한눈에 확인">
          컴포넌트 빠른 참조표
        </SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr>
                <th>컴포넌트</th>
                <th>필수</th>
                <th>전환</th>
                <th>SEO</th>
                <th>검토</th>
              </tr>
            </thead>
            <tbody>
              {uiComponents.map(c => (
                <tr key={c.id}>
                  <td className="font-medium text-sm"><a href={`#comp-${c.id}`} className="text-accent hover:underline">{c.name}</a></td>
                  <td>{c.required ? <span className="guide-badge-info text-[10px]">필수</span> : <span className="text-xs text-muted-foreground">선택</span>}</td>
                  <td><ConversionBadge impact={c.conversionImpact} /></td>
                  <td>{c.seoRelevant ? "✓" : "—"}</td>
                  <td>{c.compliance ? <span className="guide-badge-review text-[10px]">검토</span> : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* All components */}
      <section id="demos" className="guide-section">
        <SectionHeading tag="h2">컴포넌트 상세</SectionHeading>

        {uiComponents.map(comp => {
          const demo = demoMap[comp.id];
          return (
            <div key={comp.id} id={`comp-${comp.id}`} className="guide-card mb-6 scroll-mt-20">
              <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                <h3 className="font-semibold text-base text-card-foreground">{comp.name}</h3>
                <div className="flex gap-1.5 flex-wrap">
                  {comp.required && <span className="guide-badge-info text-[10px]">필수</span>}
                  {comp.compliance && <span className="guide-badge-review text-[10px]">검토 필요</span>}
                  {comp.seoRelevant && <span className="guide-badge-info text-[10px]">SEO</span>}
                  <ConversionBadge impact={comp.conversionImpact} />
                </div>
              </div>

              {/* Demo */}
              {demo && (
                <div className="mb-4">
                  {demo}
                  <p className="text-xs text-muted-foreground mt-2">※ 예시 데이터입니다. 실제 병원 정보가 아닙니다.</p>
                </div>
              )}

              {/* Details grid */}
              <ComponentDetail comp={comp} />
            </div>
          );
        })}
      </section>
    </div>
  );
}
