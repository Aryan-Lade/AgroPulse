import { Link } from 'react-router-dom'
import {
  HiOutlineGlobeAlt,
  HiOutlineCodeBracket,
  HiOutlineVideoCamera,
  HiOutlineEnvelope,
} from 'react-icons/hi2'
import Logo from '../common/Logo.jsx'
import { APP_NAME, APP_TAGLINE, ROUTES } from '../../utils/constants.js'

const productLinks = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD },
  { label: 'Disease Detection', to: ROUTES.DISEASE },
  { label: 'Weather Intelligence', to: ROUTES.WEATHER },
  { label: 'Soil Analysis', to: ROUTES.SOIL },
  { label: 'Yield Prediction', to: ROUTES.YIELD },
  { label: 'Drone Monitoring', to: ROUTES.DRONE },
]

const resourceLinks = [
  { label: 'Documentation', to: '#' },
  { label: 'Reports', to: ROUTES.REPORTS },
  { label: 'Community', to: ROUTES.COMMUNITY },
  { label: 'Help Center', to: '#' },
]

const companyLinks = [
  { label: 'About', anchor: '#about' },
  { label: 'Blog', to: '#' },
  { label: 'Contact', anchor: '#contact' },
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Service', to: '#' },
]

const socials = [
  {
    icon: HiOutlineGlobeAlt,
    label: 'X / Twitter',
    href: '#',
    title: 'Follow us on X',
  },
  {
    icon: HiOutlineCodeBracket,
    label: 'GitHub',
    href: '#',
    title: 'Star us on GitHub',
  },
  {
    icon: HiOutlineEnvelope,
    label: 'LinkedIn',
    href: '#',
    title: 'Connect on LinkedIn',
  },
  {
    icon: HiOutlineVideoCamera,
    label: 'YouTube',
    href: '#',
    title: 'Watch on YouTube',
  },
]

function FooterHeading({ children }) {
  return (
    <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-white/70 mb-5">
      {children}
    </h3>
  )
}

function FooterLink({ to, anchor, children, onClick }) {
  const cls =
    'text-sm text-night-300 hover:text-primary-300 transition-colors duration-200'

  if (anchor) {
    return (
      <a
        href={anchor}
        onClick={onClick}
        className={cls}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  )
}

function Footer() {
  const scrollToSection = (anchor) => (e) => {
    e.preventDefault()
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      id="contact"
      className="force-dark relative border-t border-white/5 bg-night-950/80 scroll-mt-20"
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <Logo size="sm" />
            <p className="text-sm text-night-300 leading-relaxed max-w-xs">
              {APP_TAGLINE}. Precision agriculture powered by computer vision,
              satellite data and machine learning.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2.5 mt-1">
              {socials.map(({ icon: Icon, label, href, title }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={title}
                  className="size-9 rounded-xl glass flex items-center justify-center text-night-300 hover:text-primary-300 hover:bg-white/10 transition-colors duration-200"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Product */}
          <div>
            <FooterHeading>Product</FooterHeading>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <FooterLink to={link.to}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div>
            <FooterHeading>Resources</FooterHeading>
            <ul className="flex flex-col gap-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink to={link.to}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink
                    to={link.to}
                    anchor={link.anchor}
                    onClick={link.anchor ? scrollToSection(link.anchor) : undefined}
                  >
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-night-400">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-night-500">
            Built for the future of farming 🌱
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
