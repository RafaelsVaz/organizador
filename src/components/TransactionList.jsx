import { useState } from 'react'
import { CATEGORIES, TYPES, brl, fmtDate } from '../utils'

export default function TransactionList({ items, total, onEdit, onDelete }) {
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const shown = items.filter((i) => (!type || i.type === type) && (!category || i.category === category))

  function remove(i) {
    if (window.confirm(`Excluir "${i.description}"?`)) onDelete(i.id)
  }

  return (
    <section className="panel">
      <h2>Histórico</h2>
      <div className="filters">
        <select aria-label="Filtrar por tipo" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Todos os tipos</option>
          <option value="entrada">Receitas</option>
          <option value="saida">Despesas</option>
        </select>
        <select aria-label="Filtrar por categoria" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas as categorias</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        {(type || category) && <button onClick={() => { setType(''); setCategory('') }}>Limpar filtro</button>}
      </div>
      {total === 0 ? (
        <p className="muted">Você ainda não tem movimentações. Use o formulário para adicionar a primeira.</p>
      ) : shown.length === 0 ? (
        <p className="muted">Nenhuma movimentação corresponde ao filtro.</p>
      ) : (
        <ul className="list">
          {shown.map((i) => (
            <li key={i.id}>
              <div>
                <strong>{i.description}</strong>
                <small>{fmtDate(i.date)} · {i.category} · {TYPES[i.type]}</small>
              </div>
              <span className={i.type === 'entrada' ? 'pos' : 'neg'}>
                {i.type === 'saida' ? '− ' : '+ '}{brl(i.amount)}
              </span>
              <div className="row">
                <button onClick={() => onEdit(i)}>Editar</button>
                <button className="danger" onClick={() => remove(i)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
