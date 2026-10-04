import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, User, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import BookDemoDialog from "@/components/BookDemoDialog";
import { useDemoDialogStore } from "@/stores/demoDialogStore";
import { useQuery } from "@tanstack/react-query";
import { articlesApi, formatArticleDate, calculateReadTime } from "@/lib/articlesApi";
import { parseISO } from "date-fns";
import { BASE_URL } from "@/lib/constants";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";

const BlogPost = () => {
  const { slug } = useParams();
  const { setOpen } = useDemoDialogStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => articlesApi.getBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  const article = data?.article;

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading article | Twinblueprint Blog</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </main>
        <BookDemoDialog />
      </>
    );
  }

  if (isError || !article) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | Twinblueprint Blog</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center px-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error instanceof Error ? error.message : "The article you're looking for doesn't exist or has been removed."}
            </p>
            <Link to="/blog">
              <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Button>
            </Link>
          </div>
        </main>
        <BookDemoDialog />
      </>
    );
  }

  const formattedDate = formatArticleDate(article.published_at);
  const readTime = calculateReadTime(article.content);
  const articleUrl = `${BASE_URL}/blog/${article.slug}`;
  const imageUrl = article.featured_image || `${BASE_URL}/og-image.jpg`;
  const seoTitle = article.meta_title || `${article.title} | Twinblueprint`;
  const seoDescription = article.meta_description || article.excerpt || article.title;

  const breadcrumbItems = [
    { name: "Home", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: article.title, url: articleUrl },
  ];

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.published_at} />
        <meta property="article:modified_time" content={article.updated_at} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
        {article.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(getArticleSchema({
          title: seoTitle,
          description: seoDescription,
          image: imageUrl,
          author: article.author,
          publishedAt: article.published_at,
          updatedAt: article.updated_at,
          url: articleUrl,
          category: article.category,
          tags: article.tags,
        }))}</script>
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbItems))}</script>
      </Helmet>
      <Navbar />
      <main>
        {article.featured_image && (
          <section className="relative h-[60vh] min-h-[500px] max-h-[700px] w-full overflow-hidden pb-20 md:pb-28">
            <img
              src={article.featured_image}
              alt={article.title}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="container max-w-3xl">
                <div className="pt-8">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{article.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {formattedDate}</span>
                    <span className="flex items-center gap-2"><User className="h-4 w-4" /> {article.author} · {readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!article.featured_image && (
          <section className="bg-hero pt-32 pb-20 md:pb-28">
            <div className="container">
              <div className="pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-3xl md:text-5xl font-bold text-hero-foreground mb-6 leading-tight">{article.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-hero-muted">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {formattedDate}</span>
                    <span className="flex items-center gap-2"><User className="h-4 w-4" /> {article.author} · {readTime}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link to="/blog">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground pl-0">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                  </Button>
                </Link>
                <Badge className="bg-primary/10 text-primary border-0">{article.category}</Badge>
              </div>
            </div>
            <article className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

              <div className="mt-12 p-6 bg-muted rounded-2xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">Continue reading</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/services" className="text-primary hover:underline">Explore our Digital Twin services →</Link>
                  </li>
                  <li>
                    <Link to="/case-studies" className="text-primary hover:underline">Review delivered case studies →</Link>
                  </li>
                  <li>
                    <button onClick={() => setOpen(true)} className="text-primary hover:underline font-medium underline-offset-2 flex items-center gap-1">
                      <ArrowRight className="h-4 w-4" /> Book a discovery consultation
                    </button>
                  </li>
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
      <BookDemoDialog />
    </>
  );
};

export default BlogPost;
