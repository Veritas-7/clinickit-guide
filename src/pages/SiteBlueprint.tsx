import { useState, useEffect, useMemo } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { briefFields } from "@/data/clientBriefFields";
import { pageTemplates } from "@/data/templateBlueprints";
import { siteTypeRules, ctaPriorityRules, coreBlocks } from "@/data/implementationRules";

type BriefData = Record<string, string | string[]>;

function inferSiteType(data: BriefData): string {
  const type = (data.institutionType as string) || "";
  const depts = (data.departments as string[]) || [];
  const doctors = parseInt((data.doctorCount as string) || "1");
  const booking = (data.bookingMethod as string[]) || [];
  const hasOnlineBooking = booking.some(b => b.includes("온라인"));

  if (type === "검진센터") return "검진센터형";
  if (doctors >= 3 && depts.length >= 3) return "정보 제공형";
  if (doctors >= 2) return "전문의 신뢰형";
  if (hasOnlineBooking) return "예약 유도형";
  return "지역 의원형";
}

function getRecommendedPages(data: BriefData): string[] {
  const required = (data.requiredPages as string[]) || [];
  const base = ["홈", "진료과목", "의료진", "진료시간/방문안내", "오시는 길"];
  const all = [...new Set([...base, ...required])];
  if ((data.nonCoveredInfo as string) === "필요") all.push("비급여 안내");
  if ((data.blogColumn as string) === "운영") all.push("건강정보/칼럼");
  return all;
}

export default function SiteBlueprint() {
  const [data, setData] = useState<BriefData>({});

  useEffect(() => {
    const stored = localStorage.getItem("clientBrief");
    if (stored) setData(JSON.parse(stored));
  }, []);

  const hasBrief = Object.keys(data).length > 0;
  const siteType = useMemo(() => inferSiteType(data), [data]);
  const recommendedPages = useMemo(() => getRecommendedPages(data), [data]);
  const hospitalName = (data.hospitalName as string) || "[병원명]";
  const region = (data.region as string) || "[지역]";
  const depts = (data.departments as string[]) || [];
  const hasOnlineBooking = ((data.bookingMethod as string[]) || []).some(b => b.includes("온라인"));
  const doctorInfo = (data.doctorInfoReady as string) || "";
  const photoTypes = (data.photoTypes as string[]) || [];
  const hasFacilityPhotos = photoTypes.some(p => p.includes("진료실") || p.includes("대기실") || p.includes("로비"));

  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="고객사 브리프 기반으로 공개용 병원/의원 사이트의 추천 구조와 전략을 도출합니다."
      >
        사이트 블루프린트
      </SectionHeading>

      {!hasBrief && (
        <div className="guide-notice-warning mb-8">
          <p className="text-sm">브리프 데이터가 없습니다. <Link to="/client-brief" className="text-accent underline">고객사 브리프</Link>를 먼저 작성해 주세요.</p>
        </div>
      )}

      {/* 사이트 유형 */}
      <section className="guide-section">
        <SectionHeading tag="h2">추천 사이트 유형</SectionHeading>
        <div className="guide-card-accent">
          <div className="flex items-center gap-3 mb-3">
            <span className="guide-badge-info text-sm">{siteType}</span>
            <span className="text-sm text-muted-foreground">{hospitalName} · {region}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {siteTypeRules.map(rule => (
              <div key={rule.condition} className={`p-3 rounded-lg border ${rule.result.startsWith(siteType) ? "border-accent bg-accent/5" : "border-border/50"}`}>
                <p className="text-muted-foreground text-xs">{rule.condition}</p>
                <p className="font-medium text-card-foreground mt-0.5">{rule.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 페이지 구조 */}
      <section className="guide-section">
        <SectionHeading tag="h2">추천 페이지 구조</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pageTemplates.filter(t => {
            const nameMap: Record<string, string> = {
              homepage: "홈", departments: "진료과목", symptoms: "증상/질환 안내",
              doctors: "의료진", about: "병원 소개", "visit-info": "진료시간/방문안내",
              location: "오시는 길", reservation: "예약/문의", faq: "FAQ",
              notice: "건강정보/칼럼", "non-covered": "비급여 안내",
            };
            return recommendedPages.some(p => nameMap[t.id]?.includes(p) || t.name.includes(p)) || t.id === "homepage";
          }).map(t => (
            <div key={t.id} className="guide-card">
              <div className="flex items-center gap-2 mb-2">
                <span>{t.emoji}</span>
                <h3 className="font-semibold text-sm text-card-foreground">{t.name}</h3>
                <span className="guide-badge-info text-[10px]">필수</span>
              </div>
              <p className="text-xs text-muted-foreground">{t.description}</p>
              <p className="text-xs text-accent mt-1">CTA: {t.primaryCTA}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 핵심 CTA 전략 */}
      <section className="guide-section">
        <SectionHeading tag="h2">핵심 CTA 전략</SectionHeading>
        <div className="guide-card">
          {ctaPriorityRules.map(rule => (
            <div key={rule.condition} className={`py-2 border-b border-border/40 last:border-0 ${
              (hasOnlineBooking && rule.condition.includes("시스템 있음")) ||
              (!hasOnlineBooking && rule.condition.includes("예약 없음"))
                ? "bg-accent/5 rounded px-2 -mx-2" : ""
            }`}>
              <p className="text-xs text-muted-foreground">{rule.condition}</p>
              <p className="text-sm font-medium text-card-foreground">{rule.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 모바일 핵심 액션 */}
      <section className="guide-section">
        <SectionHeading tag="h2">모바일 핵심 액션</SectionHeading>
        <div className="guide-notice-info">
          <ul className="space-y-1 text-sm">
            <li>• 하단 고정 CTA: {hasOnlineBooking ? "전화 / 예약 / 오시는 길" : "전화 / 오시는 길 / 진료시간"}</li>
            <li>• 전화 탭 → 즉시 발신 (tel: 링크)</li>
            <li>• 지도 탭 → 네이버 지도/카카오맵 앱 연동</li>
            <li>• 진료시간 스크롤 없이 확인 가능</li>
          </ul>
        </div>
      </section>

      {/* 추천 히어로 */}
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
              <span className="bg-accent text-accent-foreground px-4 py-2 rounded text-sm font-medium">
                {hasOnlineBooking ? "진료 예약" : "전화 문의"}
              </span>
              <span className="border border-primary-foreground/30 px-4 py-2 rounded text-sm">진료과목 보기</span>
            </div>
          </div>
          {!hasFacilityPhotos && (
            <p className="text-xs text-warning">⚠️ 시설 사진 미보유: 컬러 배경 + 텍스트 중심 히어로를 권장합니다.</p>
          )}
        </div>
      </section>

      {/* 신뢰 요소 */}
      <section className="guide-section">
        <SectionHeading tag="h2">추천 신뢰 요소</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-2 text-sm">
            <li className={doctorInfo.includes("사진") ? "text-success" : "text-warning"}>
              {doctorInfo.includes("사진") ? "✓" : "⚠️"} 의료진 사진 + 경력 프로필 {!doctorInfo.includes("사진") && "(사진 미보유 — 텍스트 프로필로 대체)"}
            </li>
            <li className={hasFacilityPhotos ? "text-success" : "text-muted-foreground"}>
              {hasFacilityPhotos ? "✓" : "—"} 시설/환경 사진 {!hasFacilityPhotos && "(보유 사진 없음 — 생략 또는 아이콘 대체)"}
            </li>
            <li className="text-success">✓ 정확한 진료시간 테이블</li>
            <li className="text-success">✓ 지도 + 주소 + 교통 정보</li>
          </ul>
        </div>
      </section>

      {/* 추천 SEO */}
      <section className="guide-section">
        <SectionHeading tag="h2">추천 SEO 구조</SectionHeading>
        <div className="guide-card">
          <div className="space-y-2 text-sm">
            <p><strong>메타 타이틀:</strong> <code className="guide-code">{hospitalName} | {region} {depts[0] || "내과"} 전문의 진료</code></p>
            <p><strong>메타 디스크립션:</strong> <code className="guide-code">{region} {depts.slice(0, 2).join(", ")} 전문의가 진료하는 {hospitalName}. 진료시간, 오시는 길, 온라인 예약 안내.</code></p>
            <p><strong>JSON-LD:</strong> MedicalBusiness, Physician, FAQPage</p>
            <p><strong>NAP 일관성:</strong> {hospitalName} · {(data.address as string) || "[주소]"} · {(data.phone as string) || "[전화]"}</p>
          </div>
        </div>
      </section>

      {/* 핵심 블록 순서 */}
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

      {/* 하단 링크 */}
      <div className="guide-section text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/client-brief" className="border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
            ← 브리프 수정
          </Link>
          <Link to="/implementation-rules" className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            구현 규칙 확인 →
          </Link>
        </div>
      </div>
    </div>
  );
}
