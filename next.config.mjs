/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
      styledComponents: true
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
          port: '',
          
        },
      ],
    },};

export default nextConfig;
