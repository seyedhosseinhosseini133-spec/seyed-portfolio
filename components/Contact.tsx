'use client'
import { useState, FormEvent } from 'react'
import { useApp } from './Providers'
import { Reveal, H2 } from './ui'
import { CONTACT } from '@/lib/data'
export default function Contact() {
  const { t } = useApp()
  const [msg, setMsg] = useState('')
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Portfolio: ' + f.get('n'))}&body=${encodeURIComponent(f.get('m') + '\n\n' + f.get('e'))}`
    setMsg(t('sent')); e.currentTarget.reset()
  }
  const links: [string, string, string][] = [['Email', CONTACT.email, `mailto:${CONTACT.email}`], ['Telegram', '@telegram', CONTACT.telegram], ['Instagram', '@instagram', CONTACT.instagram], ['GitHub', 'github', CONTACT.github]]
  const inp = 'w-full rounded-2xl border border-[var(--bd)] bg-[var(--gl)] px-4 py-3 text-tx placeholder:text-mu'
  return (
    <section id="contact" className="px-[6vw] pb-24 pt-28">
      <Reveal><H2>{t('conT')}</H2></Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="grid content-start gap-3">
          {links.map(([a, b, h]) => <a key={a} href={h} target="_blank" rel="noopener" className="glass flex justify-between !rounded-2xl px-5 py-4 transition hover:-translate-y-1"><b>{a}</b><span className="text-mu">{b}</span></a>)}
        </Reveal>
        <Reveal delay={.1}>
          <form onSubmit={submit} className="glass grid gap-3 p-6">
            <input name="n" required placeholder={t('fName')} className={inp} />
            <input name="e" type="email" required placeholder={t('fMail')} className={inp} />
            <textarea name="m" required placeholder={t('fMsg')} className={`${inp} min-h-32`} />
            <button className="grad-b rounded-full px-6 py-3 font-semibold">{t('send')}</button>
            <p role="status" className="min-h-[1.4em] text-sm text-ac">{msg}</p>
          </form>
        </Reveal>
      </div>
      <footer className="mt-20 text-center text-sm text-mu">© 2026 SEYED HOSSEIN · {t('foot')}</footer>
    </section>
  )
}
