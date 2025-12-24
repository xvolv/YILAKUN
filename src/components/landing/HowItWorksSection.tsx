import { ClipboardList, UserCheck, Truck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Request Delivery",
    description: "Enter pickup and delivery addresses, select your item type, and choose delivery speed.",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Courier Matched",
    description: "A verified courier near you accepts the request and heads to pick up your package.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Track & Receive",
    description: "Track in real-time. Get notified when delivered. Confirm with photo proof.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to send a package anywhere in Ethiopia.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[16.67%] right-[16.67%] h-0.5 bg-border -translate-y-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-accent/50 to-highlight/50"></div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step Number & Icon */}
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background border-2 border-primary shadow-card">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-highlight text-highlight-foreground text-sm font-bold">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
