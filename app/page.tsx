import Link from "next/link";
import { AppShell, ComingSoonButton } from "@/components/app-shell";
import { Icon, iconPaths } from "@/components/icons";
import { generateReminderTextPreviews } from "@/lib/ai-mocks";
import {
  getCleaners,
  getClients,
  getCurrentOrganizationId,
  getDailyInbox,
  getFollowUpReminders,
  getInboxItems,
  getJobs,
  getLeads,
  getSupplyInventory,
  getTurnovers,
  type Role
} from "@/lib/data";
import { normalizeRole, personForRole, roleHref } from "@/lib/role-utils";

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);

  if (role === "becca" || role === "rachelle") {
    return <CleanerDashboard role={role} />;
  }

  if (role === "emily") {
    return <EmilyDashboard role={role} />;
  }

  if (role === "noah") {
    return <NoahDashboard role={role} />;
  }

  return <RachelDashboard role={role} />;
}

function RachelDashboard({ role }: { role: Role }) {
  const organizationId = getCurrentOrganizationId();
  const jobs = getJobs(organizationId);
  const clients = getClients(organizationId);
  const leads = getLeads(organizationId);
  const supplyInventory = getSupplyInventory(organizationId);
  const inboxItems = getInboxItems(organizationId);
  const turnovers = getTurnovers(organizationId);
  const assignedPeople = getCleaners(organizationId);
  const dailyInbox = getDailyInbox(organizationId);
  const followUpReminders = getFollowUpReminders(organizationId);

  const todaysJobs = jobs.filter((job) => job.day === "Mon");
  const nextJob = todaysJobs[0];
  const nextClient = clients.find((client) => client.id === nextJob.clientId);
  const newLeads = leads.filter((lead) => lead.status === "New");
  const needsConfirmation = jobs.filter((job) => job.status === "Needs Confirmation");
  const walkthroughs = jobs.filter((job) => job.type === "Walkthrough" && job.status !== "Completed");
  const invoices = jobs.filter((job) => job.waitingForInvoice);
  const posts = jobs.filter((job) => job.waitingForPost);
  const packingList = Array.from(new Set([...(nextClient?.productsNeeded ?? []), ...supplyInventory.filter((item) => item.neededToday).map((item) => item.name)])).slice(0, 6);
  const reminders = generateReminderTextPreviews(nextJob, nextClient);

  return (
    <AppShell
      action={<Link className="rounded-full bg-white px-3 py-2 text-sm font-bold text-emerald-700 shadow-sm" href="/login">Switch role</Link>}
      role={role}
      title="Morning Brief"
    >
      <section className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
        <p className="text-sm font-black text-emerald-300">Good morning, Rachel</p>
        <h2 className="mt-1 text-3xl font-black">Today's focus</h2>
        <div className="mt-4 space-y-2 text-sm font-bold leading-6 text-white/85">
          <p>{todaysJobs.length} jobs</p>
          <p>{newLeads.length} new leads</p>
          <p>Emily needs supplies for {turnovers.length} Airbnb turnovers.</p>
          <p>Noah reported missing towels.</p>
          <p>Enough hardwood cleaner for 1 more job.</p>
          <p>You will likely run low on {supplyInventory.filter((item) => item.quantity <= item.reorderAt).map((item) => item.name).join(", ")}.</p>
        </div>
        <Link className="tap-target mt-4 flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-4 py-4 text-base font-black text-white" href={roleHref("/inbox", role)}>
          Start My Day
        </Link>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black text-emerald-700">Today's Route</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{nextJob.clientName}</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">{nextJob.time} - {nextJob.address}</p>
          </div>
          <span className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-800">{nextJob.cleaner}</span>
        </div>
        <div className="mt-3 space-y-2">
          {[...nextJob.alerts, nextClient?.pets, nextClient?.accessNotes].filter(Boolean).slice(0, 4).map((alert) => (
            <AlertLine key={String(alert)}>{alert}</AlertLine>
          ))}
        </div>
        <Link className="tap-target mt-4 flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-4 py-4 text-base font-black text-white" href={roleHref(`/cleaning-mode/${nextJob.id}`, role)}>
          Start Job
        </Link>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">Smart Packing</p>
        <h2 className="mt-1 text-lg font-black text-slate-950">Bring before leaving</h2>
        <div className="mt-3 grid gap-2">
          {packingList.map((item) => (
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-800" key={item}>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-xs text-white">OK</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">Automatic Reminder Texts</p>
        <h2 className="mt-1 text-lg font-black text-slate-950">Draft previews only</h2>
        <div className="mt-3 space-y-2">
          <ReminderPreview label="Client 24 hours before" text={reminders.client} />
          <ReminderPreview label="Cleaner tomorrow" text={reminders.cleaner} />
          <ReminderPreview label="Morning route" text={reminders.morning} />
          <ReminderPreview label="Walkthrough" text={reminders.walkthrough} />
          <ReminderPreview label="Airbnb" text={reminders.airbnb} />
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">Coming soon: real texting. Rachel approves before sending.</p>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <MetricLink href="/inbox" label="Needs attention" role={role} value={inboxItems.length} />
        <MetricLink href="/schedule" label="Need confirmation" role={role} tone="amber" value={needsConfirmation.length} />
        <MetricLink href="/walkthrough" label="Walkthroughs" role={role} value={walkthroughs.length} />
        <MetricLink href="/airbnb" label="Airbnb turnovers" role={role} tone="amber" value={turnovers.length} />
        <MetricLink href="/more" label="Waiting invoice" role={role} value={invoices.length} />
        <MetricLink href="/more" label="Need Facebook post" role={role} tone="amber" value={posts.length} />
      </section>

      <section className="mt-6 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Team status</h2>
        <div className="mt-3 space-y-2">
          {assignedPeople.map((person) => {
            const job = todaysJobs.find((item) => item.cleaner === person);
            return (
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3" key={person}>
                <div>
                  <p className="font-black text-slate-950">{person}</p>
                  <p className="text-sm font-semibold text-slate-500">{job ? `${job.status} - ${job.clientName}` : "Available"}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm">{job?.time ?? "Open"}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Daily Inbox</h2>
        <div className="mt-3 space-y-2">
          {dailyInbox.map((item) => (
            <div className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-700" key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Follow-up reminders</h2>
        <div className="mt-3 space-y-2">
          {followUpReminders.map((item) => (
            <div className="rounded-2xl bg-amber-50 px-3 py-3 text-sm font-black text-amber-950" key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <ComingSoonButton>Send automated confirmation and reminder texts</ComingSoonButton>
      </section>
    </AppShell>
  );
}

function CleanerDashboard({ role }: { role: Role }) {
  const organizationId = getCurrentOrganizationId();
  const jobs = getJobs(organizationId);
  const clients = getClients(organizationId);
  const person = personForRole(role);
  const assigned = jobs.filter((job) => job.cleaner === person);
  const nextJob = assigned[0];
  const client = clients.find((item) => item.id === nextJob.clientId);
  const routeAfter = assigned.slice(1);

  return (
    <AppShell action={<Link className="rounded-full bg-white px-3 py-2 text-sm font-bold text-emerald-700 shadow-sm" href="/login">Switch role</Link>} role={role} title={`${person}'s Today`}>
      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">Next job</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">{nextJob.clientName}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">{nextJob.time} - {nextJob.address}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a className="tap-target flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm" href={`https://maps.apple.com/?q=${encodeURIComponent(nextJob.address)}`}>
            Navigate
          </a>
          <Link className="tap-target flex items-center justify-center rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white" href={roleHref(`/cleaning-mode/${nextJob.id}`, role)}>
            Start Job
          </Link>
        </div>
      </section>

      <CleanerInfo title="Supplies to bring" items={client?.productsNeeded ?? nextJob.alerts} />
      <CleanerInfo title="Special warnings" items={[...nextJob.alerts, client?.countertopType ?? ""].filter(Boolean)} tone="rose" />
      <CleanerInfo title="Access notes" items={[client?.accessNotes ?? "No access notes saved", client?.parkingNotes ?? ""]} />
      <CleanerInfo title="Pets" items={[client?.pets ?? "No pet notes saved"]} tone="amber" />
      <CleanerInfo title="Checklist preview" items={["Photos before starting", "Supplies checked", "Room-by-room clean", "Voice note if anything changed"]} />

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Route after this</h2>
        <div className="mt-3 space-y-2">
          {routeAfter.length ? routeAfter.map((job) => (
            <div className="rounded-2xl bg-slate-50 px-3 py-3" key={job.id}>
              <p className="font-black text-slate-950">{job.time} - {job.clientName}</p>
              <p className="text-sm font-semibold text-slate-500">{job.address}</p>
            </div>
          )) : <p className="text-sm font-semibold text-slate-500">No more jobs assigned today.</p>}
        </div>
      </section>
    </AppShell>
  );
}

function EmilyDashboard({ role }: { role: Role }) {
  return (
    <AppShell action={<Link className="rounded-full bg-white px-3 py-2 text-sm font-bold text-emerald-700 shadow-sm" href="/login">Switch role</Link>} role={role} title="Emily Turnovers">
      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Airbnb turnover status</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">Request a turnover, check whether a cleaner is assigned, and report issues without texting Rachel all day.</p>
        <Link className="tap-target mt-4 flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-4 py-4 text-base font-black text-white" href={roleHref("/airbnb", role)}>
          Open Turnovers
        </Link>
      </section>
      <TurnoverList role={role} />
    </AppShell>
  );
}

function NoahDashboard({ role }: { role: Role }) {
  return (
    <AppShell action={<Link className="rounded-full bg-white px-3 py-2 text-sm font-bold text-emerald-700 shadow-sm" href="/login">Switch role</Link>} role={role} title="Noah Properties">
      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Read-only property view</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">See completed turnovers, open issues, and photo placeholders without managing Rachel's team.</p>
      </section>
      <TurnoverList role={role} />
    </AppShell>
  );
}

function TurnoverList({ role }: { role: Role }) {
  const turnovers = getTurnovers(getCurrentOrganizationId());

  return (
    <section className="mt-4 space-y-3">
      {turnovers.map((turnover) => (
        <Link className="block rounded-3xl bg-white p-4 shadow-sm" href={roleHref("/airbnb", role)} key={turnover.id}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black text-emerald-700">{turnover.status}</p>
              <h3 className="mt-1 text-xl font-black text-slate-950">{turnover.propertyName}</h3>
              <p className="text-sm font-semibold text-slate-500">{turnover.checkoutTime} checkout - {turnover.checkinTime} check-in</p>
            </div>
            <span className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700">{turnover.assignedCleaner}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}

function MetricLink({ href, label, role, value, tone = "slate" }: { href: string; label: string; role: Role; value: number; tone?: "slate" | "amber" }) {
  return (
    <Link className={`tap-target rounded-3xl p-4 font-black shadow-sm ${tone === "amber" ? "bg-amber-100 text-amber-950" : "bg-slate-950 text-white"}`} href={roleHref(href, role)}>
      <span className="block text-2xl">{value}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}

function CleanerInfo({ title, items, tone = "slate" }: { title: string; items: string[]; tone?: "slate" | "rose" | "amber" }) {
  const bg = tone === "rose" ? "bg-rose-50 text-rose-900" : tone === "amber" ? "bg-amber-50 text-amber-950" : "bg-slate-50 text-slate-700";

  return (
    <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">{title}</h2>
      <div className="mt-3 space-y-2">
        {items.filter(Boolean).map((item) => (
          <div className={`rounded-2xl px-3 py-3 text-sm font-black ${bg}`} key={item}>{item}</div>
        ))}
      </div>
    </section>
  );
}

function AlertLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-900">
      <Icon className="h-4 w-4 shrink-0" path={iconPaths.alert} />
      {children}
    </div>
  );
}

function ReminderPreview({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-3">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold leading-6 text-slate-800">{text}</p>
    </div>
  );
}
