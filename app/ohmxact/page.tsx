import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { DeviceMockups } from "@/components/device-mockups";
import { Reveal } from "@/components/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "OhmXact",
  description:
    "Fast, focused resistor calculations for iPhone and iPad. Built for the workshop, the bench, and your pocket.",
  path: "/ohmxact",
});

const capabilities = [
  {
    title: "Fast calculations",
    description: "Move from colour bands to resistance values quickly.",
  },
  {
    title: "Built for Apple devices",
    description: "A focused experience for iPhone and iPad.",
  },
  {
    title: "Ready where work happens",
    description:
      "Designed for the workshop, the bench and everyday field use.",
  },
] as const;

const softwareStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OhmXact",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "iOS, iPadOS",
  description:
    "A focused electrical resistor calculation app for iPhone and iPad.",
  creator: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function OhmXactPage() {
  return (
    <>
      <section className="product-hero">
        <div className="site-container product-hero__grid">
          <Reveal className="product-hero__copy">
            <h1>OhmXact</h1>
            <p className="product-hero__tagline">
              Built for the workshop, the bench, and your pocket.
            </p>
            <p className="body-muted">
              Fast, focused resistor calculations for iPhone and iPad.
            </p>
            <div className="product-hero__actions">
              <span className="button-placeholder" aria-disabled="true">
                App Store — coming soon
              </span>
              <ButtonLink href="/support" variant="text">
                Get support
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal className="product-hero__devices" delay={0.08}>
            <DeviceMockups />
          </Reveal>
        </div>
      </section>

      <section className="capabilities">
        <div className="site-container capabilities__grid">
          <Reveal>
            <h2>
              The answer, <em>without</em> the detour.
            </h2>
          </Reveal>
          <div className="capability-list">
            {capabilities.map((capability, index) => (
              <Reveal
                className="capability-row"
                delay={index * 0.04}
                key={capability.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="product-detail">
        <div className="site-container product-detail__grid">
          <div className="section-rule">
            <span>Designed with purpose</span>
            <span>iPhone + iPad</span>
          </div>
          <Reveal className="product-detail__statement">
            <p>
              OhmXact is designed to keep the calculation clear and the
              interface out of the way.
            </p>
          </Reveal>
          <div className="product-detail__links">
            <Link href="/support">Product support</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </section>

      <FinalCta
        description="Questions about OhmXact are welcome."
        title={
          <>
            Need a hand with <em>OhmXact?</em>
          </>
        }
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareStructuredData),
        }}
        type="application/ld+json"
      />
    </>
  );
}
