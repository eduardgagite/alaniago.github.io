import { Code, Globe, Bot, Settings, Smartphone, Cpu } from "lucide-react"

const services = [
  {
    icon: <Code className="h-10 w-10 text-alania-orange" />,
    title: "Разработка ПО",
    description:
      "Создаем надежное программное обеспечение для решения ваших бизнес-задач с использованием современных технологий.",
  },
  {
    icon: <Globe className="h-10 w-10 text-alania-orange" />,
    title: "Разработка сайтов",
    description:
      "Проектируем и разрабатываем современные веб-сайты с адаптивным дизайном, оптимизированные для поисковых систем.",
  },
  {
    icon: <Bot className="h-10 w-10 text-alania-orange" />,
    title: "Telegram боты",
    description:
      "Создаем функциональных ботов для автоматизации бизнес-процессов и улучшения коммуникации с клиентами.",
  },
  {
    icon: <Settings className="h-10 w-10 text-alania-orange" />,
    title: "Внедрение CRM систем",
    description:
      "Настраиваем и интегрируем CRM системы (AmoCRM, Bitrix24) для автоматизации продаж и управления клиентами.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-alania-orange" />,
    title: "Мобильные приложения",
    description: "Разрабатываем нативные и кроссплатформенные мобильные приложения для iOS и Android.",
  },
  {
    icon: <Cpu className="h-10 w-10 text-alania-orange" />,
    title: "Интеграция систем",
    description: "Обеспечиваем бесшовную интеграцию различных систем и сервисов для оптимизации бизнес-процессов.",
  },
]

const animationDelays = [
  "animate-delay-100",
  "animate-delay-200",
  "animate-delay-300",
  "animate-delay-400",
  "animate-delay-500",
  "animate-delay-600",
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-alania-dark to-alania-dark/95 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-alania-orange/10 rounded-full animate-rotate-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 border border-alania-amber/10 rounded-full animate-rotate-slow"
          style={{ animationDirection: "reverse", animationDuration: "15s" }}
        ></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-alania-orange/30 rounded-full animate-bounce-subtle"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-alania-amber/40 rounded-full animate-bounce-subtle animate-delay-300"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-in-up">
            Наши <span className="gradient-text">услуги</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-in-up animate-delay-200">
            Мы предлагаем широкий спектр IT услуг для решения ваших бизнес-задач
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:translate-y-[-10px] hover:scale-105 gradient-border group animate-slide-in-up ${animationDelays[index]} hover:shadow-2xl hover:shadow-alania-orange/20`}
            >
              <div className="mb-4 relative">
                <div className="absolute inset-0 bg-alania-orange/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative group-hover:animate-float">{service.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-alania-orange transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>

              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-alania-orange/20 via-alania-amber/20 to-alania-orange/20 animate-gradient-x"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
