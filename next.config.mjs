/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cwwp2.dot.ca.gov",
      },
      {
        protocol: "https",
        hostname: "webcams.opensnow.com",
      },
    ],
  },
};

export default nextConfig;
