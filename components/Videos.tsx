'use client'
import { useRef, useState } from 'react'
import { Play, Pause, Maximize } from 'lucide-react'
import { useApp } from './Providers'
import { Reveal, H2 } from './ui'
import { VIDEOS } from '@/lib/data'
function Player({ v }: { v: (typeof VIDEOS)[number] }) {
  const { t, lang } = useApp()
  const r = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false), [p, setP] = useState(0)
  const toggle = () => { const e = r.current; if (!e) return; e.paused ? e.play() : e.pause() }
  return (
    <div className="glass overflow-hidden">
      <div className="grid aspect-video place-items-center" style={{ background: `linear-gradient(135deg,${v.c[0]},${v.c[1]})` }}>
        {v.src ? <video ref={r} src={v.src} poster={v.poster} playsInline preload="metadata" className="h-full w-full object-cover" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onTimeUpdate={e => setP(e.currentTarget.currentTime / (e.currentTarget.duration || 1) * 100)} onClick={toggle} />
          : v.poster ? <img src={v.poster} alt={v[lang][0]} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          : <p className="p-4 text-center text-sm text-white">{t('noVid')}</p>}
      </div>
      {v.src && (
        <div className="flex items-center gap-2 px-3 py-2">
          <button onClick={toggle} aria-label={t('play')} className="grid h-9 w-9 place-items-center rounded-full border border-[var(--bd)]">{playing ? <Pause size={15} /> : <Play size={15} />}</button>
          <input type="range" min={0} max={100} value={p} aria-label="Seek" className="flex-1 accent-[var(--ac)]" onChange={e => { const el = r.current; if (el?.duration) el.currentTime = el.duration * +e.target.value / 100 }} />
          <button onClick={() => r.current?.requestFullscreen?.()} aria-label="Fullscreen" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--bd)]"><Maximize size={15} /></button>
        </div>
      )}
      <div className="px-4 pb-4 pt-2"><h3 className="font-bold">{v[lang][0]}</h3><p className="text-sm text-mu">{v[lang][1]}</p></div>
    </div>
  )
}
export default function Videos() {
  const { t } = useApp()
  return (
    <section id="videos" className="px-[6vw] py-28">
      <Reveal><H2>{t('vidT')}</H2></Reveal>
      <div className="grid gap-5 md:grid-cols-2">{VIDEOS.map((v, i) => <Reveal key={i} delay={i * .1}><Player v={v} /></Reveal>)}</div>
    </section>
  )
}
