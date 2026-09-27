import { motion } from "framer-motion";

const audiences = [
  "Residential developers",
  "Planning authorities",
  "Construction & infrastructure",
  "BIM & design teams",
  "Master planning",
  "RIBA aligned workflow",
];

const BuiltForSection = () => (
  <section id="built-for" className="py-6 md:py-8 bg-muted">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5">
          Built for property, planning and construction teams
        </h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {audiences.map((item) => (
            <li
              key={item}
              className="text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default BuiltForSection;
