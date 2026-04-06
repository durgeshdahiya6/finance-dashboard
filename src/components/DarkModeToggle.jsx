import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [theme, setTheme] = useState("dark"); // default dark

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div style={{ margin: "10px 0" }}>
      <label>Theme: </label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
