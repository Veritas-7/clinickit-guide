# 병원/의원 웹사이트 제작 가이드 시스템

병원·의원 업종 고객사 프로젝트를 빠르고 일관성 있게 제작하기 위한 **내부용 가이드 + 제작 시스템**.

## 주요 기능

- **가이드 사이트**: 디자인/UI/UX/콘텐츠/컴플라이언스/SEO 가이드 통합
- **고객사 브리프 도구**: JSON 내보내기/불러오기, 예시 데이터, 필수 항목 검증
- **사이트 블루프린트 생성기**: 브리프 기반 공개용 사이트 구조, CTA, SEO, Lovable 프롬프트 자동 도출
- **구현 규칙 엔진**: 브리프 조건별 동적 레이아웃/CTA/블록 분기
- **블록 기반 페이지 템플릿**: 필수/선택/조건부/금지 블록 시스템
- **실무 체크리스트**: 디자인, UI, UX, 콘텐츠, 컴플라이언스, SEO QA

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** (빌드)
- **Tailwind CSS** (디자인 시스템)
- **shadcn/ui** (컴포넌트)
- **React Router** (클라이언트 라우팅)
- **Vitest** + **Testing Library** (테스트)

## 시작하기

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## 테스트

```bash
npm test          # 단일 실행
npm run test:watch # 워치 모드
```

## 프로젝트 구조

```
src/
├── components/     # 재사용 컴포넌트
├── data/           # 업종별 데이터/규칙 레이어
│   ├── industryConfig.ts
│   ├── seoConfig.ts
│   ├── templateBlueprints.ts
│   ├── complianceRules.ts
│   ├── implementationRules.ts
│   ├── clientBriefFields.ts
│   └── uiComponentDefinitions.ts
├── hooks/          # 커스텀 훅 (usePageMeta 등)
├── pages/          # 라우트별 페이지
└── lib/            # 유틸리티
```

## 확장

업종 데이터(`src/data/`)만 교체하면 소아과, 정형외과, 검진센터, 치과, 한의원 등으로 분기 가능합니다.

## 라이선스

내부용 프로젝트
