const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com',
      },
    ],
    // This halves the number of transformations since we don't generate both formats
    // WebP has excellent browser support and good compression
    formats: ['image/webp'],
    
    // Since your images rarely change, this prevents re-transformations
    // Images will stay cached for 31 days before needing re-transformation
    minimumCacheTTL: 2678400,
    
    // Default is [640, 750, 828, 1080, 1200, 1920, 2048, 3840] = 8 sizes
    // Reducing to 5 key sizes = fewer transformations per image
    deviceSizes: [640, 828, 1200, 1920, 2560],
    
    // Default is [16, 32, 48, 64, 96, 128, 256, 384] = 8 sizes
    // Keep only sizes you actually use for thumbnails/icons
    imageSizes: [64, 128, 256, 384],
  },
}

export default nextConfig
