import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (name.trim().length > 40) {
      return NextResponse.json(
        { error: "Name must be 40 characters or less" },
        { status: 400 }
      );
    }

    const sanitizedName = name.trim();

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 800,
      system:
        "You are a startup naming expert. Return ONLY a raw JSON object. No markdown, no backticks, no explanation. Start your response with { and end with }.",
      messages: [
        {
          role: "user",
          content: `Analyze the startup name: "${sanitizedName}". Return this exact JSON:
{
  "brandScore": number (0-100),
  "scores": {
    "memorability": number (0-100),
    "pronounceability": number (0-100),
    "uniqueness": number (0-100),
    "domainFriendly": number (0-100)
  },
  "verdict": string (one honest sentence),
  "strengths": string[] (exactly 2 items),
  "weaknesses": string[] (exactly 2 items),
  "alternatives": string[] (exactly 5 creative alternative names),
  "tagline": string (short, punchy tagline suggestion),
  "category": string (best industry fit, e.g. "SaaS", "Fintech", "Health", "AI")
}`,
        },
      ],
    });

    const raw =
      message.content[0].type === "text" ? message.content[0].text : "";

    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");

    if (start === -1 || end === -1) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const json = raw.slice(start, end + 1);
    const result = JSON.parse(json);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze name. Please try again." },
      { status: 500 }
    );
  }
}
