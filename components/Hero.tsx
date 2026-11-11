'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Github, Send, Instagram, Mail } from 'lucide-react'
import { useApp } from './Providers'
import { InstallButton } from './Chrome'
import { Magnetic } from './ui'
import { ROLES, CONTACT } from '@/lib/data'

function useType(words: string[]) {
  const [s, set] = useState('')
  useEffect(() => {
    let i = 0, j = 0, d = false, tm: ReturnType<typeof setTimeout>
    const f = () => {
      const w = words[i]; j += d ? -1 : 1; set(w.slice(0, j)); let n = d ? 35 : 70
      if (!d && j === w.length) { d = true; n = 1400 } else if (d && j === 0) { d = false; i = (i + 1) % words.length; n = 300 }
      tm = setTimeout(f, n)
    }
    f(); return () => clearTimeout(tm)
  }, [words])
  return s
}

export default function Hero() {
  const { t, lang } = useApp()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(p, [0, 1], [1, .5]), op = useTransform(p, [0, .75], [1, 0]), y = useTransform(p, [0, 1], [0, -140])
  const ay = useTransform(p, [0, 1], [0, 180]), rot = useTransform(p, [0, 1], [0, 14])
  const role = useType(ROLES[lang])
  const socials = [[Github, CONTACT.github, 'GitHub'], [Send, CONTACT.telegram, 'Telegram'], [Instagram, CONTACT.instagram, 'Instagram'], [Mail, `mailto:${CONTACT.email}`, 'Email']] as const
  return (
    <section id="home" ref={ref} className="relative h-[190svh]">
      <div className="sticky top-0 grid h-svh grid-cols-1 items-center gap-6 overflow-hidden px-[6vw] pt-24 md:grid-cols-[1.2fr_.8fr]">
        <motion.div style={{ scale, opacity: op, y }} className="origin-[0%_50%] text-center md:text-start rtl:origin-[100%_50%]">
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[.95] tracking-[-.04em]"><span className="grad-t">{t('hi')}</span></h1>
          <p className="mb-2 mt-5 min-h-[1.7em] text-lg text-mu"><b className="border-e-2 border-ac pe-1 font-semibold text-tx">{role}</b></p>
          <p className="mx-auto max-w-[46ch] text-mu md:mx-0">{t('lead')}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Magnetic><a href="#projects" className="grad-b inline-block rounded-full px-6 py-3 font-semibold">{t('viewP')}</a></Magnetic>
            <Magnetic><a href="#contact" className="glass inline-block !rounded-full px-6 py-3 font-semibold">{t('contactB')}</a></Magnetic>
            <InstallButton />
          </div>
          <div className="mt-6 flex justify-center gap-3 md:justify-start">
            {socials.map(([Icon, href, n]) => <a key={n} href={href} target="_blank" rel="noopener" aria-label={n} className="glass grid h-11 w-11 place-items-center !rounded-full transition hover:-translate-y-1"><Icon size={18} /></a>)}
          </div>
        </motion.div>
        <motion.div style={{ y: ay, rotate: rot }} className="order-first mx-auto aspect-[3/4] max-h-[44svh] w-[min(56vw,360px)] md:order-none md:max-h-[68svh]">
          {/* Replace the initials with <img src="/me.jpg" className="absolute inset-0 h-full w-full object-cover" alt="Seyed Hossein" /> */}
          <div className="relative grid h-full w-full animate-[spin_0s] place-items-center overflow-hidden rounded-[44%_56%_40%_60%/50%_40%_60%_50%] bg-[conic-gradient(from_200deg,var(--ac),var(--ac2),#7b6cff,var(--ac))]">
            <img src="/my.png" className="absolute inset-0 h-full w-full object-cover" alt="Seyed Hossein" />
          </div>
          <motion.span animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="glass absolute -start-3 top-[12%] px-4 py-2 text-sm !rounded-2xl">{'{ code }'}</motion.span>
          <motion.span animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="glass absolute -end-2 bottom-[14%] px-4 py-2 text-sm !rounded-2xl">UI / UX</motion.span>
        </motion.div>
        <motion.a href="#about" style={{ opacity: op }} aria-label={t('scroll')} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-mu md:block"><motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="block"><ArrowDown /></motion.span></motion.a>
      </div>
    </section>
  )
}
