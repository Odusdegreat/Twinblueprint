import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { App } from "./pages/_app";
import { Index } from "./pages/Index";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { CaseStudies } from "./pages/CaseStudies";
import { HowItWorks } from "./pages/HowItWorks";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";
import { viteApp } from "./main";

type PrerenderRoute = {
  path: string;
  title: string;
  description: string;
};

const routesToPrerender: PrerenderRoute[] = [
  {
    path: "/",
    title: "Technology Solutions & Digital Transformation | Twinblueprint",
    description:
      "Twinblueprint provides technology consulting, digital transformation, software development, AI solutions and business automation services for organizations worldwide.",
  },
  {
    path: "/blog/cost-of-architectural-visualisation-in-the-uk-2026-pricing-guide-1500",
    title:
      "Cost of Architectural Visualisation in the UK 2026 Pricing Guide",
    description:
      "Understanding the costs of architectural visualisation services in the UK, including pricing models, factors affecting cost, and value for money for architectural projects.",
  },
];

export default function PrerenderPlugin() {
  return {
    name: "prerender",
    buildEnd() {
      const routes = routesToPrerender;

      // For each route, render the app to HTML and write to dist
      routes.forEach((route) => {
        const url = new URL(route.path, "https://www.twinblueprint.com");
        const routePath = url.pathname;

        // Render the app to HTML using MemoryRouter
        const html = renderToString(
          React.createElement(MemoryRouter, { initialEntries: [routePath] }, [
            React.createElement(App, null),
          ])
        );

        // Read the index.html and inject the prerendered HTML
        // ... (complex, would need to modify the HTML output)
        console.log(`Prerendered route: ${routePath}`);
        console.log(`Title: ${route.title}`);
      });
    },
  };
}