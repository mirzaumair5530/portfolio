// Large blurred colour shapes that give the glass surfaces something to blur.
// Decorative only; the third shape is hidden on phones (SPEC: fewer shapes).
export function BackdropShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed print:hidden inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-[var(--shape-1)] blur-[100px]" />
      <div className="absolute top-1/3 -right-32 size-[32rem] rounded-full bg-[var(--shape-2)] blur-[100px]" />
      <div className="absolute -bottom-40 left-1/4 hidden size-[30rem] rounded-full bg-[var(--shape-3)] blur-[100px] md:block" />
    </div>
  );
}
