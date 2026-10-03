import { Link } from "react-router-dom";
import logoSrc from "@/assets/meta-dology-logo-new.webp";

const Footer = () => {
  return (
    <footer className="bg-hero border-t border-hero-muted/10 py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4 text-hero-foreground font-heading font-extrabold text-2xl tracking-tight">
              Twin<span className="text-gradient">blueprint</span>
            </Link>
            <p className="text-hero-muted text-base leading-relaxed">
              Digital Twin specialists delivering architectural visualisation, infrastructure visualisation and interactive immersive property solutions for construction, planning and government clients.
            </p>
          </div>
          <div>
            <h4 className="text-hero-foreground font-semibold text-sm mb-4">Capabilities</h4>
            <ul className="space-y-2 text-hero-muted text-sm">
              <li><Link to="/services#digital-twin-solutions" className="hover:text-hero-foreground transition-colors">Digital Twin Solutions</Link></li>
              <li><Link to="/services#architectural-visualisation" className="hover:text-hero-foreground transition-colors">Architectural Visualisation</Link></li>
              <li><Link to="/services#infrastructure-visualisation" className="hover:text-hero-foreground transition-colors">Infrastructure Visualisation</Link></li>
              <li><Link to="/services#planning-approval-support" className="hover:text-hero-foreground transition-colors">Planning Approval Support</Link></li>
              <li><Link to="/services#interactive-virtual-walkthroughs" className="hover:text-hero-foreground transition-colors">Immersive Property Visualisation</Link></li>

            </ul>
          </div>
          <div>
            <h4 className="text-hero-foreground font-semibold text-sm mb-4">Explore</h4>
            <ul className="space-y-2 text-hero-muted text-sm">
              <li><Link to="/case-studies" className="hover:text-hero-foreground transition-colors">Case Studies</Link></li>
              <li><Link to="/how-it-works" className="hover:text-hero-foreground transition-colors">How it Works</Link></li>
              <li><Link to="/#industries" className="hover:text-hero-foreground transition-colors">Industries We Support</Link></li>
              <li><Link to="/blog" className="hover:text-hero-foreground transition-colors">Blog & Insights</Link></li>
              <li><Link to="/about" className="hover:text-hero-foreground transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-hero-foreground font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-hero-muted text-sm">
              <li><Link to="/#contact" className="hover:text-hero-foreground transition-colors">Contact / Book a Consultation</Link></li>
              <li><Link to="/faq" className="hover:text-hero-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-hero-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-hero-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-hero-muted/10">
          <Link to="/" aria-label="Twinblueprint - Licensed Meta-dology Associate, home" className="mx-auto mb-8 flex w-56 md:w-64 flex-col items-center">
            <img src={logoSrc} alt="Meta-dology logo" width={640} height={346} className="h-auto w-full" />
            <span className="mt-2 text-center text-hero-foreground text-sm font-medium tracking-wide whitespace-nowrap">
              Twinblueprint - Licensed Meta-dology Associate
            </span>
          </Link>
          <ul className="flex flex-wrap justify-center gap-3">
            {["ISO 27001 aligned", "RIBA ready workflow", "BREEAM aware visuals", "GDPR compliant"].map((item) => (
              <li
                key={item}
                className="text-hero-muted text-xs font-medium px-3 py-1.5 rounded-full border border-hero-muted/20 bg-hero-muted/5"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="text-hero-muted text-sm text-center mt-8">© 2026 Twinblueprint. Digital Twin and architectural visualisation specialists. <br />All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
