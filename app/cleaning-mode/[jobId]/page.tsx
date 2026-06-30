import { notFound } from "next/navigation";
import { CleaningMode } from "@/components/cleaning-mode";
import { clients, jobs } from "@/lib/mock-data";
import { normalizeRole } from "@/lib/role-utils";

export function generateStaticParams() {
  return jobs.map((job) => ({ jobId: job.id }));
}

export default async function CleaningModePage({
  params,
  searchParams
}: {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const { jobId } = await params;
  const { role: roleParam } = await searchParams;
  const role = normalizeRole(roleParam);
  const job = jobs.find((item) => item.id === jobId);

  if (!job) {
    notFound();
  }

  const client = clients.find((item) => item.id === job.clientId);

  return <CleaningMode client={client} job={job} role={role} />;
}
