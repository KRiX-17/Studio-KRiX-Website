import { ButtonLink } from "@/components/button-link";
import { LinkIcon } from "@/components/link-icons";
import { getLinksByCategory } from "@/data/links";

const trackLinks = getLinksByCategory("track");

export function FeaturedMusic() {
  return (
    <section className="featured-music" id="music">
      <div className="site-container featured-music__grid">
        <div className="featured-music__intro">
          <h2>Music by KRiX</h2>
          <p>Electronic music shaped by atmosphere, rhythm and emotion.</p>
          <ButtonLink href="/music" variant="secondary">
            Explore Music
          </ButtonLink>
        </div>

        <div className="featured-music__release">
          <div>
            <p className="music-feature__label">Featured release</p>
            <h3>Keep Walking Your Path</h3>
          </div>
          <div className="featured-music__actions">
            {trackLinks.map((item, index) => (
              <ButtonLink
                className="featured-music__service"
                external
                href={item.href}
                key={item.href}
                variant={index === 0 ? "primary" : "secondary"}
              >
                <LinkIcon name={item.icon} />
                Listen on {item.title}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
