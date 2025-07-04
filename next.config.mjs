import MillionLint from "@million/lint";
import million from "million/compiler";

// const withPWA = require('next-pwa')({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//     disable: process.env.NODE_ENV === 'development'
//   })

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      }
    }
    return config
  },
  reactStrictMode: true,
  experimental: {
    // serverActions:,
    // serverExternalPackages: ['@react-pdf/renderer'],
    // runtime: 'experimental-edge',
    // esmExternals: "loose",
    reactCompiler: {
      compilationMode: "annotation",
    },
  },
  images:{
    domains:['images.unsplash.com','upload.wikimedia.org/wikipedia/commons'],
    remotePatterns:[
      new URL('https://images.unsplash.com/*'),
      new URL('https://upload.wikimedia.org/wikipedia/commons/*')
    ],

  },
  env: {
    SECREATKEY: process.env.SECREATKEY,
  },
  // runtime: 'edge',
  reactStrictMode: true,
};

export default MillionLint.next({
  auto: { rsc: true },
})(million.next(nextConfig));
