import "../../styles/payment-decision.css";
import generateReport from "../../utils/generateReport";
import AskAI from "./AskAI";
function PaymentDecision({ result, loading }) {

  if (loading) {
    return (
      <section className="payment-decision-card">

        <h2>VAJRA AI Engine</h2>

        <div className="loading-box">

          <div className="scanner"></div>

          <h3>Initializing VAJRA AI...</h3>

          <div className="loading-steps">
            <p>⚡ Scanning Transaction...</p>
            <p>🧠 Running Random Forest...</p>
            <p>🤖 Running Neural Network...</p>
            <p>📊 Calculating Fraud Score...</p>
            <p>🛡 Generating Final Decision...</p>
          </div>

        </div>

      </section>
    );
  }

  if (!result) {
    return (
      <section className="payment-decision-card">

        <h2>Payment Decision</h2>

        <div className="empty-state">

          <h3>No Analysis Yet</h3>

          <p>
            Enter transaction details and click
            <strong> Analyze Payment </strong>
            to generate an AI fraud prediction.
          </p>

        </div>

      </section>
    );
  }

  const score = Number(result.fraud_score);

  const riskLevel =
    score >= 70
      ? "High Risk"
      : score >= 40
      ? "Medium Risk"
      : "Low Risk";

  const circleColor =
    score >= 70
      ? "#ef4444"
      : score >= 40
      ? "#f59e0b"
      : "#22c55e";

  return (
    <section className="payment-decision-card">

      <h2>Payment Decision</h2>

      <div
        className="score-circle"
        style={{
          background: `conic-gradient(${circleColor} ${score * 3.6}deg,#223453 0deg)`
        }}
      >
        <div className="score-inner">
          <h1>{score.toFixed(1)}</h1>
          <p>Fraud Score</p>
        </div>
      </div>

      <h2 className="risk-title">{riskLevel}</h2>

      <p className="risk-description">
        {score >= 70
          ? "Suspicious activity detected. Decline is recommended."
          : score >= 40
          ? "Potential fraud detected. Manual review is recommended."
          : "Transaction appears safe."}
      </p>

      <div className="model-grid">

        <div className="model-card">
          <p>Random Forest</p>
          <h3>{result.random_forest_score ?? "--"}%</h3>
        </div>

        <div className="model-card">
          <p>Neural Network</p>
          <h3>{result.neural_network_score ?? "--"}%</h3>
        </div>

        <div className="model-card">
          <p>Confidence</p>
          <h3>{result.confidence}%</h3>
        </div>

        <div className="model-card">
          <p>Decision</p>
          <h3>{result.decision}</h3>
        </div>

      </div>

      {result.reasons && result.reasons.length > 0 && (
        <div className="ai-explanation">

          <h3>AI Risk Explanation</h3>

          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>✓ {reason}</li>
            ))}
          </ul>

        </div>
      )}

      {result.recommended_action && (
        <div className="recommended-action">

          <h3>Recommended Action</h3>

          <p>{result.recommended_action}</p>

        </div>
      )}
{/* AI Summary */}

<div className="ai-summary">

  <h3>🧠 VAJRA AI Summary</h3>

  <p>{result.ai_summary}</p>

</div>
{<AskAI result={result} /> }
      <button
        className="download-report-btn"
        onClick={() => generateReport(result)}
      >
        📄 Download Fraud Report
      </button>

    </section>
  );
}

export default PaymentDecision;