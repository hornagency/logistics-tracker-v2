import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Shipment | Crystal Sky Logistics",
  description:
    "Enter your Crystal Sky Logistics tracking code to get real-time updates on your shipment's location, status, and estimated delivery.",
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
