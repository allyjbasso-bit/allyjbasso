import Link from "next/link";
import { roles, type Role } from "@/lib/mock-data";
import { roleHref } from "@/lib/role-utils";

const roleOrder: Role[] = ["rachel", "becca", "rachelle", "emily", "noah"];

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-8 pt-8 sm:max-w-3xl">
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <p className="text-sm font-bold text-emerald-700">CleanDesk AI</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">Choose a role</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          Mock login only. Each role shows the workflow and data they should see.
        </p>
      </section>

      <section className="mt-4 space-y-3">
        {roleOrder.map((role) => (
          <Link className="tap-target block rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" href={roleHref("/", role)} key={role}>
            <p className="text-lg font-black text-slate-950">{roles[role].label}</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{roles[role].description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
