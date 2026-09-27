import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaArrowRight } from "react-icons/fa";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import Navbar from "@/components/Navbar";
import propertyTourVideo from "@/assets/meta-dology-property-tours.mp4.asset.json";
import Footer from "@/components/Footer";
import PageNav from "@/components/PageNav";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your project, stakeholders and approval pathway. Together we define how Digital Twin and visualisation outputs will support your planning, investment and delivery goals.",
    details: [
      "Project scope and stakeholder mapping",
      "Planning and approval pathway review",
      "Data, BIM and source asset audit",
      "Visualisation strategy and success measures",
    ],
  },
  {
    number: "02",
    title: "Project Development",
    description:
      "Our specialists build your Digital Twin from architectural, engineering and site data. Every model is constructed with accurate geometry, materiality and context.",
    details: [
      "BIM and CAD integration",
      "Photorealistic materials and lighting",
      "Site, townscape and infrastructure context",
      "Interactive walkthrough authoring",
    ],
  },
  {
    number: "03",
    title: "Review & Collaboration",
    description:
      "You review your Digital Twin with our team in structured sessions. We refine detail, resolve design questions and align the model with stakeholder requirements.",
    details: [
      "Collaborative review sessions",
      "Design and constructability feedback",
      "Iterative refinements",
      "Sign off ready outputs",
    ],
  },
  {
    number: "04",
    title: "Delivery & Support",
    description:
      "We deliver planning ready visuals, virtual walkthroughs and immersive assets in the formats your teams need. Ongoing support keeps your Digital Twin current across the project lifecycle.",
    details: [
      "High resolution renders and stills",
      "Interactive web walkthroughs",
      "VR and presentation ready exports",
      "Long term model updates",
    ],
  },
];

const benefits = [
  "Faster planning approvals",
  "Stronger stakeholder engagement",
  "Reduced project and delivery risk",
  "Earlier design validation",
  "Improved investor confidence",
  "Better public consultation outcomes",
];

const HowItWorks = () => {
  const { setOpen } = useDemoDialogStore();

  return (
    <>
      <Helmet>
        <title>How it Works | Our Digital Twin Delivery Process | Twinblueprint</title>
        <meta
          name="description"
          content="Our four step Digital Twin delivery process - Discovery, Project Development, Review & Collaboration, Delivery & Support - built for construction, infrastructure and planning teams."
        />
        <link rel="canonical" href="/how-it-works" />
        <meta property="og:title" content="How it Works | Twinblueprint" />
        <meta property="og:url" content="/how-it-works" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Our Digital Twin Delivery Process",
          url: "/how-it-works",
          isPartOf: { "@type": "WebSite", name: "Twinblueprint", url: "/" },
        })}</script>
      </Helmet>
      <Navbar />
      <main>
        <section className="bg-hero pt-20 pb-8 md:pt-24 md:pb-10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-hero-foreground mb-6">
                How It <span className="text-gradient">Works</span>
              </h1>
              <p className="text-hero-muted text-lg md:text-xl leading-relaxed">
                A four step process built for construction, infrastructure and planning teams. We translate complex projects into Digital Twins that accelerate approvals and align every stakeholder.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-5"
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">See It In Action</p>
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">The Future of Property Tours</h2>
              <p className="text-muted-foreground text-lg">
                Watch how our Digital Twin technology brings off plan developments to life with hyperreal 3D experiences.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border shadow-lg bg-card"
            >
              <video
                src={propertyTourVideo.url}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto block"
                aria-label="Meta-Dology property tour demonstration video"
              />
            </motion.div>
          </div>
        </section>

        <section id="process" className="py-8 md:py-10 bg-background scroll-mt-24">

          <div className="container">
            <div className="grid lg:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-border"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-5xl font-extrabold text-primary/20 font-heading leading-none">
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-muted">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-6"
            >
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">
                Why our Process Delivers
              </h2>
              <p className="text-muted-foreground text-lg">
                Measurable outcomes for property developers, infrastructure clients and planning authorities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                Talk to our Digital Twin specialists about your next development, infrastructure scheme or master planning project.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base"
                onClick={() => setOpen(true)}
              >
                Book a Discovery Consultation <FaArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="mt-5 text-xs text-hero-muted">30-min call · NDA on request · Response within one working day</p>
              <p className="mt-6 text-sm text-hero-muted">
                See it in practice in our{" "}
                <Link to="/case-studies" className="text-primary hover:underline">case studies</Link>
                {" "}or explore the{" "}
                <Link to="/services" className="text-primary hover:underline">full service catalogue</Link>.
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

export default HowItWorks;