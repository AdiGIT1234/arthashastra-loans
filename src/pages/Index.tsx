import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  BarChart3, 
  Calculator, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck,
  TrendingUp,
  Wallet,
  GraduationCap,
  Home,
  Briefcase,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Check Eligibility",
    description: "Instantly know if you qualify for different loan types",
    link: "/eligibility",
    primary: true,
  },
  {
    icon: BarChart3,
    title: "Compare Loans",
    description: "Side-by-side comparison of loan options",
    link: "/compare",
  },
  {
    icon: Calculator,
    title: "EMI Calculator",
    description: "Calculate your monthly payments easily",
    link: "/compare",
  },
  {
    icon: Sparkles,
    title: "Recommendations",
    description: "Get personalized loan suggestions",
    link: "/eligibility",
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Transparent Logic",
    description: "No black-box decisions. We explain exactly why you're eligible or not.",
  },
  {
    icon: TrendingUp,
    title: "EMI Comparison",
    description: "Compare EMIs across different tenures to find what fits your budget.",
  },
  {
    icon: Wallet,
    title: "Affordability Focus",
    description: "Recommendations based on what you can comfortably repay.",
  },
];

const loanCategories = [
  { icon: Wallet, name: "Personal Loan", color: "text-primary" },
  { icon: GraduationCap, name: "Education Loan", color: "text-navy-500" },
  { icon: Home, name: "Home Loan", color: "text-gold-600" },
  { icon: Briefcase, name: "Business Loan", color: "text-navy-400" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Find the Right Loan for You —{" "}
            <span className="text-gradient-primary">Clearly & Confidently</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Transparent eligibility checks and EMI-based recommendations 
            to help you make informed borrowing decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/eligibility">
              <Button variant="hero" size="xl">
                Check Your Eligibility
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/loan-products">
              <Button variant="outline-primary" size="xl">
                Explore Loan Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.link}>
                <Card 
                  variant="feature" 
                  className={`h-full cursor-pointer ${feature.primary ? "border-primary bg-accent/50" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${feature.primary ? "bg-gradient-gold" : "bg-accent"}`}>
                      <feature.icon className={`w-6 h-6 ${feature.primary ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Categories */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-8">
            Loan Categories We Cover
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {loanCategories.map((category) => (
              <div 
                key={category.name}
                className="flex items-center gap-3 bg-card px-6 py-4 rounded-xl shadow-card border border-border hover:shadow-elevated transition-all duration-300"
              >
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <span className="font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-4">
            Why Choose Arthashastra?
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We believe in complete transparency. Every recommendation comes with a clear explanation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={highlight.title} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center mb-4">
                    <highlight.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto text-center max-w-2xl">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-secondary-foreground mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-secondary-foreground/70 mb-8">
            Answer a few simple questions and we'll guide you to the best loan options for your situation.
          </p>
          <Link to="/eligibility">
            <Button variant="hero" size="lg">
              Get Personalized Recommendations
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
