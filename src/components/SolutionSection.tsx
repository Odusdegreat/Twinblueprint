import { motion } from "framer-motion";
import { FaEye, FaBolt, FaUsers, FaCheckCircle } from "react-icons/fa";
import imgArchVis from "@/assets/tile-arch-vis.jpg";
import imgApprovals from "@/assets/tile-approvals.jpg";
import imgStakeholders from "@/assets/tile-stakeholders.jpg";
import imgValidation from "@/assets/tile-design-validation.jpg";

const features = [
  { icon: FaEye, title: "Architectural Visualisation", desc: "Photorealistic renders, BIM visualisation and immersive project models.", img: imgArchVis, alt: "Photorealistic architectural visualisation of a modern building at dusk" },
  { icon: FaBolt, title: "Faster Planning Approvals", desc: "Help planners and committees understand your development at first glance.", img: imgApprovals, alt: "Planning drawings and a tablet showing a 3D development model" },
  { icon: FaUsers, title: "Aligned Stakeholders", desc: "Investors, councils and communities review the same clear digital experience.", img: imgStakeholders, alt: "Project stakeholders reviewing a city Digital Twin on a large screen" },
  { icon: FaCheckCircle, title: "Earlier Design Validation", desc: "Identify design and constructability issues before they reach site.", img: imgValidation, alt: "BIM wireframe structural model used for design validation" },
];


const SolutionSection = () => (
  <section id="services" className="py-6 md:py-8 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-6"
      >
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Solution</p>
        <h2 className="text-3xl md:text-4xl text-foreground mb-4 text-balance mx-auto max-w-[44ch]">
          Digital Twin Solutions that Support Clearer
          <br className="hidden md:block" />{" "}
          Planning and Construction Decisions
        </h2>
        <p className="text-muted-foreground text-lg">
          We translate plans, BIM data and design intent into interactive Digital Twins, so every stakeholder sees exactly what is being delivered.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-muted rounded-2xl overflow-hidden text-center hover:shadow-md transition-shadow"
          >
            <img
              src={f.img}
              alt={f.alt}
              width={1024}
              height={576}
              loading="lazy"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto -mt-8 mb-4 border border-border bg-card">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
