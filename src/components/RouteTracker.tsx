import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "@/lib/analytics";

const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    track("page_view", { path: location.pathname });
    if (location.pathname.startsWith("/blog/")) {
      track("blog_post_view", { slug: location.pathname.replace("/blog/", "") });
    } else if (location.pathname.startsWith("/case-studies/")) {
      track("case_study_view", { id: location.pathname.replace("/case-studies/", "") });
    }
  }, [location.pathname]);

  // Scroll to hash targets on navigation (e.g. /how-it-works#process),
  // otherwise scroll to top of the page.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = location.hash.slice(1);
    let attempts = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (attempts++ < 20) window.setTimeout(tick, 100);
    };
    const t = window.setTimeout(tick, 100);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return null;

};

export default RouteTracker;
