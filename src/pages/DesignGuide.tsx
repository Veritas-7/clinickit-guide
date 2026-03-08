import { useLocation } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
import { PageNavigation } from "@/components/PageNavigation";
import { PageToc, type TocItem } from "@/components/PageToc";
import { CopyBlock } from "@/components/CopyBlock";

const tocItems: TocItem[] = [
  { id: "tone", label: "브랜드 톤 & 비주얼 키워드" },
  { id: "color", label: "컬러 시스템" },
  { id: "typography", label: "타이포그래피" },
  { id: "spacing", label: "간격 시스템" },
  { id: "border-shadow", label: "라운드, 보더, 그림자" },
  { id: "photo", label: "사진 & 이미지 스타일" },
  { id: "a11y", label: "접근성 & 가독성" },
  { id: "forbidden", label: "금지 시각 표현" },
];

const colorTokens = [
  { name: "Primary (Navy)", token: "--primary", hsl: "215 50% 23%", use: "주요 헤더, 버튼, 강조" },
  { name: "Accent (Teal)", token: "--accent", hsl: "185 45% 38%", use: "포인트 컬러, 링크, 아이콘" },
  { name: "Background", token: "--background", hsl: "210 20% 99%", use: "페이지 배경" },
  { name: "Surface", token: "--surface", hsl: "210 15% 97%", use: "카드 배경, 섹션 구분" },
  { name: "Foreground", token: "--foreground", hsl: "220 25% 12%", use: "본문 텍스트" },
  { name: "Muted", token: "--muted-foreground", hsl: "215 15% 45%", use: "보조 텍스트, 캡션" },
  { name: "Border", token: "--border", hsl: "215 15% 90%", use: "구분선, 카드 테두리" },
  { name: "Info", token: "--info", hsl: "200 75% 45%", use: "안내, 정보 배지" },
  { name: "Success", token: "--success", hsl: "155 55% 38%", use: "완료, 확인 상태" },
  { name: "Warning", token: "--warning", hsl: "40 85% 50%", use: "주의, 검토 필요" },
  { name: "Emergency", token: "--emergency", hsl: "0 70% 50%", use: "긴급 안내, 에러" },
  { name: "Review Required", token: "--review-required", hsl: "35 90% 50%", use: "컴플라이언스 검토 필요 표시" },
];

const typoScale = [
  { name: "Display", size: "30–36px", weight: "700", use: "히어로 제목", line: "1.2" },
  { name: "H1", size: "24–28px", weight: "700", use: "페이지 제목", line: "1.3" },
  { name: "H2", size: "20–24px", weight: "600", use: "섹션 제목", line: "1.35" },
  { name: "H3", size: "17–20px", weight: "600", use: "카드 제목, 서브섹션", line: "1.4" },
  { name: "Body", size: "15–16px", weight: "400", use: "본문 텍스트", line: "1.65" },
  { name: "Body SM", size: "13–14px", weight: "400", use: "보조 설명, 캡션", line: "1.55" },
  { name: "Caption", size: "11–12px", weight: "500", use: "배지, 라벨, 메타", line: "1.4" },
];

export default function DesignGuide() {
  const { pathname } = useLocation();
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 업종에 최적화된 디자인 시스템. 신뢰, 가독성, 접근성을 기본으로 하며 다양한 진료과에 재사용 가능합니다."
      >
        디자인 가이드
      </SectionHeading>

      {/* 핵심 요약 */}
      <div className="guide-notice-info mb-6">
        <p className="text-sm font-semibold mb-1">📋 핵심 요약</p>
        <ul className="text-sm space-y-0.5">
          <li>• 네이비(Primary) + 틸(Accent) 컬러 시스템, HSL 토큰 기반</li>
          <li>• Noto Sans KR + Inter 서체 조합, 15px 본문 최소</li>
          <li>• 실제 의료진/시설 사진만 사용, 스톡사진 금지</li>
          <li>• WCAG AA 대비 4.5:1 이상, 색상만으로 정보 구분 금지</li>
        </ul>
      </div>

      {/* 빠른 적용 포인트 */}
      <div className="guide-notice-success mb-8">
        <p className="text-sm font-semibold mb-1">⚡ 빠른 적용 포인트</p>
        <ul className="text-sm space-y-0.5">
          <li>• CSS 변수(<code className="guide-code">--primary</code>, <code className="guide-code">--accent</code> 등)만 교체하면 전체 테마 변경 가능</li>
          <li>• 간격은 4px 배수 시스템 (xs=4, sm=8, md=16, lg=24, xl=32)</li>
          <li>• 의료진 사진 비율 3:4 / 시설 사진 비율 16:9</li>
        </ul>
      </div>

      <PageToc items={tocItems} />

      <section id="tone" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">브랜드 톤 & 비주얼 키워드</SectionHeading>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Trustworthy", "Calm", "Precise", "Accessible", "Modern", "Reassuring", "Professional", "Information-driven", "Clean but warm"].map((kw) => (
            <span key={kw} className="guide-badge-info">{kw}</span>
          ))}
        </div>
        <div className="guide-prose">
          <p>병원/의원 웹사이트는 방문자에게 전문성과 안정감을 동시에 전달해야 합니다. 과장된 광고 톤이 아닌, 차분하고 명확한 정보 중심의 비주얼이 핵심입니다.</p>
          <p>지나치게 차갑거나 무기질적인 느낌은 피하되, 뷰티 클리닉처럼 화려한 시각 연출도 지양합니다. "병원 소개 브로셔"와 "현대적 웹 인터페이스"의 중간 지점을 목표로 합니다.</p>
        </div>
      </section>

      {/* 컬러 시스템 */}
      <section id="color" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2" sub="모든 컬러는 HSL 기반 CSS 변수(토큰)로 관리합니다">
          컬러 시스템
        </SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>이름</th><th>토큰</th><th>HSL</th><th>용도</th><th>샘플</th></tr>
            </thead>
            <tbody>
              {colorTokens.map((c) => (
                <tr key={c.token}>
                  <td className="font-medium text-sm">{c.name}</td>
                  <td><code className="guide-code">{c.token}</code></td>
                  <td className="text-xs text-muted-foreground">{c.hsl}</td>
                  <td className="text-sm">{c.use}</td>
                  <td><div className="h-6 w-12 rounded border border-border" style={{ background: `hsl(${c.hsl})` }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CopyBlock
          label="CSS 변수 적용 예시"
          language="CSS"
          content={`:root {
  --primary: 215 50% 23%;
  --accent: 185 45% 38%;
  --background: 210 20% 99%;
  --surface: 210 15% 97%;
}`}
        />
        <div className="guide-notice-warning mt-4">
          <p className="text-sm"><strong>금지:</strong> 형광색, 과한 그라디언트, 과장된 시각효과. 의료기관 신뢰감을 해치는 컬러 사용을 피합니다.</p>
        </div>
      </section>

      {/* 타이포그래피 */}
      <section id="typography" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2" sub="Noto Sans KR을 기본 서체로, Inter를 영문 보조 서체로 사용합니다">
          타이포그래피 시스템
        </SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>역할</th><th>크기</th><th>Weight</th><th>Line Height</th><th>용도</th></tr>
            </thead>
            <tbody>
              {typoScale.map((t) => (
                <tr key={t.name}>
                  <td className="font-medium">{t.name}</td>
                  <td>{t.size}</td>
                  <td>{t.weight}</td>
                  <td>{t.line}</td>
                  <td className="text-sm text-muted-foreground">{t.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CopyBlock
          label="서체 적용 예시"
          language="CSS"
          content={`body {
  font-family: 'Noto Sans KR', 'Inter', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.65;
}`}
        />
      </section>

      {/* 간격 */}
      <section id="spacing" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">간격 시스템 (Spacing)</SectionHeading>
        <div className="guide-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              { name: "xs", value: "4px", use: "인라인 간격" },
              { name: "sm", value: "8px", use: "요소 내부 간격" },
              { name: "md", value: "16px", use: "카드 내부 패딩" },
              { name: "lg", value: "24px", use: "섹션 내부 간격" },
              { name: "xl", value: "32px", use: "섹션 간 간격" },
              { name: "2xl", value: "48px", use: "주요 섹션 구분" },
              { name: "3xl", value: "64px", use: "페이지 상하 여백" },
              { name: "4xl", value: "96px", use: "히어로 섹션 패딩" },
            ].map((s) => (
              <div key={s.name} className="flex flex-col">
                <span className="font-semibold">{s.name}</span>
                <span className="text-muted-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.use}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 라운드, 보더, 그림자 */}
      <section id="border-shadow" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">라운드, 보더, 그림자</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">Border Radius</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>sm: 4px — 배지, 태그</li>
              <li>md: 6px — 입력 필드, 작은 카드</li>
              <li>lg: 8px — 일반 카드, 버튼</li>
              <li>xl: 12px — 큰 카드, 모달</li>
              <li>full: 999px — 아바타, 칩</li>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">Border</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>기본: 1px solid border 토큰</li>
              <li>강조: 좌측 3px accent 보더</li>
              <li>에러: 1px solid emergency 토큰</li>
              <li>포커스: 2px ring 토큰</li>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">Shadow</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>sm: 0 1px 2px rgba(0,0,0,0.05)</li>
              <li>md: 0 4px 12px rgba(0,0,0,0.08)</li>
              <li>lg: 0 8px 24px rgba(0,0,0,0.1)</li>
              <li>사용 원칙: 정보 위계 구분에만 사용</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 사진 스타일 가이드 */}
      <section id="photo" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">사진 & 이미지 스타일 가이드</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">의료진 사진</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 실제 의료진 사진만 사용 (스톡 사진 금지)</li>
              <li>• 깔끔한 배경, 자연스러운 표정</li>
              <li>• 과도한 보정 금지</li>
              <li>• 가운/유니폼 착용 자연스러운 모습</li>
              <li>• <span className="guide-badge-info text-[10px]">필수</span> 비율: 3:4 또는 1:1</li>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">시설/공간 사진</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 실제 진료실, 대기실 촬영</li>
              <li>• 밝고 청결한 인상</li>
              <li>• 과시적 연출 금지</li>
              <li>• 환자 동선이 느껴지는 구도</li>
              <li>• <span className="guide-badge-info text-[10px]">필수</span> 비율: 16:9 또는 4:3</li>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">장비 사진</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 실제 보유 장비만 촬영</li>
              <li>• 용도 설명과 함께 배치</li>
              <li>• <span className="guide-badge-warning text-[10px]">금지</span> 장비 나열식 과시</li>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">아이콘 & 일러스트</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 라인 아이콘 스타일 통일</li>
              <li>• 단색 또는 2색 이내</li>
              <li>• 일러스트는 정보 보조 목적에 한해 사용</li>
              <li>• <span className="guide-badge-warning text-[10px]">금지</span> 과장된 캐릭터/이모지 스타일</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 접근성 */}
      <section id="a11y" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">접근성 & 가독성 원칙</SectionHeading>
        <div className="guide-notice-info">
          <ul className="space-y-2 text-sm">
            <li>• 텍스트 대비 최소 4.5:1 (WCAG AA), 대형 텍스트 3:1</li>
            <li>• 모든 인터랙티브 요소에 focus 상태 제공</li>
            <li>• 이미지에 의미 있는 alt text 필수</li>
            <li>• 버튼과 링크는 역할이 명확히 구분</li>
            <li>• 본문 최소 15px, 줄 간격 1.5 이상</li>
            <li>• 색상만으로 정보를 구분하지 않기 (아이콘/텍스트 병행)</li>
          </ul>
        </div>
      </section>

      {/* 금지 시각 표현 */}
      <section id="forbidden" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2" badge={<span className="guide-badge-emergency">금지</span>}>
          금지해야 할 시각 표현
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "형광색, 네온 컬러",
            "과도한 그라디언트·글래스모피즘",
            "과장된 비포/애프터 연출",
            "스톡 사진의 과도한 사용",
            "환자 불안을 자극하는 이미지",
            "광고 랜딩페이지 스타일 레이아웃",
            "장식적 애니메이션 남용",
            "의료진/시설 과시적 연출",
          ].map((item) => (
            <div key={item} className="guide-notice-warning text-sm">{item}</div>
          ))}
        </div>
      </section>

      <PageNavigation currentPath={pathname} />
    </div>
  );
}
