import Image from "next/image";
import { DeviceMockup } from "@/components/device-mockup";

const lakazAreas = [
  "Household",
  "Tasks",
  "Maintenance",
  "Connected home",
  "Energy",
  "Notifications",
] as const;

export function HomeHeroVisual() {
  return (
    <figure className="home-hero-visual">
      <div className="home-hero-visual__engineering">
        <Image
          alt="Precision-engineered mechanical component with illuminated technical linework."
          fill
          priority
          quality={75}
          sizes="(max-width: 960px) calc(100vw - 2.5rem), 46vw"
          src="/images/studio-krix-precision-engineering.png"
        />
      </div>

      <section
        aria-label="Lakaz concept interface"
        className="home-hero-visual__lakaz"
      >
        <div className="home-hero-visual__lakaz-heading">
          <span aria-hidden="true">LK</span>
          <div>
            <strong>Lakaz</strong>
            <small>Concept interface</small>
          </div>
        </div>

        <div className="home-hero-visual__lakaz-body">
          <ul aria-label="Lakaz concept areas">
            {lakazAreas.map((area, index) => (
              <li className={index === 0 ? "is-active" : undefined} key={area}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {area}
              </li>
            ))}
          </ul>

          <div
            aria-label="Conceptual Connected Systems and UniFi infrastructure from gateway to managed switch and household systems"
            className="home-hero-visual__network"
            role="img"
          >
            <span className="home-hero-visual__network-label">
              Connected systems / UniFi
            </span>
            <span className="home-hero-visual__network-node home-hero-visual__network-node--gateway">
              Gateway
            </span>
            <i aria-hidden="true" />
            <span className="home-hero-visual__network-node home-hero-visual__network-node--switch">
              Managed switch
            </span>
            <div aria-hidden="true" className="home-hero-visual__network-ports">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <div className="home-hero-visual__music">
        <Image
          alt="Monde Soniq Brain to Brain electronic music event artwork."
          fill
          quality={75}
          sizes="(max-width: 680px) 46vw, (max-width: 960px) 36vw, 18vw"
          src="/images/monde-soniq/brain-to-brain.webp"
        />
      </div>

      <div className="home-hero-visual__phone">
        <DeviceMockup
          alt="OhmXact home screen running on iPhone."
          device="iphone"
          height={2778}
          quality={92}
          sizes="(max-width: 680px) 44vw, (max-width: 960px) 28vw, 17vw"
          src="/images/ohmxact/home.webp"
          width={1284}
        />
      </div>

      <div className="home-hero-visual__models">
        <span aria-hidden="true" />
        <div>
          <strong>Local models</strong>
          <small>Qwen3 · Gemma 3 · gpt-oss · Devstral</small>
        </div>
      </div>

      <span className="home-hero-visual__glow" aria-hidden="true" />
    </figure>
  );
}
