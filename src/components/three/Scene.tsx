"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";

interface SceneProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
  className?: string;
}

function SceneContent({ mouse, scrollProgress }: Omit<SceneProps, "className">) {
  return (
    <Suspense fallback={null}>
      <HeroScene mouse={mouse} scrollProgress={scrollProgress} />
    </Suspense>
  );
}

export default function Scene({ mouse, scrollProgress, className }: SceneProps) {
  const [gpuCapable, setGpuCapable] = useState(true);

  useEffect(() => {
    // Dynamically import detect-gpu to check capabilities
    import("detect-gpu").then(({ getGPUTier }) => {
      getGPUTier().then((tier) => {
        // Tier 0 = unknown/blocked, tier 1 = low-end
        if (tier.tier < 2) {
          setGpuCapable(false);
        }
      });
    });
  }, []);

  if (!gpuCapable) return null;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <SceneContent mouse={mouse} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
