import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Inline Tailwind only – no design tokens or UI components
import { Menu, X, Package, MapPin } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/track", label: "Track" },
    { href: "/pricing", label: "Pricing" },
    { href: "/courier", label: "Become a Courier" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white ">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="h-full w-32 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Yilakun Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive(link.href)
                  ? "text-blue-700 bg-slate-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/track"
            className="inline-flex items-center gap-2 h-9 rounded-md border border-slate-300 px-3 text-sm text-slate-700 hover:bg-slate-100"
          >
            <MapPin className="h-4 w-4" />
            Track Package
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center h-9 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden hover:bg-slate-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-md ${
                  isActive(link.href)
                    ? "text-blue-700 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 px-4">
              <Link
                to="/track"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-2 h-10 w-full justify-center rounded-md border border-slate-300 px-3 text-sm text-slate-700 hover:bg-slate-100"
              >
                <MapPin className="h-4 w-4" />
                Track Package
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center h-10 w-full justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
