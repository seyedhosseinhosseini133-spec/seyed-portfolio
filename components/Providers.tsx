'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { T, Lang } from '@/lib/data'
type Theme = 'dark' | 'light'
type Ctx = { lang: Lang; theme: Theme; rtl: boolean; setLang: (l: Lang) => void; toggleTheme: () => void; t: (k: string) => string }
const C = createContext<Ctx>(null!)
export const useApp = () => useContext(C)
export default function Providers({ children }: { children: ReactNode }) {
  const [lang, setL] = useState<Lang>('en')
  const [theme, setTh] = useState<Theme>('dark')
  useEffect(() => {
    setL((localStorage.getItem('lang') as Lang) || 'en')
    setTh((localStorage.getItem('theme') as Theme) || 'dark')
  }, [])
  useEffect(() => {
    const d = document.documentElement
    d.lang = lang; d.dir = lang === 'fa' ? 'rtl' : 'ltr'; d.dataset.theme = theme
  }, [lang, theme])
  const setLang = (l: Lang) => { setL(l); localStorage.setItem('lang', l) }
  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTh(n); localStorage.setItem('theme', n) }
  return <C.Provider value={{ lang, theme, rtl: lang === 'fa', setLang, toggleTheme, t: k => T[lang][k] ?? k }}>{children}</C.Provider>
}
