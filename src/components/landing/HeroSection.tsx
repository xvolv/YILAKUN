import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-8 md:py-8 lg:py-8">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Now serving Addis Ababa & beyond
            </div>

            <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Delivery Made <span className="text-primary">Simple</span> Across
              Ethiopia
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Send packages anywhere in Ethiopia with real-time tracking,
              verified couriers, and secure payments. From documents to parcels
              we deliver.
            </p>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span>Same-day delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Real-time tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <span>Verified couriers</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/send">
                <Button
                  variant="highlight"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  Send a Package
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/courier">
                <Button
                  variant="outline-primary"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  Become a Courier
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div
            className="relative lg:pl-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
              {/* Decorative Elements */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border"></div>

              {/* Map Placeholder */}
              <div className="absolute inset-4 rounded-2xl bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMGEyOCAyOCAwIDEgMCAtNTYgMCIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>

                {/* Courier Pin */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center shadow-lg animate-pulse-gentle">
                      <MapPin className="h-6 w-6 text-accent-foreground" />
        
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-accent rotate-45"></div>
                  </div>
                </div>

                {/* Destination Pin */}
                <div className="absolute bottom-1/4 right-1/4">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <MapPin className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-primary rotate-45"></div>

      
                  </div>
                </div>

                {/* Route Line */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                >
                  <path
                    d="M200 120 Q 280 200 280 280"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    fill="none"
                    className="opacity-60"
                  />
                </svg>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Avg. Delivery Time
                    </p>
                    <p className="text-2xl font-bold text-accent">45 min</p>
                  </div>
                </div>
              </div>

              {/* Floating Rating Card */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-highlight fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    4.9
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  10,000+ deliveries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
