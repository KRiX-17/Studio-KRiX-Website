import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const classes = `button-link button-link--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {external ? (
        <ArrowUpRightIcon className="button-link__icon" />
      ) : (
        <ArrowRightIcon className="button-link__icon" />
      )}
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a
        className={classes}
        href={href}
        rel={external ? "noopener noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
