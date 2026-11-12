import type { Metadata } from "next";
import { Antonio, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import { ScrollSync } from "@/components/ui/ScrollSync";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Nav } from "@/components/layout/Nav";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeSwitch } from "@/components/layout/ThemeSwitch";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ThemeScript } from "@/components/ui/ThemeScript";
import "@/styles/globals.css";

// next/font self-hosts these at build time; no request goes to Google.
const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Relative URLs in per-page metadata (canonical, share images) resolve here.
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s · ${site.name}`,
  },
  description: site.seo.description,
  openGraph: { siteName: site.name, locale: "en_US" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${antonio.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
        {/* Reveal content starts hidden; without scripts it must just show. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#main"
              className="bg-accent text-on-accent fixed top-2 left-2 z-[90] -translate-y-20 rounded-full px-4 py-2 text-sm font-semibold focus:translate-y-0"
            >
              Skip to content
            </a>
            <SmoothScroll />
            <ScrollSync />
            <Nav />
            <main id="main" className="flex-1 pt-32 print:pt-0">
              {children}
            </main>
            <Footer />
            <ThemeSwitch />
            <NoiseOverlay />
            <CustomCursor />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
