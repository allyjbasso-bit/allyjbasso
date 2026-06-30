import { dailyInbox as seedDailyInbox, inboxItems as seedInboxItems, type InboxItem } from "@/lib/mock-data";

/** Daily Inbox items for an organization. See the tenant-scope note in ./jobs.ts. */
export function getInboxItems(organizationId: string): InboxItem[] {
  void organizationId;
  return seedInboxItems;
}

export function getDailyInbox(organizationId: string): string[] {
  void organizationId;
  return seedDailyInbox;
}
