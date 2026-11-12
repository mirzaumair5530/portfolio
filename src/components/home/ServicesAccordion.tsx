import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";

/** The services list, used on the home and About pages. */
export function ServicesAccordion() {
  return (
    <Accordion
      size="lg"
      items={site.services.map((service) => ({
        title: service.title,
        content: (
          <ul className="flex flex-col gap-3">
            {service.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Icon name="check-circle" className="text-accent mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        ),
      }))}
    />
  );
}
