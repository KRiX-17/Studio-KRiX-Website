import { ButtonLink } from "@/components/button-link";
import { mondeSoniqProject } from "@/data/projects";

type MondeSoniqPreviewProps = {
  showAllProjectsLink?: boolean;
};

export function MondeSoniqPreview({
  showAllProjectsLink = false,
}: MondeSoniqPreviewProps) {
  return (
    <section className="monde-preview" aria-labelledby="monde-preview-title">
      <div className="site-container monde-preview__panel">
        <div className="monde-preview__heading">
          <p className="section-label">Studio KRiX × Monde Soniq</p>
          <h2 id="monde-preview-title">{mondeSoniqProject.name}</h2>
          <p className="monde-preview__category">
            {mondeSoniqProject.category}
          </p>
        </div>
        <div className="monde-preview__copy">
          <p>{mondeSoniqProject.description}</p>
          <p className="monde-preview__statement">
            Studio KRiX is the backbone behind Monde Soniq.
          </p>
          <p>
            NFRMT remains the founder, music curator and artistic lead. Studio
            KRiX supports the practical structure around that creative
            direction.
          </p>
          <div className="monde-preview__actions">
            <ButtonLink href={mondeSoniqProject.href}>
              Explore Monde Soniq
            </ButtonLink>
            {showAllProjectsLink ? (
              <ButtonLink href="/projects" variant="secondary">
                View all projects
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
