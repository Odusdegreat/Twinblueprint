import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTrophy, FaUsers, FaGlobe, FaLightbulb } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import Navbar from "@/components/Navbar";
import PageNav from "@/components/PageNav";
import { BASE_URL } from "@/lib/constants";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, getAboutPageSchema } from "@/lib/seo";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "20+ years in architectural visualisation and Digital Twin technology. Former head of visualisation at a major UK architecture firm.",
  },
  {
    name: "James Murphy",
    role: "Chief Technology Officer",
    bio: "Expert in photorealistic rendering and real time Digital Twin platforms. Previously led visualisation engineering at a FTSE 100 company.",
  },
  {
    name: "Emma Lewis",
    role: "Head of Client Success",
    bio: "10+ years in client relations and project management for AEC clients. Focused on measurable delivery outcomes.",
  },
  {
    name: "David Patel",
    role: "Lead Visualisation Artist",
    bio: "Award winning visualisation artist specialising in architectural and infrastructure projects. Master's in Digital Architecture.",
  },
];

const values = [
  {
    icon: FaLightbulb,
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible in architectural visualisation technology and techniques.",
  },
  {
    icon: FaTrophy,
    title: "Excellence",
    description: "We're committed to delivering the highest quality visualizations that exceed expectations.",
  },
  {
    icon: FaUsers,
    title: "Collaboration",
    description: "We work closely with our clients to understand their vision and translate it perfectly.",
  },
  {
    icon: FaGlobe,
    title: "Sustainability",
    description: "We're dedicated to supporting sustainable development through better visualization and communication.",
  },
];

const About = () => {
  const { setOpen } = useDemoDialogStore();

  return (
    <>
      <Helmet>
        <title>About Twinblueprint | Global Technology & Business Solutions</title>
        <meta
          name="description"
          content="Twinblueprint is a global technology and business solutions company helping organizations modernize operations, deliver digital transformation and build smarter business systems worldwide."
        />
        <link rel="canonical" href={`${BASE_URL}/about`} />
        <meta property="og:title" content="About Twinblueprint | Global Technology & Business Solutions" />
        <meta property="og:description" content="Twinblueprint partners with organizations worldwide to improve technology strategy, modernize workflows and drive measurable business growth." />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Twinblueprint | Global Technology & Business Solutions" />
        <meta name="twitter:description" content="Twinblueprint partners with organizations worldwide to improve technology strategy, modernize workflows and drive measurable business growth." />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(getAboutPageSchema())}</script>
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
                About <span className="text-gradient">Twinblueprint</span>
              </h1>
              <p className="text-hero-muted text-lg md:text-xl leading-relaxed">
                We partner with organizations worldwide to strengthen technology strategy, streamline operations and deliver practical digital transformation outcomes across business and technology functions.
              </p>
              <p className="text-hero-muted mt-4 text-sm">
                <Link to="/services" className="text-primary hover:underline">Explore our services</Link>
                {" · "}
                <Link to="/case-studies" className="text-primary hover:underline">Read case studies</Link>
                {" · "}
                <Link to="/blog" className="text-primary hover:underline">Latest insights</Link>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  To help organizations use technology more effectively, modernize operations and turn strategic priorities into measurable business outcomes.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Better systems, better data and more agile delivery create stronger performance for teams operating in competitive global markets.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  To be a trusted global technology and business solutions company known for practical innovation, clear execution and measurable impact.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A future where every organization can use technology strategically to move faster, work smarter and compete with confidence.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-8 md:py-10 bg-muted">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-6"
            >
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">Our Core Values</h2>
              <p className="text-muted-foreground text-lg">
                These principles guide every decision we make and every project we undertake.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-2xl p-6 border border-border text-center"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        

        {/* Company Stats */}
        <section className="py-8 md:py-10 bg-muted">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Projects Completed", value: "200+" },
                { label: "Approvals Achieved", value: "98%" },
                { label: "Years Experience", value: "5+" },
                { label: "Team Members", value: "50+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
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
                Let's Create Something Amazing Together
              </h2>
              <p className="text-hero-muted text-lg mb-8 leading-relaxed">
                Ready to transform your project with a stunning virtual project environment?
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base"
                onClick={() => setOpen(true)}
              >
                Book a Demo <FaArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <PageNav />
    </>
  );
};

export default About;
