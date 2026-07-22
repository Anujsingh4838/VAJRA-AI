import { useState } from "react";
import toast from "react-hot-toast";

import LiveStatistics from "../../components/dashboard/LiveStatistics";
import DecisionAnalytics from "../../components/dashboard/DecisionAnalytics";
import FraudCharts from "../../components/dashboard/FraudCharts";
import TransactionHistory from "../../components/dashboard/TransactionHistory";
import PaymentDecision from "../../components/dashboard/PaymentDecision";
import PaymentForm from "../../components/forms/PaymentForm";
import CyberHelpline from "../../components/dashboard/CyberHelpline";

import "../../styles/dashboard.css";

function Dashboard() {
  const [result, setResult] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleResult = (data, formData) => {
    setLoading(true);

    setTimeout(() => {
      setResult(data);

      if (data.decision === "Approved") {
        toast.success("✅ Payment Approved");
      }

      if (data.decision === "Manual Review") {
        toast("⚠️ Manual Review Required");
      }

      if (data.decision === "Declined") {
        toast.error("🚫 Fraud Detected - Payment Blocked");
      }

      setTransactions((previous) => [
        {
          id: Date.now(),

          amount: formData.amount,
          transaction_type: formData.transaction_type,
          payment_method: formData.payment_method,

          fraud_score: data.fraud_score,
          confidence: data.confidence,
          decision: data.decision,

          random_forest_score: data.random_forest_score,
          neural_network_score: data.neural_network_score,

          reasons: data.reasons,
          recommended_action: data.recommended_action,

          created_at: new Date().toLocaleString(),
        },
        ...previous,
      ]);

      setRefreshKey((value) => value + 1);

      setLoading(false);
    }, 2500);
  };

  return (
    <div className="dashboard">

      {/* HERO */}

      <div className="vajra-hero">

        <div>

          <h1>⚡ VAJRA AI</h1>

          <p>
            On its way to secure every digital transaction.
          </p>

        </div>

        <div className="hero-buttons">

          <button
            className="hero-btn"
            onClick={() => {
              const askAI = document.querySelector(".ask-ai-btn");

              if (askAI) {
                askAI.click();
              } else {
                toast.error("Ask AI panel not available.");
              }
            }}
          >
            🤖 Ask VAJRA AI
          </button>

          <CyberHelpline />

          <button
            className="hero-btn helpline-btn"
            onClick={() =>
              alert(
                "National Cyber Crime Helpline\n\n📞 1930\n\nAvailable 24×7 Across India\n\nWebsite:\nhttps://cybercrime.gov.in"
              )
            }
          >
            📞 Cyber Helpline : 1930
          </button>

        </div>

      </div>

      {/* LIVE STATS */}

      <LiveStatistics refreshKey={refreshKey} />

      {/* ANALYTICS */}

      <DecisionAnalytics />

      {/* FORM + RESULT */}

      <div className="dashboard-grid">

        <PaymentForm
          onResult={handleResult}
        />

        <PaymentDecision
          result={result}
          loading={loading}
        />

      </div>

      {/* CHARTS */}

      <FraudCharts
        transactions={transactions}
      />

      {/* HISTORY */}

      <TransactionHistory
        refreshKey={refreshKey}
      />

    </div>
  );
}

export default Dashboard;