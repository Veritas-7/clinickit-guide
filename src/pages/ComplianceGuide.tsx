import { SectionHeading } from "@/components/SectionHeading";
import { CheckItem } from "@/components/CheckItem";

export default function ComplianceGuide() {
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

      {/* 주요 검토 영역 */}
      <section className="guide-section">
        <SectionHeading tag="h2">법률 검토가 필요한 주요 영역</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "의료진 소개", items: ["전문의 자격 표기의 정확성", "학력/경력/수상 이력의 사실 여부", "과장된 수식어 사용 여부"] },
            { title: "진료 설명/카피", items: ["치료 결과 단정 표현 여부", "과장/비교/우월 표현 여부", "환자 불안 과도 자극 여부"] },
            { title: "후기/사례/경험담", items: ["실제 환자 동의 여부", "허위 또는 조작 여부", "결과 보장처럼 오해될 수 있는지"] },
            { title: "비포/애프터 사진", items: ["환자 동의 확보 여부", "과도한 보정 여부", "오해를 유발하는 연출 여부"] },
            { title: "이벤트/프로모션", items: ["할인/무료 표현의 적법성", "의료 행위에 대한 부당 유인 여부", "기간/조건 명시 여부"] },
            { title: "랭킹/수상/인증", items: ["출처와 기준의 명확성", "허위 또는 과장 여부", "오래된 정보의 현행성"] },
            { title: "언론 노출/기사", items: ["실제 보도 사실 여부", "광고성 기사와의 구분", "인용 맥락의 정확성"] },
            { title: "비급여 가격 표시", items: ["가격 표시의 정확성", "변동 가능성 안내 여부", "관련 법적 요건 준수"] },
          ].map((block) => (
            <div key={block.title} className="guide-card">
              <h3 className="font-semibold text-sm mb-2 text-card-foreground">{block.title}</h3>
              <ul className="space-y-1">
                {block.items.map((item, i) => <CheckItem key={i} type="warning">{item}</CheckItem>)}
              </ul>
            </div>
          ))}
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
                <td>"고혈압, 당뇨 등 만성질환 관리를 도와드립니다"</td>
                <td>"완벽한 만성질환 관리를 약속합니다"</td>
              </tr>
              <tr>
                <td className="font-medium">의료진</td>
                <td>"OO대학 졸업, OO병원 수련, 내과 전문의"</td>
                <td>"지역 최고의 명의가 직접 진료합니다"</td>
              </tr>
              <tr>
                <td className="font-medium">시설</td>
                <td>"최신 초음파 장비를 갖추고 있습니다"</td>
                <td>"타 병원에 없는 최첨단 장비 보유"</td>
              </tr>
              <tr>
                <td className="font-medium">CTA</td>
                <td>"진료 예약하기"</td>
                <td>"지금 바로 예약하지 않으면 후회합니다!"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 페이지별 검토 필요 요소 */}
      <section className="guide-section">
        <SectionHeading tag="h2">페이지별 검토 필요 요소</SectionHeading>
        <div className="overflow-x-auto">
          <table className="guide-table">
            <thead>
              <tr><th>페이지</th><th>검토 필요 요소</th><th>우선도</th></tr>
            </thead>
            <tbody>
              <tr><td>홈페이지</td><td>히어로 카피, 의료진 소개 요약</td><td><span className="guide-badge-review">높음</span></td></tr>
              <tr><td>진료과목</td><td>진료 설명, 적응증 표현</td><td><span className="guide-badge-review">높음</span></td></tr>
              <tr><td>의료진</td><td>자격, 경력, 수상 이력 전체</td><td><span className="guide-badge-emergency">매우 높음</span></td></tr>
              <tr><td>증상/질환</td><td>증상 설명, 자가진단 유도 여부</td><td><span className="guide-badge-review">높음</span></td></tr>
              <tr><td>예약/문의</td><td>개인정보 수집·이용 동의</td><td><span className="guide-badge-emergency">매우 높음</span></td></tr>
              <tr><td>비급여</td><td>가격 표시, 변동 안내</td><td><span className="guide-badge-review">높음</span></td></tr>
              <tr><td>블로그/칼럼</td><td>의학 정보 정확성, 광고 혼재</td><td><span className="guide-badge-warning">중간</span></td></tr>
              <tr><td>FAQ</td><td>치료 결과 단정 여부</td><td><span className="guide-badge-warning">중간</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 검토 라벨 시스템 */}
      <section className="guide-section">
        <SectionHeading tag="h2">컴포넌트별 "검토 필요" 라벨 시스템</SectionHeading>
        <div className="guide-card">
          <p className="text-sm text-muted-foreground mb-3">각 컴포넌트에 아래 라벨을 부착하여 검토 필요 여부를 한눈에 파악할 수 있게 합니다.</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="guide-badge-success">검토 불필요</span>
              <span className="text-sm text-muted-foreground">순수 UI/구조적 요소 (버튼 스타일, 레이아웃 등)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="guide-badge-warning">검토 권장</span>
              <span className="text-sm text-muted-foreground">정보성 콘텐츠 (FAQ, 방문 안내 등)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="guide-badge-review">검토 필요</span>
              <span className="text-sm text-muted-foreground">진료 설명, 의료진 정보, 비급여 등</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="guide-badge-emergency">반드시 검토</span>
              <span className="text-sm text-muted-foreground">후기, 비포/애프터, 이벤트, 수상/랭킹 등</span>
            </div>
          </div>
        </div>
      </section>

      {/* 출시 전 검수 흐름 */}
      <section className="guide-section">
        <SectionHeading tag="h2">출시 전 법률/광고 검수 흐름</SectionHeading>
        <div className="guide-card">
          <ol className="space-y-3 text-sm">
            {[
              "콘텐츠 초안 작성 완료",
              "내부 컴플라이언스 체크리스트 점검",
              "\"검토 필요\" 라벨 부착 항목 목록 추출",
              "법률/광고 전문가에게 검토 의뢰",
              "피드백 반영 및 수정",
              "최종 확인 후 배포",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span className="text-foreground/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 운영 중 재검토 */}
      <section className="guide-section">
        <SectionHeading tag="h2">운영 중 콘텐츠 수정 시 재검토 포인트</SectionHeading>
        <div className="guide-notice-info">
          <ul className="space-y-2 text-sm">
            <li>• 의료진 변경 (입사/퇴사/자격 변경) 시 즉시 업데이트 및 검토</li>
            <li>• 진료과목 추가/변경 시 관련 페이지 전체 재검토</li>
            <li>• 비급여 가격 변경 시 즉시 반영</li>
            <li>• 블로그/칼럼 신규 게시 시 광고성 여부 검토</li>
            <li>• 이벤트/프로모션 등록 시 반드시 사전 검토</li>
            <li>• 환자 후기 추가 시 동의 확보 및 표현 검토</li>
          </ul>
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
    </div>
  );
}
