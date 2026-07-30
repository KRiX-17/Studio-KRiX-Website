import Image from "next/image";

type DeviceMockupsProps = {
  compact?: boolean;
};

export function DeviceMockups({ compact = false }: DeviceMockupsProps) {
  return (
    <div
      className={`device-stage ${compact ? "device-stage--compact" : ""}`}
      aria-label="OhmXact app screenshots for iPhone and iPad"
    >
      <div className="device device--tablet">
        <Image
          alt="OhmXact parallel resistance calculator on iPad"
          fill
          sizes="(max-width: 680px) 82vw, 48vw"
          src="/images/ohmxact-ipad-dark.png"
        />
      </div>
      <div className="device device--phone">
        <div className="device__island" aria-hidden="true" />
        <Image
          alt="OhmXact parallel resistance calculator on iPhone"
          fill
          sizes="(max-width: 680px) 41vw, 20vw"
          src="/images/ohmxact-iphone-dark.png"
        />
      </div>
    </div>
  );
}
