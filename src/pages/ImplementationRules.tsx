import { useState, useEffect, useMemo } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { PageNavigation } from "@/components/PageNavigation";
import { CopyBlock } from "@/components/CopyBlock";
import { Link, useLocation } from "react-router-dom";
import {
  siteTypeRules, ctaPriorityRules, layoutRules, conditionalBlocks,
  budgetScaling, coreBlocks, compliancePriorityBlocks,
} from "@/data/implementationRules";
import { AlertTriangle, CheckCircle2, Copy, Check } from "lucide-react";

type BriefData = Record<string, string | string[]>;

function loadBrief(): BriefData {
  try {
    const stored = localStorage.getItem("clientBrief");
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    return parsed.data || parsed;
  } catch { return {}; }
}

function matchesCondition(condition: string, data: BriefData): boolean {
  const c = condition.toLowerCase();
  const instType = ((data.institutionType as string) || "").toLowerCase();
  const depts = (data.departments as string[]) || [];
  const doctors = parseInt((data.doctorCount as string) || "1");
  const booking = (data.bookingMethod as string[]) || [];
  const hasOnline = booking.some(b => b.includes("온라인") || b.includes("네이버") || b.includes("카카오"));
  const photoTypes = (data.photoTypes as string[]) || [];
  const hasPhotos = photoTypes.length > 0 && !photoTypes.includes("없음");
  const hasFacilityPhotos = photoTypes.some(p => p.includes("진료실") || p.includes("대기실") || p.includes("로비") || p.includes("외관"));
  const facilityPhotoCount = photoTypes.filter(p => p.includes("진료실") || p.includes("대기실") || p.includes("로비") || p.includes("외관") || p.includes("장비")).length;

  if (c.includes("검진센터")) return instType.includes("검진센터");
  if (c.includes("온라인 예약 시스템 있음") || c.includes("온라인 예약 가능")) return hasOnline;
  if (c.includes("온라인 예약 없음") || c.includes("예약 없음")) return !hasOnline;
  if (c.includes("의료진 3인 이상")) return doctors >= 3;
  if (c.includes("의료진 1인")) return doctors === 1;
  if (c.includes("전문의") && c.includes("2인")) return doctors >= 2;
  if (c.includes("정보 부족") || c.includes("사진 없음")) return !hasPhotos || !photoTypes.some(p => p.includes("의료진"));
  if (c.includes("시설 사진 5장")) return facilityPhotoCount >= 3;
  if (c.includes("시설 사진 부족")) return !hasFacilityPhotos;
  if (c.includes("진료과 5개")) return depts.length >= 5;
  if (c.includes("진료과 2~4") || c.includes("진료과 다수")) return depts.length >= 2 && depts.length <= 4;
  if (c.includes("비급여")) return (data.nonCoveredInfo as string) === "필요";
  if (c.includes("블로그") || c.includes("칼럼")) return (data.blogColumn as string) === "운영";
  if (c.includes("다국어")) return (data.multilingual as string) !== "불필요" && !!(data.multilingual as string);
  if (c.includes("야간") || c.includes("주말")) return false; // Not in brief
  if (c.includes("단일 진료과") && c.includes("지역")) return depts.length <= 1 && doctors <= 1;
  if (c.includes("진료과 다수") || c.includes("정보량")) return depts.length >= 3 && doctors >= 3;
  return false;
}

interface RuleTableProps {
  title: string;
  rules: { condition: string; result: string }[];
  data: BriefData;
  hasBrief: boolean;
}

function DynamicRuleTable({ title, rules, data, hasBrief }: RuleTableProps) {
  return (
    <div className="guide-card mb-4">
      <h3 className="font-semibold text-sm text-card-foreground mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="guide-table">
          <thead>
            <tr><th>조건</th><th>적용 규칙</th>{hasBrief && <th className="w-20">현재 상태</th>}</tr>
          </thead>
          <tbody>
            {rules.map((r, i) => {
              const matches = hasBrief ? matchesCondition(r.condition, data) : false;
              return (
                <tr key={i} className={matches ? "bg-accent/5" : ""}>
                  <td className="text-sm">{r.condition}</td>
                  <td className="text-sm">{r.result}</td>
                  {hasBrief && (
                    <td className="text-center">
                      {matches ? <CheckCircle2 className="h-4 w-4 text-success inline" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground border border-border rounded px-1.5 py-0.5"
      aria-label="복사">
      {copied ? <><Check className="h-3 w-3 text-success" /> 복사됨</> : <><Copy className="h-3 w-3" /> 복사</>}
    </button>
  );
}

export default function ImplementationRules() {
  const [data, setData] = useState<BriefData>({});
  const { pathname } = useLocation();

  useEffect(() => { setData(loadBrief()); }, []);

  const hasBrief = Object.keys(data).length > 0;
  const hospitalName = (data.hospitalName as string) || "[병원명]";
  const doctors = parseInt((data.doctorCount as string) || "1");
  const depts = (data.departments as string[]) || [];
  const hasOnline = ((data.bookingMethod as string[]) || []).some(b => b.includes("온라인") || b.includes("네이버") || b.includes("카카오"));
  const instType = (data.institutionType as string) || "";

  // Determine site type
  const siteType = useMemo(() => {
    if (instType === "검진센터") return "검진센터형";
    if (doctors >= 3 && depts.length >= 3) return "정보 제공형";
    if (doctors >= 2) return "전문의 신뢰형";
    if (hasOnline) return "예약 유도형";
    return "지역 의원형";
  }, [instType, doctors, depts, hasOnline]);

  // Matched conditional blocks
  const matchedConditional = conditionalBlocks.filter(b => matchesCondition(b.condition, data));
  const matchedLayout = layoutRules.filter(b => matchesCondition(b.condition, data));

  // Determine recommended budget level
  const recommendedBudget = depts.length >= 5 || doctors >= 3 ? "풀 구성" : depts.length >= 2 ? "표준 구성" : "최소 구성 (빠른 제작)";

  // Generate summary card text
  const summaryText = `[${hospitalName} 제작 지침 요약]
사이트 유형: ${siteType}
CTA 우선순위: ${hasOnline ? "온라인 예약 > 전화 > 오시는 길" : "전화 문의 > 오시는 길 > 진료시간"}
레이아웃: ${matchedLayout.map(l => l.result.split("—")[0].trim()).join(", ") || "기본"}
추가 블록: ${matchedConditional.map(c => c.result.split(",")[0].trim()).join(", ") || "없음"}
추천 구성: ${recommendedBudget}
핵심 유지 블록: ${coreBlocks.join(", ")}`;

  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="고객사 조건에 따라 어떤 구조를 적용해야 하는지 자동으로 판별합니다. 브리프가 있으면 매칭 결과가 하이라이트됩니다."
      >
        구현 규칙
      </SectionHeading>

      {!hasBrief ? (
        <div className="guide-notice-warning mb-8">
          <p className="text-sm"><AlertTriangle className="h-4 w-4 inline mr-1" />브리프 데이터가 없습니다. <Link to="/client-brief" className="text-accent underline font-medium">고객사 브리프</Link>를 작성하면 조건별 매칭 결과를 확인할 수 있습니다.</p>
        </div>
      ) : (
        /* 브리프 기반 요약 카드 */
        <div className="guide-card-accent mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-card-foreground">📋 {hospitalName} — 실행 요약</h3>
            <CopyButton text={summaryText} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-0.5">사이트 유형</p>
              <p className="font-semibold text-card-foreground">{siteType}</p>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-0.5">CTA 우선순위</p>
              <p className="font-semibold text-card-foreground">{hasOnline ? "예약 > 전화 > 오시는 길" : "전화 > 오시는 길 > 진료시간"}</p>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-0.5">추천 구성</p>
              <p className="font-semibold text-card-foreground">{recommendedBudget}</p>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-0.5">레이아웃 분기</p>
              <p className="font-semibold text-card-foreground">{matchedLayout.length > 0 ? matchedLayout.map(l => l.result.split("—")[0].trim()).join(", ") : "기본"}</p>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-0.5">추가 블록</p>
              <p className="font-semibold text-card-foreground">{matchedConditional.length > 0 ? matchedConditional.map(c => c.result.split(",")[0].trim()).join(", ") : "없음"}</p>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-0.5">의료진/진료과</p>
              <p className="font-semibold text-card-foreground">{doctors}명 / {depts.length}과</p>
            </div>
          </div>
        </div>
      )}

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
        <DynamicRuleTable title="조건 → 추천 사이트 유형" rules={siteTypeRules} data={data} hasBrief={hasBrief} />
      </section>

      {/* CTA 우선순위 */}
      <section className="guide-section">
        <SectionHeading tag="h2">CTA 우선순위 규칙</SectionHeading>
        <DynamicRuleTable title="조건 → CTA 배치 전략" rules={ctaPriorityRules} data={data} hasBrief={hasBrief} />
      </section>

      {/* 레이아웃 분기 */}
      <section className="guide-section">
        <SectionHeading tag="h2">레이아웃 분기 규칙</SectionHeading>
        <DynamicRuleTable title="조건 → 레이아웃 결정" rules={layoutRules} data={data} hasBrief={hasBrief} />
      </section>

      {/* 조건부 블록 */}
      <section className="guide-section">
        <SectionHeading tag="h2">조건부 블록 추가 규칙</SectionHeading>
        <DynamicRuleTable title="조건 → 추가 블록" rules={conditionalBlocks} data={data} hasBrief={hasBrief} />
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
            <div key={s.level} className={`guide-card ${s.level === recommendedBudget && hasBrief ? "ring-2 ring-accent" : ""}`}>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-sm text-card-foreground">{s.level}</h3>
                {s.level === recommendedBudget && hasBrief && <span className="guide-badge-success text-[10px]">추천</span>}
              </div>
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

      {/* 정보 부족 시 */}
      <section className="guide-section">
        <SectionHeading tag="h2">정보 부족 시 대체 구조</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>상황</th><th>기본 구조</th><th>대체 구조</th></tr>
            </thead>
            <tbody>
              <tr><td>의료진 사진 없음</td><td>사진 + 텍스트 프로필</td><td>이니셜 아바타 + 텍스트 프로필</td></tr>
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
      {(instType === "검진센터" || !hasBrief) && (
        <section className="guide-section">
          <SectionHeading tag="h2">검진센터형 추가 블록</SectionHeading>
          <div className="guide-notice-info">
            <ul className="space-y-1 text-sm">
              <li>• 검진 프로그램 비교 테이블</li>
              <li>• 검진 예약 CTA (1순위)</li>
              <li>• 검진 절차 안내 (예약 → 방문 → 검진 → 결과)</li>
              <li>• 비급여 가격표 필수 포함</li>
              <li>• 소요 시간 안내</li>
            </ul>
          </div>
        </section>
      )}

      {/* 제작 지침 카드 복사 */}
      {hasBrief && (
        <section className="guide-section">
          <SectionHeading tag="h2">제작 지침 카드</SectionHeading>
          <CopyBlock content={summaryText} label="복사 가능한 제작 지침 요약" />
        </section>
      )}

      {/* 하단 링크 */}
      <div className="guide-section text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/site-blueprint" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">← 블루프린트</Link>
          <Link to="/client-brief" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">브리프 수정</Link>
          <Link to="/checklist" className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">체크리스트 →</Link>
        </div>
      </div>

      <PageNavigation currentPath={pathname} />
    </div>
  );
}
