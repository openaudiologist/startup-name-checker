"use client";

import { NameCheckResult } from "@/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ScoreRing from "@/components/ScoreRing";
import ScoreBar from "@/components/ScoreBar";

interface ResultCardsProps {
  result: NameCheckResult;
  name: string;
  onAlternativeClick: (name: string) => void;
}

export default function ResultCards({
  result,
  name,
  onAlternativeClick,
}: ResultCardsProps) {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  const domains = [
    `${cleanName}.com`,
    `${cleanName}.io`,
    `${cleanName}.co`,
    `get${cleanName}.com`,
    `try${cleanName}.com`,
  ];

  const socials = [
    { platform: "Twitter", handle: `@${cleanName}` },
    { platform: "Instagram", handle: `@${cleanName}` },
    { platform: "LinkedIn", handle: `/company/${cleanName}` },
  ];

  const cards = [
    // Card 1 — Brand Score
    <Card
      key="score"
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: "0ms", animationFillMode: "both" }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Brand Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <ScoreRing score={result.brandScore} />
          <div className="flex-1">
            <p className="text-sm text-foreground">{result.verdict}</p>
            <Badge className="mt-2">{result.category}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>,

    // Card 2 — Breakdown
    <Card
      key="breakdown"
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: "100ms", animationFillMode: "both" }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ScoreBar label="Memorability" value={result.scores.memorability} />
        <ScoreBar
          label="Pronounceability"
          value={result.scores.pronounceability}
        />
        <ScoreBar label="Uniqueness" value={result.scores.uniqueness} />
        <ScoreBar
          label="Domain-Friendly"
          value={result.scores.domainFriendly}
        />
      </CardContent>
    </Card>,

    // Card 3 — Domains
    <Card
      key="domains"
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: "200ms", animationFillMode: "both" }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Domains
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {domains.map((domain) => (
          <a
            key={domain}
            href={`https://www.godaddy.com/domainsearch/find?domainToCheck=${domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between hover:text-primary transition-colors"
          >
            <span className="text-sm text-foreground">
              {domain}
            </span>
            <Badge variant="outline" className="text-xs">
              Check →
            </Badge>
          </a>
        ))}
      </CardContent>
    </Card>,

    // Card 4 — Social Handles
    <Card
      key="social"
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: "300ms", animationFillMode: "both" }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Social Handles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {socials.map((s) => (
          <div key={s.platform} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              {s.platform}
            </span>
            <span className="text-sm text-foreground">{s.handle}</span>
          </div>
        ))}
        <Separator className="my-3" />
        <div className="rounded-md bg-secondary p-3">
          <p className="text-xs text-muted-foreground mb-1">
            Suggested Tagline
          </p>
          <p className="text-sm text-primary font-medium">
            &ldquo;{result.tagline}&rdquo;
          </p>
        </div>
      </CardContent>
    </Card>,

    // Card 5 — Analysis
    <Card
      key="analysis"
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: "400ms", animationFillMode: "both" }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-3">
          {result.strengths.map((s, i) => (
            <p key={i} className="text-sm text-[hsl(var(--success))]">
              ↑ {s}
            </p>
          ))}
        </div>
        <Separator />
        <div className="space-y-2 mt-3">
          {result.weaknesses.map((w, i) => (
            <p key={i} className="text-sm text-destructive">
              ↓ {w}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Card 6 — Alternatives
    <Card
      key="alternatives"
      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: "500ms", animationFillMode: "both" }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Alternatives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {result.alternatives.map((alt) => (
            <Badge
              key={alt}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onAlternativeClick(alt)}
            >
              {alt}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>,
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">{cards}</div>
  );
}
