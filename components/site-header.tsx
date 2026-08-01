import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";
import { StudioKrixLogo } from "@/components/studio-krix-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link className="site-brand" href="/" aria-label="Studio KRiX home">
          <StudioKrixLogo
            className="site-brand__logo"
            priority
            sizes="(max-width: 680px) 34px, 38px"
          />
          <span className="wordmark">Studio KRiX</span>
        </Link>

        <div className="site-header__actions">
          <nav className="desktop-nav" aria-label="Primary navigation">
            {siteConfig.navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <MobileNavigation items={siteConfig.mobileNavigation} />
        </div>
      </div>
    </header>
  );
}
