"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

export default function ContactSection() {
  const STORAGE_KEY = "contact-form-draft"
  const COOLDOWN_MS = 20000
  const isWebhookConfigured = Boolean(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitRequestId, setSubmitRequestId] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [honeypot, setHoneypot] = useState("")
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [cooldownTick, setCooldownTick] = useState(0)
  const { ref: sectionRef, isVisible } = useAnimateOnScroll<HTMLElement>({ threshold: 0.1 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as typeof formData
        if (parsed && !formData.name && !formData.email && !formData.phone && !formData.message) {
          setFormData(parsed)
        }
      }
    } catch (error) {
      console.warn("Failed to read contact form draft:", error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      const isEmpty =
        !formData.name.trim() &&
        !formData.email.trim() &&
        !formData.phone.trim() &&
        !formData.message.trim()

      if (isEmpty) {
        localStorage.removeItem(STORAGE_KEY)
        return
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch (error) {
      console.warn("Failed to save contact form draft:", error)
    }
  }, [formData])

  useEffect(() => {
    if (!cooldownUntil) {
      return
    }
    const intervalId = window.setInterval(() => {
      setCooldownTick((prev) => prev + 1)
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [cooldownUntil])

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, "")
    if (digits.startsWith("8")) {
      digits = `7${digits.slice(1)}`
    }
    if (digits.length > 11) {
      digits = digits.slice(0, 11)
    }
    const hasCountry = digits.startsWith("7")
    const body = hasCountry ? digits.slice(1) : digits

    let result = hasCountry ? "+7" : ""
    if (body.length > 0) {
      result += ` (${body.slice(0, 3)}`
    }
    if (body.length >= 4) {
      result += `) ${body.slice(3, 6)}`
    }
    if (body.length >= 7) {
      result += `-${body.slice(6, 8)}`
    }
    if (body.length >= 9) {
      result += `-${body.slice(8, 10)}`
    }
    return result
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
    if (fieldErrors.phone) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next.phone
        return next
      })
    }
  }

  const getFieldErrors = () => {
    const errors: Record<string, string> = {}
    const name = formData.name.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim()
    const message = formData.message.trim()

    if (name.length < 2) {
      errors.name = "Введите имя (минимум 2 символа)."
    }

    if (!email) {
      errors.email = "Введите email."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
      errors.email = "Введите корректный email."
    }

    if (phone) {
      const digits = phone.replace(/\D/g, "")
      if (digits.length < 11 || !digits.startsWith("7")) {
        errors.phone = "Введите корректный номер телефона."
      }
    }

    if (message.length < 10) {
      errors.message = "Сообщение должно быть не короче 10 символов."
    }

    return errors
  }

  const submitForm = async () => {
    const errors = getFieldErrors()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError("")
    setSubmitRequestId(null)

    // URL вебхука берется из переменных окружения
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

    if (!WEBHOOK_URL) {
      console.error("Webhook URL is not defined in environment variables")
      setSubmitError("Ошибка конфигурации. Свяжитесь с администратором.")
      setIsSubmitting(false)
      return
    }

    if (!navigator.onLine) {
      setSubmitError("Нет подключения к интернету. Проверьте соединение и попробуйте снова.")
      setIsSubmitting(false)
      return
    }

    if (honeypot) {
      setSubmitError("Проверка безопасности не пройдена. Попробуйте позже.")
      setIsSubmitting(false)
      return
    }

    if (cooldownUntil && cooldownUntil > Date.now()) {
      setSubmitError("Повторная отправка пока недоступна. Подождите немного.")
      setIsSubmitting(false)
      return
    }

    const requestId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`

    setSubmitRequestId(requestId)

    const normalizedMessage = formData.message.replace(/\s+/g, " ").trim()

    const payload = {
      ...formData,
      message: normalizedMessage,
      requestId,
      submittedAt: new Date().toISOString(),
      source: window.location.href,
      userAgent: navigator.userAgent,
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 12000)

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "cors",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain;q=0.9",
        },
        body: JSON.stringify(payload),
      })

      const responseText = await response.text()
      const contentType = response.headers.get("content-type") || ""
      const responseData =
        contentType.includes("application/json") && responseText
          ? (JSON.parse(responseText) as { message?: string; error?: string })
          : null

      if (!response.ok) {
        const serverMessage = responseData?.error || responseData?.message || responseText
        throw new Error(
          serverMessage
            ? `Ошибка сервера (${response.status}): ${serverMessage}`
            : `Ошибка сервера (${response.status})`
        )
      }

      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
      setCooldownUntil(Date.now() + COOLDOWN_MS)
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("Error submitting form:", error)
      const message =
        error instanceof DOMException && error.name === "AbortError"
          ? "Превышено время ожидания ответа. Попробуйте еще раз."
          : error instanceof Error
            ? error.message
            : "Проверьте соединение или настройки"
      setSubmitError(`Ошибка при отправке: ${message}`)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } finally {
      window.clearTimeout(timeoutId)
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitForm()
  }

  const isCoolingDown = cooldownUntil ? cooldownUntil > Date.now() : false
  const cooldownSeconds =
    isCoolingDown && cooldownUntil
      ? Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000))
      : 0

  const isFormValid = useMemo(() => Object.keys(getFieldErrors()).length === 0, [formData])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-alania-dark to-alania-dark/95 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-alania-orange/10 rounded-full animate-rotate-slow" style={{ animationDuration: "30s" }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-alania-amber/10 rounded-full animate-rotate-reverse" style={{ animationDuration: "25s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-alania-orange/30 rounded-full animate-particle"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-alania-amber/40 rounded-full animate-particle" style={{ animationDelay: "1.5s" }}></div>
        <div className="hidden md:block absolute bottom-1/3 left-1/2 w-2 h-2 bg-alania-orange/20 rounded-full animate-particle" style={{ animationDelay: "3s" }}></div>
        
        {/* Gradient orbs */}
        <div className="hidden lg:block absolute top-1/4 right-1/4 w-40 h-40 bg-alania-orange/5 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Свяжитесь с <span className="gradient-text">нами</span>
          </h2>
          <p 
            className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Готовы обсудить ваш проект? Заполните форму, и мы свяжемся с вами в ближайшее время
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 max-w-7xl mx-auto">
          <div 
            className={`bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 gradient-border relative overflow-hidden transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Form background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-orange opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                <div className="p-2 bg-alania-orange/20 rounded-lg">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Напишите нам</h3>
              </div>

              {submitSuccess && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-green-400 text-sm sm:text-base">
                    ✅ Спасибо за сообщение! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                  </p>
                  {submitRequestId && (
                    <p className="text-green-300 text-xs sm:text-sm mt-2">
                      Код заявки: {submitRequestId}
                    </p>
                  )}
                </div>
              )}

              {submitError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-red-400 text-sm sm:text-base">❌ {submitError}</p>
                  {submitRequestId && (
                    <p className="text-red-300 text-xs sm:text-sm mt-2">
                      Код заявки: {submitRequestId}
                    </p>
                  )}
                  <div className="mt-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => submitForm()}
                      disabled={isSubmitting || isCoolingDown}
                      className="w-full sm:w-auto"
                    >
                      Повторить отправку
                    </Button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                      Ваше имя *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов"
                      required
                      className={`bg-white/5 border-white/10 focus:border-alania-orange transition-colors text-sm sm:text-base min-h-[44px] ${
                        fieldErrors.name
                          ? "border-red-400/70 animate-shake"
                          : formData.name.trim().length > 0
                            ? "border-emerald-400/70"
                            : ""
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs sm:text-sm text-red-300 mt-1 animate-fade-in">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                      Телефон
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$"
                      placeholder="+7 (999) 123-45-67"
                      className={`bg-white/5 border-white/10 focus:border-alania-orange transition-colors text-sm sm:text-base min-h-[44px] ${
                        fieldErrors.phone
                          ? "border-red-400/70 animate-shake"
                          : formData.phone.trim().length > 0
                            ? "border-emerald-400/70"
                            : ""
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-xs sm:text-sm text-red-300 mt-1 animate-fade-in">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                    required
                    className={`bg-white/5 border-white/10 focus:border-alania-orange transition-colors text-sm sm:text-base min-h-[44px] ${
                      fieldErrors.email
                        ? "border-red-400/70 animate-shake"
                        : formData.email.trim().length > 0
                          ? "border-emerald-400/70"
                          : ""
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs sm:text-sm text-red-300 mt-1 animate-fade-in">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                    Сообщение *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите о вашем проекте..."
                    required
                    className={`bg-white/5 border-white/10 focus:border-alania-orange min-h-[100px] sm:min-h-[120px] transition-colors resize-none text-sm sm:text-base ${
                      fieldErrors.message
                        ? "border-red-400/70 animate-shake"
                        : formData.message.trim().length > 0
                          ? "border-emerald-400/70"
                          : ""
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="text-xs sm:text-sm text-red-300 mt-1 animate-fade-in">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!isWebhookConfigured || isSubmitting || !isFormValid || isCoolingDown}
                  className="w-full bg-gradient-orange hover:opacity-90 transition-opacity text-white font-semibold py-3 min-h-[48px] text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Отправка...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Отправить сообщение <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
                {!isWebhookConfigured && (
                  <p className="text-xs sm:text-sm text-amber-300 mt-2">
                    Отправка временно недоступна — настройте переменную `NEXT_PUBLIC_N8N_WEBHOOK_URL`.
                  </p>
                )}
                {isCoolingDown && (
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
                    Повторная отправка доступна через {cooldownSeconds} сек.
                  </p>
                )}
              </form>
            </div>
          </div>

          <div 
            className={`flex flex-col justify-center transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Контактная информация</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-alania-orange/30 transition-all duration-300">
                <div className="bg-alania-orange/20 p-2 sm:p-3 rounded-lg flex-shrink-0 transition-all duration-300 group-hover:bg-alania-orange/30 group-hover:scale-110">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 group-hover:text-alania-orange transition-colors duration-300">Email</h4>
                  <a href="mailto:eduardgagite@gmail.com" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors break-all">
                    eduardgagite@gmail.com
                  </a>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">Ответим в течение 2 часов</p>
                </div>
              </div>

              <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-alania-orange/30 transition-all duration-300">
                <div className="bg-alania-orange/20 p-2 sm:p-3 rounded-lg flex-shrink-0 transition-all duration-300 group-hover:bg-alania-orange/30 group-hover:scale-110">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 group-hover:text-alania-orange transition-colors duration-300">Телефон</h4>
                  <a href="tel:+79064946024" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                    +7 (906) 494-60-24
                  </a>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">Звоните с 9:00 до 18:00 МСК</p>
                </div>
              </div>

              <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-alania-orange/30 transition-all duration-300">
                <div className="bg-alania-orange/20 p-2 sm:p-3 rounded-lg flex-shrink-0 transition-all duration-300 group-hover:bg-alania-orange/30 group-hover:scale-110">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 group-hover:text-alania-orange transition-colors duration-300">Местоположение</h4>
                  <p className="text-sm sm:text-base text-gray-300">Удаленная работа</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">Работаем по всей России</p>
                </div>
              </div>

              <div className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-alania-orange/30 transition-all duration-300">
                <div className="bg-alania-orange/20 p-2 sm:p-3 rounded-lg flex-shrink-0 transition-all duration-300 group-hover:bg-alania-orange/30 group-hover:scale-110">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 group-hover:text-alania-orange transition-colors duration-300">Время работы</h4>
                  <p className="text-sm sm:text-base text-gray-300">Пн-Пт: 9:00 - 18:00 МСК</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">Выходные: по договоренности</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
