import { motion } from "framer-motion";
import { ArrowRight, Building2, Trophy, Train, Factory, TreePine, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageNav from "@/components/PageNav";
import BookDemoDialog from "@/components/BookDemoDialog";
import ExploreLinks from "@/components/ExploreLinks";
import { useQuery } from "@tanstack/react-query";
import { articlesApi, formatArticleDate, calculateReadTime } from "@/lib/articlesApi";

import heroImage from "@/assets/case-studies-hero.jpg";
import csMegaProjects from "@/assets/cs-mega-projects.jpg";
import csStadiums from "@/assets/cs-stadiums.jpg";
import csTransportHubs from "@/assets/cs-transport-hubs.jpg";
import csIndustrialParks from "@/assets/cs-industrial-parks.jpg";
import csLifestyleEstates from "@/assets/cs-lifestyle-estates.jpg";
import csGovernment from "@/assets/cs-government.jpg";
import csResidentialDevelopers from "@/assets/cs-residential-developers.jpg";
import csPlanningAuthorities from "@/assets/cs-planning-authorities.jpg";
import csBimTeams from "@/assets/cs-bim-teams.jpg";

const audienceStudies = [
  {
    id: 3,
    audience: "Residential Developers",
    image: csResidentialDevelopers,
    imageAlt: "Contemporary residential development with landscaped courtyard visualised for off plan sales",
    title: "200 Units Scheme Consented and Pre Sold Off Plan",
    outcome:
      "Unit level walkthroughs, daylight studies and switchable finishes gave buyers and lenders confidence long before the shell was complete.",
    metric: "62% pre sold off plan",
  },
  {
    id: 4,
    audience: "Planning Authorities",
    image: csPlanningAuthorities,
    imageAlt: "Public consultation event with residents reviewing a town centre master plan model",
    title: "Town Centre Master Plan Consultation Responses Tripled",
    outcome:
      "A browser based Digital Twin with viewpoint comparisons and phasing toggles widened public participation and sped up officer assessment.",
    metric: "3x consultation responses",
  },
  {
    id: 5,
    audience: "BIM & Design Teams",
    image: csBimTeams,
    imageAlt: "Engineers reviewing a federated BIM coordination model on a large screen",
    title: "140 Coordination Issues Resolved Before Site Mobilisation",
    outcome:
      "Federated BIM data became a navigable Digital Twin with issue tagging and revision comparison across six disciplines.",
    metric: "33% fewer design RFIs",
  },
];

const specialties = [
  { icon: Building2, image: csMegaProjects, imageAlt: "Aerial view of a multi phase mega development under construction with tower cranes", title: "Mega Projects", description: "Large scale, multi phase developments where digital twins drive alignment, planning and stakeholder buy in." },
  { icon: Trophy, image: csStadiums, imageAlt: "Modern stadium exterior at dusk with sweeping roof structure", title: "Stadiums", description: "Immersive walkthroughs for sports and event venues from fan experience to operational planning." },
  { icon: Train, image: csTransportHubs, imageAlt: "Modern metro station concourse with a train arriving at the platform", title: "Transport Hubs", description: "Metro stations, terminals and interchanges visualised as living, data rich digital twins." },
  { icon: Factory, image: csIndustrialParks, imageAlt: "Aerial view of a logistics and industrial park with warehouses and loading docks", title: "Industrial Parks", description: "Warehouse, logistics and tenant space planning with simulation led optimisation." },
  { icon: TreePine, image: csLifestyleEstates, imageAlt: "Aerial view of a golf and resort lifestyle estate with fairways and villas", title: "Lifestyle Estates", description: "Golf, residential and resort estates brought to life for investors, buyers and overseas markets." },
  { icon: Landmark, image: csGovernment, imageAlt: "Civic government building exterior with a public square", title: "Government & Council", description: "Infrastructure and public sector projects accelerated through visual clarity and approvals." },
];

const successStories = [
  {
    title: "Harbour Road",
    sector: "Private",
    category: "Luxury Coastal Residential Development",
    size: "130 units",
    duration: "5 Years",
    status: "Pre Development / Multi Phase Rollout",
    description: "Harbour Road is a luxury coastal residential development in Kleinmond, South Africa, offering lock up and go living shaped by nature, village ease and harbour side energy. Meta-dology was brought in to translate the product and wider rejuvenation story into an immersive digital experience capturing lifestyle, setting and long term vision.",
  },
  {
    title: "Metro Digital Twin",
    sector: "Public / Government",
    category: "Metro Infrastructure",
    size: "29 Subways",
    duration: "10 Years",
    status: "Ongoing",
    description: "An intelligent, fully explorable digital twin uniting an entire metro network into one cohesive, interactive experience bringing every station, tunnel and surrounding point of interest to life for smarter planning, proactive maintenance and public engagement.",
  },
  {
    title: "Foster's Farm",
    sector: "Private",
    category: "Luxury Lifestyle Estate & Golf Course",
    size: "253 Residences, Hotel, 30 Bungalows & Retail",
    duration: "5 Years",
    status: "Ongoing",
    description: "A sprawling secluded luxury estate with a championship golf course, hotel bungalows and expansive residences. We delivered a hyperrealistic digital twin that secured mezzanine finance, government approvals and accelerated phase planning.",
  },
  {
    title: "Land of Nomads",
    sector: "Private",
    category: "Mixed Use & Investments Estate",
    size: "368 Villa Lofts across 5 phases",
    duration: "5 Years",
    status: "Ongoing",
    description: "A multi country portfolio of six premium second home developments in unique destinations. The platform serves every stage funding, planning, sales, rentals and property management for a global audience.",
  },
  {
    title: "Mount Royal",
    sector: "Private",
    category: "Lifestyle and Golf Estate",
    size: "600 Family Home Opportunities",
    duration: "3 Years",
    status: "Ongoing",
    description: "A gated lifestyle estate where buyers can virtually fly to their chosen plot, toggle through home layouts and instantly see how a property maximises views, space and lifestyle accelerating the sales cycle across phases.",
  },
  {
    title: "AEHECA",
    sector: "Private",
    category: "Luxury Condominiums",
    size: "11 Boutique Apartments",
    duration: "1 Year",
    status: "Ongoing",
    description: "An exclusive boutique condominium development steps from golden beaches and a world class marina. Buyers can walk through, see sunlight by time of day, toggle walls and furnishings, and explore the neighbourhood in a hyperreal 3D environment.",
  },
  {
    title: "Sunrise Marina",
    sector: "Private",
    category: "Luxury Mixed Use Development & Marina",
    size: "14 Residences, 8 Shops, 80-Berth Marina",
    duration: "4 Years",
    status: "Ongoing",
    description: "A world class luxury marina destination. Real world topographical data with current and wave simulations validated commercial feasibility, secured environmental approvals and aligned developers, investors and regulators.",
  },
  {
    title: "Noka Park",
    sector: "Private",
    category: "Industrial Warehouse Rentals",
    size: "4 Industrial Warehouses",
    duration: "1 Year",
    status: "Ongoing",
    description: "A modern industrial park delivered as a hyperrealistic 3D walkthrough in just 10 days enabling tenant signage, truck turning simulations, shelving layouts and office positioning all before move in.",
  },
  {
    title: "Absa",
    sector: "Private",
    category: "Commercial / Residential Sales",
    size: "3 Office Buildings",
    duration: "2 Months",
    status: "Complete",
    description: "Helped Absa offload portfolio assets at above market value by enabling investors to toggle between commercial and residential layouts instantly unlocking versatility and maximum return.",
  },
  {
    title: "Discovery",
    sector: "Private",
    category: "Office Floor Rentals",
    size: "3 Premium Floors of 3,000m² each",
    duration: "2 Months",
    status: "Complete",
    description: "An urgent commercial rental delivered in 10 days. Prospective tenants toggled between open and closed plan layouts with embedded real time rental metrics accelerating leasing conversations and conversion.",
  },
  {
    title: "Fourways Gardens",
    sector: "Private",
    category: "Residential Renovation",
    size: "Private Residence",
    duration: "Project based",
    status: "Complete",
    description: "A neglected private residence reimagined through a hyper realistic 3D model, giving the homeowner, architect and contractor a single shared vision before a single brick was moved.",
  },
];

type BlogPostPreview = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  seo_description: string;
  published_at: string;
  content: string;
};

const CaseStudies = () => {
  const { setOpen } = useDemoDialogStore();

  const { data: articlesData, isLoading: articlesLoading } = useQuery({
    queryKey: ["articles", { page: 1, limit: 3 }],
    queryFn: () => articlesApi.list({ page: 1, limit: 3 }),
    staleTime: 5 * 60 * 1000,
    select: (data) => data.articles.filter((a) => a.status === "published").slice(0, 3),
  });

  const latestPosts = articlesData ?? [];

  return (
    <>
      <Helmet>
        <title>Case Studies | Digital Twin & Visualisation Projects | Twinblueprint</title>
        <meta
          name="description"
          content="Real Digital Twin and immersive visualisation projects with measurable outcomes - faster planning approvals, aligned stakeholders and reduced delivery risk."
        />
        <link rel="canonical" href="/case-studies" />
        <meta property="og:title" content="Case Studies | Twinblueprint" />
        <meta property="og:url" content="/case-studies" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Digital Twin & Visualisation Case Studies",
          url: "/case-studies",
          isPartOf: { "@type": "WebSite", name: "Twinblueprint", url: "/" },
        })}</script>
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-hero pt-24 pb-8 md:pt-28 md:pb-10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" aria-hidden="true" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-hero-foreground mb-4">
                Case <span className="text-gradient">Studies</span>
              </h1>
              <p className="text-hero-muted text-lg md:text-xl leading-relaxed">
                Real projects, real results. See how our digital twins have transformed approval timelines and stakeholder communication across the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Use Cases / Specialties */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-6"
            >
              <h2 className="text-3xl md:text-4xl text-foreground">Our Areas of Speciality at a Glance</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialties.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all hover:shadow-glow"
                >
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-8 pt-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 -mt-6 mb-5 rounded-xl gradient-primary relative z-10 shadow-sm">
                      <s.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-8 md:py-10 bg-muted">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-6"
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Portfolio</p>
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">Some of our Success Stories</h2>
              <p className="text-muted-foreground text-lg">Highlights from our portfolio</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, i) => (
                <motion.article
                  key={story.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.06 }}
                  className="group relative rounded-2xl bg-card border border-border p-7 hover:border-primary/50 transition-all hover:shadow-glow flex flex-col"
                >
                  <Badge className="self-start mb-4 bg-primary/10 text-primary border-0">
                    {story.sector}
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground mb-2">{story.title}</h3>
                  <p className="text-sm text-primary mb-4">{story.category}</p>

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-5 pb-5 border-b border-border">
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider">Size</dt>
                      <dd className="text-foreground font-medium mt-1">{story.size}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground uppercase tracking-wider">Duration</dt>
                      <dd className="text-foreground font-medium mt-1">{story.duration}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-muted-foreground uppercase tracking-wider">Status</dt>
                      <dd className="text-foreground font-medium mt-1">{story.status}</dd>
                    </div>
                  </dl>

                  <p className="text-sm text-muted-foreground leading-relaxed">{story.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Tailored case studies by audience */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-6"
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">By Audience</p>
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">Case Studies Tailored to your Team</h2>
              <p className="text-muted-foreground text-lg">
                Measurable outcomes for residential developers, planning authorities and BIM & design teams.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {audienceStudies.map((cs, i) => (
                <motion.article
                  key={cs.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col hover:border-primary/50 transition-all hover:shadow-glow"
                >
                  <img
                    src={cs.image}
                    alt={cs.imageAlt}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-7 flex flex-col flex-1">
                    <Badge className="self-start mb-4 bg-primary/10 text-primary border-0">{cs.audience}</Badge>
                    <h3 className="text-xl font-bold text-foreground mb-3">{cs.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cs.outcome}</p>
                    <p className="text-primary text-2xl font-bold mb-6">{cs.metric}</p>
                    <Link
                      to={`/case-studies/${cs.id}`}
                      className="mt-auto text-sm font-semibold text-primary hover:underline inline-flex items-center"
                    >
                      Read the case study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Blog teaser */}
        <section className="py-8 md:py-10 bg-muted">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-6"
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Insights</p>
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">Read the Latest</h2>
              <p className="text-muted-foreground text-lg">
                Practical guidance on planning approval support, BIM visualisation and immersive property visualisation.
              </p>
            </motion.div>

            {articlesLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-border bg-card p-7 flex flex-col animate-pulse"
                  >
                    <div className="h-6 w-24 bg-muted rounded self-start mb-4" />
                    <div className="h-5 w-3/4 bg-muted rounded mb-3" />
                    <div className="h-4 w-full bg-muted rounded mb-2" />
                    <div className="h-4 w-1/2 bg-muted rounded mb-4" />
                    <div className="h-3 w-1/3 bg-muted rounded mt-auto" />
                  </motion.article>
                ))}
              </div>
            ) : latestPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No articles available yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {latestPosts.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-border bg-card p-7 flex flex-col hover:border-primary/50 transition-all"
                  >
                    <Badge className="self-start mb-4 bg-primary/10 text-primary border-0">{post.category}</Badge>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.seo_description || post.excerpt}</p>
                    <p className="text-xs text-muted-foreground mb-5">{formatArticleDate(post.published_at)} · {calculateReadTime(post.content)}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-auto text-sm font-semibold text-primary hover:underline inline-flex items-center"
                    >
                      Read article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <Link to="/blog" className="text-primary font-semibold hover:underline">
                View all articles →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-hero section-padding">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl text-hero-foreground mb-6">
                Ready to be a Case Study?
              </h2>
              <p className="text-hero-muted text-lg mb-8 leading-relaxed">
                Let's discuss how our architectural visualisation services can accelerate your next project.
              </p>
              <ExploreLinks className="mb-8" />
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground shadow-glow animate-pulse-glow rounded-full px-8 text-base"
                onClick={() => setOpen(true)}
              >
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
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
      <BookDemoDialog />
    </>
  );
};

export default CaseStudies;