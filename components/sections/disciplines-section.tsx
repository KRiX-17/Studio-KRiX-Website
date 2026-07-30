import { Reveal } from "@/components/reveal";
import { disciplines } from "@/data/disciplines";

export function DisciplinesSection() {
  return (
    <section className="disciplines-section">
      <div className="site-container">
        <Reveal>
          <h2>What Studio KRiX builds</h2>
        </Reveal>
        <div className="discipline-list">
          {disciplines.map((discipline, index) => (
            <Reveal
              className="discipline-row"
              delay={index * 0.04}
              key={discipline.name}
            >
              <h3>{discipline.name}</h3>
              <p>{discipline.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
