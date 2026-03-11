import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      trackingCode, origin, destination, status, serviceType,
      // Sender
      senderName, senderAddress, senderEmail, senderPhone,
      // Receiver
      recipientName, recipientAddress, recipientEmail, recipientPhone,
      // Package
      pieces, weight, dimensions, packageType, packageDesc, declaredValue, specialHandling,
      // Delivery
      estimatedDelivery, signatureRequired,
      // Misc
      notes,
    } = body;

    if (!trackingCode?.trim() || !origin?.trim() || !destination?.trim()) {
      return NextResponse.json(
        { error: "trackingCode, origin, and destination are required" },
        { status: 400 }
      );
    }

    const code = String(trackingCode).trim().toUpperCase();
    const existing = await prisma.shipment.findUnique({ where: { trackingCode: code } });
    if (existing) {
      return NextResponse.json({ error: "Tracking code already exists" }, { status: 409 });
    }

    const shipment = await prisma.shipment.create({
      data: {
        trackingCode:     code,
        origin:           String(origin).trim(),
        destination:      String(destination).trim(),
        status:           status?.trim()       || "Processing",
        serviceType:      serviceType?.trim()  || "General",
        // Sender
        senderName:       senderName?.trim()    || null,
        senderAddress:    senderAddress?.trim() || null,
        senderEmail:      senderEmail?.trim()   || null,
        senderPhone:      senderPhone?.trim()   || null,
        // Receiver
        recipientName:    recipientName?.trim()    || null,
        recipientAddress: recipientAddress?.trim() || null,
        recipientEmail:   recipientEmail?.trim()   || null,
        recipientPhone:   recipientPhone?.trim()   || null,
        // Package
        pieces:          pieces?.trim()          || null,
        weight:          weight?.trim()          || null,
        dimensions:      dimensions?.trim()      || null,
        packageType:     packageType?.trim()     || null,
        packageDesc:     packageDesc?.trim()     || null,
        declaredValue:   declaredValue?.trim()   || null,
        specialHandling: specialHandling?.trim() || null,
        // Delivery
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null,
        signatureRequired: Boolean(signatureRequired),
        // Misc
        notes: notes?.trim() || null,
      },
    });

    return NextResponse.json({ id: shipment.id, trackingCode: shipment.trackingCode }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
