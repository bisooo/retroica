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
    // This will automatically optimize, resize, and serve images in modern formats (WebP, AVIF)
    // Cost optimization: Images are cached and only optimized once per size variant
  },
}

export default nextConfig
