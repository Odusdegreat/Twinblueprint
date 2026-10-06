import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { FaCube, FaUsers, FaChartLine, FaPaintBrush, FaClock, FaShieldAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import Navbar from "@/components/Navbar";
import PageNav from "@/components/PageNav";
import ExploreLinks from "@/components/ExploreLinks";
import svcArchVis from "@/assets/svc-arch-vis.jpg";
import svcDigitalTwin from "@/assets/svc-digital-twin.jpg";
import svcPlanningApproval from "@/assets/svc-planning-approval.jpg";
import svcInfrastructure from "@/assets/svc-infrastructure.jpg";
import svcUrbanPlanning from "@/assets/svc-urban-planning.jpg";
import svcWalkthrough from "@/assets/svc-walkthrough.jpg";
import { BASE_URL } from "@/lib/constants";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, getWebPageSchema } from "@/lib/seo";


const services = [
  {
    icon: FaChartLine,
    title: "Technology Consulting",
    image: svcArchVis,
    imageAlt: "Technology consulting strategy session with stakeholders reviewing digital priorities and business systems",
    description: "Strategic technology consulting that helps organizations align digital investments, operational priorities and transformation goals with measurable business outcomes.",
    features: ["Technology roadmap planning", "Process and systems assessment", "Executive advisory support"],
  },
  {
    icon: FaUsers,
    title: "Digital Transformation",
    image: svcDigitalTwin,
    imageAlt: "Digital transformation initiatives unifying operations, workflows and stakeholder data across departments",
    description: "Modern digital transformation services that improve how organizations deliver value through smarter workflows, better data and connected systems.",
    features: ["Workflow modernization", "System integration", "Operational efficiency gains"],
  },
  {
    icon: FaCube,
    title: "Software Development",
    image: svcPlanningApproval,
    imageAlt: "Custom software interface for business operations, dashboards and stakeholder workflows",
    description: "Custom software development solutions designed to streamline operations, support decision-making and power digital growth across the enterprise.",
    features: ["Custom platform development", "Business applications", "Scalable solution delivery"],
  },
  {
    icon: FaPaintBrush,
    title: "AI Solutions",
    image: svcInfrastructure,
    imageAlt: "AI powered business workflow dashboard and intelligent automation interface",
    description: "AI solutions that help organizations automate processes, unlock insights and build faster, more intelligent business operations.",
    features: ["AI strategy and implementation", "Automation workflows", "Decision support systems"],
  },
  {
    icon: FaShieldAlt,
    title: "Business Automation",
    image: svcUrbanPlanning,
    imageAlt: "Business automation dashboard optimizing repetitive operational and reporting tasks",
    description: "Business automation services designed to reduce manual effort, improve consistency and free teams to focus on higher-value work.",
    features: ["Workflow automation", "Reporting and alerting", "Operational scale and consistency"],
  },
  {
    icon: FaUsers,
    title: "Enterprise Technology Solutions",
    image: svcWalkthrough,
    imageAlt: "Enterprise technology solution overview connecting business systems, data and teams across the organization",
    description: "Enterprise technology solutions that unify platforms, improve visibility and support sustainable growth for organizations operating at scale.",
    features: ["Enterprise architecture support", "Data and systems alignment", "Long-term technology enablement"],
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
        <title>Technology Consulting & Digital Transformation Services | Twinblueprint</title>
        <meta
          name="description"
          content="Twinblueprint delivers technology consulting, digital transformation, software development, AI solutions and business automation services for organizations worldwide."
        />
        <link rel="canonical" href={`${BASE_URL}/services`} />
        <meta property="og:title" content="Technology Consulting & Digital Transformation Services | Twinblueprint" />
        <meta property="og:description" content="Technology consulting, digital transformation, software development and AI solutions that help organizations modernize operations and improve business performance." />
        <meta property="og:url" content={`${BASE_URL}/services`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technology Consulting & Digital Transformation Services | Twinblueprint" />
        <meta name="twitter:description" content="Technology consulting, digital transformation, software development and AI solutions that help organizations modernize operations and improve business performance." />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(getWebPageSchema("Technology Consulting & Digital Transformation Services", `${BASE_URL}/services`, "Technology consulting, digital transformation, software development and AI solutions for global businesses."))}</script>
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
                Technology consulting and <span className="text-gradient">digital transformation services</span>
              </h1>
              <p className="text-hero-muted text-lg md:text-xl leading-relaxed">
                Twinblueprint helps organizations modernize operations, improve systems and deliver measurable business value through technology consulting, software delivery, AI solutions and automation.
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
              <h2 className="text-2xl md:text-3xl text-foreground mb-4">What we Offer</h2>
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
                    <h2 className="text-xl font-bold text-foreground mb-3">{service.title}</h2>

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
    </>
  );
};

export default Services;

