import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";

type FinalCtaProps = {
  title?: React.ReactNode;
  description?: string;
  email?: string;
};

export function FinalCta({
  title = "Have something thoughtful in mind?",
  description,
  email = siteConfig.email,
}: FinalCtaProps) {
  return (
    <section className="final-cta">
      <Reveal className="site-container final-cta__inner">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
        <div className="final-cta__actions">
          <ButtonLink href={`mailto:${email}`} external>
            Start a conversation
          </ButtonLink>
          <ButtonLink
            href={`mailto:${email}`}
            variant="text"
            external
          >
            {email}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
