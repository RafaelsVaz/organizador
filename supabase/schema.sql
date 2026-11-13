-- Organizador de Finanças Pessoais — Sprint 2
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  description text not null check (char_length(trim(description)) > 0),
  amount numeric(12,2) not null check (amount > 0),
  date date not null,
  type text not null check (type in ('entrada','saida')),
  category text not null,
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_date_idx on public.transactions (user_id, date desc);

alter table public.transactions enable row level security;

create policy "select_own" on public.transactions for select using (auth.uid() = user_id);
create policy "insert_own" on public.transactions for insert with check (auth.uid() = user_id);
create policy "update_own" on public.transactions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete_own" on public.transactions for delete using (auth.uid() = user_id);
