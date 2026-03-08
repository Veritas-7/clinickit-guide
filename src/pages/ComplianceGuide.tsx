import { useLocation } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
import { PageNavigation } from "@/components/PageNavigation";
import {
  complianceAreas,
  pageComplianceMap,
  prelaunchChecklist,
  operationRecheck,
  type RiskLevel,
} from "@/data/complianceRules";

const riskBadge: Record<RiskLevel, { text: string; cls: string }> = {
  low: { text: "낮음", cls: "guide-badge-success" },
  medium: { text: "중간", cls: "guide-badge-warning" },
  high: { text: "높음", cls: "guide-badge-review" },
  critical: { text: "매우 높음", cls: "guide-badge-emergency" },
};

export default function ComplianceGuide() {
  const { pathname } = useLocation();
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 웹사이트 제작 시 법률/광고 검토가 필요한 영역을 구조적으로 정리합니다. 이 페이지는 법률 자문을 대체하지 않습니다."
      >
        컴플라이언스 가이드
      </SectionHeading>

      <div className="guide-notice-review mb-8">
        <p className="text-sm font-semibold">⚠️ 면책 안내</p>
        <p className="text-sm mt-1">이 가이드는 실무자가 "어디를 반드시 검토받아야 하는지" 한눈에 이해하도록 구조화한 것입니다. 법률 자문을 대체하지 않으며, 최종 법률 검토는 전문가에게 의뢰해야 합니다.</p>
      </div>

      {/* 빠른 요약 보드 */}
      <div className="guide-notice-info mb-8">
        <p className="text-sm font-semibold mb-1">📋 컴플라이언스 요약 보드</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {(["critical", "high", "medium", "low"] as RiskLevel[]).map(level => {
            const count = complianceAreas.filter(a => a.riskLevel === level).length;
            const b = riskBadge[level];
            return (
              <div key={level} className="bg-card rounded-lg p-3 border border-border/50 text-center">
                <span className={`${b.cls} text-[10px]`}>{b.text}</span>
                <p className="text-2xl font-bold text-card-foreground mt-1">{count}</p>
                <p className="text-xs text-muted-foreground">검토 영역</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 검토 라벨 시스템 */}
      <section className="guide-section">
        <SectionHeading tag="h2">검토 필요 라벨 시스템</SectionHeading>
        <div className="guide-card">
          <p className="text-sm text-muted-foreground mb-3">각 컴포넌트와 콘텐츠 영역에 아래 라벨을 부착하여 검토 필요 여부를 한눈에 파악합니다.</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3"><span className="guide-badge-success">검토 불필요</span><span className="text-sm text-muted-foreground">순수 UI/구조적 요소 (버튼 스타일, 레이아웃 등)</span></div>
            <div className="flex items-center gap-3"><span className="guide-badge-warning">검토 권장</span><span className="text-sm text-muted-foreground">정보성 콘텐츠 (FAQ, 방문 안내 등)</span></div>
            <div className="flex items-center gap-3"><span className="guide-badge-review">검토 필요</span><span className="text-sm text-muted-foreground">진료 설명, 비급여, 이벤트 등</span></div>
            <div className="flex items-center gap-3"><span className="guide-badge-emergency">반드시 검토</span><span className="text-sm text-muted-foreground">의료진 정보, 후기, 비포/애프터, 개인정보 등</span></div>
          </div>
        </div>
      </section>

      {/* 영역별 상세 검토표 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="각 영역별 검토 포인트, 허용/주의/금지 표현 비교">
          영역별 상세 검토표
        </SectionHeading>
        <div className="space-y-4">
          {complianceAreas.map(area => {
            const badge = riskBadge[area.riskLevel];
            return (
              <div key={area.id} id={`compliance-${area.id}`} className="guide-card scroll-mt-20">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <h3 className="font-semibold text-sm text-card-foreground">{area.title}</h3>
                  <span className={`${badge.cls} text-[10px]`}>{badge.text}</span>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-foreground mb-1.5">검토 포인트:</p>
                  <ul className="space-y-1">
                    {area.checkPoints.map((cp, i) => <CheckItem key={i} type="warning">{cp}</CheckItem>)}
                  </ul>
                </div>

                {(area.allowedExamples || area.cautionExamples || area.forbiddenExamples) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    {area.allowedExamples && area.allowedExamples.length > 0 && (
                      <div className="bg-success/5 rounded-lg p-3 border border-success/20">
                        <p className="text-xs font-semibold text-success mb-1">✓ 허용 표현</p>
                        {area.allowedExamples.map((ex, i) => (
                          <p key={i} className="text-xs text-muted-foreground">"{ex}"</p>
                        ))}
                      </div>
                    )}
                    {area.cautionExamples && area.cautionExamples.length > 0 && (
                      <div className="bg-warning/5 rounded-lg p-3 border border-warning/20">
                        <p className="text-xs font-semibold text-warning mb-1">⚠ 주의 표현</p>
                        {area.cautionExamples.map((ex, i) => (
                          <p key={i} className="text-xs text-muted-foreground">"{ex}"</p>
                        ))}
                      </div>
                    )}
                    {area.forbiddenExamples && area.forbiddenExamples.length > 0 && (
                      <div className="bg-emergency/5 rounded-lg p-3 border border-emergency/20">
                        <p className="text-xs font-semibold text-emergency mb-1">✗ 금지 표현</p>
                        {area.forbiddenExamples.map((ex, i) => (
                          <p key={i} className="text-xs text-muted-foreground">"{ex}"</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 광고성 vs 정보성 */}
      <section className="guide-section">
        <SectionHeading tag="h2">광고성 카피 vs 정보성 카피 구분</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>구분</th><th>정보성 (권장)</th><th>광고성 (주의)</th></tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">진료 설명</td>
                <td className="text-success">"고혈압, 당뇨 등 만성질환 관리를 도와드립니다"</td>
                <td className="text-emergency">"완벽한 만성질환 관리를 약속합니다"</td>
              </tr>
              <tr>
                <td className="font-medium">의료진</td>
                <td className="text-success">"OO대학 졸업, OO병원 수련, 내과 전문의"</td>
                <td className="text-emergency">"지역 최고의 명의가 직접 진료합니다"</td>
              </tr>
              <tr>
                <td className="font-medium">시설</td>
                <td className="text-success">"최신 초음파 장비를 갖추고 있습니다"</td>
                <td className="text-emergency">"타 병원에 없는 최첨단 장비 보유"</td>
              </tr>
              <tr>
                <td className="font-medium">CTA</td>
                <td className="text-success">"진료 예약하기"</td>
                <td className="text-emergency">"지금 바로 예약하지 않으면 후회합니다!"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 페이지별 검토 요소 */}
      <section className="guide-section">
        <SectionHeading tag="h2">페이지별 검토 필요 요소</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>페이지</th><th>검토 영역</th><th>우선도</th></tr>
            </thead>
            <tbody>
              {pageComplianceMap.map(p => {
                const badge = riskBadge[p.priority];
                return (
                  <tr key={p.page}>
                    <td className="font-medium">{p.page}</td>
                    <td className="text-sm">
                      {p.areas.map(aId => {
                        const area = complianceAreas.find(a => a.id === aId);
                        return area ? (
                          <a key={aId} href={`#compliance-${aId}`} className="inline-block mr-1.5 text-accent hover:underline text-xs">{area.title}</a>
                        ) : null;
                      })}
                    </td>
                    <td><span className={`${badge.cls} text-[10px]`}>{badge.text}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 출시 전 검수 플로우 */}
      <section className="guide-section">
        <SectionHeading tag="h2">출시 전 법률/광고 검수 플로우</SectionHeading>
        <div className="guide-card">
          <ol className="space-y-3 text-sm">
            {prelaunchChecklist.map(item => (
              <li key={item.step} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">{item.step}</span>
                <div>
                  <p className="font-medium text-card-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 운영 중 재검토 */}
      <section className="guide-section">
        <SectionHeading tag="h2">운영 중 콘텐츠 수정 시 재검토 포인트</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>변경 사항</th><th>검토 영역</th><th>긴급도</th></tr>
            </thead>
            <tbody>
              {operationRecheck.map(item => (
                <tr key={item.trigger}>
                  <td className="font-medium text-sm">{item.trigger}</td>
                  <td className="text-sm">
                    {item.areas.map(aId => {
                      const area = complianceAreas.find(a => a.id === aId);
                      return <span key={aId} className="text-xs text-accent mr-1.5">{area?.title}</span>;
                    })}
                  </td>
                  <td><span className={`text-xs font-medium ${item.urgency === "즉시" ? "text-emergency" : "text-warning"}`}>{item.urgency}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 외부 광고 연결 */}
      <section className="guide-section">
        <SectionHeading tag="h2">외부 광고 랜딩 연결 시 점검 항목</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-1">
            <CheckItem type="warning">광고 소재와 랜딩 페이지 내용의 일치성</CheckItem>
            <CheckItem type="warning">랜딩 페이지 내 과장/단정 표현 없는지</CheckItem>
            <CheckItem type="warning">이벤트/프로모션 조건 명시 여부</CheckItem>
            <CheckItem type="warning">개인정보 수집 시 동의 절차 포함 여부</CheckItem>
            <CheckItem type="warning">광고 심의 필요 여부 확인</CheckItem>
          </ul>
        </div>
      </section>

      <PageNavigation currentPath={pathname} />
    </div>
  );
}
