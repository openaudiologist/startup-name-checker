import { Card, CardContent } from "@/components/ui/card";

const affiliates = [
  {
    name: "GoDaddy",
    headline: "Register your domain",
    sub: ".com from ₹850/yr",
    href: "https://www.godaddy.com",
    ctaColor: "text-primary",
    cta: "Get Domain →",
  },
  {
    name: "Hostinger",
    headline: "Build your website",
    sub: "Launch fast with Hostinger",
    href: "https://www.hostinger.com",
    ctaColor: "text-green-500",
    cta: "Start Building →",
  },
  {
    name: "Razorpay Rize",
    headline: "Start your company",
    sub: "Register in India",
    href: "https://rize.razorpay.com",
    ctaColor: "text-blue-500",
    cta: "Incorporate →",
  },
];

export default function AffiliateCards() {
  return (
    <div className="mt-10">
      <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-3">
        Sponsored
      </p>
      <div className="flex flex-wrap gap-4">
        {affiliates.map((a) => (
          <a
            key={a.name}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[200px]"
          >
            <Card className="hover:border-muted-foreground/30 transition-colors h-full">
              <CardContent className="p-5">
                <p className="text-sm font-semibold mb-1">{a.name}</p>
                <p className="text-foreground text-sm font-medium">
                  {a.headline}
                </p>
                <p className="text-muted-foreground text-xs mt-1">{a.sub}</p>
                <p className={`${a.ctaColor} text-xs font-semibold mt-3`}>
                  {a.cta}
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
