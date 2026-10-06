// SEO URLs must always use the production domain, even on previews or localhost.
export const BASE_URL = "https://www.twinblueprint.com";

export const CRM_PATHS = [
  "/crm",
  "/dashboard",
  "/admin",
  "/login",
  "/crm/",
  "/dashboard/",
  "/admin/",
  "/login/",
];

export const PUBLIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/services", changefreq: "monthly", priority: 0.9 },
  { path: "/case-studies", changefreq: "monthly", priority: 0.9 },
  { path: "/case-studies/1", changefreq: "yearly", priority: 0.7 },
  { path: "/case-studies/2", changefreq: "yearly", priority: 0.7 },
  { path: "/case-studies/3", changefreq: "yearly", priority: 0.7 },
  { path: "/case-studies/4", changefreq: "yearly", priority: 0.7 },
  { path: "/case-studies/5", changefreq: "yearly", priority: 0.7 },
  { path: "/how-it-works", changefreq: "monthly", priority: 0.8 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
  { path: "/blog", changefreq: "weekly", priority: 0.8 },
  { path: "/faq", changefreq: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { path: "/terms", changefreq: "yearly", priority: 0.3 },
];
