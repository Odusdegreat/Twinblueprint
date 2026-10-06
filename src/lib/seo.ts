import { BASE_URL } from "./constants";

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Twinblueprint",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Global technology consultancy and business solutions company helping organizations modernize operations through digital transformation, software development, AI solutions and business automation.",
  areaServed: "Worldwide",
  sameAs: [
    "https://www.linkedin.com/company/twinblueprint",
    "https://twitter.com/twinblueprint",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    // Add verified contact details when available; avoid publishing placeholders.
    contactType: "customer service",
    availableLanguage: "English",
    areaServed: "World",
  },
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Twinblueprint",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  publisher: ORGANIZATION_SCHEMA,
};

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  url: string;
  category: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Twinblueprint",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    articleSection: article.category,
    keywords: article.tags.join(", "),
    inLanguage: "en",
  };
}

export function getCaseStudySchema(study: {
  title: string;
  description: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    image: study.image,
    author: { "@type": "Organization", name: "Twinblueprint" },
    publisher: { "@type": "Organization", name: "Twinblueprint" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": study.url,
    },
  };
}

export function getCollectionPageSchema(name: string, url: string, description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    description,
    isPartOf: { "@type": "WebSite", name: "Twinblueprint", url: BASE_URL },
  };
}

export function getWebPageSchema(name: string, url: string, description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url,
    description,
    isPartOf: { "@type": "WebSite", name: "Twinblueprint", url: BASE_URL },
  };
}

export function getPublicPageSchemas(items: Array<{ name: string; url: string }>, name: string, url: string, description?: string) {
  return [getWebPageSchema(name, url, description), getBreadcrumbSchema(items)];
}

export function getAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Twinblueprint",
    url: `${BASE_URL}/about`,
    isPartOf: { "@type": "WebSite", name: "Twinblueprint", url: BASE_URL },
    mainEntity: ORGANIZATION_SCHEMA,
  };
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
