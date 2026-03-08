import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";

// Mock QueryClient
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    QueryClient: vi.fn(() => ({
      mount: vi.fn(),
      unmount: vi.fn(),
      getQueryCache: vi.fn(() => ({ subscribe: vi.fn(() => vi.fn()) })),
      getMutationCache: vi.fn(() => ({ subscribe: vi.fn(() => vi.fn()) })),
      getDefaultOptions: vi.fn(() => ({})),
      setDefaultOptions: vi.fn(),
      isFetching: vi.fn(() => 0),
      isMutating: vi.fn(() => 0),
      clear: vi.fn(),
    })),
  };
});

function renderRoute(path: string) {
  // We need to render the full App but with a specific route
  // Since App uses BrowserRouter, we'll test pages directly
  return render(
    <MemoryRouter initialEntries={[path]}>
      <div id="root" />
    </MemoryRouter>
  );
}

describe("Route rendering", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders Index page at /", async () => {
    const { default: Index } = await import("@/pages/Index");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Index />
      </MemoryRouter>
    );
    expect(screen.getByText("병원/의원 웹사이트 제작 가이드")).toBeInTheDocument();
  });

  it("renders ClientBrief page", async () => {
    const { default: ClientBrief } = await import("@/pages/ClientBrief");
    render(
      <MemoryRouter initialEntries={["/client-brief"]}>
        <ClientBrief />
      </MemoryRouter>
    );
    expect(screen.getByText("고객사 브리프")).toBeInTheDocument();
  });

  it("renders SiteBlueprint page", async () => {
    const { default: SiteBlueprint } = await import("@/pages/SiteBlueprint");
    render(
      <MemoryRouter initialEntries={["/site-blueprint"]}>
        <SiteBlueprint />
      </MemoryRouter>
    );
    expect(screen.getByText("사이트 블루프린트")).toBeInTheDocument();
  });

  it("renders ImplementationRules page", async () => {
    const { default: ImplementationRules } = await import("@/pages/ImplementationRules");
    render(
      <MemoryRouter initialEntries={["/implementation-rules"]}>
        <ImplementationRules />
      </MemoryRouter>
    );
    expect(screen.getByText("구현 규칙")).toBeInTheDocument();
  });

  it("renders NotFound for invalid routes", async () => {
    const { default: NotFound } = await import("@/pages/NotFound");
    render(
      <MemoryRouter initialEntries={["/nonexistent"]}>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("페이지를 찾을 수 없습니다")).toBeInTheDocument();
  });
});

describe("Client Brief localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves brief data to localStorage", async () => {
    const { default: ClientBrief } = await import("@/pages/ClientBrief");
    const { fireEvent } = await import("@testing-library/react");
    
    render(
      <MemoryRouter>
        <ClientBrief />
      </MemoryRouter>
    );
    
    // Fill in hospital name
    const nameInput = screen.getByPlaceholderText("예: OO내과의원");
    fireEvent.change(nameInput, { target: { value: "테스트병원" } });
    
    // Click save
    const saveButtons = screen.getAllByText(/저장/);
    fireEvent.click(saveButtons[0]);
    
    // Check localStorage
    const stored = localStorage.getItem("clientBrief");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.data.hospitalName).toBe("테스트병원");
    expect(parsed.version).toBe("1.0");
  });

  it("loads brief data from localStorage", async () => {
    // Pre-set data
    localStorage.setItem("clientBrief", JSON.stringify({
      version: "1.0",
      updatedAt: new Date().toISOString(),
      data: { hospitalName: "저장된병원" },
    }));

    const { default: ClientBrief } = await import("@/pages/ClientBrief");
    render(
      <MemoryRouter>
        <ClientBrief />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("예: OO내과의원") as HTMLInputElement;
    expect(nameInput.value).toBe("저장된병원");
  });
});

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
});

describe("Implementation rules dynamic matching", () => {
  it("returns different site type based on brief data", async () => {
    // Test that a 검진센터 brief produces 검진센터형
    const { default: ImplementationRules } = await import("@/pages/ImplementationRules");
    
    localStorage.setItem("clientBrief", JSON.stringify({
      version: "1.0",
      updatedAt: new Date().toISOString(),
      data: {
        institutionType: "검진센터",
        departments: ["내과"],
        doctorCount: "3",
        bookingMethod: ["온라인 예약 (자체)"],
      },
    }));

    render(
      <MemoryRouter>
        <ImplementationRules />
      </MemoryRouter>
    );

    // Should show the summary card with 검진센터형
    expect(screen.getByText("검진센터형")).toBeInTheDocument();
  });
});
