import { supabase } from "@/integrations/supabase/client";

// Anonymous visitor tracking: no cookies, no stored IDs, no personal data.
const GA_MEASUREMENT_ID = "G-5WR1QWH3G7";
const CONSENT_KEY = "twinblueprint.analytics-consent";
const CONSENT_EVENT = "twinblueprint:manage-analytics-consent";
let visitStarted = false;
const isPrivateAnalyticsRoute = () => typeof window !== "undefined"
  && (/^\/(crm|admin|login|dashboard)(\/|$)/i.test(window.location.pathname)
    || window.location.hostname.startsWith("crm."));
const isProductionMarketingSite = () => import.meta.env.PROD
  && typeof window !== "undefined"
  && ["twinblueprint.com", "www.twinblueprint.com"].includes(window.location.hostname)
  && !isPrivateAnalyticsRoute();

export function canUseGoogleAnalytics() {
  return isProductionMarketingSite();
}

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: Gtag;
    "ga-disable-G-5WR1QWH3G7"?: boolean;
  }
}

let gaLoaded = false;
let gaConsentGranted = false;
let lastGaPageView: { path: string; timestamp: number } | null = null;

export function openAnalyticsConsent() {
  if (isProductionMarketingSite()) window.dispatchEvent(new Event(CONSENT_EVENT));
}

function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

function loadGoogleTag() {
  if (gaLoaded || !isProductionMarketingSite() || !hasAnalyticsConsent()) return;
  gaLoaded = true;
  gaConsentGranted = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.dataset.ga4 = GA_MEASUREMENT_ID;
  document.head.appendChild(script);
}

export function setAnalyticsConsent(granted: boolean, sendCurrentPageView = false) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    return;
  }

  if (granted) {
    const wasLoaded = gaLoaded;
    gaConsentGranted = true;
    window["ga-disable-G-5WR1QWH3G7"] = false;
    loadGoogleTag();
    if (wasLoaded) window.gtag?.("consent", "update", { analytics_storage: "granted" });
    if (sendCurrentPageView) track("page_view", { path: window.location.pathname });
    return;
  }

  gaConsentGranted = false;
  window["ga-disable-G-5WR1QWH3G7"] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
}

export function getAnalyticsConsent() {
  if (typeof window === "undefined") return null;
  try {
    const consent = window.localStorage.getItem(CONSENT_KEY);
    return consent === "granted" ? true : consent === "denied" ? false : null;
  } catch {
    return null;
  }
}

function trackGoogleEvent(event: string, properties: Record<string, unknown>) {
  if (!gaConsentGranted || !window.gtag || !isProductionMarketingSite()) return;
  const allowedEvents = new Set(["page_view", "form_start", "generate_lead", "contact_click", "cta_click"]);
  if (!allowedEvents.has(event)) return;

  const safeProperties: Record<string, string | number | boolean> = {};
  const pagePath = (typeof properties.path === "string" ? properties.path : window.location.pathname)
    .split(/[?#]/, 1)[0]
    .slice(0, 300);
  if (event === "page_view") {
    const now = Date.now();
    if (lastGaPageView?.path === pagePath && now - lastGaPageView.timestamp < 1000) return;
    lastGaPageView = { path: pagePath, timestamp: now };
  }
  safeProperties.page_path = pagePath;
  safeProperties.page_location = `${window.location.origin}${pagePath}`;
  try {
    safeProperties.page_referrer = document.referrer ? new URL(document.referrer).origin : "";
  } catch {
    safeProperties.page_referrer = "";
  }
  for (const key of ["page_path", "method", "cta", "location", "form_name"]) {
    const value = properties[key];
    if (key !== "page_path" && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")) {
      safeProperties[key] = value;
    }
  }
  window.gtag("event", event, safeProperties);
}

export function track(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || isPrivateAnalyticsRoute()) return;
  trackGoogleEvent(event, properties);
  const path = (typeof properties.path === "string" ? properties.path : window.location.pathname).slice(0, 300);
  const label = typeof properties.label === "string" ? properties.label.slice(0, 200)
    : typeof properties.cta === "string" ? properties.cta.slice(0, 200) : null;
  const rows = [{ event: event.slice(0, 64), path, label, properties: properties as never }];
  if (!visitStarted) {
    visitStarted = true;
    rows.unshift({ event: "visit_start", path, label: document.referrer ? new URL(document.referrer).hostname.slice(0, 200) : null, properties: {} as never });
  }
  void supabase.from("visitor_events").insert(rows).then(({ error }) => {
    if (error) console.warn("tracking failed", error.message);
  });
}

export function installClickTracking() {
  const handler = (e: MouseEvent) => {
    const el = (e.target as HTMLElement | null)?.closest("a,button") as HTMLElement | null;
    if (!el) return;
    const href = el.getAttribute("href") ?? "";
    if (/^(mailto:|tel:)/i.test(href) || /#contact(?:$|[?])/i.test(href)) {
      const method = href.toLowerCase().startsWith("mailto:")
        ? "email"
        : href.toLowerCase().startsWith("tel:") ? "phone" : "form";
      track("contact_click", { method });
    }
    const text = (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ");
    if (!text) return;
    track("click", { label: text.slice(0, 120), href: href || undefined });
  };
  document.addEventListener("click", handler, true);
  return () => document.removeEventListener("click", handler, true);
}
