import { useState } from "react";
import { predictLoan, PredictionResult } from "@/services/loanService";
import PredictionResults from "@/components/PredictionResults";
import AIChatWidget from "@/components/AIChatWidget";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    no_of_dependents: "",
    income_annum: "",
    loan_amount: "",
    loan_term: "",
    cibil_score: "",
    residential_assets_value: "",
    commercial_assets_value: "",
    luxury_assets_value: "",
    bank_asset_value: "",
    education: "Graduate",
    self_employed: "Yes",
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const prediction = await predictLoan(formData);
      setResult(prediction);
    } catch {
      setError("Could not connect to the prediction server. Make sure your Flask backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: "no_of_dependents", label: "Dependents", icon: "👥" },
    { name: "income_annum", label: "Income (Annual)", icon: "💰" },
    { name: "loan_amount", label: "Loan Amount", icon: "🏦" },
    { name: "loan_term", label: "Loan Term (months)", icon: "📅" },
    { name: "cibil_score", label: "CIBIL Score", icon: "📊" },
    { name: "residential_assets_value", label: "Residential Assets", icon: "🏠" },
    { name: "commercial_assets_value", label: "Commercial Assets", icon: "🏢" },
    { name: "luxury_assets_value", label: "Luxury Assets", icon: "💎" },
    { name: "bank_asset_value", label: "Bank Assets", icon: "🏧" },
  ];

  return (
    <div className="min-h-screen gradient-bg grid-pattern relative overflow-hidden">
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 rounded-full bg-[hsl(var(--glow)/0.06)] blur-3xl float-animation pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 rounded-full bg-[hsl(210_80%_40%/0.05)] blur-3xl float-animation pointer-events-none" style={{ animationDelay: "3s" }} />


      {/* Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text text-foreground">
          Loan Eligibility <span className="text-primary">Predictor</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          AI-powered instant loan eligibility analysis. Fill in your details below for a smart prediction.
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className={`grid gap-8 ${result ? "md:grid-cols-2" : "max-w-2xl mx-auto"}`}>
          {/* Form */}
          <form onSubmit={handleSubmit} className="glass glow-border card-3d rounded-2xl p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <span>{field.icon}</span>
                    {field.label}
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm outline-none input-glow transition-all focus:border-primary"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span>🎓</span> Education
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm outline-none input-glow transition-all focus:border-primary appearance-none cursor-pointer"
                >
                  <option value="Graduate">Graduate</option>
                  <option value="Not Graduate">Not Graduate</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span>💼</span> Self Employed
                </label>
                <select
                  name="self_employed"
                  value={formData.self_employed}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm outline-none input-glow transition-all focus:border-primary appearance-none cursor-pointer"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl btn-glow text-accent-foreground font-semibold text-base tracking-wide uppercase flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Predicting...
                </>
              ) : (
                "🚀 Predict Eligibility"
              )}
            </button>
          </form>

          {/* Results */}
          {result && <PredictionResults result={result} />}
        </div>
      </div>

      {/* AI Chat */}
      <AIChatWidget />
    </div>
  );
};

export default Index;
