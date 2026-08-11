export function ConnectedSystemsDiagram() {
  return (
    <figure
      className="connected-diagram"
      aria-labelledby="connected-diagram-title"
      aria-describedby="connected-diagram-caption"
    >
      <div className="connected-diagram__heading">
        <div>
          <p className="section-label">Conceptual architecture</p>
          <h3 id="connected-diagram-title">One coherent environment</h3>
        </div>
        <span>Designed around clear layers</span>
      </div>

      <div className="connected-diagram__flow">
        <div className="connected-diagram__tier connected-diagram__tier--devices">
          <span className="connected-diagram__status" aria-hidden="true" />
          <div>
            <strong>Devices &amp; sensors</strong>
            <span>Everyday systems and signals</span>
          </div>
        </div>

        <span className="connected-diagram__connector" aria-hidden="true" />

        <div className="connected-diagram__domains">
          <div className="connected-diagram__domain">
            <span aria-hidden="true">01</span>
            <strong>UniFi</strong>
            <small>Network · Security</small>
          </div>
          <div className="connected-diagram__domain">
            <span aria-hidden="true">02</span>
            <strong>Automation</strong>
            <small>Controllers · APIs</small>
          </div>
        </div>

        <span className="connected-diagram__connector" aria-hidden="true" />

        <div className="connected-diagram__tier connected-diagram__tier--lakaz">
          <span className="connected-diagram__lakaz-mark" aria-hidden="true">
            LK
          </span>
          <div>
            <strong>Lakaz</strong>
            <span>Evolving orchestration layer</span>
          </div>
        </div>

        <span className="connected-diagram__connector" aria-hidden="true" />

        <div className="connected-diagram__user">
          <strong>User layer</strong>
          <div className="connected-diagram__outcomes">
            <span>Tasks</span>
            <span>Alerts</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
        </div>
      </div>

      <figcaption id="connected-diagram-caption">
        Connected devices feed specialist network, security and automation
        systems. Lakaz is designed to bring selected information and actions
        into a simpler user layer without replacing those specialist systems.
      </figcaption>
    </figure>
  );
}
