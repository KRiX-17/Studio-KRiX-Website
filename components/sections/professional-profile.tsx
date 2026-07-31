import { ButtonLink } from "@/components/button-link";
import { siteConfig } from "@/config/site";

export function ProfessionalProfile() {
  return (
    <section className="professional-profile" id="professional">
      <div className="site-container professional-profile__grid">
        <h2>Professional Profile</h2>
        <div>
          <p>
            Christopher is an automotive technician specialising in disability
            vehicle modifications, automotive electrical systems, diagnostics,
            fabrication and vehicle communication networks. His work combines
            hands-on workshop engineering with an interest in software,
            automation and user-focused technology.
          </p>
          <div className="professional-profile__links">
            <ButtonLink href={siteConfig.linkedIn} variant="secondary" external>
              LinkedIn
            </ButtonLink>
            <ButtonLink href={siteConfig.github} variant="secondary" external>
              GitHub
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
