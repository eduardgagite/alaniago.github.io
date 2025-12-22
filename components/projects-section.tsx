"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye, Code, Calendar } from "lucide-react"
import { ProjectDetailsModal } from "./project-details-modal"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const projects = [
  {
    title: "Сайт-визитка для оперной певицы",
    description: "Элегантный сайт с биографией, фотогалереей и репертуаром",
    fullDescription:
      "Разработали изысканный сайт-визитку для профессиональной оперной певицы. Сайт включает подробную биографию артистки, интерактивную фотогалерею выступлений, полный послужной список и репертуар. Особое внимание уделено типографике и визуальному представлению, чтобы подчеркнуть элегантность и профессионализм.",
    image: "/images/opera-singer-website.png",
    tags: ["React", "Next.js", "Responsive Design", "TypeScript"],
    category: "Веб-разработка",
    year: "2024",
    features: [
      "Адаптивный дизайн для всех устройств",
      "Интерактивная фотогалерея",
      "SEO-оптимизация",
      "Быстрая загрузка страниц",
      "Элегантная типографика",
    ],
  },
  {
    title: "Telegram бот для мониторинга санкций",
    description: "Бот для проверки санкционных списков ЕС и США",
    fullDescription:
      "Создали мощного Telegram-бота для автоматической проверки физических и юридических лиц в санкционных списках Европейского Союза и США. Бот обрабатывает запросы в реальном времени, предоставляет детальную информацию о найденных совпадениях и ведет статистику проверок.",
    image: "/images/telegram-sanctions-bot.png",
    tags: ["Golang", "Telegram API", "REST API", "PostgreSQL"],
    category: "Автоматизация",
    year: "2024",
    features: [
      "Проверка в реальном времени",
      "Интеграция с официальными API",
      "Детальные отчеты",
      "Статистика использования",
      "Многоязычная поддержка",
    ],
  },
  {
    title: "Система отслеживания грузов",
    description: "Платформа для логистической компании с интеграцией AmoCRM",
    fullDescription:
      "Разработали комплексную систему отслеживания грузов для логистической компании. Платформа интегрирована с AmoCRM для управления клиентами и сервисом геолокации ГдеМои для точного отслеживания местоположения грузов. Система предоставляет клиентам актуальную информацию о статусе доставки.",
    image: "/images/albayan-tracking.png",
    tags: ["Golang", "React", "AmoCRM API", "Geolocation"],
    category: "Веб-платформа",
    year: "2023",
    features: [
      "Отслеживание в реальном времени",
      "Интеграция с AmoCRM",
      "Геолокация грузов",
      "Уведомления клиентов",
      "Аналитика доставок",
    ],
  },
  {
    title: "Многофункциональная бизнес-платформа",
    description: "Комплексная система автоматизации бизнес-процессов",
    fullDescription:
      "Создали всеобъемлющую бизнес-платформу для автоматизации различных процессов компании. Система включает управление записями клиентов, администрирование сотрудников, детальную аналитику и интеграцию с популярными мессенджерами для улучшения коммуникации.",
    image: "/images/business-platform.png",
    tags: ["React", "Golang", "Telegram Bot API", "Analytics"],
    category: "Корпоративное ПО",
    year: "2023",
    features: [
      "Управление клиентами",
      "HR-модуль",
      "Аналитика и отчеты",
      "Интеграция с мессенджерами",
      "Модульная архитектура",
    ],
  },
]

const categories = ["Все проекты", "Веб-разработка", "Автоматизация", "Веб-платформа", "Корпоративное ПО"]

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Все проекты")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>({ threshold: 0.1 })

  const filteredProjects =
    selectedCategory === "Все проекты" ? projects : projects.filter((project) => project.category === selectedCategory)

  const openModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-alania-dark/95 to-alania-dark relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 border border-alania-orange/10 rounded-full animate-rotate-slow" style={{ animationDuration: "30s" }}></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-alania-amber/10 rounded-full animate-rotate-reverse" style={{ animationDuration: "25s" }}></div>
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-alania-orange/30 rounded-full animate-particle"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-alania-amber/30 rounded-full animate-particle" style={{ animationDelay: "1.5s" }}></div>
        <div className="hidden md:block absolute top-1/2 right-1/4 w-2 h-2 bg-alania-orange/20 rounded-full animate-particle" style={{ animationDelay: "3s" }}></div>
        
        {/* Gradient orbs */}
        <div className="hidden lg:block absolute top-1/4 left-1/5 w-40 h-40 bg-alania-orange/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="hidden lg:block absolute bottom-1/4 right-1/5 w-32 h-32 bg-alania-amber/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Наши <span className="gradient-text">проекты</span>
          </h2>
          <p 
            className={`text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Примеры наших работ, которые приносят реальную пользу клиентам и решают бизнес-задачи
          </p>

          {/* Category Filter - Mobile Optimized */}
          <div 
            className={`flex flex-wrap justify-center gap-2 sm:gap-3 px-2 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-gradient-orange text-white shadow-lg"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 relative transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } hover:border-alania-orange/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-alania-orange/20`}
              style={{ transitionDelay: isVisible ? `${400 + index * 150}ms` : "0ms" }}
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Project category badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-alania-orange/90 text-white rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Year badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <div className="flex items-center gap-1 px-2 py-1 text-xs bg-white/10 text-white rounded-full backdrop-blur-sm">
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </div>
                </div>

                {/* Hover overlay with actions - Hidden on mobile, shown on hover for desktop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex">
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      onClick={() => openModal(project)}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Подробнее
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold group-hover:text-alania-orange transition-colors duration-300 leading-tight pr-2">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tags - Mobile Optimized */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 sm:px-3 py-1 rounded-full bg-alania-orange/10 text-alania-orange border border-alania-orange/20 group-hover:bg-alania-orange/20 group-hover:border-alania-orange/40 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(project)}
                    className="border-alania-orange/50 hover:bg-alania-orange/10 bg-transparent text-alania-orange hover:text-alania-orange group-hover:border-alania-orange group-hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Детали проекта
                  </Button>

                  <div className="flex items-center justify-center sm:justify-end gap-2 text-sm text-gray-500">
                    <Code className="h-4 w-4" />
                    <span>{project.tags.length} технологий</span>
                  </div>
                </div>
              </div>

              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-alania-orange/10 via-alania-amber/10 to-alania-orange/10 animate-gradient-x"></div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Проекты в данной категории не найдены</p>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject} />
      )}
    </section>
  )
}
