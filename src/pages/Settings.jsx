import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlineCog6Tooth, HiOutlineUser, HiOutlineHome,
  HiOutlineBell, HiOutlineLanguage, HiOutlineSwatch,
  HiOutlineShieldCheck, HiOutlineKey, HiOutlineCheck,
} from 'react-icons/hi2'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Button from '@/components/common/Button.jsx'
import Input from '@/components/common/Input.jsx'
import Select from '@/components/common/Select.jsx'
import Badge from '@/components/common/Badge.jsx'
import { useTheme } from '@/context/ThemeContext.jsx'
import { useToast } from '@/context/ToastContext.jsx'
import { useAuth } from '@/context/AuthContext.jsx'
import { classNames } from '@/utils/formatters.js'
import { fadeInUp, staggerContainer } from '@/utils/motionVariants.js'

/* ── Toggle switch ─────────────────────────────────────────────── */
function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-line last:border-0">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="text-xs text-ink-3 mt-0.5">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={classNames(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 cursor-pointer',
          checked ? 'bg-primary-500' : 'bg-surface-2',
        )}
      >
        <span className={classNames(
          'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow transition duration-200',
          checked ? 'translate-x-5' : 'translate-x-0',
        )} />
      </button>
    </div>
  )
}

/* ── Section card wrapper ──────────────────────────────────────── */
function Section({ icon: Icon, title, children }) {
  return (
    <motion.div variants={fadeInUp} className="glass-card p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-line">
        <span className="size-9 rounded-lg bg-primary-500/15 flex items-center justify-center text-primary-300 text-lg">
          <Icon />
        </span>
        <h2 className="font-display font-semibold text-ink">{title}</h2>
      </div>
      {children}
    </motion.div>
  )
}

function Settings() {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const toast = useToast()

  /* ── Profile state (initialized from logged-in user) */
  const [profile, setProfile] = useState(() => ({
    name: user?.name || 'Farmer User',
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+91 98765 43210',
    role: user?.role || 'Farm Owner',
  }))

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name ?? prev.name,
        email: user.email ?? prev.email,
      }))
    }
  }, [user])

  /* ── Farm state */
  const [farm, setFarm] = useState({
    name: 'Greenfield Farm', location: 'Ludhiana, Punjab',
    area: '158', soilType: 'Clay Loam', primaryCrop: 'Wheat',
  })

  /* ── Notification toggles */
  const [notifs, setNotifs] = useState({
    weatherAlerts: true, diseaseAlerts: true, soilAlerts: true,
    yieldUpdates: false, marketUpdates: true, weeklyReport: true,
  })

  /* ── Language */
  const [lang, setLang] = useState('EN')

  const setP = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }))
  const setF = (k) => (e) => setFarm((p) => ({ ...p, [k]: typeof e === 'string' ? e : e.target.value }))

  const save = (section) => toast.success('Settings saved', `${section} updated successfully.`)

  const THEMES = [
    { id: 'dark',  label: 'Dark',  desc: 'Easy on the eyes at night' },
    { id: 'light', label: 'Light', desc: 'Clean and bright' },
  ]

  const LANGS = [
    { value: 'EN', label: 'English' },
    { value: 'HI', label: 'हिन्दी (Hindi)' },
    { value: 'MR', label: 'मराठी (Marathi)' },
    { value: 'TA', label: 'தமிழ் (Tamil)' },
    { value: 'TE', label: 'తెలుగు (Telugu)' },
  ]

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineCog6Tooth}
        accent="primary"
        title="Settings"
        description="Manage your profile, farm details, notifications, and preferences."
      />

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl flex flex-col gap-6">

        {/* Profile */}
        <Section icon={HiOutlineUser} title="Profile">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Input label="Full Name"    value={profile.name}  onChange={setP('name')}  />
            <Input label="Email"        type="email" value={profile.email} onChange={setP('email')} />
            <Input label="Phone"        type="tel"   value={profile.phone} onChange={setP('phone')} />
            <Input label="Role"         value={profile.role}  onChange={setP('role')}  />
          </div>
          <Button size="sm" icon={HiOutlineCheck} onClick={() => save('Profile')}>Save Profile</Button>
        </Section>

        {/* Farm Information */}
        <Section icon={HiOutlineHome} title="Farm Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Input label="Farm Name"    value={farm.name}     onChange={setF('name')} />
            <Input label="Location"     value={farm.location} onChange={setF('location')} />
            <Input label="Total Area (ha)" type="number" value={farm.area} onChange={setF('area')} />
            <Select
              label="Soil Type"
              value={farm.soilType}
              onChange={setF('soilType')}
              options={['Sandy','Loamy','Clay','Sandy Loam','Clay Loam','Silty Loam','Black Cotton','Red Laterite']}
            />
            <Select
              label="Primary Crop"
              value={farm.primaryCrop}
              onChange={setF('primaryCrop')}
              options={['Wheat','Rice','Cotton','Maize','Soybean','Tomato','Sugarcane','Potato']}
            />
          </div>
          <Button size="sm" icon={HiOutlineCheck} onClick={() => save('Farm information')}>Save Farm Details</Button>
        </Section>

        {/* Notifications */}
        <Section icon={HiOutlineBell} title="Notifications">
          <div className="flex flex-col">
            <Toggle label="Weather Alerts"  description="Receive rain, wind, and frost warnings." checked={notifs.weatherAlerts} onChange={(v) => setNotifs((p) => ({ ...p, weatherAlerts: v }))} />
            <Toggle label="Disease Alerts"  description="Notify when AI detects disease risk."     checked={notifs.diseaseAlerts}  onChange={(v) => setNotifs((p) => ({ ...p, diseaseAlerts: v }))} />
            <Toggle label="Soil Alerts"     description="Low moisture and nutrient warnings."      checked={notifs.soilAlerts}     onChange={(v) => setNotifs((p) => ({ ...p, soilAlerts: v }))} />
            <Toggle label="Yield Updates"   description="Progress updates on yield predictions."   checked={notifs.yieldUpdates}   onChange={(v) => setNotifs((p) => ({ ...p, yieldUpdates: v }))} />
            <Toggle label="Market Updates"  description="Price changes for your primary crops."    checked={notifs.marketUpdates}  onChange={(v) => setNotifs((p) => ({ ...p, marketUpdates: v }))} />
            <Toggle label="Weekly Report"   description="Summary digest every Monday morning."     checked={notifs.weeklyReport}   onChange={(v) => setNotifs((p) => ({ ...p, weeklyReport: v }))} />
          </div>
          <Button size="sm" icon={HiOutlineCheck} className="mt-4" onClick={() => save('Notification preferences')}>Save Preferences</Button>
        </Section>

        {/* Language */}
        <Section icon={HiOutlineLanguage} title="Language">
          <p className="text-xs text-ink-3 mb-3">
            Select your preferred display language. Full translations are coming soon — English is fully supported.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {LANGS.map((l) => (
              <button
                key={l.value}
                onClick={() => setLang(l.value)}
                className={classNames(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer border',
                  lang === l.value
                    ? 'bg-primary-500/20 text-primary-300 border-primary-500/40'
                    : 'glass text-ink-2 hover:text-ink border-transparent',
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Button size="sm" icon={HiOutlineCheck} onClick={() => save('Language')}>Save Language</Button>
        </Section>

        {/* Theme */}
        <Section icon={HiOutlineSwatch} title="Appearance">
          <div className="flex gap-3 mb-4">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={classNames(
                  'flex-1 flex flex-col items-start gap-1 rounded-xl p-4 border transition-all cursor-pointer',
                  theme === t.id
                    ? 'border-primary-500/50 bg-primary-500/10'
                    : 'glass hover:border-primary-500/30',
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-semibold text-ink">{t.label}</span>
                  {theme === t.id && <HiOutlineCheck className="text-primary-400" />}
                </div>
                <span className="text-xs text-ink-3">{t.desc}</span>
              </button>
            ))}
          </div>
          <Badge status="info">Theme is applied instantly — no save needed.</Badge>
        </Section>

        {/* Security */}
        <Section icon={HiOutlineShieldCheck} title="Security">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b border-line">
              <div>
                <p className="text-sm font-medium text-ink">Two-Factor Authentication</p>
                <p className="text-xs text-ink-3 mt-0.5">Add an extra layer of security to your account.</p>
              </div>
              <Badge status="warning">Disabled</Badge>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-line">
              <div>
                <p className="text-sm font-medium text-ink">Active Sessions</p>
                <p className="text-xs text-ink-3 mt-0.5">1 active session — Chrome on Windows</p>
              </div>
              <button className="text-xs text-accent-rose hover:underline cursor-pointer">Revoke all</button>
            </div>
            <Button variant="secondary" icon={HiOutlineKey} size="sm"
              onClick={() => toast.info('Change Password', 'Password change flow coming soon.')}>
              Change Password
            </Button>
          </div>
        </Section>
      </motion.div>
    </PageWrapper>
  )
}

export default Settings
