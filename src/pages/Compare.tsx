import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, Percent } from "lucide-react";

/* ---------------- TYPES ---------------- */
interface LoanComparison {
  bank: string;
  interest_rate: number;
  emi: number;
  total_interest: number;
  processing_fee: number;
  total_cost: number;
}

interface StatProps {
  label: string;
  value: string;
  primary?: boolean;
}

/* ---------------- COMPONENT ---------------- */
const Compare = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [tenure, setTenure] = useState<number>(36);
  const [comparisons, setComparisons] = useState<LoanComparison[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /* ---------------- FETCH FROM BACKEND ---------------- */
  useEffect(() => {
    const fetchComparisons = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:8000/compare?amount=${loanAmount}&tenure=${tenure}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data: { comparisons?: LoanComparison[] } = await res.json();
        console.log("API response:", data);

        setComparisons(Array.isArray(data.comparisons) ? data.comparisons : []);
      } catch (err) {
        console.error("Failed to fetch comparisons:", err);
        setComparisons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
  }, [loanAmount, tenure]);

  /* ---------------- HELPERS ---------------- */
  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  /* ---------------- UI ---------------- */
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-gold mx-auto flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Compare & Calculate
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Compare loan options from multiple lenders based on EMI and total repayment cost.
            </p>
          </div>

          {/* Controls */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle>Loan Parameters</CardTitle>
              <CardDescription>
                Adjust values to see updated results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">

              {/* Loan Amount */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Loan Amount</Label>
                  <span className="text-xl font-semibold text-primary">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(v) => setLoanAmount(v[0])}
                  min={50000}
                  max={5000000}
                  step={50000}
                />
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Loan Tenure</Label>
                  <span className="text-xl font-semibold text-primary">
                    {tenure} months ({(tenure / 12).toFixed(1)} years)
                  </span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(v) => setTenure(v[0])}
                  min={12}
                  max={120}
                  step={6}
                />
              </div>

            </CardContent>
          </Card>

          {/* Comparison Section */}
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-semibold">
              Loan Comparison
            </h2>

            {loading && (
              <p className="text-center text-muted-foreground">
                Calculating best loan options...
              </p>
            )}

            {!loading && comparisons.length === 0 && (
              <p className="text-center text-muted-foreground">
                No loan options available for the selected parameters.
              </p>
            )}

            {!loading &&
              comparisons.map((option, index) => (
                <Card
                  key={option.bank}
                  variant={index === 0 ? "feature" : "default"}
                  className={index === 0 ? "border-primary/30 bg-accent/30" : ""}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">

                      <div className="md:w-48">
                        {index === 0 && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Best Value
                          </span>
                        )}
                        <h3 className="font-heading font-semibold text-lg mt-2">
                          {option.bank}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Percent className="w-4 h-4" />
                          <span className="text-sm">
                            {option.interest_rate}% p.a.
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Stat label="Monthly EMI" value={formatCurrency(option.emi)} primary />
                        <Stat label="Total Interest" value={formatCurrency(option.total_interest)} />
                        <Stat
                          label="Processing Fee"
                          value={
                            option.processing_fee > 0
                              ? formatCurrency(option.processing_fee)
                              : "Free"
                          }
                        />
                        <Stat label="Total Cost" value={formatCurrency(option.total_cost)} />
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <Card variant="glass" className="mt-8">
            <CardContent className="p-6 flex gap-4">
              <TrendingUp className="w-6 h-6 text-primary mt-1" />
              <p className="text-sm text-muted-foreground">
                EMI calculations are performed on the backend using standard
                reducing-balance formulas for accurate and transparent comparisons.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

/* ---------------- STAT COMPONENT ---------------- */
const Stat = ({ label, value, primary = false }: StatProps) => (
  <div className="text-center p-3 bg-muted/50 rounded-lg">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className={`font-semibold ${primary ? "text-primary text-lg" : ""}`}>
      {value}
    </p>
  </div>
);

export default Compare;
