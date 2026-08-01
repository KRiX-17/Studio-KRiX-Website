import Image from "next/image";
import {
  mondeSoniqLogoBlack,
  mondeSoniqLogoWhite,
} from "@/data/monde-soniq";

type MondeSoniqLogoProps = {
  className?: string;
  decorative?: boolean;
  priority?: boolean;
  sizes: string;
};

export function MondeSoniqLogo({
  className,
  decorative = false,
  priority = false,
  sizes,
}: MondeSoniqLogoProps) {
  const alt = decorative ? "" : "Monde Soniq logo";
  const classes = ["monde-logo", className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      <Image
        alt={alt}
        className="monde-logo__asset monde-logo__asset--light"
        height={mondeSoniqLogoBlack.height}
        priority={priority}
        sizes={sizes}
        src={mondeSoniqLogoBlack.src}
        width={mondeSoniqLogoBlack.width}
      />
      <Image
        alt={alt}
        className="monde-logo__asset monde-logo__asset--dark"
        height={mondeSoniqLogoWhite.height}
        priority={priority}
        sizes={sizes}
        src={mondeSoniqLogoWhite.src}
        width={mondeSoniqLogoWhite.width}
      />
    </span>
  );
}
