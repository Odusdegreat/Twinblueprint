import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import BuiltForSection from "@/components/BuiltForSection";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import PageNav from "@/components/PageNav";
import { BASE_URL } from "@/lib/constants";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, getWebPageSchema } from "@/lib/seo";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Digital Twin & Architectural Visualisation | Twinblueprint</title>
        <meta
          name="description"
          content="Twinblueprint creates digital twins and architectural visualisations for construction, property and infrastructure teams worldwide, including projects in Nigeria."
        />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta property="og:title" content="Digital Twin & Architectural Visualisation | Twinblueprint" />
        <meta
          property="og:description"
          content="Accelerate planning approvals and de risk delivery with Digital Twin solutions for construction, infrastructure and urban planning teams."
        />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Twin & Architectural Visualisation | Twinblueprint" />
        <meta name="twitter:description" content="Accelerate planning approvals and de risk delivery with Digital Twin solutions for construction, infrastructure and urban planning teams." />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(getWebPageSchema("Digital Twin & Architectural Visualisation", BASE_URL, "Digital Twin technology and photorealistic architectural visualisation that accelerate planning approvals, align stakeholders and reduce construction project risk."))}</script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BuiltForSection />
        <IndustriesSection />
        <CaseStudiesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <PageNav />
    </>
  );
};

export default Index;
