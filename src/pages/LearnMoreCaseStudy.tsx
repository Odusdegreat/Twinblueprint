import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useDemoDialogStore } from "@/stores/demoDialogStore";
import Navbar from "@/components/Navbar";
import BookDemoDialog from "@/components/BookDemoDialog";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";

const caseStudiesData = {
  1: {
    id: 1,
    image: caseStudy1,
    alt: "Photorealistic Digital Twin of Riverside Apartments residential scheme used in planning submission",
    category: "Residential Development",
    title: "Riverside Apartments - Planning Approval Secured 40% Faster",
    metaTitle: "Riverside Apartments Case Study | Digital Twin Planning Approval",
    metaDescription:
      "How a 200-unit riverside residential scheme used Digital Twin visualisation to secure planning approval on first resubmission, saving 6 months and £120k.",
    location: "London, UK",
    developer: "Thames Development Co.",
    year: "2025",
    timeline: "8 weeks",
    challenge:
      "A UK developer had received two planning rejections on a 200-unit riverside scheme. The local planning authority and conservation officer could not interpret massing or material impact against the Victorian streetscape from drawings alone, putting £120k of holding costs and a six month programme slip at risk.",
    solution:
      "We produced a photorealistic Digital Twin and interactive virtual walkthrough capturing the development in full urban context, with daylight, seasonal and viewpoint variations. The model was issued to planners and used live in the committee meeting to answer questions in real time.",
    result:
      "Approval granted on first resubmission. The developer recovered six months on the delivery programme and removed £120k of holding costs from the project.",
    services: ["Digital Twin", "Architectural Visualisation", "Interactive Walkthroughs", "Planning Approval Support"],
    metrics: [
      { label: "Time saved", value: "6 months" },
      { label: "Cost avoided", value: "£120k" },
      { label: "Units consented", value: "200" },
      { label: "Approval", value: "First resubmission" },
    ],
    gallery: [caseStudy1, caseStudy2],
  },
  2: {
    id: 2,
    image: caseStudy2,
    alt: "Immersive 3D visualisation of a city bridge infrastructure project used in stakeholder consultation",
    category: "Transport Infrastructure",
    title: "City Bridge Project - 12 Stakeholder Groups Aligned in One Session",
    metaTitle: "City Bridge Case Study | Stakeholder Alignment with Digital Twin",
    metaDescription:
      "A £45m bridge replacement aligned 12 stakeholder groups in a single review using immersive infrastructure visualisation - 100% approval rate.",
    location: "Manchester, UK",
    developer: "UK Infrastructure Partners",
    year: "2025",
    timeline: "6 weeks",
    challenge:
      "A local authority needed to align twelve stakeholder groups - including transport, environment and community representatives - on a £45m bridge replacement facing public opposition. Previous consultations had stalled on differing interpretations of the scheme.",
    solution:
      "We delivered an interactive infrastructure Digital Twin with stakeholder tailored flythroughs, deployed across council, statutory consultee and public consultation sessions. Each audience saw the considerations relevant to them within the same authoritative model.",
    result:
      "Unanimous stakeholder approval achieved in a single session - the fastest consensus the authority had recorded on a scheme of this scale, unlocking the next funding tranche.",
    services: ["Digital Twin", "Infrastructure Visualisation", "Stakeholder Consultation", "VR Walkthroughs"],
    metrics: [
      { label: "Stakeholders aligned", value: "12" },
      { label: "Review sessions", value: "1" },
      { label: "Approval rate", value: "100%" },
      { label: "Programme impact", value: "Funding unlocked" },
    ],
    gallery: [caseStudy2, caseStudy1],
  },
  3: {
    id: 3,
    image: caseStudy1,
    alt: "Interactive Digital Twin of a residential development used by a developer sales and planning team",
    category: "Residential Developers",
    title: "Residential Developers - 200-Unit Scheme Consented and Pre Sold Off Plan",
    metaTitle: "Residential Developer Case Study | Digital Twin Off Plan Sales & Approvals",
    metaDescription:
      "How a residential developer used Digital Twin visualisation to consent a 200-unit scheme and pre sell 62% of units off plan before ground was broken.",
    location: "South East England",
    developer: "Regional residential developer",
    year: "2026",
    timeline: "9 weeks",
    challenge:
      "The developer needed to fund and pre sell a 200-unit scheme while the planning application was still live. Drawings and CGIs failed to convey layout, daylight and outlook to buyers or lenders.",
    solution:
      "We delivered an interactive Digital Twin with unit level walkthroughs, time of day daylight studies and switchable finishes, deployed in the sales suite and online.",
    result:
      "62% of phase one units reserved off plan before completion of the shell, and the funding drawdown was brought forward by one quarter.",
    services: ["Digital Twin", "Architectural Visualisation", "Interactive Virtual Walkthroughs", "Property Marketing"],
    metrics: [
      { label: "Units reserved off plan", value: "62%" },
      { label: "Funding brought forward", value: "1 quarter" },
      { label: "Units visualised", value: "200" },
      { label: "Delivery time", value: "9 weeks" },
    ],
    gallery: [caseStudy1, caseStudy2],
  },
  4: {
    id: 4,
    image: caseStudy2,
    alt: "Planning authority officers assessing a master plan through an interactive Digital Twin model",
    category: "Planning Authorities",
    title: "Planning Authorities - Consultation Responses Up 3x on a Town Centre Master Plan",
    metaTitle: "Planning Authority Case Study | Digital Twin Public Consultation",
    metaDescription:
      "How a planning authority used an interactive Digital Twin to triple public consultation responses and cut officer assessment time on a town centre master plan.",
    location: "Midlands, UK",
    developer: "District planning authority",
    year: "2026",
    timeline: "7 weeks",
    challenge:
      "Public consultation on a town centre master plan drew low, unrepresentative response rates. Officers spent weeks reconciling drawings against policy and townscape guidance.",
    solution:
      "We built a browser based Digital Twin of the master plan with viewpoint comparisons, phasing toggles and an embedded comment tool for residents and statutory consultees.",
    result:
      "Consultation responses tripled, and officer assessment time on massing and townscape impact fell by roughly 40%.",
    services: ["Digital Twin", "Urban Planning", "Public Consultation", "Stakeholder Engagement"],
    metrics: [
      { label: "Consultation responses", value: "3x" },
      { label: "Assessment time saved", value: "40%" },
      { label: "Viewpoints modelled", value: "18" },
      { label: "Delivery time", value: "7 weeks" },
    ],
    gallery: [caseStudy2, caseStudy1],
  },
  5: {
    id: 5,
    image: caseStudy1,
    alt: "BIM and design team reviewing a federated model coordination issue inside a Digital Twin environment",
    category: "BIM & Design Teams",
    title: "BIM & Design Teams - 140 Coordination Issues Resolved Before Site Mobilisation",
    metaTitle: "BIM Visualisation Case Study | Digital Twin Design Coordination",
    metaDescription:
      "How a design team used BIM-driven Digital Twin visualisation to resolve 140 coordination issues pre construction and cut design stage RFIs by a third.",
    location: "Dublin, Ireland",
    developer: "Multidisciplinary design consultancy",
    year: "2026",
    timeline: "6 weeks",
    challenge:
      "A federated BIM model held coordination clashes that only surfaced in technical reviews. Consultants worked from different model versions and site rework risk was rising.",
    solution:
      "We converted the federated BIM data into a navigable Digital Twin with issue tagging, revision comparison and stakeholder friendly views for non technical reviewers.",
    result:
      "140 coordination issues were identified and closed out before site mobilisation, and design stage RFIs dropped by a third.",
    services: ["BIM Visualisation", "Digital Twin", "Design Review", "Project Collaboration"],
    metrics: [
      { label: "Issues resolved pre site", value: "140" },
      { label: "RFI reduction", value: "33%" },
      { label: "Disciplines federated", value: "6" },
      { label: "Delivery time", value: "6 weeks" },
    ],
    gallery: [caseStudy1, caseStudy2],
  },
};


const LearnMoreCaseStudy = () => {
  const { id } = useParams();
  const studyId = parseInt(id || "1");
  const study = caseStudiesData[studyId as keyof typeof caseStudiesData] || caseStudiesData[1];
  const { setOpen } = useDemoDialogStore();

  return (
    <>
      <Helmet>
        <title>{study.metaTitle}</title>
        <meta name="description" content={study.metaDescription} />
        <link rel="canonical" href={`/case-studies/${study.id}`} />
        <meta property="og:title" content={study.metaTitle} />
        <meta property="og:description" content={study.metaDescription} />
        <meta property="og:url" content={`/case-studies/${study.id}`} />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.metaDescription,
          author: { "@type": "Organization", name: "Twinblueprint" },
          publisher: { "@type": "Organization", name: "Twinblueprint" },
        })}</script>
      </Helmet>
      <Navbar />
      <main>
        <section className="bg-hero pt-32 pb-12">
          <div className="container">
            <Link to="/case-studies">
              <Button variant="ghost" className="mb-6 text-hero-muted hover:text-hero-foreground pl-0">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              
              <h1 className="text-3xl md:text-5xl font-bold text-hero-foreground mb-4">{study.title}</h1>
              <p className="text-hero-muted text-lg mb-6">
                {study.location} · {study.developer} · {study.year}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">The Measurable Outcome</h2>
                  <p className="text-primary text-xl font-semibold">{study.result}</p>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-bold text-foreground mb-3">Related reading</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link className="text-primary hover:underline" to="/services">Explore our Digital Twin services</Link></li>
                    <li><Link className="text-primary hover:underline" to="/blog/planning-approval-digital-twin">How Digital Twins accelerate planning approvals</Link></li>
                    <li><Link className="text-primary hover:underline" to="/how-it-works">Our 4-step delivery process</Link></li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-muted rounded-2xl p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-foreground mb-4">Project Details</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="font-semibold text-foreground">{study.timeline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Services Provided</p>
                      <ul className="space-y-2 mt-2">
                        {study.services.map((service) => (
                          <li key={service} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    onClick={() => setOpen(true)}
                  >
                    Book a Discovery Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    30-min call · NDA on request
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted">
          <div className="container">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Key Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="bg-background rounded-xl p-6 text-center border border-border">
                  <p className="text-3xl font-bold text-primary mb-2">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-hero section-padding">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl text-hero-foreground mb-6">Ready to achieve a similar outcome?</h2>
              <p className="text-hero-muted text-lg mb-8 leading-relaxed">
                Book a discovery consultation and we will show you how Digital Twin visualisation can shorten your approval timeline and align your stakeholders.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base"
                onClick={() => setOpen(true)}
              >
                Book a Discovery Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <BookDemoDialog />
    </>
  );
};

export default LearnMoreCaseStudy;
