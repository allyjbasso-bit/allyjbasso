import { AppShell, ComingSoonButton } from "@/components/app-shell";
import { getCurrentOrganizationId, getTurnovers } from "@/lib/data";
import { normalizeRole } from "@/lib/role-utils";

const checklist = [
  "Strip beds",
  "Wash / reload linens",
  "Replace towels",
  "Restock toiletries",
  "Restock coffee",
  "Check remotes",
  "Check damages",
  "Take completion photos",
  "Set thermostat",
  "Lock door"
];

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function AirbnbPage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);
  const isRachel = role === "rachel";
  const isEmily = role === "emily";
  const isNoah = role === "noah";
  const turnovers = getTurnovers(getCurrentOrganizationId());

  return (
    <AppShell role={role} title={isNoah ? "Noah Properties" : "Airbnb Turnovers"}>
      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-emerald-700">{isNoah ? "Read-only" : "Turnover workflow"}</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">
          {isRachel && "Manage Airbnb turnovers without constant texting"}
          {isEmily && "Request and track turnovers for Noah"}
          {isNoah && "View property status and issues"}
          {!isRachel && !isEmily && !isNoah && "Airbnb turnover status"}
        </h2>
      </section>

      {isEmily && (
        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">Request turnover</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="tap-target rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white">New request</button>
            <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Message Rachel</button>
          </div>
        </section>
      )}

      <section className="mt-4 space-y-3">
        {turnovers.map((turnover) => (
          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" key={turnover.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-emerald-700">{turnover.status}</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">{turnover.propertyName}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">{turnover.address}</p>
              </div>
              <span className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700">{turnover.assignedCleaner}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Badge>Guest checks out {turnover.checkoutTime}</Badge>
              <Badge>Checkout {turnover.checkoutTime}</Badge>
              <Badge>Check-in {turnover.checkinTime}</Badge>
              <Badge>Requested by {turnover.requestedBy}</Badge>
              <Badge>Owner {turnover.owner}</Badge>
            </div>
            {turnover.issue && <p className="mt-3 rounded-2xl bg-rose-50 px-3 py-3 text-sm font-black text-rose-900">{turnover.issue}</p>}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Badge>Supplies: towels, coffee, toiletries</Badge>
              <Badge>Missing items: towels</Badge>
              <Badge>Damage: check remotes and walls</Badge>
              <Badge>{turnover.status === "Completed" ? "Ready for next guest" : "Not ready yet"}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {turnover.completionPhotos.map((photo) => (
                <div className="aspect-square rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-2 text-xs font-bold text-slate-500" key={photo}>{photo}</div>
              ))}
            </div>
            {!isNoah && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Report issue</button>
                <button className="tap-target rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white">View checklist</button>
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Turnover checklist</h2>
        <div className="mt-3 space-y-2">
          {checklist.map((item) => (
            <label className="tap-target flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-800" key={item}>
              <input className="h-5 w-5 accent-emerald-700" type="checkbox" />
              {item}
            </label>
          ))}
        </div>
      </section>

      {!isNoah && <div className="mt-4"><ComingSoonButton>Real Airbnb calendar sync</ComingSoonButton></div>}
    </AppShell>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-2xl bg-slate-50 px-3 py-2 text-xs font-black text-slate-700">{children}</span>;
}
