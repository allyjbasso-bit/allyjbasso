/**
 * Organization (tenant) context.
 *
 * CleanDesk is multi-tenant: every cleaning company is an organization and must
 * only ever see its own data. The whole data-access layer takes an
 * `organizationId` so that tenant scoping is enforced at one seam.
 *
 * Today the prototype ships a single tenant's seed data and there is no auth, so
 * `getCurrentOrganizationId()` returns a fixed id. When Supabase auth lands
 * (roadmap priority #2), this resolves the signed-in user's active organization
 * instead — and nothing downstream has to change, because callers already pass
 * the id through.
 */

export type Organization = {
  id: string;
  name: string;
  plan: "starter" | "team" | "growth";
  createdAt: string;
};

/** The single seed tenant used until real organizations exist in the database. */
export const DEFAULT_ORGANIZATION_ID = "org-rachels-cleaning";

export const organizations: Organization[] = [
  { id: DEFAULT_ORGANIZATION_ID, name: "Rachel's Cleaning", plan: "team", createdAt: "2026-01-01" }
];

/**
 * Resolve the active organization for the current request.
 *
 * Stubbed to the seed tenant for now. Replace the body with the auth-derived
 * organization once Supabase sessions exist; keep the signature.
 */
export function getCurrentOrganizationId(): string {
  return DEFAULT_ORGANIZATION_ID;
}
