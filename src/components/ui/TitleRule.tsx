/** A small title with a line that fills the rest of the row. */
export function TitleRule({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-6">
      <h2 className="type-h3 whitespace-nowrap">{title}</h2>
      <span aria-hidden="true" className="bg-border h-px flex-1" />
    </div>
  );
}
