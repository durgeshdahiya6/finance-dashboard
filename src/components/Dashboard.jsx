import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

const dataLine = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
];

const dataPie = [
  { name: "Food", value: 300 },
  { name: "Rent", value: 500 },
  { name: "Travel", value: 200 },
];

const COLORS = ["#aa3bff", "#6b6375", "#08060d"];

export default function Dashboard() {
  return (
    <div>
      <h2>Overview</h2>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card">Total Balance: ₹10,000</div>
        <div className="card">Income: ₹6,000</div>
        <div className="card">Expenses: ₹4,000</div>
      </div>

      {/* Charts in Responsive Grid */}
      <div className="dashboard-container">
        <div>
          <h3>Balance Trend</h3>
          <LineChart width={500} height={300} data={dataLine}>
            <CartesianGrid stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--text)" />
            <YAxis stroke="var(--text)" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="var(--accent)" />
          </LineChart>
        </div>

        <div>
          <h3>Spending Breakdown</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={dataPie}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
