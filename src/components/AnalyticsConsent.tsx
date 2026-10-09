import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { canUseGoogleAnalytics, getAnalyticsConsent, setAnalyticsConsent } from "@/lib/analytics";

const CONSENT_EVENT = "twinblueprint:manage-analytics-consent";

const AnalyticsConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!canUseGoogleAnalytics()) return;
    const consent = getAnalyticsConsent();
    if (consent === true) setAnalyticsConsent(true, true);
    setVisible(consent === null);

    const open = () => setVisible(true);
    window.addEventListener(CONSENT_EVENT, open);
    return () => window.removeEventListener(CONSENT_EVENT, open);
  }, []);

  if (!visible) return null;

  const choose = (granted: boolean) => {
    const newlyGranted = granted && getAnalyticsConsent() !== true;
    setAnalyticsConsent(granted, newlyGranted);
    setVisible(false);
  };

  return (
    <aside
      aria-label="Analytics cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background p-4 shadow-lg sm:p-5"
      role="dialog"
      aria-modal="false"
      aria-labelledby="analytics-consent-title"
    >
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h2 id="analytics-consent-title" className="text-sm font-semibold text-foreground">
            Analytics preferences
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Google Analytics helps us understand site visits. It is disabled unless you choose to allow it. We never send form details to Google.
            {" "}<Link className="underline underline-offset-4" to="/privacy-policy">Privacy policy</Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="min-h-10 rounded-md border border-border px-4 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => choose(false)}
          >
            Reject analytics
          </button>
          <button
            type="button"
            className="min-h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            onClick={() => choose(true)}
          >
            Allow analytics
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AnalyticsConsent;