import { useLocation } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckItem } from "@/components/CheckItem";
import { PageNavigation } from "@/components/PageNavigation";

export default function ContentGuide() {
  const { pathname } = useLocation();
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 웹사이트에서 사용하는 카피와 콘텐츠의 톤, 원칙, 템플릿. 신뢰를 높이고 법적 리스크를 줄이는 방향으로 작성합니다."
      >
        콘텐츠 가이드
      </SectionHeading>

      {/* 문장 톤 */}
      <section className="guide-section">
        <SectionHeading tag="h2">신뢰를 높이는 문장 톤</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-1">
            <CheckItem>차분하고 명확한 어투 — 과장 없이 사실 기반</CheckItem>
            <CheckItem>쉬운 설명 우선, 필요 시 의학 용어 병행</CheckItem>
            <CheckItem>환자 관점의 언어 — "~ 하실 수 있습니다", "~ 도움이 됩니다"</CheckItem>
            <CheckItem>불안을 자극하지 않는 안심 톤</CheckItem>
            <CheckItem type="warning">"최고", "완치", "부작용 없음", "반드시", "유일", "1위" 등 단정/과장 금지</CheckItem>
          </ul>
        </div>
      </section>

      {/* 진료과목 소개 */}
      <section className="guide-section">
        <SectionHeading tag="h2">진료과목 소개 문장 템플릿</SectionHeading>
        <div className="guide-card-accent">
          <p className="text-xs text-muted-foreground mb-2">※ 예시 데이터입니다. 실제 병원에 맞게 수정하세요.</p>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-card-foreground">구조: [진료과명] — [대상 환자] — [주요 진료 범위] — [특징]</p>
            </div>
            <div className="bg-surface p-3 rounded">
              <p className="font-medium text-card-foreground">내과</p>
              <p className="text-muted-foreground mt-1">감기, 소화기 질환, 고혈압, 당뇨 등 성인 내과 질환을 진료합니다. 만성질환 관리와 건강검진을 통해 지역 주민의 건강을 함께합니다.</p>
            </div>
            <div className="bg-surface p-3 rounded">
              <p className="font-medium text-card-foreground">소아청소년과</p>
              <p className="text-muted-foreground mt-1">영유아부터 청소년까지, 감염 질환, 성장 발달, 예방접종 등을 진료합니다. 아이와 보호자가 편안하게 방문할 수 있는 환경을 갖추고 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 증상/상황 안내 */}
      <section className="guide-section">
        <SectionHeading tag="h2">증상/상황 안내 문장 템플릿</SectionHeading>
        <div className="guide-card">
          <p className="text-xs text-muted-foreground mb-2">※ 예시 데이터입니다.</p>
          <div className="space-y-3 text-sm">
            <div className="bg-surface p-3 rounded">
              <p className="font-medium text-card-foreground">"기침이 2주 이상 지속된다면"</p>
              <p className="text-muted-foreground mt-1">장기간 지속되는 기침은 다양한 원인이 있을 수 있습니다. 호흡기 내과 진료를 통해 정확한 원인을 확인하고 적절한 치료를 받으실 수 있습니다.</p>
            </div>
            <div className="guide-notice-info">
              <p className="text-sm"><strong>원칙:</strong> "이 증상이 있으면 반드시 ~ 해야 합니다" 식의 자가진단 유도 금지. "~ 하실 수 있습니다", "~ 도움이 됩니다" 식의 안내 톤 유지.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 의료진 소개 */}
      <section className="guide-section">
        <SectionHeading tag="h2" badge={<span className="guide-badge-review">검토 필요</span>}>
          의료진 소개 문장 템플릿
        </SectionHeading>
        <div className="guide-card">
          <p className="text-xs text-muted-foreground mb-2">※ 예시 데이터입니다. 실존 인물이 아닙니다.</p>
          <div className="bg-surface p-3 rounded text-sm">
            <p className="font-medium text-card-foreground">홍길동 원장 | 내과 전문의</p>
            <p className="text-muted-foreground mt-1">OO대학교 의과대학 졸업<br />OO병원 내과 전공의 수련<br />대한내과학회 정회원</p>
            <p className="text-muted-foreground mt-2">"지역 주민분들의 건강을 가까이에서 함께하겠습니다."</p>
          </div>
          <div className="guide-notice-review mt-3">
            <p className="text-sm"><strong>컴플라이언스:</strong> 모든 학력, 경력, 자격, 학회 정보는 사실 확인 필수. 허위 정보 기재 금지. 과장된 수식어("최고의 명의", "업계 최고 경력") 금지.</p>
          </div>
        </div>
      </section>

      {/* 히어로 카피 공식 */}
      <section className="guide-section">
        <SectionHeading tag="h2">히어로 카피 공식</SectionHeading>
        <div className="guide-card">
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-card-foreground">공식: [핵심 가치/약속] + [진료 범위/대상] + [차별점 또는 지역성]</p>
            </div>
            <div className="space-y-2">
              {[
                "가족 모두의 건강을 함께합니다 — 내과·가정의학과 전문의 진료",
                "아이의 건강한 성장을 돕겠습니다 — 소아청소년과 전문 진료",
                "움직임이 편안한 일상을 위해 — 정형외과·재활의학과 협진 진료",
                "강남역 3번 출구, 걸어서 3분 — OO내과의원",
              ].map((ex) => (
                <p key={ex} className="bg-surface p-2 rounded text-muted-foreground">예시: {ex}</p>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">※ 예시 데이터입니다. 실제 병원에 맞게 수정하세요.</p>
          </div>
        </div>
      </section>

      {/* CTA 문구 */}
      <section className="guide-section">
        <SectionHeading tag="h2">CTA 문구 예시</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2 text-success">권장 CTA</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 진료 예약하기</li>
              <li>• 전화 문의 (02-1234-5678)</li>
              <li>• 오시는 길 확인</li>
              <li>• 진료과목 보기</li>
              <li>• 의료진 소개 보기</li>
              <li>• 진료시간 확인</li>
              <li>• 건강검진 프로그램 보기</li>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2 text-emergency">지양 CTA</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 자세히 보기 (무엇을?)</li>
              <li>• 더 알아보기 (모호함)</li>
              <li>• 지금 바로! (과도한 긴급 유도)</li>
              <li>• 놓치지 마세요! (광고 톤)</li>
              <li>• 무료 상담 받기 (오해 소지)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ 작성 방식 */}
      <section className="guide-section">
        <SectionHeading tag="h2">FAQ 작성 방식</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-1">
            <CheckItem>실제 환자가 자주 묻는 질문을 기반으로 작성</CheckItem>
            <CheckItem>질문은 환자 관점의 구어체로, 답변은 명확하고 간결하게</CheckItem>
            <CheckItem>1개 질문에 1개 핵심 답변 (긴 설명 지양)</CheckItem>
            <CheckItem>의학적 판단이 필요한 질문에는 "진료를 통해 확인" 안내</CheckItem>
            <CheckItem type="warning">답변에서 치료 결과를 단정하지 않기</CheckItem>
          </ul>
        </div>
      </section>

      {/* 피해야 할 문장 */}
      <section className="guide-section">
        <SectionHeading tag="h2" badge={<span className="guide-badge-warning">주의</span>}>
          피해야 할 문장 예시
        </SectionHeading>
        <div className="guide-notice-warning">
          <ul className="space-y-2 text-sm">
            <li>✗ "부작용 없이 안전하게 치료합니다" → 모든 치료에는 개인차가 있으므로 단정 금지</li>
            <li>✗ "100% 완치를 약속합니다" → 치료 결과 보장 표현 금지</li>
            <li>✗ "지역 1위 병원" → 검증 불가 순위 표현 금지</li>
            <li>✗ "이 증상을 방치하면 큰 병이 됩니다" → 공포 유발 표현 금지</li>
            <li>✗ "타 병원과 달리 저희만의 특별한 치료" → 비교 광고 주의</li>
            <li>✗ "환자 10만 명 돌파" → 허위 또는 검증 불가 수치 금지</li>
          </ul>
        </div>
      </section>

      <PageNavigation currentPath={pathname} />
    </div>
  );
}
