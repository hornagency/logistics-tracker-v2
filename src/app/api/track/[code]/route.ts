import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  if (!code?.trim()) {
    return NextResponse.json({ error: "Tracking code required" }, { status: 400 });
  }

  const shipment = await prisma.shipment.findUnique({
    where: { trackingCode: code.trim().toUpperCase() },
    include: { updates: { orderBy: { createdAt: "desc" } } },
  });

  if (!shipment) {
    return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
  }

  // Never expose the internal database id to the public
  return NextResponse.json({
    trackingCode:     shipment.trackingCode,
    origin:           shipment.origin,
    destination:      shipment.destination,
    status:           shipment.status,
    serviceType:      shipment.serviceType,
    createdAt:        shipment.createdAt.toISOString(),
    // Sender / Shipper (for tracking display)
    senderName:       shipment.senderName    ?? null,
    senderAddress:    shipment.senderAddress ?? null,
    // Receiver / Consignee
    recipientName:    shipment.recipientName    ?? null,
    recipientAddress: shipment.recipientAddress ?? null,
    // Delivery & insurance
    signatureRequired: shipment.signatureRequired,
    declaredValue:     shipment.declaredValue   ?? null,
    estimatedDelivery: shipment.estimatedDelivery?.toISOString() ?? null,
    updates: shipment.updates.map((u) => ({
      status:      u.status,
      location:    u.location,
      description: u.description,
      createdAt:   u.createdAt.toISOString(),
    })),
  });
}
