/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // TODO: Added to bypass `Error: @next/font/google failed to run or is incorrectly configured.`
  // Possible fix https://larsmagnus.co/blog/how-to-optimize-custom-fonts-with-next-font.
  optimizeFonts: false,
}

module.exports = nextConfig
