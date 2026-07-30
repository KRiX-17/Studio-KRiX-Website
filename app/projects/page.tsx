import { FinalCta } from "@/components/sections/final-cta";
import { PageIntro } from "@/components/page-intro";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";
import { formatIndex } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Explore software, engineering and creative projects from Studio KRiX.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        description="A growing collection of focused tools and thoughtful experiments across software, engineering and creative work."
        title={
          <>
            Projects built with a <em>practical point of view.</em>
          </>
        }
      />
      <section className="projects-list">
        <div className="site-container">
          {projects.map((project, index) => (
            <ProjectCard
              index={formatIndex(index)}
              key={project.slug}
              project={project}
            />
          ))}
          <div className="future-projects">
            <span>Next</span>
            <p>More projects will be added as they are ready.</p>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
