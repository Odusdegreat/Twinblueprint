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
        <title>Technology Solutions & Digital Transformation | Twinblueprint</title>
        <meta
          name="description"
          content="Twinblueprint provides technology consulting, digital transformation, software development, AI solutions and business automation services for organizations worldwide."
        />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta property="og:title" content="Technology Solutions & Digital Transformation | Twinblueprint" />
        <meta
          property="og:description"
          content="Technology consulting and digital transformation services that help organizations modernize operations, improve efficiency and drive sustainable growth."
        />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technology Solutions & Digital Transformation | Twinblueprint" />
        <meta name="twitter:description" content="Technology consulting and digital transformation services that help organizations modernize operations, improve efficiency and drive sustainable growth." />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(getWebPageSchema("Technology Solutions & Digital Transformation", BASE_URL, "Technology consulting, software development, AI solutions and business automation services for organizations worldwide."))}</script>
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
