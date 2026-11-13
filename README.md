# Organizador de Finanças Pessoais — Sprint 2

React + Vite, Supabase (auth + Postgres com RLS).

## Passo a passo
1. **Dependências:** `npm install`
2. **Supabase:** crie um projeto em https://supabase.com.
3. **SQL:** em *SQL Editor*, cole e execute `supabase/schema.sql` (cria a tabela, índice e políticas RLS).
4. **Autenticação:** em *Authentication → Providers*, mantenha Email habilitado. Para testes locais, você pode desativar a confirmação de e-mail.
5. **Variáveis:** copie `.env.example` para `.env` e preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (*Project Settings → API*). Use somente a chave `anon`.
6. **Executar:** `npm run dev` e abra o endereço exibido.

## Funcionalidades implementadas (código escrito)
Cadastro/login/logout; rotas protegidas; criar, listar, editar e excluir (com confirmação) movimentações; categorias fixas; painel com receitas, despesas e saldo; filtro por tipo e categoria com botão de limpar.

## Fora do escopo (Sprints futuras)
Investimentos, metas, gráficos/relatórios, exportação, integrações externas, notificações, categorias personalizadas, login com Google.

## Testes
Ainda **não executados** — exigem um projeto Supabase real. Roteiro manual (itens 1–10 do enunciado):
1. Criar conta e entrar. 2. Cadastrar receita. 3. Cadastrar despesa. 4. Conferir totais. 5. Editar. 6. Excluir confirmando e cancelando. 7. Com duas contas, conferir que cada uma vê só seus registros. 8. Testar filtros. 9. Tentar salvar vazio / valor 0 / negativo. 10. Com a conta B, tentar ler/alterar um `id` da conta A (via SQL Editor ou API com o token de B): deve retornar vazio.
