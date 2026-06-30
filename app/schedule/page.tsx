import Link from "next/link";
import { AppShell, ComingSoonButton } from "@/components/app-shell";
import { Icon, iconPaths } from "@/components/icons";
import { assignedPeople, jobs, type Job, type JobStatus, type JobType } from "@/lib/mock-data";
import { normalizeRole, roleHref } from "@/lib/role-utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const typeStyles: Record<JobType, string> = {
  "Recurring Clean": "border-emerald-200 bg-emerald-50 text-emerald-950",
  "Deep Clean": "border-sky-200 bg-sky-50 text-sky-950",
  Walkthrough: "border-violet-200 bg-violet-50 text-violet-950",
  "Airbnb Turnover": "border-cyan-200 bg-cyan-50 text-cyan-950",
  "Move-Out Clean": "border-amber-200 bg-amber-50 text-amber-950"
};

const statusStyles: Record<JobStatus, string> = {
  Confirmed: "bg-emerald-100 text-emerald-800",
  "Needs Confirmation": "bg-amber-100 text-amber-900",
  "In Progress": "bg-sky-100 text-sky-900",
  Completed: "bg-slate-100 text-slate-700",
  Draft: "bg-slate-100 text-slate-600"
};

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function SchedulePage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);
  const visiblePeople = role === "becca" ? ["Becca"] : role === "rachelle" ? ["Rachelle"] : assignedPeople;

  return (
    <AppShell
      action={
        role === "rachel" ? (
          <button className="tap-target flex items-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white shadow-sm">
            <Icon className="h-5 w-5" path={iconPaths.plus} />
            New Job
          </button>
        ) : null
      }
      role={role}
      title="Dispatch Board"
    >
      <div className="mb-4 grid grid-cols-5 gap-2">
        {days.map((day) => (
          <button className={`tap-target rounded-2xl text-sm font-black ${day === "Mon" ? "bg-slate-950 text-white" : "bg-white text-slate-600 shadow-sm"}`} key={day}>
            {day}
          </button>
        ))}
      </div>

      <div className="mb-4 space-y-2">
        <Guardrail>Becca has two jobs scheduled at 2:00 PM</Guardrail>
        <Guardrail>Megan walkthrough is Thursday morning. House Brain stays Pending until notes are saved.</Guardrail>
      </div>

      <div className="space-y-4">
        {visiblePeople.map((person) => {
          const assigned = jobs.filter((job) => job.cleaner === person);
          return (
            <section className="rounded-3xl bg-white p-4 shadow-sm" key={person}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-950">{person}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{assigned.length} jobs</span>
              </div>
              <div className="space-y-3">
                {assigned.map((job, index) => (
                  <div key={job.id}>
                    <DispatchCard job={job} role={role} />
                    {index < assigned.length - 1 && <OpenSpace after={job} before={assigned[index + 1]} />}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-5">
        <ComingSoonButton>Share schedule with iPhone and Android employees</ComingSoonButton>
      </div>
    </AppShell>
  );
}

function DispatchCard({ job, role }: { job: Job; role: ReturnType<typeof normalizeRole> }) {
  const wrongPreference = !job.requestedDays.some((day) => day.slice(0, 3) === dayName(job.day));

  return (
    <article className={`rounded-2xl border p-3 ${typeStyles[job.type]}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-black">{job.day} {job.time} - {job.endTime}</p>
          <h3 className="text-base font-black">{job.clientName}</h3>
          <p className="text-sm font-semibold opacity-75">{job.address}</p>
        </div>
        <span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-black">{job.type}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-black ${statusStyles[job.status]}`}>{job.status}</span>
        {wrongPreference && <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-900">Wrong preferred day</span>}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {role === "rachel" && <button className="tap-target rounded-2xl bg-white px-3 py-3 text-sm font-black text-slate-950 shadow-sm">Assign cleaner</button>}
        <Link className="tap-target rounded-2xl bg-white px-3 py-3 text-center text-sm font-black text-slate-950 shadow-sm" href={roleHref(`/clients/${job.clientId}`, role)}>
          View client
        </Link>
        <Link className="tap-target rounded-2xl bg-slate-950 px-3 py-3 text-center text-sm font-black text-white shadow-sm" href={roleHref(`/cleaning-mode/${job.id}`, role)}>
          Start job
        </Link>
      </div>
    </article>
  );
}

function Guardrail({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 rounded-3xl bg-amber-100 p-3 text-sm font-black text-amber-950">
      <Icon className="mt-0.5 h-5 w-5 shrink-0" path={iconPaths.alert} />
      {children}
    </div>
  );
}

function OpenSpace({ after, before }: { after: Job; before: Job }) {
  return (
    <div className="my-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs font-black text-slate-500">
      <div className="h-px bg-slate-200" />
      <span className="rounded-full bg-white px-3 py-1 shadow-sm">{after.endTime} open / drive until {before.time}</span>
      <div className="h-px bg-slate-200" />
    </div>
  );
}

function dayName(day: string) {
  return day === "Tue" ? "Tue" : day === "Thu" ? "Thu" : day;
}
