-- CleanDesk AI — initial multi-tenant schema (target of the data-access layer)
--
-- Status: design-of-record. Not yet executed against a live database. This file
-- defines the Postgres schema the `lib/data` accessors will be backed by when
-- Supabase auth + persistence land (roadmap priorities #1–#3).
--
-- Hard rule: every tenant table carries `organization_id` and is protected by a
-- Row Level Security policy so a company can only ever read/write its own rows.
-- Tenancy is enforced in the database, not just in application code.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tenancy
-- ---------------------------------------------------------------------------

create table organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  plan        text not null default 'starter' check (plan in ('starter', 'team', 'growth')),
  created_at  timestamptz not null default now()
);

-- Auth identity. Mirrors auth.users; `active_organization_id` is the tenant the
-- user is currently working in.
create table users (
  id                      uuid primary key references auth.users (id) on delete cascade,
  email                   text not null unique,
  name                    text,
  active_organization_id  uuid references organizations (id),
  created_at              timestamptz not null default now()
);

-- A user's membership + worker profile inside one organization. This is the
-- table RLS policies consult to decide tenant access.
create table employees (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  user_id          uuid references users (id) on delete set null,
  name             text not null,
  role             text not null default 'cleaner'
                     check (role in ('cleaner', 'lead', 'manager', 'owner', 'admin')),
  phone            text,
  active           boolean not null default true,
  created_at       timestamptz not null default now(),
  unique (organization_id, user_id)
);

-- ---------------------------------------------------------------------------
-- Core records
-- ---------------------------------------------------------------------------

create table clients (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  name             text not null,
  phone            text,
  email            text,
  notes            text,
  created_at       timestamptz not null default now()
);

create table properties (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  client_id        uuid references clients (id) on delete cascade,
  address          text,
  property_type    text default 'residential'
                     check (property_type in ('residential', 'airbnb', 'commercial')),
  access_notes     text,
  parking_notes    text,
  alarm_notes      text,
  created_at       timestamptz not null default now()
);

-- House Brain: living memory per property.
create table house_brain (
  id                  uuid primary key default gen_random_uuid(),
  organization_id     uuid not null references organizations (id) on delete cascade,
  property_id         uuid not null references properties (id) on delete cascade,
  pets                text,
  preferred_products  text[],
  products_to_avoid   text[],
  floor_types         text,
  countertop_types    text,
  recurring_requests  jsonb default '[]'::jsonb,
  health_score        text,
  average_clean_time  text,
  last_visit_summary  text,
  updated_at          timestamptz not null default now(),
  unique (property_id)
);

create table jobs (
  id                   uuid primary key default gen_random_uuid(),
  organization_id      uuid not null references organizations (id) on delete cascade,
  property_id          uuid references properties (id) on delete set null,
  client_id            uuid references clients (id) on delete set null,
  assigned_employee_id uuid references employees (id) on delete set null,
  job_type             text not null default 'Recurring Clean',
  status               text not null default 'Needs Confirmation',
  confirmation_status  text,
  starts_at            timestamptz,
  ends_at              timestamptz,
  revenue              numeric(10, 2) default 0,
  completed_at         timestamptz,
  created_at           timestamptz not null default now()
);

create table walkthroughs (
  id                        uuid primary key default gen_random_uuid(),
  organization_id           uuid not null references organizations (id) on delete cascade,
  property_id               uuid references properties (id) on delete cascade,
  requested_cleaning_type   text,
  bedrooms                  integer,
  bathrooms                 integer,
  square_feet               integer,
  quote_min                 numeric(10, 2),
  quote_max                 numeric(10, 2),
  notes                     text,
  created_at                timestamptz not null default now()
);

create table photos (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  property_id      uuid references properties (id) on delete cascade,
  job_id           uuid references jobs (id) on delete cascade,
  category         text,
  storage_path     text not null,
  caption          text,
  created_at       timestamptz not null default now()
);

create table messages (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  job_id           uuid references jobs (id) on delete cascade,
  property_id      uuid references properties (id) on delete cascade,
  sender_id        uuid references employees (id) on delete set null,
  message          text not null,
  created_at       timestamptz not null default now()
);

create table leads (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  source           text,
  name             text,
  message          text,
  service_type     text,
  urgency          text,
  status           text not null default 'New',
  known_details    jsonb default '{}'::jsonb,
  created_at       timestamptz not null default now()
);

create table invoices (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  job_id           uuid references jobs (id) on delete set null,
  client_id        uuid references clients (id) on delete set null,
  amount           numeric(10, 2),
  status           text not null default 'draft',
  created_at       timestamptz not null default now()
);

create table inventory (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  name             text not null,
  quantity         numeric(10, 2) not null default 0,
  unit             text,
  reorder_at       numeric(10, 2) not null default 0,
  created_at       timestamptz not null default now()
);

create table notifications (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  title            text not null,
  detail           text,
  priority         text default 'Medium',
  read_at          timestamptz,
  created_at       timestamptz not null default now()
);

create table cleaning_types (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  name             text not null,
  created_at       timestamptz not null default now()
);

create table products (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations (id) on delete cascade,
  name             text not null,
  created_at       timestamptz not null default now()
);

create table settings (
  organization_id  uuid primary key references organizations (id) on delete cascade,
  data             jsonb not null default '{}'::jsonb,
  updated_at       timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- A row is visible only to users who are an employee of that row's
-- organization. `organizations` itself is visible to any of its members.
-- ---------------------------------------------------------------------------

create or replace function current_user_organization_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from employees where user_id = auth.uid();
$$;

do $$
declare
  tbl text;
  tenant_tables text[] := array[
    'employees', 'clients', 'properties', 'house_brain', 'jobs', 'walkthroughs',
    'photos', 'messages', 'leads', 'invoices', 'inventory', 'notifications',
    'cleaning_types', 'products', 'settings'
  ];
begin
  foreach tbl in array tenant_tables loop
    execute format('alter table %I enable row level security;', tbl);
    execute format($f$
      create policy %1$I_tenant_isolation on %1$I
        using (organization_id in (select current_user_organization_ids()))
        with check (organization_id in (select current_user_organization_ids()));
    $f$, tbl);
  end loop;
end $$;

alter table organizations enable row level security;
create policy organizations_member_access on organizations
  using (id in (select current_user_organization_ids()));

alter table users enable row level security;
create policy users_self_access on users
  using (id = auth.uid())
  with check (id = auth.uid());
