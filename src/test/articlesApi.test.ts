import { describe, expect, it } from "vitest";
import type { Article } from "@/lib/types";
import { getArticleModifiedDate, getFeaturedArticles, getPublicArticles } from "@/lib/articlesApi";

function makeArticle(overrides: Partial<Article> = {}): Article {
  return {
    id: "article-id",
    title: "Article title",
    slug: "article-slug",
    excerpt: null,
    content: "<p>Article content</p>",
    featured_image: null,
    canonical_url: null,
    tags: [],
    author: "Auto-SEO",
    published_at: "2026-10-10T00:00:00.000Z",
    meta_title: null,
    meta_description: null,
    ...overrides,
  };
}

describe("public article selection", () => {
  it("sorts articles newest-first and excludes drafts and future publications", () => {
    const articles = [
      makeArticle({ slug: "older", published_at: "2026-10-01T00:00:00.000Z", status: "published" }),
      makeArticle({ slug: "future", published_at: "2026-10-16T00:00:00.000Z" }),
      makeArticle({ slug: "draft", status: "draft" }),
      makeArticle({ slug: "latest", published_at: "2026-10-12T00:00:00.000Z", status: undefined }),
    ];

    expect(getPublicArticles(articles, Date.parse("2026-10-13T00:00:00.000Z")).map((item) => item.slug))
      .toEqual(["latest", "older"]);
  });

  it("uses explicitly featured articles when the API supplies the flag", () => {
    const articles = [
      makeArticle({ slug: "latest", published_at: "2026-10-12T00:00:00.000Z" }),
      makeArticle({ slug: "featured", featured: true, published_at: "2026-10-11T00:00:00.000Z" }),
    ];

    expect(getFeaturedArticles(articles, 3, Date.parse("2026-10-13T00:00:00.000Z")).map((item) => item.slug))
      .toEqual(["featured"]);
  });

  it("falls back to the three latest published articles when no feature flag exists", () => {
    const articles = [1, 2, 3, 4].map((day) => makeArticle({
      slug: `article-${day}`,
      published_at: `2026-10-${String(day).padStart(2, "0")}T00:00:00.000Z`,
    }));

    expect(getFeaturedArticles(articles, 3, Date.parse("2026-10-13T00:00:00.000Z")).map((item) => item.slug))
      .toEqual(["article-4", "article-3", "article-2"]);
  });

  it("omits modification dates that are absent or earlier than publication", () => {
    expect(getArticleModifiedDate("2026-10-09T00:00:00.000Z", "2026-10-01T22:45:24.345Z")).toBeUndefined();
    expect(getArticleModifiedDate("2026-10-09T00:00:00.000Z", "2026-10-10T00:00:00.000Z"))
      .toBe("2026-10-10T00:00:00.000Z");
  });
});