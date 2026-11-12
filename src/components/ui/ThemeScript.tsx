// Runs synchronously while the HTML is parsed, so the right theme is set
// before first paint. Light is the default; a saved choice wins.
const script = `(function(){var d=document.documentElement;try{var s=localStorage.getItem("theme");d.dataset.theme=s==="dark"?"dark":"light";}catch(e){d.dataset.theme="light";}})();`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
