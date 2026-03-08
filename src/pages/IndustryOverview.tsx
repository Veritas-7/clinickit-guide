import { SectionHeading } from "@/components/SectionHeading";
import { CheckItem } from "@/components/CheckItem";
import { AlertTriangle, TrendingUp, Users, Building, MapPin } from "lucide-react";

export default function IndustryOverview() {
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 홈페이지는 일반 서비스업 사이트와 근본적으로 다른 구조적 특성을 갖고 있습니다. 사용자의 기대, 법적 제약, 신뢰 형성 방식을 이해해야 효과적인 사이트를 만들 수 있습니다."
      >
        병원/의원 업종 특성
      </SectionHeading>

      {/* 일반 서비스업과의 차이 */}
      <section className="guide-section">
        <SectionHeading tag="h2">일반 서비스업 홈페이지와의 차이점</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr>
                <th>영역</th>
                <th>일반 서비스업</th>
                <th>병원/의원</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>방문 목적</td><td>비교·쇼핑 탐색</td><td>즉각적 정보 확인 후 행동(전화/예약)</td></tr>
              <tr><td>전환 경로</td><td>장바구니 → 결제</td><td>전화 → 예약 → 방문</td></tr>
              <tr><td>신뢰 기준</td><td>리뷰·가격·브랜드</td><td>의료진 경력·진료과목·위치·시설</td></tr>
              <tr><td>법적 제약</td><td>소비자보호법 중심</td><td>의료법·의료광고 심의 기준</td></tr>
              <tr><td>콘텐츠 톤</td><td>마케팅 중심</td><td>정보 제공 중심, 과장 금지</td></tr>
              <tr><td>모바일 비중</td><td>60~70%</td><td>80% 이상 (의원급 기준)</td></tr>
              <tr><td>지역 의존도</td><td>중~낮음</td><td>매우 높음</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 사용자가 가장 먼저 확인하는 정보 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="우선순위는 사용자의 실제 행동 패턴을 기반으로 합니다">
          정보 우선순위
        </SectionHeading>
        <ol className="space-y-3 text-sm">
          {[
            "어떤 진료를 하는 곳인가 (진료과목·서비스 범위)",
            "내 증상/상황에 맞는 곳인가 (적합성 판단)",
            "의료진을 믿을 수 있는가 (경력·전문의 여부)",
            "지금 진료 가능한가 (진료시간·휴진·대기)",
            "어디에 있는가 (위치·교통·주차)",
            "어떻게 예약/방문하는가 (전화·온라인 예약·초진 안내)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
              <span className="text-foreground/85">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 신뢰 형성 요소 */}
      <section className="guide-section">
        <SectionHeading tag="h2">신뢰 형성 요소</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "의료진 프로필", items: ["전문의 자격, 학력, 경력 중심", "과장 없는 객관적 이력", "실제 의료진 사진 (스톡 사진 금지)"] },
            { title: "시설·환경", items: ["실제 진료실, 대기실, 장비 사진", "청결하고 전문적인 인상", "과시적이지 않은 실제 공간"] },
            { title: "진료 정보", items: ["진료과목별 명확한 설명", "대상 환자·적응증 안내", "비급여 항목 투명 공개"] },
            { title: "접근성 정보", items: ["정확한 주소·지도", "대중교통·주차 안내", "진료시간·점심시간·휴진일 명시"] },
          ].map((block) => (
            <div key={block.title} className="guide-card">
              <h3 className="font-semibold text-sm mb-2 text-card-foreground">{block.title}</h3>
              <ul className="space-y-1">
                {block.items.map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 의료기관 유형별 차이 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="동일한 가이드를 기반으로 하되, 유형별로 강조 포인트가 달라집니다">
          의료기관 유형별 차이
        </SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr>
                <th>유형</th>
                <th>핵심 강조점</th>
                <th>주요 CTA</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>지역 의원형</td><td>접근성, 진료시간, 위치</td><td>전화, 오시는 길</td></tr>
              <tr><td>전문클리닉형</td><td>진료 분야 전문성, 의료진</td><td>상담 예약, 진료 문의</td></tr>
              <tr><td>검진센터형</td><td>검진 프로그램, 비급여 안내</td><td>검진 예약, 프로그램 비교</td></tr>
              <tr><td>복합 병원형</td><td>진료과별 안내, 의료진 다수</td><td>진료과 선택, 의료진 찾기</td></tr>
            </tbody>
          </table>
        </div>
        <div className="guide-notice-info mt-4">
          <p className="text-sm"><strong>확장 예정:</strong> 성형외과, 피부미용 시술 중심, 치과, 한의원, 대형 대학병원은 별도 분기 버전으로 추후 확장합니다. 이번 가이드는 일반적인 병원/의원형을 기본으로 합니다.</p>
        </div>
      </section>

      {/* 자주 실패하는 패턴 */}
      <section className="guide-section">
        <SectionHeading tag="h2" badge={<span className="guide-badge-warning"><AlertTriangle className="h-3 w-3" /> 주의</span>}>
          자주 실패하는 패턴
        </SectionHeading>
        <div className="space-y-3">
          {[
            { title: "첫 화면에서 진료 내용 불명확", desc: "이미지 슬라이더와 인사말만 있고 어떤 진료를 하는 곳인지 알 수 없음" },
            { title: "진료시간/휴진 정보 접근 어려움", desc: "하단 Footer에만 진료시간이 있어 스크롤해야 확인 가능" },
            { title: "의료진 소개 빈약 또는 과장", desc: "이름과 직위만 있거나, 반대로 과장된 수식어로 신뢰 저하" },
            { title: "CTA 부재 또는 모호한 CTA", desc: "'자세히 보기' 같은 모호한 버튼, 전화/예약 CTA가 눈에 띄지 않음" },
            { title: "모바일 전화/지도 연동 미흡", desc: "전화번호가 클릭 불가 텍스트, 지도가 네이티브 앱과 연동되지 않음" },
            { title: "정보와 광고 혼재", desc: "건강 칼럼과 시술 홍보가 구분 없이 섞여 있어 신뢰도 하락" },
          ].map((item) => (
            <div key={item.title} className="guide-notice-warning">
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-sm text-foreground/75 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 대표 전환 흐름 */}
      <section className="guide-section">
        <SectionHeading tag="h2" sub="병원/의원 사이트에서 방문자가 전환되는 대표적인 흐름">
          대표 전환 흐름
        </SectionHeading>
        <div className="guide-card">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {["검색/지도 유입", "→", "첫 화면에서 진료 확인", "→", "진료과목 or 증상 탐색", "→", "의료진 확인", "→", "진료시간/위치 확인", "→", "전화 or 예약"].map((step, i) => (
              <span key={i} className={step === "→" ? "text-accent font-bold" : "bg-secondary px-3 py-1.5 rounded-md text-foreground/85"}>
                {step}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
