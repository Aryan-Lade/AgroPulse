import { Link } from 'react-router-dom'
import { FaXTwitter, FaLinkedinIn, FaGithub, FaYoutube } from 'react-icons/fa6'
import Logo from '../common/Logo.jsx'
import { APP_TAGLINE, ROUTES } from '../../utils/constants.js'

const productLinks = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD },
  { label: 'Disease Detection', to: ROUTES.DISEASE },
  { label: 'Weather Intelligence', to: ROUTES.WEATHER },
  { label: 'Soil Analysis', to: ROUTES.SOIL },
]

const platformLinks = [
  { label: 'Yield Prediction', to: ROUTES.YIELD },
  { label: 'Drone Monitoring', to: ROUTES.DRONE },
]

const socials = [
  { icon: FaXTwitter, label: 'X', href: '#' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  { icon: FaGithub, label: 'GitHub', href: '#' },
  { icon: FaYoutube, label: 'YouTube', href: '#' },
]

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-night-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <Logo size="sm" />
            <p className="text-sm text-night-300 leading-relaxed max-w-xs">
              {APP_TAGLINE}. Precision agriculture powered by computer vision,
              satellite data and machine learning.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="size-9 rounded-lg glass flex items-center justify-center text-night-300 hover:text-primary-300 hover:bg-white/10 transition-colors"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Product</h3>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-night-300 hover:text-primary-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Platform</h3>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-night-300 hover:text-primary-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-night-300 mb-4">
              Agronomy insights and product updates, monthly.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                placeholder="you@farm.com"
                className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-night-400 outline-none focus:border-primary-500/50 transition-colors"
              />
              <button
                type="submit"
                className="shrink-0 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-night-400">
            © 2026 AgriVision AI. All rights reserved.
          </p>
          <p className="text-xs text-night-400">
            Built for the future of farming 🌱
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
