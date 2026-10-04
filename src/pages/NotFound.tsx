import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BASE_URL } from "@/lib/constants";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Twinblueprint</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="The page you're looking for doesn't exist. Explore Twinblueprint's Digital Twin services, case studies, and insights." />
        <link rel="canonical" href={`${BASE_URL}/404`} />
        <meta property="og:title" content="Page Not Found | Twinblueprint" />
        <meta property="og:description" content="The page you're looking for doesn't exist. Explore our Digital Twin services, case studies, and insights." />
        <meta property="og:url" content={`${BASE_URL}/404`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Not Found | Twinblueprint" />
        <meta name="twitter:description" content="The page you're looking for doesn't exist. Explore our Digital Twin services, case studies, and insights." />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
      </Helmet>
      <main className="flex min-h-dvh items-center justify-center bg-muted">
        <div className="text-center px-6">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">
            We couldn't find that page. Browse our Digital Twin services or case studies instead.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="text-primary underline hover:text-primary/90">Return to Home</Link>
            <Link to="/services" className="text-primary underline hover:text-primary/90">Services</Link>
            <Link to="/case-studies" className="text-primary underline hover:text-primary/90">Case Studies</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
