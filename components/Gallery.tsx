'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from './Providers'
import { Reveal, H2 } from './ui'
import { GALLERY } from '@/lib/data'
const grad = (g: (typeof GALLERY)[number]) => `linear-gradient(135deg,${g.c[0]},${g.c[1]})`
export default function Gallery() {
  const { t, rtl } = useApp()
  const [i, setI] = useState<number | null>(null)
  const step = (d: number) => setI(v => v === null ? v : (v + d + GALLERY.length) % GALLERY.length)
  useEffect(() => {
    if (i === null) return
    document.body.style.overflow = 'hidden'
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    addEventListener('keydown', k); return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [i === null])
  return (
    <section id="gallery" className="px-[6vw] py-28">
      <Reveal><H2>{t('galT')}</H2></Reveal>
      <div className="columns-2 gap-3.5 md:columns-3">
        {GALLERY.map((g, n) => (
          <Reveal key={n} delay={(n % 3) * .08} className="mb-3.5 break-inside-avoid">
            <motion.button layoutId={`g${n}`} onClick={() => setI(n)} whileHover={{ scale: 1.02 }} aria-label={`Photo ${n + 1}`} className="group block w-full overflow-hidden rounded-3xl" style={{ aspectRatio: `${g.w} / ${g.h}`, background: grad(g) }}>
              {g.src && <img src={g.src} alt={`Photo ${n + 1}`} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none' }} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />}
            </motion.button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {i !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setI(null)} className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4">
            <button onClick={() => setI(null)} aria-label="Close" className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white"><X /></button>
            <button onClick={e => { e.stopPropagation(); step(-1) }} aria-label="Previous" className="absolute start-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white">{rtl ? <ChevronRight /> : <ChevronLeft />}</button>
            <AnimatePresence mode="wait">
              {GALLERY[i].src ? (
                <motion.img key={i} src={GALLERY[i].src} width={GALLERY[i].w} height={GALLERY[i].h} alt={`Photo ${i + 1}`} onClick={e => e.stopPropagation()} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: .25 }} className="h-auto max-h-[80svh] w-auto max-w-[92vw] rounded-3xl object-contain shadow-[0_25px_80px_rgba(0,0,0,.6)]" />
              ) : (
                <motion.div key={i} onClick={e => e.stopPropagation()} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: .25 }} className="aspect-[4/3] max-h-[80svh] w-[min(900px,92vw)] rounded-3xl" style={{ background: grad(GALLERY[i]) }} />
              )}
            </AnimatePresence>
            <button onClick={e => { e.stopPropagation(); step(1) }} aria-label="Next" className="absolute end-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white">{rtl ? <ChevronLeft /> : <ChevronRight />}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
