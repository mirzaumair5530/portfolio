// Runs synchronously while the HTML is parsed, so the right theme is set
// before first paint. First visit follows the system; a saved choice wins.
const script = `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
