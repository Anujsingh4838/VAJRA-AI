import { saveAs } from "file-saver";

function exportCSV(transactions) {
  if (!transactions || transactions.length === 0) {
    alert("No transactions available.");
    return;
  }

  const headers = [
    "Amount",
    "Transaction Type",
    "Payment Method",
    "Fraud Score",
    "Confidence",
    "Decision",
    "Date & Time",
  ];

  const rows = transactions.map((t) => [
    t.amount,
    t.transaction_type,
    t.payment_method,
    t.fraud_score,
    t.confidence,
    t.decision,
    t.created_at,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "VAJRA_Transactions.csv");
}

export default exportCSV;