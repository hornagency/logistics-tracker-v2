import { cache } from "react";
import { prisma } from "@/lib/db";

const DEFAULTS = {
  email: "contact@vectoralogistics.com",
  // Placeholder; override in Admin ▸ Contact or DB.
  phone: "+44 20 7123 4567",
  officeHoursLine1: "Mon – Fri, 8 am – 6 pm (GMT)",
  officeHoursLine2: "Shipment tracking: 24/7 online",
} as const;

export type ContactSettings = {
  email: string;
  phone: string;
  officeHoursLine1: string;
  officeHoursLine2: string | null;
};

/** Default values when no row exists or on error. Exported for API fallbacks. */
export function getContactDefaults(): ContactSettings {
  return { ...DEFAULTS, officeHoursLine2: DEFAULTS.officeHoursLine2 };
}

/**
 * Returns contact settings for the public site. Never throws: falls back to defaults
 * if the table is missing, empty, or the query fails (keeps the site stable).
 * Cached per request so layout + page share one query.
 */
export const getContactSettings = cache(async (): Promise<ContactSettings> => {
  try {
    const row = await prisma.contactSettings.findFirst({ orderBy: { updatedAt: "desc" } });
    if (!row) return { ...DEFAULTS, officeHoursLine2: DEFAULTS.officeHoursLine2 };
    return {
      email: row.email || DEFAULTS.email,
      phone: row.phone || DEFAULTS.phone,
      officeHoursLine1: row.officeHoursLine1 || DEFAULTS.officeHoursLine1,
      officeHoursLine2: row.officeHoursLine2 ?? DEFAULTS.officeHoursLine2,
    };
  } catch {
    return { ...DEFAULTS, officeHoursLine2: DEFAULTS.officeHoursLine2 };
  }
});
