import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "../../styles/fraud-charts.css";

function FraudCharts({ transactions }) {
  const trendData = [...transactions]
    .reverse()
    .slice(-10)
    .map((transaction, index) => ({
      name: `T${index + 1}`,
      score: Number(transaction.fraud_score),
    }));

  const approved = transactions.filter(
    (transaction) => transaction.decision === "Approved"
  ).length;

  const manualReview = transactions.filter(
    (transaction) => transaction.decision === "Manual Review"
  ).length;

  const declined = transactions.filter(
    (transaction) => transaction.decision === "Declined"
  ).length;

  const distributionData = [
    {
      name: "Approved",
      value: approved,
      color: "#22c55e",
    },
    {
      name: "Manual Review",
      value: manualReview,
      color: "#f59e0b",
    },
    {
      name: "Declined",
      value: declined,
      color: "#ef4444",
    },
  ].filter((item) => item.value > 0);

  return (
    <section className="fraud-charts">
      <div className="chart-card">
        <div className="chart-heading">
          <div>
            <p>RISK MOVEMENT</p>
            <h2>Fraud Score Trend</h2>
          </div>

          <span>Last 10 transactions</span>
        </div>

        <div className="chart-container">
          {trendData.length === 0 ? (
            <div className="chart-empty">
              Analyze transactions to generate chart data.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient
                    id="fraudScoreGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={0.45}
                    />

                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#263a58"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  stroke="#71819b"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  domain={[0, 100]}
                  stroke="#71819b"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#0d1c33",
                    border: "1px solid #29405f",
                    borderRadius: "12px",
                  }}
                  labelStyle={{
                    color: "#94a3b8",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#60a5fa"
                  strokeWidth={3}
                  fill="url(#fraudScoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-heading">
          <div>
            <p>DECISION BREAKDOWN</p>
            <h2>Decision Distribution</h2>
          </div>

          <span>{transactions.length} total</span>
        </div>

        <div className="chart-container pie-container">
          {distributionData.length === 0 ? (
            <div className="chart-empty">
              No decision data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {distributionData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#0d1c33",
                    border: "1px solid #29405f",
                    borderRadius: "12px",
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}

export default FraudCharts;