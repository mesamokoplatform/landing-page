import type { Metadata } from "next";
import { cormorant, syne } from "./fonts";
import "./globals.css";
import { LoadingSplash } from "@/components/ui/LoadingSplash";

export const metadata: Metadata = {
  title: "Mesa Moko — The Future of Smart, Visual Dining",
  description: "Premium digital menus. Data-rich insights. Elevated guest experiences.",
};

// Runs before first paint: if the splash was already shown this session, hide it
// instantly so returning visitors never see it flash.
const splashSeenScript = `try{if(sessionStorage.getItem("mm-splash-seen"))document.documentElement.classList.add("splash-seen")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script below mutates <html>'s class before hydration (to hide
    // the splash for repeat visits), so suppress the expected attribute mismatch.
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashSeenScript }} />
      </head>
      <body className="bg-white text-ink font-serif antialiased">
        <LoadingSplash />
        {children}
      </body>
    </html>
  );
}
