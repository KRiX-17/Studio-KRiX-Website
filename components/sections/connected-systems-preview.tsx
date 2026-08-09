import { ButtonLink } from "@/components/button-link";
import { connectedSystemsProject } from "@/data/projects";

type ConnectedSystemsPreviewProps = {
  showAllProjectsLink?: boolean;
};

export function ConnectedSystemsPreview({
  showAllProjectsLink = false,
}: ConnectedSystemsPreviewProps) {
  return (
    <section
      className="connected-preview"
      id="connected-systems-preview"
      aria-labelledby="connected-preview-title"
    >
      <div className="site-container connected-preview__panel">
        <div className="connected-preview__copy">
          <p className="section-label">Connected capability</p>
          <h2 id="connected-preview-title">Connected Systems</h2>
          <p className="connected-preview__category">
            {connectedSystemsProject.category}
          </p>
          <p>
            Networking, automation, security and Casa integration designed as
            one practical ecosystem.
          </p>
          <div className="connected-preview__actions">
            <ButtonLink href={connectedSystemsProject.href}>
              Explore Connected Systems
            </ButtonLink>
            {showAllProjectsLink ? (
              <ButtonLink href="/projects" variant="secondary">
                View all projects
              </ButtonLink>
            ) : null}
          </div>
        </div>

        <div className="connected-preview__visual" aria-hidden="true">
          <div className="connected-preview__node connected-preview__node--devices">
            Devices
          </div>
          <span className="connected-preview__line" />
          <div className="connected-preview__systems">
            <span>Network</span>
            <span>Security</span>
            <span>Automation</span>
          </div>
          <span className="connected-preview__line" />
          <div className="connected-preview__node connected-preview__node--casa">
            Casa
          </div>
        </div>
      </div>
    </section>
  );
}
