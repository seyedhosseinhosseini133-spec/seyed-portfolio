'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import { useApp } from './Providers'
import { H2 } from './ui'
import { PROJECTS } from '@/lib/data'

const grad = (c: [string, string]) => `linear-gradient(135deg,${c[0]},${c[1]})`

export default function Projects() {
  const { t, lang, rtl } = useApp()
  const sec = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  const [sel, setSel] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({ target: sec, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, rtl ? dist : -dist])
  useEffect(() => {
    const m = () => setDist(Math.max(0, (track.current?.scrollWidth || 0) - innerWidth))
    m(); addEventListener('resize', m); return () => removeEventListener('resize', m)
  }, [lang])
  useEffect(() => {
    document.body.style.overflow = sel !== null ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null)
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [sel])
  const o = sel !== null ? PROJECTS[sel] : null
  return (
    <section id="projects" ref={sec} style={{ height: `calc(100svh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="px-[6vw]"><H2>{t('projT')}</H2></div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-5 px-[6vw] will-change-transform">
          {PROJECTS.map((p, i) => (
            <motion.button key={i} onClick={() => setSel(i)} whileHover={{ y: -8 }} className={`glass group w-[78vw] overflow-hidden text-start md:w-[420px] ${i % 2 ? 'mt-8' : ''}`}>
              <motion.div layoutId={`pv${i}`} className="relative grid aspect-[16/10] place-items-center overflow-hidden text-4xl font-extrabold text-white/90" style={{ background: grad(p.c) }}>
                <span aria-hidden className="absolute px-4 text-center">{p[lang].n}</span>
                {p.img && <img src={p.img} alt={p[lang].n} decoding="async" onError={e => { e.currentTarget.style.opacity = '0' }} className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />}
              </motion.div>
              <div className="p-5"><h3 className="font-bold">{p[lang].n}</h3><p className="my-1.5 mb-3 text-sm text-mu">{p[lang].d}</p>
                <div className="flex flex-wrap gap-1.5">{p.tech.map(x => <span key={x} className="rounded-full border border-[var(--bd)] px-2.5 py-0.5 text-xs">{x}</span>)}</div></div>
            </motion.button>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {o && sel !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)} className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/70 p-3 sm:items-center sm:p-4">
            <motion.div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} initial={{ y: 40, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: .97, opacity: 0 }} className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-[960px] overflow-y-auto overscroll-contain rounded-[26px] border border-[var(--bd)] bg-[var(--bg)] shadow-[var(--sh)]">
              <button onClick={() => setSel(null)} aria-label="Close" className="absolute end-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white"><X size={18} /></button>
              <div className="relative grid aspect-[16/9] place-items-center overflow-hidden px-4 text-center text-3xl font-extrabold text-white/90 sm:text-4xl" style={{ background: grad(o.c) }}>
                <span aria-hidden className="absolute px-4">{o[lang].n}</span>
                {o.img && <img src={o.img} alt={o[lang].n} onError={e => { e.currentTarget.style.opacity = '0' }} className="relative h-full w-full object-cover" />}
              </div>
              <div className="grid gap-4 p-4 sm:p-6">
                <h2 className="break-words text-2xl font-extrabold sm:text-3xl">{o[lang].n}</h2><p className="text-mu">{o[lang].l}</p>
                <div><b>{t('tech')}</b><div className="mt-2 flex flex-wrap gap-1.5">{o.tech.map(x => <span key={x} className="rounded-full border border-[var(--bd)] px-2.5 py-0.5 text-xs">{x}</span>)}</div></div>
                <div><b>{t('feat')}</b><ul className="ms-5 list-disc text-mu">{o[lang].f.map(f => <li key={f}>{f}</li>)}</ul></div>
                <div className="flex flex-wrap gap-3">
                  {o.demo && o.demo !== '#' && <a href={o.demo} target="_blank" rel="noopener" className="grad-b inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"><ExternalLink size={16} />{t('live')}</a>}
                  {o.code && o.code !== '#' && <a href={o.code} target="_blank" rel="noopener" className="glass inline-flex items-center gap-2 !rounded-full px-6 py-3 font-semibold"><Github size={16} />{t('src')}</a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
