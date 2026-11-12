import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import type { SiteImage } from "@/data/site";

export function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: SiteImage;
}) {
  return (
    <figure className="bg-surface rounded-card flex h-full min-h-[239px] flex-col gap-5 p-10">
      <div aria-hidden="true" className="text-accent flex gap-1">
        {[0, 1, 2, 3, 4].map((star) => (
          <Icon key={star} name="star" className="size-4" />
        ))}
      </div>
      <blockquote className="type-small grow">{quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar image={avatar} name={name} />
        <span className="type-small flex flex-col">
          <span className="leading-none font-semibold">{name}</span>
          <span className="mt-1.5">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
