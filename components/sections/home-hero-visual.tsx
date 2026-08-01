import Image from "next/image";
import { DeviceMockup } from "@/components/device-mockup";
import { StudioKrixLogo } from "@/components/studio-krix-logo";

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
          alt="OhmXact resistance calculator running on iPhone."
          device="iphone"
          height={2778}
          quality={92}
          sizes="(max-width: 680px) 44vw, (max-width: 960px) 28vw, 17vw"
          src="/images/ohmxact-iphone-dark.png"
          width={1284}
        />
      </div>

      <div className="home-hero-visual__brand" aria-hidden="true">
        <StudioKrixLogo
          className="home-hero-visual__logo"
          decorative
          sizes="(max-width: 680px) 48px, 64px"
        />
      </div>

      <span className="home-hero-visual__gold-line" aria-hidden="true" />
      <span className="home-hero-visual__glow" aria-hidden="true" />
    </figure>
  );
}
