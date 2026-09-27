import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { FaCube, FaUsers, FaChartLine, FaPaintBrush, FaClock, FaShieldAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageNav from "@/components/PageNav";
import ExploreLinks from "@/components/ExploreLinks";
import svcArchVis from "@/assets/svc-arch-vis.jpg";
import svcDigitalTwin from "@/assets/svc-digital-twin.jpg";
import svcPlanningApproval from "@/assets/svc-planning-approval.jpg";
import svcInfrastructure from "@/assets/svc-infrastructure.jpg";
import svcUrbanPlanning from "@/assets/svc-urban-planning.jpg";
import svcWalkthrough from "@/assets/svc-walkthrough.jpg";


const services = [
  {
    icon: FaCube,
    title: "Architectural Visualisation",
    image: svcArchVis,
    imageAlt: "Photorealistic architectural visualisation of a mixed use building exterior at dusk",
    description: "Photorealistic architectural visualisation that communicates design intent, materiality and context with engineering accuracy.",
    features: ["High fidelity exterior and interior renders", "Contextual site and massing studies", "BIM aligned visual output"],
  },
  {
    icon: FaUsers,
    title: "Digital Twin Solutions",
    image: svcDigitalTwin,
    imageAlt: "Digital Twin of a city district with data overlays connecting buildings and infrastructure",
    description: "Interactive Digital Twins that mirror real world geometry, data and context for planning, design review and operations.",
    features: ["BIM and GIS data integration", "Live model updates", "Web based stakeholder access"],
  },
  {
    icon: FaChartLine,
    title: "Planning Approval Support",
    image: svcPlanningApproval,
    imageAlt: "Planning committee reviewing a development proposal on screen during an approval meeting",
    description: "Visual evidence that helps planning officers, committees and consultees evaluate development proposals with confidence.",
    features: ["Compliance ready visuals", "Townscape and impact studies", "Public consultation assets"],
  },
  {
    icon: FaCube,
    title: "Infrastructure Visualisation",
    image: svcInfrastructure,
    imageAlt: "Aerial infrastructure visualisation of a bridge and highway corridor under construction",
    description: "Immersive visualisation for transport, utilities and major infrastructure projects, from corridor studies to delivery.",
    features: ["Linear and corridor modelling", "Construction staging visuals", "Operational context overlays"],
  },
  {
    icon: FaPaintBrush,
    title: "Urban Planning & Master Planning",
    image: svcUrbanPlanning,
    imageAlt: "Aerial master planning visualisation of a mixed use urban district with public realm",
    description: "Digital experiences that support master planning, mixed use developments and smart city strategies.",
    features: ["Master plan visualisations", "Phasing and density studies", "Public realm modelling"],
  },
  {
    icon: FaShieldAlt,
    title: "Interactive Virtual Walkthroughs",
    image: svcWalkthrough,
    imageAlt: "Stakeholder exploring an interactive virtual walkthrough of an apartment on a tablet",
    description: "Self-guided virtual walkthroughs that let stakeholders explore developments on any device, at any time.",
    features: ["Browser based delivery", "VR and tablet support", "Guided narrative tours"],
  },
];


const process = [
  {
    step: 1,
    title: "Discovery",
    description: "We define your project scope, stakeholders and approval pathway to align visualisation outputs with business outcomes.",
  },
  {
    step: 2,
    title: "Project Development",
    description: "Our team builds the Digital Twin from your drawings, BIM data and site information with photorealistic accuracy.",
  },
  {
    step: 3,
    title: "Review & Collaboration",
    description: "You review interactive models with our specialists and refine detail, materials and context before sign off.",
  },
  {
    step: 4,
    title: "Delivery & Support",
    description: "Receive planning ready visuals, walkthroughs and immersive assets, with ongoing support across the project lifecycle.",
  },
];

const Services = () => {
  const { setOpen } = useDemoDialogStore();

  return (
    <>
      <Helmet>
        <title>Digital Twin & Visualisation Services | Twinblueprint</title>
        <meta
          name="description"
          content="Digital Twin solutions, architectural visualisation, infrastructure visualisation and planning approval support that reduce delivery risk and accelerate approvals."
        />
        <link rel="canonical" href="/services" />
        <meta property="og:title" content="Digital Twin & Visualisation Services | Twinblueprint" />
        <meta property="og:url" content="/services" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Digital Twin & Visualisation Services",
          url: "/services",
          isPartOf: { "@type": "WebSite", name: "Twinblueprint", url: "/" },
          about: ["Digital Twin", "Architectural Visualisation", "Planning Approval Support", "BIM Visualisation"],
        })}</script>
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-hero pt-20 pb-8 md:pt-24 md:pb-10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-hero-foreground mb-6">
                Digital Twin & <span className="text-gradient">Visualisation Services</span>
              </h1>
              <p className="text-hero-muted text-lg md:text-xl leading-relaxed">
                Architectural visualisation, infrastructure visualisation and Digital Twin solutions that accelerate planning approvals, improve stakeholder engagement and reduce delivery risk.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mb-6 bg-card border border-border rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl md:text-3xl text-foreground mb-4">What we Offer</h3>
              <p className="text-muted-foreground leading-relaxed">
                End to end visualisation solutions for construction, infrastructure and urban planning projects, providing high fidelity digital models that support every critical stage from planning and design through stakeholder consultation, technical development and sales enablement.
              </p>
            </motion.div>


            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                const slug = service.title
                  .toLowerCase()
                  .replace(/&/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                return (
                  <motion.div
                    key={service.title}
                    id={slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="scroll-mt-28 bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      width={1280}
                      height={720}
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-8 pt-0">
                    <div className="w-12 h-12 -mt-6 mb-4 bg-card border border-border rounded-lg flex items-center justify-center relative z-10 shadow-sm">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    </div>
                  </motion.div>

                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-8 md:py-10 bg-muted">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-6"
            >
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">Our Process</h2>
              <p className="text-muted-foreground text-lg">
                A four step process designed for construction, infrastructure and planning teams.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {process.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex items-center"
                >
                  <div className="bg-card rounded-2xl p-6 border border-border h-full w-full">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 mt-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {i < process.length - 1 && (
                    <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-hero py-10 md:py-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl text-hero-foreground mb-6">
                Transform the way you Communicate Projects
              </h2>
              <p className="text-hero-muted text-lg mb-8 leading-relaxed">
                Talk to our Digital Twin specialists about accelerating your next planning approval, stakeholder engagement programme or development launch.
              </p>
              <ExploreLinks className="mb-8" />
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base"
                onClick={() => setOpen(true)}
              >
                Book a Discovery Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="mt-5 text-xs text-hero-muted">
                30-min call · NDA on request · Response within one working day
              </p>

            </motion.div>
          </div>
        </section>
      </main>
      <PageNav />
      <Footer />
    </>
  );
};

export default Services;

