import Link from "next/link";
import { MobileNavigation } from "@/components/mobile-navigation";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link className="wordmark" href="/" aria-label="Studio KRiX home">
          Studio KRiX
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileNavigation items={siteConfig.navigation} />
      </div>
    </header>
  );
}
