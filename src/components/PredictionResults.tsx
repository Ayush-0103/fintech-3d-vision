import { PredictionResult } from "@/services/loanService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CheckCircle, XCircle, TrendingUp, Brain } from "lucide-react";

interface Props {
  result: PredictionResult;
}

const PredictionResults = ({ result }: Props) => {
  const isApproved = result.prediction_text === "Loan Approved";

  const chartData = result.chart_labels.map((label, i) => ({
    name: label.replace(/_/g, " "),
    value: parseFloat((result.chart_values[i] * 100).toFixed(1)),
  }));

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Status Card */}
      <div
        className={`glass glow-border rounded-2xl p-6 text-center border ${
          isApproved ? "border-[hsl(145_60%_40%/0.4)]" : "border-destructive/40"
        }`}
      >
        <div className="flex justify-center mb-3">
          {isApproved ? (
            <CheckCircle className="w-14 h-14 text-[hsl(145_60%_50%)]" />
          ) : (
            <XCircle className="w-14 h-14 text-destructive" />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-1">{result.prediction_text}</h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Confidence: <strong className="text-foreground">{result.confidence}%</strong></span>
        </div>
      </div>

      {/* Explanation */}
      <div className="glass glow-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-sm">AI Explanation</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation_text}</p>
      </div>

      {/* Feature Importance Chart */}
      {chartData.length > 0 && (
        <div className="glass glow-border rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4">Top Feature Importance (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: "hsl(210 40% 96%)", fontSize: 11 }} width={120} />
              <Tooltip
                contentStyle={{
                  background: "hsl(220 20% 12%)",
                  border: "1px solid hsl(220 15% 22%)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${185 - i * 15} 70% ${50 + i * 5}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PredictionResults;
