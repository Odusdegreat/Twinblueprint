import { api } from "./api";
import type { Article, ArticlesResponse, SingleArticleResponse, CategoriesResponse } from "./types";

function normalizeArticle(article: Article): Article {
  return {
    ...article,
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

  getFeatured: (limit = 3) =>
    api.get<ArticlesResponse>("/articles", { page: 1, limit, category: undefined, search: undefined }),
};

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
