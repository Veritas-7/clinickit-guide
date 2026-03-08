import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { guideItems, toolItems } from "@/data/navigationConfig";
import { currentConfig } from "@/data/industryConfig";
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
import { Building2 } from "lucide-react";

export function GuideSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const renderItems = (items: typeof guideItems) =>
    items.map((item) => {
      const isActive = item.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.path);
      return (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild isActive={isActive}>
            <NavLink
              to={item.path}
              end={item.path === "/"}
              className="hover:bg-sidebar-accent/60"
              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

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
                  <p className="text-sm font-semibold text-sidebar-foreground">{currentConfig.brandTitle}</p>
                  <p className="text-[11px] text-sidebar-foreground/60">{currentConfig.brandSubtitle} {currentConfig.version}</p>
                </div>
              </div>
            </div>
          )}
          <SidebarGroupLabel>{currentConfig.nameShort} 가이드 메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(guideItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>제작 도구</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(toolItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
