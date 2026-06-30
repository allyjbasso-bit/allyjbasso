import {
  assignedPeople as seedAssignedPeople,
  cleanerMessages as seedCleanerMessages,
  contentDrafts as seedContentDrafts,
  followUpReminders as seedFollowUpReminders,
  type AssignedPerson
} from "@/lib/mock-data";

/**
 * Day-to-day operational data (roster, follow-ups, messages, marketing drafts)
 * for an organization. See the tenant-scope note in ./jobs.ts.
 */

/** The cleaners on the team. Becomes the Employees table once auth exists. */
export function getCleaners(organizationId: string): AssignedPerson[] {
  void organizationId;
  return seedAssignedPeople;
}

export function getFollowUpReminders(organizationId: string): string[] {
  void organizationId;
  return seedFollowUpReminders;
}

export function getContentDrafts(organizationId: string) {
  void organizationId;
  return seedContentDrafts;
}

export function getCleanerMessages(organizationId: string, jobId: string) {
  void organizationId;
  return seedCleanerMessages.filter((message) => message.jobId === jobId);
}
