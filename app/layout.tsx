import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Providers from '@/components/Providers'
const lat = localFont({ src: './fonts/Outfit.woff2', variable: '--font-lat', display: 'swap' })
const fa = localFont({ src: './fonts/Vazirmatn.woff2', variable: '--font-fa', display: 'swap' })
const B = process.env.NEXT_PUBLIC_BASE_PATH
export const metadata: Metadata = {
  metadataBase: new URL('https://seyedhosseinhosseini133-spec.github.io/'),
  title: 'Seyed Hossein | Personal Portfolio',
  description: 'Personal portfolio of Seyed Hossein: developer, programming teacher, app designer, Windows and mobile app designer, and web designer.',
  manifest: `${B}/manifest.webmanifest`,
  icons: {
    icon: [
      { url: `${B}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${B}/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
    apple: `${B}/apple-touch-icon.png`,
  },
  appleWebApp: { capable: true, title: 'Seyed Hossein', statusBarStyle: 'black-translucent' },
  openGraph: { title: 'Seyed Hossein', description: 'Personal Portfolio', type: 'website', images: [`${B}/logo.png`] },
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
