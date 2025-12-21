import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, 
  GraduationCap, 
  Home, 
  Briefcase, 
  ArrowRight,
  Percent,
  Clock,
  IndianRupee
} from "lucide-react";

const loanProducts = [
  {
    icon: Wallet,
    title: "Personal Loan",
    description: "For your immediate needs - medical expenses, travel, or any personal requirement",
    interestRate: "10.5% - 18%",
    tenure: "1 - 5 years",
    amount: "₹50,000 - ₹25 Lakhs",
    features: ["Quick disbursal", "Minimal documentation", "No collateral required"],
  },
  {
    icon: GraduationCap,
    title: "Education Loan",
    description: "Invest in your future with affordable education financing",
    interestRate: "8.5% - 12%",
    tenure: "5 - 15 years",
    amount: "₹1 Lakh - ₹1 Crore",
    features: ["Moratorium period", "Tax benefits", "Covers tuition & living expenses"],
  },
  {
    icon: Home,
    title: "Home Loan",
    description: "Make your dream home a reality with competitive rates",
    interestRate: "8.5% - 10%",
    tenure: "10 - 30 years",
    amount: "₹5 Lakhs - ₹5 Crores",
    features: ["Low interest rates", "Long tenure", "Tax benefits on principal & interest"],
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    description: "Fuel your business growth with flexible financing options",
    interestRate: "12% - 24%",
    tenure: "1 - 7 years",
    amount: "₹1 Lakh - ₹50 Lakhs",
    features: ["Fast approval", "Flexible repayment", "Working capital support"],
  },
];

const LoanProducts = () => {
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loan Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our range of loan products designed to meet your diverse financial needs. 
              Each comes with transparent terms and competitive rates.
            </p>
          </div>

          {/* Loan Cards */}
          <div className="grid gap-6">
            {loanProducts.map((loan, index) => (
              <Card 
                key={loan.title} 
                variant="elevated" 
                className="overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Icon Section */}
                  <div className="md:w-48 bg-accent/50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-border">
                    <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center">
                      <loan.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{loan.title}</CardTitle>
                        <CardDescription className="text-base">{loan.description}</CardDescription>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {loan.features.map((feature) => (
                            <span 
                              key={feature}
                              className="text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap lg:flex-col gap-4 lg:gap-2 lg:text-right lg:min-w-48">
                        <div className="flex items-center gap-2 lg:justify-end">
                          <Percent className="w-4 h-4 text-primary" />
                          <span className="text-sm">
                            <span className="text-muted-foreground">Interest: </span>
                            <span className="font-medium">{loan.interestRate}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 lg:justify-end">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-sm">
                            <span className="text-muted-foreground">Tenure: </span>
                            <span className="font-medium">{loan.tenure}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 lg:justify-end">
                          <IndianRupee className="w-4 h-4 text-primary" />
                          <span className="text-sm">
                            <span className="text-muted-foreground">Amount: </span>
                            <span className="font-medium">{loan.amount}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-3">
                      <Link to="/eligibility">
                        <Button variant="hero" size="sm">
                          Check Eligibility
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link to="/compare">
                        <Button variant="outline-primary" size="sm">
                          Compare Options
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoanProducts;
