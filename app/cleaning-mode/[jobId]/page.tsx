import { notFound } from "next/navigation";
import { CleaningMode } from "@/components/cleaning-mode";
import { getCleanerMessages, getClientById, getCurrentOrganizationId, getJobById, getJobs } from "@/lib/data";
import { normalizeRole } from "@/lib/role-utils";

export function generateStaticParams() {
  return getJobs(getCurrentOrganizationId()).map((job) => ({ jobId: job.id }));
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
  const organizationId = getCurrentOrganizationId();
  const job = getJobById(organizationId, jobId);

  if (!job) {
    notFound();
  }

  const client = getClientById(organizationId, job.clientId);
  const messages = getCleanerMessages(organizationId, job.id);

  return <CleaningMode client={client} job={job} messages={messages} role={role} />;
}
