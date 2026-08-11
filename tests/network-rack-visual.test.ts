import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const page = readFileSync("app/connected-systems/page.tsx", "utf8");
const styles = readFileSync("styles/globals.css", "utf8");

describe("network infrastructure concept visual", () => {
  it("presents the supplied rack render as an explicitly illustrative concept", () => {
    expect(page).toContain("network-rack-concept.webp");
    expect(page).toContain("Concept network infrastructure");
    expect(page).toContain(
      "Concept network rack with structured cabling, managed switching, storage and protected infrastructure.",
    );
    expect(page).not.toContain("Illustrative rack architecture");
  });

  it("uses a stable responsive image treatment without horizontal motion", () => {
    expect(page).toContain('placeholder="blur"');
    expect(page).toContain('quality={92}');
    expect(styles).toMatch(
      /\.connected-network-concept\s*\{[\s\S]*?width: min\(100%, 72rem\);[\s\S]*?grid-column: 1 \/ -1;/,
    );
    expect(styles).toMatch(
      /\.connected-network-concept__media\s*\{[\s\S]*?aspect-ratio: 1672 \/ 940;/,
    );
    expect(styles).toMatch(
      /\.connected-network-concept__image\s*\{[\s\S]*?width: 100%;[\s\S]*?height: 100%;[\s\S]*?object-fit: cover;/,
    );
    expect(styles).not.toMatch(
      /\.connected-network-concept[^}]*transform:\s*translateX/,
    );
  });
});
