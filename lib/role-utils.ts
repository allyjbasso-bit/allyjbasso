import type { Role } from "@/lib/mock-data";

export function normalizeRole(value?: string | string[]): Role {
  const role = Array.isArray(value) ? value[0] : value;
  if (role === "becca" || role === "rachelle" || role === "emily" || role === "noah") {
    return role;
  }
  return "rachel";
}

export function personForRole(role: Role) {
  if (role === "becca") return "Becca";
  if (role === "rachelle") return "Rachelle";
  return "Rachel";
}

export function roleHref(href: string, role: Role) {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}role=${role}`;
}

export function navForRole(role: Role) {
  if (role === "becca" || role === "rachelle") {
    return [
      { label: "Today", href: "/", iconKey: "dashboard" },
      { label: "Schedule", href: "/schedule", iconKey: "schedule" },
      { label: "Houses", href: "/clients", iconKey: "clients" },
      { label: "Notes", href: "/walkthrough", iconKey: "walkthrough" }
    ] as const;
  }

  if (role === "emily") {
    return [
      { label: "Turnovers", href: "/airbnb", iconKey: "dashboard" },
      { label: "Properties", href: "/airbnb", iconKey: "clients" },
      { label: "Issues", href: "/airbnb", iconKey: "leads" },
      { label: "Messages", href: "/airbnb", iconKey: "walkthrough" }
    ] as const;
  }

  if (role === "noah") {
    return [
      { label: "Properties", href: "/airbnb", iconKey: "clients" },
      { label: "Turnovers", href: "/airbnb", iconKey: "schedule" },
      { label: "Issues", href: "/airbnb", iconKey: "leads" }
    ] as const;
  }

  return [
    { label: "Dashboard", href: "/", iconKey: "dashboard" },
    { label: "Inbox", href: "/inbox", iconKey: "leads" },
    { label: "Schedule", href: "/schedule", iconKey: "schedule" },
    { label: "House Brain", href: "/clients", iconKey: "clients" },
    { label: "Airbnb", href: "/airbnb", iconKey: "walkthrough" },
    { label: "More", href: "/more", iconKey: "plus" }
  ] as const;
}
