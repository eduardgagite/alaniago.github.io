/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт для GitHub Pages
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Для корректной работы ссылок на GitHub Pages
  trailingSlash: true,
  // Optimize for production
  poweredByHeader: false,
  compress: true,
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-sheet'],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // React strict mode for better performance warnings
  reactStrictMode: true,
  // Optimize bundle
  swcMinify: true,
}

export default nextConfig
