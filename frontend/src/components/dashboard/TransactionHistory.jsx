import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import "../../styles/transaction-history.css";

function TransactionHistory({ refreshKey }) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadTransactions();
  }, [refreshKey]);

  const loadTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.amount
          .toString()
          .includes(search) ||
        transaction.transaction_type
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.payment_method
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : transaction.decision === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  return (
    <section className="transaction-history">

      <div className="history-header">

        <div>

          <h2>Transaction History</h2>

          <p>
            {filteredTransactions.length} Records
          </p>

        </div>

        <div className="history-controls">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Approved</option>
            <option>Manual Review</option>
            <option>Declined</option>
          </select>
<button
  className="export-btn"
  onClick={() => exportCSV(filteredTransactions)}
>
  Export CSV
</button>
        </div>

      </div>

      <table>

        <thead>

          <tr>

            <th>Amount</th>

            <th>Type</th>

            <th>Method</th>

            <th>Score</th>

            <th>Decision</th>

            <th>Time</th>

          </tr>

        </thead>

        <tbody>

          {filteredTransactions.map((item) => (

            <tr key={item.id}>

              <td>₹{item.amount}</td>

              <td>{item.transaction_type}</td>

              <td>{item.payment_method}</td>

              <td>{item.fraud_score}%</td>

              <td>

                <span
                  className={`status ${item.decision
                    .replace(" ", "-")
                    .toLowerCase()}`}
                >
                  {item.decision}
                </span>

              </td>

              <td>{item.created_at}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>
  );
}

export default TransactionHistory;