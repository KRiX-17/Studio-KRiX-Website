const skillGroups = [
  {
    title: "Automotive and Engineering",
    items: [
      "Disability vehicle modifications",
      "Automotive diagnostics",
      "Auto-electrical systems",
      "CAN and LIN communication",
      "Mechanical installation",
      "Fabrication",
      "System integration",
      "Workshop problem solving",
    ],
  },
  {
    title: "Software and Technology",
    items: [
      "iOS application development",
      "Android application development",
      "Swift and SwiftUI",
      "Kotlin and Jetpack Compose",
      "UI and UX design",
      "Technical documentation",
      "Git and GitHub",
      "Web application development",
    ],
  },
  {
    title: "Creative",
    items: [
      "Electronic music production",
      "Sound design",
      "Visual identity",
      "Creative direction",
      "Digital publishing",
    ],
  },
] as const;

export function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <div className="site-container">
        <h2>Skills and Capabilities</h2>
        <div className="skills-section__grid">
          {skillGroups.map((group) => (
            <section className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
