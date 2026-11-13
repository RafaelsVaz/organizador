import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setMsg(null)
    if (password.length < 6) return setMsg({ error: true, text: 'A senha deve ter ao menos 6 caracteres.' })
    setBusy(true)
    try {
      const fn = mode === 'login' ? 'signInWithPassword' : 'signUp'
      const { data, error } = await supabase.auth[fn]({ email, password })
      if (error) throw error
      if (mode === 'signup' && !data.session)
        setMsg({ text: 'Conta criada. Confirme o e-mail enviado para poder entrar.' })
    } catch (err) {
      setMsg({
        error: true,
        text: mode === 'login' ? 'Não foi possível entrar. Confira e-mail e senha.' : 'Não foi possível criar a conta: ' + err.message,
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="auth">
      <h1>Organizador de Finanças</h1>
      <p className="muted">{mode === 'login' ? 'Entre para ver suas movimentações.' : 'Crie sua conta com e-mail e senha.'}</p>
      <form onSubmit={submit} className="stack">
        <label>E-mail<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Senha<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {msg && <p className={msg.error ? 'error' : 'ok'} role="alert">{msg.text}</p>}
        <button className="primary" disabled={busy}>{mode === 'login' ? 'Entrar' : 'Criar conta'}</button>
      </form>
      <button className="link" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMsg(null) }}>
        {mode === 'login' ? 'Ainda não tenho conta' : 'Já tenho conta'}
      </button>
    </main>
  )
}
