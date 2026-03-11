import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crystal Sky Logistics | Air Freight, Ocean & Road Cargo",
  description: "Fast, certified & flexible logistics solutions. Track your shipment in real time. Air freight, ocean freight, warehousing & supply chain.",
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
