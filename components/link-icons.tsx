import type { SVGProps } from "react";
import type { LinkIconName } from "@/data/links";

type LinkIconProps = SVGProps<SVGSVGElement> & {
  name: LinkIconName;
};

const sharedProps = {
  "aria-hidden": true,
  fill: "none",
  focusable: false,
  viewBox: "0 0 24 24",
} as const;

export function LinkIcon({ name, ...props }: LinkIconProps) {
  switch (name) {
    case "studio":
      return (
        <svg {...sharedProps} {...props}>
          <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M3.9 12h16.2M12 3.75c2.2 2.3 3.4 5.05 3.4 8.25S14.2 17.95 12 20.25C9.8 17.95 8.6 15.2 8.6 12S9.8 6.05 12 3.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "resistor":
      return (
        <svg {...sharedProps} {...props}>
          <path
            d="M2.75 12H6l1.6-3.25 2.75 6.5 3.3-6.5 2.75 6.5L18 12h3.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg {...sharedProps} {...props}>
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...sharedProps} {...props}>
          <path
            d="M13.75 4.25v10.1a4.35 4.35 0 1 1-3.4-4.25v2.85a1.75 1.75 0 1 0 .8 1.47V3.75h2.6c.45 2.25 1.85 3.6 4.5 3.95v2.55c-1.8-.1-3.3-.7-4.5-1.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg {...sharedProps} {...props}>
          <path
            d="M20.35 7.25c-.2-.85-.85-1.5-1.7-1.72C17.15 5.1 15.6 5 12 5s-5.15.1-6.65.53c-.85.22-1.5.87-1.7 1.72C3.25 8.75 3.2 10.1 3.2 12s.05 3.25.45 4.75c.2.85.85 1.5 1.7 1.72C6.85 18.9 8.4 19 12 19s5.15-.1 6.65-.53c.85-.22 1.5-.87 1.7-1.72.4-1.5.45-2.85.45-4.75s-.05-3.25-.45-4.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
        </svg>
      );
    case "soundcloud":
      return (
        <svg {...sharedProps} {...props}>
          <path
            d="M4 13.2v3.3M6.5 11.6v4.9M9 10v6.5M11.5 8.6v7.9M14 9.2v7.3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M14 16.5h4.3a2.7 2.7 0 0 0 .15-5.4 4.5 4.5 0 0 0-8.55-1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "spotify":
      return (
        <svg {...sharedProps} {...props}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M7.25 9.3c3.6-1.05 7.35-.7 10.25.85M7.85 12.4c3.15-.75 6.35-.45 8.85.85M8.45 15.25c2.55-.55 5-.3 7.15.75"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "apple-music":
      return (
        <svg {...sharedProps} {...props}>
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M14.8 8.1v7.05a2.1 2.1 0 1 1-1.25-1.92V9.4l-5 1.05v5.65a2.1 2.1 0 1 1-1.25-1.92V9.25l7.5-1.55v.4Z"
            fill="currentColor"
          />
        </svg>
      );
    case "tidal":
      return (
        <svg {...sharedProps} {...props}>
          <path
            d="m7 5.5 3 3-3 3-3-3 3-3Zm10 0 3 3-3 3-3-3 3-3Zm-5 5 3 3-3 3-3-3 3-3Zm0-10 3 3-3 3-3-3 3-3Z"
            fill="currentColor"
          />
        </svg>
      );
    case "deezer":
      return (
        <svg {...sharedProps} {...props}>
          <path
            d="M4 16.5h2.5M4 13.5h2.5M8.5 16.5H11M8.5 12H11m2-1.5h2.5M13 16.5h2.5M17.5 7.5H20m-2.5 3H20m-2.5 3H20m-2.5 3H20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...sharedProps} {...props}>
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 10v6M8 7.75v.1M11.5 16v-3.4c0-1.45.85-2.35 2.15-2.35 1.25 0 2.35.8 2.35 2.5V16M11.5 10.5V16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "github":
      return (
        <svg {...sharedProps} {...props}>
          <path
            d="M12 3.75a8.25 8.25 0 0 0-2.6 16.08c.4.08.55-.17.55-.38v-1.6c-2.25.49-2.73-.96-2.73-.96-.36-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.81.06 1.24.83 1.24.83.72 1.24 1.9.88 2.36.67.07-.52.28-.88.51-1.08-1.8-.2-3.69-.9-3.69-4a3.14 3.14 0 0 1 .83-2.17 2.9 2.9 0 0 1 .08-2.14s.68-.22 2.23.83a7.7 7.7 0 0 1 4.06 0c1.55-1.05 2.23-.83 2.23-.83.44 1.08.16 1.87.08 2.14.52.57.83 1.3.83 2.17 0 3.1-1.9 3.8-3.7 4 .3.25.55.75.55 1.52v2.27c0 .21.15.46.56.38A8.25 8.25 0 0 0 12 3.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </svg>
      );
    case "email":
      return (
        <svg {...sharedProps} {...props}>
          <rect
            x="3.5"
            y="5.5"
            width="17"
            height="13"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m4.5 7 7.5 6 7.5-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      );
  }
}
