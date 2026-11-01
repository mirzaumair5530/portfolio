import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { BackdropShapes } from "@/components/ui/BackdropShapes";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ThemeScript } from "@/components/ui/ThemeScript";
import "@/styles/globals.css";

// next/font self-hosts these at build time; no request goes to Google.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
  title: {
    default: "Umair Farooq · Software Engineer",
    template: "%s · Umair Farooq",
  },
  description: "Portfolio of Umair Farooq, a software engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="bg-accent text-accent-contrast fixed top-2 left-2 z-[70] -translate-y-20 rounded-full px-4 py-2 text-sm font-semibold focus:translate-y-0"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <BackdropShapes />
          <Navbar />
          <main id="main" className="flex-1 pt-32 print:pt-0">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
