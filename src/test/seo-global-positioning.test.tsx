import fs from "fs";
import path from "path";
import { BASE_URL } from "@/lib/constants";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/lib/seo";
import { BUSINESS_TELEPHONE } from "@/lib/constants";

describe("global SEO positioning", () => {
  it("uses the preferred production domain and avoids Nigeria/Africa market targeting on the homepage", () => {
    const homepageSource = fs.readFileSync(path.resolve(__dirname, "../pages/Index.tsx"), "utf8");

    expect(BASE_URL).toBe("https://www.twinblueprint.com");
    expect(homepageSource).toContain("Technology Solutions");
    expect(homepageSource).not.toMatch(/Nigeria|Africa/i);

    const descriptionMatch = homepageSource.match(/name="description"[\s\S]*?content="([^"]+)"/m);
    expect(descriptionMatch?.[1]).toContain("technology consulting");
    expect(descriptionMatch?.[1]).not.toMatch(/Nigeria|Africa/i);
  });

  it("does not advertise unsupported blog search in the WebSite schema", () => {
    const homepageHtml = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf8");

    expect(WEBSITE_SCHEMA).not.toHaveProperty("potentialAction");
    expect(homepageHtml).not.toContain('"@type": "SearchAction"');
  });

  it("publishes the verified telephone in the shared Organization schema and initial HTML", () => {
    const homepageHtml = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf8");

    expect(BUSINESS_TELEPHONE).toBe("+4479040539301");
    expect(ORGANIZATION_SCHEMA.contactPoint.telephone).toBe(BUSINESS_TELEPHONE);
    expect(homepageHtml).toContain(`"telephone": "${BUSINESS_TELEPHONE}"`);
  });
});
