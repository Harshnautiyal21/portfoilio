"use client";
import { useRef, useState, MouseEvent } from "react";
import ProjectCard from "./ProjectCard";

interface ProjectCard3DProps {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  highlight?: boolean;
  index: number;
}

const MAX_TILT = 14;

export default function ProjectCard3D(props: ProjectCard3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -MAX_TILT;
    const rotateY = ((x - cx) / cx) * MAX_TILT;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
      transition: "transform 0.08s linear",
    });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.55s ease",
    });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", ...tiltStyle, position: "relative" }}
    >
      {/* Glowing light reflection overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "0.75rem",
          pointerEvents: "none",
          zIndex: 10,
          background: isHovered
            ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,212,255,0.18) 0%, transparent 65%)`
            : "none",
          transition: isHovered ? "none" : "background 0.4s ease",
        }}
      />
      <ProjectCard {...props} />
    </div>
  );
}
