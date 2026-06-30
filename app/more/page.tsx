import { AppShell, ComingSoonButton } from "@/components/app-shell";
import { generateFacebookDraft, generateGoogleBusinessDraft } from "@/lib/ai-mocks";
import { getClients, getContentDrafts, getCurrentOrganizationId, getFollowUpReminders, getJobs, getSupplyInventory } from "@/lib/data";
import { normalizeRole } from "@/lib/role-utils";

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function MorePage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);
  const organizationId = getCurrentOrganizationId();
  const clients = getClients(organizationId);
  const contentDrafts = getContentDrafts(organizationId);
  const followUpReminders = getFollowUpReminders(organizationId);
  const jobs = getJobs(organizationId);
  const supplyInventory = getSupplyInventory(organizationId);

  return (
    <AppShell role={role} title="Marketing Helper">
      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">Draft only</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">Before / after content drafts</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          Help Rachel use job photos without posting anything automatically. Draft only. Never posted automatically.
        </p>
      </section>

      <section className="mt-4 space-y-3">
        {contentDrafts.map((draft) => (
          <article className="rounded-3xl bg-white p-4 shadow-sm" key={draft.id}>
            {(() => {
              const job = jobs.find((item) => draft.title.includes(item.clientName));
              const client = clients.find((item) => item.id === job?.clientId);
              return job ? (
                <div className="mb-3 rounded-2xl bg-emerald-50 px-3 py-3 text-sm font-bold leading-6 text-emerald-950">
                  {generateFacebookDraft(job, client)}
                </div>
              ) : null;
            })()}
            <p className="text-sm font-black text-emerald-700">{draft.status}</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">{draft.title}</h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {draft.photos.map((photo) => (
                <div className="aspect-square rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-2 text-xs font-bold text-slate-500" key={photo}>{photo}</div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="tap-target rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white">Facebook caption draft</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Instagram draft</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Google post draft</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Before/after collage</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Story draft</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Review request</button>
              <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Mark posted manually</button>
            </div>
            {(() => {
              const job = jobs.find((item) => draft.title.includes(item.clientName));
              return job ? (
                <p className="mt-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-bold leading-6 text-slate-700">
                  {generateGoogleBusinessDraft(job)}
                </p>
              ) : null;
            })()}
          </article>
        ))}
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Supply inventory</h2>
        <div className="mt-3 space-y-2">
          {supplyInventory.map((item) => (
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-3" key={item.name}>
              <div className="min-w-0 flex-1">
                <p className="font-black text-slate-950">{item.name}</p>
                <p className="text-sm font-semibold text-slate-500">{item.quantity} {item.unit} on hand</p>
                <div className="mt-2 h-2 rounded-full bg-white">
                  <div className={`h-2 rounded-full ${item.quantity <= item.reorderAt ? "bg-amber-400" : "bg-emerald-500"}`} style={{ width: `${Math.min(100, item.quantity * 22)}%` }} />
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${item.quantity <= item.reorderAt ? "bg-amber-100 text-amber-950" : "bg-emerald-100 text-emerald-800"}`}>
                {item.quantity <= item.reorderAt ? "Order another" : "Stocked"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Today's jobs need</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {supplyInventory.filter((item) => item.neededToday).map((item) => (
            <span className="rounded-full bg-emerald-100 px-3 py-2 text-sm font-black text-emerald-900" key={item.name}>{item.name}</span>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Follow-up reminders</h2>
        <div className="mt-3 space-y-2">
          {followUpReminders.map((item) => (
            <div className="rounded-2xl bg-amber-50 px-3 py-3 text-sm font-black text-amber-950" key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Jobs waiting for admin</h2>
        <div className="mt-3 space-y-2">
          {jobs.filter((job) => job.waitingForInvoice || job.waitingForPost || job.needsFollowUp).map((job) => (
            <div className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-700" key={job.id}>
              {job.clientName}: {job.waitingForInvoice ? "invoice needed" : job.waitingForPost ? "Facebook post needed" : "follow-up needed"}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-4">
        <ComingSoonButton>Real Facebook or Google Business posting</ComingSoonButton>
      </div>
    </AppShell>
  );
}
