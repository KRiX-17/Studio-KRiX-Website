import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { HomeAutomationArchitecture } from "@/components/home-automation-architecture";
import { ArrowRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

const title = "Home Automation | Studio KRiX";
const description =
  "Explore Studio KRiX home automation concepts across connected devices, local automation, networking, energy, security awareness and future Lakaz integration.";
const path = "/connected-systems/home-automation";

const baseMetadata = createMetadata({ title, description, path });

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

const principles = [
  {
    title: "Invisible when it works",
    description:
      "Automation should remove repetitive actions without constantly demanding attention.",
  },
  {
    title: "Manual control always remains",
    description:
      "A light switch should still work. A door should still operate normally. Essential systems should not depend on an app, server or internet connection to remain usable.",
  },
  {
    title: "Local where practical",
    description:
      "Important household functions should prefer local communication and processing where that is technically appropriate.",
  },
  {
    title: "Graceful failure",
    description:
      "Automations should fail safely, predictably and without turning a small technical problem into a household problem.",
  },
  {
    title: "Interoperability",
    description:
      "Standards and well-understood APIs can reduce unnecessary ecosystem lock-in and keep future choices open.",
  },
  {
    title: "Privacy",
    description:
      "Household telemetry should not be collected, retained or exposed without a clear and proportionate reason.",
  },
] as const;

const automationAreas = [
  {
    number: "01",
    title: "Lighting",
    description:
      "Lighting that can respond to context while remaining familiar at the wall.",
    items: [
      "Presence-aware lighting",
      "Scenes",
      "Time-based behaviour",
      "Manual override",
    ],
  },
  {
    number: "02",
    title: "Climate",
    description:
      "Comfort routines that consider time and occupancy without obscuring direct control.",
    items: [
      "Temperature",
      "Comfort routines",
      "Scheduling",
      "Presence-aware control",
    ],
  },
  {
    number: "03",
    title: "Presence & sensors",
    description:
      "Signals that help the environment understand context rather than merely trigger isolated actions.",
    items: [
      "Motion",
      "Occupancy",
      "Doors and windows",
      "Environmental sensors",
      "Context-aware automation",
    ],
  },
  {
    number: "04",
    title: "Energy",
    description:
      "Clearer awareness of when and how energy is being used, with room for considered scheduling.",
    items: [
      "Consumption visibility",
      "High-load awareness",
      "Solar and battery integration concepts",
      "EV charging integration concepts",
      "Scheduled energy use",
    ],
  },
  {
    number: "05",
    title: "Security awareness",
    description:
      "Integration and awareness only: useful states and events can be surfaced without handing security-critical decisions to Lakaz.",
    items: [
      "Door state",
      "Camera events",
      "Access events",
      "Notifications",
    ],
  },
  {
    number: "06",
    title: "Household routines",
    description:
      "Conceptual routines can coordinate ordinary transitions while keeping each decision understandable.",
    items: [
      "Leaving home",
      "Arriving home",
      "Night and morning routines",
      "Away mode",
      "Guest mode",
    ],
  },
] as const;

const automationTechnologies = [
  "Home Assistant",
  "Apple Home / HomeKit",
  "Matter",
  "Thread",
  "MQTT",
  "REST APIs",
  "Webhooks",
  "Local network integrations",
] as const;

const lakazFutureIntegrations = [
  "Household overview",
  "Tasks",
  "Shared routines",
  "Maintenance reminders",
  "Device status",
  "Important alerts",
  "Energy summaries",
  "Network-health summaries",
  "Door or camera notifications",
  "Automation status",
  "Household events",
] as const;

const scenarios = [
  {
    number: "01",
    title: "Arriving home",
    body: "Presence is detected. Useful lighting responds. Climate can return to the preferred state. Lakaz could surface only what actually needs attention.",
  },
  {
    number: "02",
    title: "Night",
    body: "Non-essential systems settle down. Relevant household states can be checked. Lighting becomes appropriate for the time, while Lakaz could offer a concise status rather than a wall of controls.",
  },
  {
    number: "03",
    title: "Leaving",
    body: "Presence changes and unnecessary loads can switch off. Security-related states can be surfaced, with unusual conditions highlighted rather than blindly automating a security-critical decision.",
  },
  {
    number: "04",
    title: "Energy-aware charging",
    body: "A future EV charging workflow could consider schedule, household load, energy availability and user priorities before choosing an appropriate charging window.",
  },
] as const;

const securityPrinciples = [
  "Local processing where practical",
  "Network segmentation",
  "Least privilege",
  "Secure authentication",
  "Minimal cloud dependency for critical functions",
  "No unnecessary exposed services",
  "Update management",
  "Backups",
  "Auditability",
  "Manual fallback",
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${siteConfig.url}${path}/#concept`,
  name: "Studio KRiX Home Automation",
  description,
  url: `${siteConfig.url}${path}`,
  author: {
    "@id": `${siteConfig.url}/#organization`,
  },
  isPartOf: {
    "@id": `${siteConfig.url}/connected-systems/#service`,
  },
  keywords: [
    "home automation",
    "local automation",
    "connected systems",
    "energy awareness",
    "Lakaz",
  ],
};

export default function HomeAutomationPage() {
  return (
    <>
      <section className="connected-hero home-auto-hero">
        <div className="site-container connected-hero__grid">
          <Reveal className="connected-hero__copy">
            <p className="connected-hero__eyebrow">
              Connected Systems · Home Automation
            </p>
            <h1>
              A home that quietly
              <br />
              {" "}works around you.
            </h1>
            <p>
              Studio KRiX explores home automation as a connected system
              rather than a collection of smart gadgets — combining reliable
              networking, sensors, devices, automation and thoughtful software
              into an environment that stays simple to use.
            </p>
            <div className="connected-hero__actions">
              <ButtonLink href="#automation-architecture">
                Explore the architecture
              </ButtonLink>
              <ButtonLink href="/connected-systems" variant="secondary">
                Connected Systems
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal
            as="aside"
            className="connected-status-card home-auto-status"
            delay={0.08}
          >
            <div className="connected-status-card__topline">
              <span aria-hidden="true" />
              <span>Studio KRiX concept</span>
            </div>
            <h2 id="home-auto-status-title">Home Automation</h2>
            <dl>
              <div>
                <dt>Direction</dt>
                <dd>Quiet, understandable automation</dd>
              </div>
              <div>
                <dt>Priority</dt>
                <dd>Local where practical · Graceful failure</dd>
              </div>
              <div>
                <dt>Fallback</dt>
                <dd>Manual control always remains</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section
        className="home-auto-principles"
        aria-labelledby="home-auto-principles-title"
      >
        <div className="site-container home-auto-principles__grid">
          <div className="home-auto-principles__intro">
            <p className="section-label">Design principles</p>
            <h2 id="home-auto-principles-title">
              Good automation should quietly remove friction.
            </h2>
            <p>
              The technology can be sophisticated underneath. The experience
              should remain calm, legible and recoverable by the people who
              live with it.
            </p>
          </div>

          <ol className="home-auto-principles__list">
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="home-auto-architecture"
        id="automation-architecture"
        aria-labelledby="home-auto-architecture-title"
      >
        <div className="site-container home-auto-architecture__grid">
          <Reveal className="home-auto-section-copy">
            <p className="section-label">The automation architecture</p>
            <h2 id="home-auto-architecture-title">
              A clear stack, designed around people.
            </h2>
            <p>
              Physical systems, reliable networking and a capable automation
              platform do the specialist work. Integrations connect those
              layers. Lakaz is being explored above them as a simpler way to
              understand household context and act when something matters.
            </p>
          </Reveal>
          <Reveal delay={0.08} direction="left">
            <HomeAutomationArchitecture />
          </Reveal>
        </div>
      </section>

      <section
        className="home-auto-areas"
        aria-labelledby="home-auto-areas-title"
      >
        <div className="site-container">
          <div className="directory-heading home-auto-directory-heading">
            <div>
              <p className="section-label">Automation areas</p>
              <h2 id="home-auto-areas-title">
                Capabilities that work together.
              </h2>
            </div>
            <p>
              Each area is considered as part of one environment, with
              appropriate boundaries and familiar manual control.
            </p>
          </div>

          <div className="home-auto-areas__grid">
            {automationAreas.map((area) => (
              <article className={`home-auto-area home-auto-area--${area.number}`} key={area.title}>
                <div className="home-auto-area__heading">
                  <span aria-hidden="true">{area.number}</span>
                  <h3>{area.title}</h3>
                </div>
                <p>{area.description}</p>
                <ul aria-label={`${area.title} concepts`}>
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="home-auto-engine"
        aria-labelledby="home-auto-engine-title"
      >
        <div className="site-container home-auto-engine__grid">
          <div className="home-auto-section-copy">
            <p className="section-label">The automation engine</p>
            <h2 id="home-auto-engine-title">
              Powerful underneath, quiet at the surface.
            </h2>
            <p>
              The underlying automation layer handles device communication,
              rules, scenes, schedules and events. Home Assistant is one
              example of a powerful local automation and integration engine.
            </p>
            <p>
              Other relevant technologies can include Apple Home and HomeKit,
              Matter, Thread, MQTT, REST APIs, webhooks and local network
              integrations. They represent architectural options and
              integration direction—not a claim that Studio KRiX currently
              deploys every technology in every environment.
            </p>
          </div>

          <div className="home-auto-engine__panel">
            <div className="home-auto-engine__statement">
              <span>System responsibility</span>
              <strong>Devices, rules and integrations.</strong>
              <p>
                Lakaz remains a separate Studio KRiX software concept above
                this layer.
              </p>
            </div>
            <ul aria-label="Technologies relevant to the automation architecture">
              {automationTechnologies.map((technology, index) => (
                <li key={technology}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="home-auto-lakaz"
        aria-labelledby="home-auto-lakaz-title"
      >
        <div className="site-container">
          <div className="home-auto-lakaz__heading">
            <div>
              <p className="section-label">Evolving human-facing layer</p>
              <h2 id="home-auto-lakaz-title">Lakaz + Home Automation</h2>
            </div>
            <div className="home-auto-lakaz__intro">
              <p>
                Lakaz is being developed as the human-facing layer of the Studio
                KRiX connected-home concept. The automation system handles
                devices and rules. Lakaz focuses on the household.
              </p>
              <ButtonLink href="/lakaz" variant="secondary">
                Explore Lakaz
              </ButtonLink>
            </div>
          </div>

          <div className="home-auto-lakaz__comparison">
            <article className="home-auto-lakaz__engine">
              <span>Automation engine</span>
              <h3>Make the lights respond to presence.</h3>
              <p>
                Device logic, schedules, scenes and integrations run reliably
                in the background.
              </p>
            </article>
            <article className="home-auto-lakaz__human">
              <span>Lakaz</span>
              <h3>
                Show that someone is home, the garage door needs attention,
                the washing is finished and a household task is due.
              </h3>
              <p>
                Household context, useful information and simple actions can
                be brought together without replacing the specialist systems
                beneath them.
              </p>
            </article>
          </div>

          <div className="home-auto-lakaz__future">
            <div>
              <span>Potential future integrations</span>
              <strong>Design direction, not completed capability.</strong>
            </div>
            <ul aria-label="Potential future Lakaz integrations">
              {lakazFutureIntegrations.map((integration) => (
                <li key={integration}>{integration}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="home-auto-scenarios"
        aria-labelledby="home-auto-scenarios-title"
      >
        <div className="site-container home-auto-scenarios__grid">
          <div className="home-auto-section-copy">
            <p className="section-label">Concepts · Design direction</p>
            <h2 id="home-auto-scenarios-title">What this could feel like</h2>
            <p>
              These scenarios illustrate a design direction. They are not
              claims about a currently deployed Studio KRiX or Lakaz system.
            </p>
          </div>

          <ol className="home-auto-scenarios__list">
            {scenarios.map((scenario) => (
              <li key={scenario.title}>
                <span aria-hidden="true">{scenario.number}</span>
                <h3>{scenario.title}</h3>
                <p>{scenario.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="home-auto-philosophy"
        aria-labelledby="home-auto-philosophy-title"
      >
        <div className="site-container home-auto-philosophy__grid">
          <p className="section-label">Design philosophy</p>
          <h2 id="home-auto-philosophy-title">
            The smartest home shouldn&apos;t feel like a computer.
          </h2>
          <div>
            <p>The goal is not maximum automation.</p>
            <p>The goal is the right automation.</p>
          </div>
        </div>
      </section>

      <section
        className="home-auto-security"
        aria-labelledby="home-auto-security-title"
      >
        <div className="site-container home-auto-security__grid">
          <div className="home-auto-section-copy">
            <p className="section-label">Responsible architecture</p>
            <h2 id="home-auto-security-title">
              Privacy and security by default.
            </h2>
            <p>
              Connected environments should expose only what is necessary and
              remain maintainable over time. Public principles are useful;
              actionable private infrastructure details are not.
            </p>
          </div>
          <ul aria-label="Home automation privacy and security principles">
            {securityPrinciples.map((principle, index) => (
              <li key={principle}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="home-auto-related"
        aria-labelledby="home-auto-related-title"
      >
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Continue exploring</p>
              <h2 id="home-auto-related-title">Where to next</h2>
            </div>
            <p>
              Return to Connected Systems, explore the optional Local AI
              intelligence layer or see the practice behind the work.
            </p>
          </div>
          <div className="home-auto-related__grid">
            <Link href="/connected-systems">
              <span>Network · Security · Automation · Software</span>
              <h3>Connected Systems</h3>
              <p>
                The complete Studio KRiX view of infrastructure, integrations
                and human-facing software.
              </p>
              <ArrowRightIcon />
            </Link>
            <Link href="/professional">
              <span>Engineering · Technology · Documentation</span>
              <h3>Professional Profile</h3>
              <p>
                The practical capabilities and approach behind Studio KRiX
                systems work.
              </p>
              <ArrowRightIcon />
            </Link>
            <Link href="/connected-systems/local-ai">
              <span>Private infrastructure · Local models · Lakaz</span>
              <h3>Local AI</h3>
              <p>
                A guarded architecture for local models, retrieval and
                optional household intelligence.
              </p>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd data={structuredData} />
    </>
  );
}
