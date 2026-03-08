import { SectionHeading } from "@/components/SectionHeading";
import { CheckItem } from "@/components/CheckItem";

export default function SeoGeo() {
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 웹사이트의 검색 최적화(SEO)와 지역 기반 탐색 최적화(GEO). 메타 데이터, URL 구조, 구조화 데이터, 로컬 SEO 전략을 다룹니다."
      >
        SEO / GEO 가이드
      </SectionHeading>

      {/* 메타 타이틀/디스크립션 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="각 페이지별 권장 메타 데이터 구조">
          메타 타이틀 & 디스크립션
        </SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>페이지</th><th>메타 타이틀 예시</th><th>메타 디스크립션 예시</th></tr>
            </thead>
            <tbody>
              {[
                { page: "홈", title: "[병원명] | [지역] [진료과] 전문의 진료", desc: "[지역] [진료과] 전문의가 진료하는 [병원명]. 진료시간, 오시는 길, 온라인 예약 안내." },
                { page: "진료과목", title: "진료과목 안내 | [병원명]", desc: "[병원명]의 진료과목을 확인하세요. 내과, 가정의학과, 건강검진 등 전문 진료를 제공합니다." },
                { page: "의료진", title: "의료진 소개 | [병원명]", desc: "[병원명] 의료진을 소개합니다. [전문의 수]명의 전문의가 진료합니다." },
                { page: "오시는 길", title: "오시는 길 · 주차 안내 | [병원명]", desc: "[병원명] 위치, 교통편, 주차 안내. [지하철역] [출구번호] 도보 [분]분." },
                { page: "예약", title: "진료 예약 | [병원명]", desc: "[병원명] 온라인 진료 예약. 전화 [번호]로도 예약 가능합니다." },
              ].map((row) => (
                <tr key={row.page}>
                  <td className="font-medium">{row.page}</td>
                  <td className="text-sm">{row.title}</td>
                  <td className="text-sm text-muted-foreground">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">※ [괄호] 안의 내용은 실제 병원 정보로 교체합니다. 타이틀 60자 이내, 디스크립션 160자 이내.</p>
      </section>

      {/* URL 구조 */}
      <section className="guide-section">
        <SectionHeading tag="h2">URL 구조 예시</SectionHeading>
        <div className="guide-card">
          <div className="space-y-1 text-sm font-mono">
            {[
              "/",
              "/departments",
              "/departments/internal-medicine",
              "/doctors",
              "/doctors/hong-gildong",
              "/symptoms/persistent-cough",
              "/visit-info",
              "/location",
              "/reservation",
              "/faq",
              "/notice",
              "/health-info",
              "/health-info/managing-hypertension",
              "/non-covered-services",
            ].map((url) => (
              <p key={url} className="text-muted-foreground"><code className="guide-code">{url}</code></p>
            ))}
          </div>
          <div className="guide-notice-info mt-3">
            <p className="text-sm">영문 slug 사용 권장. 한글 URL은 인코딩 이슈가 발생할 수 있습니다. 의미 있는 키워드를 포함하되 과도한 키워드 스터핑은 피합니다.</p>
          </div>
        </div>
      </section>

      {/* H1/H2/H3 규칙 */}
      <section className="guide-section">
        <SectionHeading tag="h2">Heading Hierarchy (H1/H2/H3)</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-1">
            <CheckItem>페이지당 H1은 1개만 사용</CheckItem>
            <CheckItem>H1에 주요 키워드 포함 (지역+진료과+병원명)</CheckItem>
            <CheckItem>H2는 섹션 구분, H3는 서브 항목</CheckItem>
            <CheckItem>heading 순서를 건너뛰지 않기 (H1→H3 금지)</CheckItem>
            <CheckItem type="warning">스타일링 목적으로 heading 태그 남용 금지</CheckItem>
          </ul>
        </div>
      </section>

      {/* 지역 기반 페이지 구조 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="지역+키워드 조합으로 검색 유입을 최적화합니다">
          지역 기반 랜딩 페이지 설계
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "지역 + 진료과목", ex: "강남 내과, 역삼동 가정의학과" },
            { title: "지역 + 증상", ex: "강남 기침 오래갈때, 역삼 두통 진료" },
            { title: "지역 + 검진", ex: "강남 건강검진, 역삼 직장인 검진" },
            { title: "지역 + 특수 조건", ex: "강남 야간진료, 역삼 주차 가능 병원" },
          ].map((item) => (
            <div key={item.title} className="guide-card">
              <h3 className="font-semibold text-sm text-card-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">예: {item.ex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NAP 일관성 */}
      <section className="guide-section">
        <SectionHeading tag="h2">NAP (Name / Address / Phone) 일관성</SectionHeading>
        <div className="guide-notice-info">
          <ul className="space-y-2 text-sm">
            <li>• 병원명, 주소, 전화번호는 사이트 전체에서 동일하게 표기</li>
            <li>• 네이버 플레이스, 카카오맵, Google Business Profile과 일치</li>
            <li>• 건물명, 층수, 호수까지 정확히 표기</li>
            <li>• 전화번호 형식 통일 (02-1234-5678 또는 02.1234.5678 중 하나로)</li>
          </ul>
        </div>
      </section>

      {/* 구조화 데이터 */}
      <section className="guide-section">
        <SectionHeading tag="h2">구조화 데이터 (JSON-LD)</SectionHeading>
        <div className="guide-card">
          <p className="text-sm text-muted-foreground mb-3">병원/의원 사이트에 적용 가능한 구조화 데이터 유형:</p>
          <div className="overflow-x-auto">
            <table className="guide-table">
              <thead>
                <tr><th>유형</th><th>적용 페이지</th><th>포함 정보</th></tr>
              </thead>
              <tbody>
                <tr><td className="font-medium">MedicalBusiness</td><td>홈, 병원소개</td><td>병원명, 주소, 전화, 진료시간, 지도 좌표</td></tr>
                <tr><td className="font-medium">Physician</td><td>의료진 소개</td><td>의료진명, 전문 분야, 소속</td></tr>
                <tr><td className="font-medium">FAQPage</td><td>FAQ</td><td>질문-답변 쌍</td></tr>
                <tr><td className="font-medium">Article</td><td>건강정보/칼럼</td><td>제목, 작성자, 날짜, 본문 요약</td></tr>
                <tr><td className="font-medium">Organization</td><td>사이트 전체</td><td>로고, 소셜 프로필, 연락처</td></tr>
                <tr><td className="font-medium">BreadcrumbList</td><td>서브 페이지</td><td>페이지 경로</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Open Graph / Twitter */}
      <section className="guide-section">
        <SectionHeading tag="h2">Open Graph & Twitter 메타</SectionHeading>
        <div className="guide-card">
          <div className="text-sm font-mono space-y-1 text-muted-foreground">
            <p><code className="guide-code">og:title</code> — 페이지별 고유 제목</p>
            <p><code className="guide-code">og:description</code> — 페이지별 고유 설명</p>
            <p><code className="guide-code">og:image</code> — 병원 대표 이미지 (1200x630)</p>
            <p><code className="guide-code">og:type</code> — website</p>
            <p><code className="guide-code">og:url</code> — canonical URL</p>
            <p><code className="guide-code">twitter:card</code> — summary_large_image</p>
          </div>
        </div>
      </section>

      {/* 기술 요소 */}
      <section className="guide-section">
        <SectionHeading tag="h2">기술 SEO 체크리스트</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-1">
            <CheckItem>sitemap.xml 생성 및 서치콘솔 제출</CheckItem>
            <CheckItem>robots.txt 적절히 설정</CheckItem>
            <CheckItem>canonical 태그 모든 페이지에 적용</CheckItem>
            <CheckItem>모바일 친화적 (Mobile-Friendly Test 통과)</CheckItem>
            <CheckItem>페이지 로딩 속도 최적화 (Core Web Vitals)</CheckItem>
            <CheckItem>이미지 alt text 전체 적용</CheckItem>
            <CheckItem>내부 링크 구조 설계 (진료과↔증상↔의료진)</CheckItem>
            <CheckItem>404 페이지 커스텀</CheckItem>
          </ul>
        </div>
      </section>

      {/* AI 검색 최적화 */}
      <section className="guide-section">
        <SectionHeading tag="h2">AI 검색/요약에 유리한 콘텐츠 구조</SectionHeading>
        <div className="guide-notice-success">
          <ul className="space-y-2 text-sm">
            <li>• 질문-답변 형태의 FAQ 구조 (FAQPage 스키마 적용)</li>
            <li>• 명확한 heading 구조로 정보 위계 표현</li>
            <li>• 핵심 정보를 문단 첫 문장에 배치</li>
            <li>• 구체적 수치와 사실 기반 정보 (진료시간, 주소, 전화번호)</li>
            <li>• 표(table) 형태로 비교 정보 정리</li>
            <li>• "~ 입니다", "~ 합니다" 형태의 명확한 문장</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
