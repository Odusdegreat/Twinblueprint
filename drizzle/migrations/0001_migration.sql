DROP POLICY IF EXISTS "Anyone can record visitor events" ON public.visitor_events;
CREATE POLICY "Anyone can record valid visitor events" ON public.visitor_events
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(event) BETWEEN 1 AND 64
  AND event ~ '^[a-z0-9_]+$'
  AND (path IS NULL OR (char_length(path) <= 512 AND left(path,1) = '/' AND path NOT LIKE '/crm%'))
  AND (label IS NULL OR char_length(label) <= 200)
  AND (properties IS NULL OR pg_column_size(properties) <= 2048)
  AND created_at >= now() - interval '5 minutes' AND created_at <= now() + interval '5 minutes'
);