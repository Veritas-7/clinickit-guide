import { useLocation } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
import { PageNavigation } from "@/components/PageNavigation";
import { pageTemplates, type TemplateBlock, type BlockType } from "@/data/templateBlueprints";

const blockTypeLabel: Record<BlockType, { text: string; class: string }> = {
  required: { text: "필수", class: "guide-badge-info" },
  optional: { text: "선택", class: "guide-badge-success" },
  conditional: { text: "조건부", class: "guide-badge-warning" },
  forbidden: { text: "금지", class: "guide-badge-emergency" },
};

const complianceLabel: Record<string, { text: string; class: string }> = {
  "high-risk": { text: "반드시 검토", class: "guide-badge-emergency" },
  review: { text: "검토 필요", class: "guide-badge-review" },
};

export default function PageTemplates() {
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="실제 고객사 병원/의원 사이트 제작 시 바로 적용할 수 있는 블록 기반 페이지 템플릿. 필수/선택/조건부/금지 블록, CTA, 신뢰 요소, 모바일 규칙, SEO, 컴플라이언스를 포함합니다."
      >
        페이지 템플릿
      </SectionHeading>

      <div className="guide-notice-info mb-8">
        <p className="text-sm font-semibold mb-1">📋 빠른 적용 포인트</p>
        <ul className="text-sm space-y-0.5">
          <li>• <span className="guide-badge-info text-[10px]">필수</span> 블록은 어떤 조건에서도 포함</li>
          <li>• <span className="guide-badge-success text-[10px]">선택</span> 블록은 콘텐츠 보유 시 추가</li>
          <li>• <span className="guide-badge-warning text-[10px]">조건부</span> 블록은 특정 조건 충족 시만</li>
          <li>• <span className="guide-badge-emergency text-[10px]">금지</span> 블록은 절대 사용하지 않음</li>
        </ul>
      </div>

      {pageTemplates.map(template => (
        <section key={template.id} className="guide-section">
          <SectionHeading tag="h2" sub={template.description}>
            {template.emoji} {template.name}
          </SectionHeading>

          {/* 블록 목록 */}
          <div className="guide-card mb-4">
            <h3 className="font-semibold text-sm text-card-foreground mb-3">블록 구조</h3>
            <div className="space-y-2">
              {template.blocks.map((block, i) => {
                const bt = blockTypeLabel[block.type];
                return (
                  <div key={i} className={`flex items-start gap-3 py-2 border-b border-border/40 last:border-0 ${block.type === "forbidden" ? "opacity-50" : ""}`}>
                    <span className="flex-shrink-0 h-6 w-6 rounded bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-semibold">
                      {block.type === "forbidden" ? "✗" : i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-card-foreground">{block.title}</span>
                        <span className={`${bt.class} text-[10px]`}>{bt.text}</span>
                        {block.complianceLevel && complianceLabel[block.complianceLevel] && (
                          <span className={`${complianceLabel[block.complianceLevel].class} text-[10px]`}>
                            {complianceLabel[block.complianceLevel].text}
                          </span>
                        )}
                        {block.seoRelevant && <span className="guide-badge-info text-[10px]">SEO</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{block.purpose}</p>
                      {block.cta && <p className="text-xs text-accent mt-0.5">CTA: {block.cta}</p>}
                      {block.mobileBehavior && <p className="text-xs text-muted-foreground mt-0.5">📱 {block.mobileBehavior}</p>}
                      {block.photoFallback && <p className="text-xs text-warning mt-0.5">📷 사진 없을 때: {block.photoFallback}</p>}
                      {block.noBookingFallback && <p className="text-xs text-warning mt-0.5">📅 예약 없을 때: {block.noBookingFallback}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 메타 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="guide-card">
              <h4 className="font-semibold text-xs text-card-foreground mb-2">CTA & 신뢰 요소</h4>
              <p className="text-xs text-accent mb-1">핵심 CTA: {template.primaryCTA}</p>
              {template.secondaryCTA && <p className="text-xs text-muted-foreground mb-1">보조 CTA: {template.secondaryCTA}</p>}
              <div className="flex flex-wrap gap-1 mt-2">
                {template.trustElements.map(t => (
                  <span key={t} className="text-[10px] bg-secondary px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
            <div className="guide-card">
              <h4 className="font-semibold text-xs text-card-foreground mb-2">SEO & 컴플라이언스</h4>
              {template.seoPoints.length > 0 && (
                <ul className="text-xs text-muted-foreground space-y-0.5 mb-2">
                  {template.seoPoints.map(s => <li key={s}>🔍 {s}</li>)}
                </ul>
              )}
              {template.compliancePoints.length > 0 && (
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  {template.compliancePoints.map(c => <li key={c}>⚖️ {c}</li>)}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-3 text-xs text-muted-foreground bg-surface p-2 rounded">
            📱 모바일: {template.mobileRule}
          </div>
        </section>
      ))}
    </div>
  );
}
