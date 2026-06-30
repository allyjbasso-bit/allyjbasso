import { leads as seedLeads, type Lead } from "@/lib/mock-data";

/** Incoming leads for an organization. See the tenant-scope note in ./jobs.ts. */
export function getLeads(organizationId: string): Lead[] {
  void organizationId;
  return seedLeads;
}
