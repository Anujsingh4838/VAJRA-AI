import { useState } from "react";
import "../../styles/ask-ai.css";

function AskAI({ result }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  if (!result) return null;

  const askAI = () => {
    if (!question.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const q = question.toLowerCase();

      let response = "";
      if (q.includes("why") || q.includes("reason")) {
        response =
          result.reasons?.join(" ") ||
          "No major fraud indicators were detected.";
      }

      else if (q.includes("score")) {
        response = `The fraud score is ${result.fraud_score}%. Higher scores indicate a higher probability of fraudulent behaviour.`;
      }

      else if (q.includes("approve")) {
        response = `VAJRA AI recommends: ${result.decision}.`;
      }

      else if (q.includes("confidence")) {
        response = `The prediction confidence is ${result.confidence}%, which indicates how certain the AI model is about this decision.`;
      }

      else if (
        q.includes("prevent") ||
        q.includes("safe") ||
        q.includes("security")
      ) {
        response =
          "Use trusted payment methods, avoid unknown beneficiaries, enable MFA, monitor unusual activity and verify high-value transactions.";
      }

      else if (q.includes("risk")) {
        response =
          result.decision === "Declined"
            ? "The transaction contains multiple high-risk indicators and should be blocked."
            : result.decision === "Manual Review"
            ? "The transaction is moderately risky and should be verified manually."
            : "The transaction appears safe based on current analysis.";
      }

      else {
        response = result.ai_summary;
      }

      setAnswer(response);
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <button
        className="ask-ai-btn"
        onClick={() => setOpen(true)}
      >
        🤖 Ask VAJRA AI
      </button>

      {open && (
        <div className="ai-overlay">

          <div className="ai-popup">

            <button
              className="close-btn"
              onClick={() => {
                setOpen(false);
                setQuestion("");
                setAnswer("");
              }}
            >
              ✕
            </button>

            <h2>VAJRA AI Assistant</h2>

            <p className="assistant-text">
              Ask anything about this transaction.
            </p>

            <input
              className="ai-input"
              placeholder="Example: Why was this payment declined?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <button
              className="send-ai-btn"
              onClick={askAI}
            >
              Ask AI
            </button>

            {loading && (
              <div className="ai-loading">
                🧠 VAJRA AI is thinking...
              </div>
            )}

            {!loading && answer && (
              <div className="ai-answer">
                <h3>🧠 VAJRA AI Assistant</h3>
                <p>{answer}</p>
                <p className="ai-footer">
                  Powered by VAJRA AI Engine • Random Forest + Behaviour Analysis
                </p>
                

              </div>
            )}

          </div>

        </div>
      )}
    </>
  );
}

export default AskAI;