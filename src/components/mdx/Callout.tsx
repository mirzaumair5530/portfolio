export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="bg-surface border-l-accent! rounded-card my-6 border-l-4! p-5 [&>p]:my-0">
      {children}
    </aside>
  );
}
