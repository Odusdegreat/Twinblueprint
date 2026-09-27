import { useQuery } from "@tanstack/react-query";
import { Eye, MousePointer2, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/crm/components/CrmPageUi";

interface Summary {
  page_views: number; visits: number; clicks: number;
  top_pages: { path: string; count: number }[];
  top_clicks: { event: string; label: string | null; count: number }[];
}

export default function VisitorStats() {
  const q = useQuery({
    queryKey: ["visitor-summary"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("visitor_summary", { _days: 30 });
      if (error) throw error;
      return data as unknown as Summary;
    },
  });
  const d = q.data;
  return <section className="space-y-4">
    <div><p className="mb-1 text-xs font-medium uppercase tracking-widest text-primary">Website visitors</p><p className="text-sm text-muted-foreground">Last 30 days on the public site</p></div>
    {q.isLoading && <p className="text-sm text-muted-foreground">Loading visitor stats…</p>}
    {q.error && <p className="text-sm text-destructive">Could not load visitor stats.</p>}
    {d && <>
      <div className="grid gap-4 sm:grid-cols-3"><MetricCard icon={Users} label="Visits" value={String(d.visits)} /><MetricCard icon={Eye} label="Page views" value={String(d.page_views)} /><MetricCard icon={MousePointer2} label="Clicks" value={String(d.clicks)} /></div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card><CardHeader><CardTitle className="text-base">Top pages</CardTitle><CardDescription>Most viewed pages</CardDescription></CardHeader><CardContent className="space-y-2">{d.top_pages.length ? d.top_pages.map(p => <div key={p.path} className="flex justify-between text-sm"><span className="truncate">{p.path}</span><span className="tabular-nums text-muted-foreground">{p.count}</span></div>) : <p className="text-sm text-muted-foreground">No page views yet.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Top clicks</CardTitle><CardDescription>Most clicked buttons and links</CardDescription></CardHeader><CardContent className="space-y-2">{d.top_clicks.length ? d.top_clicks.map((c, i) => <div key={i} className="flex justify-between gap-3 text-sm"><span className="truncate">{c.label || c.event}</span><span className="tabular-nums text-muted-foreground">{c.count}</span></div>) : <p className="text-sm text-muted-foreground">No clicks yet.</p>}</CardContent></Card>
      </div>
    </>}
  </section>;
}
