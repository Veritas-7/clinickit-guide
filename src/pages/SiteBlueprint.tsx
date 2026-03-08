import { useState, useEffect, useMemo } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { CopyBlock } from "@/components/CopyBlock";
import { PageNavigation } from "@/components/PageNavigation";
import { Link, useLocation } from "react-router-dom";
import { briefFields } from "@/data/clientBriefFields";
import { pageTemplates } from "@/data/templateBlueprints";
import { siteTypeRules, ctaPriorityRules, coreBlocks } from "@/data/implementationRules";
import { jsonLdTemplates } from "@/data/seoConfig";
import { AlertTriangle, Copy, Check, FileText, Smartphone, Search, ShieldCheck, ChevronRight } from "lucide-react";

type BriefData = Record<string, string | string[]>;

function loadBrief(): BriefData {
  try {
    const stored = localStorage.getItem("clientBrief");
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    return parsed.data || parsed;
  } catch { return {}; }
}

function inferSiteType(data: BriefData): { type: string; reasons: string[] } {
  const instType = (data.institutionType as string) || "";
  const depts = (data.departments as string[]) || [];
  const doctors = parseInt((data.doctorCount as string) || "1");
  const booking = (data.bookingMethod as string[]) || [];
  const hasOnline = booking.some(b => b.includes("온라인") || b.includes("네이버") || b.includes("카카오"));
  const reasons: string[] = [];

  if (instType === "검진센터") { reasons.push("기관 유형: 검진센터"); return { type: "검진센터형", reasons }; }
  if (doctors >= 3 && depts.length >= 3) { reasons.push(`의료진 ${doctors}명`, `진료과 ${depts.length}개`); return { type: "정보 제공형", reasons }; }
  if (doctors >= 2) { reasons.push(`전문의 ${doctors}명`); return { type: "전문의 신뢰형", reasons }; }
  if (hasOnline) { reasons.push("온라인 예약 가능"); return { type: "예약 유도형", reasons }; }
  reasons.push("단일/소규모 의원, 지역 밀착");
  return { type: "지역 의원형", reasons };
}

function getRecommendedPages(data: BriefData): { required: string[]; optional: string[]; removable: string[] } {
  const userRequired = (data.requiredPages as string[]) || [];
  const base = ["홈", "진료과목", "의료진", "진료시간/방문안내", "오시는 길"];
  const required = [...new Set([...base, ...userRequired])];
  const optional: string[] = [];
  const removable: string[] = [];

  if ((data.nonCoveredInfo as string) === "필요") required.push("비급여 안내");
  else removable.push("비급여 안내");
  if ((data.blogColumn as string) === "운영") optional.push("건강정보/칼럼");
  else removable.push("건강정보/칼럼");
  if (!required.includes("예약/문의")) optional.push("예약/문의");
  if (!required.includes("FAQ")) optional.push("FAQ");
  if (!required.includes("병원 소개")) optional.push("병원 소개");
  if (!required.includes("증상/질환 안내")) removable.push("증상/질환 안내");

  return { required, optional, removable };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground border border-border rounded px-1.5 py-0.5 transition-colors"
      aria-label="복사">
      {copied ? <><Check className="h-3 w-3 text-success" /> 복사됨</> : <><Copy className="h-3 w-3" /> 복사</>}
    </button>
  );
}

export default function SiteBlueprint() {
  const [data, setData] = useState<BriefData>({});
  const { pathname } = useLocation();

  useEffect(() => { setData(loadBrief()); }, []);

  const hasBrief = Object.keys(data).length > 0;
  const { type: siteType, reasons } = useMemo(() => inferSiteType(data), [data]);
  const pages = useMemo(() => getRecommendedPages(data), [data]);
  const hospitalName = (data.hospitalName as string) || "[병원명]";
  const region = (data.region as string) || "[지역]";
  const depts = (data.departments as string[]) || [];
  const phone = (data.phone as string) || "[전화번호]";
  const address = (data.address as string) || "[주소]";
  const hasOnline = ((data.bookingMethod as string[]) || []).some(b => b.includes("온라인") || b.includes("네이버") || b.includes("카카오"));
  const doctorInfo = (data.doctorInfoReady as string) || "";
  const photoTypes = (data.photoTypes as string[]) || [];
  const hasFacilityPhotos = photoTypes.some(p => p.includes("진료실") || p.includes("대기실") || p.includes("로비"));
  const doctorCount = parseInt((data.doctorCount as string) || "1");

  // Generate meta templates
  const metaTitle = `${hospitalName} | ${region} ${depts[0] || "내과"} 전문의 진료`;
  const metaDesc = `${region} ${depts.slice(0, 2).join(", ")} 전문의가 진료하는 ${hospitalName}. 진료시간, 오시는 길, ${hasOnline ? "온라인 예약" : "전화 문의"} 안내.`;

  // Generate Lovable prompt
  const lovablePrompt = `병원/의원 홈페이지를 만들어줘.

병원명: ${hospitalName}
지역: ${region}
진료과목: ${depts.join(", ") || "[진료과목]"}
전화번호: ${phone}
주소: ${address}
진료시간: ${(data.weekdayHours as string) || "[평일 시간]"} (평일), ${(data.saturdayHours as string) || "[토요일 시간]"} (토요일)
점심시간: ${(data.lunchHours as string) || "[점심시간]"}
휴진: ${(data.closedDays as string) || "[휴진일]"}
의료진: ${doctorCount}명
사이트 유형: ${siteType}

필수 페이지: ${pages.required.join(", ")}
핵심 CTA: ${hasOnline ? "온라인 예약 > 전화 > 오시는 길" : "전화 문의 > 오시는 길 > 진료시간 확인"}
모바일 하단 고정 CTA: ${hasOnline ? "전화 / 예약 / 오시는 길" : "전화 / 오시는 길 / 진료시간"}

톤: 차분하고 신뢰감 있는, 정보 중심, 과장 없는 전문성
컬러: 네이비 + 틸 계열, 화이트 배경
모바일 우선 설계
JSON-LD: MedicalBusiness, ${doctorCount > 1 ? "Physician, " : ""}FAQPage
SEO: 지역+진료과목 키워드, NAP 일관성, canonical 적용`;

  // Page structure generation for each template
  const generatePageBlocks = (templateId: string) => {
    const template = pageTemplates.find(t => t.id === templateId);
    if (!template) return null;
    return template;
  };

  const mobileCTA = hasOnline
    ? ["전화 문의 (tel: 링크)", "온라인 예약", "오시는 길 (지도 앱)"]
    : ["전화 문의 (tel: 링크)", "오시는 길 (지도 앱)", "진료시간 확인"];

  const trustElements = [
    { label: "의료진 프로필", status: doctorInfo.includes("사진") ? "ready" : doctorInfo.includes("경력") ? "partial" : "missing" },
    { label: "시설 사진", status: hasFacilityPhotos ? "ready" : "missing" },
    { label: "진료시간 명시", status: data.weekdayHours ? "ready" : "missing" },
    { label: "위치/지도 정보", status: data.address ? "ready" : "missing" },
    { label: "전화번호", status: data.phone ? "ready" : "missing" },
  ];

  const jsonLdTypes = ["MedicalBusiness"];
  if (doctorCount > 1) jsonLdTypes.push("Physician");
  jsonLdTypes.push("FAQPage");
  if ((data.blogColumn as string) === "운영") jsonLdTypes.push("Article");

  return (
    <div>
      <SectionHeading tag="h1" sub="고객사 브리프 기반으로 공개용 병원/의원 사이트의 구조, CTA, SEO, 산출물을 자동 도출합니다.">
        사이트 블루프린트
      </SectionHeading>

      {!hasBrief && (
        <div className="guide-notice-warning mb-8">
          <p className="text-sm"><AlertTriangle className="h-4 w-4 inline mr-1" />브리프 데이터가 없습니다. <Link to="/client-brief" className="text-accent underline font-medium">고객사 브리프</Link>를 먼저 작성하세요.</p>
        </div>
      )}

      {/* ===== 사이트 유형 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">추천 사이트 유형</SectionHeading>
        <div className="guide-card-accent">
          <div className="flex items-center gap-3 mb-3">
            <span className="guide-badge-info text-sm font-semibold">{siteType}</span>
            <span className="text-sm text-muted-foreground">{hospitalName} · {region}</span>
          </div>
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1">판별 근거:</p>
            <ul className="space-y-0.5">{reasons.map((r, i) => <li key={i} className="text-sm text-card-foreground">• {r}</li>)}</ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {siteTypeRules.map(rule => (
              <div key={rule.condition} className={`p-3 rounded-lg border ${rule.result.startsWith(siteType) ? "border-accent bg-accent/5" : "border-border/50 opacity-60"}`}>
                <p className="text-muted-foreground text-xs">{rule.condition}</p>
                <p className="font-medium text-card-foreground mt-0.5">{rule.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA 전략 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">핵심 CTA 우선순위</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(hasOnline
            ? [{ rank: "1순위", cta: "온라인 예약", icon: "📅" }, { rank: "2순위", cta: "전화 문의", icon: "📞" }, { rank: "3순위", cta: "오시는 길", icon: "📍" }]
            : [{ rank: "1순위", cta: "전화 문의", icon: "📞" }, { rank: "2순위", cta: "오시는 길", icon: "📍" }, { rank: "3순위", cta: "진료시간 확인", icon: "🕐" }]
          ).map(c => (
            <div key={c.rank} className="guide-card text-center">
              <span className="text-2xl">{c.icon}</span>
              <p className="text-xs text-muted-foreground mt-1">{c.rank}</p>
              <p className="text-sm font-semibold text-card-foreground">{c.cta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 페이지 구조 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">추천 페이지 구조</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-1.5"><span className="guide-badge-success text-[10px]">필수</span>필수 페이지</h3>
            <div className="space-y-1.5">{pages.required.map(p => <div key={p} className="guide-card text-sm py-2 px-3">{p}</div>)}</div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-1.5"><span className="guide-badge-info text-[10px]">권장</span>선택 페이지</h3>
            <div className="space-y-1.5">{pages.optional.map(p => <div key={p} className="guide-card text-sm py-2 px-3 opacity-80">{p}</div>)}</div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-1.5"><span className="guide-badge-warning text-[10px]">생략 가능</span>제거 가능</h3>
            <div className="space-y-1.5">{pages.removable.map(p => <div key={p} className="guide-card text-sm py-2 px-3 opacity-60">{p}</div>)}</div>
          </div>
        </div>
      </section>

      {/* ===== 홈페이지 블록 순서 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">추천 홈페이지 블록 순서</SectionHeading>
        <div className="guide-card">
          <ol className="space-y-2">
            {coreBlocks.map((block, i) => (
              <li key={block} className="flex items-center gap-3 text-sm">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                <span className="text-foreground/85">{block}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== 페이지별 블록 구조 출력 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">페이지별 블록 구조</SectionHeading>
        <div className="space-y-4">
          {["homepage", "departments", "doctors", "visit-info", "location", "reservation", "faq", "non-covered"].map(id => {
            const t = generatePageBlocks(id);
            if (!t) return null;
            const blockTypeLabel = { required: "필수", optional: "선택", conditional: "조건부", forbidden: "금지" } as const;
            const blockTypeBadge = { required: "guide-badge-success", optional: "guide-badge-info", conditional: "guide-badge-warning", forbidden: "guide-badge-emergency" } as const;
            return (
              <details key={id} className="guide-card group">
                <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-card-foreground">
                  <span>{t.emoji}</span> {t.name}
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="mt-3 space-y-2">
                  {t.blocks.map((b, bi) => (
                    <div key={bi} className="flex items-start gap-2 text-sm py-1.5 border-b border-border/30 last:border-0">
                      <span className={`${blockTypeBadge[b.type]} text-[10px] flex-shrink-0 mt-0.5`}>{blockTypeLabel[b.type]}</span>
                      <div>
                        <span className="font-medium text-card-foreground">{b.title}</span>
                        <span className="text-muted-foreground ml-2">{b.purpose}</span>
                        {b.photoFallback && !hasFacilityPhotos && <p className="text-[11px] text-warning mt-0.5">사진 없음 대체: {b.photoFallback}</p>}
                        {b.noBookingFallback && !hasOnline && <p className="text-[11px] text-info mt-0.5">예약 없음 대체: {b.noBookingFallback}</p>}
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
                    <span>CTA: <strong className="text-card-foreground">{t.primaryCTA}</strong></span>
                    <span>모바일: {t.mobileRule}</span>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* ===== 모바일 고정 CTA ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2"><Smartphone className="h-5 w-5 inline mr-1" />모바일 고정 CTA</SectionHeading>
        <div className="guide-card">
          <div className="flex gap-2 justify-center">
            {mobileCTA.map((c, i) => (
              <div key={i} className="flex-1 bg-primary text-primary-foreground rounded-lg py-3 text-center text-sm font-medium">
                {c.split(" (")[0]}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">모바일 하단 고정 바 예시 — 예시 데이터</p>
        </div>
      </section>

      {/* ===== 신뢰 요소 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">신뢰 요소 현황</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-2 text-sm">
            {trustElements.map(e => (
              <li key={e.label} className={`flex items-center gap-2 ${e.status === "ready" ? "text-success" : e.status === "partial" ? "text-warning" : "text-muted-foreground"}`}>
                {e.status === "ready" ? "✓" : e.status === "partial" ? "⚠️" : "—"} {e.label}
                {e.status === "missing" && <span className="text-xs">(미보유)</span>}
                {e.status === "partial" && <span className="text-xs">(부분 보유)</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 히어로 예시 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">추천 히어로 구조</SectionHeading>
        <div className="guide-card">
          <div className="bg-primary rounded-lg p-6 text-primary-foreground mb-3">
            <p className="text-xs opacity-60 mb-2">히어로 예시 — 예시 데이터</p>
            <h3 className="text-xl font-bold mb-1">
              {depts.length > 0 ? `${depts.slice(0, 2).join(" · ")} 전문의 진료` : "전문의가 함께하는 건강한 일상"}
            </h3>
            <p className="text-sm opacity-80 mb-3">{region} · {hospitalName}</p>
            <div className="flex gap-2">
              <span className="bg-accent text-accent-foreground px-4 py-2 rounded text-sm font-medium">{hasOnline ? "진료 예약" : "전화 문의"}</span>
              <span className="border border-primary-foreground/30 px-4 py-2 rounded text-sm">진료과목 보기</span>
            </div>
          </div>
          {!hasFacilityPhotos && <p className="text-xs text-warning">⚠️ 시설 사진 미보유: 컬러 배경 + 텍스트 중심 히어로 권장</p>}
        </div>
      </section>

      {/* ===== SEO ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2"><Search className="h-5 w-5 inline mr-1" />추천 SEO 구조</SectionHeading>
        <div className="space-y-3">
          <div className="guide-card">
            <p className="text-xs text-muted-foreground mb-1">메타 타이틀</p>
            <div className="flex items-center gap-2">
              <code className="guide-code text-sm flex-1">{metaTitle}</code>
              <CopyButton text={metaTitle} />
            </div>
          </div>
          <div className="guide-card">
            <p className="text-xs text-muted-foreground mb-1">메타 디스크립션</p>
            <div className="flex items-center gap-2">
              <code className="guide-code text-sm flex-1">{metaDesc}</code>
              <CopyButton text={metaDesc} />
            </div>
          </div>
          <div className="guide-card">
            <p className="text-xs text-muted-foreground mb-1">추천 JSON-LD</p>
            <div className="flex flex-wrap gap-1.5">{jsonLdTypes.map(t => <span key={t} className="guide-badge-info">{t}</span>)}</div>
          </div>
          <div className="guide-card">
            <p className="text-xs text-muted-foreground mb-1">NAP 일관성</p>
            <p className="text-sm text-card-foreground">{hospitalName} · {address} · {phone}</p>
          </div>
        </div>
      </section>

      {/* ===== 마이크로카피 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">예시 마이크로카피</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "CTA 버튼", copy: hasOnline ? "온라인 예약하기" : "전화로 문의하기" },
            { label: "히어로 서브카피", copy: `${region}에서 ${depts[0] || "내과"} 전문의가 정성껏 진료합니다` },
            { label: "방문 안내", copy: "첫 방문이신가요? 준비물과 진료 절차를 미리 확인하세요" },
            { label: "진료시간 안내", copy: "오늘 진료 가능한 시간을 확인하세요" },
            { label: "의료진 소개", copy: `${doctorCount}명의 전문의가 함께합니다` },
            { label: "위치 안내", copy: `${(data.transit as string)?.split(",")[0] || "역에서 도보 이동 가능"}` },
          ].map(m => (
            <div key={m.label} className="guide-card py-3 px-4">
              <p className="text-[11px] text-muted-foreground mb-0.5">{m.label}</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-card-foreground">{m.copy}</p>
                <CopyButton text={m.copy} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 컴플라이언스 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2"><ShieldCheck className="h-5 w-5 inline mr-1" />컴플라이언스 검토 포인트</SectionHeading>
        <div className="guide-notice-review">
          <ul className="space-y-1.5 text-sm">
            <li>• 히어로/진료 카피 과장 여부 → 법률 검토 필요</li>
            <li>• 의료진 자격/경력 사실 확인 → 반드시 검증</li>
            {(data.nonCoveredInfo as string) === "필요" && <li>• 비급여 가격 정확성 → 변동 가능성 안내 필수</li>}
            {((data.complianceSensitive as string[]) || []).includes("치료 사례/후기") && <li>• 치료 사례/후기 → 동의 확인, 과장 금지</li>}
            {((data.complianceSensitive as string[]) || []).includes("이벤트/프로모션") && <li>• 이벤트/프로모션 → 부당 유인 여부 검토</li>}
            <li className="text-muted-foreground text-xs pt-1">※ 이 가이드는 법률 자문을 대체하지 않습니다.</li>
          </ul>
        </div>
      </section>

      {/* ===== Lovable 프롬프트 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2"><FileText className="h-5 w-5 inline mr-1" />공개용 사이트 생성 프롬프트</SectionHeading>
        <p className="text-sm text-muted-foreground mb-3">고객사 정보가 반영된 Lovable용 프롬프트입니다. 복사하여 새 프로젝트에서 바로 사용하세요.</p>
        <CopyBlock content={lovablePrompt} label="Lovable 프롬프트" language="prompt" />
      </section>

      {/* ===== JSON-LD 템플릿 ===== */}
      <section className="guide-section">
        <SectionHeading tag="h2">JSON-LD 템플릿</SectionHeading>
        <div className="space-y-3">
          <CopyBlock
            content={jsonLdTemplates.medicalBusiness
              .replace("[병원명]", hospitalName)
              .replace("[전화번호]", phone)
              .replace("[도로명주소]", address)
              .replace("[사이트 URL]", `https://${hospitalName.replace(/\s/g, "")}.com`)}
            label="MedicalBusiness"
            language="JSON-LD"
          />
        </div>
      </section>

      {/* ===== 하단 링크 ===== */}
      <div className="guide-section text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/client-brief" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">← 브리프 수정</Link>
          <Link to="/implementation-rules" className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">구현 규칙 확인 →</Link>
        </div>
      </div>

      <PageNavigation currentPath={pathname} />
    </div>
  );
}
