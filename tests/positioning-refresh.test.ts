import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readSource = (path: string) => readFileSync(path, "utf8");
const compact = (source: string) => source.replace(/\s+/g, " ");

const homeHero = readSource("components/sections/home-hero.tsx");
const homeAbout = compact(readSource("components/sections/home-about.tsx"));
const homeProfessional = compact(
  readSource("components/sections/professional-profile.tsx"),
);
const professional = compact(readSource("app/professional/page.tsx"));
const skills = readSource("components/sections/skills-section.tsx");
const about = compact(readSource("app/about/page.tsx"));
const projects = readSource("app/projects/page.tsx");
const contact = compact(readSource("app/contact/page.tsx"));
const layout = readSource("app/layout.tsx");
const site = readSource("config/site.ts");

describe("Studio KRiX positioning refresh", () => {
  it("uses the approved homepage positioning and linked capability strip", () => {
    const hero = compact(homeHero);

    expect(hero).toContain("Technology, engineering");
    expect(hero).toContain("and music brought together.");
    expect(hero).toContain(
      "Studio KRiX brings together software development, connected systems, networking, home automation, local AI, automotive and electrical technology, and electronic music.",
    );
    expect(hero).toContain(
      "From practical apps like OhmXact and evolving platforms like Lakaz to managed network infrastructure, intelligent automation and creative production, I explore how technology can solve real problems and create better experiences.",
    );

    for (const [label, href] of [
      ["Software & Apps", "/projects"],
      ["Connected Systems", "/connected-systems"],
      ["Networking & PoE", "/connected-systems"],
      ["Home Automation", "/connected-systems/home-automation"],
      ["Local AI", "/connected-systems/local-ai"],
      ["Automotive & Electrical", "/professional"],
      ["Music Production", "/music"],
    ]) {
      expect(homeHero).toContain(`{ label: "${label}", href: "${href}" }`);
    }
  });

  it("broadens the homepage About and Professional summaries without overclaiming", () => {
    expect(homeAbout).toContain(
      "Christopher Helene is a Sydney-based technician, developer and electronic music producer working across software, automotive and electrical systems, networking, connected environments, automation and local AI. Studio KRiX brings these disciplines together through practical tools, experimental systems and creative projects.",
    );
    expect(homeProfessional).toContain(
      "alongside software development, networking and connected-system design",
    );
    expect(homeProfessional).not.toContain("an interest in software");
  });

  it("keeps the established and emerging capability distinction explicit", () => {
    expect(professional).toContain(
      "strongest established professional foundation is automotive and auto-electrical work",
    );
    expect(professional).toContain(
      "he develops software, designs and administers networks, and builds practical connected-system concepts",
    );
    expect(about).toContain(
      "Studio KRiX connects that foundation with evolving work in connected environments, home automation, local AI and deeper systems integration",
    );
    expect(about).toContain(
      "a personal platform rather than a large company or agency",
    );
  });

  it("groups connected-system, automation and AI capability honestly", () => {
    expect(skills).toContain('title: "Connected Systems"');
    expect(skills).toContain('"Network design and managed networking"');
    expect(skills).toContain('"Ethernet and PoE infrastructure"');
    expect(skills).toContain('"Matter and interoperable-device concepts"');
    expect(skills).toContain('title: "Automation and AI"');
    expect(skills).toContain('"Local model deployment concepts"');
    expect(skills).toContain(
      '"Retrieval and knowledge-assisted AI concepts"',
    );
    expect(skills).toContain('"Privacy-conscious AI architecture"');
  });

  it("updates projects, contact and broad metadata consistently", () => {
    expect(projects).toContain('"Apps & software"');
    expect(projects).toContain('"Networking & infrastructure"');
    expect(projects).toContain('"Music & creative projects"');
    expect(contact).toContain(
      "software, technical systems, connected environments, automotive or electrical work, professional opportunities and creative projects",
    );
    expect(site).toContain(
      "Software, automotive and electrical technology, connected systems, automation, local AI and electronic music",
    );
    expect(layout).toContain('"Network infrastructure"');
    expect(layout).toContain('"Local AI architecture"');
  });

  it("removes the superseded broad-positioning language", () => {
    const broadSources = [
      homeHero,
      homeAbout,
      homeProfessional,
      professional,
      about,
      projects,
      contact,
      site,
    ].join("\n");

    expect(broadSources).not.toContain(
      "practical software, automotive technology and creative projects",
    );
    expect(broadSources).not.toContain("an interest in software");
    expect(broadSources).not.toContain(
      "software, app, automotive technology and creative projects",
    );
  });
});
