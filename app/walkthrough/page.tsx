import { AppShell } from "@/components/app-shell";
import { structureWalkthroughVoiceNote } from "@/lib/ai-mocks";
import { normalizeRole } from "@/lib/role-utils";

const floorTypes = ["Hardwood", "Tile", "Carpet", "Vinyl"];
const countertops = ["Granite", "Marble", "Quartz", "Laminate"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const photoRooms = ["Exterior / front door", "Kitchen", "Bathrooms", "Bedrooms", "Living areas", "Damage / problem areas"];

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function WalkthroughPage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);
  const voiceResult = structureWalkthroughVoiceNote(
    "Three bedroom, two bath. Hardwood downstairs, tile upstairs. Marble countertops in the kitchen. They have two golden retrievers that shed a lot. Garage code is 1846. They want every other Thursday morning. They work from home, so don't vacuum during Zoom meetings."
  );

  return (
    <AppShell role={role} title="Walkthrough Notes">
      <form className="space-y-4">
        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-sm font-black text-emerald-700">Replace the paper planner</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Save details straight into House Brain</h2>
        </section>

        <section className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
          <p className="text-sm font-black text-emerald-300">Walkthrough Voice Notes</p>
          <h2 className="mt-1 text-2xl font-black">Tap once. Talk naturally. Review the structured notes.</h2>
          <button className="tap-target mt-4 w-full rounded-2xl bg-emerald-700 px-4 py-4 text-base font-black text-white">
            Start Walkthrough
          </button>
          <p className="mt-3 text-sm font-bold leading-6 text-white/75">
            Mock speech-to-text preview. No audio is recorded in this prototype.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-sm font-black text-emerald-700">AI structured from voice</p>
          <h2 className="mt-1 text-lg font-black text-slate-950">Review before saving</h2>
          <VoiceGroup title="Client profile" items={voiceResult.clientProfile} />
          <VoiceGroup title="House Brain notes" items={voiceResult.houseBrainNotes} />
          <VoiceGroup title="Cleaning checklist" items={voiceResult.cleaningChecklist} />
          <VoiceGroup title="Supplies needed" items={voiceResult.suppliesNeeded} />
          <VoiceGroup title="Schedule preferences" items={voiceResult.schedulePreferences} />
          <VoiceGroup title="Follow-up questions" items={voiceResult.followUpQuestions} />
          <div className="mt-3 rounded-2xl bg-emerald-50 px-3 py-3 text-sm font-black text-emerald-900">
            Suggested quote: {voiceResult.suggestedQuote}
          </div>
        </section>

        <Field label="Client name" placeholder="Megan" />
        <Field label="Phone" placeholder="(555) 903-1277" />
        <Field label="Address" placeholder="913 Bayberry Lane" />
        <Checklist title="Preferred cleaning days" options={days} />
        <label className="block rounded-3xl bg-white p-4 shadow-sm">
          <span className="text-sm font-black text-slate-600">Requested cleaning type</span>
          <select className="tap-target mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-base font-bold text-slate-950">
            <option>Recurring Clean</option>
            <option>Deep Clean</option>
            <option>Move-Out Clean</option>
            <option>Walkthrough</option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bedrooms" placeholder="3" type="number" />
          <Field label="Bathrooms" placeholder="2.5" type="number" />
        </div>
        <Field label="Square footage" placeholder="1,850" type="number" />

        <Checklist title="Floor types" options={floorTypes} />
        <Checklist title="Countertop types" options={countertops} />

        <Field label="Pets" placeholder="Small dog, friendly after greeting" />
        <label className="block rounded-3xl bg-white p-4 shadow-sm">
          <span className="text-sm font-black text-slate-600">Clutter level</span>
          <select className="tap-target mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-base font-bold text-slate-950">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <Field label="Products needed" placeholder="Granite polish, pet-safe deodorizer" />
        <Field label="Products to avoid" placeholder="Vinegar, heavy fragrance" />
        <Field label="Access notes" placeholder="Garage code, lockbox, door to use" />
        <Field label="Parking notes" placeholder="Street parking, driveway side, HOA notes" />

        <label className="block rounded-3xl bg-white p-4 shadow-sm">
          <span className="text-sm font-black text-slate-600">Special requests</span>
          <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-base font-semibold text-slate-950" placeholder="Rooms to skip, delicate surfaces, recurring task requests..." />
        </label>

        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">Photo placeholders by room</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {photoRooms.map((room) => (
              <div className="aspect-[4/3] rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3 text-xs font-black text-slate-500" key={room}>
                {room}
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
          <p className="text-sm font-bold text-white/70">Quote estimate placeholder</p>
          <p className="mt-1 text-3xl font-black">$190 - $245</p>
        </div>

        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-sm font-black text-emerald-700">Estimate Builder</p>
          <h2 className="mt-1 text-lg font-black text-slate-950">Suggested quote factors</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Bedrooms", "Bathrooms", "Pets", "Flooring", "Frequency", "Deep clean", "Distance", "Clutter"].map((factor) => (
              <span className="rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-700" key={factor}>{factor}</span>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">Rachel edits the quote before sending. AI pricing is not connected.</p>
        </section>

        <button className="tap-target w-full rounded-2xl bg-emerald-700 px-4 py-4 text-base font-black text-white shadow-sm">
          Save as House Brain
        </button>
      </form>
    </AppShell>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block rounded-3xl bg-white p-4 shadow-sm">
      <span className="text-sm font-black text-slate-600">{label}</span>
      <input className="tap-target mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-base font-bold text-slate-950" placeholder={placeholder} type={type} />
    </label>
  );
}

function Checklist({ title, options }: { title: string; options: string[] }) {
  return (
    <fieldset className="rounded-3xl bg-white p-4 shadow-sm">
      <legend className="text-sm font-black text-slate-600">{title}</legend>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((option, index) => (
          <label className="tap-target flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-black text-slate-800" key={option}>
            <input className="h-5 w-5 accent-emerald-700" defaultChecked={index === 0} type="checkbox" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function VoiceGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-3 rounded-2xl bg-slate-50 px-3 py-3">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{title}</p>
      <div className="mt-2 space-y-1">
        {items.map((item) => (
          <p className="text-sm font-bold leading-6 text-slate-800" key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}
