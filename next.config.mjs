import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Serve resized WebP/AVIF photos instead of the multi-MB originals — page
  // speed on phones is a ranking factor
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // A package-lock.json in the home folder makes Next guess the wrong
  // workspace root; pin it to this project
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
}

export default nextConfig
