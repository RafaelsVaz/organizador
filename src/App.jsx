import { useEffect, useState } from 'react'
import { supabase, configured } from './supabaseClient'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(configured)

  useEffect(() => {
    if (!configured) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  if (!configured)
    return <p className="notice">Configure o arquivo .env (veja .env.example e o README) e reinicie o projeto.</p>
  if (loading) return <p className="notice">Carregando…</p>
  return session ? <Dashboard user={session.user} /> : <Auth />
}
