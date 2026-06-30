import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Icon, iconPaths } from "@/components/icons";
import { clients } from "@/lib/mock-data";
import { normalizeRole, roleHref } from "@/lib/role-utils";

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function ClientsPage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);

  return (
    <AppShell role={role} title="House Brain">
      <div className="space-y-3">
        {clients.map((client) => (
          <Link className="block rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" href={roleHref(`/clients/${client.id}`, role)} key={client.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-emerald-700">{client.frequency}</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">{client.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">{client.address}</p>
              </div>
              <Icon className="h-6 w-6 text-slate-400" path={iconPaths.clients} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Tag>{client.pets}</Tag>
              <Tag>{client.accessNotes}</Tag>
              <Tag>{client.averageCleaningTime}</Tag>
              <Tag>{client.productsNeeded[0]}</Tag>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-2xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">{children}</span>;
}
