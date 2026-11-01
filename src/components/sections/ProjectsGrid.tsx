"use client";

import { useState } from "react";
import { FilterPills } from "@/components/ui/FilterPills";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/mdx";

type ProjectSummary = Pick<Project, "slug" | "frontmatter">;

export function ProjectsGrid({ projects }: { projects: ProjectSummary[] }) {
  const [tech, setTech] = useState<string | null>(null);

  const technologies = [
    ...new Set(projects.flatMap((project) => project.frontmatter.stack)),
  ].sort();
  const visible = tech
    ? projects.filter((project) => project.frontmatter.stack.includes(tech))
    : projects;

  return (
    <>
      <FilterPills
        label="Filter by technology"
        options={technologies}
        value={tech}
        onChange={setTech}
      />
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <li key={project.slug} className="flex">
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
      <p className="sr-only" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>
    </>
  );
}
