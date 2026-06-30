/**
 * Canonical domain types for the data-access layer.
 *
 * These are re-exported from the seed module today so there is a single import
 * surface (`@/lib/data`) for both data and types. When the seed module is
 * replaced by database-backed rows, the type definitions move here and the
 * seed file conforms to them — consumers keep importing from `@/lib/data`.
 */

export type {
  Role,
  AssignedPerson,
  JobType,
  JobStatus,
  Job,
  Client,
  Lead,
  AirbnbTurnover,
  InboxItem,
  SupplyItem
} from "@/lib/mock-data";
