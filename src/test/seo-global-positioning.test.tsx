import fs from "fs";
import path from "path";
import { BASE_URL } from "@/lib/constants";

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
});
