import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Vazirmatn } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
const lat = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-lat', display: 'swap' })
const fa = Vazirmatn({ subsets: ['arabic'], variable: '--font-fa', display: 'swap' })
export const metadata: Metadata = {
  title: 'Seyed Hossein | Personal Portfolio',
  description: 'Personal portfolio of Seyed Hossein: developer, creative thinker, technology enthusiast.',
  manifest: '/manifest.webmanifest', icons: { icon: '/icon.svg', apple: '/icon.svg' },
  appleWebApp: { capable: true, title: 'Seyed Hossein', statusBarStyle: 'black-translucent' },
  openGraph: { title: 'Seyed Hossein', description: 'Personal Portfolio', type: 'website' },
}
export const viewport: Viewport = { themeColor: '#06080b', width: 'device-width', initialScale: 1, viewportFit: 'cover' }
const boot = `try{var d=document.documentElement,l=localStorage.getItem('lang')||'en';d.lang=l;d.dir=l==='fa'?'rtl':'ltr';d.dataset.theme=localStorage.getItem('theme')||'dark'}catch(e){}`
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" suppressHydrationWarning className={`${lat.variable} ${fa.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: boot }} /></head>
      <body><Providers>{children}</Providers></body>
    </html>
  )
}
