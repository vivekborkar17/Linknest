/** @type {import('next').NextConfig} */
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
          protocol: 'http',
          hostname: '**',
        },
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
  };
  
  export default nextConfig;
