import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import BookDemoDialog from "@/components/BookDemoDialog";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import Index from "./pages/Index";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import LearnMoreCaseStudy from "./pages/LearnMoreCaseStudy";
import BlogPost from "./pages/BlogPost";
import RouteTracker from "./components/RouteTracker";
import GlobalFooter from "./components/GlobalFooter";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/useAuth";
import { crmPath, isCrmHost, isCrmOnlyHost } from "./lib/crm-base";
import CrmHostRedirect from "./components/CrmHostRedirect";
import CrmLayout from "./crm/layout/CrmLayout";
import Login from "./crm/pages/Login";
import ProtectedRoute from "./crm/components/ProtectedRoute";
import CrmHome from "./crm/pages/Home";
import CrmDashboard from "./crm/pages/Dashboard";
import CrmLeads from "./crm/pages/Leads";
import CrmArchivedLeads from "./crm/pages/ArchivedLeads";
import CrmPipeline from "./crm/pages/Pipeline";
import CrmCapture from "./crm/pages/Capture";
import CrmOutreach from "./crm/pages/Outreach";
import CrmAnalytics from "./crm/pages/Analytics";
import CrmEmea from "./crm/pages/Emea";
import CrmAmericas from "./crm/pages/Americas";

const GlobalMetadata = () => {
  const { pathname } = useLocation();
  const isPrivate = isCrmHost() || /^\/(crm|admin|login|dashboard)(\/|$)/i.test(pathname);
  const isUnknownArticle = pathname.startsWith("/blog/");
  return isPrivate || isUnknownArticle ? <Helmet><meta name="robots" content="noindex, nofollow, noarchive" /></Helmet> : null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider><TooltipProvider><Toaster /><Sonner /><BrowserRouter>
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
      </Routes><GlobalMetadata /><GlobalFooter /><RouteTracker /><BookDemoDialog /><AnalyticsConsent />
    </BrowserRouter></TooltipProvider></AuthProvider>
  </QueryClientProvider>
);

export default App;
