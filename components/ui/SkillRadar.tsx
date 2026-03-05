"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { portfolioConfig } from "@/content/config";

interface RadarSkill {
  name: string;
  proficiency: number;
}

const SIZE = 380;
const CENTER = SIZE / 2;
const OUTER_RADIUS = 140;
const LEVELS = 5;
const ANIMATION_DURATION_MS = 1400;

// Pull radar data from config; fall back to built-in defaults
const configWithRadar = portfolioConfig as typeof portfolioConfig & {
  skillRadar?: RadarSkill[];
};

const RADAR_DATA: RadarSkill[] = configWithRadar.skillRadar ?? [
  { name: "Python", proficiency: 95 },
  { name: "PyTorch", proficiency: 85 },
  { name: "LangChain", proficiency: 88 },
  { name: "Spark", proficiency: 82 },
  { name: "Docker", proficiency: 90 },
  { name: "FastAPI", proficiency: 88 },
  { name: "Next.js", proficiency: 78 },
  { name: "PostgreSQL", proficiency: 80 },
];

const N = RADAR_DATA.length;

function polarToCart(idx: number, radius: number): { x: number; y: number } {
  const angle = (idx / N) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function polygonPoints(skills: RadarSkill[], progress: number): string {
  return skills
    .map((s, i) => {
      const r = (s.proficiency / 100) * OUTER_RADIUS * progress;
      const p = polarToCart(i, r);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

function gridPolygon(level: number): string {
  const r = (level / LEVELS) * OUTER_RADIUS;
  return Array.from({ length: N }, (_, i) => {
    const p = polarToCart(i, r);
    return `${p.x},${p.y}`;
  }).join(" ");
}

export default function SkillRadar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [progress, setProgress] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView) return;
    const duration = ANIMATION_DURATION_MS;
    let start: number | null = null;
    let rafId: number;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      setProgress(Math.min(elapsed / duration, 1));
      if (elapsed < duration) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      <p className="font-orbitron text-xs tracking-[0.25em] text-cyan-400/70 uppercase">
        Proficiency Radar
      </p>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="max-w-full"
        style={{ overflow: "visible" }}
      >
        {/* Grid rings */}
        {Array.from({ length: LEVELS }, (_, i) => (
          <polygon
            key={`ring-${i}`}
            points={gridPolygon(i + 1)}
            fill="none"
            stroke="rgba(0,212,255,0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {RADAR_DATA.map((_, i) => {
          const outer = polarToCart(i, OUTER_RADIUS);
          return (
            <line
              key={`axis-${i}`}
              x1={CENTER}
              y1={CENTER}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(0,212,255,0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled data polygon */}
        <polygon
          points={polygonPoints(RADAR_DATA, progress)}
          fill="rgba(0,212,255,0.12)"
          stroke="#00D4FF"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.6))" }}
        />

        {/* Data points + labels */}
        {RADAR_DATA.map((skill, i) => {
          const r = (skill.proficiency / 100) * OUTER_RADIUS * progress;
          const pt = polarToCart(i, r);
          const labelPt = polarToCart(i, OUTER_RADIUS + 24);
          const isHovered = hoveredIdx === i;

          return (
            <g key={`point-${i}`}>
              {/* Skill dot */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 7 : 5}
                fill="#00D4FF"
                style={{
                  filter: "drop-shadow(0 0 6px #00D4FF)",
                  cursor: "pointer",
                  transition: "r 0.15s ease",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />

              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={pt.x - 52}
                    y={pt.y - 32}
                    width={104}
                    height={22}
                    rx={4}
                    fill="rgba(0,15,30,0.92)"
                    stroke="#00D4FF"
                    strokeWidth={0.8}
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 17}
                    textAnchor="middle"
                    fill="#00D4FF"
                    fontSize={10}
                    fontFamily="monospace"
                  >
                    {skill.name}: {skill.proficiency}%
                  </text>
                </g>
              )}

              {/* Axis label */}
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(148,163,184,0.85)"
                fontSize={10}
                fontFamily="monospace"
              >
                {skill.name}
              </text>
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx={CENTER} cy={CENTER} r={3} fill="#00D4FF" opacity={0.4} />
      </svg>
    </div>
  );
}
