'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useCallback } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
  webpSrc?: string
  avifSrc?: string
}

/**
 * OptimizedImage component with WebP/AVIF support and fallback handling
 * For static export, it provides proper image optimization hints
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  webpSrc,
  avifSrc,
  className = '',
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const resolvedPlaceholder = props.placeholder ?? (props.blurDataURL ? 'blur' : 'empty')

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }, [fallbackSrc, hasError])

  // For static export, we can use picture element for format selection
  // But Next.js Image component handles this through its own optimization
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      // Avoid blur placeholder without blurDataURL to prevent runtime errors
      placeholder={resolvedPlaceholder}
    />
  )
}

/**
 * Picture component with explicit format fallbacks
 * Use this when you have pre-converted WebP/AVIF versions of images
 */
export function PictureWithFallback({
  src,
  alt,
  webpSrc,
  avifSrc,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
}: {
  src: string
  alt: string
  webpSrc?: string
  avifSrc?: string
  width: number
  height: number
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}) {
  return (
    <picture>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}

/**
 * Responsive image with srcset for different screen sizes
 */
export function ResponsiveImage({
  src,
  alt,
  sizes = '100vw',
  className = '',
  loading = 'lazy',
  priority = false,
  aspectRatio = '16/9',
}: {
  src: string
  alt: string
  sizes?: string
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  aspectRatio?: string
}) {
  // Generate srcset for common breakpoints
  const basePath = src.replace(/\.[^.]+$/, '')
  const ext = src.split('.').pop()
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={priority ? 'eager' : loading}
        priority={priority}
        className="object-cover"
      />
    </div>
  )
}
