import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowUpRightIcon } from "@/components/icons";
import { DeviceMockups } from "@/components/device-mockups";

type ProjectCardProps = {
  project: Project;
  index: string;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="project-card__meta">
        <span>{index}</span>
        <span>{project.category}</span>
        <span>{project.status}</span>
      </div>
      <div className="project-card__content">
        <div>
          <h2>{project.name}</h2>
          <p className="project-card__tagline">{project.tagline}</p>
          <p className="project-card__description">{project.description}</p>
          <Link className="text-link" href={project.href}>
            Explore {project.name}
            <ArrowUpRightIcon />
          </Link>
        </div>
        <DeviceMockups compact />
      </div>
    </article>
  );
}
