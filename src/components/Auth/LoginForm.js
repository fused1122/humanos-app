import React, { useState } from "react";

export default function LoginForm({ onLogin, switchToSignup, switchToReset }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("humanos-users")) || [];
    const user = storedUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
    } else {
      setError("אימייל או סיסמה שגויים");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>התחברות ל-HUMANOS</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>התחבר</button>
      </form>
      <p style={styles.link} onClick={switchToReset}>שכחתי סיסמה</p>
      <p style={styles.link} onClick={switchToSignup}>אין לך חשבון? להרשמה</p>
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
};
