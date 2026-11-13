export const CATEGORIES = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Lazer', 'Salário', 'Outros']
export const TYPES = { entrada: 'Receita', saida: 'Despesa' }

export const brl = (n) => Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
export const fmtDate = (iso) => iso.split('-').reverse().join('/')

export function validate({ description, amount, date, type, category }) {
  if (!description.trim()) return 'Informe uma descrição.'
  const v = Number(String(amount).replace(',', '.'))
  if (!amount || Number.isNaN(v) || v <= 0) return 'O valor deve ser maior que zero.'
  if (!date) return 'Informe a data.'
  if (!TYPES[type]) return 'Escolha o tipo.'
  if (!category) return 'Escolha a categoria.'
  return null
}
