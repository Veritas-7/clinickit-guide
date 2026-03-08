import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    QueryClient: vi.fn(() => ({
      mount: vi.fn(), unmount: vi.fn(),
      getQueryCache: vi.fn(() => ({ subscribe: vi.fn(() => vi.fn()) })),
      getMutationCache: vi.fn(() => ({ subscribe: vi.fn(() => vi.fn()) })),
      getDefaultOptions: vi.fn(() => ({})), setDefaultOptions: vi.fn(),
      isFetching: vi.fn(() => 0), isMutating: vi.fn(() => 0), clear: vi.fn(),
    })),
  };
});

// ── Route rendering ──
describe("Route rendering", () => {
  beforeEach(() => { localStorage.clear(); });

  it("renders Index page at /", async () => {
    const { default: Index } = await import("@/pages/Index");
    render(<MemoryRouter initialEntries={["/"]}><Index /></MemoryRouter>);
    expect(screen.getByText("병원/의원 웹사이트 제작 가이드")).toBeInTheDocument();
  });

  it("renders ClientBrief page", async () => {
    const { default: ClientBrief } = await import("@/pages/ClientBrief");
    render(<MemoryRouter initialEntries={["/client-brief"]}><ClientBrief /></MemoryRouter>);
    expect(screen.getByText("고객사 브리프")).toBeInTheDocument();
  });

  it("renders SiteBlueprint page", async () => {
    const { default: SiteBlueprint } = await import("@/pages/SiteBlueprint");
    render(<MemoryRouter initialEntries={["/site-blueprint"]}><SiteBlueprint /></MemoryRouter>);
    expect(screen.getByText("사이트 블루프린트")).toBeInTheDocument();
  });

  it("renders ImplementationRules page", async () => {
    const { default: ImplementationRules } = await import("@/pages/ImplementationRules");
    render(<MemoryRouter initialEntries={["/implementation-rules"]}><ImplementationRules /></MemoryRouter>);
    expect(screen.getByText("구현 규칙")).toBeInTheDocument();
  });

  it("renders NotFound for invalid routes", async () => {
    const { default: NotFound } = await import("@/pages/NotFound");
    render(<MemoryRouter initialEntries={["/nonexistent"]}><NotFound /></MemoryRouter>);
    expect(screen.getByText("페이지를 찾을 수 없습니다")).toBeInTheDocument();
  });

  it("renders DesignGuide page", async () => {
    const { default: DesignGuide } = await import("@/pages/DesignGuide");
    render(<MemoryRouter><DesignGuide /></MemoryRouter>);
    expect(screen.getByText("디자인 가이드")).toBeInTheDocument();
  });

  it("renders UiGuide page", async () => {
    const { default: UiGuide } = await import("@/pages/UiGuide");
    render(<MemoryRouter><UiGuide /></MemoryRouter>);
    expect(screen.getByText("UI 가이드")).toBeInTheDocument();
  });

  it("renders IndustryOverview page", async () => {
    const { default: IndustryOverview } = await import("@/pages/IndustryOverview");
    render(<MemoryRouter><IndustryOverview /></MemoryRouter>);
    expect(screen.getByText("병원/의원 업종 특성")).toBeInTheDocument();
  });

  it("renders UxGuide page", async () => {
    const { default: UxGuide } = await import("@/pages/UxGuide");
    render(<MemoryRouter><UxGuide /></MemoryRouter>);
    expect(screen.getByText("UX 가이드")).toBeInTheDocument();
  });

  it("renders ContentGuide page", async () => {
    const { default: ContentGuide } = await import("@/pages/ContentGuide");
    render(<MemoryRouter><ContentGuide /></MemoryRouter>);
    expect(screen.getByText("콘텐츠 가이드")).toBeInTheDocument();
  });

  it("renders ComplianceGuide page", async () => {
    const { default: ComplianceGuide } = await import("@/pages/ComplianceGuide");
    render(<MemoryRouter><ComplianceGuide /></MemoryRouter>);
    expect(screen.getByText("컴플라이언스 가이드")).toBeInTheDocument();
  });

  it("renders Checklist page", async () => {
    const { default: Checklist } = await import("@/pages/Checklist");
    render(<MemoryRouter><Checklist /></MemoryRouter>);
    expect(screen.getByText("실무 체크리스트")).toBeInTheDocument();
  });
});

// ── Client Brief localStorage ──
describe("Client Brief localStorage", () => {
  beforeEach(() => { localStorage.clear(); });

  it("saves brief data to localStorage", async () => {
    const { default: ClientBrief } = await import("@/pages/ClientBrief");
    const { fireEvent } = await import("@testing-library/react");
    render(<MemoryRouter><ClientBrief /></MemoryRouter>);
    const nameInput = screen.getByPlaceholderText("예: OO내과의원");
    fireEvent.change(nameInput, { target: { value: "테스트병원" } });
    const saveButtons = screen.getAllByText(/저장/);
    fireEvent.click(saveButtons[0]);
    const stored = localStorage.getItem("clientBrief");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.data.hospitalName).toBe("테스트병원");
    expect(parsed.version).toBe("1.0");
  });

  it("loads brief data from localStorage", async () => {
    localStorage.setItem("clientBrief", JSON.stringify({
      version: "1.0", updatedAt: new Date().toISOString(),
      data: { hospitalName: "저장된병원" },
    }));
    const { default: ClientBrief } = await import("@/pages/ClientBrief");
    render(<MemoryRouter><ClientBrief /></MemoryRouter>);
    const nameInput = screen.getByPlaceholderText("예: OO내과의원") as HTMLInputElement;
    expect(nameInput.value).toBe("저장된병원");
  });

  it("handles version mismatch gracefully", async () => {
    localStorage.setItem("clientBrief", JSON.stringify({
      version: "99.0", updatedAt: new Date().toISOString(),
      data: { hospitalName: "구버전병원" },
    }));
    const { default: ClientBrief } = await import("@/pages/ClientBrief");
    render(<MemoryRouter><ClientBrief /></MemoryRouter>);
    const nameInput = screen.getByPlaceholderText("예: OO내과의원") as HTMLInputElement;
    expect(nameInput.value).toBe("구버전병원");
  });

  it("handles corrupted localStorage data", async () => {
    localStorage.setItem("clientBrief", "not valid json at all");
    const { default: ClientBrief } = await import("@/pages/ClientBrief");
    render(<MemoryRouter><ClientBrief /></MemoryRouter>);
    expect(screen.getByText("고객사 브리프")).toBeInTheDocument();
  });
});

// ── SEO metadata config ──
describe("SEO metadata config", () => {
  it("has metadata for all routes", async () => {
    const { routeMeta } = await import("@/data/seoConfig");
    const routes = [
      "/", "/industry-overview", "/design-guide", "/ui-guide", "/ux-guide",
      "/page-templates", "/content-guide", "/compliance-guide", "/seo-geo",
      "/checklist", "/client-brief", "/site-blueprint", "/implementation-rules",
    ];
    routes.forEach(route => {
      expect(routeMeta[route]).toBeDefined();
      expect(routeMeta[route].title).toBeTruthy();
      expect(routeMeta[route].description).toBeTruthy();
    });
  });

  it("has schemaType for all routes", async () => {
    const { routeMeta } = await import("@/data/seoConfig");
    Object.values(routeMeta).forEach(meta => {
      expect(meta.schemaType).toBeTruthy();
    });
  });

  it("marks tool pages as noindex", async () => {
    const { routeMeta } = await import("@/data/seoConfig");
    expect(routeMeta["/client-brief"].noindex).toBe(true);
    expect(routeMeta["/site-blueprint"].noindex).toBe(true);
    expect(routeMeta["/implementation-rules"].noindex).toBe(true);
  });

  it("has robots policy for all routes", async () => {
    const { routeMeta } = await import("@/data/seoConfig");
    Object.values(routeMeta).forEach(meta => {
      expect(meta.robots).toBeTruthy();
    });
  });

  it("has breadcrumb for all routes", async () => {
    const { routeMeta } = await import("@/data/seoConfig");
    Object.values(routeMeta).forEach(meta => {
      expect(meta.breadcrumb).toBeDefined();
      expect(meta.breadcrumb.length).toBeGreaterThan(0);
    });
  });

  it("fallback meta has noindex and breadcrumb", async () => {
    const { fallbackMeta } = await import("@/data/seoConfig");
    expect(fallbackMeta.noindex).toBe(true);
    expect(fallbackMeta.robots).toContain("noindex");
    expect(fallbackMeta.breadcrumb).toBeDefined();
    expect(fallbackMeta.schemaType).toBe("WebPage");
  });

  it("guide pages are indexable, tool pages are not", async () => {
    const { routeMeta } = await import("@/data/seoConfig");
    const guideRoutes = ["/", "/industry-overview", "/design-guide", "/ui-guide"];
    guideRoutes.forEach(r => {
      expect(routeMeta[r].robots).toContain("index");
    });
    const toolRoutes = ["/client-brief", "/site-blueprint", "/implementation-rules"];
    toolRoutes.forEach(r => {
      expect(routeMeta[r].robots).toContain("noindex");
    });
  });

  it("BASE_URL and SITE_NAME are consistent", async () => {
    const { BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE } = await import("@/data/seoConfig");
    expect(BASE_URL).toContain("https://");
    expect(SITE_NAME).toBeTruthy();
    expect(DEFAULT_OG_IMAGE).toBe("/og-image.png");
  });
});

// ── Navigation config sync ──
describe("Navigation config sync", () => {
  it("has matching entries in navigationConfig and routeMeta", async () => {
    const { navigationItems } = await import("@/data/navigationConfig");
    const { routeMeta } = await import("@/data/seoConfig");
    navigationItems.forEach(item => {
      expect(routeMeta[item.path]).toBeDefined();
    });
  });

  it("all nav items have label, description, and searchIntent", async () => {
    const { navigationItems } = await import("@/data/navigationConfig");
    navigationItems.forEach(item => {
      expect(item.label).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.searchIntent.length).toBeGreaterThan(0);
      expect(item.keywords.length).toBeGreaterThan(0);
    });
  });

  it("getAdjacentPages returns correct prev/next", async () => {
    const { getAdjacentPages, navigationItems } = await import("@/data/navigationConfig");
    const first = getAdjacentPages(navigationItems[0].path);
    expect(first.prev).toBeNull();
    expect(first.next).toBeTruthy();
    const last = getAdjacentPages(navigationItems[navigationItems.length - 1].path);
    expect(last.prev).toBeTruthy();
    expect(last.next).toBeNull();
  });

  it("all routes in routeMeta have a navigation entry (except 404)", async () => {
    const { navigationItems } = await import("@/data/navigationConfig");
    const { routeMeta } = await import("@/data/seoConfig");
    const navPaths = new Set(navigationItems.map(n => n.path));
    Object.keys(routeMeta).forEach(path => {
      expect(navPaths.has(path)).toBe(true);
    });
  });

  it("guide and tool groups are separated correctly", async () => {
    const { guideItems, toolItems } = await import("@/data/navigationConfig");
    expect(guideItems.length).toBeGreaterThan(0);
    expect(toolItems.length).toBeGreaterThan(0);
    guideItems.forEach(i => expect(i.group).toBe("guide"));
    toolItems.forEach(i => expect(i.group).toBe("tool"));
  });
});

// ── Brief constants utilities ──
describe("Brief constants utilities", () => {
  it("normalizeBriefData trims and filters", async () => {
    const { normalizeBriefData } = await import("@/data/briefConstants");
    const result = normalizeBriefData({
      name: "  test  ", empty: "", arr: ["a", "", "b"], emptyArr: [],
    });
    expect(result.name).toBe("test");
    expect(result.empty).toBeUndefined();
    expect(result.arr).toEqual(["a", "b"]);
    expect(result.emptyArr).toBeUndefined();
  });

  it("isValidBriefShape validates correctly", async () => {
    const { isValidBriefShape } = await import("@/data/briefConstants");
    expect(isValidBriefShape({ name: "test", arr: ["a"] })).toBe(true);
    expect(isValidBriefShape({ num: 123 })).toBe(false);
    expect(isValidBriefShape(null)).toBe(false);
    expect(isValidBriefShape("string")).toBe(false);
  });

  it("parseStoredBrief handles valid data", async () => {
    const { parseStoredBrief } = await import("@/data/briefConstants");
    const result = parseStoredBrief(JSON.stringify({
      version: "1.0", updatedAt: "2024-01-01",
      data: { hospitalName: "test" },
    }));
    expect(result.error).toBeNull();
    expect(result.brief?.data.hospitalName).toBe("test");
  });

  it("parseStoredBrief detects version mismatch", async () => {
    const { parseStoredBrief } = await import("@/data/briefConstants");
    const result = parseStoredBrief(JSON.stringify({
      version: "99.0", updatedAt: "2024-01-01",
      data: { hospitalName: "test" },
    }));
    expect(result.error).toBe("version_mismatch");
    expect(result.brief?.data.hospitalName).toBe("test");
  });

  it("parseStoredBrief detects invalid JSON", async () => {
    const { parseStoredBrief } = await import("@/data/briefConstants");
    expect(parseStoredBrief("not json").error).toBe("invalid_json");
  });

  it("parseStoredBrief detects invalid shape", async () => {
    const { parseStoredBrief } = await import("@/data/briefConstants");
    expect(parseStoredBrief(JSON.stringify({ version: "1.0", data: { num: 123 } })).error).toBe("invalid_shape");
  });

  it("parseStoredBrief handles legacy plain object format", async () => {
    const { parseStoredBrief } = await import("@/data/briefConstants");
    const result = parseStoredBrief(JSON.stringify({ hospitalName: "legacy" }));
    expect(result.error).toBeNull();
    expect(result.brief?.data.hospitalName).toBe("legacy");
    expect(result.brief?.version).toBe("1.0");
  });

  it("inferSiteType returns correct types", async () => {
    const { inferSiteType } = await import("@/data/briefConstants");
    expect(inferSiteType({ institutionType: "검진센터" }).type).toBe("검진센터형");
    expect(inferSiteType({ doctorCount: "3", departments: ["내과", "외과", "안과"] }).type).toBe("정보 제공형");
    expect(inferSiteType({ doctorCount: "2" }).type).toBe("전문의 신뢰형");
    expect(inferSiteType({ bookingMethod: ["온라인 예약"] }).type).toBe("예약 유도형");
    expect(inferSiteType({}).type).toBe("지역 의원형");
  });

  it("hasOnlineBooking detects correctly", async () => {
    const { hasOnlineBooking } = await import("@/data/briefConstants");
    expect(hasOnlineBooking({ bookingMethod: ["온라인 예약 (자체)"] })).toBe(true);
    expect(hasOnlineBooking({ bookingMethod: ["네이버 예약"] })).toBe(true);
    expect(hasOnlineBooking({ bookingMethod: ["전화 예약"] })).toBe(false);
    expect(hasOnlineBooking({})).toBe(false);
  });
});

// ── Implementation rules dynamic matching ──
describe("Implementation rules dynamic matching", () => {
  beforeEach(() => { localStorage.clear(); });

  it("returns different site type based on brief data", async () => {
    const { default: ImplementationRules } = await import("@/pages/ImplementationRules");
    localStorage.setItem("clientBrief", JSON.stringify({
      version: "1.0", updatedAt: new Date().toISOString(),
      data: {
        institutionType: "검진센터", departments: ["내과"],
        doctorCount: "3", bookingMethod: ["온라인 예약 (자체)"],
      },
    }));
    render(<MemoryRouter><ImplementationRules /></MemoryRouter>);
    const matches = screen.getAllByText("검진센터형");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("shows institution type rules", async () => {
    const { institutionTypeRules } = await import("@/data/implementationRules");
    expect(institutionTypeRules.length).toBe(4);
    const types = institutionTypeRules.map(r => r.type);
    expect(types).toContain("의원");
    expect(types).toContain("병원");
    expect(types).toContain("검진센터");
    expect(types).toContain("전문클리닉");
  });

  it("detailed branch rules cover key fields", async () => {
    const { detailedBranchRules } = await import("@/data/implementationRules");
    const fields = [...new Set(detailedBranchRules.map(r => r.field))];
    expect(fields).toContain("departments");
    expect(fields).toContain("doctorCount");
    expect(fields).toContain("photoTypes");
    expect(fields).toContain("bookingMethod");
    expect(fields).toContain("nonCoveredInfo");
    expect(fields).toContain("blogColumn");
    expect(fields).toContain("multilingual");
  });

  it("budget scaling has timeline and page count", async () => {
    const { budgetScaling } = await import("@/data/implementationRules");
    budgetScaling.forEach(s => {
      expect(s.timeline).toBeTruthy();
      expect(s.pageCount).toBeTruthy();
    });
  });
});

// ── Industry config ──
describe("Industry config", () => {
  it("provides branding fields", async () => {
    const { currentConfig } = await import("@/data/industryConfig");
    expect(currentConfig.brandTitle).toBeTruthy();
    expect(currentConfig.brandSubtitle).toBeTruthy();
    expect(currentConfig.version).toBeTruthy();
    expect(currentConfig.footerText).toBeTruthy();
  });

  it("has subtypes defined", async () => {
    const { currentConfig } = await import("@/data/industryConfig");
    expect(currentConfig.subtypes.length).toBeGreaterThan(0);
    currentConfig.subtypes.forEach(s => {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
    });
  });
});

// ── Template blueprints ──
describe("Template blueprints", () => {
  it("all templates have required fields", async () => {
    const { pageTemplates } = await import("@/data/templateBlueprints");
    expect(pageTemplates.length).toBeGreaterThan(0);
    pageTemplates.forEach(t => {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.primaryCTA).toBeTruthy();
      expect(t.blocks.length).toBeGreaterThan(0);
      expect(t.trustElements.length).toBeGreaterThan(0);
      expect(t.mobileRule).toBeTruthy();
    });
  });

  it("homepage template has required blocks", async () => {
    const { pageTemplates } = await import("@/data/templateBlueprints");
    const homepage = pageTemplates.find(t => t.id === "homepage");
    expect(homepage).toBeDefined();
    const requiredBlocks = homepage!.blocks.filter(b => b.type === "required");
    expect(requiredBlocks.length).toBeGreaterThanOrEqual(5);
  });
});
