"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
}

export default function ScoreRing({ score }: ScoreRingProps) {
  const [offset, setOffset] = useState(283);
  const circumference = 2 * Math.PI * 45; // ~283

  const strokeColor =
    score >= 75
      ? "hsl(var(--success))"
      : score >= 50
        ? "hsl(var(--warning))"
        : "hsl(var(--destructive))";

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (score / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  return (
    <svg width="72" height="72" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="6"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dashoffset 1s ease-out" }}
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontSize="24"
        fontWeight="bold"
      >
        {score}
      </text>
    </svg>
  );
}
