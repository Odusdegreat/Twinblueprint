import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const pageOrder = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/how-it-works", label: "How it Works" },
  { path: "/blog", label: "Blog" },
  { path: "/about", label: "About" },
  { path: "/faq", label: "FAQ" },
];

const PageNav = () => {
  const { pathname } = useLocation();
  const index = pageOrder.findIndex((p) => p.path === pathname);
  if (index === -1) return null;

  const prev = index > 0 ? pageOrder[index - 1] : null;
  const next = index < pageOrder.length - 1 ? pageOrder[index + 1] : null;

  return (
    <nav
      aria-label="Page navigation"
      className="border-t border-border bg-background"
    >
      <div className="container py-6 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            to={prev.path}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
            aria-label={`Previous page: ${prev.label}`}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline text-muted-foreground group-hover:text-primary">Previous</span>
            <span className="font-medium">{prev.label}</span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            to={next.path}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
            aria-label={`Next page: ${next.label}`}
          >
            <span className="font-medium">{next.label}</span>
            <span className="hidden sm:inline text-muted-foreground group-hover:text-primary">Next</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
};

export default PageNav;
