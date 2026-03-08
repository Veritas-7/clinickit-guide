import { SectionHeading } from "@/components/SectionHeading";

interface TemplateProps {
  name: string;
  sections: { title: string; purpose: string; cta?: string; complianceReview?: boolean }[];
  mobileNote: string;
}

function TemplateBlock({ name, sections, mobileNote }: TemplateProps) {
  return (
    <div className="guide-card mb-6">
      <h3 className="font-semibold text-base text-card-foreground mb-4">{name}</h3>
      <div className="space-y-2">
        {sections.map((s, i) => (
          <div key={i} className="flex items-start gap-3 py-2 border-b border-border/40 last:border-0">
            <span className="flex-shrink-0 h-6 w-6 rounded bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-semibold">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm text-card-foreground">{s.title}</span>
                {s.complianceReview && <span className="guide-badge-review text-[10px]">검토</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{s.purpose}</p>
              {s.cta && <p className="text-xs text-accent mt-0.5">추천 CTA: {s.cta}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-muted-foreground bg-surface p-2 rounded">
        📱 모바일: {mobileNote}
      </div>
    </div>
  );
}

export default function PageTemplates() {
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="실제 고객사 병원/의원 사이트 제작 시 바로 적용할 수 있는 페이지 템플릿. 각 템플릿의 섹션 순서, 목적, CTA, 컴플라이언스 검토 포인트를 포함합니다."
      >
        페이지 템플릿
      </SectionHeading>

      <section className="guide-section">
        <TemplateBlock
          name="🏠 홈페이지 템플릿"
          mobileNote="Quick Info Bar 축약, 하단 고정 CTA, 카드 2열 그리드, 긴 섹션 접기"
          sections={[
            { title: "Quick Info Bar", purpose: "전화, 진료시간, 위치, 예약 즉시 노출" },
            { title: "히어로 섹션", purpose: "어떤 진료를 하는 곳인지 + 핵심 CTA", cta: "진료 예약 / 진료과목 보기", complianceReview: true },
            { title: "진료과목/주요 진료", purpose: "카드형으로 진료 범위 빠르게 탐색", cta: "진료과목 상세" },
            { title: "증상/상황별 안내", purpose: "방문자 관점 진입 (나의 증상 → 적합한 진료)" },
            { title: "의료진 소개", purpose: "전문의 경력·사진으로 신뢰 형성", cta: "의료진 더보기", complianceReview: true },
            { title: "진료시간/방문안내", purpose: "오늘 진료 가능 여부 즉시 확인" },
            { title: "시설/환경 미리보기", purpose: "실제 공간 사진으로 안심 유도" },
            { title: "위치/오시는 길", purpose: "지도, 주소, 주차, 교통 정보", cta: "지도 앱 열기" },
            { title: "FAQ", purpose: "초진, 준비물, 주차 등 자주 묻는 질문" },
            { title: "최종 CTA 블록", purpose: "전화/예약/오시는 길 종합 전환", cta: "전화 문의 / 온라인 예약 / 오시는 길" },
            { title: "Footer", purpose: "병원 정보, 법적 고지, 사이트맵" },
          ]}
        />

        <TemplateBlock
          name="🩺 진료과목/서비스 소개 페이지"
          mobileNote="아코디언 형태로 진료과별 접기/펼치기"
          sections={[
            { title: "페이지 히어로", purpose: "진료과목 페이지임을 즉시 인지" },
            { title: "진료과목 목록", purpose: "카드 또는 탭으로 전체 진료과 표시" },
            { title: "각 진료과 상세", purpose: "대상 환자, 주요 증상, 진료 범위 설명", complianceReview: true },
            { title: "관련 의료진", purpose: "해당 진료과 담당 의료진 링크" },
            { title: "CTA", purpose: "진료 문의 또는 예약", cta: "진료 문의 / 예약" },
          ]}
        />

        <TemplateBlock
          name="🔍 증상/질환 안내 페이지"
          mobileNote="핵심 증상 목록 → 설명 → CTA 순서로 축약"
          sections={[
            { title: "페이지 히어로", purpose: "어떤 증상/질환에 대한 안내인지 명시" },
            { title: "증상 개요", purpose: "쉬운 언어로 증상 설명", complianceReview: true },
            { title: "관련 진료", purpose: "이 증상에 해당하는 진료과/서비스 안내" },
            { title: "방문 전 안내", purpose: "내원 전 준비사항, 검사 안내" },
            { title: "FAQ", purpose: "해당 증상 관련 자주 묻는 질문" },
            { title: "CTA", purpose: "진료 예약 또는 전화 문의", cta: "진료 예약" },
          ]}
        />

        <TemplateBlock
          name="👨‍⚕️ 의료진 소개 페이지"
          mobileNote="1열 카드 리스트, 사진 + 핵심 정보 축약"
          sections={[
            { title: "의료진 목록", purpose: "사진, 이름, 직위, 전공 한눈에" },
            { title: "개별 의료진 상세", purpose: "학력, 경력, 전문 분야, 인사말", complianceReview: true },
            { title: "CTA", purpose: "해당 의료진 진료 예약", cta: "진료 예약" },
          ]}
        />

        <TemplateBlock
          name="🏥 병원/의원 소개 페이지"
          mobileNote="연혁은 접기, 시설 사진 가로 스크롤"
          sections={[
            { title: "병원 소개 히어로", purpose: "병원 미션/비전 또는 핵심 메시지" },
            { title: "연혁/역사", purpose: "주요 이정표 (간결하게)" },
            { title: "시설/환경 갤러리", purpose: "실제 공간 사진" },
            { title: "인증/수상", purpose: "사실 기반 인증 정보만", complianceReview: true },
            { title: "CTA", purpose: "진료 예약 또는 방문 안내", cta: "오시는 길 / 예약" },
          ]}
        />

        <TemplateBlock
          name="🕐 진료시간/방문안내 페이지"
          mobileNote="오늘 요일 하이라이트, 지도 탭 시 앱 실행"
          sections={[
            { title: "진료시간 테이블", purpose: "요일별 진료시간, 점심, 휴진" },
            { title: "특이사항 공지", purpose: "임시 휴진, 변경 사항 안내" },
            { title: "초진 안내", purpose: "첫 방문 시 준비물, 절차 설명" },
            { title: "오시는 길 요약", purpose: "주소, 지도, 주차", cta: "지도 앱 열기" },
          ]}
        />

        <TemplateBlock
          name="📍 위치/오시는 길 페이지"
          mobileNote="지도 탭 시 네이버 지도/카카오맵 앱 연동"
          sections={[
            { title: "지도 임베드", purpose: "위치를 시각적으로 표시" },
            { title: "주소/연락처", purpose: "복사 가능한 주소, 전화번호" },
            { title: "대중교통", purpose: "지하철, 버스 노선 안내" },
            { title: "주차 안내", purpose: "주차장 위치, 무료 시간, 요금" },
            { title: "CTA", purpose: "전화 / 예약", cta: "전화 문의" },
          ]}
        />

        <TemplateBlock
          name="📅 예약/문의 페이지"
          mobileNote="필드 최소화, 전화번호 키패드 자동 표시"
          sections={[
            { title: "예약 폼", purpose: "이름, 연락처, 희망 일시, 문의 내용" },
            { title: "전화 문의 안내", purpose: "폼 대신 전화를 선호하는 방문자용" },
            { title: "진료시간 요약", purpose: "예약 가능 시간 참고" },
            { title: "안내 문구", purpose: "개인정보 처리, 예약 확인 절차 안내", complianceReview: true },
          ]}
        />

        <TemplateBlock
          name="❓ FAQ 페이지"
          mobileNote="아코디언 형태, 터치 영역 충분히 확보"
          sections={[
            { title: "카테고리 필터", purpose: "진료, 예약, 방문, 비용 등 분류" },
            { title: "FAQ 목록", purpose: "질문-답변 아코디언" },
            { title: "추가 문의 CTA", purpose: "답변을 찾지 못한 경우 전화/문의", cta: "전화 문의" },
          ]}
        />

        <TemplateBlock
          name="📰 공지/건강정보/칼럼 페이지"
          mobileNote="카드 리스트, 카테고리 필터 상단 고정"
          sections={[
            { title: "카테고리 탭", purpose: "공지사항, 건강정보, 칼럼 분류" },
            { title: "글 목록", purpose: "제목, 날짜, 요약이 보이는 카드 리스트" },
            { title: "글 상세", purpose: "본문, 관련 진료 링크", complianceReview: true },
            { title: "CTA", purpose: "관련 진료 예약 또는 전화 문의", cta: "진료 예약" },
          ]}
        />

        <TemplateBlock
          name="💰 비급여/안내 정보 페이지 (선택)"
          mobileNote="테이블 가로 스크롤 가능하게"
          sections={[
            { title: "비급여 항목 테이블", purpose: "항목명, 가격(범위), 비고", complianceReview: true },
            { title: "안내 문구", purpose: "가격 변동 가능성, 상담 권유", complianceReview: true },
            { title: "CTA", purpose: "상담 문의", cta: "전화 문의 / 상담 예약" },
          ]}
        />
      </section>
    </div>
  );
}
