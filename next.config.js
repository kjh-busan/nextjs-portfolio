/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.notion.so",
      "images.unsplash.com",
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com", // 이 도메인을 추가
    ],
    format: ["image/png", "image/webp", "image/jpeg"],
  },
};

module.exports = nextConfig;
