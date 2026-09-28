import Image from "next/image";

type DeviceMockupsProps = {
  compact?: boolean;
};

const screens = [
  {
    src: "/images/ohmxact/home.webp",
    alt: "OhmXact home screen with electrical tools and recent calculations",
    label: "Home",
  },
  {
    src: "/images/ohmxact/colour-code-setup.webp",
    alt: "Resistor Colour Code screen with four band settings ready to decode",
    label: "Colour Code setup",
  },
  {
    src: "/images/ohmxact/colour-code-result.webp",
    alt: "OhmXact Resistor Colour Code result showing 1 kΩ",
    label: "1 kΩ result",
  },
] as const;

export function DeviceMockups({ compact = false }: DeviceMockupsProps) {
  return (
    <div className={`ohmxact-screens ${compact ? "ohmxact-screens--compact" : ""}`} role="group" aria-label="OhmXact app screenshots">
      {screens.map((screen, index) => (
        <figure className={`ohmxact-screens__screen ${index === 0 ? "ohmxact-screens__screen--primary" : ""}`} key={screen.src}>
          <Image
            alt={screen.alt}
            height={2778}
            priority={index === 0 && !compact}
            sizes={index === 0 ? "(max-width: 680px) 47vw, 22vw" : "(max-width: 680px) 20vw, 12vw"}
            src={screen.src}
            width={1284}
          />
          <figcaption>{screen.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
