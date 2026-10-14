import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Check, Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import PageNav from "@/components/PageNav";
import BookDemoDialog from "@/components/BookDemoDialog";
import { useQuery } from "@tanstack/react-query";
import { articlesApi, formatArticleDate, calculateReadTime, getArticleExcerpt, getFeaturedArticles, getPublicArticles } from "@/lib/articlesApi";
import { FaBuilding, FaChartLine, FaVrCardboard, FaFileAlt } from "react-icons/fa";
import { BASE_URL } from "@/lib/constants";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, getCollectionPageSchema } from "@/lib/seo";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ICON_MAP: Record<string, typeof FaChartLine> = {
  "planning": FaChartLine,
  "approval": FaChartLine,
  "digital twin": FaChartLine,
  "bim": FaBuilding,
  "visualisation": FaBuilding,
  "construction": FaBuilding,
  "immersive": FaVrCardboard,
  "property": FaVrCardboard,
  "interactive": FaVrCardboard,
};

const GRADIENT_MAP: Record<string, string> = {
  "planning": "from-blue-600 to-cyan-500",
  "approval": "from-blue-600 to-cyan-500",
  "digital twin": "from-blue-600 to-cyan-500",
  "bim": "from-green-600 to-emerald-500",
  "visualisation": "from-green-600 to-emerald-500",
  "construction": "from-green-600 to-emerald-500",
  "immersive": "from-purple-600 to-pink-500",
  "property": "from-purple-600 to-pink-500",
  "interactive": "from-purple-600 to-pink-00",
};

function getIconForCategory(category?: string | null) {
  if (!category) return FaFileAlt;
  const lower = category.toLowerCase();
  for (const [key, icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(key)) return icon;
  }
  return FaFileAlt;
}

function getGradientForCategory(category?: string | null) {
  if (!category) return "from-gray-600 to-gray-500";
  const lower = category.toLowerCase();
  for (const [key, gradient] of Object.entries(GRADIENT_MAP)) {
    if (lower.includes(key)) return gradient;
  }
  return "from-gray-600 to-gray-500";
}

const Blog = () => {
  const { setOpen } = useDemoDialogStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const selectedCategory = category === "all" ? undefined : category;
  const pageSize = 10;

  const categoriesQuery = useQuery({
    queryKey: ["article-categories"],
    queryFn: () => articlesApi.getCategories(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["articles", { page, limit: pageSize, category: selectedCategory }],
    queryFn: () => articlesApi.list({ page, limit: pageSize, category: selectedCategory }),
    staleTime: 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  const featuredQuery = useQuery({
    queryKey: ["articles", "featured", 3, selectedCategory],
    queryFn: () => articlesApi.getFeatured(3, selectedCategory),
    staleTime: 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  const featuredArticles = getFeaturedArticles(featuredQuery.data?.articles ?? []);
  const publicArticles = getPublicArticles(data?.articles ?? []);
  const featuredSlugs = new Set(featuredArticles.map((article) => article.slug));
  const articlesToDisplay = publicArticles.filter((article) => page !== 1 || !featuredSlugs.has(article.slug));
  const totalPages = Math.max(1, data?.totalPages ?? 1);

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
      <Helmet defer={false}>
        <title>Technology & Business Insights | Twinblueprint Blog</title>
        <meta
          name="description"
          content="Explore insights on technology consulting, digital transformation, AI solutions, software development and business automation for organizations worldwide."
        />
        <link rel="canonical" href={`${BASE_URL}/blog`} />
        <meta property="og:title" content="Technology & Business Insights | Twinblueprint Blog" />
        <meta property="og:description" content="Practical guidance on technology consulting, digital transformation, AI solutions and business automation for leaders building resilient organizations." />
        <meta property="og:url" content={`${BASE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technology & Business Insights | Twinblueprint Blog" />
        <meta name="twitter:description" content="Practical guidance on technology consulting, digital transformation, AI solutions and business automation for leaders building resilient organizations." />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(getCollectionPageSchema("Technology & Business Insights", `${BASE_URL}/blog`, "Insights on technology consulting, digital transformation, AI solutions and business automation for organizations worldwide."))}</script>
      </Helmet>
      <Navbar />
      <main>
        <header className="bg-hero pt-20 pb-8 md:pt-24 md:pb-10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-hero-foreground mb-6">
                Technology and <span className="text-gradient">business insights</span>
              </h1>
              <p className="text-hero-muted text-lg md:text-xl leading-relaxed">
                Practical perspectives on digital transformation, technology strategy, AI solutions, software development and business automation for organizations building for the future.
              </p>
            </motion.div>
          </div>
        </header>

        <section className="py-5 md:py-6 bg-background">
          <div className="container">
            <div className="mb-5 flex justify-end">
              <Select value={category} onValueChange={(value) => { setCategory(value); setPage(1); }}>
                <SelectTrigger aria-label="Filter articles by category" className="w-full sm:w-64">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {(categoriesQuery.data?.categories ?? []).map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 justify-center mb-4"
            >
              <h2><Badge variant="default" className="px-4 py-2 text-sm">Featured Articles</Badge></h2>
            </motion.div>

            {featuredQuery.isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-md md:max-w-none mx-auto">
                {[1, 2, 3].map((i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col animate-pulse"
                  >
                    <div className="aspect-[16/9] sm:aspect-[4/3] md:aspect-auto md:h-56 md:min-h-[280px] bg-muted" />
                    <div className="p-4 sm:p-5 flex flex-col flex-1 space-y-3">
                      <div className="h-6 w-24 bg-muted rounded self-start" />
                      <div className="h-5 w-3/4 bg-muted rounded" />
                      <div className="h-5 w-full bg-muted rounded" />
                      <div className="h-4 w-1/2 bg-muted rounded mt-auto" />
                      <div className="h-4 w-1/3 bg-muted rounded" />
                      <div className="flex gap-2">
                        <div className="flex-1 h-10 bg-muted rounded" />
                        <div className="flex-1 h-10 bg-muted rounded" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : featuredQuery.isError ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Unable to load articles</h3>
                <p className="text-muted-foreground mb-4">{featuredQuery.error instanceof Error ? featuredQuery.error.message : "Please try again later."}</p>
                <Button variant="outline" onClick={() => void featuredQuery.refetch()}>
                  Retry
                </Button>
              </div>
            ) : featuredArticles.length === 0 ? (
              <div className="text-center py-12">
                <FaFileAlt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No articles yet</h3>
                <p className="text-muted-foreground">Check back soon for new insights.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-md md:max-w-none mx-auto">
                {featuredArticles.map((article, index) => {
                  const Icon = getIconForCategory(article.category);
                  const gradient = getGradientForCategory(article.category);
                  const readTime = calculateReadTime(article.content);
                  const excerpt = getArticleExcerpt(article.content);
                  const formattedDate = formatArticleDate(article.published_at);

                  return (
                    <motion.article
                      key={article.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer flex flex-col"
                      onClick={() => navigate(`/blog/${article.slug}`)}
                    >
                      <div className={`relative aspect-[16/9] sm:aspect-[4/3] md:aspect-auto md:h-56 md:min-h-[280px] bg-gradient-to-br ${gradient} overflow-hidden`}>
                        {article.featured_image && (
                          <img
                            src={article.featured_image}
                            alt={article.title}
                            width={1280}
                            height={720}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/5 to-transparent" />
                        <Icon className="absolute bottom-4 left-4 w-8 h-8 text-primary-foreground/95 drop-shadow-lg" />
                      </div>
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <Badge className="self-start mb-2 bg-primary/10 text-primary border-0">{article.category || "Insights"}</Badge>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-snug text-balance group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-[0.9375rem] sm:text-sm mb-3 leading-relaxed flex-1 line-clamp-3">
                          {excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
                          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 shrink-0" /> {formattedDate}</span>
                          <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4 shrink-0" /> {article.author} · {readTime}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 h-11 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                            asChild
                          >
                            <Link to={`/blog/${article.slug}`}>Read article</Link>
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
            )}
          </div>
        </section>

        {(isLoading || isError || articlesToDisplay.length > 0 || page > 1) && (
          <section className="bg-background py-10 md:py-14">
            <div className="container max-w-5xl">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">More articles</h2>
              </div>
              {isLoading ? (
                <div role="status" aria-label="Loading articles" className="divide-y divide-border border-y border-border">
                  {[1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse bg-muted/50" />)}
                </div>
              ) : isError ? (
                <div className="py-10 text-center">
                  <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">{error instanceof Error ? error.message : "Unable to load articles."}</p>
                  <Button variant="outline" onClick={() => void refetch()}>Retry</Button>
                </div>
              ) : articlesToDisplay.length === 0 ? (
                <p className="border-y border-border py-8 text-center text-muted-foreground">No more articles on this page.</p>
              ) : (
                <div className="divide-y divide-border border-y border-border">
                  {articlesToDisplay.map((article) => (
                    <article key={article.slug} className="flex gap-4 py-5 sm:gap-6">
                      {article.featured_image && (
                        <img
                          src={article.featured_image}
                          alt=""
                          width={112}
                          height={84}
                          loading="lazy"
                          className="h-20 w-28 shrink-0 rounded-md object-cover sm:h-24 sm:w-36"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span>{article.category || "Insights"}</span>
                          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatArticleDate(article.published_at)}</span>
                        </div>
                        <h3 className="text-lg font-semibold leading-snug text-foreground hover:text-primary">
                          <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {article.excerpt || getArticleExcerpt(article.content)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">{article.author} · {calculateReadTime(article.content)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <Pagination className="mt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <Button type="button" variant="outline" size="sm" disabled={isLoading || page <= 1} onClick={() => setPage((current) => current - 1)}>
                        <ChevronLeft className="mr-1 h-4 w-4" />Previous
                      </Button>
                    </PaginationItem>
                    <PaginationItem><span aria-live="polite" className="px-3 text-sm text-muted-foreground">Page {page} of {totalPages}</span></PaginationItem>
                    <PaginationItem>
                      <Button type="button" variant="outline" size="sm" disabled={isLoading || page >= totalPages} onClick={() => setPage((current) => current + 1)}>
                        Next<ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </section>
        )}

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
      <BookDemoDialog />
    </>
  );
};

export default Blog;
