import { SectionHeading } from "@/components/SectionHeading";
import {
  siteTypeRules,
  ctaPriorityRules,
  layoutRules,
  conditionalBlocks,
  budgetScaling,
  coreBlocks,
  compliancePriorityBlocks,
} from "@/data/implementationRules";

interface RuleTableProps {
  title: string;
  rules: { condition: string; result: string }[];
}

function RuleTable({ title, rules }: RuleTableProps) {
  return (
    <div className="guide-card mb-4">
      <h3 className="font-semibold text-sm text-card-foreground mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="guide-table">
          <thead>
            <tr><th>조건</th><th>적용 규칙</th></tr>
          </thead>
          <tbody>
            {rules.map((r, i) => (
              <tr key={i}>
                <td className="text-sm">{r.condition}</td>
                <td className="text-sm">{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ImplementationRules() {
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="디자이너/기획자/개발자가 실제 병원/의원 사이트 제작 시 바로 적용할 수 있는 조건별 구현 규칙. 템플릿 선택, CTA 분기, 레이아웃 분기, 축소 구조를 포함합니다."
      >
        구현 규칙
      </SectionHeading>

      {/* 빠른 요약 */}
      <div className="guide-notice-info mb-8">
        <p className="text-sm font-semibold mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-sm space-y-1">
          <li>• 사이트 유형 → 5가지 중 선택 → 해당 레이아웃 규칙 적용</li>
          <li>• 온라인 예약 유무에 따라 CTA 우선순위 변경</li>
          <li>• 사진 보유량에 따라 갤러리/의료진 섹션 분기</li>
          <li>• 예산/일정에 따라 최소/표준/풀 구성 선택</li>
        </ul>
      </div>

      {/* 사이트 유형 판별 */}
      <section className="guide-section">
        <SectionHeading tag="h2">사이트 유형 판별 규칙</SectionHeading>
        <RuleTable title="조건 → 추천 사이트 유형" rules={siteTypeRules} />
      </section>

      {/* CTA 우선순위 */}
      <section className="guide-section">
        <SectionHeading tag="h2">CTA 우선순위 규칙</SectionHeading>
        <RuleTable title="조건 → CTA 배치 전략" rules={ctaPriorityRules} />
      </section>

      {/* 레이아웃 분기 */}
      <section className="guide-section">
        <SectionHeading tag="h2">레이아웃 분기 규칙</SectionHeading>
        <RuleTable title="조건 → 레이아웃 결정" rules={layoutRules} />
      </section>

      {/* 조건부 블록 */}
      <section className="guide-section">
        <SectionHeading tag="h2">조건부 블록 추가 규칙</SectionHeading>
        <RuleTable title="조건 → 추가 블록" rules={conditionalBlocks} />
      </section>

      {/* 핵심 유지 블록 */}
      <section className="guide-section">
        <SectionHeading tag="h2">반드시 유지해야 하는 핵심 블록</SectionHeading>
        <div className="guide-card">
          <p className="text-sm text-muted-foreground mb-3">아래 블록은 어떤 예산/일정 조건에서도 반드시 포함해야 합니다.</p>
          <div className="flex flex-wrap gap-2">
            {coreBlocks.map(block => (
              <span key={block} className="guide-badge-info">{block}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 예산별 구성 */}
      <section className="guide-section">
        <SectionHeading tag="h2">예산/일정별 구성 스케일링</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgetScaling.map(s => (
            <div key={s.level} className="guide-card">
              <h3 className="font-semibold text-sm text-card-foreground mb-2">{s.level}</h3>
              <p className="text-xs text-success font-medium mb-1">포함:</p>
              <ul className="text-xs text-muted-foreground space-y-0.5 mb-2">
                {s.include.map(i => <li key={i}>✓ {i}</li>)}
              </ul>
              {s.exclude.length > 0 && (
                <>
                  <p className="text-xs text-warning font-medium mb-1">제외:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    {s.exclude.map(e => <li key={e}>— {e}</li>)}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 의료진 정보 부족 시 */}
      <section className="guide-section">
        <SectionHeading tag="h2">정보 부족 시 대체 구조</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>상황</th><th>기본 구조</th><th>대체 구조</th></tr>
            </thead>
            <tbody>
              <tr><td>의료진 사진 없음</td><td>사진 + 텍스트 프로필</td><td>이니셜 아바타 + 텍스트 프로필 (이름+직위+경력)</td></tr>
              <tr><td>시설 사진 없음</td><td>갤러리 섹션</td><td>아이콘 기반 시설 설명 또는 섹션 생략</td></tr>
              <tr><td>온라인 예약 없음</td><td>예약 버튼 + 폼</td><td>전화 CTA 강조 + 진료시간 안내</td></tr>
              <tr><td>비급여 정보 없음</td><td>비급여 테이블</td><td>페이지 생략, "전화 문의" 안내</td></tr>
              <tr><td>FAQ 없음</td><td>FAQ 아코디언</td><td>기본 5개 FAQ 템플릿 제공</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 컴플라이언스 우선순위 */}
      <section className="guide-section">
        <SectionHeading tag="h2">컴플라이언스 검토 우선순위</SectionHeading>
        <div className="guide-card">
          <div className="space-y-2">
            {compliancePriorityBlocks.map(item => (
              <div key={item.block} className="flex items-center gap-3 py-1.5 border-b border-border/40 last:border-0">
                <span className={item.level === "critical" ? "guide-badge-emergency" : "guide-badge-review"}>
                  {item.level === "critical" ? "반드시 검토" : "검토 필요"}
                </span>
                <div>
                  <span className="font-medium text-sm text-card-foreground">{item.block}</span>
                  <span className="text-xs text-muted-foreground ml-2">{item.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 검진센터형 추가 블록 */}
      <section className="guide-section">
        <SectionHeading tag="h2">검진센터형 추가 블록</SectionHeading>
        <div className="guide-notice-info">
          <ul className="space-y-1 text-sm">
            <li>• 검진 프로그램 비교 테이블 (프로그램명, 포함 항목, 가격대)</li>
            <li>• 검진 예약 CTA (1순위)</li>
            <li>• 검진 절차 안내 (예약 → 방문 → 검진 → 결과)</li>
            <li>• 비급여 가격표 필수 포함</li>
            <li>• 소요 시간 안내</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
