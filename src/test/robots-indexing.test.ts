import { describe, expect, it } from "vitest";
import { shouldIndexRoute } from "@/App";

describe("public route indexing rules", () => {
  it("allows public blog article URLs to be indexed", () => {
    expect(shouldIndexRoute("/blog/cost-of-architectural-visualisation-in-the-uk-2026-pricing-guide-1500")).toBe(true);
  });

  it("blocks CRM and admin routes from indexing", () => {
    expect(shouldIndexRoute("/crm/login")).toBe(false);
    expect(shouldIndexRoute("/admin/settings")).toBe(false);
  });
});
