import { isValidElement, type ReactNode } from "react";
import { CopyButton } from "@/components/mdx/CopyButton";

// The highlighted tree is nested spans; the copy button needs the plain text.
function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return `${node}`;
  if (Array.isArray(node)) return node.map(getText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getText(node.props.children);
  }
  return "";
}

export function CodeBlock({ children, ...props }: React.ComponentProps<"pre">) {
  return (
    <div className="relative my-6">
      <pre
        {...props}
        className="glass overflow-x-auto rounded-2xl p-5 pr-20 font-mono text-sm leading-relaxed"
      >
        {children}
      </pre>
      <CopyButton text={getText(children)} />
    </div>
  );
}
