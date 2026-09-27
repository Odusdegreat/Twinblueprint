import { useEffect, useState } from "react";

// ---- OPTION A: Static Badge ----
interface TwinTermBadgeProps {
  term: string;
  className?: string;
}

export function TwinTermBadge({ term, className = "" }: TwinTermBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-md
        bg-sky-500/15 text-sky-400 font-semibold
        border border-sky-500/30 whitespace-nowrap
        ${className}`}
    >
      {term}
    </span>
  );
}

// ---- OPTION B: Animated Rotating Text ----
const DEFAULT_TERMS = [
  "Digital Twin",
  "Immersive Property Twin",
  "Photorealistic Site Twin",
  "Interactive Building Twin",
];

interface TwinTermRotatorProps {
  terms?: string[];
  intervalMs?: number;
  className?: string;
}

export function TwinTermRotator({
  terms = DEFAULT_TERMS,
  intervalMs = 3200,
  className = "",
}: TwinTermRotatorProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % terms.length);
        setVisible(true);
      }, 300);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [terms, intervalMs]);

  return (
    <span
      className={`inline-block text-sky-400 font-semibold transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {terms[index]}
    </span>
  );
}
