"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NameInputProps {
  onSubmit: (name: string) => void;
  loading: boolean;
}

export default function NameInput({ onSubmit, loading }: NameInputProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Enter your startup name…"
          maxLength={40}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="h-12 text-base"
        />
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={loading || !name.trim()}
          className="h-12 px-6 font-semibold"
        >
          {loading ? "Checking…" : "Check Name →"}
        </Button>
      </div>
      <p className="text-muted-foreground text-xs font-mono">
        {name.length} / 40
      </p>
    </div>
  );
}
