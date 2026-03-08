import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GuideLayout } from "@/components/GuideLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import Index from "./pages/Index";
import IndustryOverview from "./pages/IndustryOverview";
import DesignGuide from "./pages/DesignGuide";
import UiGuide from "./pages/UiGuide";
import UxGuide from "./pages/UxGuide";
import PageTemplates from "./pages/PageTemplates";
import ContentGuide from "./pages/ContentGuide";
import ComplianceGuide from "./pages/ComplianceGuide";
import SeoGeo from "./pages/SeoGeo";
import Checklist from "./pages/Checklist";
import ClientBrief from "./pages/ClientBrief";
import SiteBlueprint from "./pages/SiteBlueprint";
import ImplementationRules from "./pages/ImplementationRules";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  usePageMeta();
  return (
    <GuideLayout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/industry-overview" element={<IndustryOverview />} />
        <Route path="/design-guide" element={<DesignGuide />} />
        <Route path="/ui-guide" element={<UiGuide />} />
        <Route path="/ux-guide" element={<UxGuide />} />
        <Route path="/page-templates" element={<PageTemplates />} />
        <Route path="/content-guide" element={<ContentGuide />} />
        <Route path="/compliance-guide" element={<ComplianceGuide />} />
        <Route path="/seo-geo" element={<SeoGeo />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/client-brief" element={<ClientBrief />} />
        <Route path="/site-blueprint" element={<SiteBlueprint />} />
        <Route path="/implementation-rules" element={<ImplementationRules />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GuideLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
