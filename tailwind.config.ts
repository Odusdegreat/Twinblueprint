import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: {
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        hero: {
          DEFAULT: "hsl(var(--hero-bg))",
          foreground: "hsl(var(--hero-foreground))",
          muted: "hsl(var(--hero-muted))",
          accent: "hsl(var(--hero-accent))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme("colors.foreground"),
            maxWidth: "none",
            h1: { color: theme("colors.foreground"), fontWeight: "700" },
            h2: { color: theme("colors.foreground"), fontWeight: "700" },
            h3: { color: theme("colors.foreground"), fontWeight: "700" },
            h4: { color: theme("colors.foreground"), fontWeight: "600" },
            strong: { color: theme("colors.foreground"), fontWeight: "600" },
            p: { color: theme("colors.foreground") },
            li: { color: theme("colors.foreground") },
            span: { color: "inherit" },
            div: { color: "inherit" },
            a: { color: theme("colors.primary"), textDecoration: "underline", fontWeight: "500" },
            "a:hover": { color: theme("colors.primary") },
            code: { color: theme("colors.primary"), backgroundColor: theme("colors.muted.DEFAULT"), padding: "0.125rem 0.25rem", borderRadius: "0.25rem", fontWeight: "500" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: { backgroundColor: theme("colors.muted.DEFAULT"), color: theme("colors.foreground"), borderRadius: "0.5rem" },
            "pre code": { backgroundColor: "transparent", padding: 0, color: "inherit", fontSize: "inherit" },
            blockquote: {
              borderLeftColor: theme("colors.primary"),
              color: theme("colors.muted.foreground"),
              fontStyle: "italic",
            },
            hr: { borderColor: theme("colors.border") },
            img: { borderRadius: "0.75rem" },
            "ul > li::marker": { color: theme("colors.muted.foreground") },
            "ol > li::marker": { color: theme("colors.muted.foreground") },
          },
        },
      }),
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
