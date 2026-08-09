import type { CSSProperties, ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";
type RevealElement =
  | "article"
  | "aside"
  | "div"
  | "figure"
  | "li"
  | "nav"
  | "ol"
  | "section"
  | "ul";

type RevealProps = {
  as?: RevealElement;
  ariaLabel?: string;
  blur?: number;
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  disabled?: boolean;
  distance?: number;
};

type RevealStyle = CSSProperties & {
  "--reveal-blur": string;
  "--reveal-delay": string;
  "--reveal-y": string;
};

export function getRevealOffset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "down":
      return -distance;
    case "none":
      return 0;
    case "left":
    case "right":
    case "up":
    default:
      return distance;
  }
}

export function Reveal({
  as: Component = "div",
  ariaLabel,
  blur = 3,
  children,
  className,
  delay = 0,
  direction = "up",
  disabled = false,
  distance = 24,
}: RevealProps) {
  const safeDistance = Math.min(Math.max(distance, 0), 80);
  const safeDelay = Math.min(Math.max(delay, 0), 0.24);
  const safeBlur = Math.min(Math.max(blur, 0), 6);
  const offset = getRevealOffset(direction, safeDistance);
  const style: RevealStyle = {
    "--reveal-blur": `${safeBlur}px`,
    "--reveal-delay": `${safeDelay * 1000}ms`,
    "--reveal-y": `${offset}px`,
  };

  return (
    <Component
      className={["scroll-reveal", className].filter(Boolean).join(" ")}
      data-reveal={disabled ? undefined : ""}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </Component>
  );
}
