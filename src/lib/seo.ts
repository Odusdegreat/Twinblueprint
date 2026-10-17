import { BASE_URL, BUSINESS_TELEPHONE } from "./constants";

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Twinblueprint",
  url: `${BASE_URL}/`,
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
    telephone: BUSINESS_TELEPHONE,
    email: "info@twinblueprint.com",
    contactType: "For more information",
    availableLanguage: "English",
    areaServed: "World",
  },
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Twinblueprint",
  url: `${BASE_URL}/`,
  publisher: { "@id": `${BASE_URL}/#organization` },
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
  updatedAt?: string;
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
      "@id": `${BASE_URL}/#organization`,
    },
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
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
    author: { "@id": `${BASE_URL}/#organization` },
    publisher: { "@id": `${BASE_URL}/#organization` },
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
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };
}

export function getWebPageSchema(name: string, url: string, description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url,
    description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
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
    isPartOf: { "@id": `${BASE_URL}/#website` },
    mainEntity: { "@id": `${BASE_URL}/#organization` },
  };
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function getVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  embedUrl?: string;
  uploadDate?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    contentUrl: video.contentUrl,
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
    ...(video.uploadDate ? { uploadDate: video.uploadDate } : {}),
    ...(video.duration ? { duration: video.duration } : {}),
  };
}
