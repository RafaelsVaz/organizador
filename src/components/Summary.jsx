import { brl } from '../utils'

export default function Summary({ items }) {
  const sum = (t) => items.filter((i) => i.type === t).reduce((a, i) => a + Number(i.amount), 0)
  const income = sum('entrada')
  const expense = sum('saida')
  const balance = income - expense
  return (
    <section className="summary">
      <div className="balance">
        <span>Saldo</span>
        <strong className={balance < 0 ? 'neg' : ''}>{brl(balance)}</strong>
        {items.length === 0 && <small>Nenhuma movimentação ainda. Cadastre a primeira abaixo.</small>}
      </div>
      <div><span>Receitas</span><strong className="pos">{brl(income)}</strong></div>
      <div><span>Despesas</span><strong className="neg">{brl(expense)}</strong></div>
    </section>
  )
}
