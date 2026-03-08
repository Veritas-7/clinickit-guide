import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GuideSidebar } from "@/components/GuideSidebar";

interface GuideLayoutProps {
  children: ReactNode;
}

export function GuideLayout({ children }: GuideLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <GuideSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border bg-card sticky top-0 z-30">
            <SidebarTrigger className="ml-3" />
            <span className="ml-3 text-sm font-medium text-muted-foreground">
              병원/의원 웹사이트 제작 가이드
            </span>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
