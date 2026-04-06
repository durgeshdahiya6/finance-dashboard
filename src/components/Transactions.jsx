import React, { useState } from "react";

export default function Transactions({ role, transactions, setTransactions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    category: "",
    type: "Expense",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Filtered transactions based on search term
  const filteredTransactions = transactions.filter((t) =>
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.date.includes(searchTerm)
  );

  // Add transaction
  const addTransaction = () => {
    if (!newTransaction.date || !newTransaction.amount || !newTransaction.category) {
      alert("Please fill all fields!");
      return;
    }
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({ date: "", amount: "", category: "", type: "Expense" });
  };

  // Save edit
  const saveEdit = (index) => {
    const updated = [...transactions];
    updated[index] = newTransaction;
    setTransactions(updated);
    setEditIndex(null);
    setNewTransaction({ date: "", amount: "", category: "", type: "Expense" });
  };

  // Delete transaction
  const deleteTransaction = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  return (
    <div>
      <h2>Transactions</h2>

      {/* Search bar */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by date, category, or type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm(searchTerm)}>Search</button>
        <button onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      {/* Transactions Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Amount</th><th>Category</th><th>Type</th>
            {role === "Admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              {role === "Admin" && (
                <td>
                  <button onClick={() => {
                    setEditIndex(i);
                    setNewTransaction(t);
                  }}>Edit</button>
                  <button onClick={() => deleteTransaction(i)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Admin-only Add/Edit Form */}
      {role === "Admin" && (
        <div style={{ marginTop: "20px" }}>
          <h3>{editIndex !== null ? "Edit Transaction" : "Add Transaction"}</h3>
          <input
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
          />
          <select
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          >
            <option>Expense</option>
            <option>Income</option>
          </select>
          {editIndex !== null ? (
            <button onClick={() => saveEdit(editIndex)}>Save</button>
          ) : (
            <button onClick={addTransaction}>Add</button>
          )}
        </div>
      )}
    </div>
  );
}
