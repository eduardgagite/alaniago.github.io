import { Code, Users, Zap, Award, Target, CheckCircle } from "lucide-react"

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Качественный код",
    description:
      "Используем современные технологии и следуем лучшим практикам разработки для создания надежных решений",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Индивидуальный подход",
    description: "Каждый проект уникален. Мы изучаем ваши потребности и создаем решения под конкретные задачи",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Быстрая разработка",
    description: "Эффективные процессы разработки позволяют нам создавать качественные продукты в короткие сроки",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Полная поддержка",
    description: "Сопровождаем проект от идеи до запуска и предоставляем техническую поддержку после релиза",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Прозрачность",
    description: "Открытое общение, четкие сроки и фиксированная стоимость без скрытых платежей",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Гарантия качества",
    description: "Тщательное тестирование каждого продукта и гарантия исправления ошибок после запуска",
  },
]

const featureDelays = [
  "animate-delay-100",
  "animate-delay-200",
  "animate-delay-300",
  "animate-delay-400",
  "animate-delay-500",
  "animate-delay-600",
]
const approachDelays = ["animate-delay-200", "animate-delay-400", "animate-delay-600"]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-alania-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-alania-orange/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-alania-amber/5 rounded-full animate-pulse animate-delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-alania-orange/20 rounded-full animate-bounce-subtle"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-alania-amber/20 rounded-full animate-bounce-subtle animate-delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 animate-slide-in-up">
              О <span className="gradient-text">компании</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 animate-slide-in-up animate-delay-200">
              Alania GO — команда опытных разработчиков, специализирующаяся на создании веб-сайтов, программного
              обеспечения и Telegram-ботов. Мы работаем удаленно с клиентами по всей России, предлагая качественные
              IT-решения по доступным ценам.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-slide-in-up animate-delay-400">
              Наша цель — превратить ваши идеи в работающие продукты, которые приносят реальную пользу вашему бизнесу.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12 animate-slide-in-up">
              Почему выбирают <span className="gradient-text">нас</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-alania-orange/30 transition-all duration-500 hover:scale-105 hover:translate-y-[-5px] animate-slide-in-up ${featureDelays[index]} hover:shadow-xl hover:shadow-alania-orange/10`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-alania-orange/10 text-alania-orange group-hover:bg-alania-orange/20 group-hover:scale-110 group-hover:animate-pulse-glow transition-all duration-500">
                      <div className="group-hover:animate-bounce-subtle">{feature.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-alania-orange transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Approach */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 animate-slide-in-up">
              Наш <span className="gradient-text">подход</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
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
              ].map((step, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-alania-orange/30 transition-all duration-500 hover:scale-105 group animate-slide-in-up ${approachDelays[index]}`}
                >
                  <div className="text-4xl font-bold gradient-text mb-4 group-hover:animate-bounce-subtle transition-all duration-300">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-semibold mb-3 group-hover:text-alania-orange transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
