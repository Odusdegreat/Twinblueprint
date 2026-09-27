CREATE TABLE public.visitor_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event text NOT NULL CHECK (char_length(event) BETWEEN 1 AND 64),
  path text CHECK (char_length(path) <= 300),
  label text CHECK (char_length(label) <= 200),
  properties jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (pg_column_size(properties) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.visitor_events TO anon, authenticated;
GRANT ALL ON public.visitor_events TO service_role;
ALTER TABLE public.visitor_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record visitor events" ON public.visitor_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE INDEX visitor_events_created_idx ON public.visitor_events (created_at DESC);

CREATE OR REPLACE FUNCTION public.visitor_summary(_days int DEFAULT 30)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH e AS (SELECT * FROM visitor_events WHERE created_at >= now() - make_interval(days => LEAST(GREATEST(_days,1),365)))
  SELECT jsonb_build_object(
    'page_views', (SELECT count(*) FROM e WHERE event = 'page_view'),
    'visits', (SELECT count(*) FROM e WHERE event = 'visit_start'),
    'clicks', (SELECT count(*) FROM e WHERE event <> 'page_view' AND event <> 'visit_start'),
    'daily', COALESCE((SELECT jsonb_agg(d ORDER BY d->>'day') FROM (SELECT jsonb_build_object('day', to_char(date_trunc('day', created_at),'YYYY-MM-DD'), 'views', count(*) FILTER (WHERE event='page_view'), 'clicks', count(*) FILTER (WHERE event NOT IN ('page_view','visit_start'))) d FROM e GROUP BY date_trunc('day', created_at)) x), '[]'::jsonb),
    'top_pages', COALESCE((SELECT jsonb_agg(p) FROM (SELECT jsonb_build_object('path', path, 'count', count(*)) p FROM e WHERE event='page_view' GROUP BY path ORDER BY count(*) DESC LIMIT 10) y), '[]'::jsonb),
    'top_clicks', COALESCE((SELECT jsonb_agg(c) FROM (SELECT jsonb_build_object('event', event, 'label', label, 'count', count(*)) c FROM e WHERE event NOT IN ('page_view','visit_start') GROUP BY event, label ORDER BY count(*) DESC LIMIT 10) z), '[]'::jsonb)
  )
$$;
GRANT EXECUTE ON FUNCTION public.visitor_summary(int) TO anon, authenticated;