import Link from "next/link";
import { StudioKrixLogo } from "@/components/studio-krix-logo";
import { LinkIcon } from "@/components/link-icons";
import { linksHubItems } from "@/data/links";
import { siteConfig } from "@/config/site";

const socialNames = ["Instagram", "YouTube", "SoundCloud", "Spotify", "GitHub", "LinkedIn"];
const socialLinks = socialNames.flatMap((name) => {
  const item = linksHubItems.find((link) => link.title === name &&
    (link.category === "social" || link.category === "music"));
  return item ? [item] : [];
});

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
        <div className="site-footer__right">
          <nav className="site-footer__social" aria-label="Social profiles">
            {socialLinks.map((item) => (
              <a aria-label={item.title} href={item.href} key={item.href} rel="noopener noreferrer" target="_blank" title={item.title}>
                <LinkIcon name={item.icon} />
              </a>
            ))}
          </nav>
          <div className="site-footer__bottom">
            <span>© {new Date().getFullYear()} Studio KRiX</span>
            <nav aria-label="Footer utilities">
              {siteConfig.footerNavigation.map((item) => (
                <Link href={item.href} key={item.href}>{item.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
