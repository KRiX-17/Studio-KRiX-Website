import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ConnectedSystemsDiagram } from "@/components/connected-systems-diagram";
import { ArrowRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

const title = "Connected Systems | Studio KRiX";
const description =
  "Explore Studio KRiX connected systems work across network infrastructure, UniFi, cameras, home automation and Casa software integration.";
const path = "/connected-systems";

const baseMetadata = createMetadata({ title, description, path });

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

const networkCapabilities = [
  "Network planning",
  "Wired Ethernet",
  "Fibre uplinks where appropriate",
  "Power over Ethernet",
  "Wi-Fi coverage",
  "Network segmentation",
  "Device isolation",
  "Redundancy",
  "Monitoring",
  "Rack organisation and documentation",
] as const;

const unifiCapabilities = [
  "UniFi gateways",
  "Managed switching",
  "Wireless access points",
  "PoE cameras",
  "NVR systems",
  "Door and access integration",
  "Notifications",
  "Remote visibility",
  "Device health",
  "Network monitoring",
] as const;

const automationCapabilities = [
  "Lighting and climate",
  "Presence and sensors",
  "Energy awareness",
  "Household notifications",
  "Scene-based control",
  "Scheduled actions",
  "Event-triggered automation",
  "Simple manual control",
] as const;

const casaIntegrations = [
  "Household tasks",
  "Device status",
  "Network health summaries",
  "Camera or door alerts",
  "Automation events",
  "Energy information",
  "Maintenance reminders",
  "Household notifications",
  "Service status",
  "Shared routines",
] as const;

const practicalEnvironments = [
  "Home networks",
  "Small workshop networks",
  "Camera systems",
  "PoE infrastructure",
  "Device connectivity",
  "Automation concepts",
  "Monitoring dashboards",
  "Household software integration",
] as const;

const securityPrinciples = [
  "Least privilege",
  "Segmentation",
  "Device isolation",
  "Minimal exposed services",
  "Secure remote access",
  "Strong authentication",
  "Encryption",
  "Logging and visibility",
  "Reliable backups",
  "Update management",
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}${path}/#service`,
  name: "Studio KRiX Connected Systems",
  serviceType:
    "Connected network, security, automation and software system design",
  description,
  url: `${siteConfig.url}${path}`,
  provider: {
    "@id": `${siteConfig.url}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Sydney",
  },
};

type CapabilityListProps = {
  items: readonly string[];
  label: string;
};

function CapabilityList({ items, label }: CapabilityListProps) {
  return (
    <ul className="connected-capability__list" aria-label={label}>
      {items.map((item, index) => (
        <li key={item}>
          <span aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <strong>{item}</strong>
        </li>
      ))}
    </ul>
  );
}

export default function ConnectedSystemsPage() {
  return (
    <>
      <section className="connected-hero">
        <div className="site-container connected-hero__grid">
          <div className="connected-hero__copy">
            <p className="connected-hero__eyebrow">
              Studio KRiX Connected Systems
            </p>
            <h1>
              Networks, automation
              <br />
              {" "}and software working together.
            </h1>
            <p>
              From reliable network infrastructure to cameras, access systems,
              automation and Casa integration, Studio KRiX explores how
              connected environments can be simpler, safer and easier to
              manage.
            </p>
            <div className="connected-hero__actions">
              <ButtonLink href="#system-overview">
                Explore the system
              </ButtonLink>
              <ButtonLink href="/professional" variant="secondary">
                View Professional Profile
              </ButtonLink>
            </div>
          </div>

          <aside
            className="connected-status-card"
            aria-labelledby="connected-status-title"
          >
            <div className="connected-status-card__topline">
              <span aria-hidden="true" />
              <span>Studio KRiX capability</span>
            </div>
            <h2 id="connected-status-title">Connected Systems</h2>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>Active exploration</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Infrastructure · Security · Automation · Software</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Sydney, Australia</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        className="connected-overview"
        id="system-overview"
        aria-labelledby="connected-overview-title"
      >
        <div className="site-container connected-overview__grid">
          <div className="connected-overview__copy">
            <p className="section-label">The connected environment</p>
            <h2 id="connected-overview-title">
              Practical systems, considered as a whole.
            </h2>
            <p>
              Connected Systems brings together networking, automation,
              security and software into one coherent environment.
            </p>
            <p>
              Studio KRiX designs practical connected systems around real-world
              needs, using reliable infrastructure, thoughtful automation and
              clear interfaces rather than unnecessary complexity.
            </p>
          </div>
          <ConnectedSystemsDiagram />
        </div>
      </section>

      <section
        className="connected-capability"
        id="network-infrastructure"
        aria-labelledby="network-infrastructure-title"
      >
        <div className="site-container connected-capability__grid">
          <div className="connected-capability__copy">
            <p className="section-label">01 · Foundation</p>
            <h2 id="network-infrastructure-title">Network infrastructure</h2>
            <p>
              Reliable connected systems start with a network that is designed
              properly.
            </p>
            <p>
              Studio KRiX works with structured network layouts, wired
              backbones, PoE infrastructure, wireless coverage, segmented
              services and practical monitoring.
            </p>
          </div>
          <CapabilityList
            items={networkCapabilities}
            label="Network infrastructure capabilities"
          />
        </div>
      </section>

      <section
        className="connected-capability connected-capability--alternate"
        id="unifi-security"
        aria-labelledby="unifi-security-title"
      >
        <div className="site-container connected-capability__grid">
          <div className="connected-capability__copy">
            <p className="section-label">02 · Visibility</p>
            <h2 id="unifi-security-title">UniFi, cameras and access</h2>
            <p>
              A unified ecosystem can make network and security operations
              easier to understand, maintain and monitor.
            </p>
            <p className="connected-capability__statement">
              Visibility and control without unnecessary complexity.
            </p>
            <p>
              Work is framed around generic system capabilities, responsible
              administration and privacy-conscious presentation—not private
              site details.
            </p>
          </div>
          <CapabilityList
            items={unifiCapabilities}
            label="UniFi and security capabilities"
          />
        </div>
      </section>

      <section
        className="connected-capability"
        id="home-automation"
        aria-labelledby="home-automation-title"
      >
        <div className="site-container connected-capability__grid">
          <div className="connected-capability__copy">
            <p className="section-label">03 · Everyday operation</p>
            <h2 id="home-automation-title">Home automation</h2>
            <p>
              Good automation should remove friction rather than create
              another system that needs babysitting.
            </p>
            <p>
              Studio KRiX explores automations that connect devices, schedules,
              sensors and everyday routines while preserving simple manual
              control and local-first integration where practical.
            </p>
            <div className="connected-technology-note">
              <strong>Integration direction</strong>
              <p>
                Depending on the environment, concepts can draw on Home
                Assistant, HomeKit, Matter, MQTT, REST APIs, webhooks and local
                device integrations. These are potential integration paths,
                not claims about a specific deployed system.
              </p>
            </div>
            <div className="connected-capability__detail-link">
              <ButtonLink
                href="/connected-systems/home-automation"
                variant="secondary"
              >
                Explore Home Automation
              </ButtonLink>
            </div>
          </div>
          <CapabilityList
            items={automationCapabilities}
            label="Home automation capabilities"
          />
        </div>
      </section>

      <section
        className="connected-capability connected-capability--casa"
        id="casa-integration"
        aria-labelledby="casa-integration-title"
      >
        <div className="site-container connected-capability__grid">
          <div className="connected-capability__copy">
            <p className="section-label">04 · Evolving direction</p>
            <h2 id="casa-integration-title">
              Casa as the orchestration layer
            </h2>
            <p>
              Casa is being developed as a practical household operations
              platform.
            </p>
            <p>
              Rather than replacing specialist systems such as networking,
              cameras or automation controllers, Casa can provide a simpler
              layer above them, bringing selected information, alerts, tasks
              and actions into one place.
            </p>
            <div className="connected-direction-card">
              <span>Product direction</span>
              <strong>Designed to integrate, still evolving.</strong>
              <p>
                Casa supports the concept of a future orchestration layer.
                Direct camera streaming, access control and network
                administration are not presented here as completed features.
              </p>
            </div>
            <ButtonLink
              className="connected-capability__detail-link"
              href="/casa"
              variant="secondary"
            >
              Explore Casa
            </ButtonLink>
          </div>
          <CapabilityList
            items={casaIntegrations}
            label="Potential Casa integrations"
          />
        </div>
      </section>

      <section
        className="connected-environments"
        aria-labelledby="connected-environments-title"
      >
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">Real-world work</p>
              <h2 id="connected-environments-title">
                Built around practical environments
              </h2>
            </div>
            <p>
              Broad, anonymised examples of the environments and systems that
              inform this capability.
            </p>
          </div>
          <div className="connected-environments__grid">
            {practicalEnvironments.map((environment, index) => (
              <article key={environment}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{environment}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="connected-security"
        aria-labelledby="connected-security-title"
      >
        <div className="site-container connected-security__grid">
          <div>
            <p className="section-label">Responsible architecture</p>
            <h2 id="connected-security-title">Security by design</h2>
            <p>
              Connected environments are planned with sensible boundaries,
              limited exposure and long-term maintainability in mind. The
              principles are public; actionable private configuration is not.
            </p>
          </div>
          <ul>
            {securityPrinciples.map((principle) => (
              <li key={principle}>
                <span aria-hidden="true" />
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="connected-related"
        aria-labelledby="connected-related-title"
      >
        <div className="site-container">
          <div className="directory-heading">
            <div>
              <p className="section-label">More Studio KRiX work</p>
              <h2 id="connected-related-title">Related work</h2>
            </div>
          </div>
          <div className="connected-related__grid">
            <Link className="connected-related__project" href="/ohmxact">
              <span>Software · iPhone and iPad</span>
              <h3>OhmXact</h3>
              <p>
                Focused software designed around practical workshop needs and
                a clear interface.
              </p>
              <ArrowRightIcon />
            </Link>
            <Link
              className="connected-related__project"
              href="/projects/monde-soniq"
            >
              <span>Music · Events · Creative infrastructure</span>
              <h3>Monde Soniq</h3>
              <p>
                Operational, digital and creative infrastructure supporting an
                independent music platform.
              </p>
              <ArrowRightIcon />
            </Link>
            <Link
              className="connected-related__project"
              href="/professional"
            >
              <span>Engineering · Software · Systems</span>
              <h3>Professional Profile</h3>
              <p>
                The practical engineering, technology and documentation
                capabilities behind the work.
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
