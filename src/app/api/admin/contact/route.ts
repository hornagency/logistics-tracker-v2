import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getContactDefaults } from "@/lib/contact";

export type ContactSettingsPayload = {
  email?: string;
  phone?: string;
  officeHoursLine1?: string;
  officeHoursLine2?: string | null;
};

/** GET: return current contact settings (or defaults). */
export async function GET() {
  try {
    const row = await prisma.contactSettings.findFirst({ orderBy: { updatedAt: "desc" } });
    const d = getContactDefaults();
    return NextResponse.json({
      email: row?.email ?? d.email,
      phone: row?.phone ?? d.phone,
      officeHoursLine1: row?.officeHoursLine1 ?? d.officeHoursLine1,
      officeHoursLine2: row?.officeHoursLine2 ?? d.officeHoursLine2,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(getContactDefaults());
  }
}

/** PATCH: update contact settings (upserts the single row). */
export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as ContactSettingsPayload;
    const email = typeof body.email === "string" ? body.email.trim() : undefined;
    const phone = typeof body.phone === "string" ? body.phone.trim() : undefined;
    const officeHoursLine1 = typeof body.officeHoursLine1 === "string" ? body.officeHoursLine1.trim() : undefined;
    const officeHoursLine2 = body.officeHoursLine2 === null || body.officeHoursLine2 === undefined
      ? undefined
      : typeof body.officeHoursLine2 === "string" ? body.officeHoursLine2.trim() : undefined;

    const existing = await prisma.contactSettings.findFirst({ orderBy: { updatedAt: "desc" } });
    const data = {
      ...(email !== undefined && { email: email || getContactDefaults().email }),
      ...(phone !== undefined && { phone: phone || getContactDefaults().phone }),
      ...(officeHoursLine1 !== undefined && { officeHoursLine1: officeHoursLine1 || getContactDefaults().officeHoursLine1 }),
      ...(officeHoursLine2 !== undefined && { officeHoursLine2: officeHoursLine2 || null }),
    };

    if (existing) {
      const updated = await prisma.contactSettings.update({
        where: { id: existing.id },
        data,
      });
      return NextResponse.json(updated);
    }

    const d = getContactDefaults();
    const created = await prisma.contactSettings.create({
      data: {
        email: data.email ?? d.email,
        phone: data.phone ?? d.phone,
        officeHoursLine1: data.officeHoursLine1 ?? d.officeHoursLine1,
        officeHoursLine2: data.officeHoursLine2 ?? d.officeHoursLine2,
      },
    });
    return NextResponse.json(created);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update contact settings" }, { status: 500 });
  }
}
