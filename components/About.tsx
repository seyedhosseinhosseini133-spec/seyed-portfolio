'use client'
import { useApp } from './Providers'
import { Reveal, H2 } from './ui'
export default function About() {
  const { t } = useApp()
  const Card = ({ h, p, cls }: { h: string; p: string; cls: string }) => (
    <Reveal className={cls}><div className="glass h-full p-7"><h3 className="mb-2 font-bold text-ac">{t(h)}</h3><p className="text-mu">{t(p)}</p></div></Reveal>
  )
  return (
    <section id="about" className="px-[6vw] py-28">
      <Reveal><H2>{t('aboutT')}</H2></Reveal>
      <div className="grid gap-5 md:grid-cols-12">
        <Card h="a1h" p="a1" cls="md:col-span-7" />
        <Card h="a2h" p="a2" cls="md:col-span-5 md:-mt-14" />
        <Card h="a3h" p="a3" cls="md:col-span-7 md:col-start-3" />
      </div>
    </section>
  )
}
