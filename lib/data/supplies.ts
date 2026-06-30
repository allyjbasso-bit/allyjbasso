import { supplyInventory as seedSupplyInventory, type SupplyItem } from "@/lib/mock-data";

/** Supply inventory for an organization. See the tenant-scope note in ./jobs.ts. */
export function getSupplyInventory(organizationId: string): SupplyItem[] {
  void organizationId;
  return seedSupplyInventory;
}
