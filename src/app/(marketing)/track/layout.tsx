import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Shipment | Vectora Logistics",
  description:
    "Look up a Vectora shipment with your VLA code: status, route fields, and milestones on file.",
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
