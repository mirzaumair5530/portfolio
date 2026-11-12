/** Two `<Figure>`s side by side; they stack on phones. */
export function FigureRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 grid gap-5 sm:grid-cols-2 tablet:my-16 [&>figure]:my-0">
      {children}
    </div>
  );
}
