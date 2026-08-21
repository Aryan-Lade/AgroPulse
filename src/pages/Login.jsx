import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiArrowRight, HiEye, HiEyeSlash, HiOutlineSparkles } from 'react-icons/hi2'
import { useAuth } from '@/context/AuthContext.jsx'
import Logo from '@/components/common/Logo.jsx'
import Button from '@/components/common/Button.jsx'
import { ROUTES } from '@/utils/constants.js'

function Login() {
  const { login, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const { register, handleSubmit, formState: { errors }, setError } = useForm()

  if (isLoggedIn) return <Navigate to={ROUTES.DASHBOARD} replace />

  const onSubmit = async ({ email, password }) => {
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError('root', { message: data.message || 'Login failed. Invalid email or password.' })
        return
      }
      login(data.token, data.user)
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch {
      setError('root', { message: 'Cannot reach server. Is the backend running?' })
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    login('demo_token_agropulse_2026', {
      id: 99,
      name: 'Aryan Lade',
      email: 'aryan@agropulse.com',
    })
    navigate(ROUTES.DASHBOARD, { replace: true })
  }

  return (
    <div className="min-h-screen force-dark flex items-center justify-center bg-night-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8"><Logo /></div>

        <div className="glass rounded-2xl p-8 border border-white/10 shadow-glass">
          <div className="flex items-center gap-2 mb-1">
            <HiOutlineSparkles className="text-primary-400 text-lg" />
            <span className="text-xs font-medium text-primary-300 uppercase tracking-widest">AgroPulse</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-night-300 text-sm mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {}
            <div>
              <label className="block text-sm font-medium text-night-200 mb-1.5">Email address</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-night-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-colors text-sm"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            {}
            <div>
              <label className="block text-sm font-medium text-night-200 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-night-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-colors text-sm"
                />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-night-400 hover:text-white transition-colors cursor-pointer">
                  {showPass ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            {}
            {errors.root && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {errors.root.message}
              </div>
            )}

            <Button type="submit" className="w-full justify-center" icon={HiArrowRight} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/10">
            <Button
              variant="secondary"
              className="w-full justify-center text-xs"
              onClick={handleDemoLogin}
            >
              ⚡ Quick Demo Sign-In
            </Button>
          </div>

          <p className="text-center text-night-400 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.REGISTER} className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
