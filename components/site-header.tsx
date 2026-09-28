"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { StudioKrixLogo } from "@/components/studio-krix-logo";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navigation = isHome ? siteConfig.homeNavigation : siteConfig.navigation;
  const mobileNavigation = isHome
    ? siteConfig.homeMobileNavigation
    : siteConfig.mobileNavigation;

  return (
    <header className="site-header">
      <span className="site-current site-current--header" aria-hidden="true" />
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
            {navigation.map((item) => (
              <Link
                aria-current={pathname === item.href ? "page" : undefined}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="portal-entry" href="/login">
            Portal
          </Link>
          <MobileNavigation items={mobileNavigation} />
        </div>
      </div>
    </header>
  );
}
