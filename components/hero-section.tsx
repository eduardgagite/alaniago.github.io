"use client"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Globe, Bot } from "lucide-react"

export default function HeroSection() {
  // Функция для плавного скролла к секции
  const scrollToSection = (href: string) => {
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
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center py-6 sm:py-8 md:py-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-alania-orange/25 via-transparent to-transparent opacity-40"></div>

      {/* Floating particles with varied animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary particles - floating */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-alania-orange/40 rounded-full animate-particle" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-alania-amber/50 rounded-full animate-particle" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-1/3 left-20 w-1 h-1 bg-alania-amber/30 rounded-full animate-particle" style={{ animationDelay: "2.5s" }}></div>

        {/* Geometric shapes - slow rotation */}
        <div className="absolute top-32 right-1/2 w-10 h-10 border border-alania-orange/15 rotate-45 animate-rotate-slow" style={{ animationDuration: "25s" }}></div>
        <div className="hidden md:block absolute bottom-32 left-2/3 w-8 h-8 border border-alania-amber/10 rotate-12 animate-rotate-reverse" style={{ animationDuration: "20s" }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Text content with staggered animations */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight animate-fade-in-up">
              Разработка <span className="gradient-text">инновационных</span> IT решений
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed animate-fade-in-up animate-delay-200">
              Мы команда талантливых разработчиков, создающая качественные продукты для вашего бизнеса по доступным
              ценам.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up animate-delay-400">
              <Button
                size="lg"
                className="bg-gradient-orange hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-alania-orange/25"
                onClick={() => scrollToSection("#services")}
              >
                Наши услуги
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5 bg-transparent transition-all duration-300 hover:scale-105 hover:border-alania-orange/50"
                onClick={() => scrollToSection("#contact")}
              >
                Связаться с нами
              </Button>
            </div>
            
            {/* Services preview - compact inline version */}
            <div className="grid grid-cols-3 gap-3 mt-6 sm:mt-8 animate-fade-in-up animate-delay-600">
              {[
                { icon: Code, title: "Разработка ПО" },
                { icon: Globe, title: "Веб-сайты" },
                { icon: Bot, title: "Telegram боты" },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-alania-orange/30 transition-all duration-300 cursor-pointer"
                  onClick={() => scrollToSection("#services")}
                >
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange mb-1.5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{service.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logo with enhanced visibility */}
          <div className="flex items-center justify-center relative order-1 lg:order-2 animate-fade-in animate-delay-300 h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
            {/* Soft glow behind logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
              <div 
                className="w-[400px] h-[400px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px] rounded-full animate-pulse-soft"
                style={{
                  background: 'radial-gradient(circle, rgba(255,85,0,0.15) 0%, rgba(255,85,0,0.08) 40%, transparent 70%)',
                }}
              ></div>
            </div>

            {/* Main logo container - BIGGER */}
            <div className="relative h-[240px] w-[240px] sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px] lg:h-[380px] lg:w-[380px] z-10">
              <Image
                src="/images/logo.png"
                alt="Alania GO"
                fill
                priority
                className="object-contain drop-shadow-[0_0_30px_rgba(255,85,0,0.3)] animate-float-slow"
                sizes="(max-width: 768px) 280px, 380px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
