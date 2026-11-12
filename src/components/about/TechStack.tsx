import Image from "next/image";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

/** One row per tool: a 48 px icon tile, the name and a one-line description. */
export function TechStack() {
  return (
    <>
      <SectionHeader title="My tech stack">{site.copy.stack}</SectionHeader>
      <Reveal as="ul" stagger>
        {site.stack.map((tool) => (
          <RevealItem
            as="li"
            key={tool.name}
            className="border-border flex items-center gap-5 border-b py-5"
          >
            {/* Until an icon file is set, the tile shows the first letters. */}
            <span className="bg-surface text-accent relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-semibold">
              {tool.icon ? (
                <Image src={tool.icon} alt="" fill sizes="48px" />
              ) : (
                <span aria-hidden="true">{tool.name.slice(0, 2)}</span>
              )}
            </span>
            <p className="flex flex-col">
              <span className="font-semibold">{tool.name}</span>
              <span className="type-small">{tool.description}</span>
            </p>
          </RevealItem>
        ))}
      </Reveal>
    </>
  );
}
