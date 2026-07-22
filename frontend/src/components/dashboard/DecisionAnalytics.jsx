import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/decision-analytics.css";

function DecisionAnalytics({ refreshKey }) {
  const [statistics, setStatistics] = useState({
    total_transactions: 0,
    approved_transactions: 0,
    manual_review_transactions: 0,
    declined_transactions: 0,
  });

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const response = await api.get("/statistics");
        setStatistics(response.data);
      } catch (error) {
        console.error("Unable to load analytics:", error);
      }
    };

    loadStatistics();
  }, [refreshKey]);

  const total = statistics.total_transactions;

  const getPercentage = (value) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const approvedPercentage = getPercentage(
    statistics.approved_transactions
  );

  const reviewPercentage = getPercentage(
    statistics.manual_review_transactions
  );

  const declinedPercentage = getPercentage(
    statistics.declined_transactions
  );

  return (
    <section className="decision-analytics">
      <div className="analytics-heading">
        <div>
          <p>PAYMENT INSIGHTS</p>
          <h2>Decision Analytics</h2>
        </div>

        <span>{total} Transactions Analysed</span>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card approved-card">
          <div className="analytics-card__heading">
            <div>
              <h3>Approved Payments</h3>
              <p>
                {statistics.approved_transactions} of {total} payments
              </p>
            </div>

            <strong>{approvedPercentage}%</strong>
          </div>

          <div className="analytics-progress">
            <span style={{ width: `${approvedPercentage}%` }}></span>
          </div>
        </div>

        <div className="analytics-card review-card">
          <div className="analytics-card__heading">
            <div>
              <h3>Manual Review</h3>
              <p>
                {statistics.manual_review_transactions} of {total} payments
              </p>
            </div>

            <strong>{reviewPercentage}%</strong>
          </div>

          <div className="analytics-progress">
            <span style={{ width: `${reviewPercentage}%` }}></span>
          </div>
        </div>

        <div className="analytics-card declined-card">
          <div className="analytics-card__heading">
            <div>
              <h3>Declined Payments</h3>
              <p>
                {statistics.declined_transactions} of {total} payments
              </p>
            </div>

            <strong>{declinedPercentage}%</strong>
          </div>

          <div className="analytics-progress">
            <span style={{ width: `${declinedPercentage}%` }}></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DecisionAnalytics;