import { DeviceMockup } from "@/components/device-mockup";

type DeviceMockupsProps = {
  compact?: boolean;
};

export function DeviceMockups({ compact = false }: DeviceMockupsProps) {
  return (
    <div
      className={`device-stage ${compact ? "device-stage--compact" : ""}`}
      aria-label="OhmXact app screenshots for iPhone and iPad"
      role="group"
    >
      <DeviceMockup
        device="ipad"
        alt="OhmXact parallel resistance calculator on iPad"
        height={2752}
        sizes="(max-width: 680px) 58vw, 36vw"
        src="/images/ohmxact-ipad-dark.png"
        width={2064}
      />
      <DeviceMockup
        device="iphone"
        alt="OhmXact parallel resistance calculator on iPhone"
        height={2778}
        sizes="(max-width: 680px) 27vw, 17vw"
        src="/images/ohmxact-iphone-dark.png"
        width={1284}
      />
    </div>
  );
}
