import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import VirtualTour from "@/components/VirtualTour";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import { track } from "@/lib/analytics";

const HeroSection = () => {
  const { setOpen } = useDemoDialogStore();
  const openDialog = () => {
    track("cta_click", { cta: "book_consultation", location: "hero" });
    setOpen(true);
  };
  return (
    <section className="bg-hero pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden">
    <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-hero-foreground text-balance">
          Bringing Construction Projects to Life <span className="text-gradient">before they are Built</span>
        </h1>
        <p className="mt-5 text-hero-muted text-base md:text-lg leading-relaxed text-pretty">
          Accelerate planning approvals, improve stakeholder engagement and reduce project risk with industry leading Digital Twin technology, photorealistic architectural visualisation and immersive virtual project experiences.
        </p>

        <ul className="mt-6 space-y-2.5">
          {[
            "Digital Twin models and photorealistic architectural visualisation",
            "Faster planning approvals through clear visual communication",
            "Aligned stakeholders across design, planning and delivery",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-hero-muted text-sm md:text-base">
              <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base shadow-glow" onClick={openDialog}>
            Book a Discovery Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 text-base border-hero-muted/30 text-hero-foreground hover:bg-hero-foreground/5"
            asChild
            onClick={() => track("cta_click", { cta: "view_projects", location: "hero" })}
          >
            <a href="#case-studies">View Our Projects</a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl aspect-[16/10] group">
          <VirtualTour />

          {/* Virtual tour HUD */}
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-background/70 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground shadow pointer-events-none">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Digital Twin · Live Walkthrough
          </div>
          <div className="absolute bottom-3 right-3 rounded-full bg-background/70 backdrop-blur px-3 py-1.5 text-xs text-foreground/80 shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Drag to look around · Scroll to zoom
          </div>

          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-hero-muted/10 pointer-events-none" />
        </div>
      </motion.div>
    </div>
    </section>
  );
};

export default HeroSection;
