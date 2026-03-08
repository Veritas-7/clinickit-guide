import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GuideSidebar } from "@/components/GuideSidebar";
import { CommandSearch } from "@/components/CommandSearch";
import { currentConfig } from "@/data/industryConfig";

interface GuideLayoutProps {
  children: ReactNode;
}

export function GuideLayout({ children }: GuideLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <GuideSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Skip Link */}
           <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
          >
            본문으로 건너뛰기
          </a>
          <header role="banner" className="h-12 flex items-center border-b border-border bg-card sticky top-0 z-30">
            <SidebarTrigger className="ml-3" />
            <span className="ml-3 text-sm font-medium text-muted-foreground hidden sm:inline">
              {currentConfig.name} {currentConfig.brandSubtitle} {currentConfig.version}
            </span>
            <div className="ml-auto mr-3">
              <CommandSearch />
            </div>
          </header>
          <main id="main-content" role="main" className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              {children}
            </div>
          </main>
          <footer role="contentinfo" className="border-t border-border bg-card py-4 px-6 text-xs text-muted-foreground text-center">
            {currentConfig.footerText}
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
