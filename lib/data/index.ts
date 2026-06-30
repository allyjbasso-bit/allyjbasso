/**
 * Data-access layer for CleanDesk.
 *
 * Screens import data through this barrel — never directly from the seed module
 * (`@/lib/mock-data`). Every accessor is organization-scoped, so swapping the
 * seed implementation for Supabase later is a change behind this seam, not a
 * rewrite of the screens. See supabase/schema.sql for the target database.
 */

export * from "./types";
export * from "./org";
export * from "./jobs";
export * from "./clients";
export * from "./leads";
export * from "./airbnb";
export * from "./inbox";
export * from "./supplies";
export * from "./operations";
