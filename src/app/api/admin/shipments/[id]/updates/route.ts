import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify the parent shipment exists first
    const exists = await prisma.shipment.findUnique({ where: { id }, select: { id: true } });
    if (!exists) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    const body = await request.json();
    const { status, location, description } = body;
    if (!status?.trim()) {
      return NextResponse.json({ error: "status is required" }, { status: 400 });
    }

    const update = await prisma.shipmentUpdate.create({
      data: {
        shipmentId:  id,
        status:      String(status).trim(),
        location:    location?.trim()    || null,
        description: description?.trim() || null,
      },
    });

    // Sync the parent shipment's status field
    await prisma.shipment.update({
      where: { id },
      data: { status: String(status).trim() },
    });

    return NextResponse.json(update, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
