import React from "react";

export default function Insights({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <p>No insights available (no transactions)</p>;
  }

  // 1. Highest Spending Category (only expenses)
  const expenses = transactions.filter(t => t.type === "Expense");
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const highestCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  // 2. Monthly Comparison (Income vs Expense totals)
  const monthlyTotals = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (t.type === "Income") acc[month].income += t.amount;
    else acc[month].expense += t.amount;
    return acc;
  }, {});

  const months = Object.keys(monthlyTotals);
  const comparisonText = months.map(m => 
    `${m}: Income ₹${monthlyTotals[m].income}, Expense ₹${monthlyTotals[m].expense}`
  ).join(" | ");

  // 3. Simple Observation
  const observation = expenses.length > 0
    ? `Expenses peaked in ${highestCategory}`
    : "No expenses recorded";

  return (
    <div>
      <h2>Insights</h2>
      <p>Highest Spending Category: {highestCategory}</p>
      <p>Monthly Comparison: {comparisonText}</p>
      <p>Observation: {observation}</p>
    </div>
  );
}
