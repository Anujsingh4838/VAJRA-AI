import { useState } from "react";
import api from "../../services/api";
import "../../styles/payment-form.css";

function PaymentForm({ onResult }) {
  const [formData, setFormData] = useState({
    amount: "",
    transaction_type: "Online Purchase",
    payment_method: "UPI",
    account_age: "",
    failed_transactions: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const payload = {
        amount: Number(formData.amount),
        transaction_type: formData.transaction_type,
        payment_method: formData.payment_method,
        account_age: Number(formData.account_age),
        failed_transactions: Number(formData.failed_transactions),
      };

      console.log("Sending Request:", payload);

      const response = await api.post("/predict", payload);

      console.log("Prediction Response:", response.data);

      onResult(response.data, formData);

    } catch (error) {

      console.error("Prediction Error:", error);

      if (error.response) {

        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(
          `Backend Error (${error.response.status})\n${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );

      } else if (error.request) {

        console.log("No response received:", error.request);

        alert("Unable to connect to VAJRA API.");

      } else {

        console.log(error.message);

        alert(error.message);

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="payment-form-card">

      <h2>Transaction Analysis</h2>

      <p>
        Enter transaction details to analyze fraud risk using VAJRA AI.
      </p>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Transaction Amount</label>

          <input
            type="number"
            name="amount"
            placeholder="Enter transaction amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Transaction Type</label>

          <select
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
          >
            <option>Online Purchase</option>
            <option>Money Transfer</option>
            <option>Bill Payment</option>
            <option>Subscription</option>
            <option>ATM Withdrawal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Payment Method</label>

          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
          >
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Net Banking</option>
            <option>Wallet</option>
          </select>
        </div>

        <div className="form-group">
          <label>Account Age (Days)</label>

          <input
            type="number"
            name="account_age"
            placeholder="Enter account age"
            value={formData.account_age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Failed Transactions</label>

          <input
            type="number"
            name="failed_transactions"
            placeholder="Enter failed transactions"
            value={formData.failed_transactions}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="analyze-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Payment"}
        </button>

      </form>

    </div>
  );
}

export default PaymentForm;