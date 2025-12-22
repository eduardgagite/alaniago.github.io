"use client"

import { Code, Globe, Bot, Settings, Smartphone, Cpu, type LucideIcon } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

interface ServiceItem {
  Icon: LucideIcon
  title: string
  description: string
}

const services: ServiceItem[] = [
  {
    Icon: Code,
    title: "Разработка ПО",
    description:
      "Создаем надежное программное обеспечение для решения ваших бизнес-задач с использованием современных технологий.",
  },
  {
    Icon: Globe,
    title: "Разработка сайтов",
    description:
      "Проектируем и разрабатываем современные веб-сайты с адаптивным дизайном, оптимизированные для поисковых систем.",
  },
  {
    Icon: Bot,
    title: "Telegram боты",
    description:
      "Создаем функциональных ботов для автоматизации бизнес-процессов и улучшения коммуникации с клиентами.",
  },
  {
    Icon: Settings,
    title: "Внедрение CRM систем",
    description:
      "Настраиваем и интегрируем CRM системы (AmoCRM, Bitrix24) для автоматизации продаж и управления клиентами.",
  },
  {
    Icon: Smartphone,
    title: "Мобильные приложения",
    description: "Разрабатываем нативные и кроссплатформенные мобильные приложения для iOS и Android.",
  },
  {
    Icon: Cpu,
    title: "Интеграция систем",
    description: "Обеспечиваем бесшовную интеграцию различных систем и сервисов для оптимизации бизнес-процессов.",
  },
]

export default function ServicesSection() {
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-alania-dark to-alania-dark/95 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-alania-orange/10 rounded-full animate-rotate-slow" style={{ animationDuration: "25s" }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-alania-amber/10 rounded-full animate-rotate-reverse" style={{ animationDuration: "20s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-alania-orange/30 rounded-full animate-particle"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-alania-amber/40 rounded-full animate-particle" style={{ animationDelay: "1s" }}></div>
        <div className="hidden md:block absolute bottom-1/3 left-1/3 w-2 h-2 bg-alania-orange/20 rounded-full animate-particle" style={{ animationDelay: "2s" }}></div>
        
        {/* Gradient orbs */}
        <div className="hidden lg:block absolute top-1/4 right-1/4 w-40 h-40 bg-alania-orange/5 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Наши <span className="gradient-text">услуги</span>
          </h2>
          <p 
            className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Мы предлагаем широкий спектр IT услуг для решения ваших бизнес-задач
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-white/10 group overflow-hidden transition-all duration-500 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              } hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-alania-orange/15 hover:border-alania-orange/30`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              {/* Icon with glow effect */}
              <div className="mb-3 sm:mb-4 relative">
                <div className="absolute -inset-3 bg-alania-orange/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <service.Icon className="h-10 w-10 text-alania-orange relative transition-all duration-300 group-hover:scale-110 group-hover:text-alania-amber" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-alania-orange transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                {service.description}
              </p>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-alania-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
