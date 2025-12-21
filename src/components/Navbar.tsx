import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "mr", name: "मराठी" },
];

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/loan-products", label: "Loan Products" },
  { path: "/eligibility", label: "Eligibility Check" },
  { path: "/compare", label: "Compare Loans" },
  { path: "/about", label: "About" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Arthashastra" className="w-10 h-10" />
            <span className="font-heading text-xl font-semibold text-foreground hidden sm:block">
              Arthashastra
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant="nav"
                  className={location.pathname === link.path ? "text-primary bg-accent" : ""}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLangOpen(!langOpen)}
                className="gap-1"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{selectedLang.name}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-elevated py-1 animate-scale-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/login" className="hidden sm:block">
              <Button variant="outline-gold" size="sm">
                Login
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant="nav"
                    className={`w-full justify-start ${location.pathname === link.path ? "text-primary bg-accent" : ""}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline-gold" className="w-full mt-2">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
