import fs from "fs";
import path from "path";
import axios from "axios";

const API_BASE = process.env.VITE_API_BASE_URL || process.env.VITE_API_URL || "https://twinblueprint-server.onrender.com/api";
const BASE_URL = "https://www.twinblueprint.com";
const OUTPUT_PATH = path.resolve("public/sitemap.xml");

interface Article {
  slug: string;
  updated_at: string;
  status: string;
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

async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await axios.get(`${API_BASE}/articles`, {
      params: { page: 1, limit: 1000 },
      timeout: 10000,
    });

    if (response.data.success && response.data.data?.articles) {
      return response.data.data.articles
        .filter((a: Article) => a.status === "published" && typeof a.slug === "string" && !!a.slug)
        .map((a: Article) => ({
          slug: a.slug,
          updated_at: a.updated_at,
        }));
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch articles for sitemap:", error instanceof Error ? error.message : "Unknown error");
    return [];
  }
}

function generateSitemap(articles: Article[]): string {
  const articleUrls = articles.map((article) => ({
    url: `/blog/${article.slug}`,
    lastmod: article.updated_at.split("T")[0],
    changefreq: "monthly" as const,
    priority: 0.7,
  }));

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
  console.log(`Found ${articles.length} published articles`);

  const sitemap = generateSitemap(articles);
  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`Sitemap written to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Sitemap generation failed:", err);
  process.exit(1);
});
