import { turnovers as seedTurnovers, type AirbnbTurnover } from "@/lib/mock-data";

/** Airbnb turnovers for an organization. See the tenant-scope note in ./jobs.ts. */
export function getTurnovers(organizationId: string): AirbnbTurnover[] {
  void organizationId;
  return seedTurnovers;
}
