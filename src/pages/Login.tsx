import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Phone, ArrowRight } from "lucide-react";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      setStep("otp");
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP verification
    console.log("Verify OTP:", otp);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">Yilakun</span>
            </div>

            <h1 className="text-2xl font-bold text-foreground text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              {step === "phone" 
                ? "Enter your phone number to continue" 
                : `Enter the code sent to ${phone}`
              }
            </p>

            {step === "phone" ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="09XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    We'll send you a verification code via SMS
                  </p>
                </div>

                <Button type="submit" variant="highlight" size="lg" className="w-full">
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Verification Code
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-12 text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>

                <Button type="submit" variant="highlight" size="lg" className="w-full">
                  Verify
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Change phone number
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive code?{" "}
                  <button type="button" className="text-primary hover:underline font-medium">
                    Resend
                  </button>
                </p>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                New to Yilakun?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Courier Link */}
          <div className="mt-6 text-center">
            <Link 
              to="/courier" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Are you a courier? <span className="text-primary font-medium">Login here →</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
