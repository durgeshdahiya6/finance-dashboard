import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import RoleToggle from "./components/RoleToggle";
import DarkModeToggle from "./components/DarkModeToggle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default function App() {
  // Role state
  const [role, setRole] = useState("Admin"); // default Admin

  // Transactions state (shared with Insights + Transactions)
  const [transactions, setTransactions] = useState([
    { date: "2026-04-01", amount: 200, category: "Food", type: "Expense" },
    { date: "2026-04-02", amount: 500, category: "Salary", type: "Income" },
    { date: "2026-04-03", amount: 300, category: "Travel", type: "Expense" },
    { date: "2026-04-04", amount: 1000, category: "Freelance", type: "Income" },
  ]);

  // Toast notification when role changes
  useEffect(() => {
    toast.info(`Role changed to ${role}`, { position: "top-right" });
  }, [role]);

  return (
    <div id="root">
      <h1>Finance Dashboard</h1>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Role Toggle */}
      <RoleToggle role={role} setRole={setRole} />

      {/* Dashboard Overview */}
      <Dashboard />

      {/* Transactions Section */}
      <Transactions
        role={role}
        transactions={transactions}
        setTransactions={setTransactions}
      />

      {/* Insights Section */}
      <Insights transactions={transactions} />

      {/* Role-specific message */}
      {role === "Admin" ? (
        <p style={{ color: "green" }}>Admin privileges: You can add/edit transactions.</p>
      ) : (
        <p style={{ color: "gray" }}>Viewer mode: Transactions are read-only.</p>
      )}

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
}
