import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageNav from "@/components/PageNav";
import BookDemoDialog from "@/components/BookDemoDialog";
import { blogPosts as posts } from "./BlogPost";
import { FaBuilding, FaChartLine, FaVrCardboard } from "react-icons/fa";
import blogPlanningImg from "@/assets/blog-planning-approval.jpg";
import blogBimImg from "@/assets/blog-bim-visualisation.jpg";
import blogImmersiveImg from "@/assets/blog-immersive-property.jpg";

const featured = [
  {
    slug: "planning-approval-digital-twin",
    icon: FaChartLine,
    gradient: "from-blue-600 to-cyan-500",
    image: blogPlanningImg,
    alt: "Planning officers reviewing a Digital Twin model of a city district to support planning approval",
  },
  {
    slug: "bim-visualisation-construction",
    icon: FaBuilding,
    gradient: "from-green-600 to-emerald-500",
    image: blogBimImg,
    alt: "Engineer reviewing BIM visualisation of a bridge infrastructure project on site",
  },
  {
    slug: "interactive-immersive-property-visualisation",
    icon: FaVrCardboard,
    gradient: "from-purple-600 to-pink-500",
    image: blogImmersiveImg,
    alt: "Interactive immersive property visualisation of a residential development on a large screen",
  },
];


const Blog = () => {
  const { setOpen } = useDemoDialogStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail) {
      setSubscribed(true);
      toast({ title: "Subscribed", description: "You will receive our latest Digital Twin insights." });
      setSubscribeEmail("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Digital Twin & Visualisation Insights | Twinblueprint Blog</title>
        <meta
          name="description"
          content="Expert insights on Digital Twin visualisation, BIM, planning approval support and immersive property visualisation for construction, property and planning teams."
        />
        <link rel="canonical" href="/blog" />
        <meta property="og:title" content="Digital Twin & Visualisation Insights | Twinblueprint Blog" />
        <meta property="og:url" content="/blog" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
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
                Digital Twin <span className="text-gradient">Insights</span>
              </h1>
              <p className="text-hero-muted text-lg md:text-xl leading-relaxed">
                Practical perspectives on Digital Twin technology, BIM visualisation, planning approval support and immersive property visualisation for the built environment.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-5 md:py-6 bg-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 justify-center mb-4"
            >
              <Badge variant="default" className="px-4 py-2 text-sm">Featured Articles</Badge>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-md md:max-w-none mx-auto">
              {featured.map((f, index) => {
                const post = posts[f.slug];
                const Icon = f.icon;
                return (
                  <motion.article
                    key={f.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer flex flex-col"
                    onClick={() => navigate(`/blog/${f.slug}`)}
                  >
                    <div className={`relative aspect-[16/9] sm:aspect-[3/2] md:aspect-auto md:h-36 bg-gradient-to-br ${f.gradient} overflow-hidden`}>
                      <img
                        src={f.image}
                        alt={f.alt}
                        width={1280}
                        height={720}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                      <Icon className="absolute bottom-3 left-3 w-7 h-7 text-primary-foreground/90 drop-shadow" />
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <Badge className="self-start mb-2 bg-primary/10 text-primary border-0">{post.category}</Badge>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-snug text-balance group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-[0.9375rem] sm:text-sm mb-3 leading-relaxed flex-1 line-clamp-3">
                        {post.intro.slice(0, 140)}…
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
                        <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 shrink-0" /> {post.date}</span>
                        <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4 shrink-0" /> {post.author} · {post.readTime}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 h-11 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                          asChild
                        >
                          <Link to={`/blog/${f.slug}`}>Read article</Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 h-11 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                          onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                        >
                          Book a Demo
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
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
                Stay Ahead On Digital Twin And Visualisation
              </h2>
              <p className="text-hero-muted text-lg mb-8 leading-relaxed">
                Monthly insights on planning approval support, BIM visualisation and immersive property visualisation straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubscribe}>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-green-400 justify-center">
                    <Check className="h-5 w-5" />
                    <span>Thanks for subscribing.</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="Work email"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 rounded-full bg-background/10 border border-hero-muted/20 text-hero-foreground placeholder:text-hero-muted/60 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base">
                      Subscribe
                    </Button>
                  </>
                )}
              </form>
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

export default Blog;
