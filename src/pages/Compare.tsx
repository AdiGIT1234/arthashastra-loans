import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator,
  IndianRupee,
  TrendingUp,
  Clock,
  Percent
} from "lucide-react";

const loanOptions = [
  { bank: "National Bank", rate: 10.5, processingFee: 1 },
  { bank: "Trust Finance", rate: 11.0, processingFee: 0.5 },
  { bank: "People's Bank", rate: 11.5, processingFee: 0 },
  { bank: "Urban Credit", rate: 12.0, processingFee: 0.75 },
];

const Compare = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(36); // months

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const comparisons = useMemo(() => {
    return loanOptions.map(option => {
      const emi = calculateEMI(loanAmount, option.rate, tenure);
      const totalPayment = emi * tenure;
      const totalInterest = totalPayment - loanAmount;
      const processingFeeAmount = (loanAmount * option.processingFee) / 100;
      
      return {
        ...option,
        emi,
        totalPayment,
        totalInterest,
        processingFeeAmount,
        totalCost: totalPayment + processingFeeAmount,
      };
    }).sort((a, b) => a.totalCost - b.totalCost);
  }, [loanAmount, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-gold mx-auto flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Compare & Calculate
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Use our EMI calculator to compare loan options from different lenders 
              and find the most affordable choice.
            </p>
          </div>

          {/* Calculator Controls */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle>Loan Parameters</CardTitle>
              <CardDescription>Adjust the values to see how EMI changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Loan Amount */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Loan Amount</Label>
                  <span className="text-xl font-heading font-semibold text-primary">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  min={50000}
                  max={5000000}
                  step={50000}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹50K</span>
                  <span>₹50 Lakhs</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Loan Tenure</Label>
                  <span className="text-xl font-heading font-semibold text-primary">
                    {tenure} months ({(tenure / 12).toFixed(1)} years)
                  </span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={12}
                  max={120}
                  step={6}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 year</span>
                  <span>10 years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold">Loan Comparison</h2>
            
            {comparisons.map((option, index) => (
              <Card 
                key={option.bank} 
                variant={index === 0 ? "feature" : "default"}
                className={index === 0 ? "border-primary/30 bg-accent/30" : ""}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Bank Info */}
                    <div className="md:w-48">
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Best Value
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-semibold text-lg">{option.bank}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Percent className="w-4 h-4" />
                        <span className="text-sm">{option.rate}% p.a.</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
                        <p className="font-heading font-semibold text-lg text-primary">
                          {formatCurrency(option.emi)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                        <p className="font-heading font-semibold">
                          {formatCurrency(option.totalInterest)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Processing Fee</p>
                        <p className="font-heading font-semibold">
                          {option.processingFee > 0 ? formatCurrency(option.processingFeeAmount) : "Free"}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
                        <p className="font-heading font-semibold">
                          {formatCurrency(option.totalCost)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Card */}
          <Card variant="glass" className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading font-semibold mb-2">How is EMI Calculated?</h4>
                  <p className="text-sm text-muted-foreground">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is the principal loan amount, 
                    R is the monthly interest rate, and N is the number of monthly instalments. 
                    A lower interest rate or longer tenure reduces your EMI but may increase total interest paid.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
