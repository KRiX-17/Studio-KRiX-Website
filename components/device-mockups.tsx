type DeviceMockupsProps = {
  compact?: boolean;
};

export function DeviceMockups({ compact = false }: DeviceMockupsProps) {
  return (
    <div
      className={`device-stage ${compact ? "device-stage--compact" : ""}`}
      aria-label="OhmXact app screenshot placeholders for iPhone and iPad"
    >
      <div className="device device--tablet">
        <span>App screenshot</span>
      </div>
      <div className="device device--phone">
        <div className="device__island" aria-hidden="true" />
        <span>App screenshot</span>
      </div>
    </div>
  );
}
