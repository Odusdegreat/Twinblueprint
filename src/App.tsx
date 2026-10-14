import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import BookDemoDialog from "@/components/BookDemoDialog";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import RouteTracker from "./components/RouteTracker";
import GlobalFooter from "./components/GlobalFooter";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/useAuth";
import { crmPath, isCrmHost, isCrmOnlyHost } from "./lib/crm-base";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Blog = lazy(() => import("./pages/Blog"));
const About = lazy(() => import("./pages/About"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LearnMoreCaseStudy = lazy(() => import("./pages/LearnMoreCaseStudy"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CrmHostRedirect = lazy(() => import("./components/CrmHostRedirect"));
const CrmLayout = lazy(() => import("./crm/layout/CrmLayout"));
const Login = lazy(() => import("./crm/pages/Login"));
const ProtectedRoute = lazy(() => import("./crm/components/ProtectedRoute"));
const CrmHome = lazy(() => import("./crm/pages/Home"));
const CrmDashboard = lazy(() => import("./crm/pages/Dashboard"));
const CrmLeads = lazy(() => import("./crm/pages/Leads"));
const CrmArchivedLeads = lazy(() => import("./crm/pages/ArchivedLeads"));
const CrmPipeline = lazy(() => import("./crm/pages/Pipeline"));
const CrmCapture = lazy(() => import("./crm/pages/Capture"));
const CrmOutreach = lazy(() => import("./crm/pages/Outreach"));
const CrmAnalytics = lazy(() => import("./crm/pages/Analytics"));
const CrmEmea = lazy(() => import("./crm/pages/Emea"));
const CrmAmericas = lazy(() => import("./crm/pages/Americas"));

export function shouldIndexRoute(pathname: string) {
  const normalizedPath = pathname.split("?")[0].split("#")[0];
  if (!normalizedPath || normalizedPath === "/") return true;
  return !/^\/(crm|admin|login|dashboard)(\/|$)/i.test(normalizedPath);
}

const GlobalMetadata = () => {
  const { pathname } = useLocation();
  return shouldIndexRoute(pathname) ? null : <Helmet><meta name="robots" content="noindex, nofollow, noarchive" /></Helmet>;
};

const queryClient = new QueryClient();
const routeLoader = (
  <div className="flex min-h-[40vh] items-center justify-center bg-background">
    <div className="text-sm text-muted-foreground">Loading…</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider><TooltipProvider><Toaster /><Sonner /><BrowserRouter>
      <Suspense fallback={routeLoader}>
        <Routes>
          {!isCrmOnlyHost() && <>
          <Route path="/" element={<Index />} /><Route path="/services" element={<Services />} /><Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:id" element={<LearnMoreCaseStudy />} /><Route path="/blog" element={<Blog />} /><Route path="/blog/:slug" element={<BlogPost />} /><Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} /><Route path="/faq" element={<FAQ />} /><Route path="/privacy-policy" element={<PrivacyPolicy />} /><Route path="/terms" element={<Terms />} />
          {!isCrmHost() && <Route path="/crm/*" element={<CrmHostRedirect />} />}
          </>}
          {isCrmHost() && <>
          <Route path={crmPath("/login")} element={<Login />} /><Route path={crmPath()} element={<ProtectedRoute />}><Route element={<CrmLayout />}>
            <Route index element={<CrmHome />} /><Route path="dashboard" element={<CrmDashboard />} /><Route path="leads" element={<CrmLeads />} /><Route path="archived" element={<CrmArchivedLeads />} /><Route path="pipeline" element={<CrmPipeline />} /><Route path="capture" element={<CrmCapture />} /><Route path="outreach" element={<CrmOutreach />} /><Route path="analytics" element={<CrmAnalytics />} /><Route path="emea" element={<CrmEmea />} /><Route path="americas" element={<CrmAmericas />} />
          </Route></Route>
          </>}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <GlobalMetadata /><GlobalFooter /><RouteTracker /><BookDemoDialog /><AnalyticsConsent />
    </BrowserRouter></TooltipProvider></AuthProvider>
  </QueryClientProvider>
);

export default App;
