"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  value: number;
}

export default function ScoreBar({ label, value }: ScoreBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const colorClass =
    value >= 75
      ? "bg-green-500"
      : value >= 50
        ? "bg-primary"
        : "bg-destructive";

  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground text-xs font-mono w-32 shrink-0">
        {label}
      </span>
      <div className="bg-secondary h-1 rounded-full flex-1">
        <div
          className={cn("h-1 rounded-full transition-all duration-1000 ease-out", colorClass)}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-xs font-mono min-w-[1.5rem] text-right">
        {value}
      </span>
    </div>
  );
}
