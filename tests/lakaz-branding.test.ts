import { readFileSync } from "node:fs";

import { describe, expect, it, vi } from "vitest";
vi.mock("@/lib/portfolio/public", () => ({ getPublicGalleries: async () => [] }));
import sitemap from "@/app/sitemap";

const readSource = (path: string) =>
  readFileSync(new URL(path, import.meta.url), "utf8");

describe("Lakaz branding", () => {
  it("publishes Lakaz and the curated Photography page as canonical routes", async () => {
    const entries = (await sitemap()).map((entry) => entry.url);

    expect(entries).toContain("https://studiokrix.com.au/lakaz");
    expect(entries).not.toContain("https://studiokrix.com.au/casa");
    expect(entries).toContain("https://studiokrix.com.au/photography");

    const page = readSource("../app/lakaz/page.tsx");
    expect(page).toContain('const title = "Lakaz | Studio KRiX"');
    expect(page).toContain(
      "Lakaz is an evolving Studio KRiX household operations platform designed to bring tasks, routines, reminders, alerts and selected connected-system information into one clear experience.",
    );
    expect(page).toContain(
      "Lakaz is the human-facing layer for everyday household",
    );
    expect(page).toContain("Specialist systems manage devices.");
    expect(page).toContain("Lakaz helps manage the household.");
  });

  it("keeps the legacy Casa route as a permanent query-preserving redirect", () => {
    const redirectPage = readSource("../app/casa/page.tsx");

    expect(redirectPage).toContain('import { permanentRedirect } from "next/navigation"');
    expect(redirectPage).toContain(
      'permanentRedirect(suffix ? `/lakaz?${suffix}` : "/lakaz")',
    );
  });

  it("keeps named models prominent and Ollama to one runtime note", () => {
    const localAiPage = readSource("../app/connected-systems/local-ai/page.tsx");
    const runtime = readSource("../components/local-ai-runtime.tsx");
    const combined = `${localAiPage}\n${runtime}`;

    for (const model of ["Qwen3", "Gemma 3", "gpt-oss", "Devstral"]) {
      expect(combined).toContain(model);
    }

    expect(runtime).toContain('title: "AI HARDWARE"');
    expect(runtime).toContain('title: "LOCAL MODEL RUNTIME"');
    expect(runtime).toContain('title: "LOCAL MODELS"');
    expect(runtime).toContain(
      'title: "LAKAZ / CONNECTED SYSTEMS / DEVELOPMENT TOOLS"',
    );
    expect(combined.match(/Ollama/g)).toHaveLength(1);
    expect(localAiPage).toContain(
      "Local runtimes such as Ollama can provide model management and",
    );
  });
});
