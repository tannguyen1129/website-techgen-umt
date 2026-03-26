/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", 
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  // Nếu dùng ảnh từ domain ngoài thì thêm vào đây
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;