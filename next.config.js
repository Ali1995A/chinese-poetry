/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['fs', 'path'],
  },
  // 启用静态导出
  output: 'standalone',
  // 配置图片域名
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // 配置路径别名
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
  // 环境变量配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // 重写规则
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  // 重定向规则
  async redirects() {
    return [
      {
        source: '/',
        destination: '/poems',
        permanent: false,
      },
    ];
  },
  // 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // 压缩配置
  compress: true,
  // 生产环境优化
  poweredByHeader: false,
  // 静态资源处理
  trailingSlash: false,
  // 忽略构建错误
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig