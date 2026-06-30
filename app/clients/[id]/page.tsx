import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell, ComingSoonButton } from "@/components/app-shell";
import { Icon, iconPaths } from "@/components/icons";
import { generateHouseBrainReminders, structureVoiceNote } from "@/lib/ai-mocks";
import { clients, houseHealthScores, houseTimelines, photoFolders, recurringRequests } from "@/lib/mock-data";
import { normalizeRole, roleHref } from "@/lib/role-utils";

export function generateStaticParams() {
  return clients.map((client) => ({ id: client.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ role?: string }>;
};

export default async function ClientDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);
  const client = clients.find((item) => item.id === id);

  if (!client) {
    notFound();
  }

  const reminders = generateHouseBrainReminders(client);
  const structuredNote = structureVoiceNote("Customer got a new puppy, don't clean the office anymore, and wants baseboards every other visit.");
  const timeline = houseTimelines[client.id] ?? client.visitHistory;
  const requests = recurringRequests[client.id] ?? [
    { cadence: "Every visit", task: "Follow saved house instructions" },
    { cadence: "Monthly", task: "Ask Rachel if any recurring tasks should be added" }
  ];
  const health = houseHealthScores[client.id];

  return (
    <AppShell role={role} title="House Brain">
      <Link className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-sm font-bold text-emerald-700 shadow-sm" href={roleHref("/clients", role)}>
        Back to houses
      </Link>

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">{client.frequency}</p>
        <h1 className="mt-1 text-2xl font-black text-slate-950">{client.name}</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">{client.phone}</p>
        <p className="mt-1 text-lg font-black text-slate-950">{client.address}</p>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-2">
        <PhotoBox label="House photo" />
        <PhotoBox label="Front door" />
      </section>

      {health && (
        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-sm font-black text-emerald-700">House Health Score</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{health.score}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{health.trend}</p>
          <p className="mt-3 rounded-2xl bg-amber-50 px-3 py-3 text-sm font-black text-amber-950">{health.recommendation}</p>
        </section>
      )}

      <section className="mt-4 grid gap-3">
        <Info title="Preferred days" value={client.preferredDays.join(", ")} />
        <Info title="Where to park" value={client.parkingNotes} />
        <Info title="Access / garage code" value={client.accessNotes} />
        <Info title="Alarm notes" value={client.alarmNotes} />
        <Info title="Pets" value={client.pets} />
        <Info title="Floor types" value={client.floorType} />
        <Info title="Countertop types" value={client.countertopType} />
        <Info title="Products to use" value={client.productsNeeded.join(", ")} />
        <Info title="Products to avoid" value={client.productsToAvoid.join(", ")} />
        <Info title="Clutter notes" value={client.clutterNotes} />
        <Info title="Special requests" value={client.specialInstructions} />
        <Info title="Average cleaning time" value={client.averageCleaningTime} />
        <Info title="Last visit notes" value={client.lastVisitNotes} />
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">AI House Brain</p>
        <h2 className="mt-1 text-lg font-black text-slate-950">Reminders surfaced before each clean</h2>
        <div className="mt-3 space-y-2">
          {reminders.map((reminder) => (
            <p className="rounded-2xl bg-emerald-50 px-3 py-3 text-sm font-black text-emerald-900" key={reminder}>{reminder}</p>
          ))}
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">Mock AI organization. Rachel reviews changes before saving.</p>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">House Brain Timeline</h2>
        <div className="mt-3 space-y-2">
          {timeline.map((item, index) => (
            <div className="flex gap-3 rounded-2xl bg-slate-50 px-3 py-3" key={item}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white">{index + 1}</span>
              <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Property Photo Gallery</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {photoFolders.map((folder) => (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3" key={folder}>
              <p className="text-sm font-black text-slate-700">{folder}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">Photo placeholders</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Repeat requests</h2>
        <div className="mt-3 space-y-2">
          {requests.map((request) => (
            <div className="flex items-start justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-3" key={`${request.cadence}-${request.task}`}>
              <p className="text-sm font-black text-slate-950">{request.task}</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm">{request.cadence}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Room-by-room notes</h2>
        <div className="mt-3 space-y-2">
          {client.roomNotes.map((note) => (
            <p className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700" key={note}>{note}</p>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Icon className="h-5 w-5 text-emerald-700" path={iconPaths.camera} />
          <h2 className="text-lg font-black text-slate-950">Before / after photos</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {client.photoPlaceholders.map((photo) => (
            <div className="aspect-square rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-2 text-xs font-bold text-slate-500" key={photo}>{photo}</div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Voice notes</h2>
        <div className="mt-3 space-y-2">
          {client.voiceNotes.map((note) => (
            <p className="rounded-2xl bg-emerald-50 px-3 py-3 text-sm font-bold text-emerald-900" key={note}>{note}</p>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">AI Voice Note</p>
        <h2 className="mt-1 text-lg font-black text-slate-950">Structured from one spoken note</h2>
        <div className="mt-3 grid gap-2">
          <StructuredGroup title="Pets" values={structuredNote.pets} />
          <StructuredGroup title="Cleaning Requests" values={structuredNote.cleaningRequests} />
          <StructuredGroup title="House Brain Updates" values={structuredNote.houseBrainUpdates} />
        </div>
        <button className="tap-target mt-3 w-full rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white">
          Review and save to House Brain
        </button>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Visit history</h2>
        <div className="mt-3 space-y-2">
          {client.visitHistory.map((visit) => (
            <p className="rounded-2xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700" key={visit}>{visit}</p>
          ))}
        </div>
      </section>

      <div className="mt-4">
        <ComingSoonButton>Upload phone photos to this House Brain</ComingSoonButton>
      </div>
    </AppShell>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <p className="mt-1 font-black text-slate-950">{value}</p>
    </div>
  );
}

function PhotoBox({ label }: { label: string }) {
  return <div className="aspect-[4/3] rounded-3xl border border-dashed border-slate-300 bg-white p-4 text-sm font-black text-slate-500 shadow-sm">{label}</div>;
}

function StructuredGroup({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-3">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{title}</p>
      <ul className="mt-2 space-y-1">
        {values.map((value) => (
          <li className="text-sm font-bold text-slate-800" key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
