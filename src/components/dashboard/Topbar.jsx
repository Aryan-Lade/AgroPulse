import { HiBars3, HiOutlineBell, HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { useApp } from '../../context/AppContext.jsx'

function Topbar() {
  const { toggleSidebar } = useApp()

  return (
    <header className="sticky top-0 z-30 glass-strong border-x-0 border-t-0 rounded-none">
      <div className="h-16 px-4 sm:px-6 flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-night-100 p-1 cursor-pointer"
          aria-label="Open sidebar"
        >
          <HiBars3 />
        </button>
        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md glass rounded-xl px-3.5 py-2">
          <HiOutlineMagnifyingGlass className="text-night-400" />
          <input
            type="text"
            placeholder="Search fields, crops, alerts…"
            className="w-full bg-transparent text-sm text-white placeholder:text-night-400 outline-none"
          />
        </div>
        <div className="flex-1 sm:hidden" />
        <div className="flex items-center gap-3">
          <button
            className="relative size-10 rounded-xl glass flex items-center justify-center text-night-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <HiOutlineBell className="text-lg" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-accent-rose animate-pulse-slow" />
          </button>
          <div className="flex items-center gap-3 pl-1">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-700 flex items-center justify-center font-display font-bold text-white text-sm">
              GF
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-sm font-semibold text-white">Greenfield Farm</p>
              <p className="text-xs text-night-400">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
