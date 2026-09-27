import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import welcomeVideo from "@/assets/welcome-meta-dology.mp4.asset.json";



const CaseStudiesSection = () => (
  <section id="case-studies" className="py-6 md:py-8 bg-muted">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-6"
      >
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Case Studies</p>
        <h2 className="text-3xl md:text-4xl text-foreground mb-4 text-balance mx-auto max-w-[44ch]">
          Measurable Outcomes on Live Development
          <br className="hidden md:block" />{" "}
          and Infrastructure Projects
        </h2>
        <p className="text-muted-foreground text-lg">
          See how Digital Twin and immersive visualisation help our clients win approvals, align stakeholders and protect project economics.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-6 rounded-2xl overflow-hidden border border-border shadow-lg bg-card"
      >
        <video
          src={welcomeVideo.url}
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto block"
          aria-label="Welcome to Meta-dology - the future of property development"
        />
      </motion.div>




      <div className="text-center mt-8">
        <Link to="/case-studies" className="text-primary font-semibold hover:underline">
          View all case studies →
        </Link>
      </div>
    </div>
  </section>
);

export default CaseStudiesSection;
