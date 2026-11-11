'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ReactNode } from 'react'
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12%' }} transition={{ duration: .8, delay, ease: [.2, .7, .2, 1] }}>{children}</motion.div>
}
export function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.div className="inline-block" style={{ x: sx, y: sy }}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * .25); y.set((e.clientY - r.top - r.height / 2) * .25) }}
      onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
  )
}
export const H2 = ({ children }: { children: ReactNode }) => <h2 className="mb-8 text-[clamp(2rem,6vw,4rem)] font-extrabold leading-[1.1] tracking-tight">{children}</h2>
