import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaShieldAlt, FaClock, FaLock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import { track } from "@/lib/analytics";
import ExploreLinks from "@/components/ExploreLinks";


const trust = [
  { icon: FaClock, label: "30-minute discovery call, no obligation" },
  { icon: FaShieldAlt, label: "NDA ready - your IP is protected" },
  { icon: FaLock, label: "Trusted by developers, councils and Tier-1 contractors" },
];

const CTASection = () => {
  const { setOpen } = useDemoDialogStore();
  const openDialog = () => {
    track("cta_click", { cta: "book_consultation", location: "cta_section" });
    setOpen(true);
  };
  return (
    <section id="contact" className="bg-hero py-8 md:py-10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl text-hero-foreground mb-6">
            Talk to a Digital Twin Specialist about your next Project
          </h2>
          <p className="text-hero-muted text-lg mb-8 leading-relaxed">
            Whether you are progressing a residential development, transport corridor, commercial precinct or major infrastructure scheme, we will show you how Digital Twin and immersive visualisation can shorten approvals, align stakeholders and de risk delivery.
          </p>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 text-sm text-hero-muted">
            {trust.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  {t.label}
                </li>
              );
            })}
          </ul>

          <ExploreLinks className="mb-8" />

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base"
              onClick={openDialog}
            >
              Book a Discovery Consultation <FaArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-base border-hero-muted/30 text-hero-foreground hover:bg-hero-muted/10"
              asChild
            >
              <Link to="/case-studies">View Our Projects</Link>
            </Button>
          </div>
          <p className="mt-5 text-xs text-hero-muted/80">
            30-min call · NDA on request · Response within one working day
          </p>

        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
