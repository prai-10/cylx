"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { lerp } from "@/lib/utils";

// ============================================================
// GLSL: 3D Simplex Noise (Ashima Arts)
// High-efficiency procedural liquid noise
// ============================================================
const simplexNoise3D = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// ============================================================
// Vertex Shader: Tactile Liquid Deformation & Immediate Mouse Reactive Field
// ============================================================
const vertexShader = /* glsl */ `
${simplexNoise3D}

uniform float uTime;
uniform vec2 uMouse;
uniform float uScrollProgress;
uniform float uNoiseFrequency;
uniform float uNoiseAmplitude;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;
varying vec3 vWorldPosition;

void main() {
  // Dual-frequency organic liquid surface waves
  float n1 = snoise(position * uNoiseFrequency + vec3(uTime * 0.18));
  float n2 = snoise(position * (uNoiseFrequency * 2.2) - vec3(uTime * 0.12)) * 0.45;
  float displacement = (n1 + n2) * uNoiseAmplitude;

  // Immediate pointer attraction & local tactile push
  vec3 mouseTarget = vec3(uMouse.x * 1.5, uMouse.y * 1.5, 0.4);
  float distToMouse = length(position.xy - mouseTarget.xy);
  float pointerPush = exp(-distToMouse * distToMouse * 3.5) * 0.14;
  displacement += pointerPush;

  // Scroll narrative transformation: Organic fluid expands and fragments toward scale
  float scrollShift = uScrollProgress;
  displacement += snoise(position * 3.0 + uTime * 0.3) * (scrollShift * 0.22);

  // Apply displacement along geometric normal
  vec3 newPosition = position + normal * displacement;

  // Parallax tilt directly responding to pointer
  newPosition.x += uMouse.x * 0.18;
  newPosition.y += uMouse.y * 0.14;

  // Displaced normal recalculation via numerical gradient
  float eps = 0.002;
  vec3 tangent1 = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
  if (length(tangent1) < 0.01) tangent1 = normalize(cross(normal, vec3(1.0, 0.0, 0.0)));
  vec3 tangent2 = normalize(cross(normal, tangent1));

  vec3 nPos1 = position + tangent1 * eps;
  vec3 nPos2 = position + tangent2 * eps;

  float d1 = (snoise(nPos1 * uNoiseFrequency + uTime * 0.18) + snoise(nPos1 * 2.2 * uNoiseFrequency - uTime * 0.12) * 0.45) * uNoiseAmplitude;
  float d2 = (snoise(nPos2 * uNoiseFrequency + uTime * 0.18) + snoise(nPos2 * 2.2 * uNoiseFrequency - uTime * 0.12) * 0.45) * uNoiseAmplitude;

  vec3 p1 = nPos1 + normal * d1;
  vec3 p2 = nPos2 + normal * d2;

  vNormal = normalize(cross(p1 - newPosition, p2 - newPosition));

  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  vViewPosition = -mvPosition.xyz;
  vDisplacement = displacement;
  vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;

  gl_Position = projectionMatrix * mvPosition;
}
`;

// ============================================================
// Fragment Shader: Dark Metallic Liquid + Subtle Royal Blue + Yellow Specular Edge
// ============================================================
const fragmentShader = /* glsl */ `
uniform vec3 uColorBase;
uniform vec3 uColorBlueEdge;
uniform vec3 uColorYellowAccent;
uniform float uScrollProgress;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;
varying vec3 vWorldPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);

  // Key directional light (cool studio key)
  vec3 lightDir = normalize(vec3(2.5, 3.0, 3.5));
  float NdotL = max(dot(normal, lightDir), 0.0);
  float diffuse = NdotL * 0.55;

  // Rim back-light (creates tactile contour)
  vec3 rimDir = normalize(vec3(-2.0, 1.5, -2.5));
  float rimDot = max(dot(normal, rimDir), 0.0);
  float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0) * rimDot;

  // High-order specular for liquid metallic sheen
  vec3 halfVec = normalize(lightDir + viewDir);
  float specKey = pow(max(dot(normal, halfVec), 0.0), 160.0) * 0.75;

  // Secondary tactile sheen
  float specSoft = pow(max(dot(normal, halfVec), 0.0), 32.0) * 0.2;

  // Fresnel edge factor
  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.2);

  // Dark metallic base tone with subtle fluid dispersion
  vec3 surfaceColor = uColorBase + vec3(vDisplacement * 0.04);

  // Environmental deep royal blue reflections
  surfaceColor = mix(surfaceColor, uColorBlueEdge, fresnel * 0.65);

  // Controlled CLYX Yellow grazing glint along crests
  float yellowGlint = pow(fresnel, 4.0) * (0.35 + vDisplacement * 1.5);
  vec3 yellowAccent = uColorYellowAccent * yellowGlint;

  // Final composite lighting
  float ambient = 0.04;
  vec3 finalColor = surfaceColor * (ambient + diffuse + rim * 0.4) 
                  + vec3(specKey) * vec3(1.0, 0.98, 0.92) 
                  + vec3(specSoft) * uColorBlueEdge
                  + yellowAccent;

  // Slight cinematic exposure lift on scroll
  finalColor += uColorBlueEdge * (uScrollProgress * 0.06);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface HeroSceneProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
}

export default function HeroScene({ mouse, scrollProgress }: HeroSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // High responsiveness loop (0.28 factor — NO sluggish delay, immediate connection to cursor)
  const smoothMouse = useRef({ x: 0, y: 0 });
  const smoothScroll = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScrollProgress: { value: 0 },
      uNoiseFrequency: { value: 1.35 },
      uNoiseAmplitude: { value: 0.16 },
      uColorBase: { value: new THREE.Color("#001233") },
      uColorBlueEdge: { value: new THREE.Color("#102A71") },
      uColorYellowAccent: { value: new THREE.Color("#F5C400") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.ShaderMaterial;

    // Fluid time progression
    material.uniforms.uTime.value += delta * 0.22;

    // Responsive mouse interpolation (crisp follow, no lag)
    smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.x, 0.28);
    smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.y, 0.28);
    material.uniforms.uMouse.value.set(
      smoothMouse.current.x,
      smoothMouse.current.y
    );

    // Scroll progress interpolation
    smoothScroll.current = lerp(smoothScroll.current, scrollProgress, 0.15);
    material.uniforms.uScrollProgress.value = smoothScroll.current;

    // Slow organic axial rotation + dynamic pointer tilt
    meshRef.current.rotation.y += delta * 0.04 + smoothMouse.current.x * 0.02;
    meshRef.current.rotation.x = smoothMouse.current.y * -0.15;
  });

  return (
    <>
      <Environment preset="night" />

      <mesh ref={meshRef} scale={1.75} position={[0, 0.1, 0]}>
        <icosahedronGeometry args={[1, 72]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
}
