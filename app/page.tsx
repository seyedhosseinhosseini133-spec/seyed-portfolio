import { Background, Nav, PWA, ScrollProgress, Splash } from '@/components/Chrome'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Gallery from '@/components/Gallery'
import Videos from '@/components/Videos'
import Contact from '@/components/Contact'
export default function Page() {
  return (
    <>
      <Splash /><ScrollProgress /><Background /><Nav /><PWA />
      <main><Hero /><About /><Skills /><Projects /><Gallery /><Videos /><Contact /></main>
    </>
  )
}
