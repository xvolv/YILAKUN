import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Clock, Zap, Calendar, CheckCircle } from "lucide-react";

const deliveryOptions = [
  { id: "ondemand", label: "On-Demand", icon: Zap, time: "30-60 min", multiplier: 1.5 },
  { id: "1hour", label: "1-Hour", icon: Clock, time: "Within 1 hour", multiplier: 1.3 },
  { id: "sameday", label: "Same-Day", icon: Package, time: "Same day", multiplier: 1.0 },
  { id: "scheduled", label: "Scheduled", icon: Calendar, time: "Pick a time", multiplier: 0.9 },
];

const itemTypes = [
  { id: "documents", label: "Documents", basePrice: 50 },
  { id: "food", label: "Food & Groceries", basePrice: 60 },
  { id: "electronics", label: "Electronics", basePrice: 80 },
  { id: "clothing", label: "Clothing & Apparel", basePrice: 55 },
  { id: "parcel", label: "General Parcel", basePrice: 70 },
];

const weightRanges = [
  { id: "0-1", label: "Up to 1 kg", multiplier: 1.0 },
  { id: "1-5", label: "1 - 5 kg", multiplier: 1.2 },
  { id: "5-10", label: "5 - 10 kg", multiplier: 1.4 },
  { id: "10-20", label: "10 - 20 kg", multiplier: 1.6 },
];

const Pricing = () => {
  const [itemType, setItemType] = useState("documents");
  const [weight, setWeight] = useState("0-1");
  const [speed, setSpeed] = useState("sameday");

  const calculatePrice = () => {
    const item = itemTypes.find((i) => i.id === itemType);
    const weightRange = weightRanges.find((w) => w.id === weight);
    const speedOption = deliveryOptions.find((s) => s.id === speed);

    if (!item || !weightRange || !speedOption) return 0;

    return Math.round(item.basePrice * weightRange.multiplier * speedOption.multiplier);
  };

  const price = calculatePrice();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-muted/20">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your delivery cost instantly. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Price Calculator</h2>
              
              <div className="space-y-6">
                {/* Item Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What are you sending?
                  </label>
                  <Select value={itemType} onValueChange={setItemType}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemTypes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Package Weight
                  </label>
                  <Select value={weight} onValueChange={setWeight}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent>
                      {weightRanges.map((w) => (
                        <SelectItem key={w.id} value={w.id}>
                          {w.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Delivery Speed */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Delivery Speed
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {deliveryOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSpeed(option.id)}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                          speed === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <option.icon className={`h-5 w-5 ${
                          speed === option.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <div>
                          <p className="font-medium text-foreground text-sm">{option.label}</p>
                          <p className="text-xs text-muted-foreground">{option.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div className="mt-8 p-6 rounded-xl bg-primary text-primary-foreground">
                <p className="text-sm opacity-80 mb-1">Estimated Price</p>
                <p className="text-4xl font-bold">
                  {price} <span className="text-xl font-normal">ETB</span>
                </p>
                <p className="text-sm opacity-80 mt-2">
                  * Final price may vary based on exact distance
                </p>
              </div>

              <Button variant="highlight" size="lg" className="w-full mt-6">
                Send a Package
              </Button>
            </div>

            {/* What's Included */}
            <div>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">What's Included</h2>
                <ul className="space-y-4">
                  {[
                    "Real-time GPS tracking",
                    "SMS notifications",
                    "Photo proof of delivery",
                    "Verified courier",
                    "Customer support",
                    "Basic insurance coverage",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Payment Methods</h2>
                <p className="text-muted-foreground mb-4">
                  Pay with your preferred method:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["CBE Birr", "M-Birr", "Chapa", "Cash on Delivery"].map((method) => (
                    <div
                      key={method}
                      className="p-4 rounded-lg bg-muted/50 text-center text-sm font-medium text-foreground"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
