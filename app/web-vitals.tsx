'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log Web Vitals in development
    if (process.env.NODE_ENV === 'development') {
      console.log({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      })
    }

    // Send to analytics in production
    // Example: sendToAnalytics(metric)
  })

  return null
}
