import { Media } from "@/components/ui/Media";

/**
 * An image in a project or post body. Without `src` it renders a placeholder
 * labelled with `alt`, so a draft can mark where its images will go.
 */
export function Figure({
  src,
  alt = "",
  caption,
}: {
  src?: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure className="my-10 tablet:my-16">
      <div className="rounded-card relative aspect-[3/2] overflow-hidden">
        <Media
          image={{ src, alt }}
          label={alt || "Image"}
          sizes="(min-width: 1080px) 1000px, 100vw"
        />
      </div>
      {caption ? (
        <figcaption className="type-small text-muted mt-3">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
