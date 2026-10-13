import { api } from "./api";
import type { Article, ArticlesResponse, SingleArticleResponse, CategoriesResponse } from "./types";

function normalizeArticle(article: Article): Article {
  return {
    ...article,
    category: article.category ?? null,
    tags: Array.isArray(article.tags) ? article.tags : [],
  };
}

function normalizeArticlesResponse(response: ArticlesResponse): ArticlesResponse {
  return {
    ...response,
    articles: Array.isArray(response?.articles) ? response.articles.map(normalizeArticle) : [],
  };
}

export const articlesApi = {
  list: async (params?: { page?: number; limit?: number; category?: string; search?: string }) =>
    normalizeArticlesResponse(await api.get<ArticlesResponse>("/articles", params)),

  getBySlug: async (slug: string): Promise<SingleArticleResponse> => {
    const response = await api.get<SingleArticleResponse>(`/articles/${slug}`);
    return { ...response, article: normalizeArticle(response.article) };
  },

  getCategories: () =>
    api.get<CategoriesResponse>("/articles/categories"),

  getFeatured: async (limit = 3, category?: string) =>
    normalizeArticlesResponse(await api.get<ArticlesResponse>("/articles", { page: 1, limit, category, search: undefined })),
};

export function isPublicArticle(article: Pick<Article, "published_at" | "status">, now = Date.now()) {
  const publishedAt = Date.parse(article.published_at);
  return (!article.status || article.status === "published")
    && Number.isFinite(publishedAt)
    && publishedAt <= now;
}

export function getArticleModifiedDate(publishedAt: string, updatedAt?: string | null) {
  if (!updatedAt) return undefined;
  const publishedTime = Date.parse(publishedAt);
  const updatedTime = Date.parse(updatedAt);
  if (!Number.isFinite(publishedTime) || !Number.isFinite(updatedTime) || updatedTime < publishedTime) return undefined;
  return new Date(updatedTime).toISOString();
}

export function getPublicArticles(articles: Article[], now = Date.now()) {
  return articles
    .filter((article) => isPublicArticle(article, now))
    .sort((first, second) => Date.parse(second.published_at) - Date.parse(first.published_at));
}

export function getFeaturedArticles(articles: Article[], limit = 3, now = Date.now()) {
  const publicArticles = getPublicArticles(articles, now);
  const explicitlyFeatured = publicArticles.filter((article) => article.featured === true);
  return (explicitlyFeatured.length > 0 ? explicitlyFeatured : publicArticles).slice(0, limit);
}

export function formatArticleDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, "");
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getArticleExcerpt(content: string, maxLength = 140): string {
  const textContent = content.replace(/<[^>]*>/g, "");
  if (textContent.length <= maxLength) return textContent;
  return textContent.slice(0, maxLength).trim() + "…";
}
