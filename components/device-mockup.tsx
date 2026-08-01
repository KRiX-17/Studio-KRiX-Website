import Image from "next/image";

type DeviceMockupProps = {
  alt: string;
  device: "iphone" | "ipad";
  height: number;
  priority?: boolean;
  quality?: number;
  sizes: string;
  src: string;
  width: number;
};

export function DeviceMockup({
  alt,
  device,
  height,
  priority = false,
  quality = 92,
  sizes,
  src,
  width,
}: DeviceMockupProps) {
  return (
    <div
      className={`device-mockup device-mockup--${device}`}
      data-device={device}
    >
      <div
        className="device-mockup__screen"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          alt={alt}
          height={height}
          priority={priority}
          quality={quality}
          sizes={sizes}
          src={src}
          width={width}
        />
      </div>
      <span className="device-mockup__shell" aria-hidden="true" />
    </div>
  );
}
