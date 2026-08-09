import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { LocalAiArchitecture } from "@/components/local-ai-architecture";
import { LocalAiRuntime } from "@/components/local-ai-runtime";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

const title = "Local AI | Studio KRiX";
const description =
  "Explore a Studio KRiX architecture concept for private local AI infrastructure, Ollama, high-memory hardware and optional Casa integration.";
const path = "/connected-systems/local-ai";

const baseMetadata = createMetadata({ title, description, path });

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: title,
  },
};

const hardwareOptions = [
  {
    number: "01",
    title: "NVIDIA DGX Spark",
    subtitle: "GB10 Grace Blackwell Superchip",
    specs: [
      "128 GB coherent unified memory",
      "273 GB/s memory bandwidth",
      "Up to 1 PFLOP FP4",
      "CUDA and the NVIDIA AI ecosystem",
      "Listed by Ollama as supported hardware",
    ],
    description:
      "A compact Arm-based system suited to large local language models, coding agents, multimodal work and retrieval-augmented generation. Its unified memory can accommodate very large quantised models when the model, context and runtime fit within the available pool.",
    href: "https://www.nvidia.com/en-us/products/workstations/dgx-spark/",
    linkLabel: "NVIDIA specifications",
  },
  {
    number: "02",
    title: "AMD Ryzen AI Max+ 395",
    subtitle: "Ryzen AI Halo-class platform",
    specs: [
      "16-core Zen 5 CPU",
      "Radeon 8060S integrated graphics · 40 CUs",
      "Up to 128 GB unified LPDDR5x",
      "Approximately 256 GB/s memory bandwidth",
      "Linux support through Ollama with ROCm; experimental Vulkan path",
    ],
    description:
      "A compact x86 platform with a large shared memory pool, attractive for familiar desktop and development workloads as well as high-memory local inference. Ollama lists the Ryzen AI Max+ 395 in its Linux ROCm support table.",
    href: "https://developer.amd.com/playbooks/user-guide/",
    linkLabel: "AMD Ryzen AI Halo specifications",
  },
] as const;

const modelCategories = [
  "Fast 7B–14B assistant",
  "Coding model",
  "20B–35B reasoning model",
  "70B-class high-quality assistant",
  "100B+ quantised model on high-memory hardware",
  "Embeddings model for local RAG",
  "Vision model for approved local visual workflows",
] as const;

const casaCapabilities = [
  "Natural-language household queries",
  "Household and system status summaries",
  "Task extraction",
  "Maintenance assistance",
  "Documentation and manual RAG",
  "Network-log summaries",
  "Automation suggestions",
  "Event prioritisation",
  "Local voice intent interpretation",
  "Camera-event description where explicitly enabled",
  "Household knowledge search",
] as const;

const criticalActions = [
  "Unlocking doors",
  "Changing access permissions",
  "Disabling alarms",
  "Modifying firewall rules",
  "Exposing cameras",
  "Changing critical infrastructure",
] as const;

const privacyBenefits = [
  "Sensitive information can remain on local infrastructure",
  "No cloud API required for selected workflows",
  "Local document retrieval",
  "Predictable data boundaries",
  "Potentially lower recurring inference cost",
  "Usable during some internet outages",
] as const;

const securityDependencies = [
  "OS patching",
  "Network isolation",
  "Authentication",
  "Service configuration",
  "Model and tool permissions",
  "Backups",
  "Audit logs",
] as const;

const relatedLinks = [
  {
    eyebrow: "Capability",
    title: "Connected Systems",
    description: "The broader network, security, automation and software context.",
    href: "/connected-systems",
  },
  {
    eyebrow: "Optional intelligence layer",
    title: "Casa",
    description: "A human-facing household operations concept with explicit permissions.",
    href: "/casa",
  },
  {
    eyebrow: "Specialist platform",
    title: "Home Automation",
    description: "Reliable local control, clear rules and graceful failure.",
    href: "/connected-systems/home-automation",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${siteConfig.url}${path}/#architecture`,
  name: "Studio KRiX Local AI",
  headline: "Local intelligence, closer to the systems it supports.",
  description,
  url: `${siteConfig.url}${path}`,
  creativeWorkStatus: "Architecture exploration",
  creator: {
    "@id": `${siteConfig.url}/#organization`,
  },
  isPartOf: {
    "@id": `${siteConfig.url}/connected-systems/#service`,
  },
  keywords: [
    "local AI",
    "Ollama",
    "private AI infrastructure",
    "NVIDIA DGX Spark",
    "AMD Ryzen AI Max",
    "Casa",
  ],
};

export default function LocalAiPage() {
  return (
    <>
      <section className="connected-hero local-ai-hero">
        <div className="site-container connected-hero__grid">
          <Reveal className="connected-hero__copy">
            <p className="connected-hero__eyebrow">
              Studio KRiX · Connected Systems
            </p>
            <h1>
              Local intelligence,
              <br />
              {" "}closer to the systems it supports.
            </h1>
            <p>
              Local AI brings language models, reasoning and automation closer
              to the systems and data they support. Selected workloads can run
              locally on dedicated hardware instead of sending every prompt,
              document, household event or diagnostic log to a cloud service.
            </p>
            <div className="connected-hero__actions">
              <ButtonLink href="#local-ai-architecture">
                Explore the architecture
              </ButtonLink>
              <ButtonLink href="/connected-systems" variant="secondary">
                Connected Systems
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal
            as="aside"
            className="connected-status-card local-ai-status"
            delay={0.08}
          >
            <div className="connected-status-card__topline">
              <span aria-hidden="true" />
              <span>Architecture exploration</span>
            </div>
            <h2 id="local-ai-status-title">Local AI</h2>
            <dl aria-labelledby="local-ai-status-title">
              <div>
                <dt>Position</dt>
                <dd>Private infrastructure · Optional cloud connections</dd>
              </div>
              <div>
                <dt>Runtime</dt>
                <dd>Ollama</dd>
              </div>
              <div>
                <dt>State</dt>
                <dd>Product and systems architecture exploration</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section
        className="local-ai-hardware"
        aria-labelledby="local-ai-hardware-title"
      >
        <div className="site-container">
          <Reveal className="local-ai-heading local-ai-heading--split">
            <div>
              <p className="section-label">Representative hardware</p>
              <h2 id="local-ai-hardware-title">Two high-memory paths</h2>
            </div>
            <p>
              These platforms represent two ways to bring substantial model
              capacity into a compact local system. They are options under
              consideration, not claims about hardware currently owned or
              deployed by Studio KRiX.
            </p>
          </Reveal>

          <div className="local-ai-hardware__grid">
            {hardwareOptions.map((hardware, index) => (
              <Reveal
                as="article"
                className="local-ai-hardware-card"
                delay={index * 0.08}
                key={hardware.title}
              >
                <div className="local-ai-hardware-card__heading">
                  <span aria-hidden="true">{hardware.number}</span>
                  <div>
                    <h3>{hardware.title}</h3>
                    <p>{hardware.subtitle}</p>
                  </div>
                </div>
                <ul>
                  {hardware.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <p className="local-ai-hardware-card__description">
                  {hardware.description}
                </p>
                <a
                  className="local-ai-source-link"
                  href={hardware.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{hardware.linkLabel}</span>
                  <ArrowUpRightIcon />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="local-ai-fit-note" distance={24}>
            <strong>Model fit is workload-specific.</strong>
            <p>
              Parameter count alone does not guarantee support. Quantisation,
              context size, memory allocated to the GPU and runtime overhead
              all affect what can run well.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="local-ai-runtime"
        aria-labelledby="local-ai-runtime-title"
      >
        <div className="site-container local-ai-runtime__grid">
          <Reveal className="local-ai-runtime__copy">
            <p className="section-label">Local model runtime</p>
            <h2 id="local-ai-runtime-title">
              One local runtime, several useful models
            </h2>
            <p>
              Ollama provides a practical local runtime for downloading,
              running and switching models on supported hardware. It gives
              Casa, Connected Systems and development tools one considered
              integration point without promising that every model fits every
              machine.
            </p>
            <a
              className="local-ai-source-link"
              href="https://docs.ollama.com/gpu"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Ollama hardware support</span>
              <ArrowUpRightIcon />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
          <Reveal className="local-ai-runtime__figure" delay={0.08}>
            <LocalAiRuntime />
          </Reveal>
        </div>

        <div className="site-container local-ai-models">
          <Reveal className="local-ai-models__intro">
            <p className="section-label">Potential model roles</p>
            <h2>Choose the model for the work</h2>
            <p>
              A local system can host several specialised models rather than
              expecting one model to handle every task.
            </p>
          </Reveal>
          <Reveal as="ol" className="local-ai-models__list" delay={0.06}>
            {modelCategories.map((model, index) => (
              <li key={model}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{model}</strong>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="local-ai-casa" aria-labelledby="local-ai-casa-title">
        <div className="site-container">
          <Reveal className="local-ai-heading local-ai-heading--split">
            <div>
              <p className="section-label">Optional intelligence service</p>
              <h2 id="local-ai-casa-title">Local AI + Casa</h2>
            </div>
            <div>
              <p>
                Local AI could sit behind Casa as a focused intelligence
                service: interpreting approved context, finding relevant
                information and proposing useful summaries or next steps.
              </p>
              <ButtonLink href="/casa" variant="secondary">
                Explore Casa
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal as="ol" className="local-ai-capabilities" delay={0.06}>
            {casaCapabilities.map((capability, index) => (
              <li key={capability}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{capability}</strong>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        className="local-ai-architecture"
        id="local-ai-architecture"
        aria-labelledby="local-ai-architecture-title"
      >
        <div className="site-container local-ai-architecture__grid">
          <Reveal className="local-ai-architecture__copy">
            <p className="section-label">Guarded architecture</p>
            <h2 id="local-ai-architecture-title">
              Intelligence does not replace permission
            </h2>
            <p>
              The AI does not receive unrestricted authority over critical
              systems. It can interpret, retrieve, summarise and suggest; Casa
              remains responsible for deterministic permissions, confirmation
              and audit.
            </p>

            <div className="local-ai-critical-actions">
              <strong>Critical actions require explicit approval</strong>
              <ul>
                {criticalActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal
            className="local-ai-architecture__figure"
            delay={0.08}
            direction="left"
            distance={28}
          >
            <LocalAiArchitecture />
          </Reveal>
        </div>
      </section>

      <section
        className="local-ai-privacy"
        aria-labelledby="local-ai-privacy-title"
      >
        <div className="site-container">
          <Reveal className="local-ai-heading local-ai-heading--split">
            <div>
              <p className="section-label">Privacy & security</p>
              <h2 id="local-ai-privacy-title">
                Local by design, secure by practice
              </h2>
            </div>
            <p>
              Local inference can create clearer data boundaries, but locality
              alone is not a security control. The complete system still needs
              careful maintenance, isolation, authentication and permissions.
            </p>
          </Reveal>

          <div className="local-ai-privacy__grid">
            <Reveal as="ol" className="local-ai-benefits">
              {privacyBenefits.map((benefit, index) => (
                <li key={benefit}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{benefit}</strong>
                </li>
              ))}
            </Reveal>
            <Reveal className="local-ai-security" delay={0.08}>
              <p className="section-label">Security dependencies</p>
              <ul>
                {securityDependencies.map((dependency, index) => (
                  <li key={dependency}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {dependency}
                  </li>
                ))}
              </ul>
              <p className="local-ai-security__warning">
                <strong>Local AI is not inherently secure.</strong> Its safety
                depends on how the hardware, operating system, runtime, models,
                tools and network are configured.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="local-ai-related"
        aria-labelledby="local-ai-related-title"
      >
        <div className="site-container">
          <Reveal className="local-ai-heading">
            <p className="section-label">Part of Connected Systems</p>
            <h2 id="local-ai-related-title">Continue exploring</h2>
          </Reveal>
          <Reveal
            as="nav"
            className="local-ai-related__grid"
            ariaLabel="Related Local AI pages"
          >
            {relatedLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <JsonLd data={structuredData} />
    </>
  );
}
