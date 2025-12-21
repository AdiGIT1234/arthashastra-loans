import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Arthashastra" className="w-10 h-10 object-cover object-center rounded-full" />
              <span className="font-heading text-xl font-semibold">Arthashastra</span>
            </div>
            <p className="text-secondary-foreground/70 text-sm max-w-md">
              Your trusted companion for smart loan decisions. We help you understand your eligibility and find the best loan options with complete transparency.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>
                <Link to="/loan-products" className="hover:text-primary transition-colors">
                  Loan Products
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="hover:text-primary transition-colors">
                  Eligibility Check
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-primary transition-colors">
                  Compare Loans
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8">
          <p className="text-center text-sm text-secondary-foreground/60">
            <strong>Disclaimer:</strong> Eligibility results are indicative and based on simulated rules. Actual loan approvals depend on lender policies.
          </p>
          <p className="text-center text-sm text-secondary-foreground/40 mt-2">
            © {new Date().getFullYear()} Arthashastra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
