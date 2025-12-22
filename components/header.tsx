"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Code } from "lucide-react"

const navigation = [
  { name: "Главная", href: "#home" },
  { name: "Услуги", href: "#services" },
  { name: "О нас", href: "#about" },
  { name: "Проекты", href: "#projects" },
  { name: "Контакты", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Обработка скролла для изменения стиля хедера с throttling для производительности
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            setIsScrolled(true)
          } else {
            setIsScrolled(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Функция для плавного скролла к секции
  const scrollToSection = (href: string) => {
    setIsOpen(false) // Закрываем мобильное меню

    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-alania-dark/95 backdrop-blur-md shadow-lg" : "bg-alania-dark"
      } border-b border-white/10`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a
            href="#home"
            className="-m-1.5 p-1.5"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#home")
            }}
          >
            <span className="sr-only">Alania GO</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-orange rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-alania-orange/30">
                <Code className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold gradient-text">Alania GO</span>
            </div>
          </a>
        </div>

        {/* Мобильное меню */}
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 active:bg-white/20">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-alania-dark border-white/10 p-0 w-[85vw] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-gradient-orange rounded-lg flex items-center justify-center">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">Alania GO</span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-base sm:text-lg font-medium text-white hover:text-alania-orange hover:bg-white/5 active:bg-white/10 transition-all py-3 px-2 rounded-lg border-b border-white/5 last:border-0"
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.href)
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-auto p-6">
                  <Button
                    asChild
                    className="w-full bg-gradient-orange hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-alania-orange/25 min-h-[48px]"
                    onClick={() => {
                      setIsOpen(false)
                      scrollToSection("#contact")
                    }}
                  >
                    <a href="#contact" className="text-base sm:text-lg">Связаться с нами</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Десктопное меню */}
        <div className="hidden lg:flex lg:gap-x-6 xl:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white hover:text-alania-orange transition-colors relative group"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.href)
              }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-alania-orange transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            asChild
            className="bg-gradient-orange hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-alania-orange/25"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#contact")
            }}
          >
            <a href="#contact">Связаться с нами</a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
