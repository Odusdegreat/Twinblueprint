import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHardHat, FaCity, FaDraftingCompass, FaRoad, FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import imgConstruction from "@/assets/tile-construction.jpg";
import imgDevelopers from "@/assets/tile-developers.jpg";
import imgArchitects from "@/assets/tile-architects.jpg";
import imgInfrastructure from "@/assets/tile-infrastructure.jpg";
import imgUrbanPlanning from "@/assets/tile-urban-planning.jpg";

const industries = [
  {
    icon: FaHardHat,
    image: imgConstruction,
    alt: "Construction team on site reviewing a Digital Twin model on a tablet",
    title: "Construction Companies",
    description:
      "Digital Twin coordination that aligns site teams, subcontractors and clients on a single source of truth reducing rework, RFIs and programme slippage.",
    outcome: "Cut clash driven rework by up to 30% and accelerate site decision making.",
  },
  {
    icon: FaCity,
    image: imgDevelopers,
    alt: "Modern residential property development at dusk",
    title: "Property Developers",
    description:
      "Immersive property visualisation that secures investor confidence, accelerates sales velocity and shortens the path from proposal to planning consent.",
    outcome: "Pre sell off plan units faster and de risk capital deployment.",
  },
  {
    icon: FaDraftingCompass,
    image: imgArchitects,
    alt: "Architect's desk with drawings and a scale building model",
    title: "Architects",
    description:
      "Photorealistic BIM aligned visualisation that protects design intent, strengthens competition submissions and elevates client presentations.",
    outcome: "Win more pitches and reduce design churn through earlier client alignment.",
  },
  {
    icon: FaRoad,
    image: imgInfrastructure,
    alt: "Aerial view of a highway and rail infrastructure corridor at dusk",
    title: "Infrastructure Organisations",
    description:
      "Corridor scale Digital Twins for transport, utilities and energy projects supporting stakeholder consultation, environmental assessment and delivery planning.",
    outcome: "Move complex schemes through approvals and into delivery with greater certainty.",
  },
  {
    icon: FaMapMarkedAlt,
    image: imgUrbanPlanning,
    alt: "Aerial city district master plan with a Digital Twin overlay",
    title: "Urban Planning",
    description:
      "Interactive master plan models that help councils, communities and planning officers evaluate scale, density and townscape impact with confidence.",
    outcome: "Shorten consultation cycles and build public support for change.",
  },
];


const IndustriesSection = () => {
  const { setOpen } = useDemoDialogStore();
  return (
    <section id="industries" className="py-6 md:py-8 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-6"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Industries We Support</p>
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">
            Digital Twin Solutions Tailored to Construction, Property and Planning
          </h2>
          <p className="text-muted-foreground text-lg">
            From single buildings to citywide infrastructure, we help teams across the built environment communicate projects clearly and deliver them with confidence.
          </p>
        </motion.div>






        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.article
                key={ind.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors flex flex-col"
              >
                <img
                  src={ind.image}
                  alt={ind.alt}
                  width={1024}
                  height={576}
                  loading="lazy"
                  className="w-full h-44 object-cover"
                />
                <div className="p-7 flex flex-col flex-1">
                  <div className="h-12 w-12 rounded-xl bg-card border border-border flex items-center justify-center -mt-11 mb-5">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{ind.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-4">{ind.description}</p>
                  <p className="text-sm text-primary font-medium mb-5">{ind.outcome}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5"
                      onClick={() => setOpen(true)}
                    >
                      Book a Discovery Consultation
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full px-5"
                      asChild
                    >
                      <Link to="/case-studies">
                        See proof <FaArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>

            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
