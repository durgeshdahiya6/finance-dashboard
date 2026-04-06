import React from "react";

export default function RoleToggle({ role, setRole }) {
  return (
    <div>
      <label>Role: </label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Viewer</option>
        <option>Admin</option>
      </select>
      <p>Current Role: {role}</p>
    </div>
  );
}
