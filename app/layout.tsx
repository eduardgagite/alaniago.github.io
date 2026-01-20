import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { WebVitals } from "./web-vitals"
import { ServiceWorkerRegistration } from "@/components/service-worker-registration"

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://alaniago.github.io"),
  title: "Alania GO | Разработка ПО, сайтов и ТГ ботов",
  description:
    "Alania GO - команда талантливых разработчиков, предлагающая качественные IT продукты за адекватную сумму.",
  keywords: ["разработка ПО", "создание сайтов", "telegram боты", "веб-разработка", "IT услуги"],
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "android-chrome-512x512", url: "/favicons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/favicons/site.webmanifest",
  openGraph: {
    title: "Alania GO | Разработка ПО, сайтов и ТГ ботов",
    description: "Alania GO - команда талантливых разработчиков, предлагающая качественные IT продукты за адекватную сумму.",
    type: "website",
    locale: "ru_RU",
    siteName: "Alania GO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alania GO - Разработка ПО, сайтов и Telegram ботов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alania GO | Разработка ПО, сайтов и ТГ ботов",
    description: "Качественные IT решения для вашего бизнеса: разработка ПО, веб-сайты, Telegram боты",
    images: ["/og-image.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/logo.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect for critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS for above-the-fold content */
          .gradient-text {
            background: linear-gradient(90deg, #FF5500 0%, #FFA500 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .bg-gradient-orange {
            background: linear-gradient(90deg, #FF5500 0%, #FFA500 100%);
          }
          .gradient-border::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(135deg, #FF5500, #FFA500);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s;
          }
          .gradient-border:hover::before {
            opacity: 1;
          }
        ` }} />
      </head>
      <body className={`${inter.className} bg-alania-dark text-white min-h-screen flex flex-col`}>
        <WebVitals />
        <ServiceWorkerRegistration />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
