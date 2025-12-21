import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  IndianRupee,
  Wallet,
  Home,
  FileCheck
} from "lucide-react";

type EligibilityResult = {
  eligible: boolean;
  loans: {
    type: string;
    eligible: boolean;
    reason: string;
    maxAmount?: string;
  }[];
  suggestions: string[];
};

const Eligibility = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    employment: "",
    existingLoans: "",
  });
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEligibility = () => {
    setIsCalculating(true);
    
    // Simulate calculation
    setTimeout(() => {
      const age = parseInt(formData.age);
      const income = parseInt(formData.income);
      const isStudent = formData.employment === "student";
      const hasLoans = formData.existingLoans === "yes";

      const loans = [
        {
          type: "Personal Loan",
          eligible: age >= 21 && age <= 58 && income >= 15000 && !isStudent,
          reason: isStudent 
            ? "Students are not eligible for personal loans. Consider education loans instead."
            : age < 21 
            ? "Minimum age requirement is 21 years."
            : income < 15000 
            ? "Minimum monthly income of ₹15,000 required."
            : "You meet all eligibility criteria!",
          maxAmount: income >= 50000 ? "₹10 Lakhs" : income >= 30000 ? "₹5 Lakhs" : "₹2 Lakhs",
        },
        {
          type: "Education Loan",
          eligible: age >= 18 && age <= 35,
          reason: age < 18 
            ? "Minimum age requirement is 18 years."
            : age > 35 
            ? "Maximum age for education loans is 35 years."
            : "You meet all eligibility criteria!",
          maxAmount: "₹50 Lakhs",
        },
        {
          type: "Home Loan",
          eligible: age >= 23 && age <= 60 && income >= 25000 && !isStudent,
          reason: isStudent 
            ? "Stable employment required for home loans."
            : age < 23 
            ? "Minimum age requirement is 23 years."
            : income < 25000 
            ? "Minimum monthly income of ₹25,000 required."
            : "You meet all eligibility criteria!",
          maxAmount: income >= 100000 ? "₹1 Crore" : income >= 50000 ? "₹50 Lakhs" : "₹25 Lakhs",
        },
        {
          type: "Business Loan",
          eligible: age >= 21 && age <= 65 && formData.employment === "self-employed",
          reason: formData.employment !== "self-employed" 
            ? "Business loans are primarily for self-employed individuals."
            : age < 21 
            ? "Minimum age requirement is 21 years."
            : "You meet all eligibility criteria!",
          maxAmount: income >= 100000 ? "₹50 Lakhs" : "₹10 Lakhs",
        },
      ];

      const eligibleLoans = loans.filter(l => l.eligible);
      
      const suggestions = [];
      if (hasLoans) {
        suggestions.push("Consider consolidating existing loans to improve your credit profile.");
      }
      if (income < 30000) {
        suggestions.push("A higher income can unlock better loan amounts and interest rates.");
      }
      if (isStudent) {
        suggestions.push("Education loans are your best option. Consider applying with a co-applicant for higher amounts.");
      }

      setResult({
        eligible: eligibleLoans.length > 0,
        loans,
        suggestions,
      });
      setIsCalculating(false);
    }, 1500);
  };

  const employmentOptions = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "salaried", label: "Salaried", icon: Briefcase },
    { value: "self-employed", label: "Self-Employed", icon: User },
  ];

  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-gold mx-auto flex items-center justify-center mb-4">
              <FileCheck className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Check Your Eligibility
            </h1>
            <p className="text-muted-foreground">
              Answer a few simple questions to see which loans you qualify for.
            </p>
          </div>

          {!result ? (
            <Card variant="elevated" className="animate-fade-in">
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>
                  We'll use this to calculate your eligibility across different loan types.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age (in years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    min="18"
                    max="80"
                  />
                </div>

                {/* Monthly Income */}
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter your monthly income"
                    value={formData.income}
                    onChange={(e) => handleInputChange("income", e.target.value)}
                    min="0"
                  />
                </div>

                {/* Employment Type */}
                <div className="space-y-3">
                  <Label>Employment Type</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {employmentOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange("employment", option.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          formData.employment === option.value
                            ? "border-primary bg-accent"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <option.icon className={`w-6 h-6 ${formData.employment === option.value ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Existing Loans */}
                <div className="space-y-3">
                  <Label>Do you have any existing loans?</Label>
                  <RadioGroup
                    value={formData.existingLoans}
                    onValueChange={(value) => handleInputChange("existingLoans", value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no-loans" />
                      <Label htmlFor="no-loans" className="font-normal cursor-pointer">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes-loans" />
                      <Label htmlFor="yes-loans" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={calculateEligibility}
                  disabled={!formData.age || !formData.income || !formData.employment || !formData.existingLoans || isCalculating}
                >
                  {isCalculating ? (
                    "Analyzing..."
                  ) : (
                    <>
                      Check Eligibility
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Result Summary */}
              <Card variant={result.eligible ? "elevated" : "default"} className={result.eligible ? "border-primary/30" : ""}>
                <CardHeader className="text-center">
                  {result.eligible ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center mb-2">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl text-primary">Good News!</CardTitle>
                      <CardDescription>You're eligible for one or more loan types.</CardDescription>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-destructive/10 mx-auto flex items-center justify-center mb-2">
                        <AlertCircle className="w-8 h-8 text-destructive" />
                      </div>
                      <CardTitle className="text-2xl">Limited Eligibility</CardTitle>
                      <CardDescription>Based on your profile, you may not qualify for most loans.</CardDescription>
                    </>
                  )}
                </CardHeader>
              </Card>

              {/* Loan-wise Results */}
              <div className="space-y-3">
                {result.loans.map((loan) => (
                  <Card key={loan.type} variant="default" className={loan.eligible ? "border-primary/20" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          loan.eligible ? "bg-accent" : "bg-muted"
                        }`}>
                          {loan.eligible ? (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          ) : (
                            <XCircle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-heading font-semibold">{loan.type}</h3>
                            {loan.eligible && loan.maxAmount && (
                              <span className="text-sm text-primary font-medium">
                                Up to {loan.maxAmount}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{loan.reason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <Card variant="glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline-primary" className="flex-1" onClick={() => setResult(null)}>
                  Check Again
                </Button>
                <Button variant="hero" className="flex-1" asChild>
                  <a href="/compare">Compare Loan Options</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Eligibility;
