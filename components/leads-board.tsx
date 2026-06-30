"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { generateLeadReplyDraft } from "@/lib/ai-mocks";
import type { Lead, Role } from "@/lib/data";

export function LeadsBoard({ leads, role }: { leads: Lead[]; role: Role }) {
  const [openLead, setOpenLead] = useState<string | null>(leads[0]?.id ?? null);

  return (
    <AppShell role={role} title="Leads">
      <section className="mb-4 rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">Reply in 5 Seconds</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">Draft replies while Rachel is cleaning</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">Draft only. No Angi, Facebook, or text messages are sent from this prototype.</p>
        <p className="mt-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700">
          Drafts ask for missing zip code, bedrooms, bathrooms, square footage, pets, one-time or recurring cleaning, and preferred days.
        </p>
      </section>

      <div className="space-y-3">
        {leads.map((lead) => (
          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" key={lead.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-emerald-700">{lead.source}</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">{lead.name}</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{lead.status}</span>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{lead.message}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>{lead.serviceType}</Pill>
              <Pill>{lead.urgency}</Pill>
              {Object.entries(lead.knownDetails).map(([key, value]) => value && <Pill key={key}>{key}: {value}</Pill>)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="tap-target rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white" onClick={() => setOpenLead(openLead === lead.id ? null : lead.id)}>
                AI Draft Reply
              </button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Schedule Walkthrough</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Mark Replied</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Mark Won</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Mark Lost</button>
            </div>
            {openLead === lead.id && (
              <div className="mt-3 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-950">
                <p>{generateLeadReplyDraft(lead)}</p>
                <button className="tap-target mt-3 w-full rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white">
                  Send after Rachel reviews
                </button>
                <p className="mt-3 text-xs font-black uppercase tracking-wide text-emerald-700">Draft preview only. Never auto-sent.</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </AppShell>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{children}</span>;
}
