import { api } from "./api";
import type { Article, ArticlesResponse, SingleArticleResponse, CategoriesResponse } from "./types";

export const articlesApi = {
  list: (params?: { page?: number; limit?: number; category?: string; search?: string }) =>
    api.get<ArticlesResponse>("/articles", params),

  getBySlug: (slug: string) =>
    api.get<SingleArticleResponse>(`/articles/${slug}`),

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