"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/admin/shell.module.css";

const groups = [
  { label: "WORKSPACE", items: [{ href: "/admin", label: "Overview", icon: "▦" }, { href: "/admin/demo", label: "Demo gallery", icon: "◫" }] },
  { label: "MANAGE", items: [{ href: "/admin#new-gallery", label: "New gallery", icon: "+" }, { href: "/admin/users", label: "Clients & users", icon: "♙" }] },
  { label: "SYSTEM", items: [{ href: "/admin/monitoring", label: "Monitoring", icon: "◉" }, { href: "/admin/audit", label: "Audit & downloads", icon: "≡" }] },
];

export function AdminNavigation() {
  const pathname = usePathname();
  return <nav aria-label="Admin navigation" className={styles.nav}>
    {groups.map((group) => <div className={styles.navGroup} key={group.label}>
      <span className={styles.navLabel}>{group.label}</span>
      {group.items.map((item) => <Link
        aria-current={pathname === item.href ? "page" : undefined}
        href={item.href}
        key={item.href}
      ><span aria-hidden="true" className={styles.navIcon}>{item.icon}</span>{item.label}</Link>)}
    </div>)}
  </nav>;
}
