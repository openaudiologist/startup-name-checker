"use client";

import { useState } from "react";
import { NameCheckResult } from "@/types";
import NameInput from "@/components/NameInput";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ResultCards from "@/components/ResultCards";
import AffiliateCards from "@/components/AffiliateCards";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NameCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkName = async (inputName: string) => {
    setName(inputName);
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/check-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data);
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      {/* Top Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          Free Tool · AI Powered
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-black tracking-tight mb-3">
        Startup Name <span className="text-primary">Checker</span>
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground text-base max-w-lg mb-8">
        Enter your startup name and get an AI-powered brand analysis with
        scores, domain ideas, social handles, and alternative suggestions.
      </p>

      {/* Input */}
      <NameInput onSubmit={checkName} loading={loading} />

      {/* Loading */}
      {loading && <LoadingSkeleton />}

      {/* Error */}
      {error && (
        <Card className="mt-8 border-destructive">
          <CardContent className="p-6">
            <p className="text-destructive text-sm mb-3">{error}</p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => checkName(name)}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <>
          <ResultCards
            result={result}
            name={name}
            onAlternativeClick={checkName}
          />
          <AffiliateCards />
        </>
      )}
    </main>
  );
}
