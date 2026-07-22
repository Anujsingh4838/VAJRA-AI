import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "./StatCard";

import "../../styles/live-statistics.css";

function LiveStatistics({ refreshKey }) {
  const [statistics, setStatistics] = useState({
    total_transactions: 0,
    declined_transactions: 0,
    approved_transactions: 0,
    average_fraud_score: 0,
  });

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const response = await api.get("/statistics");
        setStatistics(response.data);
      } catch (error) {
        console.error("Unable to load statistics:", error);
      }
    };

    loadStatistics();
  }, [refreshKey]);

  return (
    <section className="live-statistics">
      <div className="section-heading">
        <div>
          <p className="section-label">REAL-TIME OVERVIEW</p>
          <h2>Live Statistics</h2>
          <span>Transaction security performance</span>
        </div>

        <div className="live-status">
          <span></span>
          Live
        </div>
      </div>

      <div className="statistics-grid">
        <StatCard
          title="Total Transactions"
          value={statistics.total_transactions}
          icon="⚡"
          type="blue"
        />

        <StatCard
          title="Approved"
          value={statistics.approved_transactions}
          icon="✓"
          type="green"
        />

        <StatCard
          title="Declined"
          value={statistics.declined_transactions}
          icon="!"
          type="red"
        />

        <StatCard
          title="Average Fraud Score"
          value={`${statistics.average_fraud_score}%`}
          icon="◉"
          type="purple"
        />
      </div>
    </section>
  );
}

export default LiveStatistics;