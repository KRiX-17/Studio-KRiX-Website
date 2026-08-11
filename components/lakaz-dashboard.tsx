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

export function LakazDashboard() {
  return (
    <figure className="lakaz-dashboard" aria-labelledby="lakaz-dashboard-title">
      <div className="lakaz-dashboard__topbar">
        <div>
          <p className="eyebrow">Concept interface</p>
          <h3 id="lakaz-dashboard-title">Good morning</h3>
        </div>
        <p className="lakaz-dashboard__date">Household overview</p>
      </div>

      <div className="lakaz-dashboard__groups">
        {dashboardGroups.map((group) => (
          <section className="lakaz-dashboard__group" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item.label}>
                  <span
                    aria-hidden="true"
                    className={`lakaz-dashboard__signal lakaz-dashboard__signal--${item.tone}`}
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
