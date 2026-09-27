import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Discovery", desc: "We scope your project, stakeholders and approval pathway to define the right visualisation strategy." },
  { number: "02", title: "Project Development", desc: "Our team builds your Digital Twin from drawings, BIM and site data with photorealistic detail." },
  { number: "03", title: "Review & Collaboration", desc: "You review interactive models with our team and refine the experience until it represents your project accurately." },
  { number: "04", title: "Delivery & Support", desc: "Receive walkthroughs, renders and immersive assets ready for planning, investor and public consultation use." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-6 md:py-8 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-6"
      >
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Process</p>
        <h2 className="text-3xl md:text-4xl text-foreground">A Four Step Process Built for Construction and Planning Teams</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden border border-border shadow-lg bg-card"
      >
        <video
          src="/assets/videos/twinblueprintmeta.mp4"
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto block"
          aria-label="How Twinblueprint works"
        />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <span className="text-6xl font-extrabold text-primary/10 font-heading">{s.number}</span>
            <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
