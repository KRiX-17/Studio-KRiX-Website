import Link from "next/link";
import { LinkIcon } from "@/components/link-icons";
import { StudioKrixLogo } from "@/components/studio-krix-logo";
import { siteConfig } from "@/config/site";
import { linksHubItems } from "@/data/links";

const footerSocialNames = ["Instagram", "TikTok", "YouTube", "SoundCloud"] as const;
const footerMusicNames = ["Spotify", "Apple Music", "TIDAL"] as const;

const socialLinks = footerSocialNames.flatMap((name) => {
  const item = linksHubItems.find(
    (candidate) => candidate.title === name && candidate.category === "social",
  );
  return item ? [item] : [];
});

const musicLinks = footerMusicNames.flatMap((name) => {
  const item = linksHubItems.find(
    (candidate) => candidate.title === name && candidate.category === "music",
  );
  return item ? [item] : [];
});

function FooterIconLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: (typeof socialLinks)[number]["icon"] | (typeof musicLinks)[number]["icon"];
  label: string;
}) {
  return (
    <a
      aria-label={label}
      className="site-footer__social-link"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={label}
    >
      <LinkIcon name={icon} />
      <span className="sr-only">{label}</span>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <div className="site-footer__brand">
          <Link
            aria-label="Studio KRiX home"
            className="site-footer__identity"
            href="/"
          >
            <StudioKrixLogo
              className="site-footer__logo"
              decorative
              sizes="48px"
            />
            <span className="wordmark">Studio KRiX</span>
          </Link>
          <span>{siteConfig.location}</span>
        </div>

        <div className="site-footer__networks">
          <div className="site-footer__network-group">
            <span className="site-footer__network-label">Follow</span>
            <div className="site-footer__socials">
              {socialLinks.map((item) => (
                <FooterIconLink
                  href={item.href}
                  icon={item.icon}
                  key={item.href}
                  label={item.title}
                />
              ))}
            </div>
          </div>

          <div className="site-footer__network-group">
            <span className="site-footer__network-label">Listen</span>
            <div className="site-footer__socials">
              {musicLinks.map((item) => (
                <FooterIconLink
                  href={item.href}
                  icon={item.icon}
                  key={item.href}
                  label={item.title}
                />
              ))}
            </div>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {siteConfig.footerNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="site-footer__copyright">© 2026 Studio KRiX</p>
      </div>
    </footer>
  );
}
