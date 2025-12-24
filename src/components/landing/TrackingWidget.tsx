import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const TrackingWidget = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber.trim()}`);
    }
  };

  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Track Your Package
          </h2>
          <p className="text-muted-foreground mb-6">
            Enter your tracking number to see real-time delivery status.
          </p>
          
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter tracking number (e.g., YLK-123456)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button type="submit" variant="highlight" size="lg">
              Track
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TrackingWidget;
