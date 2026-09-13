import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration (Next.js 16 default bundler)
  turbopack: {
    rules: {
      // GLSL shader imports as raw strings
      "*.glsl": { loaders: ["raw-loader"], as: "*.js" },
      "*.vert": { loaders: ["raw-loader"], as: "*.js" },
      "*.frag": { loaders: ["raw-loader"], as: "*.js" },
    },
  },

  // Transpile Three.js ecosystem packages
  transpilePackages: ["three"],
};

export default nextConfig;
