import { DeviceMockup } from "@/components/device-mockup";

type DeviceMockupsProps = {
  compact?: boolean;
  priority?: boolean;
};

export function DeviceMockups({
  compact = false,
  priority = false,
}: DeviceMockupsProps) {
  return (
    <div
      className={`device-stage ${compact ? "device-stage--compact" : ""}`}
      aria-label="OhmXact app screenshots for iPhone and iPad"
      role="group"
    >
      <DeviceMockup
        device="ipad"
        alt="OhmXact electrical calculator workspace on iPad"
        height={2752}
        priority={priority}
        sizes="(max-width: 680px) 58vw, 36vw"
        src="/images/ohmxact-ipad-current.png"
        width={2064}
      />
      <DeviceMockup
        device="iphone"
        alt="OhmXact electrical calculator workspace on iPhone"
        height={2778}
        sizes="(max-width: 680px) 27vw, 17vw"
        src="/images/ohmxact-iphone-current.png"
        width={1284}
      />
    </div>
  );
}
