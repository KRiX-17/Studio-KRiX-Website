const dashboardGroups = [
  {
    title: "Today",
    items: [
      { label: "Put bins out", tone: "gold" },
      { label: "Replace water filter", tone: "crimson" },
      { label: "Laundry cycle finished", tone: "neutral" },
    ],
  },
  {
    title: "Home",
    items: [
      { label: "2 people home", tone: "gold" },
      { label: "Front door closed", tone: "positive" },
      { label: "Climate comfortable", tone: "neutral" },
    ],
  },
  {
    title: "Systems",
    items: [
      { label: "Network healthy", tone: "positive" },
      { label: "Automation running", tone: "positive" },
      { label: "No important alerts", tone: "neutral" },
    ],
  },
  {
    title: "Energy",
    items: [
      { label: "EV charging scheduled", tone: "gold" },
      { label: "Household load normal", tone: "positive" },
    ],
  },
] as const;

export function CasaDashboard() {
  return (
    <figure className="casa-dashboard" aria-labelledby="casa-dashboard-title">
      <div className="casa-dashboard__topbar">
        <div>
          <p className="eyebrow">Concept interface</p>
          <h3 id="casa-dashboard-title">Good morning</h3>
        </div>
        <p className="casa-dashboard__date">Household overview</p>
      </div>

      <div className="casa-dashboard__groups">
        {dashboardGroups.map((group) => (
          <section className="casa-dashboard__group" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item.label}>
                  <span
                    aria-hidden="true"
                    className={`casa-dashboard__signal casa-dashboard__signal--${item.tone}`}
                  />
                  <strong>{item.label}</strong>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <figcaption>
        An illustrative interface concept using generic household information. It
        does not represent a live or deployed system.
      </figcaption>
    </figure>
  );
}
