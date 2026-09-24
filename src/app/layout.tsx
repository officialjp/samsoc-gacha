import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "SAMSOC Gacha",
  description: "Simple gacha app for your gacha needs!",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export const viewport: Viewport = {
  themeColor: "#111827",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
