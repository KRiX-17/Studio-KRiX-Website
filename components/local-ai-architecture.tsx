const architectureLayers = [
  {
    number: "01",
    title: "Data & events",
    items: ["Documents", "Tasks", "Sensors", "Network logs", "Approved imagery"],
  },
  {
    number: "02",
    title: "Runtime & model management",
    items: ["Ollama", "Model serving"],
  },
  {
    number: "03",
    title: "Models",
    items: ["Language", "Vision", "Embeddings", "Coding"],
  },
  {
    number: "04",
    title: "Casa intelligence layer",
    items: ["Context", "Retrieval", "Summaries", "Suggestions"],
  },
  {
    number: "05",
    title: "Policy & permissions",
    items: ["Allowed actions", "Confirmation", "Audit"],
  },
  {
    number: "06",
    title: "Household / user",
    items: ["Clear information", "Explicit choices", "Human approval"],
  },
] as const;

export function LocalAiArchitecture() {
  return (
    <figure className="local-ai-architecture-diagram">
      <ol>
        {architectureLayers.map((layer, index) => (
          <li
            className={
              layer.title === "Policy & permissions"
                ? "local-ai-architecture-diagram__policy"
                : undefined
            }
            key={layer.title}
          >
            <span aria-hidden="true">{layer.number}</span>
            <div>
              <h3>{layer.title}</h3>
              <ul aria-label={`${layer.title} components`}>
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {index < architectureLayers.length - 1 ? <i aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
      <figcaption>
        Conceptual architecture only. No private live data or unrestricted
        system access is represented.
      </figcaption>
    </figure>
  );
}
