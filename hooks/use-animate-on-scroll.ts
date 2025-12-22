"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseAnimateOnScrollOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useAnimateOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseAnimateOnScrollOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

// Hook for animating multiple children with stagger effect
export function useStaggerAnimation(itemCount: number, baseDelay: number = 100) {
  const getDelay = useCallback(
    (index: number) => ({
      transitionDelay: `${index * baseDelay}ms`,
      animationDelay: `${index * baseDelay}ms`,
    }),
    [baseDelay]
  )

  return { getDelay }
}

// Hook for parallax scrolling effect
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrolled
      const offset = (scrolled - elementTop) * speed
      
      element.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return ref
}
