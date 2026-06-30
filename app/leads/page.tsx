import { LeadsBoard } from "@/components/leads-board";
import { normalizeRole } from "@/lib/role-utils";

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function LeadsPage({ searchParams }: PageProps) {
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);

  return <LeadsBoard role={role} />;
}
