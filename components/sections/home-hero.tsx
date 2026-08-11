import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { HomeHeroVisual } from "@/components/sections/home-hero-visual";
import { Reveal } from "@/components/reveal";

const homeCapabilities = [
  { label: "Software & Apps", href: "/projects" },
  { label: "Connected Systems", href: "/connected-systems" },
  { label: "Networking & PoE", href: "/connected-systems" },
  { label: "Home Automation", href: "/connected-systems/home-automation" },
  { label: "Local AI", href: "/connected-systems/local-ai" },
  { label: "Automotive & Electrical", href: "/professional" },
  { label: "Music Production", href: "/music" },
] as const;

export function HomeHero() {
  return (
    <section className="home-hero" id="home">
      <div className="site-container home-hero__grid">
        <Reveal className="home-hero__copy">
          <p className="home-hero__eyebrow">
            Christopher Helene <span aria-hidden="true">·</span> KRiX{" "}
            <span aria-hidden="true">·</span> Studio KRiX
          </p>
          <h1>
            <span>Technology, engineering </span>
            <span>and music brought together.</span>
          </h1>
          <p className="home-hero__lede">
            Studio KRiX brings together software development, connected
            systems, networking, home automation, local AI, automotive and
            electrical technology, and electronic music.
          </p>
          <p className="home-hero__support">
            From practical apps like OhmXact and evolving platforms like Lakaz
            to managed network infrastructure, intelligent automation and
            creative production, I explore how technology can solve real
            problems and create better experiences.
          </p>
          <nav
            aria-label="Studio KRiX capabilities"
            className="home-hero__capabilities"
          >
            <ul>
              {homeCapabilities.map((capability) => (
                <li key={capability.label}>
                  <Link href={capability.href}>{capability.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="home-hero__actions">
            <ButtonLink href="/music">Explore Music</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              View Projects
            </ButtonLink>
            <ButtonLink href="/professional" variant="secondary">
              Professional Profile
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="home-hero__media" delay={0.08} direction="left">
          <HomeHeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
