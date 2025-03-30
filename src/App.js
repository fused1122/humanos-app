import React, { useState, useEffect } from "react";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";
import HumanosFlow from "./components/MainApp/HumanosFlow";

function App() {
  const [authStep, setAuthStep] = useState("login"); // login, signup, reset, app
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("humanos-current-user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setAuthStep("app");
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("humanos-current-user", JSON.stringify(user));
    setCurrentUser(user);
    setAuthStep("app");
  };

  const handleLogout = () => {
    localStorage.removeItem("humanos-current-user");
    setCurrentUser(null);
    setAuthStep("login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f8", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {authStep === "login" && (
        <LoginForm
          onLogin={handleLogin}
          switchToSignup={() => setAuthStep("signup")}
          switchToReset={() => setAuthStep("reset")}
        />
      )}
      {authStep === "signup" && (
        <SignupForm
          onSignup={handleLogin}
          switchToLogin={() => setAuthStep("login")}
        />
      )}
      {authStep === "reset" && (
        <ResetPasswordForm
          switchToLogin={() => setAuthStep("login")}
        />
      )}
      {authStep === "app" && (
        <HumanosFlow user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
