import {
  LayoutDashboard,
  Building2,
  Palette,
  Component,
  Route,
  FileText,
  PenTool,
  ShieldCheck,
  Search,
  CheckSquare,
  ClipboardList,
  Map,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
  group: "guide" | "tool";
  keywords: string[];
}

export const navigationItems: NavItem[] = [
  { title: "Overview", path: "/", icon: LayoutDashboard, group: "guide", keywords: ["홈", "메인", "개요", "시작", "overview"] },
  { title: "Industry", path: "/industry-overview", icon: Building2, group: "guide", keywords: ["업종", "의원", "병원", "특성", "industry"] },
  { title: "Design Guide", path: "/design-guide", icon: Palette, group: "guide", keywords: ["디자인", "컬러", "타이포", "간격", "design"] },
  { title: "UI Guide", path: "/ui-guide", icon: Component, group: "guide", keywords: ["UI", "컴포넌트", "카드", "버튼", "CTA"] },
  { title: "UX Guide", path: "/ux-guide", icon: Route, group: "guide", keywords: ["UX", "사용자", "여정", "전환", "모바일"] },
  { title: "Page Templates", path: "/page-templates", icon: FileText, group: "guide", keywords: ["페이지", "템플릿", "블록", "구조", "template"] },
  { title: "Content Guide", path: "/content-guide", icon: PenTool, group: "guide", keywords: ["콘텐츠", "카피", "문장", "톤", "content"] },
  { title: "Compliance", path: "/compliance-guide", icon: ShieldCheck, group: "guide", keywords: ["컴플라이언스", "법률", "검토", "광고", "compliance"] },
  { title: "SEO/GEO", path: "/seo-geo", icon: Search, group: "guide", keywords: ["SEO", "GEO", "메타", "검색", "로컬"] },
  { title: "Checklist", path: "/checklist", icon: CheckSquare, group: "guide", keywords: ["체크리스트", "QA", "점검", "검수", "checklist"] },
  { title: "Client Brief", path: "/client-brief", icon: ClipboardList, group: "tool", keywords: ["브리프", "고객사", "입력", "수집", "brief"] },
  { title: "Site Blueprint", path: "/site-blueprint", icon: Map, group: "tool", keywords: ["블루프린트", "구조", "생성", "출력", "blueprint"] },
  { title: "Implementation Rules", path: "/implementation-rules", icon: Settings, group: "tool", keywords: ["구현", "규칙", "분기", "엔진", "rules"] },
];

export const guideItems = navigationItems.filter(i => i.group === "guide");
export const toolItems = navigationItems.filter(i => i.group === "tool");

export const allPages = navigationItems.map(i => ({ path: i.path, label: i.title }));
