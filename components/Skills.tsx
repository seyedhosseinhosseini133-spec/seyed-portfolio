'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from './Providers'
import { Reveal, H2 } from './ui'
import { SKILLS } from '@/lib/data'
export default function Skills() {
  const { t } = useApp()
  const [lv, setLv] = useState<Record<string, number>>({})
  useEffect(() => { try { setLv(JSON.parse(localStorage.getItem('lv') || '{}')) } catch {} }, [])
  const set = (n: string, v: number) => { const x = { ...lv, [n]: v }; setLv(x); localStorage.setItem('lv', JSON.stringify(x)) }
  return (
    <section id="skills" className="px-[6vw] py-28">
      <Reveal><H2>{t('skillsT')}</H2></Reveal>
      <p className="-mt-4 mb-6 text-sm text-mu">{t('skillNote')}</p>
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
        {SKILLS.map(([n, d], i) => {
          const v = lv[n] ?? d
          return (
            <Reveal key={n} delay={(i % 4) * .06}>
              <motion.div whileHover={{ y: -6 }} className="glass grid gap-2.5 p-5">
                <div className="flex justify-between font-semibold"><span>{n}</span><small className="text-mu">{v}%</small></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bd)]"><motion.i initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.3, ease: [.2, .7, .2, 1] }} className="block h-full rounded-full bg-gradient-to-r from-ac to-ac2" /></div>
                <input type="range" min={0} max={100} value={v} aria-label={n} onChange={e => set(n, +e.target.value)} className="w-full accent-[var(--ac)]" />
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
