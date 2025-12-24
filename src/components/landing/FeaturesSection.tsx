import { Package, MapPin, Shield, Clock, Smartphone, CreditCard } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "On-demand, 1-hour, same-day, or scheduled delivery options to fit your needs.",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description: "Track your package live on the map. Know exactly where your delivery is.",
  },
  {
    icon: Shield,
    title: "Verified Couriers",
    description: "All couriers are verified with ID and background checks for your safety.",
  },
  {
    icon: Smartphone,
    title: "SMS Updates",
    description: "No smartphone? Get delivery updates via SMS. Works on any phone.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Pay with CBE Birr, M-Birr, Chapa, or cash on delivery. Your choice.",
  },
  {
    icon: Package,
    title: "Any Package Size",
    description: "Documents, food, electronics, or parcels up to 20kg. We deliver it all.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Yilakun?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built for Ethiopia's unique delivery challenges. Fast, reliable, and accessible to everyone.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
