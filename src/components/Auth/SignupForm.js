import React, { useState } from "react";

export default function SignupForm({ onSignup, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("הסיסמאות אינן תואמות");
    }
    const users = JSON.parse(localStorage.getItem("humanos-users")) || [];
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return setError("משתמש עם האימייל הזה כבר קיים");
    }
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("humanos-users", JSON.stringify(users));
    onSignup(newUser);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>הרשמה ל-HUMANOS</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
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
        <input
          type="password"
          placeholder="אישור סיסמה"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>צור חשבון</button>
      </form>
      <p style={styles.link} onClick={switchToLogin}>כבר יש לך חשבון? התחבר</p>
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
