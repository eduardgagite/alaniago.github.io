import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { WebVitals } from "./web-vitals"

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Alania GO | Разработка ПО, сайтов и ТГ ботов",
  description:
    "Alania GO - команда талантливых разработчиков, предлагающая качественные IT продукты за адекватную сумму.",
  keywords: ["разработка ПО", "создание сайтов", "telegram боты", "веб-разработка", "IT услуги"],
  openGraph: {
    title: "Alania GO | Разработка ПО, сайтов и ТГ ботов",
    description: "Alania GO - команда талантливых разработчиков, предлагающая качественные IT продукты за адекватную сумму.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-alania-dark text-white min-h-screen flex flex-col`}>
        <WebVitals />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
