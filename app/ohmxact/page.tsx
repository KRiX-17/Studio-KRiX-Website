import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { DeviceMockups } from "@/components/device-mockups";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/config/site";
import { OHMXACT_APP_STORE_URL } from "@/data/links";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "OhmXact 2.0.3 Electrical Workshop Toolkit",
  description:
    "OhmXact 2.0.3 is an electrical calculator and project workspace for iPhone and iPad, with resistor, automotive electrical, voltage drop, cable sizing, fuse sizing and EV charging tools. Native Mac support is coming very soon.",
  path: "/ohmxact",
});

const coreToolGroups = [
  {
    title: "Resistance, made practical",
    tools: [
      "Series and parallel resistance",
      "Ohm’s Law, power and voltage divider",
      "LED resistor",
      "Resistor colour codes and SMD / EIA-96",
      "E-series and target resistance solving",
    ],
  },
  {
    title: "Electrical essentials",
    tools: [
      "Stock-aware target resistance solving",
      "Saved History and Reference",
      "Configurable Home workspace",
      "Local PDF reports",
    ],
  },
  {
    title: "Workshop and vehicle work",
    tools: [
      "Automotive voltage drop",
      "Cable sizing, fuse sizing and relay / load",
      "Battery runtime",
      "EV charging workflows",
    ],
  },
] as const;

const platforms = [
  {
    name: "iPhone",
    status: "Available now",
    description:
      "The current primary release for fast, focused electrical work in the workshop or field.",
  },
  {
    name: "iPad",
    status: "Available now",
    description:
      "The current primary release for fast, focused electrical work in the workshop or field.",
  },
  {
    name: "Mac",
    status: "Coming very soon",
    description:
      "A native desktop workspace centred on Projects, Workshop Library and wide-screen workflows.",
  },
  {
    name: "Android",
    status: "Coming soon",
    description:
      "A native Material 3 implementation shaped for Android workflows.",
  },
  {
    name: "Windows",
    status: "Coming soon",
    description:
      "A future desktop companion as the platform continues to expand.",
  },
] as const;

const softwareStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OhmXact 2.0.3",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "iOS, iPadOS",
  description:
    "An electrical calculation and project workspace for practical work on iPhone and iPad.",
  creator: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "AUD",
  },
};

export default function OhmXactPage() {
  return (
    <>
      <section className="ohmxact-hero">
        <div className="site-container ohmxact-hero__grid">
          <div className="ohmxact-hero__copy">
            <div className="ohmxact-hero__brand">
              <Image
                alt="Cyan and metallic-blue Omega X OhmXact app icon"
                height={1024}
                priority
                src="/images/ohmxact-omega-x.png"
                width={1024}
              />
              <p>ΩX · OhmXact</p>
            </div>
            <p className="section-label">OhmXact 2.0.3 · Electrical workspace</p>
            <h1>Built for the work behind the numbers.</h1>
            <p className="ohmxact-hero__lede">
              Now available on iPhone and iPad: fast electrical calculations,
              saved work, Projects and workshop tools in one focused workspace.
            </p>
            <div className="ohmxact-hero__actions">
              <ButtonLink external href={OHMXACT_APP_STORE_URL}>
                View on the App Store
              </ButtonLink>
              <a className="ohmxact-hero__roadmap" href="#platforms">
                iPhone + iPad available now · Mac coming very soon
              </a>
            </div>
          </div>
          <Reveal className="ohmxact-hero__devices" delay={0.08}>
            <DeviceMockups priority />
          </Reveal>
        </div>
      </section>

      <section className="ohmxact-intro">
        <div className="site-container ohmxact-intro__grid">
          <div>
            <p className="section-label">More than a resistor calculator</p>
            <h2>A workspace that remembers the job.</h2>
          </div>
          <div>
            <p>
              OhmXact 2.0.3 combines core electrical tools with Projects,
              saved History, comparison workflows and a Workshop Library for
              the parts and references that matter to your work.
            </p>
            <p>
              A configurable Home keeps the tools you reach for closest. The
              workspace stays practical, local and ready for repeat work.
            </p>
          </div>
        </div>
      </section>

      <section className="ohmxact-tools">
        <div className="site-container">
          <div className="ohmxact-section-heading">
            <div>
              <p className="section-label">Core tools</p>
              <h2>From the bench to the vehicle.</h2>
            </div>
            <p>
              A compact toolkit for the everyday electrical problems that
              deserve a clear answer.
            </p>
          </div>
          <div className="ohmxact-tool-groups">
            {coreToolGroups.map((group, index) => (
              <Reveal className="ohmxact-tool-group" key={group.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ohmxact-workspace">
        <div className="site-container ohmxact-workspace__grid">
          <Reveal className="ohmxact-workspace__statement">
            <p className="section-label">Projects + Workshop</p>
            <h2>Keep context with the calculation.</h2>
            <p>
              Projects collect saved calculations, notes and the comparisons
              that help make a decision. Duplicate and Compare workflows keep
              alternatives side by side instead of starting again.
            </p>
          </Reveal>
          <div className="ohmxact-workspace__details">
            <article>
              <span>01</span>
              <h3>Projects and saved work</h3>
              <p>
                Return to useful calculations, retain a clear history and
                organise repeat work around the project rather than a single
                screen.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Workshop Library</h3>
              <p>
                Keep resistor, cable, fuse and reference stock close at hand,
                including stock-aware target resistance solving.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="ohmxact-reports">
        <div className="site-container ohmxact-reports__grid">
          <div>
            <p className="section-label">Reports</p>
            <h2>Clear handover, without leaving the job.</h2>
          </div>
          <div>
            <p>
              Create local PDF reports in Compact, Detailed or Professional
              styles. Report language can be selected independently, so the
              document fits its audience while the workflow stays private and
              offline-first.
            </p>
            <p className="ohmxact-reports__note">
              Calculations, saved work and reports are designed to stay on the
              device. No advertising. No analytics or tracking in the current
              app workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="ohmxact-tiers">
        <div className="site-container ohmxact-tiers__grid">
          <div>
            <p className="section-label">Pro / Pro+</p>
            <h2>Pay once. Keep the toolkit.</h2>
          </div>
          <div className="ohmxact-tiers__content">
            <p>
              Pro and Pro+ are available now on iPhone and iPad as one-time
              purchases for the broader workspace. No subscription.
            </p>
            <dl>
              <div>
                <dt>Pro</dt>
                <dd>A$9.99 one-time</dd>
              </div>
              <div>
                <dt>Pro+</dt>
                <dd>A$19.99 one-time</dd>
              </div>
              <div>
                <dt>Pro → Pro+ upgrade</dt>
                <dd>A$9.99 one-time</dd>
              </div>
            </dl>
            <p className="ohmxact-tiers__disclaimer">
              Purchases apply to the available iPhone and iPad release. Native
              Mac availability will follow when the Mac app is publicly
              released.
            </p>
          </div>
        </div>
      </section>

      <section className="ohmxact-platforms" id="platforms">
        <div className="site-container">
          <div className="ohmxact-section-heading">
            <div>
              <p className="section-label">Platform roadmap</p>
              <h2>One workspace, more places to work.</h2>
            </div>
            <p>
              Available now on iPhone and iPad, with native Mac support coming
              very soon and Android and Windows following.
            </p>
          </div>
          <div className="ohmxact-platform-list">
            {platforms.map((platform, index) => (
              <Reveal className="ohmxact-platform" key={platform.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{platform.name}</h3>
                <strong>{platform.status}</strong>
                <p>{platform.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ohmxact-mac">
        <div className="site-container ohmxact-mac__grid">
          <div>
            <p className="section-label">Native Mac support</p>
            <h2>OhmXact for Mac is nearly here.</h2>
          </div>
          <div>
            <p>
              The native macOS interface brings a contextual Inspector,
              Projects, Workshop Library, electrical and automotive tools into
              a desktop-focused workspace.
            </p>
            <p className="ohmxact-mac__note">
              It is designed around a universal-purchase architecture and will
              be available when the native Mac release is publicly approved.
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        description="Get the current iPhone and iPad release, or find support and privacy information before you start."
        external
        href={OHMXACT_APP_STORE_URL}
        linkLabel="View OhmXact on the App Store"
        title="Put the electrical workspace in your pocket."
      />
      <JsonLd data={softwareStructuredData} />
    </>
  );
}
