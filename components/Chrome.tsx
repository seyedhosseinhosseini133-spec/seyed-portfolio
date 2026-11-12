'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Home, User, Sparkles, FolderKanban, Images, Video, Mail, Sun, Moon, Menu, X } from 'lucide-react'
import { useApp } from './Providers'

const LINKS = [['home', Home], ['about', User], ['skills', Sparkles], ['projects', FolderKanban], ['gallery', Images], ['videos', Video], ['contact', Mail]] as const

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-[0%] bg-gradient-to-r from-ac to-ac2 rtl:origin-[100%]" />
}

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -start-[14vmax] -top-[18vmax] h-[46vmax] w-[46vmax] animate-pulse rounded-full bg-ac opacity-30 blur-[90px]" />
      <div className="absolute -bottom-[14vmax] -end-[10vmax] h-[38vmax] w-[38vmax] animate-pulse rounded-full bg-ac2 opacity-30 blur-[90px]" />
    </div>
  )
}

export function Splash() {
  const [show, setShow] = useState(true)
  useEffect(() => { const t = setTimeout(() => setShow(false), 1100); return () => clearTimeout(t) }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: .7 }} className="fixed inset-0 z-[100] grid place-items-center bg-bg">
          <div className="flex flex-col items-center gap-5">
            <motion.img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`} alt="Seyed Hossein" initial={{ opacity: .2, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} className="h-16 w-auto max-w-[64vw] object-contain sm:h-20" />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2, duration: .8 }} className="text-[10px] font-semibold uppercase tracking-[.4em] text-mu">Personal Portfolio</motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Nav() {
  const { t, lang, setLang, theme, toggleTheme } = useApp()
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    LINKS.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <>
      <nav aria-label="Main" className="glass fixed left-1/2 top-[max(12px,env(safe-area-inset-top))] z-[70] hidden max-w-[calc(100vw-16px)] -translate-x-1/2 items-center gap-1 !rounded-full p-1.5 lg:flex">
        {LINKS.map(([id, Icon]) => (
          <a key={id} href={`#${id}`} aria-label={t(id)} className={`relative flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors ${active === id ? 'text-bg' : 'text-mu'}`}>
            {active === id && <motion.span layoutId="pill" className="absolute inset-0 -z-0 rounded-full bg-tx" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <motion.span whileHover={{ scale: 1.2, rotate: -8 }} className="relative z-10"><Icon size={17} /></motion.span>
            <span className="relative z-10 hidden whitespace-nowrap lg:inline">{t(id)}</span>
          </a>
        ))}
        <button onClick={() => setLang(lang === 'en' ? 'fa' : 'en')} aria-label="Language" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--bd)] text-xs font-bold">{lang === 'en' ? 'FA' : 'EN'}</button>
        <button onClick={toggleTheme} aria-label="Theme" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--bd)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .25 }}>
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <div className="fixed left-1/2 top-[max(12px,env(safe-area-inset-top))] z-[70] -translate-x-1/2 lg:hidden">
        <nav aria-label="Mobile" className="glass flex items-center gap-1 !rounded-full p-1.5">
          <button onClick={() => setOpen(!open)} aria-label={lang === 'fa' ? 'منو' : 'Menu'} aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full text-tx">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button onClick={() => setLang(lang === 'en' ? 'fa' : 'en')} aria-label="Language" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--bd)] text-xs font-bold">{lang === 'en' ? 'FA' : 'EN'}</button>
          <button onClick={toggleTheme} aria-label="Theme" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--bd)]">
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -10, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .97 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="absolute left-1/2 top-full mt-2 flex max-h-[calc(100dvh-84px)] w-[calc(100vw-32px)] max-w-[320px] -translate-x-1/2 flex-col gap-1 overflow-y-auto overscroll-contain rounded-3xl border border-[var(--bd)] bg-[var(--bg)] p-2 shadow-[var(--sh)]">
              {LINKS.map(([id, Icon]) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors ${active === id ? 'text-bg' : 'text-tx'}`}>
                  {active === id && <motion.span layoutId="pill-m" className="absolute inset-0 -z-0 rounded-2xl bg-tx" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative z-10"><Icon size={18} /></span>
                  <span className="relative z-10 font-medium">{t(id)}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export function PWA() {
  useEffect(() => { if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') navigator.serviceWorker.register(`${process.env.NEXT_PUBLIC_BASE_PATH}/sw.js`) }, [])
  return null
}

export function InstallButton() {
  const { t } = useApp()
  const [ev, setEv] = useState<any>(null)
  useEffect(() => { const h = (e: Event) => { e.preventDefault(); setEv(e) }; addEventListener('beforeinstallprompt', h); return () => removeEventListener('beforeinstallprompt', h) }, [])
  if (!ev) return null
  return <button onClick={() => { ev.prompt(); setEv(null) }} className="glass !rounded-full px-6 py-3 font-semibold">{t('install')}</button>
}
