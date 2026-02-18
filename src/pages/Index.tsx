import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    dependents: "",
    income: "",
    loanAmount: "",
    loanTerm: "",
    cibilScore: "",
    residentialAssets: "",
    commercialAssets: "",
    luxuryAssets: "",
    bankAssets: "",
    education: "Graduate",
    selfEmployed: "Yes",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Prediction submitted! (Connect your ML backend to get results)");
  };

  const fields = [
    { name: "dependents", label: "Dependents", type: "number", icon: "👥" },
    { name: "income", label: "Income", type: "number", icon: "💰" },
    { name: "loanAmount", label: "Loan Amount", type: "number", icon: "🏦" },
    { name: "loanTerm", label: "Loan Term (months)", type: "number", icon: "📅" },
    { name: "cibilScore", label: "CIBIL Score", type: "number", icon: "📊" },
    { name: "residentialAssets", label: "Residential Assets", type: "number", icon: "🏠" },
    { name: "commercialAssets", label: "Commercial Assets", type: "number", icon: "🏢" },
    { name: "luxuryAssets", label: "Luxury Assets", type: "number", icon: "💎" },
    { name: "bankAssets", label: "Bank Assets", type: "number", icon: "🏧" },
  ];

  return (
    <div className="min-h-screen gradient-bg grid-pattern relative overflow-hidden">
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 rounded-full bg-[hsl(var(--glow)/0.06)] blur-3xl float-animation pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 rounded-full bg-[hsl(210_80%_40%/0.05)] blur-3xl float-animation pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Navbar */}
      <nav className="relative z-10 glass glow-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg btn-glow flex items-center justify-center text-lg font-bold text-accent-foreground">
              AI
            </div>
            <span className="text-xl font-bold tracking-tight">
              AI Loan Approval System
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Home</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text text-foreground">
          Loan Eligibility <span className="text-primary">Predictor</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          AI-powered instant loan eligibility analysis. Fill in your details below for a smart prediction.
        </p>
      </div>

      {/* Form Card */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-20">
        <form onSubmit={handleSubmit} className="glass glow-border card-3d rounded-2xl p-8 space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span>{field.icon}</span>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm outline-none input-glow transition-all focus:border-primary"
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
                name="selfEmployed"
                value={formData.selfEmployed}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm outline-none input-glow transition-all focus:border-primary appearance-none cursor-pointer"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl btn-glow text-accent-foreground font-semibold text-base tracking-wide uppercase"
          >
            🚀 Predict Eligibility
          </button>
        </form>
      </div>

      {/* AI Chat FAB */}
      <button className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-glow flex items-center justify-center text-accent-foreground font-bold text-sm shadow-lg">
        AI
      </button>
    </div>
  );
};

export default Index;
