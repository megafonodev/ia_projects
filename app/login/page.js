'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError(data.error || 'Error al iniciar sesión.')
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background mesh orbs */}
      <div
        className="mesh-orb"
        style={{
          width: '500px',
          height: '500px',
          top: '-150px',
          right: '-100px',
          background:
            'radial-gradient(circle, rgba(255,77,77,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="mesh-orb"
        style={{
          width: '600px',
          height: '600px',
          bottom: '-200px',
          left: '-150px',
          background:
            'radial-gradient(circle, rgba(174,154,214,0.07) 0%, transparent 70%)',
          animationDelay: '-4s',
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="rounded-2xl border border-[var(--emd-border)] bg-[var(--emd-dark)]/60 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--emd-border)] bg-[var(--emd-surface)] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--emd-text-muted)]">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--emd-primary)]"
                style={{ boxShadow: '0 0 6px var(--emd-primary)' }}
              />
              Acceso restringido
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--emd-text)]">
              Iniciar{' '}
              <span className="bg-gradient-to-r from-[var(--emd-primary)] to-[var(--emd-secondary)] bg-clip-text text-transparent">
                sesión
              </span>
            </h1>
            <p className="mt-2 text-sm text-[var(--emd-text-muted)]">
              Introduce la contraseña para acceder.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--emd-text-muted)]"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="current-password"
                placeholder="••••••••"
                className="emd-focus-ring w-full rounded-lg border border-[var(--emd-border)] bg-[var(--emd-surface)] px-4 py-3 text-sm text-[var(--emd-text)] placeholder-[var(--emd-text-muted)]/50 transition-colors focus:border-[var(--emd-border-focus)]"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-[var(--emd-primary)]/30 bg-[var(--emd-primary)]/10 px-4 py-2.5 text-xs text-[var(--emd-primary)]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-shimmer w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: loading
                  ? 'var(--emd-surface-light)'
                  : 'var(--emd-primary)',
              }}
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--emd-text-muted)]/50">
          ©2026 El Megáfono Digital
        </p>
      </div>
    </div>
  )
}
