import { SectionHeading } from "@/components/SectionHeading";
import { Phone, Clock, MapPin, Calendar, ChevronRight, Star, MessageSquare, Menu, ArrowRight } from "lucide-react";

interface UiComponentCardProps {
  name: string;
  purpose: string;
  where: string;
  notWhen: string;
  desktopNote: string;
  mobileNote: string;
  textLength?: string;
  a11y?: string;
  compliance?: boolean;
  children?: React.ReactNode;
}

function UiComponentCard({ name, purpose, where, notWhen, desktopNote, mobileNote, textLength, a11y, compliance, children }: UiComponentCardProps) {
  return (
    <div className="guide-card">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-base text-card-foreground">{name}</h3>
        {compliance && <span className="guide-badge-review">검토 필요</span>}
      </div>
      {children}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div><span className="font-medium text-foreground">사용 목적:</span> <span className="text-muted-foreground">{purpose}</span></div>
        <div><span className="font-medium text-foreground">사용 위치:</span> <span className="text-muted-foreground">{where}</span></div>
        <div><span className="font-medium text-foreground">사용 금지:</span> <span className="text-muted-foreground">{notWhen}</span></div>
        <div><span className="font-medium text-foreground">데스크톱:</span> <span className="text-muted-foreground">{desktopNote}</span></div>
        <div><span className="font-medium text-foreground">모바일:</span> <span className="text-muted-foreground">{mobileNote}</span></div>
        {textLength && <div><span className="font-medium text-foreground">권장 텍스트:</span> <span className="text-muted-foreground">{textLength}</span></div>}
        {a11y && <div><span className="font-medium text-foreground">접근성:</span> <span className="text-muted-foreground">{a11y}</span></div>}
      </div>
    </div>
  );
}

export default function UiGuide() {
  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 사이트에서 반복 사용되는 핵심 UI 패턴과 컴포넌트. 각 패턴별 사용 목적, 위치, 주의사항을 정리합니다."
      >
        UI 가이드
      </SectionHeading>

      {/* 상단 정보 바 */}
      <section className="guide-section">
        <SectionHeading tag="h2">상단 정보 바 (Quick Info Bar)</SectionHeading>
        <UiComponentCard
          name="Quick Info Bar"
          purpose="전화번호, 진료시간, 위치, 예약 등 핵심 정보 즉시 노출"
          where="모든 페이지 최상단"
          notWhen="정보가 2개 미만일 때"
          desktopNote="좌측 정보 + 우측 CTA 버튼 배치"
          mobileNote="아이콘 중심 축약, 전화 탭 즉시 발신"
          a11y="각 항목에 aria-label 필수"
        >
          {/* 데모 */}
          <div className="bg-primary text-primary-foreground rounded-lg p-3 text-sm flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> 02-1234-5678</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 평일 09:00–18:00</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> 서울 강남구 역삼동</span>
            </div>
            <span className="flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-medium">
              <Calendar className="h-3 w-3" /> 예약하기
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">※ 예시 데이터입니다. 실제 병원 정보가 아닙니다.</p>
        </UiComponentCard>
      </section>

      {/* 헤더 */}
      <section className="guide-section">
        <SectionHeading tag="h2">헤더 & 내비게이션</SectionHeading>
        <UiComponentCard
          name="글로벌 헤더"
          purpose="병원 로고, 주요 메뉴, 예약/전화 CTA"
          where="모든 페이지 상단 (Quick Info Bar 아래)"
          notWhen="—"
          desktopNote="로고 좌측, 메뉴 중앙 또는 우측, CTA 우측 끝"
          mobileNote="로고 좌측, 햄버거 메뉴 우측, 전화 아이콘 노출"
          a11y="nav landmark, 현재 페이지 aria-current"
        >
          <div className="bg-card border rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">H</div>
              <span className="font-semibold text-sm text-card-foreground">OO의원</span>
            </div>
            <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
              <span>진료과목</span><span>의료진</span><span>진료안내</span><span>오시는 길</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1 text-sm bg-accent text-accent-foreground px-3 py-1.5 rounded font-medium">예약하기</span>
              <Menu className="h-5 w-5 md:hidden text-muted-foreground" />
            </div>
          </div>
        </UiComponentCard>
      </section>

      {/* 히어로 */}
      <section className="guide-section">
        <SectionHeading tag="h2">히어로 섹션</SectionHeading>
        <UiComponentCard
          name="히어로 섹션"
          purpose="어떤 진료를 하는 곳인지 즉시 전달, 핵심 CTA 유도"
          where="홈페이지 최상단"
          notWhen="서브 페이지에서 풀 히어로 사용"
          desktopNote="좌측 텍스트 + 우측 이미지 또는 풀 배경"
          mobileNote="텍스트 상단, 이미지 하단 또는 배경 오버레이"
          textLength="제목 15자 이내, 부제 40자 이내"
          compliance={true}
        >
          <div className="bg-primary rounded-lg p-6 md:p-8 text-primary-foreground">
            <p className="text-xs opacity-70 mb-2">예시 데이터</p>
            <h2 className="text-xl md:text-2xl font-bold mb-2">가족 모두의 건강을 함께합니다</h2>
            <p className="text-sm opacity-80 mb-4">내과·가정의학과 전문의 진료 | 평일 야간 진료 가능</p>
            <div className="flex gap-2">
              <span className="bg-accent text-accent-foreground px-4 py-2 rounded text-sm font-medium">진료 예약</span>
              <span className="border border-primary-foreground/30 px-4 py-2 rounded text-sm">진료과목 보기</span>
            </div>
          </div>
        </UiComponentCard>
      </section>

      {/* 진료과목 카드 */}
      <section className="guide-section">
        <SectionHeading tag="h2">진료과목 카드</SectionHeading>
        <UiComponentCard
          name="진료과목/서비스 카드"
          purpose="진료과 또는 주요 서비스를 카드형으로 빠르게 탐색"
          where="홈페이지, 진료과목 페이지"
          notWhen="단일 진료과만 있을 때"
          desktopNote="3~4열 그리드"
          mobileNote="2열 그리드 또는 가로 스크롤"
          textLength="제목 10자, 설명 30자"
          compliance={true}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["내과", "가정의학과", "소아청소년과", "건강검진"].map((dept) => (
              <div key={dept} className="bg-surface rounded-lg p-4 text-center hover:shadow-sm transition-shadow cursor-pointer border border-border/50">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <Star className="h-5 w-5 text-accent" />
                </div>
                <p className="font-medium text-sm text-card-foreground">{dept}</p>
                <p className="text-xs text-muted-foreground mt-0.5">전문의 진료</p>
              </div>
            ))}
          </div>
        </UiComponentCard>
      </section>

      {/* 의료진 소개 카드 */}
      <section className="guide-section">
        <SectionHeading tag="h2">의료진 소개 카드</SectionHeading>
        <UiComponentCard
          name="의료진 카드"
          purpose="의료진 신뢰 정보 전달 (사진, 이름, 전공, 경력)"
          where="홈페이지, 의료진 소개 페이지"
          notWhen="의료진 정보가 미확정일 때"
          desktopNote="2~3열 그리드, 사진 + 텍스트"
          mobileNote="1열 리스트 또는 가로 스크롤"
          textLength="이름, 직위, 전공, 핵심 경력 3줄 이내"
          a11y="사진 alt에 이름+직위"
          compliance={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "홍길동", title: "원장 | 내과 전문의", career: "OO대학교 의과대학 졸업 · OO병원 내과 전공의 수련" },
              { name: "김의사", title: "부원장 | 가정의학과 전문의", career: "OO의대 졸업 · OO대학병원 가정의학과 전임의" },
            ].map((doc) => (
              <div key={doc.name} className="bg-surface rounded-lg p-4 flex items-start gap-4 border border-border/50">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <span className="text-muted-foreground text-xs">사진</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-card-foreground">{doc.name}</p>
                  <p className="text-xs text-accent font-medium">{doc.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{doc.career}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">※ 예시 데이터입니다. 실존 인물이 아닙니다.</p>
        </UiComponentCard>
      </section>

      {/* 예약 CTA */}
      <section className="guide-section">
        <SectionHeading tag="h2">예약 / 전화 / 오시는 길 CTA</SectionHeading>
        <UiComponentCard
          name="CTA 블록"
          purpose="방문자를 전화/예약/방문 행동으로 전환"
          where="홈페이지 중간·하단, 각 페이지 하단"
          notWhen="이미 CTA가 충분히 노출된 영역"
          desktopNote="풀 폭 배너 또는 카드형"
          mobileNote="하단 고정 바 형태 권장"
          a11y="버튼에 명확한 label, tel: 링크 사용"
        >
          <div className="bg-primary rounded-lg p-6 text-primary-foreground text-center">
            <p className="text-xs opacity-70 mb-1">예시 데이터</p>
            <h3 className="font-bold text-lg mb-1">지금 바로 진료 예약하세요</h3>
            <p className="text-sm opacity-80 mb-4">전화 상담 또는 온라인 예약이 가능합니다</p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5"><Phone className="h-4 w-4" /> 전화 문의</span>
              <span className="bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5"><Calendar className="h-4 w-4" /> 온라인 예약</span>
              <span className="bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5"><MapPin className="h-4 w-4" /> 오시는 길</span>
            </div>
          </div>
        </UiComponentCard>
      </section>

      {/* 진료시간 블록 */}
      <section className="guide-section">
        <SectionHeading tag="h2">진료시간 / 휴진 정보 블록</SectionHeading>
        <UiComponentCard
          name="진료시간 테이블"
          purpose="요일별 진료시간, 점심시간, 휴진일을 명확히 전달"
          where="홈, 진료안내, 방문안내 페이지"
          notWhen="—"
          desktopNote="테이블 또는 그리드 형태"
          mobileNote="세로형 리스트, 오늘 요일 하이라이트"
          a11y="테이블에 caption, th scope 적용"
        >
          <div className="bg-surface rounded-lg overflow-hidden border border-border/50">
            <table className="w-full text-sm">
              <thead><tr className="bg-secondary"><th className="px-4 py-2 text-left font-medium">요일</th><th className="px-4 py-2 text-left font-medium">진료시간</th><th className="px-4 py-2 text-left font-medium">비고</th></tr></thead>
              <tbody>
                <tr className="border-t border-border/40"><td className="px-4 py-2">월–금</td><td className="px-4 py-2">09:00–18:00</td><td className="px-4 py-2 text-muted-foreground">점심 13:00–14:00</td></tr>
                <tr className="border-t border-border/40"><td className="px-4 py-2">토요일</td><td className="px-4 py-2">09:00–13:00</td><td className="px-4 py-2 text-muted-foreground">오전 진료</td></tr>
                <tr className="border-t border-border/40"><td className="px-4 py-2">일·공휴일</td><td className="px-4 py-2 text-emergency font-medium">휴진</td><td className="px-4 py-2"></td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">※ 예시 데이터입니다.</p>
        </UiComponentCard>
      </section>

      {/* FAQ 아코디언 */}
      <section className="guide-section">
        <SectionHeading tag="h2">FAQ 아코디언</SectionHeading>
        <UiComponentCard
          name="FAQ 아코디언"
          purpose="자주 묻는 질문을 접기/펼치기 형태로 효율적 제공"
          where="홈페이지, FAQ 전용 페이지, 진료 안내 하단"
          notWhen="질문이 3개 미만일 때"
          desktopNote="최대 폭 제한, 1열 리스트"
          mobileNote="동일 구조, 터치 영역 충분히 확보"
          a11y="aria-expanded, 키보드 탐색 지원"
        >
          <div className="space-y-2">
            {[
              { q: "초진 시 준비물이 있나요?", a: "신분증과 건강보험증을 지참해 주세요. 타 병원 검사 결과가 있다면 함께 가져오시면 도움이 됩니다." },
              { q: "주차가 가능한가요?", a: "건물 지하 주차장을 이용하실 수 있습니다. 진료 시 2시간 무료 주차가 가능합니다." },
            ].map((faq) => (
              <div key={faq.q} className="border border-border/60 rounded-lg">
                <div className="px-4 py-3 flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-sm text-card-foreground">{faq.q}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="px-4 pb-3 text-sm text-muted-foreground">{faq.a}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">※ 예시 데이터입니다.</p>
        </UiComponentCard>
      </section>

      {/* 모바일 하단 고정 CTA 바 */}
      <section className="guide-section">
        <SectionHeading tag="h2">모바일 하단 고정 CTA 바</SectionHeading>
        <UiComponentCard
          name="모바일 하단 고정 바"
          purpose="모바일에서 전화/예약/지도를 항상 접근 가능하게"
          where="모바일 뷰 전체 (모든 페이지)"
          notWhen="데스크톱 뷰"
          desktopNote="미표시"
          mobileNote="하단 고정, 2~4개 핵심 액션"
          a11y="safe area 확보, 충분한 터치 영역 (44px+)"
        >
          <div className="bg-card border-t-2 border-accent rounded-b-lg p-2 flex items-center justify-around max-w-sm mx-auto">
            {[
              { icon: <Phone className="h-5 w-5" />, label: "전화" },
              { icon: <Calendar className="h-5 w-5" />, label: "예약" },
              { icon: <MapPin className="h-5 w-5" />, label: "오시는 길" },
              { icon: <Clock className="h-5 w-5" />, label: "진료시간" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 py-1.5 px-3 text-accent cursor-pointer">
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </UiComponentCard>
      </section>

      {/* 버튼 시스템 */}
      <section className="guide-section">
        <SectionHeading tag="h2">버튼 시스템</SectionHeading>
        <div className="guide-card">
          <div className="flex flex-wrap gap-3 mb-4">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">Primary</button>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium">Accent</button>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border">Secondary</button>
            <button className="border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium">Outline</button>
            <button className="text-accent text-sm font-medium flex items-center gap-1">Text Link <ArrowRight className="h-3.5 w-3.5" /></button>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Primary: 주요 행동 (예약하기, 문의하기)</p>
            <p>• Accent: 강조 행동 (전화 연결, 긴급 CTA)</p>
            <p>• Secondary: 보조 행동 (자세히 보기, 목록 보기)</p>
            <p>• Outline: 낮은 우선순위 행동</p>
            <p>• Text Link: 인라인 탐색</p>
            <p>• 모든 버튼에 hover / focus / active / disabled 상태 필수</p>
          </div>
        </div>
      </section>

      {/* 폼 필드 */}
      <section className="guide-section">
        <SectionHeading tag="h2">폼 필드 상태</SectionHeading>
        <div className="guide-card">
          <div className="max-w-sm space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">이름 (기본)</label>
              <input className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card" placeholder="이름을 입력하세요" readOnly />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">연락처 (포커스)</label>
              <input className="w-full border-2 border-accent rounded-lg px-3 py-2 text-sm bg-card ring-2 ring-accent/20" placeholder="010-0000-0000" readOnly />
            </div>
            <div>
              <label className="text-sm font-medium text-emergency mb-1 block">이메일 (에러)</label>
              <input className="w-full border border-emergency rounded-lg px-3 py-2 text-sm bg-card" placeholder="올바른 이메일을 입력해 주세요" readOnly />
              <p className="text-xs text-emergency mt-1">이메일 형식이 올바르지 않습니다.</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground space-y-1">
            <p>• 라벨은 필드 상단에 배치 (플로팅 라벨 지양)</p>
            <p>• 에러 메시지는 필드 하단에 즉시 표시</p>
            <p>• 필수 필드 표시 명확히</p>
            <p>• 자동완성 속성(autocomplete) 적극 활용</p>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <section className="guide-section">
        <SectionHeading tag="h2">푸터</SectionHeading>
        <UiComponentCard
          name="글로벌 푸터"
          purpose="병원 기본 정보, 진료시간, 위치, 법적 고지"
          where="모든 페이지 하단"
          notWhen="—"
          desktopNote="3~4열 그리드"
          mobileNote="1열 스택, 핵심 정보 상단"
          a11y="footer landmark, 링크에 명확한 텍스트"
        >
          <div className="bg-primary text-primary-foreground rounded-lg p-5 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold mb-1">OO의원</p>
                <p className="opacity-70 text-xs">서울 강남구 역삼동 123-45 OO빌딩 3층</p>
                <p className="opacity-70 text-xs">Tel. 02-1234-5678</p>
              </div>
              <div>
                <p className="font-semibold mb-1">진료시간</p>
                <p className="opacity-70 text-xs">평일 09:00–18:00 / 토 09:00–13:00</p>
                <p className="opacity-70 text-xs">점심 13:00–14:00 / 일·공휴일 휴진</p>
              </div>
              <div>
                <p className="font-semibold mb-1">바로가기</p>
                <p className="opacity-70 text-xs">진료과목 · 의료진 · 오시는 길 · 예약</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-primary-foreground/15 text-xs opacity-50">
              © 2025 OO의원. All rights reserved. ※ 예시 데이터입니다.
            </div>
          </div>
        </UiComponentCard>
      </section>
    </div>
  );
}
