"use client"

import { Code, Users, Zap, Award, Target, CheckCircle, type LucideIcon } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

interface Feature {
  Icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    Icon: Code,
    title: "Качественный код",
    description:
      "Используем современные технологии и следуем лучшим практикам разработки для создания надежных решений",
  },
  {
    Icon: Users,
    title: "Индивидуальный подход",
    description: "Каждый проект уникален. Мы изучаем ваши потребности и создаем решения под конкретные задачи",
  },
  {
    Icon: Zap,
    title: "Быстрая разработка",
    description: "Эффективные процессы разработки позволяют нам создавать качественные продукты в короткие сроки",
  },
  {
    Icon: Award,
    title: "Полная поддержка",
    description: "Сопровождаем проект от идеи до запуска и предоставляем техническую поддержку после релиза",
  },
  {
    Icon: Target,
    title: "Прозрачность",
    description: "Открытое общение, четкие сроки и фиксированная стоимость без скрытых платежей",
  },
  {
    Icon: CheckCircle,
    title: "Гарантия качества",
    description: "Тщательное тестирование каждого продукта и гарантия исправления ошибок после запуска",
  },
]

const steps = [
  {
    number: "01",
    title: "Анализ",
    description:
      "Изучаем ваши потребности, анализируем конкурентов и определяем оптимальное техническое решение",
  },
  {
    number: "02",
    title: "Разработка",
    description:
      "Создаем продукт поэтапно с регулярными демонстрациями прогресса и возможностью внесения корректировок",
  },
  {
    number: "03",
    title: "Поддержка",
    description:
      "Запускаем проект, обучаем вашу команду и предоставляем техническую поддержку для стабильной работы",
  },
]

export default function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll<HTMLDivElement>({ threshold: 0.2 })
  const { ref: featuresRef, isVisible: featuresVisible } = useAnimateOnScroll<HTMLDivElement>({ threshold: 0.1 })
  const { ref: stepsRef, isVisible: stepsVisible } = useAnimateOnScroll<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-alania-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-alania-orange/10 rounded-full animate-rotate-slow" style={{ animationDuration: "30s" }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-alania-amber/10 rounded-full animate-rotate-reverse" style={{ animationDuration: "25s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-alania-orange/30 rounded-full animate-particle"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-alania-amber/30 rounded-full animate-particle" style={{ animationDelay: "1.5s" }}></div>
        <div className="hidden md:block absolute bottom-1/4 left-1/3 w-2 h-2 bg-alania-orange/20 rounded-full animate-particle" style={{ animationDelay: "3s" }}></div>
        
        {/* Gradient orbs */}
        <div className="hidden lg:block absolute top-1/3 left-1/6 w-48 h-48 bg-alania-orange/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="hidden lg:block absolute bottom-1/3 right-1/6 w-36 h-36 bg-alania-amber/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 transition-all duration-700 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              О <span className="gradient-text">компании</span>
            </h2>
            <p 
              className={`text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-4 transition-all duration-700 delay-150 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Alania GO — команда опытных разработчиков, специализирующаяся на создании веб-сайтов, программного
              обеспечения и Telegram-ботов. Мы работаем удаленно с клиентами по всей России, предлагая качественные
              IT-решения по доступным ценам.
            </p>
            <p 
              className={`text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4 transition-all duration-700 delay-300 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Наша цель — превратить ваши идеи в работающие продукты, которые приносят реальную пользу вашему бизнесу.
            </p>
          </div>

          {/* Why Choose Us */}
          <div ref={featuresRef} className="mb-12 sm:mb-16 md:mb-20">
            <h3 
              className={`text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-700 ${
                featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Почему выбирают <span className="gradient-text">нас</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-4 sm:p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden transition-all duration-500 ${
                    featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } hover:bg-white/10 hover:border-alania-orange/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-alania-orange/10`}
                  style={{ transitionDelay: featuresVisible ? `${index * 80}ms` : "0ms" }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 p-2 sm:p-3 rounded-xl bg-alania-orange/10 text-alania-orange relative overflow-hidden transition-all duration-500 group-hover:bg-alania-orange/20 group-hover:scale-110">
                      <div className="absolute inset-0 bg-alania-orange/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <feature.Icon className="h-6 w-6 relative transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-alania-orange transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Approach */}
          <div ref={stepsRef} className="text-center">
            <h3 
              className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-8 transition-all duration-700 ${
                stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Наш <span className="gradient-text">подход</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-4 sm:p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden transition-all duration-500 group ${
                    stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } hover:bg-white/10 hover:border-alania-orange/30 hover:-translate-y-1 sm:col-span-2 md:col-span-1 ${index === 2 ? 'sm:col-start-1 sm:col-end-3 md:col-start-auto md:col-end-auto' : ''}`}
                  style={{ transitionDelay: stepsVisible ? `${index * 150}ms` : "0ms" }}
                >
                  {/* Number with animated gradient */}
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
                    {step.number}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 group-hover:text-alania-orange transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                  
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-alania-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-2xl"></div>
                  
                  {/* Progress line connector (hidden on mobile) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-alania-orange/30 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
