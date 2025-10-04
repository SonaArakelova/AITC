import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
     domains: ['flagcdn.com'], 
      },

    
    i18n: {
      locales: ['en-US', 'hy'], 
      defaultLocale: 'en-US',
  },


     reactStrictMode: false
};

export default nextConfig;
