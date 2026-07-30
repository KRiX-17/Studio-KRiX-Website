import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";

type FinalCtaProps = {
  title?: React.ReactNode;
  description?: string;
};

export function FinalCta({
  title = (
    <>
      Have something <em>thoughtful</em> in mind?
    </>
  ),
  description,
}: FinalCtaProps) {
  return (
    <section className="final-cta">
      <Reveal className="site-container final-cta__inner">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
        <div className="final-cta__actions">
          <ButtonLink href={`mailto:${siteConfig.email}`} external>
            Start a conversation
          </ButtonLink>
          <ButtonLink
            href={`mailto:${siteConfig.email}`}
            variant="text"
            external
          >
            {siteConfig.email}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
