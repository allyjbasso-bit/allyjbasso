"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon, iconPaths } from "@/components/icons";
import { generateFacebookDraft, generateGoogleBusinessDraft, generateJobSummary, generateReviewRequestDraft, structureVoiceNote } from "@/lib/ai-mocks";
import { cleanerMessages } from "@/lib/mock-data";
import type { Client, Job, Role } from "@/lib/mock-data";
import { roleHref } from "@/lib/role-utils";

const checklistByType: Record<Job["type"], string[]> = {
  "Recurring Clean": [
    "Kitchen counters, sink, appliance fronts",
    "Bathrooms cleaned and restocked",
    "Dust high-touch surfaces",
    "Vacuum bedrooms and living areas",
    "Mop hard floors",
    "Final room-by-room check"
  ],
  "Deep Clean": [
    "Baseboards and door frames",
    "Inside microwave and appliance fronts",
    "Showers, tubs, grout touch-up",
    "Cabinet fronts and handles",
    "Under furniture edges",
    "Final room-by-room check"
  ],
  Walkthrough: [
    "Confirm rooms and square footage",
    "Photograph special surfaces",
    "Ask about pets, products, and access",
    "Capture quote notes",
    "Confirm preferred cleaning days"
  ],
  "Move-Out Clean": [
    "Inside fridge and freezer",
    "Inside oven",
    "Inside cabinets and drawers",
    "Bathrooms deep cleaned",
    "Floors vacuumed and mopped",
    "Final photo set"
  ],
  "Airbnb Turnover": [
    "Strip beds",
    "Wash / reload linens",
    "Replace towels",
    "Restock toiletries and coffee",
    "Check remotes and damages",
    "Take completion photos",
    "Set thermostat and lock door"
  ]
};

const completionSteps = [
  "Did anything need extra attention?",
  "Any damage?",
  "Supplies running low?",
  "Take before/after photos",
  "Add House Brain notes",
  "AI Job Summary",
  "Generate invoice",
  "Generate Facebook post",
  "Generate Google post",
  "Request review",
  "Schedule next clean"
];

export function CleaningMode({ job, client, role = "rachel" }: { job: Job; client?: Client; role?: Role }) {
  const [completed, setCompleted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);
  const [checkedSupplies, setCheckedSupplies] = useState<string[]>([]);

  const supplies = useMemo(() => {
    const clientProducts = client?.productsNeeded ?? [];
    const jobSupplies = job.alerts.filter((alert) => alert.toLowerCase().includes("cleaner"));
    return Array.from(new Set([...clientProducts, ...jobSupplies]));
  }, [client?.productsNeeded, job.alerts]);

  const flags = [
    { label: "Pets", value: client?.pets ?? "Ask client on arrival" },
    { label: "Access", value: client?.accessNotes ?? "No access notes saved" },
    { label: "Products", value: supplies.join(", ") || "Use standard kit" },
    { label: "Surfaces", value: client?.countertopType ?? job.alerts[0] }
  ];
  const messages = cleanerMessages.filter((message) => message.jobId === job.id);

  if (completed) {
    return (
      <CleaningShell job={job} label="Completion" role={role}>
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-black text-emerald-700">Complete Job</p>
          <h1 className="mt-1 text-2xl font-black text-slate-950">Wrap up {job.clientName}</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            Save the visit record before moving on to the next house.
          </p>
          <p className="mt-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700">
            AI summaries, posts, and review requests are draft only. Rachel approves before anything is sent or posted.
          </p>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <div className="space-y-3">
            {completionSteps.map((step, index) => {
              const comingSoon = step === "Generate invoice" || step === "Schedule next clean";
              const active = activeStep === index;

              return (
                <button
                  className={`tap-target flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left font-black ${
                    active ? "bg-emerald-700 text-white" : "bg-slate-50 text-slate-800"
                  }`}
                  key={step}
                  onClick={() => setActiveStep(index)}
                >
                  <span>
                    {index + 1}. {step}
                  </span>
                  {comingSoon ? (
                    <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-wide ${active ? "bg-white/20" : "bg-white text-slate-500"}`}>
                      Coming soon
                    </span>
                  ) : (
                    <span aria-hidden="true">{active ? "Done" : "Open"}</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <CompletionPanel client={client} job={job} step={activeStep} />

        <Link className="tap-target mt-4 flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-4 py-4 text-base font-black text-white" href={roleHref("/", role)}>
          Back to Today's Route
        </Link>
      </CleaningShell>
    );
  }

  return (
    <CleaningShell job={job} label="Cleaning Mode" role={role}>
      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black text-emerald-700">Active job</p>
            <h1 className="mt-1 text-2xl font-black text-slate-950">{job.clientName}</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">{job.address}</p>
          </div>
          <div className="rounded-2xl bg-slate-950 px-3 py-2 text-right text-white">
            <p className="text-xs font-bold text-white/70">Timer</p>
            <p className="text-2xl font-black">00:24</p>
          </div>
        </div>
        <a
          className="tap-target mt-4 flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-4 py-4 text-base font-black text-white"
          href={`https://maps.apple.com/?q=${encodeURIComponent(job.address)}`}
        >
          Navigate
        </a>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-2">
        <ActionButton label="Before photos" icon={iconPaths.camera} />
        <ActionButton label="Voice notes" icon={iconPaths.leads} />
        <ActionButton label="Job timer" icon={iconPaths.schedule} />
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Supplies checklist</h2>
        <div className="mt-3 space-y-2">
          {supplies.map((item) => (
            <label className="tap-target flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-800" key={item}>
              <input
                checked={checkedSupplies.includes(item)}
                className="h-6 w-6 accent-emerald-700"
                onChange={() =>
                  setCheckedSupplies((current) => (current.includes(item) ? current.filter((saved) => saved !== item) : [...current, item]))
                }
                type="checkbox"
              />
              {item}
            </label>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Special alerts</h2>
        <div className="mt-3 space-y-2">
          {[...job.alerts, client?.specialInstructions].filter(Boolean).map((alert) => (
            <div className="flex items-center gap-2 rounded-2xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-900" key={String(alert)}>
              <Icon className="h-4 w-4 shrink-0" path={iconPaths.alert} />
              {alert}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Client flags</h2>
        <div className="mt-3 grid gap-2">
          {flags.map((flag) => (
            <div className="rounded-2xl bg-amber-50 px-3 py-3" key={flag.label}>
              <p className="text-xs font-black uppercase tracking-wide text-amber-700">{flag.label}</p>
              <p className="mt-1 text-sm font-bold leading-5 text-amber-950">{flag.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Job chat</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">Messages stay attached to this job instead of getting lost in texts.</p>
        <div className="mt-3 space-y-2">
          {(messages.length ? messages : [{ from: "Rachel", time: "Now", message: "No job messages yet." }]).map((message) => (
            <div className="rounded-2xl bg-slate-50 px-3 py-3" key={`${message.from}-${message.time}-${message.message}`}>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">{message.from} - {message.time}</p>
              <p className="mt-1 text-sm font-bold text-slate-800">{message.message}</p>
            </div>
          ))}
        </div>
        <button className="tap-target mt-3 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">Ask Rachel</button>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-950">Checklist</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
            {checkedTasks.length}/{checklistByType[job.type].length}
          </span>
        </div>
        <div className="space-y-2">
          {checklistByType[job.type].map((item) => (
            <label className="tap-target flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-800" key={item}>
              <input
                checked={checkedTasks.includes(item)}
                className="h-6 w-6 accent-emerald-700"
                onChange={() =>
                  setCheckedTasks((current) => (current.includes(item) ? current.filter((saved) => saved !== item) : [...current, item]))
                }
                type="checkbox"
              />
              {item}
            </label>
          ))}
        </div>
      </section>

      <button
        className="tap-target sticky bottom-4 mt-5 w-full rounded-2xl bg-emerald-700 px-4 py-5 text-lg font-black text-white shadow-[0_16px_32px_rgba(4,120,87,0.28)]"
        onClick={() => setCompleted(true)}
      >
        Complete Job
      </button>
    </CleaningShell>
  );
}

function CleaningShell({ children, label, job, role }: { children: React.ReactNode; label: string; job: Job; role: Role }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-6 pt-5 sm:max-w-3xl">
      <header className="sticky top-0 z-20 -mx-4 mb-4 border-b border-emerald-950/10 bg-[#f8fbf7]/90 px-4 pb-3 pt-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <Link className="tap-target rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm" href={roleHref("/", role)}>
            Exit
          </Link>
          <div className="text-right">
            <p className="text-sm font-bold text-emerald-700">{label}</p>
            <h1 className="text-xl font-black tracking-tight text-slate-950">{job.cleaner} - {job.time}</h1>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

function ActionButton({ label, icon }: { label: string; icon: string }) {
  return (
    <button className="tap-target rounded-3xl bg-white px-3 py-4 text-sm font-black text-slate-950 shadow-sm">
      <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <Icon className="h-5 w-5" path={icon} />
      </span>
      {label}
    </button>
  );
}

function CompletionPanel({ step, job, client }: { step: number; job: Job; client?: Client }) {
  const structuredNote = structureVoiceNote("Customer got a new puppy, don't clean the office anymore, and wants baseboards every other visit.");
  const summary = generateJobSummary(job, client);
  const panels = [
    {
      title: "Did anything need extra attention?",
      body: "Capture anything Rachel should remember before the next visit.",
      action: "Save attention note",
      lines: ["Kitchen deep cleaned", "Pet hair collected around mudroom bench", "Customer requested refrigerator next visit"]
    },
    {
      title: "Any damage?",
      body: "Record damage, maintenance issues, or anything the client should know.",
      action: "Save damage note",
      lines: ["No damage reported", "Optional: leaking faucet, broken lamp, wall scuff"]
    },
    {
      title: "Supplies running low?",
      body: "Update inventory before Rachel forgets what needs to be bought.",
      action: "Update supplies",
      lines: ["Granite cleaner low", "Pet hair rollers still stocked", "Stone spray needed before Jessica's next clean"]
    },
    {
      title: "Take before/after photos",
      body: "Add the finished-room photos that prove the job is complete and feed Marketing Helper.",
      action: "Choose photos",
      lines: ["Before kitchen photo placeholder", "After kitchen photo placeholder", "After bathroom photo placeholder"]
    },
    {
      title: "Add House Brain notes",
      body: "Capture voice or typed notes while the details are fresh.",
      action: "Record voice note",
      lines: [...structuredNote.pets, ...structuredNote.cleaningRequests]
    },
    {
      title: "AI Job Summary",
      body: "Summarize the visit into one clean note Rachel can review.",
      action: "Save summary",
      lines: summary
    },
    {
      title: "Generate invoice",
      body: "Invoice generation will come after the job flow is solid.",
      action: "Coming soon",
      lines: ["Real payment processing and accounting integrations are not connected."]
    },
    {
      title: "Generate Facebook post",
      body: "Create a draft from approved before/after photo placeholders and job notes.",
      action: "Review Facebook draft",
      lines: [generateFacebookDraft(job, client), "Draft only. Never posted automatically."]
    },
    {
      title: "Generate Google post",
      body: "Create a Google Business post draft after selected jobs.",
      action: "Review Google draft",
      lines: [generateGoogleBusinessDraft(job), "Draft only. Never posted automatically."]
    },
    {
      title: "Request review",
      body: "Generate a friendly text Rachel can approve before sending.",
      action: "Review text draft",
      lines: [generateReviewRequestDraft(job), "Draft preview only. Real texting is coming soon."]
    },
    {
      title: "Schedule next clean",
      body: `Pick the next visit for ${job.clientName} before leaving the driveway.`,
      action: "Coming soon",
      lines: ["Calendar sync and automated confirmations are coming soon."]
    }
  ];

  const panel = panels[step];

  return (
    <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">{panel.title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{panel.body}</p>
      <div className="mt-3 space-y-2">
        {panel.lines.map((line) => (
          <p className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-bold leading-6 text-slate-700" key={line}>{line}</p>
        ))}
      </div>
      <button className="tap-target mt-4 w-full rounded-2xl bg-emerald-700 px-4 py-4 text-base font-black text-white">
        {panel.action}
      </button>
    </section>
  );
}
