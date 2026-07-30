"use client";

import Link from "next/link";
import { useRef } from "react";
import { MenuIcon } from "@/components/icons";
import type { NavigationItem } from "@/config/site";

type MobileNavigationProps = {
  items: readonly NavigationItem[];
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeNavigation() {
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <details className="mobile-nav" ref={detailsRef}>
      <summary aria-label="Open navigation">
        <span>Menu</span>
        <MenuIcon />
      </summary>
      <nav aria-label="Mobile navigation">
        {items.map((item, index) => (
          <Link href={item.href} key={item.href} onNavigate={closeNavigation}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
