import { Link } from "react-router-dom";

interface ExploreLinksProps {
  /** "hero" for dark sections, "default" for light sections */
  variant?: "hero" | "default";
  className?: string;
}

/**
 * Consistent internal-links line used under every "Book a Demo" /
 * "Book a Discovery Consultation" call to action.
 */
const ExploreLinks = ({ variant = "hero", className = "" }: ExploreLinksProps) => (
  <p
    className={`text-sm ${
      variant === "hero" ? "text-hero-muted" : "text-muted-foreground"
    } ${className}`}
  >
    Explore our{" "}
    <Link to="/services" className="text-primary hover:underline">
      architectural visualisation services
    </Link>
    , learn about our{" "}
    <Link to="/how-it-works#process" className="text-primary hover:underline">
      four step delivery process
    </Link>
    , or read the latest from the{" "}
    <Link to="/blog" className="text-primary hover:underline">
      Twinblueprint blog
    </Link>
    .
  </p>
);

export default ExploreLinks;
