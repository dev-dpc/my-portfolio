import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/dev-dpc.github.io' : '',
  assetPrefix: isProd ? '/dev-dpc.github.io/' : '',
};

export default nextConfig;
