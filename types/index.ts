export interface NameCheckResult {
  brandScore: number;
  scores: {
    memorability: number;
    pronounceability: number;
    uniqueness: number;
    domainFriendly: number;
  };
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  alternatives: string[];
  tagline: string;
  category: string;
}

export interface DomainSuggestion {
  domain: string;
  available: boolean;
}
