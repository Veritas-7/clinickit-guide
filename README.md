<!-- VERITAS_EDU_NOTICE_START -->
> [!IMPORTANT]
> **Educational / Work-in-Progress Notice**
>
> 이 소스는 교육 목적의 애플리케이션이며, 아직 지속적으로 개발 중인 미완성 앱입니다. 자유롭게 사용, 학습, fork, 수정, 배포할 수 있습니다.
>
> This source code is for an educational-purpose application and remains an unfinished work in progress. You may freely use, study, fork, modify, and distribute it.
>
> Provided "as is", without warranty. Third-party open-source components remain under their original licenses. See [LICENSE](./LICENSE), [NOTICE.md](./NOTICE.md), and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

<!-- VERITAS_EDU_NOTICE_END -->

# 병원/의원 웹사이트 제작 가이드 시스템

병원·의원 업종 고객사 프로젝트를 빠르고 일관성 있게 제작하기 위한 **내부용 가이드 + 제작 시스템**.

<!-- SOURCE_DERIVED_DESIGN_CONTRACT_START -->

## Source-derived design contract

This repository includes a source-derived [DESIGN.md](./DESIGN.md) for recreating the same homepage style, color system, component rhythm, and industry-specific UI rules from implementation evidence.

- Public reference repo: https://github.com/Veritas-7/clinickit-guide
- Industry: 병원/의원
- Source evidence: `src/index.css`, `tailwind.config.ts`, route/navigation data, guide components, and industry configuration
- Verification gates: `design-md-lint DESIGN.md`, `npm run build`, `npm test`, `npm run lint`

<!-- SOURCE_DERIVED_DESIGN_CONTRACT_END -->


## 워크플로우

```
고객사 브리프 작성 → 사이트 블루프린트 생성 → 구현 규칙 확인 → 공개용 산출물 복사
```

1. **Client Brief** — 병원/의원 정보를 체계적으로 입력 (자동 저장, JSON 내보내기/불러오기, 스키마 검증)
2. **Site Blueprint** — 브리프 기반으로 페이지 구조, CTA, SEO, Lovable 프롬프트 자동 도출
3. **Implementation Rules** — 기관 유형별 세부 분기, 조건별 레이아웃, CTA 우선순위, 축소 구성 확인
4. **산출물 복사** — 생성된 프롬프트/메타/JSON-LD를 복사하여 실제 프로젝트에 적용

## 주요 기능

- **가이드 사이트**: 디자인/UI/UX/콘텐츠/컴플라이언스/SEO 가이드 통합 (12개 페이지)
- **고객사 브리프 도구**: JSON 내보내기/불러오기, 예시 데이터, 필수 항목 검증, 자동 저장(2초 디바운스), 스키마 버전 관리
- **사이트 블루프린트 생성기**: 브리프 기반 공개용 사이트 구조, CTA, SEO, Lovable 프롬프트 자동 도출, 표준화된 출력 카드
- **구현 규칙 엔진**: 기관 유형(의원/병원/검진센터/전문클리닉) 분기, 상세 조건 분기표, 예산별 스케일링
- **블록 기반 페이지 템플릿**: 필수/선택/조건부/금지 블록 시스템 (11개 페이지 유형)
- **실무 체크리스트**: 디자인, UI, UX, 콘텐츠, 컴플라이언스, SEO QA (8개 카테고리)
- **Command Palette**: Ctrl+K / ⌘K로 빠른 문서 검색 (키워드, 설명, 검색 의도 매칭)
- **업종 교체 구조**: `industryConfig` 교체로 다른 의료 업종 분기 가능
- **SEO 완성**: route별 메타, JSON-LD (WebSite/WebPage/BreadcrumbList), robots 정책, noindex 관리
- **페이지 내 목차**: 모바일 접기/펼치기 지원 TOC 컴포넌트

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** (빌드)
- **Tailwind CSS** (디자인 시스템, HSL 토큰 기반)
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

## 데이터 구조

| 파일 | 역할 |
|------|------|
| `src/data/industryConfig.ts` | 업종 설정 (브랜딩, 서브타입, 확장 포인트) |
| `src/data/navigationConfig.ts` | 내비게이션/검색 통합 데이터 |
| `src/data/seoConfig.ts` | route별 메타/JSON-LD/robots/breadcrumb 정책 |
| `src/data/briefConstants.ts` | 브리프 저장/검증/정규화 유틸 |
| `src/data/clientBriefFields.ts` | 브리프 필드 정의 |
| `src/data/templateBlueprints.ts` | 페이지 템플릿 블록 데이터 |
| `src/data/complianceRules.ts` | 컴플라이언스 규칙 |
| `src/data/implementationRules.ts` | 구현 규칙 (기관 유형 분기, 상세 조건, 예산 스케일링) |
| `src/data/uiComponentDefinitions.ts` | UI 컴포넌트 정의 |

## 업종 교체

`src/data/industryConfig.ts`에서 `currentConfig`를 다른 업종 설정으로 교체하면 사이드바/헤더/푸터 문구가 자동 변경됩니다. `navigationConfig.ts`와 `seoConfig.ts`를 함께 조정하면 메뉴 구조와 SEO가 자동 반영됩니다.

## 패키지 매니저

이 프로젝트는 **npm**을 기본 패키지 매니저로 사용합니다. `bun.lock` / `bun.lockb` 파일은 Lovable 환경에서 자동 생성되는 보조 파일입니다.

## 라이선스

내부용 프로젝트
