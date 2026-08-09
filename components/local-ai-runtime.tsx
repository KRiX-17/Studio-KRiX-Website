const runtimeLayers = [
  {
    number: "01",
    title: "Local AI hardware",
    detail: "A high-memory NVIDIA or AMD platform",
  },
  {
    number: "02",
    title: "Ollama runtime",
    detail: "Model management · Model serving",
  },
  {
    number: "03",
    title: "Local models",
    detail: "Language · Vision · Embeddings · Coding",
  },
  {
    number: "04",
    title: "Useful systems",
    detail: "Casa · Connected Systems · Development tools",
  },
] as const;

export function LocalAiRuntime() {
  return (
    <figure className="local-ai-runtime-diagram">
      <ol>
        {runtimeLayers.map((layer, index) => (
          <li key={layer.title}>
            <span aria-hidden="true">{layer.number}</span>
            <div>
              <h3>{layer.title}</h3>
              <p>{layer.detail}</p>
            </div>
            {index < runtimeLayers.length - 1 ? <i aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
      <figcaption>
        A conceptual runtime path. The exact services, models and integrations
        depend on the hardware, operating system and approved use case.
      </figcaption>
    </figure>
  );
}
