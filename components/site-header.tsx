import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link className="wordmark" href="/" aria-label="Studio KRiX home">
          Studio KRiX
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
          <MobileNavigation items={siteConfig.navigation} />
        </div>
      </div>
    </header>
  );
}
