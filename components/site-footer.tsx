import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <div className="site-footer__brand">
          <Link className="wordmark" href="/">
            Studio KRiX
          </Link>
          <span>{siteConfig.location}</span>
        </div>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          {siteConfig.footerNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="site-footer__copyright">
          © {new Date().getFullYear()} Studio KRiX
        </p>
      </div>
    </footer>
  );
}
