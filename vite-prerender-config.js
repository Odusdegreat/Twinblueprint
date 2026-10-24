// Minimal prerendering config for Vite + React Router
// Prerenders critical pages while preserving the existing architecture

const prerenderRoutes = [
  // Homepage - highest priority
  {
    path: "/",
    title: "Technology Solutions & Digital Transformation | Twinblueprint",
    description:
      "Twinblueprint provides technology consulting, digital transformation, software development, AI solutions and business automation services for organizations worldwide.",
  },
  // Blog index - important for content discovery
  {
    path: "/blog",
    title: "Twinblueprint Blog",
    description:
      "Latest insights on technology consulting, digital transformation, AI solutions and business automation for organizations worldwide.",
  },
  // Individual blog article (example)
  {
    path: "/blog/cost-of-architectural-visualisation-in-the-uk-2026-pricing-guide-1500",
    title:
      "Cost of Architectural Visualisation in the UK 2026 Pricing Guide",
    description:
      "Understanding the costs of architectural visualisation services in the UK, including pricing models, factors affecting cost, and value for money for architectural projects.",
  },
];

module.exports = prerenderRoutes;