import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiArrowRight, HiEye, HiEyeSlash, HiOutlineSparkles } from 'react-icons/hi2'
import { useAuth } from '@/context/AuthContext.jsx'
import Logo from '@/components/common/Logo.jsx'
import Button from '@/components/common/Button.jsx'
import { ROUTES } from '@/utils/constants.js'

function Register() {
  const { login, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm()

  if (isLoggedIn) return <Navigate to={ROUTES.DASHBOARD} replace />

  const onSubmit = async ({ name, email, password }) => {
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError('root', { message: data.message || 'Registration failed. Please try again.' })
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
          <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
          <p className="text-night-300 text-sm mb-8">Start your smart farming journey today</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-night-200 mb-1.5">Full name</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Aryan Lade"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-night-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-colors text-sm"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-night-200 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 6 characters"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-night-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-colors text-sm"
                />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-night-400 hover:text-white transition-colors cursor-pointer">
                  {showPass ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-night-200 mb-1.5">Confirm password</label>
              <input
                type={showPass ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: val => val === watch('password') || 'Passwords do not match',
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-night-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-colors text-sm"
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1.5">{errors.confirmPassword.message}</p>}
            </div>

            {errors.root && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {errors.root.message}
              </div>
            )}

            <Button type="submit" className="w-full justify-center" icon={HiArrowRight} disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-night-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
