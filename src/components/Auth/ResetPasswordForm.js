import React, { useState } from "react";

export default function ResetPasswordForm({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("humanos-users")) || [];
    const user = users.find((u) => u.email === email);
    if (user) {
      setMessage("נשלחה סיסמה חדשה לאימייל שלך (לא באמת 😅)");
      setError("");
    } else {
      setError("לא נמצא משתמש עם האימייל הזה");
      setMessage("");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>איפוס סיסמה</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="האימייל שלך"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>שלח לינק לאיפוס</button>
      </form>
      <p style={styles.link} onClick={switchToLogin}>⬅ חזרה להתחברות</p>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    textAlign: "center",
    direction: "rtl",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#5c6ac4",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
  },
  link: {
    color: "#5c6ac4",
    cursor: "pointer",
    marginTop: "0.75rem",
    fontSize: "0.9rem",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  success: {
    color: "green",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
};
