import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Package, 
  CheckCircle, 
  Truck, 
  MapPin, 
  Clock,
  Phone,
  Share2,
  User
} from "lucide-react";

// Mock tracking data
const mockDelivery = {
  trackingNumber: "YLK-123456",
  status: "in_transit",
  sender: { name: "Abebe T.", city: "Bole, Addis Ababa" },
  receiver: { name: "Kebede M.", city: "Piassa, Addis Ababa" },
  courier: { name: "Tadesse G.", phone: "+251 91X XXX XXX", rating: 4.8, photo: null },
  eta: "15 minutes",
  itemType: "Documents",
  timeline: [
    { status: "ordered", label: "Order Placed", time: "10:30 AM", completed: true },
    { status: "picked", label: "Picked Up", time: "10:45 AM", completed: true },
    { status: "transit", label: "In Transit", time: "11:00 AM", completed: true, current: true },
    { status: "delivered", label: "Delivered", time: "--:--", completed: false },
  ],
};

const Track = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(id || "");
  const [delivery, setDelivery] = useState(id ? mockDelivery : null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/track/${searchValue.trim()}`);
      setDelivery(mockDelivery); // In real app, fetch from API
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Track Package ${delivery?.trackingNumber}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-4xl">
          {/* Search Form */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">Track Your Package</h1>
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter tracking number (e.g., YLK-123456)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" variant="highlight" size="lg">
                Track
              </Button>
            </form>
          </div>

          {/* Tracking Result */}
          {delivery ? (
            <div className="space-y-6 animate-fade-in">
              {/* Header Card */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="text-xl font-bold text-foreground">{delivery.trackingNumber}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                      <Truck className="h-4 w-4" />
                      In Transit
                    </span>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* ETA */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <Clock className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                    <p className="text-lg font-semibold text-foreground">{delivery.eta}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-accent mx-auto mb-2" />
                      <p className="text-muted-foreground">Live Map View</p>
                      <p className="text-sm text-muted-foreground">Google Maps integration required</p>
                    </div>
                  </div>
                  
                  {/* Courier info overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-card/95 backdrop-blur-sm rounded-lg border border-border p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{delivery.courier.name}</p>
                          <p className="text-sm text-muted-foreground">⭐ {delivery.courier.rating} rating</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Delivery Timeline</h2>
                <div className="space-y-0">
                  {delivery.timeline.map((step, index) => (
                    <div key={step.status} className="flex gap-4">
                      {/* Icon */}
                      <div className="flex flex-col items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                          step.completed 
                            ? step.current 
                              ? "border-accent bg-accent text-accent-foreground" 
                              : "border-accent bg-accent/10 text-accent"
                            : "border-border bg-muted text-muted-foreground"
                        }`}>
                          {step.completed ? (
                            step.current ? (
                              <Truck className="h-5 w-5" />
                            ) : (
                              <CheckCircle className="h-5 w-5" />
                            )
                          ) : (
                            <Package className="h-5 w-5" />
                          )}
                        </div>
                        {index < delivery.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            step.completed ? "bg-accent" : "bg-border"
                          }`}></div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${
                            step.current ? "text-foreground" : step.completed ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {step.label}
                          </p>
                          <p className="text-sm text-muted-foreground">{step.time}</p>
                        </div>
                        {step.current && (
                          <p className="text-sm text-accent mt-1">Courier is on the way</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">From</h3>
                  <p className="font-semibold text-foreground">{delivery.sender.name}</p>
                  <p className="text-muted-foreground">{delivery.sender.city}</p>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">To</h3>
                  <p className="font-semibold text-foreground">{delivery.receiver.name}</p>
                  <p className="text-muted-foreground">{delivery.receiver.city}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Enter a Tracking Number</h2>
              <p className="text-muted-foreground">
                Enter your tracking number above to see the delivery status.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Track;
