import fs from "fs";
import path from "path";
import axios from "axios";

const API_BASE = process.env.VITE_API_BASE_URL || process.env.VITE_API_URL || "https://twinblueprint-server.onrender.com/api";
const BASE_URL = "https://www.twinblueprint.com";
const OUTPUT_PATH = path.resolve("public/sitemap.xml");

interface Article {
  slug: string;
  updated_at?: string | null;
}

interface SitemapResponse {
  success: boolean;
  data?: { articles?: Article[] };
  message?: string;
}

interface PublishedArticlePage {
  articles: Array<{ slug: string; published_at: string }>;
  totalPages?: number;
}

const STATIC_URLS = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/services", changefreq: "monthly", priority: 0.9 },
  { url: "/case-studies", changefreq: "monthly", priority: 0.9 },
  { url: "/how-it-works", changefreq: "monthly", priority: 0.8 },
  { url: "/about", changefreq: "monthly", priority: 0.7 },
  { url: "/blog", changefreq: "weekly", priority: 0.8 },
  { url: "/faq", changefreq: "monthly", priority: 0.6 },
  { url: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { url: "/terms", changefreq: "yearly", priority: 0.3 },
];

async function fetchArticles(): Promise<Article[] | null> {
  try {
    const response = await axios.get<SitemapResponse>(`${API_BASE}/articles/sitemap`, { timeout: 30000 });
    if (!response.data.success || !Array.isArray(response.data.data?.articles)) {
      throw new Error(response.data.message || "Invalid article sitemap response");
    }
    const articles = new Map<string, Article>();
    for (const article of response.data.data.articles) {
      if (typeof article.slug === "string" && article.slug) articles.set(article.slug, article);
    }

    const publicationDates = new Map<string, number>();
    const pageSize = 10;
    let page = 1;
    let totalPages = 1;
    do {
      const listResponse = await axios.get<{ success: boolean; data?: PublishedArticlePage; message?: string }>(`${API_BASE}/articles`, {
        params: { page, limit: pageSize },
        timeout: 30000,
      });
      if (!listResponse.data.success || !Array.isArray(listResponse.data.data?.articles)) {
        throw new Error(listResponse.data.message || `Invalid articles response on page ${page}`);
      }
      for (const article of listResponse.data.data.articles) {
        if (articles.has(article.slug)) publicationDates.set(article.slug, Date.parse(article.published_at));
      }
      totalPages = Number.isInteger(listResponse.data.data.totalPages)
        ? Math.max(page, listResponse.data.data.totalPages!)
        : listResponse.data.data.articles.length === pageSize ? page + 1 : page;
      page += 1;
    } while (page <= totalPages);

    return [...articles.values()].filter((article) => {
      const publishedAt = publicationDates.get(article.slug);
      return Number.isFinite(publishedAt) && publishedAt! <= Date.now();
    });
  } catch (error) {
    console.warn("Sitemap refresh skipped; keeping the existing sitemap:", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

function generateSitemap(articles: Article[]): string {
  const articleUrls = articles.map((article) => {
    const updatedAt = article.updated_at ? Date.parse(article.updated_at) : NaN;
    const lastmod = Number.isFinite(updatedAt) && updatedAt <= Date.now()
      ? new Date(updatedAt).toISOString().slice(0, 10)
      : undefined;

    return {
      url: `/blog/${article.slug}`,
      lastmod,
      changefreq: "monthly" as const,
      priority: 0.7,
    };
  });

  const allUrls = [...new Map([...STATIC_URLS, ...articleUrls].map((entry) => [entry.url, entry])).values()];

  const urlEntries = allUrls
    .map(({ url, lastmod, changefreq, priority }) => {
      const loc = `${BASE_URL}${url}`;
      let entry = `  <url>\n    <loc>${loc}</loc>`;
      if (lastmod) entry += `\n    <lastmod>${lastmod}</lastmod>`;
      entry += `\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`;
      return entry;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

async function main() {
  console.log("Generating sitemap...");
  console.log(`API Base: ${API_BASE}`);
  console.log(`Site URL: ${BASE_URL}`);

  const articles = await fetchArticles();
  if (articles === null) return;
  console.log(`Found ${articles.length} published articles`);

  const sitemap = generateSitemap(articles);
  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`Sitemap written to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Sitemap generation failed:", err);
  process.exit(1);
});
