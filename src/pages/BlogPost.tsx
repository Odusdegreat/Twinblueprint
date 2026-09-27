import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoDialog from "@/components/BookDemoDialog";
import { useDemoDialogStore } from "@/stores/demoDialogStore";

type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  related: { label: string; href: string }[];
};

const posts: Record<string, Post> = {
  "planning-approval-digital-twin": {
    slug: "planning-approval-digital-twin",
    title: "How Digital Twins Accelerate Planning Approval Support",
    metaTitle: "Digital Twin Planning Approval Support | Twinblueprint",
    metaDescription:
      "Discover how Digital Twin visualisation is helping property developers and planning teams secure faster planning approvals with less risk and rework.",
    category: "Planning Approval Support",
    author: "Twinblueprint Editorial",
    date: "June 18, 2026",
    readTime: "8 min read",
    intro:
      "Planning approval timelines are one of the largest controllable risks in any development programme. Digital Twin visualisation is rapidly becoming the most effective way for developers, architects and planning consultants to shorten that timeline without compromising scheme quality or compliance.",
    sections: [
      {
        heading: "Why planning approvals stall",
        body: [
          "Most planning delays trace back to a single root cause: stakeholders cannot accurately interpret what is being proposed. Drawings, elevations and verified view photomontages give technical reviewers a fragmented picture of a scheme and almost no usable insight to councillors, residents or non specialist consultees.",
          "The result is predictable: additional information requests, deferred committee dates, revised submissions and lost months on the delivery programme.",
        ],
      },
      {
        heading: "What a Digital Twin changes",
        body: [
          "A planning-grade Digital Twin is a coordinate accurate, photorealistic 3D model of the proposed development in full urban, landscape and infrastructure context. Reviewers can navigate viewpoints, toggle daylight and seasonal conditions, and compare existing and proposed conditions in seconds.",
          "Because every stakeholder is reviewing the same authoritative model, conversations move from interpretation to decision. Officers can confirm compliance against policy. Councillors can read scale and townscape impact. Communities can understand what is actually changing on their street.",
        ],
      },
      {
        heading: "Measurable outcomes on live schemes",
        body: [
          "Our recent residential project secured planning approval on first resubmission after two previous rejections, recovering six months of programme and £120k in holding costs. A bridge replacement aligned twelve stakeholder groups in a single review the fastest consensus the authority had recorded.",
          "These outcomes are not exceptional. Once visualisation removes interpretation risk, approval timelines compress consistently.",
        ],
      },
      {
        heading: "Where to start",
        body: [
          "If you have a scheme entering pre application, preparing for committee or facing a refusal appeal, a Digital Twin is the highest leverage intervention you can make in the next 30 days.",
        ],
      },
    ],
    related: [
      { label: "Read the Riverside Apartments case study", href: "/case-studies/1" },
      { label: "Our Planning Approval Support services", href: "/services" },
      { label: "How our 4-step process works", href: "/how-it-works" },
    ],
  },
  "bim-visualisation-construction": {
    slug: "bim-visualisation-construction",
    title: "BIM Visualisation: Turning Coordination Data into Decisions",
    metaTitle: "BIM Visualisation for Construction & Architecture | Twinblueprint",
    metaDescription:
      "Learn how BIM visualisation transforms federated models into Digital Twins that drive faster decisions, fewer clashes and stronger client alignment.",
    category: "BIM Visualisation",
    author: "Twinblueprint Editorial",
    date: "June 12, 2026",
    readTime: "7 min read",
    intro:
      "BIM has solved coordination at the data layer. What it has rarely solved is communication. BIM visualisation closes that gap turning a federated model into a Digital Twin that every stakeholder, technical or otherwise, can actually use.",
    sections: [
      {
        heading: "The BIM communication gap",
        body: [
          "A modern construction project may carry hundreds of millions of pounds of design intent inside Revit, IFC and Navisworks files. Yet the people who fund, approve and occupy the building rarely open those tools and never should have to.",
          "BIM visualisation bridges this gap by translating the federated model into a photorealistic, navigable Digital Twin without losing the underlying data integrity.",
        ],
      },
      {
        heading: "What good BIM visualisation looks like",
        body: [
          "A planning- and construction grade BIM Digital Twin is geometry accurate, materially correct and metadata aware. Users can navigate the scheme from masterplan down to a single room, inspect coordination zones, and view construction sequences as they will be delivered on site.",
          "When linked to programme data, the same model becomes a 4D Digital Twin used in stakeholder reviews, site logistics planning and pre handover walkthroughs.",
        ],
      },
      {
        heading: "Business outcomes",
        body: [
          "Clients who adopt BIM visualisation typically report fewer late stage design changes, reduced clash driven rework on site, faster client and end user sign off, and stronger pitch and competition win rates.",
          "For architects in particular, BIM visualisation is now table stakes in competitive submissions it is the difference between presenting a proposal and presenting a building.",
        ],
      },
      {
        heading: "Integrating with your existing BIM workflow",
        body: [
          "We work directly from Revit, IFC, Rhino and SketchUp source files, preserving the coordination work your team has already done. The Digital Twin becomes an additional deliverable from your BIM pipeline not a parallel one.",
        ],
      },
    ],
    related: [
      { label: "Our Architectural Visualisation services", href: "/services" },
      { label: "View all case studies", href: "/case-studies" },
      { label: "Interactive immersive property visualisation", href: "/blog/interactive-immersive-property-visualisation" },
    ],
  },
  "interactive-immersive-property-visualisation": {
    slug: "interactive-immersive-property-visualisation",
    title: "Interactive Immersive Property Visualisation: a Buyer & Investor Edge",
    metaTitle: "Interactive Immersive Property Visualisation | Twinblueprint",
    metaDescription:
      "Interactive immersive property visualisation helps developers sell off plan faster, secure investment and engage buyers explore how it works and what to expect.",
    category: "Immersive Property Visualisation",
    author: "Twinblueprint Editorial",
    date: "June 5, 2026",
    readTime: "6 min read",
    intro:
      "Selling property off plan has always required asking buyers and investors to take a leap of faith. Interactive immersive property visualisation removes that leap letting people walk the scheme, inspect their unit and experience the lifestyle long before the first brick is laid.",
    sections: [
      {
        heading: "From static marketing to immersive experience",
        body: [
          "Traditional marketing assets CGIs, flythrough videos and physical models are linear. The viewer sees what the developer chose to show. Interactive immersive visualisation flips that: the viewer chooses the unit, the floor, the view and the moment of day.",
          "That control is what converts interest into commitment. Buyers stop imagining and start deciding.",
        ],
      },
      {
        heading: "What immersive property visualisation includes",
        body: [
          "A typical deployment combines a browser based interactive walkthrough, unit level configurators, VR experiences for sales suites and shareable links for international buyers. The same Digital Twin underpins planning submissions, investor decks and operational handover.",
        ],
      },
      {
        heading: "The measurable commercial impact",
        body: [
          "Developers using immersive visualisation consistently report higher reservation rates on launch, faster international sales (without the cost of physical viewings), stronger valuations from lenders who can clearly see the asset, and reduced post handover defects and complaints because buyers knew exactly what they were getting.",
        ],
      },
      {
        heading: "When to introduce it",
        body: [
          "The earlier the better. Most clients introduce immersive visualisation at the same time as their planning Digital Twin getting marketing, sales and approvals leverage from a single asset.",
        ],
      },
    ],
    related: [
      { label: "Industries we support", href: "/#industries" },
      { label: "Our services", href: "/services" },
      { label: "BIM visualisation for construction", href: "/blog/bim-visualisation-construction" },
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const { setOpen } = useDemoDialogStore();
  const post = slug ? posts[slug] : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`/blog/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={`/blog/${post.slug}`} />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.metaDescription,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: "Twinblueprint" },
          datePublished: post.date,
          mainEntityOfPage: { "@type": "WebPage", "@id": `/blog/${post.slug}` },
          articleSection: post.category,
          inLanguage: "en",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
            { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
          ],
        })}</script>
      </Helmet>
      <Navbar />
      <main>
        <section className="bg-hero pt-32 pb-12">
          <div className="container">
            <Link to="/blog">
              <Button variant="ghost" className="mb-6 text-hero-muted hover:text-hero-foreground pl-0">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-0">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-hero-foreground mb-6 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-hero-muted">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.date}</span>
                <span className="flex items-center gap-2"><User className="h-4 w-4" /> {post.author} · {post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <article className="max-w-3xl mx-auto">
              <p className="text-lg text-foreground leading-relaxed mb-6">{post.intro}</p>

              <div className="mb-10 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg text-sm text-foreground">
                Skip ahead: explore our{" "}
                <Link to="/services" className="text-primary hover:underline font-medium">Digital Twin services</Link>,
                review{" "}
                <Link to="/case-studies" className="text-primary hover:underline font-medium">delivered case studies</Link>, or{" "}
                <button onClick={() => setOpen(true)} className="text-primary hover:underline font-medium underline-offset-2">
                  book a discovery consultation
                </button>.
              </div>
              {post.sections.map((s) => (
                <div key={s.heading} className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{s.heading}</h2>
                  {s.body.map((p, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                  ))}
                </div>
              ))}

              <div className="mt-12 p-6 bg-muted rounded-2xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">Continue reading</h3>
                <ul className="space-y-2">
                  {post.related.map((r) => (
                    <li key={r.href}>
                      <Link to={r.href} className="text-primary hover:underline">{r.label} →</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 text-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base"
                  onClick={() => setOpen(true)}
                >
                  Book a Discovery Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground mt-3">30-minute call · NDA on request · No sales pressure</p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <BookDemoDialog />
    </>
  );
};

export default BlogPost;
export { posts as blogPosts };
