const runtimeLayers = [
  {
    number: "01",
    title: "AI HARDWARE",
    detail: "High-memory NVIDIA or AMD platform",
  },
  {
    number: "02",
    title: "LOCAL MODEL RUNTIME",
    detail: "Model management · Model serving",
  },
  {
    number: "03",
    title: "LOCAL MODELS",
    detail: "Qwen3 · Gemma 3 · gpt-oss · Devstral",
  },
  {
    number: "04",
    title: "LAKAZ / CONNECTED SYSTEMS / DEVELOPMENT TOOLS",
    detail: "Approved household · systems · engineering workflows",
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
