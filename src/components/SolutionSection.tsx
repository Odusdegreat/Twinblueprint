import { motion } from "framer-motion";
import { FaEye, FaBolt, FaUsers, FaCheckCircle } from "react-icons/fa";

const features = [
  { icon: FaEye, image: "/images/solutions/architectural-visualisation.png", alt: "Modern office building visualised at dusk", title: "Architectural Visualisation", desc: "Photorealistic renders, BIM visualisation and immersive project models." },
  { icon: FaBolt, image: "/images/solutions/planning-approvals.png", alt: "Digital building model on a tablet over architectural plans", title: "Faster Planning Approvals", desc: "Help planners and committees understand your development at first glance." },
  { icon: FaUsers, image: "/images/solutions/aligned-stakeholders.png", alt: "Stakeholders reviewing a shared digital city model", title: "Aligned Stakeholders", desc: "Investors, councils and communities review the same clear digital experience." },
  { icon: FaCheckCircle, image: "/images/solutions/design-validation.png", alt: "Wireframe building model showing its structural design", title: "Earlier Design Validation", desc: "Identify design and constructability issues before they reach site." },
];

const SolutionSection = () => (
  <section id="services" className="section-padding bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-6"
      >
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Solution</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl leading-[1.2] tracking-tight text-foreground text-balance max-w-3xl mx-auto">
          Digital Twin Solutions that Support Clearer <br/>Planning and Construction Decisions
        </h2>
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed text-pretty max-w-2xl mx-auto">
        We translate plans, BIM data and design intent into interactive Digital Twins, so every stakeholder sees exactly what is being delivered.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="overflow-hidden bg-muted rounded-2xl text-center hover:shadow-md transition-shadow"
          >
            <img
              src={f.image}
              alt={f.alt}
              width={1024}
              height={512}
              loading="lazy"
              decoding="async"
              className="w-full aspect-[2/1] object-cover"
            />
            <div className="px-5 pb-6">
              <div className="relative -mt-2 h-12 w-12 rounded-2xl bg-[#17334b] flex items-center justify-center mx-auto mb-4">
                <f.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
