// Performance monitoring utilities

export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
  
  // You can send to analytics service
  // Example: sendToAnalytics(metric)
}

// Measure component render time
export function measureRenderTime(componentName: string, callback: () => void) {
  const start = performance.now()
  callback()
  const end = performance.now()
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`)
  }
}

// Check if browser supports modern features
export function checkBrowserSupport() {
  return {
    webp: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0,
    avif: false, // Would need async check
    intersectionObserver: 'IntersectionObserver' in window,
    requestIdleCallback: 'requestIdleCallback' in window,
  }
}

// Preload critical resources
export function preloadResource(href: string, as: string) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}
