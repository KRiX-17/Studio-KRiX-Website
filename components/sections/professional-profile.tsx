import { ButtonLink } from "@/components/button-link";

export function ProfessionalProfile() {
  return (
    <section className="professional-profile" id="professional">
      <div className="site-container professional-profile__grid">
        <h2>Professional Profile</h2>
        <div>
          <p>
            Christopher is an automotive technician working across disability
            vehicle modifications, automotive electrical systems, diagnostics,
            fabrication and vehicle communication networks, alongside software
            development, networking and connected-system design. His work
            combines hands-on engineering with practical digital tools,
            automation and user-focused technology.
          </p>
          <div className="professional-profile__links">
            <ButtonLink href="/professional" variant="secondary">
              View Professional Profile
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
