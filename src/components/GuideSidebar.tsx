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
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Industry", url: "/industry-overview", icon: Building2 },
  { title: "Design Guide", url: "/design-guide", icon: Palette },
  { title: "UI Guide", url: "/ui-guide", icon: Component },
  { title: "UX Guide", url: "/ux-guide", icon: Route },
  { title: "Page Templates", url: "/page-templates", icon: FileText },
  { title: "Content Guide", url: "/content-guide", icon: PenTool },
  { title: "Compliance", url: "/compliance-guide", icon: ShieldCheck },
  { title: "SEO/GEO", url: "/seo-geo", icon: Search },
  { title: "Checklist", url: "/checklist", icon: CheckSquare },
];

export function GuideSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <div className="px-3 pt-4 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-sidebar-primary flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-sidebar-foreground">의료기관 가이드</p>
                  <p className="text-[11px] text-sidebar-foreground/60">웹사이트 제작 기준서</p>
                </div>
              </div>
            </div>
          )}
          <SidebarGroupLabel>가이드 메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.url === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(item.url)
                    }
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/60"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
