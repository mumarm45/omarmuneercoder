-- Resume Builder: Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)

-- 1. Storage items table (generic key/value per user)
create table if not exists public.storage_items (
  id          uuid        default gen_random_uuid() primary key,
  user_id     uuid        references auth.users(id) on delete cascade not null,
  key         text        not null,
  data        jsonb       not null,
  version     text        default '1.0',
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null,
  unique (user_id, key)
);

-- 2. Row-level security: users can only touch their own rows
alter table public.storage_items enable row level security;

create policy "Users manage own data"
  on public.storage_items
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 3. Auto-update updated_at on every write
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger storage_items_updated_at
  before update on public.storage_items
  for each row execute procedure public.handle_updated_at();

-- 4. Index for fast per-user lookups
create index if not exists storage_items_user_key
  on public.storage_items (user_id, key);
