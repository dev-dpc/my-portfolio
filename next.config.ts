import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions ? "/my-portfolio" : "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubActions && {
    output: "export",
    basePath,
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;
