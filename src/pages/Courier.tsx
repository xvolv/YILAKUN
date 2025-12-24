import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  DollarSign, 
  Clock, 
  Smartphone, 
  Shield, 
  CheckCircle,
  Truck,
  MapPin,
  CreditCard
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Earnings",
    description: "Earn up to 5,000 ETB per week. Keep 80% of each delivery fee.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work when you want. No minimum hours. Be your own boss.",
  },
  {
    icon: Smartphone,
    title: "Easy-to-Use App",
    description: "Simple interface with GPS navigation and instant notifications.",
  },
  {
    icon: CreditCard,
    title: "Instant Payouts",
    description: "Get paid daily or weekly. Direct to CBE Birr or M-Birr.",
  },
];

const requirements = [
  "Valid Ethiopian ID (Kebele or Passport)",
  "Smartphone with internet connection",
  "Own vehicle (motorcycle, bicycle, or car)",
  "Clean background check",
  "Age 18 or older",
];

const steps = [
  { step: 1, title: "Apply Online", description: "Fill out the application form with your details." },
  { step: 2, title: "Verify Documents", description: "Upload your ID and vehicle documents." },
  { step: 3, title: "Complete Training", description: "Quick online training on using the app." },
  { step: 4, title: "Start Earning", description: "Accept deliveries and start making money." },
];

const Courier = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium mb-6">
                <Truck className="h-4 w-4" />
                Join 500+ active couriers
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Earn Money Delivering with Yilakun
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Join Ethiopia's fastest-growing delivery network. Flexible hours, competitive pay, and the freedom to be your own boss.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courier/apply">
                  <Button variant="highlight" size="xl" className="w-full sm:w-auto">
                    Apply Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/courier/login">
                  <Button 
                    variant="outline" 
                    size="xl" 
                    className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Courier Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-foreground/5 to-transparent pointer-events-none"></div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Courier with Yilakun?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join a platform built for your success.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="p-6 rounded-xl border border-border bg-card text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent mx-auto mb-4">
                    <benefit.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How to Join
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started in 4 simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="relative p-6 rounded-xl bg-card border border-border"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Requirements
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Make sure you meet these requirements before applying:
                </p>
                <ul className="space-y-4">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Earnings Estimate */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Earnings Estimate
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="text-muted-foreground">Per delivery (avg.)</span>
                    <span className="text-xl font-semibold text-foreground">80 ETB</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="text-muted-foreground">Deliveries per day</span>
                    <span className="text-xl font-semibold text-foreground">10-15</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span className="text-muted-foreground">Daily earnings</span>
                    <span className="text-xl font-semibold text-foreground">800-1,200 ETB</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10">
                    <span className="font-semibold text-foreground">Weekly potential</span>
                    <span className="text-2xl font-bold text-accent">5,000+ ETB</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  * Earnings vary based on location, hours worked, and delivery demand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of couriers already earning with Yilakun. Apply today and start delivering tomorrow.
            </p>
            <Link to="/courier/apply">
              <Button variant="highlight" size="xl">
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courier;
