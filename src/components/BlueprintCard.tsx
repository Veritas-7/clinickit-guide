import { useState } from "react";
import { Copy, Check, ChevronRight } from "lucide-react";
import { type PageTemplate } from "@/data/templateBlueprints";

interface BlueprintCardProps {
  template: PageTemplate;
  hasFacilityPhotos: boolean;
  hasOnlineBooking: boolean;
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async (e) => { e.stopPropagation(); await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground border border-border rounded px-1.5 py-0.5 transition-colors"
      aria-label="복사"
    >
      {copied ? <><Check className="h-3 w-3 text-success" /> 복사됨</> : <><Copy className="h-3 w-3" /> 복사</>}
    </button>
  );
}

const blockTypeBadge = {
  required: { label: "필수", cls: "guide-badge-success" },
  optional: { label: "선택", cls: "guide-badge-info" },
  conditional: { label: "조건부", cls: "guide-badge-warning" },
  forbidden: { label: "금지", cls: "guide-badge-emergency" },
} as const;

/** Standardized blueprint output card — uniform structure for all page types */
export function BlueprintCard({ template: t, hasFacilityPhotos, hasOnlineBooking }: BlueprintCardProps) {
  const required = t.blocks.filter(b => b.type === "required");
  const optional = t.blocks.filter(b => b.type === "optional");
  const conditional = t.blocks.filter(b => b.type === "conditional");
  const forbidden = t.blocks.filter(b => b.type === "forbidden");

  const summaryText = `[${t.name} 블록 구조]
필수: ${required.map(b => b.title).join(", ")}
선택: ${optional.map(b => b.title).join(", ") || "없음"}
조건부: ${conditional.map(b => b.title).join(", ") || "없음"}
금지: ${forbidden.map(b => b.title).join(", ") || "없음"}
핵심 CTA: ${t.primaryCTA}
${t.secondaryCTA ? `보조 CTA: ${t.secondaryCTA}` : ""}
신뢰 요소: ${t.trustElements.join(", ")}
모바일: ${t.mobileRule}
SEO: ${t.seoPoints.join(", ")}
컴플라이언스: ${t.compliancePoints.join(", ") || "없음"}
사진 없을 때: ${required.filter(b => b.photoFallback).map(b => `${b.title} → ${b.photoFallback}`).join("; ") || "해당 없음"}
예약 없을 때: ${required.filter(b => b.noBookingFallback).map(b => `${b.title} → ${b.noBookingFallback}`).join("; ") || "해당 없음"}`;

  return (
    <details className="guide-card group">
      <summary className="cursor-pointer flex items-center justify-between gap-2 text-sm font-semibold text-card-foreground">
        <span className="flex items-center gap-2">
          <span>{t.emoji}</span> {t.name}
          <span className="text-[10px] text-muted-foreground font-normal">({t.blocks.length}블록)</span>
        </span>
        <div className="flex items-center gap-2">
          <CopyBtn text={summaryText} />
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
        </div>
      </summary>

      <div className="mt-4 space-y-4">
        {/* Block groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: "필수 블록", blocks: required, badge: blockTypeBadge.required },
            { title: "선택 블록", blocks: optional, badge: blockTypeBadge.optional },
            { title: "조건부 블록", blocks: conditional, badge: blockTypeBadge.conditional },
            { title: "금지 블록", blocks: forbidden, badge: blockTypeBadge.forbidden },
          ].map(group => (
            <div key={group.title}>
              <p className="text-xs font-semibold text-card-foreground mb-1.5 flex items-center gap-1">
                <span className={`${group.badge.cls} text-[10px]`}>{group.badge.label}</span> {group.title}
              </p>
              {group.blocks.length > 0 ? (
                <ul className="space-y-1">
                  {group.blocks.map((b, i) => (
                    <li key={i} className="text-xs text-muted-foreground">• {b.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground/50">없음</p>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs font-semibold text-card-foreground mb-1">핵심 CTA</p>
            <p className="text-sm text-accent font-medium">{t.primaryCTA}</p>
            {t.secondaryCTA && (
              <>
                <p className="text-xs font-semibold text-card-foreground mt-2 mb-1">보조 CTA</p>
                <p className="text-sm text-muted-foreground">{t.secondaryCTA}</p>
              </>
            )}
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs font-semibold text-card-foreground mb-1">신뢰 요소</p>
            <div className="flex flex-wrap gap-1">
              {t.trustElements.map(te => (
                <span key={te} className="text-[10px] bg-background border border-border/50 rounded px-1.5 py-0.5">{te}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / SEO / Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="font-semibold text-card-foreground mb-1">📱 모바일 축약</p>
            <p className="text-muted-foreground">{t.mobileRule}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="font-semibold text-card-foreground mb-1">🔍 SEO 포인트</p>
            {t.seoPoints.length > 0 ? (
              <ul className="text-muted-foreground space-y-0.5">
                {t.seoPoints.map(s => <li key={s}>• {s}</li>)}
              </ul>
            ) : <p className="text-muted-foreground/50">없음</p>}
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="font-semibold text-card-foreground mb-1">⚖️ 컴플라이언스</p>
            {t.compliancePoints.length > 0 ? (
              <ul className="text-muted-foreground space-y-0.5">
                {t.compliancePoints.map(c => <li key={c}>• {c}</li>)}
              </ul>
            ) : <p className="text-muted-foreground/50">검토 불필요</p>}
          </div>
        </div>

        {/* Fallbacks */}
        {(t.blocks.some(b => b.photoFallback) || t.blocks.some(b => b.noBookingFallback)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-warning/5 rounded-lg p-3 border border-warning/20">
              <p className="font-semibold text-warning mb-1">📷 사진 부족 시 대체</p>
              {t.blocks.filter(b => b.photoFallback).map((b, i) => (
                <p key={i} className={`text-muted-foreground ${!hasFacilityPhotos ? "font-medium text-warning" : ""}`}>
                  {b.title}: {b.photoFallback}
                </p>
              ))}
              {t.blocks.filter(b => b.photoFallback).length === 0 && <p className="text-muted-foreground/50">해당 없음</p>}
            </div>
            <div className="bg-info/5 rounded-lg p-3 border border-info/20">
              <p className="font-semibold text-info mb-1">📅 예약 없을 때 대체</p>
              {t.blocks.filter(b => b.noBookingFallback).map((b, i) => (
                <p key={i} className={`text-muted-foreground ${!hasOnlineBooking ? "font-medium text-info" : ""}`}>
                  {b.title}: {b.noBookingFallback}
                </p>
              ))}
              {t.blocks.filter(b => b.noBookingFallback).length === 0 && <p className="text-muted-foreground/50">해당 없음</p>}
            </div>
          </div>
        )}
      </div>
    </details>
  );
}
