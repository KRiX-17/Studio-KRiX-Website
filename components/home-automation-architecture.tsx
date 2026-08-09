const architectureLayers = [
  {
    number: "01",
    title: "Devices & sensors",
    detail: "Lighting · Climate · Presence · Energy · Doors · Cameras",
    modifier: "devices",
  },
  {
    number: "02",
    title: "Connected infrastructure",
    detail: "Ethernet · Wi-Fi · Thread · Matter",
    modifier: "infrastructure",
  },
  {
    number: "03",
    title: "Automation platform",
    detail: "Device logic · Scenes · Schedules · Local processing",
    modifier: "automation",
  },
  {
    number: "04",
    title: "Integrations & APIs",
    detail: "Local integrations · MQTT · REST APIs · Webhooks",
    modifier: "integrations",
  },
  {
    number: "05",
    title: "Casa",
    detail: "Household context · Tasks · Status · Alerts · Routines",
    modifier: "casa",
  },
  {
    number: "06",
    title: "People",
    detail: "Simple controls · Useful information · Manual override",
    modifier: "people",
  },
] as const;

export function HomeAutomationArchitecture() {
  return (
    <figure
      className="home-auto-stack"
      aria-labelledby="home-auto-stack-title"
      aria-describedby="home-auto-stack-caption"
    >
      <div className="home-auto-stack__heading">
        <div>
          <p className="section-label">Conceptual architecture</p>
          <h3 id="home-auto-stack-title">From devices to daily life</h3>
        </div>
        <span>Specialist layers stay focused on what they do best.</span>
      </div>

      <ol className="home-auto-stack__flow">
        {architectureLayers.map((layer, index) => (
          <li
            className={`home-auto-stack__layer home-auto-stack__layer--${layer.modifier}`}
            key={layer.title}
          >
            <span className="home-auto-stack__number" aria-hidden="true">
              {layer.number}
            </span>
            <strong>{layer.title}</strong>
            <span>{layer.detail}</span>
            {index < architectureLayers.length - 1 ? (
              <i aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>

      <figcaption id="home-auto-stack-caption">
        The automation platform handles devices, rules and integrations. Casa
        is being explored above that layer as a simpler household operations
        and interaction layer; it does not replace specialist network,
        security or automation systems.
      </figcaption>
    </figure>
  );
}
