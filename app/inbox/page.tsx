import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { inboxItems } from "@/lib/mock-data";
import { normalizeRole, roleHref } from "@/lib/role-utils";

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

const sourceHref: Record<string, string> = {
  Angi: "/leads",
  Facebook: "/leads",
  Walkthrough: "/walkthrough",
  Schedule: "/schedule",
  Review: "/more",
  Invoice: "/more",
  Client: "/clients",
  Cleaner: "/more",
  Airbnb: "/airbnb"
};

export default async function InboxPage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);
  const high = inboxItems.filter((item) => item.priority === "High").length;

  return (
    <AppShell role={role} title="Needs My Attention">
      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">Today's interruptions</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">{inboxItems.length} things need Rachel's attention</h2>
        <p className="mt-2 text-sm font-semibold text-slate-500">Stop checking Angi, Facebook, texts, voicemail, and cleaner messages. {high} high priority items are collected here.</p>
      </section>

      <section className="mt-4 rounded-3xl bg-slate-950 p-4 text-white shadow-sm">
        <p className="text-sm font-black text-emerald-300">AI Inbox Assistant</p>
        <h2 className="mt-1 text-2xl font-black">5 things need your attention today</h2>
        <div className="mt-3 space-y-2 text-sm font-bold leading-6 text-white/85">
          <p>Jessica confirmed tomorrow's cleaning.</p>
          <p>Megan walkthrough needs prep.</p>
          <p>Maryam requested refrigerator cleaning.</p>
          <p>Emily reported Grand Blanc Airbnb ready.</p>
          <p>Granite cleaner needs restocking.</p>
        </div>
      </section>

      <section className="mt-4 space-y-3">
        {inboxItems.map((item) => (
          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" key={item.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-emerald-700">{item.source}</p>
                <h2 className="mt-1 text-lg font-black text-slate-950">{item.title}</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${item.priority === "High" ? "bg-rose-100 text-rose-900" : item.priority === "Medium" ? "bg-amber-100 text-amber-950" : "bg-slate-100 text-slate-600"}`}>
                {item.priority}
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.detail}</p>
            <Link className="tap-target mt-3 flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white" href={roleHref(sourceHref[item.source], role)}>
              {item.action}
            </Link>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
