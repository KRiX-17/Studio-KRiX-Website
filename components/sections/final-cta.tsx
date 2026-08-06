import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";

type FinalCtaProps = {
  title?: React.ReactNode;
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function FinalCta({
  title = "Have something thoughtful in mind?",
  description,
  href = "/contact",
  linkLabel = "Start a conversation",
}: FinalCtaProps) {
  return (
    <section className="final-cta">
      <Reveal className="site-container final-cta__inner">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
        <div className="final-cta__actions">
          <ButtonLink href={href}>{linkLabel}</ButtonLink>
          <ButtonLink href="/privacy" variant="text">
            How messages are handled
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
