import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isGithubActions && {
    output: "export",
    basePath: "/my-portfolio",
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;
