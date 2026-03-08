import { useLocation } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckItem } from "@/components/CheckItem";
import { PageNavigation } from "@/components/PageNavigation";
import { PageToc, type TocItem } from "@/components/PageToc";

const tocItems: TocItem[] = [
  { id: "journey", label: "대표 사용자 여정" },
  { id: "visit-purpose", label: "방문 목적별 UX 분기" },
  { id: "above-fold", label: "Above the Fold 정보" },
  { id: "cta-rules", label: "CTA 배치 원칙" },
  { id: "mobile-ux", label: "모바일 UX 우선순위" },
  { id: "trust-placement", label: "의료진 신뢰 요소 배치" },
  { id: "form-strategy", label: "폼 최소화 전략" },
  { id: "microcopy", label: "환자 안심 마이크로카피" },
  { id: "bounce", label: "이탈 지점과 개선" },
  { id: "summary", label: "핵심 UX 원칙 요약" },
];

export default function UxGuide() {
  const { pathname } = useLocation();
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 사이트 방문자의 행동 패턴과 기대를 기반으로 한 UX 설계 원칙. 정보 구조, 전환 흐름, 모바일 우선 전략을 정리합니다."
      >
        UX 가이드
      </SectionHeading>

      <div className="guide-notice-info mb-6">
        <p className="text-sm font-semibold mb-1">📋 핵심 요약</p>
        <ul className="text-sm space-y-0.5">
          <li>• 3초 내에 "무슨 곳 / 어디 / 지금 뭘 할 수 있는지" 전달</li>
          <li>• 모바일 80%+ → 하단 고정 CTA 바 필수</li>
          <li>• CTA: "예약하기", "전화 문의" 등 구체적 문구만 사용</li>
          <li>• 감성 연출보다 정보 구조와 신뢰가 우선</li>
        </ul>
      </div>

      <div className="guide-notice-success mb-8">
        <p className="text-sm font-semibold mb-1">⚡ 빠른 적용 포인트</p>
        <ul className="text-sm space-y-0.5">
          <li>• 히어로: 진료과+지역+CTA (이미지 슬라이더 X)</li>
          <li>• 전화 CTA: tel: 링크, 모바일 하단 바 필수</li>
          <li>• 예약 폼: 최소 필드 (이름, 연락처, 희망일시)</li>
          <li>• 지도: 탭 시 네이버 지도/카카오맵 앱 연동</li>
        </ul>
      </div>

      <PageToc items={tocItems} />

      <section id="journey" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2" sub="대부분의 방문자는 아래 흐름 중 하나를 따릅니다">
          대표 사용자 여정
        </SectionHeading>
        <div className="guide-card">
          <div className="space-y-4">
            {[
              { step: "1", title: "유입", desc: "검색(지역+진료과), 지도 앱, 지인 추천, 블로그 등을 통해 사이트에 도착" },
              { step: "2", title: "적합성 확인", desc: "내 증상/상황에 맞는 진료를 하는 곳인지 확인 (진료과목, 대상 환자)" },
              { step: "3", title: "신뢰 확인", desc: "의료진 경력, 전문의 여부, 시설 수준을 확인하며 신뢰 판단" },
              { step: "4", title: "실용 정보 확인", desc: "진료시간, 위치, 주차, 초진 준비사항 등 방문 전 필요 정보 수집" },
              { step: "5", title: "행동 전환", desc: "전화 문의, 온라인 예약, 또는 지도 앱으로 길 확인" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">{item.step}</span>
                <div>
                  <p className="font-semibold text-sm text-card-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="visit-purpose" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">방문 목적별 UX 분기</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>유형</th><th>목적</th><th>우선 노출 정보</th><th>핵심 CTA</th></tr>
            </thead>
            <tbody>
              <tr><td className="font-medium">진료과 확인형</td><td>어떤 진료를 하는 곳인지</td><td>진료과목 카드, 서비스 범위</td><td>진료과목 보기</td></tr>
              <tr><td className="font-medium">증상 탐색형</td><td>내 증상에 맞는 곳인지</td><td>증상별 안내, 자가 점검 X (→ 안내만)</td><td>진료 문의</td></tr>
              <tr><td className="font-medium">바로 예약형</td><td>이미 결정, 빠른 예약</td><td>예약 버튼, 전화번호, 진료시간</td><td>전화/예약</td></tr>
              <tr><td className="font-medium">위치 확인형</td><td>가기 전 위치·교통 확인</td><td>지도, 주소, 주차, 대중교통</td><td>오시는 길</td></tr>
              <tr><td className="font-medium">보호자 대리형</td><td>가족/자녀 대신 검색</td><td>대상 환자, 소아/노인 안내</td><td>전화 문의</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="above-fold" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2" sub="첫 화면(스크롤 전)에서 반드시 전달해야 하는 정보">
          Above the Fold 정보 우선순위
        </SectionHeading>
        <div className="guide-card-accent">
          <ol className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="font-bold text-accent">1.</span> 무슨 진료를 하는 곳인가 (병원 유형 + 주요 진료과)</li>
            <li className="flex gap-2"><span className="font-bold text-accent">2.</span> 어디에 있는가 (지역명)</li>
            <li className="flex gap-2"><span className="font-bold text-accent">3.</span> 지금 무엇을 할 수 있는가 (전화 / 예약 CTA)</li>
            <li className="flex gap-2"><span className="font-bold text-accent">4.</span> 진료시간 (오늘 진료 가능 여부)</li>
          </ol>
        </div>
        <div className="guide-notice-warning mt-4">
          <p className="text-sm"><strong>주의:</strong> 이미지 슬라이더, 원장 인사말, 수상 이력 등은 첫 화면의 핵심 정보를 밀어내면 안 됩니다.</p>
        </div>
      </section>

      <section id="cta-rules" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">CTA 배치 원칙</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">전화 CTA</h3>
            <ul className="space-y-1">
              <CheckItem>Quick Info Bar에 항상 노출</CheckItem>
              <CheckItem>모바일 하단 고정 바에 포함</CheckItem>
              <CheckItem>tel: 링크로 탭 즉시 발신</CheckItem>
              <CheckItem>진료시간 외 시간에는 상태 표시</CheckItem>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">예약 CTA</h3>
            <ul className="space-y-1">
              <CheckItem>히어로 섹션, 페이지 하단에 배치</CheckItem>
              <CheckItem>모바일 하단 고정 바에 포함</CheckItem>
              <CheckItem>"예약하기"처럼 구체적 문구 사용</CheckItem>
              <CheckItem>폼은 최소 필드 (이름, 연락처, 희망 일시)</CheckItem>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">오시는 길 CTA</h3>
            <ul className="space-y-1">
              <CheckItem>네이버 지도 / 카카오맵 앱 연동</CheckItem>
              <CheckItem>주소 복사 기능</CheckItem>
              <CheckItem>주차 정보 함께 표시</CheckItem>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2">CTA 문구 원칙</h3>
            <ul className="space-y-1">
              <CheckItem>"예약하기", "전화 문의" 등 구체적으로</CheckItem>
              <CheckItem type="warning">"자세히 보기", "더 알아보기" 등 모호한 문구 지양</CheckItem>
              <CheckItem type="warning">과도한 긴급 유도("지금 바로!", "놓치지 마세요!") 금지</CheckItem>
            </ul>
          </div>
        </div>
      </section>

      <section id="mobile-ux" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2" sub="의원급 사이트 방문의 80% 이상이 모바일입니다">
          모바일 UX 우선순위
        </SectionHeading>
        <div className="guide-notice-info">
          <ul className="space-y-2 text-sm">
            <li>• <span className="guide-badge-info text-[10px]">필수</span> 하단 고정 CTA 바 (전화 / 예약 / 오시는 길)</li>
            <li>• <span className="guide-badge-info text-[10px]">필수</span> 전화번호 탭 → 즉시 발신</li>
            <li>• <span className="guide-badge-info text-[10px]">필수</span> 지도 탭 → 네이버 지도 / 카카오맵 앱 실행</li>
            <li>• 진료시간은 스크롤 없이 확인 가능한 위치</li>
            <li>• 카드형 UI로 빠른 스캔</li>
            <li>• 폼 필드 최소화, 전화번호 키패드 자동 표시</li>
            <li>• 이미지 지연 로딩</li>
          </ul>
        </div>
      </section>

      <section id="trust-placement" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">의료진 신뢰 요소 배치 원칙</SectionHeading>
        <div className="guide-card">
          <ul className="space-y-1">
            <CheckItem>실제 사진 + 이름 + 직위 + 전공 + 핵심 경력</CheckItem>
            <CheckItem>전문의 자격은 사실 기반으로만 표기</CheckItem>
            <CheckItem>홈페이지에서 최소 1명은 노출 (스크롤 3~4번째 섹션 이내)</CheckItem>
            <CheckItem type="warning">과장된 수식어, 허위 경력, 가상 인물 금지</CheckItem>
            <CheckItem type="warning">수상/언론 노출은 사실 확인 후에만 표기</CheckItem>
          </ul>
        </div>
      </section>

      <section id="form-strategy" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">폼 최소화 전략</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2 text-success">✓ 권장: 최소 필드</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 이름</li><li>• 연락처</li><li>• 희망 진료과 (선택)</li><li>• 희망 일시 (선택)</li><li>• 문의 내용 (간단 텍스트)</li>
            </ul>
          </div>
          <div className="guide-card">
            <h3 className="font-semibold text-sm mb-2 text-emergency">✗ 지양: 과도한 필드</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 주민등록번호</li><li>• 상세 병력 (전화로 안내)</li><li>• 주소 (불필요한 경우)</li><li>• 복잡한 드롭다운 다수</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="microcopy" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">환자 불안을 줄이는 마이크로카피</SectionHeading>
        <div className="guide-card">
          <div className="space-y-3 text-sm">
            {[
              { context: "초진 안내", good: "처음 방문이시라면 신분증을 지참해 주세요", bad: "첫 방문 시 반드시 준비하지 않으면 진료 불가!" },
              { context: "예약 폼", good: "예약 후 확인 연락을 드립니다", bad: "예약을 놓치면 다음 순서로 밀립니다" },
              { context: "진료시간 외", good: "현재 진료시간이 아닙니다. 평일 09:00부터 전화 가능합니다", bad: "지금은 전화를 받을 수 없습니다" },
            ].map((item) => (
              <div key={item.context} className="border-b border-border/50 pb-3 last:border-0">
                <p className="font-medium text-card-foreground">{item.context}</p>
                <p className="text-success mt-1">✓ {item.good}</p>
                <p className="text-emergency mt-0.5">✗ {item.bad}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="bounce" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">이탈이 많은 지점과 개선 방법</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead><tr><th>이탈 지점</th><th>원인</th><th>개선 방법</th></tr></thead>
            <tbody>
              <tr><td>첫 화면</td><td>무슨 곳인지 불명확</td><td>진료과+지역+핵심 CTA 즉시 노출</td></tr>
              <tr><td>진료과목 페이지</td><td>정보 없이 이름만 나열</td><td>대상 환자, 주요 증상, 간단 설명 추가</td></tr>
              <tr><td>예약 폼</td><td>필드 과다, 복잡한 절차</td><td>필드 최소화, 전화 대안 제공</td></tr>
              <tr><td>모바일 전체</td><td>전화/지도 연동 미흡</td><td>하단 고정 바, tel: 링크, 지도 앱 연동</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="summary" className="guide-section scroll-mt-16">
        <SectionHeading tag="h2">핵심 UX 원칙 요약</SectionHeading>
        <div className="guide-notice-success">
          <ul className="space-y-2 text-sm">
            <li>• 몇 초 안에 "무슨 진료 / 어디 / 지금 뭘 할 수 있는지" 이해 가능해야 한다</li>
            <li>• 모바일에서 전화/예약/지도가 매우 빨라야 한다</li>
            <li>• 복잡한 의학 용어는 쉬운 설명을 병행한다</li>
            <li>• 자가진단 오해를 유발하는 흐름은 피한다</li>
            <li>• 비응급 의원에서 과도한 긴급 유도를 쓰지 않는다</li>
            <li>• 감성 연출보다 정보 구조와 신뢰가 우선이다</li>
          </ul>
        </div>
      </section>

      <PageNavigation currentPath={pathname} />
    </div>
  );
}
