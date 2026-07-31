import { ArrowUpRightIcon } from "@/components/icons";
import { LinkIcon } from "@/components/link-icons";
import {
  getLinksByCategory,
  getMusicServiceLinks,
} from "@/data/links";

const musicServices = getMusicServiceLinks();
const trackLinks = getLinksByCategory("track");

function ExternalLabel() {
  return <span className="sr-only">(opens in a new tab)</span>;
}

export function MusicSection() {
  return (
    <section className="music-section" id="music">
      <div className="site-container">
        <div className="music-section__intro">
          <h2>Music by KRiX</h2>
          <p>Electronic music shaped by atmosphere, rhythm and emotion.</p>
        </div>

        <div className="music-feature">
          <div>
            <p className="music-feature__label">Released track</p>
            <h3>Keep Walking Your Path</h3>
          </div>
          <div className="music-feature__actions">
            {trackLinks.map((item, index) => (
              <a
                className={`music-action ${index === 0 ? "music-action--primary" : ""}`}
                href={item.href}
                key={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <LinkIcon name={item.icon} />
                <span>Listen on {item.title}</span>
                <ArrowUpRightIcon />
                <ExternalLabel />
              </a>
            ))}
          </div>
        </div>

        <p className="music-services__label">Find KRiX on</p>
        <div className="music-services">
          {musicServices.map((item) => (
            <a
              className="music-service"
              href={item.href}
              key={item.href}
              rel="noreferrer"
              target="_blank"
            >
              <LinkIcon name={item.icon} />
              <span>{item.title}</span>
              <ArrowUpRightIcon />
              <ExternalLabel />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
