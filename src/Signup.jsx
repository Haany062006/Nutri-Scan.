import React, { useState } from "react";
import { signup } from "./api";

export default function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await signup(name, email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        onSignupSuccess(data.name);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #4ade80, #3b82f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🥗</div>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 8px 0",
            }}
          >
            Create Account
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>Join NutriScan Today</p>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              border: "1px solid #ef4444",
              color: "#991b1b",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "2px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "12px",
            boxSizing: "border-box",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#10b981")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "2px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "12px",
            boxSizing: "border-box",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#10b981")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "2px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "12px",
            boxSizing: "border-box",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#10b981")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSignup()}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "2px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "16px",
            boxSizing: "border-box",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#10b981")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "600",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            background: loading ? "#d1d5db" : "#10b981",
            color: "white",
            transition: "all 0.2s",
            marginBottom: "16px",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.background = "#059669";
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.background = "#10b981";
          }}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#6b7280",
            margin: 0,
          }}
        >
          Already have an account?{" "}
          <span
            onClick={onSwitchToLogin}
            style={{ color: "#10b981", cursor: "pointer", fontWeight: "600" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
