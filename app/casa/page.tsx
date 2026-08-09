import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { CasaArchitecture } from "@/components/casa-architecture";
import { CasaDashboard } from "@/components/casa-dashboard";
import { ArrowRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

const title = "Casa | Studio KRiX";
const description =
  "Casa is an evolving Studio KRiX household operations platform bringing tasks, routines, reminders, alerts and connected-system information into one clear experience.";
const path = "/casa";

const baseMetadata = createMetadata({ title, description, path });

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

const problems = [
  "Tasks live in one app.",
  "Automation lives in another.",
  "Network status lives elsewhere.",
  "Reminders are scattered.",
  "Maintenance gets forgotten.",
  "Important alerts compete with noise.",
] as const;

const householdLayer = [
  "Shared household tasks",
  "Routines",
  "Maintenance reminders",
  "Device status",
  "Important alerts",
  "Household events",
  "Energy summaries",
  "Network-health summaries",
  "Automation status",
  "Door and camera notifications",
  "Shared notes",
  "Recurring responsibilities",
] as const;

const specialistSystems = [
  {
    eyebrow: "Automation engine",
    title: "Home Assistant",
    description:
      "Handles the specialist work of connecting devices, sensors, protocols, rules, events and automations.",
    items: ["Devices", "Sensors", "Rules", "Events", "Automations", "Protocol integrations"],
  },
  {
    eyebrow: "Network & security",
    title: "UniFi",
    description:
      "Handles network infrastructure, cameras, access, device health and the underlying connected environment.",
    items: ["Network", "Cameras", "Access", "Device health", "Infrastructure"],
  },
  {
    eyebrow: "Household operations",
    title: "Casa",
    description:
      "Is designed to translate selected information into useful household context, without replacing specialist systems.",
    items: [
      "Household context",
      "Tasks",
      "Routines",
      "Reminders",
      "Selected alerts",
      "Human-facing summaries",
      "Shared actions",
    ],
    accent: true,
  },
] as const;

const pillars = [
  {
    number: "01",
    title: "Household",
    description:
      "Designed to support shared tasks, responsibilities, notes, routines and household events in one approachable view.",
    items: ["Tasks", "Shared responsibilities", "Notes", "Routines", "Household events"],
  },
  {
    number: "02",
    title: "Maintenance",
    description:
      "Evolving toward practical reminders and service-history concepts that make routine home upkeep easier to remember.",
    items: ["Recurring maintenance", "Service history concepts", "Filter, battery and replacement reminders"],
  },
  {
    number: "03",
    title: "Connected home",
    description:
      "Planned integrations can eventually surface important automation, device, door, camera and network-health information.",
    items: ["Automation status", "Device summaries", "Selected notifications", "Network-health summaries"],
  },
  {
    number: "04",
    title: "Energy",
    description:
      "Future capability could turn household consumption, EV charging, solar and battery information into simple context.",
    items: ["Consumption overview", "EV charging concepts", "Solar and battery concepts", "High-load awareness"],
  },
  {
    number: "05",
    title: "Notifications",
    description:
      "A direction for fewer noisy system messages and more prioritised, actionable household information.",
    items: ["Prioritised alerts", "Useful context", "Clear next actions"],
  },
  {
    number: "06",
    title: "Shared experience",
    description:
      "Designed around multiple household members, clear task ownership, simple visibility and easy manual control.",
    items: ["Multiple people", "Clear ownership", "Simple visibility", "Manual control"],
  },
] as const;

const questions = [
  "What needs doing?",
  "Is anything important happening?",
  "Is the home okay?",
  "Who is responsible for what?",
  "Is there anything I should know?",
] as const;

const privacyPrinciples = [
  "Local-first where practical",
  "Minimal data collection",
  "Least privilege",
  "Secure authentication",
  "Segmented integrations",
  "No unnecessary public exposure",
  "Clear permissions",
  "Auditability",
  "Backups",
  "Manual fallback",
  "Household data stays private by default",
] as const;

const relatedLinks = [
  {
    eyebrow: "Foundation",
    title: "Connected Systems",
    description: "The network, security, automation and software context around Casa.",
    href: "/connected-systems",
  },
  {
    eyebrow: "Specialist platform",
    title: "Home Automation",
    description: "A practical approach to reliable automation and local control.",
    href: "/connected-systems/home-automation",
  },
  {
    eyebrow: "Optional intelligence layer",
    title: "Local AI",
    description: "Private local models, retrieval and guarded Casa integration.",
    href: "/connected-systems/local-ai",
  },
  {
    eyebrow: "Studio work",
    title: "Projects",
    description: "Explore software, engineering and creative technology projects.",
    href: "/projects",
  },
  {
    eyebrow: "Capability",
    title: "Professional Profile",
    description: "Product thinking, systems architecture, UX and integration planning.",
    href: "/professional",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${siteConfig.url}${path}/#concept`,
  name: "Casa",
  headline: "A simpler way to run the household.",
  description,
  url: `${siteConfig.url}${path}`,
  creativeWorkStatus: "In development / active concept",
  creator: {
    "@id": `${siteConfig.url}/#organization`,
  },
};

export default function CasaPage() {
  return (
    <>
      <section className="connected-hero casa-hero">
        <div className="site-container connected-hero__grid">
          <Reveal className="connected-hero__copy">
            <p className="connected-hero__eyebrow">Studio KRiX · Casa</p>
            <h1>
              A simpler way to
              <br />
              run the household.
            </h1>
            <p>
              Casa is an evolving household operations platform designed to
              bring tasks, routines, reminders, alerts and selected
              connected-system information into one clear experience.
            </p>
            <div className="connected-hero__actions casa-hero__actions">
              <ButtonLink href="#casa-experience">Explore Casa</ButtonLink>
              <ButtonLink href="/connected-systems/home-automation" variant="secondary">
                Home Automation
              </ButtonLink>
              <ButtonLink href="/connected-systems" variant="text">
                Connected Systems
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal as="aside" className="connected-status-card casa-status-card" delay={0.08}>
            <div className="connected-status-card__topline">
              <span aria-hidden="true" />
              <span>Active concept</span>
            </div>
            <h2 id="casa-status-title">Casa</h2>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>In development / active concept</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Household operations · Connected systems · Shared routines</dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>Studio KRiX</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="casa-problem" aria-labelledby="casa-problem-title">
        <div className="site-container casa-problem__grid">
          <div className="casa-section-heading">
            <p className="eyebrow">A household problem</p>
            <h2 id="casa-problem-title">The problem Casa is trying to solve</h2>
            <p>
              Modern homes can have plenty of smart devices while still being
              difficult to manage.
            </p>
          </div>
          <div>
            <ol className="casa-problem__list">
              {problems.map((problem, index) => (
                <li key={problem}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{problem}</p>
                </li>
              ))}
            </ol>
            <p className="casa-problem__summary">
              Casa explores what happens when the household becomes the centre
              of the interface instead of the devices.
            </p>
          </div>
        </div>
      </section>

      <section className="casa-layer" aria-labelledby="casa-layer-title">
        <div className="site-container">
          <div className="casa-section-heading casa-section-heading--split">
            <div>
              <p className="eyebrow">What Casa is</p>
              <h2 id="casa-layer-title">One household layer</h2>
            </div>
            <div>
              <p>
                Casa is the human-facing layer for everyday household
                operations. It is designed to support a shared experience
                while its integrations continue to evolve.
              </p>
              <p className="casa-section-heading__note">
                Each capability shown here is a product direction. Some depend
                on planned or future integration with specialist systems.
              </p>
            </div>
          </div>
          <ol className="casa-layer__grid">
            {householdLayer.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="casa-comparison" aria-labelledby="casa-comparison-title">
        <div className="site-container">
          <div className="casa-comparison__statement">
            <p className="eyebrow">A complementary layer</p>
            <h2 id="casa-comparison-title">
              Specialist systems manage devices.
              <br />
              Casa helps manage the household.
            </h2>
            <p>
              Casa is not another replacement for specialist systems. It is
              the layer that helps make those systems useful to the household.
            </p>
          </div>
          <div className="casa-comparison__systems">
            {specialistSystems.map((system) => (
              <article
                className={
                  "accent" in system && system.accent
                    ? "casa-comparison__system--accent"
                    : undefined
                }
                key={system.title}
              >
                <p className="eyebrow">{system.eyebrow}</p>
                <h3>{system.title}</h3>
                <p>{system.description}</p>
                <ul>
                  {system.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="casa-pillars" aria-labelledby="casa-pillars-title">
        <div className="site-container">
          <div className="casa-section-heading casa-section-heading--split">
            <div>
              <p className="eyebrow">Product direction</p>
              <h2 id="casa-pillars-title">Six connected pillars</h2>
            </div>
            <p>
              A focused framework for turning fragmented household information
              into useful, human-scale actions.
            </p>
          </div>
          <div className="casa-pillars__grid">
            {pillars.map((pillar) => (
              <article className="casa-pillar" key={pillar.title}>
                <span className="casa-pillar__number" aria-hidden="true">{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <ul>
                  {pillar.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="casa-interface" id="casa-experience" aria-labelledby="casa-interface-title">
        <div className="site-container">
          <div className="casa-section-heading casa-section-heading--split">
            <div>
              <p className="eyebrow">Product experience</p>
              <h2 id="casa-interface-title">A calm view of the day</h2>
            </div>
            <p>
              The interface concept prioritises what people need to know and
              do. It avoids control-room density, fake live data and device-by-device noise.
            </p>
          </div>
          <Reveal>
            <CasaDashboard />
          </Reveal>
        </div>
      </section>

      <section className="casa-architecture" aria-labelledby="casa-architecture-section-title">
        <div className="site-container casa-architecture__grid">
          <div className="casa-section-heading">
            <p className="eyebrow">System thinking</p>
            <h2 id="casa-architecture-section-title">The household stays at the top</h2>
            <p>
              Casa is conceived as a clear experience above an integration
              layer and the specialist platforms that already do their jobs well.
            </p>
          </div>
          <Reveal delay={0.08} direction="left">
            <CasaArchitecture />
          </Reveal>
        </div>
      </section>

      <section className="casa-philosophy" aria-labelledby="casa-philosophy-title">
        <div className="site-container casa-philosophy__grid">
          <div>
            <p className="eyebrow">Design philosophy</p>
            <h2 id="casa-philosophy-title">Technology should disappear into the background.</h2>
            <p>
              Casa should not feel like a control room. It should make ordinary
              household questions easier to answer.
            </p>
          </div>
          <ul>
            {questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="casa-privacy" aria-labelledby="casa-privacy-title">
        <div className="site-container">
          <div className="casa-section-heading casa-section-heading--split">
            <div>
              <p className="eyebrow">Privacy & security</p>
              <h2 id="casa-privacy-title">Built around privacy</h2>
            </div>
            <p>
              Casa&apos;s product direction starts with restrained access and
              private-by-default household information. These are design
              principles, not claims about unfinished implementation.
            </p>
          </div>
          <ol className="casa-privacy__grid">
            {privacyPrinciples.map((principle, index) => (
              <li key={principle}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{principle}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="casa-related" aria-labelledby="casa-related-title">
        <div className="site-container">
          <div className="casa-section-heading">
            <p className="eyebrow">Continue exploring</p>
            <h2 id="casa-related-title">The work around Casa</h2>
          </div>
          <Reveal
            as="nav"
            ariaLabel="Related Casa pages"
            className="casa-related__links"
          >
            {relatedLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <JsonLd data={structuredData} />
    </>
  );
}
