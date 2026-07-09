import type { Metadata } from "next";
import { cormorant, syne } from "./fonts";
import "./globals.css";
import { LoadingSplash } from "@/components/ui/LoadingSplash";

export const metadata: Metadata = {
  title: "Mesa Moko — The Future of Smart, Visual Dining",
  description: "Premium digital menus. Data-rich insights. Elevated guest experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`}>
      <body className="bg-white text-ink font-serif antialiased">
        <LoadingSplash />
        {children}
      </body>
    </html>
  );
}
