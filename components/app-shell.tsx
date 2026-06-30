"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, iconPaths } from "@/components/icons";
import type { Role } from "@/lib/mock-data";
import { navForRole, roleHref } from "@/lib/role-utils";

type IconKey = keyof typeof iconPaths;

export function AppShell({
  children,
  title,
  action,
  role = "rachel"
}: {
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  role?: Role;
}) {
  const pathname = usePathname();
  const navItems = navForRole(role);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-5 sm:max-w-3xl">
      <header className="sticky top-0 z-20 -mx-4 mb-4 border-b border-emerald-950/10 bg-[#f8fbf7]/90 px-4 pb-3 pt-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-emerald-700">CleanDesk AI</p>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">{title}</h1>
          </div>
          {action}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-emerald-950/10 bg-white/95 px-2 pb-3 pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur">
        <div
          className={`mx-auto grid max-w-md gap-1 sm:max-w-3xl ${
            navItems.length === 3 ? "grid-cols-3" : navItems.length === 4 ? "grid-cols-4" : navItems.length === 6 ? "grid-cols-6" : "grid-cols-5"
          }`}
        >
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                className={`tap-target flex flex-col items-center justify-center rounded-2xl px-1 text-[11px] font-bold ${
                  active ? "bg-emerald-700 text-white" : "text-slate-500"
                }`}
                href={roleHref(item.href, role)}
                key={item.href}
              >
                <Icon className="mb-1 h-5 w-5" path={iconPaths[item.iconKey as IconKey]} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function ComingSoonButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="tap-target w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
      {children}
      <span className="ml-2 rounded-full bg-slate-100 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-500">Coming soon</span>
    </button>
  );
}

export function StatCard({ label, value, tone = "emerald" }: { label: string; value: string; tone?: "emerald" | "amber" | "sky" }) {
  const tones = {
    emerald: "bg-emerald-700 text-white",
    amber: "bg-amber-100 text-amber-950",
    sky: "bg-sky-100 text-sky-950"
  };

  return (
    <div className={`rounded-3xl p-4 shadow-sm ${tones[tone]}`}>
      <p className="text-sm font-bold opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}
