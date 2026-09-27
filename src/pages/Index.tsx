import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import IndustriesSection from "@/components/IndustriesSection";
import BuiltForSection from "@/components/BuiltForSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageNav from "@/components/PageNav";
import BookDemoDialog from "@/components/BookDemoDialog";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Digital Twin & Architectural Visualisation | Twinblueprint</title>
        <meta
          name="description"
          content="Digital Twin technology and photorealistic architectural visualisation that accelerate planning approvals, align stakeholders and reduce construction project risk."
        />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Digital Twin & Architectural Visualisation | Twinblueprint" />
        <meta
          property="og:description"
          content="Accelerate planning approvals and de risk delivery with Digital Twin solutions for construction, infrastructure and urban planning teams."
        />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Twinblueprint",
          url: "/",
          description:
            "Digital Twin, architectural visualisation and immersive property visualisation specialists for construction, infrastructure and urban planning.",
          areaServed: "Worldwide",
          sameAs: [],
        })}</script>
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
      <Footer />
      <BookDemoDialog />
    </>
  );
};

export default Index;
