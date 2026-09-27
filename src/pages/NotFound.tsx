import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

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
