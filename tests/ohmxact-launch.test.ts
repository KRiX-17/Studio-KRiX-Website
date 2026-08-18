import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const page = readFileSync("app/ohmxact/page.tsx", "utf8");
const projects = readFileSync("data/projects.ts", "utf8");

describe("OhmXact public launch", () => {
  it("publishes the App Store CTA safely", () => {
    expect(page).toContain(
      'const appStoreUrl = "https://apps.apple.com/app/id6795690387"',
    );
    expect(page).toContain("<ButtonLink external href={appStoreUrl}>");
    expect(page).toContain("Download on the App Store");
    expect(page).toContain("Android — coming soon");
    expect(page).toContain('<ButtonLink href="/support" variant="text">');
    expect(page).not.toContain("App Store — coming soon");
  });

  it("keeps release copy and structured data accurate", () => {
    expect(page).toContain(
      "OhmXact is available now for iPhone and iPad, with Android coming",
    );
    expect(page).toContain('title: "Available now on Apple devices"');
    expect(page).toContain(
      '"Download OhmXact for iPhone and iPad. Android is coming soon."',
    );
    expect(page).toContain('operatingSystem: "iOS, iPadOS"');
    expect(page).toContain('softwareVersion: "1.0"');
    expect(page).toContain("downloadUrl: appStoreUrl");
  });

  it("marks the project released without claiming Android availability", () => {
    expect(projects).toContain(
      'platforms: ["iPhone", "iPad", "Android coming soon"]',
    );
    expect(projects).toContain('status: "Released"');
  });
});
