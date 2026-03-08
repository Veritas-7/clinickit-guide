import { SectionHeading } from "@/components/SectionHeading";
import { CheckItem } from "@/components/CheckItem";
import { jsonLdTemplates, sitemapStructure, routeMeta } from "@/data/seoConfig";

function CodeBlock({ title, code, lang = "json" }: { title: string; code: string; lang?: string }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-card-foreground mb-1.5">{title}</p>
      <pre className="bg-secondary/70 rounded-lg p-4 overflow-x-auto text-xs font-mono text-foreground/80 leading-relaxed border border-border/50">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function SeoGeo() {
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 웹사이트의 검색 최적화(SEO)와 지역 기반 탐색 최적화(GEO). 메타 데이터, URL 구조, 구조화 데이터, 로컬 SEO 전략을 실행 가능한 형태로 정리합니다."
      >
        SEO / GEO 가이드
      </SectionHeading>

      {/* 빠른 요약 */}
      <div className="guide-notice-info mb-8">
        <p className="text-sm font-semibold mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-sm space-y-0.5">
          <li>• 모든 페이지에 고유 title / description / canonical / OG 메타 적용</li>
          <li>• MedicalBusiness, Physician, FAQPage JSON-LD 필수</li>
          <li>• NAP(병원명/주소/전화) 사이트 전체 일관성 유지</li>
          <li>• 지역+진료과 키워드 H1에 포함</li>
        </ul>
      </div>

      {/* 메타 타이틀/디스크립션 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="각 페이지별 권장 메타 데이터 구조">
          메타 타이틀 & 디스크립션 템플릿
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
                { page: "FAQ", title: "자주 묻는 질문 | [병원명]", desc: "초진 준비물, 주차, 예약 방법 등 [병원명]에 대한 자주 묻는 질문과 답변." },
                { page: "증상 안내", title: "[증상명] | [지역] [진료과] [병원명]", desc: "[증상]이 걱정되신다면 [병원명]에서 전문의 진료를 받아보세요." },
              ].map((row) => (
                <tr key={row.page}>
                  <td className="font-medium">{row.page}</td>
                  <td className="text-sm"><code className="guide-code">{row.title}</code></td>
                  <td className="text-sm text-muted-foreground">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">※ [괄호] 안의 내용은 실제 병원 정보로 교체합니다. 타이틀 60자 이내, 디스크립션 160자 이내.</p>
      </section>

      {/* Canonical 전략 */}
      <section className="guide-section">
        <SectionHeading tag="h2">Canonical URL 전략</SectionHeading>
        <div className="guide-card">
          <div className="space-y-2 text-sm">
            <p><strong>원칙:</strong> 모든 페이지에 절대 경로 canonical 태그를 적용합니다.</p>
            <CodeBlock title="HTML 예시" code={`<link rel="canonical" href="https://www.example-clinic.com/departments" />`} lang="html" />
            <ul className="space-y-1 text-muted-foreground">
              <li>• http/https, www/non-www 중 하나를 선택하고 전체 통일</li>
              <li>• 쿼리 파라미터(?utm_source 등)가 붙은 URL은 canonical에서 제외</li>
              <li>• 페이지네이션이 있는 경우 첫 페이지를 canonical으로 지정</li>
              <li>• 모바일/데스크톱 동일 URL 사용 (반응형이므로 별도 canonical 불필요)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* URL 구조 */}
      <section className="guide-section">
        <SectionHeading tag="h2">URL 구조 예시</SectionHeading>
        <div className="guide-card">
          <div className="space-y-1 text-sm font-mono">
            {[
              { url: "/", note: "홈" },
              { url: "/departments", note: "진료과목 목록" },
              { url: "/departments/internal-medicine", note: "개별 진료과" },
              { url: "/doctors", note: "의료진 목록" },
              { url: "/doctors/hong-gildong", note: "개별 의료진" },
              { url: "/symptoms/persistent-cough", note: "증상별 안내" },
              { url: "/visit-info", note: "방문 안내" },
              { url: "/location", note: "오시는 길" },
              { url: "/reservation", note: "예약" },
              { url: "/faq", note: "FAQ" },
              { url: "/health-info/managing-hypertension", note: "건강정보 글" },
              { url: "/non-covered-services", note: "비급여 안내" },
            ].map((item) => (
              <div key={item.url} className="flex items-center gap-3">
                <code className="guide-code">{item.url}</code>
                <span className="text-xs text-muted-foreground font-sans">{item.note}</span>
              </div>
            ))}
          </div>
          <div className="guide-notice-info mt-3">
            <p className="text-sm">영문 slug 사용 권장. 한글 URL은 인코딩 이슈가 발생할 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* H1/H2/H3 규칙 */}
      <section className="guide-section">
        <SectionHeading tag="h2">Heading Hierarchy 규칙</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-1">
            <CheckItem>페이지당 H1은 1개만 사용</CheckItem>
            <CheckItem>H1에 주요 키워드 포함 (지역+진료과+병원명)</CheckItem>
            <CheckItem>H2는 섹션 구분, H3는 서브 항목</CheckItem>
            <CheckItem>heading 순서를 건너뛰지 않기 (H1→H3 금지)</CheckItem>
            <CheckItem type="warning">스타일링 목적으로 heading 태그 남용 금지</CheckItem>
          </ul>
          <CodeBlock
            title="Heading 구조 예시 (홈페이지)"
            code={`<h1>강남역 내과·가정의학과 전문의 진료 - OO의원</h1>
  <h2>진료과목</h2>
    <h3>내과</h3>
    <h3>가정의학과</h3>
  <h2>의료진 소개</h2>
    <h3>홍길동 원장</h3>
  <h2>진료시간 안내</h2>
  <h2>오시는 길</h2>
  <h2>자주 묻는 질문</h2>`}
            lang="html"
          />
        </div>
      </section>

      {/* 지역 기반 페이지 구조 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="지역+키워드 조합으로 검색 유입을 최적화합니다">
          지역 기반 랜딩 페이지 설계
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "지역 + 진료과목", ex: "강남 내과, 역삼동 가정의학과", url: "/gangnam-internal-medicine" },
            { title: "지역 + 증상", ex: "강남 기침 오래갈때, 역삼 두통 진료", url: "/gangnam-persistent-cough" },
            { title: "지역 + 검진", ex: "강남 건강검진, 역삼 직장인 검진", url: "/gangnam-health-checkup" },
            { title: "지역 + 특수 조건", ex: "강남 야간진료, 역삼 주차 가능 병원", url: "/gangnam-evening-clinic" },
          ].map((item) => (
            <div key={item.title} className="guide-card">
              <h3 className="font-semibold text-sm text-card-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">예: {item.ex}</p>
              <code className="guide-code text-xs mt-1 block">{item.url}</code>
            </div>
          ))}
        </div>
      </section>

      {/* 내부 링크 맵 */}
      <section className="guide-section">
        <SectionHeading tag="h2">내부 링크 전략</SectionHeading>
        <div className="guide-card">
          <p className="text-sm text-muted-foreground mb-3">페이지 간 상호 연결로 검색엔진과 사용자 모두의 탐색성을 높입니다.</p>
          <div className="overflow-x-auto">
            <table className="guide-table">
              <thead>
                <tr><th>출발 페이지</th><th>연결 대상</th><th>연결 목적</th></tr>
              </thead>
              <tbody>
                <tr><td>홈</td><td>진료과목, 의료진, 오시는 길</td><td>핵심 허브 페이지 연결</td></tr>
                <tr><td>진료과목</td><td>증상 안내, 의료진, 예약</td><td>진료↔증상↔의사 삼각 연결</td></tr>
                <tr><td>증상 안내</td><td>관련 진료과, 예약</td><td>증상→진료 전환</td></tr>
                <tr><td>의료진</td><td>해당 진료과, 예약</td><td>신뢰→전환</td></tr>
                <tr><td>FAQ</td><td>진료과, 방문 안내, 비급여</td><td>질문→정보→전환</td></tr>
                <tr><td>건강정보</td><td>관련 진료과, 예약</td><td>정보→관심→전환</td></tr>
              </tbody>
            </table>
          </div>
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
        <CodeBlock
          title="로컬 정보 배치 규칙"
          code={`<!-- 모든 페이지의 Footer, Quick Info Bar에 동일 정보 -->
<address>
  OO의원 | 서울 강남구 역삼로 123 OO빌딩 3층
  Tel. 02-1234-5678
</address>

<!-- 오시는 길 페이지에 추가 정보 -->
- 건물명: OO빌딩 3층
- 지하철: 역삼역 3번 출구 도보 3분
- 버스: 강남01, 146번 역삼역 하차
- 주차: 건물 지하 주차장 (진료 시 2시간 무료)`}
          lang="html"
        />
      </section>

      {/* 구조화 데이터 JSON-LD */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="실제 프로젝트에 복사·수정하여 사용할 수 있는 JSON-LD 템플릿">
          구조화 데이터 (JSON-LD) 템플릿
        </SectionHeading>

        <div className="guide-card mb-4">
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

        <CodeBlock title="MedicalBusiness (홈페이지)" code={jsonLdTemplates.medicalBusiness} />
        <CodeBlock title="Physician (의료진 페이지)" code={jsonLdTemplates.physician} />
        <CodeBlock title="FAQPage (FAQ 페이지)" code={jsonLdTemplates.faqPage} />
        <CodeBlock title="Article (건강정보/칼럼)" code={jsonLdTemplates.article} />

        <div className="guide-notice-info mt-2">
          <p className="text-sm">[괄호] 안의 내용을 실제 병원 정보로 교체하세요. JSON-LD는 <code className="guide-code">&lt;script type="application/ld+json"&gt;</code> 태그로 head에 삽입합니다.</p>
        </div>
      </section>

      {/* Open Graph / Twitter */}
      <section className="guide-section">
        <SectionHeading tag="h2">Open Graph & Twitter 메타</SectionHeading>
        <div className="guide-card">
          <CodeBlock
            title="HTML 메타 태그 예시"
            code={`<!-- Open Graph -->
<meta property="og:title" content="OO의원 | 강남 내과 전문의 진료" />
<meta property="og:description" content="강남역 내과·가정의학과 전문의 진료. 진료시간, 오시는 길, 예약 안내." />
<meta property="og:image" content="https://www.example.com/og-image.jpg" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.example.com/" />
<meta property="og:site_name" content="OO의원" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="OO의원 | 강남 내과 전문의 진료" />
<meta name="twitter:description" content="강남역 내과·가정의학과 전문의 진료." />
<meta name="twitter:image" content="https://www.example.com/og-image.jpg" />`}
            lang="html"
          />
          <p className="text-xs text-muted-foreground">OG 이미지 권장 크기: 1200×630px. 병원 외관 또는 로고+병원명 조합 권장.</p>
        </div>
      </section>

      {/* Sitemap 구조 */}
      <section className="guide-section">
        <SectionHeading tag="h2">Sitemap 구조 예시</SectionHeading>
        <div className="guide-card">
          <div className="overflow-x-auto">
            <table className="guide-table">
              <thead>
                <tr><th>URL</th><th>Priority</th><th>Change Freq</th></tr>
              </thead>
              <tbody>
                {sitemapStructure.map(s => (
                  <tr key={s.url}>
                    <td><code className="guide-code text-xs">{s.url}</code></td>
                    <td className="text-sm">{s.priority}</td>
                    <td className="text-sm text-muted-foreground">{s.changefreq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* robots.txt */}
      <section className="guide-section">
        <SectionHeading tag="h2">robots.txt 예시</SectionHeading>
        <CodeBlock
          title="robots.txt"
          code={`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://www.example-clinic.com/sitemap.xml`}
          lang="text"
        />
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
            <li>• 한 단락에 한 가지 정보만 담기</li>
          </ul>
        </div>
        <CodeBlock
          title="AI 요약에 유리한 문장 구조 예시"
          code={`✓ "OO의원은 서울 강남구 역삼동에 위치한 내과·가정의학과 의원입니다."
✓ "평일 09:00~18:00, 토요일 09:00~13:00에 진료합니다."
✓ "역삼역 3번 출구에서 도보 3분 거리에 있습니다."

✗ "저희 병원은 최고의 시설과 최신 장비로..." (과장, 핵심 정보 없음)
✗ "환자분들의 건강한 미래를 위해..." (추상적, 구체적 정보 없음)`}
          lang="text"
        />
      </section>

      {/* 기술 SEO 체크리스트 */}
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
            <CheckItem>SSL 인증서 적용</CheckItem>
            <CheckItem>네이버 서치어드바이저 / Google Search Console 등록</CheckItem>
          </ul>
        </div>
      </section>
    </div>
  );
}
