export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="glass glass-accent my-6 rounded-2xl p-5 text-sm">
      {children}
    </aside>
  );
}
