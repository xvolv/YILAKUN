import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Package } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Send Package CTA */}
          <div className="rounded-2xl bg-background/10 backdrop-blur-sm p-8 md:p-10 border border-primary-foreground/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-highlight mb-6">
              <Package className="h-7 w-7 text-highlight-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Need to Send a Package?</h3>
            <p className="text-primary-foreground/80 mb-8">
              Get your package delivered anywhere in Ethiopia. Fast, secure, and affordable.
            </p>
            <Link to="/send">
              <Button variant="highlight" size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Become Courier CTA */}
          <div className="rounded-2xl bg-background/10 backdrop-blur-sm p-8 md:p-10 border border-primary-foreground/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent mb-6">
              <Truck className="h-7 w-7 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Want to Earn as a Courier?</h3>
            <p className="text-primary-foreground/80 mb-8">
              Join our network of verified couriers. Flexible hours, competitive pay, and instant payouts.
            </p>
            <Link to="/courier">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-primary-foreground/30 text-primary hover:bg-primary-foreground hover:text-primary  "
              >
                Join as Courier
                <ArrowRight className="h-5 w-5 text-lg transform hover:scale-110 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10,000+", label: "Deliveries Completed" },
            { value: "500+", label: "Active Couriers" },
            { value: "4.9★", label: "Customer Rating" },
            { value: "45 min", label: "Avg. Delivery Time" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-highlight">{stat.value}</p>
              <p className="mt-2 text-sm text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
