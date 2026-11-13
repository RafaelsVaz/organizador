import { useEffect, useState } from 'react'
import { CATEGORIES, validate } from '../utils'

const today = () => new Date().toISOString().slice(0, 10)
const empty = () => ({ description: '', amount: '', date: today(), type: 'saida', category: '' })

export default function TransactionForm({ editing, onSave, onCancel }) {
  const [f, setF] = useState(empty())
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setError(null)
    setF(editing ? { ...editing, amount: String(editing.amount) } : empty())
  }, [editing])

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    const err = validate(f)
    if (err) return setError(err)
    setBusy(true)
    setError(null)
    const ok = await onSave({
      description: f.description.trim(),
      amount: Number(String(f.amount).replace(',', '.')),
      date: f.date,
      type: f.type,
      category: f.category,
    })
    setBusy(false)
    if (ok) setF(empty())
  }

  return (
    <form className="panel form" onSubmit={submit} noValidate>
      <h2>{editing ? 'Editar movimentação' : 'Nova movimentação'}</h2>
      <label>Descrição<input value={f.description} onChange={set('description')} /></label>
      <label>Valor (R$)<input inputMode="decimal" value={f.amount} onChange={set('amount')} placeholder="0,00" /></label>
      <label>Data<input type="date" value={f.date} onChange={set('date')} /></label>
      <label>Tipo
        <select value={f.type} onChange={set('type')}>
          <option value="saida">Despesa</option>
          <option value="entrada">Receita</option>
        </select>
      </label>
      <label>Categoria
        <select value={f.category} onChange={set('category')}>
          <option value="">Selecione…</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="row">
        <button className="primary" disabled={busy}>{editing ? 'Salvar alterações' : 'Adicionar'}</button>
        {editing && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  )
}
