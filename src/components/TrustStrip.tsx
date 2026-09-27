import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

const items = [
  "Residential developers",
  "Planning authorities",
  "Construction & infrastructure",
  "BIM & design teams",
  "Master planning",
  "RIBA-aligned workflow",
];

const TrustStrip = () => (
  <section
    aria-label="Trusted by"
    className="bg-background border-y border-border/60 py-6 md:py-8"
  >
    <div className="container">
      <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
        Built for property, planning and construction teams
      </p>
      <motion.ul
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2.5"
      >
        {items.map((label) => (
          <li key={label} className="list-none">
            <Badge variant="secondary" className="font-normal text-muted-foreground">
              {label}
            </Badge>
          </li>
        ))}
      </motion.ul>
    </div>
  </section>
);

export default TrustStrip;
