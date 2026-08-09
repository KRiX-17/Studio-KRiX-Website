const architectureLayers = [
  {
    title: "Devices & services",
    items: [
      "Sensors",
      "Lighting",
      "Climate",
      "Energy",
      "Network",
      "Cameras",
      "Calendars",
      "Tasks",
    ],
  },
  {
    title: "Specialist platforms",
    items: [
      "Home Assistant",
      "UniFi",
      "APIs",
      "Local integrations",
      "Cloud services where appropriate",
    ],
  },
  {
    title: "Casa integration layer",
    items: ["Normalisation", "Household context", "Rules", "Prioritisation"],
    accent: true,
  },
  {
    title: "Casa experience",
    items: ["Tasks", "Alerts", "Status", "Routines", "Actions"],
  },
  {
    title: "Household",
    items: ["Simple information", "Shared responsibility", "Useful automation"],
  },
] as const;

export function CasaArchitecture() {
  return (
    <figure
      className="casa-architecture-diagram"
      aria-labelledby="casa-architecture-title"
    >
      <ol>
        {architectureLayers.map((layer, index) => (
          <li
            className={
              "accent" in layer && layer.accent
                ? "casa-architecture-diagram__layer--accent"
                : undefined
            }
            key={layer.title}
          >
            <span className="casa-architecture-diagram__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 id={index === 0 ? "casa-architecture-title" : undefined}>
                {layer.title}
              </h3>
              <ul aria-label={`${layer.title} capabilities`}>
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>
        Information moves from specialist devices and services into a simple,
        human-facing household experience. This is an evolving architecture
        concept, not a deployed system map.
      </figcaption>
    </figure>
  );
}
