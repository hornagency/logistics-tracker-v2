import { getContactSettings } from "@/lib/contact";
import { ContactForm } from "./ContactForm";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const contact = await getContactSettings();
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Contact Section</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edit the email, phone, and office hours shown on the public site (homepage contact block and footer).
      </p>
      <ContactForm initial={contact} />
    </div>
  );
}
