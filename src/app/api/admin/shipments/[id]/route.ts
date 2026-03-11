import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      origin, destination, status, serviceType,
      senderName, senderAddress, senderEmail, senderPhone,
      recipientName, recipientAddress, recipientEmail, recipientPhone,
      pieces, weight, dimensions, packageType, packageDesc, declaredValue, specialHandling,
      estimatedDelivery, signatureRequired,
      notes,
    } = body;

    const shipment = await prisma.shipment.update({
      where: { id },
      data: {
        ...(origin      !== undefined && { origin:      String(origin).trim() }),
        ...(destination !== undefined && { destination: String(destination).trim() }),
        ...(status      !== undefined && { status:      String(status).trim() }),
        ...(serviceType !== undefined && { serviceType: String(serviceType).trim() }),
        // Sender
        senderName:    senderName    != null ? String(senderName).trim()    || null : undefined,
        senderAddress: senderAddress != null ? String(senderAddress).trim() || null : undefined,
        senderEmail:   senderEmail   != null ? String(senderEmail).trim()   || null : undefined,
        senderPhone:   senderPhone   != null ? String(senderPhone).trim()   || null : undefined,
        // Receiver
        recipientName:    recipientName    != null ? String(recipientName).trim()    || null : undefined,
        recipientAddress: recipientAddress != null ? String(recipientAddress).trim() || null : undefined,
        recipientEmail:   recipientEmail   != null ? String(recipientEmail).trim()   || null : undefined,
        recipientPhone:   recipientPhone   != null ? String(recipientPhone).trim()   || null : undefined,
        // Package
        pieces:          pieces          != null ? String(pieces).trim()          || null : undefined,
        weight:          weight          != null ? String(weight).trim()          || null : undefined,
        dimensions:      dimensions      != null ? String(dimensions).trim()      || null : undefined,
        packageType:     packageType     != null ? String(packageType).trim()     || null : undefined,
        packageDesc:     packageDesc     != null ? String(packageDesc).trim()     || null : undefined,
        declaredValue:   declaredValue   != null ? String(declaredValue).trim()   || null : undefined,
        specialHandling: specialHandling != null ? String(specialHandling).trim() || null : undefined,
        // Delivery
        ...(estimatedDelivery !== undefined && {
          estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null,
        }),
        ...(signatureRequired !== undefined && { signatureRequired: Boolean(signatureRequired) }),
        // Misc
        notes: notes != null ? String(notes).trim() || null : undefined,
      },
    });

    return NextResponse.json(shipment);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
