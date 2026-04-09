import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vectoralogistics.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vectora Logistics | Air Freight, Ocean & Road Cargo",
    template: "%s | Vectora Logistics",
  },
  description:
    "Air, ocean, and road freight from Vectora Logistics. Track shipments with a VLA code. Warehousing, supply chain help, and packaging.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Vectora Logistics",
    title: "Vectora Logistics | Air Freight, Ocean & Road Cargo",
    description:
      "Air, ocean, and road freight with online VLA tracking, warehousing, and supply chain support.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vectora Logistics",
    description: "Air, ocean, and road cargo. Track shipments with your VLA code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
