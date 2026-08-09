import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";
import { getRevealOffset } from "@/components/reveal";

const globalStyles = readFileSync(
  new URL("../styles/globals.css", import.meta.url),
  "utf8",
);

describe("reveal motion", () => {
  it("maps every animated direction to vertical-only movement", () => {
    expect(getRevealOffset("up", 24)).toBe(24);
    expect(getRevealOffset("left", 24)).toBe(24);
    expect(getRevealOffset("right", 24)).toBe(24);
    expect(getRevealOffset("down", 24)).toBe(-24);
    expect(getRevealOffset("none", 24)).toBe(0);
  });

  it("keeps the ready state vertical and intrinsically width-safe", () => {
    expect(globalStyles).toContain(
      "transform: translate3d(0, var(--reveal-y, 24px), 0)",
    );
    expect(globalStyles).not.toContain("var(--reveal-x");
    expect(globalStyles).toMatch(
      /\.scroll-reveal \{[\s\S]*?min-width: 0;[\s\S]*?max-width: 100%;/,
    );
  });

  it("keeps homepage child reveal motion vertical-only", () => {
    const readyChildRules = globalStyles.match(
      /\.home-hero__media\.scroll-reveal--ready:not\(\.scroll-reveal--visible\) \.home-hero-visual__[^{]+\{[^}]+\}/g,
    );

    expect(readyChildRules).toHaveLength(4);
    expect(readyChildRules?.join("\n")).not.toMatch(
      /translate(?:3d)?\((?!0(?:px|rem|em|%|\s|,))/,
    );
    expect(readyChildRules?.join("\n")).not.toContain("translateX");
    expect(globalStyles).toContain("transform: translate3d(0, 0.5rem, 0)");
    expect(globalStyles).not.toContain("translate(0.7rem, 0.5rem)");
  });
});
