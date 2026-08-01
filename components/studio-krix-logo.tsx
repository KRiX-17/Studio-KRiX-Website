import Image from "next/image";

type StudioKrixLogoProps = {
  className?: string;
  decorative?: boolean;
  priority?: boolean;
  sizes: string;
};

export function StudioKrixLogo({
  className,
  decorative = false,
  priority = false,
  sizes,
}: StudioKrixLogoProps) {
  return (
    <Image
      alt={decorative ? "" : "Studio KRiX SK logo"}
      className={className}
      height={1024}
      priority={priority}
      sizes={sizes}
      src="/brand/studio-krix/studio-krix-sk-logo.png"
      width={1024}
    />
  );
}
