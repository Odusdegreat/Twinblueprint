import { supabase } from "@/integrations/supabase/client";

// Anonymous visitor tracking: no cookies, no stored IDs, no personal data.
let visitStarted = false;
const isCrm = () => typeof window !== "undefined" && (window.location.pathname.startsWith("/crm") || window.location.hostname.startsWith("crm."));

export function track(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || isCrm()) return;
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
    const text = (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ");
    if (!text) return;
    track("click", { label: text.slice(0, 120), href: el.getAttribute("href") ?? undefined });
  };
  document.addEventListener("click", handler, true);
  return () => document.removeEventListener("click", handler, true);
}
