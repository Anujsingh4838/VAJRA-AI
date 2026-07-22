import "../../styles/transaction-modal.css";

function TransactionModal({ transaction, onClose }) {
  if (!transaction) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="transaction-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p>TRANSACTION DETAILS</p>
            <h2>VAJRA AI Report</h2>
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-grid">

          <div className="modal-card">
            <span>Amount</span>
            <strong>
              ₹{Number(transaction.amount).toLocaleString()}
            </strong>
          </div>

          <div className="modal-card">
            <span>Transaction Type</span>
            <strong>{transaction.transaction_type}</strong>
          </div>

          <div className="modal-card">
            <span>Fraud Score</span>
            <strong>{transaction.fraud_score}%</strong>
          </div>

          <div className="modal-card">
            <span>Decision</span>
            <strong>{transaction.decision}</strong>
          </div>

          <div className="modal-card">
            <span>Random Forest</span>
            <strong>
              {transaction.random_forest_score || "--"}%
            </strong>
          </div>

          <div className="modal-card">
            <span>Neural Network</span>
            <strong>
              {transaction.neural_network_score || "--"}%
            </strong>
          </div>

        </div>

        <div className="modal-section">

          <h3>AI Reasons</h3>

          <ul>
            {(transaction.reasons || []).map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>

        </div>

        <div className="modal-section">

          <h3>Recommended Action</h3>

          <p>
            {transaction.recommended_action ||
              "No recommendation available."}
          </p>

        </div>
      </div>
    </div>
  );
}

export default TransactionModal;