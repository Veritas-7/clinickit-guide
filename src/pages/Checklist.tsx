import { useLocation } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
import { PageNavigation } from "@/components/PageNavigation";
import { PageToc, type TocItem } from "@/components/PageToc";
import { Check, Square } from "lucide-react";
import { useState } from "react";

const tocItems: TocItem[] = [
  { id: "pre-build", label: "제작 전 체크리스트" },
  { id: "design-qa", label: "디자인 검수" },
  { id: "ui-qa", label: "UI 검수" },
  { id: "ux-qa", label: "UX 검수" },
  { id: "mobile-qa", label: "모바일 검수" },
  { id: "content-qa", label: "콘텐츠 검수" },
  { id: "compliance-qa", label: "컴플라이언스 검수" },
  { id: "seo-qa", label: "SEO/GEO 체크리스트" },
  { id: "launch", label: "런칭 전 최종 점검" },
];

interface ChecklistSectionProps {
  id: string;
  title: string;
  items: string[];
}

function ChecklistSection({ id, title, items }: ChecklistSectionProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setChecked((prev) => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; });
  };
  const total = items.length;
  const done = checked.size;

  return (
    <section id={id} className="scroll-mt-16">
      <div className="guide-card mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-card-foreground">{title}</h3>
          <span className="text-xs text-muted-foreground">{done}/{total}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5 mb-3">
          <div className="h-1.5 rounded-full transition-all" style={{ width: `${total ? (done / total) * 100 : 0}%`, background: "hsl(var(--accent))" }} />
        </div>
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 cursor-pointer py-1 hover:bg-surface rounded px-1 -mx-1 transition-colors" onClick={() => toggle(i)}>
              {checked.has(i) ? <Check className="h-4 w-4 mt-0.5 shrink-0 text-success" /> : <Square className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />}
              <span className={`text-sm leading-relaxed ${checked.has(i) ? "line-through text-muted-foreground" : "text-foreground/85"}`}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Checklist() {
  const { pathname } = useLocation();
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 웹사이트 제작의 각 단계별 실무 체크리스트. 체크 표시를 클릭하여 진행 상황을 확인할 수 있습니다."
      >
        실무 체크리스트
      </SectionHeading>

      <div className="guide-notice-info mb-6">
        <p className="text-sm font-semibold mb-1">📋 핵심 요약</p>
        <ul className="text-sm space-y-0.5">
          <li>• 9개 카테고리, 총 80+ 점검 항목</li>
          <li>• 각 항목을 클릭하면 체크/해제 (페이지 이탈 시 초기화)</li>
          <li>• 제작 전 → 디자인 → UI → UX → 모바일 → 콘텐츠 → 컴플라이언스 → SEO → 런칭 순서</li>
        </ul>
      </div>

      <div className="guide-notice-success mb-8">
        <p className="text-sm font-semibold mb-1">⚡ 빠른 적용 포인트</p>
        <ul className="text-sm space-y-0.5">
          <li>• 필수 우선: 디자인/UI/모바일/SEO 항목 먼저 점검</li>
          <li>• 컴플라이언스 항목은 법률 전문가 최종 검토 필수</li>
          <li>• 런칭 전 최종 점검은 모든 카테고리 완료 후 수행</li>
        </ul>
      </div>

      <PageToc items={tocItems} />

      <div className="guide-section">
        <ChecklistSection id="pre-build" title="📋 제작 전 체크리스트" items={[
          "고객사 병원/의원 기본 정보 수집 (병원명, 주소, 전화, 진료시간)",
          "진료과목 및 주요 서비스 목록 확정",
          "의료진 정보 수집 (이름, 사진, 경력, 자격)",
          "타깃 환자층 및 지역 범위 정의",
          "경쟁 분석 (같은 지역 유사 의료기관 사이트 벤치마크)",
          "필요 페이지 목록 확정",
          "콘텐츠 수집 계획 수립 (사진, 텍스트, 로고 등)",
          "도메인 및 호스팅 준비",
        ]} />

        <ChecklistSection id="design-qa" title="🎨 디자인 검수 체크리스트" items={[
          "컬러 시스템이 디자인 가이드 토큰과 일치하는가",
          "타이포그래피 스케일이 일관성 있게 적용되었는가",
          "간격 시스템이 통일되어 있는가",
          "카드, 버튼, 폼 등 컴포넌트 스타일이 일관적인가",
          "이미지가 실제 병원 자산이며 적절한 품질인가",
          "과장된 시각 효과나 광고 랜딩 스타일이 없는가",
          "브랜드 톤(신뢰, 차분, 전문성)에 부합하는가",
          "충분한 여백과 정보 위계가 확보되었는가",
        ]} />

        <ChecklistSection id="ui-qa" title="🧩 UI 검수 체크리스트" items={[
          "Quick Info Bar에 전화, 진료시간, 위치가 노출되는가",
          "헤더에 핵심 내비게이션과 CTA가 있는가",
          "히어로에서 어떤 진료를 하는 곳인지 즉시 이해되는가",
          "진료과목이 카드형으로 빠르게 탐색 가능한가",
          "의료진 카드에 사진, 이름, 전공, 핵심 경력이 있는가",
          "진료시간/휴진 정보가 테이블 형태로 명확한가",
          "전화 CTA가 tel: 링크로 동작하는가",
          "지도/오시는 길이 앱 연동 가능한가",
          "FAQ 아코디언이 접기/펼치기 동작하는가",
          "모바일 하단 고정 CTA 바가 동작하는가",
          "버튼, 폼, 링크의 hover/focus/active/disabled 상태가 있는가",
          "푸터에 병원 정보, 법적 고지가 포함되어 있는가",
        ]} />

        <ChecklistSection id="ux-qa" title="🔄 UX 검수 체크리스트" items={[
          "첫 화면에서 무슨 곳 / 어디 / 무엇을 할 수 있는지 3초 내 이해 가능한가",
          "진료과목 → 의료진 → 진료시간 → 예약 흐름이 자연스러운가",
          "CTA 문구가 구체적이고 모호하지 않은가",
          "예약 폼 필드가 최소화되어 있는가",
          "불안을 자극하는 표현이 없는가",
          "자가진단 오해를 유발하는 흐름이 없는가",
          "반복 방문자를 위한 빠른 액션이 가능한가",
          "정보 위계가 스캔하기 쉽게 설계되었는가",
        ]} />

        <ChecklistSection id="mobile-qa" title="📱 모바일 검수 체크리스트" items={[
          "하단 고정 CTA 바가 표시되는가",
          "전화번호 탭 시 즉시 발신되는가",
          "지도 탭 시 네이버 지도/카카오맵 앱이 실행되는가",
          "진료시간이 스크롤 없이 확인 가능한 위치에 있는가",
          "폼에 적절한 input type과 autocomplete이 설정되어 있는가",
          "이미지가 지연 로딩(lazy loading)되는가",
          "터치 대상 크기가 최소 44x44px인가",
          "가로 스크롤이 의도치 않게 발생하지 않는가",
          "텍스트가 줌 없이 읽히는 크기인가",
        ]} />

        <ChecklistSection id="content-qa" title="✍️ 콘텐츠 검수 체크리스트" items={[
          "모든 텍스트가 실제 병원 정보인가 (Lorem ipsum 없음)",
          "진료과목 설명이 쉬운 언어로 작성되었는가",
          "의료진 정보가 사실에 기반하는가",
          "CTA 문구가 구체적인가",
          "과장/단정/공포 유발 표현이 없는가",
          "FAQ가 실제 환자 관점에서 작성되었는가",
          "이미지 alt text가 모두 작성되었는가",
        ]} />

        <ChecklistSection id="compliance-qa" title="⚖️ 컴플라이언스 검수 체크리스트" items={[
          "의료진 자격/경력/수상 정보가 사실 확인되었는가",
          "치료 결과를 단정하는 표현이 없는가",
          "비교/우월 표현이 없는가",
          "후기/사례가 환자 동의를 받았는가",
          "비포/애프터 사진이 적절히 사용되었는가",
          "비급여 가격이 정확하게 표시되었는가",
          "개인정보 수집/이용 동의 절차가 포함되어 있는가",
          "이벤트/프로모션 내용이 법적 요건을 충족하는가",
          "법률/광고 전문가 최종 검토가 완료되었는가",
        ]} />

        <ChecklistSection id="seo-qa" title="🔍 SEO/GEO 체크리스트" items={[
          "모든 페이지에 고유한 title과 meta description이 있는가",
          "H1이 페이지당 1개이며 핵심 키워드를 포함하는가",
          "canonical 태그가 모든 페이지에 적용되었는가",
          "sitemap.xml이 생성되었는가",
          "robots.txt가 적절히 설정되었는가",
          "Open Graph / Twitter 메타가 설정되었는가",
          "JSON-LD 구조화 데이터가 적용되었는가 (MedicalBusiness, FAQPage 등)",
          "NAP(병원명/주소/전화) 정보가 사이트 전체에서 일관적인가",
          "이미지에 의미 있는 alt text가 있는가",
          "내부 링크 구조가 설계되었는가",
          "네이버 서치어드바이저/Google Search Console에 등록되었는가",
        ]} />

        <ChecklistSection id="launch" title="🚀 런칭 전 최종 점검" items={[
          "모든 페이지 링크가 정상 동작하는가 (404 없음)",
          "반응형 테스트 완료 (모바일, 태블릿, 데스크톱)",
          "크로스 브라우저 테스트 완료 (Chrome, Safari, 삼성 인터넷)",
          "페이지 로딩 속도 확인 (LCP < 2.5초)",
          "SSL 인증서 적용 확인",
          "favicon 설정 완료",
          "404 커스텀 페이지 설정",
          "Analytics/추적 코드 설치",
          "서치콘솔/서치어드바이저 사이트맵 제출",
          "네이버 플레이스/카카오맵 정보 일치 확인",
          "최종 법률/광고 검수 완료",
          "백업 및 롤백 계획 수립",
        ]} />
      </div>

      <PageNavigation currentPath={pathname} />
    </div>
  );
}
