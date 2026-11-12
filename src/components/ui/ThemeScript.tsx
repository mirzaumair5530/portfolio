// Runs synchronously while the HTML is parsed, so the right theme is set
// before first paint. Light is the default; a saved choice wins. It also marks
// the page as scripted (`html.js`).
const script = `(function(){var d=document.documentElement;d.classList.add("js");try{var s=localStorage.getItem("theme");d.dataset.theme=s==="dark"?"dark":"light";}catch(e){d.dataset.theme="light";}})();`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
