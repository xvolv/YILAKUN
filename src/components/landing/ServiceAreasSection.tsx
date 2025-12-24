import { MapPin, CheckCircle, Clock } from "lucide-react";

const cities = [
  { name: "Addis Ababa", status: "active", coverage: "Full coverage" },
  { name: "Adama (Nazret)", status: "active", coverage: "Full coverage" },
  { name: "Dire Dawa", status: "active", coverage: "City center" },
  { name: "Bahir Dar", status: "coming", coverage: "Coming Q1 2025" },
  { name: "Hawassa", status: "coming", coverage: "Coming Q1 2025" },
  { name: "Mekelle", status: "coming", coverage: "Coming Q2 2025" },
];

const ServiceAreasSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Cities We Serve
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Starting in Addis Ababa and expanding nationwide. We're building Ethiopia's first truly nationwide delivery network.
            </p>

            <div className="mt-8 space-y-4">
              {cities.map((city, index) => (
                <div
                  key={city.name}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      city.status === "active" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {city.status === "active" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{city.name}</p>
                      <p className="text-sm text-muted-foreground">{city.coverage}</p>
                    </div>
                  </div>
                  {city.status === "active" && (
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      Live
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map Visualization */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:max-w-none rounded-2xl bg-muted/50 border border-border overflow-hidden">
              {/* Ethiopia Map Outline - Simplified SVG */}
              <svg viewBox="0 0 400 400" className="w-full h-full p-8">
                {/* Simplified Ethiopia shape */}
                <path
                  d="M100 100 L200 60 L300 100 L340 180 L320 280 L260 340 L160 340 L80 280 L60 180 Z"
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                />
                
                {/* Active Cities */}
                <g>
                  {/* Addis Ababa */}
                  <circle cx="180" cy="200" r="12" fill="hsl(var(--accent))" className="animate-pulse-gentle" />
                  <text x="180" y="225" textAnchor="middle" className="text-xs fill-current" style={{ fill: 'hsl(var(--foreground))' }}>Addis Ababa</text>
                  
                  {/* Adama */}
                  <circle cx="220" cy="220" r="8" fill="hsl(var(--accent))" />
                  <text x="220" y="240" textAnchor="middle" className="text-[10px]" style={{ fill: 'hsl(var(--muted-foreground))' }}>Adama</text>
                  
                  {/* Dire Dawa */}
                  <circle cx="290" cy="180" r="8" fill="hsl(var(--accent))" />
                  <text x="290" y="200" textAnchor="middle" className="text-[10px]" style={{ fill: 'hsl(var(--muted-foreground))' }}>Dire Dawa</text>
                  
                  {/* Coming Soon Cities */}
                  <circle cx="150" cy="120" r="6" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                  <text x="150" y="140" textAnchor="middle" className="text-[10px]" style={{ fill: 'hsl(var(--muted-foreground))' }}>Bahir Dar</text>
                  
                  <circle cx="200" cy="300" r="6" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                  <text x="200" y="320" textAnchor="middle" className="text-[10px]" style={{ fill: 'hsl(var(--muted-foreground))' }}>Hawassa</text>
                  
                  <circle cx="180" cy="90" r="6" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                  <text x="180" y="110" textAnchor="middle" className="text-[10px]" style={{ fill: 'hsl(var(--muted-foreground))' }}>Mekelle</text>
                </g>
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-accent"></span>
                    <span className="text-muted-foreground">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-muted-foreground opacity-50"></span>
                    <span className="text-muted-foreground">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
