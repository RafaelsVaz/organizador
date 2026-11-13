import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Summary from './Summary'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Dashboard({ user }) {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
    if (error) setError('Não foi possível carregar as movimentações. Verifique a conexão e tente novamente.')
    else { setError(null); setItems(data) }
  }, [user.id])

  useEffect(() => { load() }, [load])

  async function save(values) {
    const q = editing
      ? supabase.from('transactions').update(values).eq('id', editing.id).eq('user_id', user.id)
      : supabase.from('transactions').insert({ ...values, user_id: user.id })
    const { error } = await q
    if (error) { setError('Não foi possível salvar a movimentação.'); return false }
    setEditing(null)
    await load()
    return true
  }

  async function remove(id) {
    const { error } = await supabase.from('transactions').delete().eq('id', id).eq('user_id', user.id)
    if (error) setError('Não foi possível excluir a movimentação.')
    else { if (editing?.id === id) setEditing(null); await load() }
  }

  return (
    <div className="app">
      <header>
        <h1>Organizador de Finanças</h1>
        <div className="row"><small>{user.email}</small><button onClick={() => supabase.auth.signOut()}>Sair</button></div>
      </header>
      {error && <p className="error" role="alert">{error}</p>}
      <Summary items={items} />
      <div className="grid">
        <TransactionForm editing={editing} onSave={save} onCancel={() => setEditing(null)} />
        <TransactionList items={items} total={items.length} onEdit={setEditing} onDelete={remove} />
      </div>
    </div>
  )
}
