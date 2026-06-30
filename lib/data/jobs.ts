import { jobs as seedJobs, type Job } from "@/lib/mock-data";

/**
 * Jobs for an organization.
 *
 * The prototype holds a single tenant's seed data, so `organizationId` is not
 * yet used to filter — but it is required at this seam so every caller is
 * already tenant-aware. When Supabase lands, only these bodies change (add an
 * `.eq("organization_id", organizationId)` filter / rely on RLS); the callers
 * stay identical. See supabase/schema.sql.
 */
export function getJobs(organizationId: string): Job[] {
  void organizationId;
  return seedJobs;
}

export function getJobById(organizationId: string, jobId: string): Job | undefined {
  return getJobs(organizationId).find((job) => job.id === jobId);
}

export function getJobsForDay(organizationId: string, day: string): Job[] {
  return getJobs(organizationId).filter((job) => job.day === day);
}

export function getJobsForCleaner(organizationId: string, cleaner: string): Job[] {
  return getJobs(organizationId).filter((job) => job.cleaner === cleaner);
}
