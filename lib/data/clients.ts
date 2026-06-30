import {
  clients as seedClients,
  houseHealthScores as seedHouseHealthScores,
  houseTimelines as seedHouseTimelines,
  photoFolders as seedPhotoFolders,
  recurringRequests as seedRecurringRequests,
  type Client
} from "@/lib/mock-data";

/**
 * Clients and their House Brain (living memory) for an organization.
 *
 * `organizationId` is required at this seam for tenant scoping even though the
 * single-tenant seed does not filter on it yet. See the note in ./jobs.ts.
 */
export function getClients(organizationId: string): Client[] {
  void organizationId;
  return seedClients;
}

export function getClientById(organizationId: string, clientId: string): Client | undefined {
  return getClients(organizationId).find((client) => client.id === clientId);
}

export function getHouseTimeline(organizationId: string, clientId: string): string[] {
  void organizationId;
  return seedHouseTimelines[clientId];
}

export function getHouseHealthScore(organizationId: string, clientId: string) {
  void organizationId;
  return seedHouseHealthScores[clientId];
}

export function getRecurringRequests(organizationId: string, clientId: string) {
  void organizationId;
  return seedRecurringRequests[clientId];
}

export function getPhotoFolders(organizationId: string): string[] {
  void organizationId;
  return seedPhotoFolders;
}
