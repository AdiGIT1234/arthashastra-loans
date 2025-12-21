import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  Eye, 
  Shield, 
  Users,
  Lightbulb,
  Heart
} from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description: "We believe you deserve to understand every aspect of your loan eligibility. No hidden criteria, no black-box algorithms.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Your financial data is sensitive. We don't store personal information and our recommendations are unbiased.",
  },
  {
    icon: Lightbulb,
    title: "Simplicity",
    description: "Financial decisions shouldn't be complicated. We break down complex terms into easy-to-understand language.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We understand that borrowing is often a necessity. Our goal is to help you make the best possible decision for your situation.",
  },
];

const About = () => {
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Arthashastra
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Named after the ancient Indian treatise on economics, Arthashastra is built on the 
              principle that financial wisdom should be accessible to everyone.
            </p>
          </div>

          {/* Mission */}
          <Card variant="elevated" className="mb-12">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-gold mx-auto flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                To empower first-time borrowers and non-technical users with clear, honest, and 
                personalized loan guidance. We're not a lender — we're your guide to making 
                informed borrowing decisions with confidence.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-semibold text-center mb-8">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => (
                <Card key={value.title} variant="feature">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <Card variant="glass" className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">How Arthashastra Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center mb-4 font-heading font-bold text-xl">
                    1
                  </div>
                  <h4 className="font-heading font-semibold mb-2">Share Basic Info</h4>
                  <p className="text-sm text-muted-foreground">
                    Answer simple questions about your age, income, and employment type.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center mb-4 font-heading font-bold text-xl">
                    2
                  </div>
                  <h4 className="font-heading font-semibold mb-2">Get Clear Results</h4>
                  <p className="text-sm text-muted-foreground">
                    See which loans you qualify for with detailed explanations for each decision.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center mb-4 font-heading font-bold text-xl">
                    3
                  </div>
                  <h4 className="font-heading font-semibold mb-2">Compare & Choose</h4>
                  <p className="text-sm text-muted-foreground">
                    Use our tools to compare EMIs and find the most affordable option.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="font-heading text-xl font-semibold">Built with Care</h2>
            </div>
            <p className="text-muted-foreground">
              Arthashastra is developed by a team passionate about financial inclusion 
              and making banking products more accessible to everyone in India.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
