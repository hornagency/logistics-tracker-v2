import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ShipmentEdit } from "@/app/admin/ShipmentEdit";

export default async function AdminShipmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { updates: { orderBy: { createdAt: "desc" } } },
  });
  if (!shipment) notFound();
  return <ShipmentEdit shipment={shipment} />;
}
