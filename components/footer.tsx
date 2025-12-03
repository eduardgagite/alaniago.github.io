"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Code, ArrowUp } from "lucide-react"
import { TelegramIcon, WhatsAppIcon } from "./icons"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gradient-to-b from-alania-dark to-black border-t border-white/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 border border-alania-orange/5 rounded-full"></div>
        <div className="absolute bottom-10 right-1/4 w-48 h-48 border border-alania-amber/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-orange opacity-5 rounded-full blur-3xl"></div>

        {/* Code-like decorative elements */}
        <div className="absolute top-20 right-20 text-alania-orange/10 font-mono text-sm">
          {'{ "status": "ready" }'}
        </div>
        <div className="absolute bottom-20 left-20 text-alania-amber/10 font-mono text-sm">{"<dev />"}</div>
      </div>

      <div className="container mx-auto py-16 relative z-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:2fr_repeat(4,max-content)] gap-x-10 mb-12">
            {/* Column 1: Company info */}
            <div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-orange rounded-lg">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold gradient-text">Alania GO</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Команда талантливых разработчиков, создающая инновационные IT решения для вашего бизнеса. Мы
                  превращаем идеи в качественные продукты.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="https://t.me/alania_go"
                    className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-alania-orange/20 hover:border-alania-orange/50 transition-all duration-300 group"
                  >
                    <TelegramIcon className="h-5 w-5 text-gray-400 group-hover:text-alania-orange transition-colors" />
                    <span className="sr-only">Telegram</span>
                  </Link>
                  <Link
                    href="https://wa.me/79991234567"
                    className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-alania-orange/20 hover:border-alania-orange/50 transition-all duration-300 group"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-gray-400 group-hover:text-alania-orange transition-colors" />
                    <span className="sr-only">WhatsApp</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-semibold gradient-text flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Услуги
                </h3>
                <div className="flex flex-col space-y-3">
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Разработка ПО
                  </Link>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Веб-сайты
                  </Link>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Telegram боты
                  </Link>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Мобильные приложения
                  </Link>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Техподдержка
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 3: Navigation */}
            <div>
              <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-semibold gradient-text">Навигация</h3>
                <div className="flex flex-col space-y-3">
                  <Link href="#home" className="text-gray-400 hover:text-white transition-colors">
                    Главная
                  </Link>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Услуги
                  </Link>
                  <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                    О нас
                  </Link>
                  <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                    Проекты
                  </Link>
                  <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Контакты
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 4: Contact info */}
            <div>
              <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-semibold gradient-text flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Контакты
                </h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-alania-orange mt-1 flex-shrink-0" />
                    <a
                      href="mailto:info@alania-go.ru"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      info@alania-go.ru
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-alania-orange mt-1 flex-shrink-0" />
                    <a href="tel:+79991234567" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +7 (999) 123-45-67
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-alania-orange mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-400 text-sm">Удаленная работа</span>
                      <div className="text-xs text-gray-500">по всей России</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 5: Additional */}
            <div>
              <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-semibold gradient-text">Дополнительно</h3>
                <div className="flex flex-col space-y-3">
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Политика конфиденциальности
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Условия использования
                  </Link>
                  <Button
                    onClick={scrollToTop}
                    variant="outline"
                    size="sm"
                    className="border-alania-orange/50 hover:bg-alania-orange/10 text-alania-orange hover:text-alania-orange bg-transparent w-fit"
                  >
                    <ArrowUp className="h-4 w-4" />
                    Наверх
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/10 pt-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Alania GO. Все права защищены.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
