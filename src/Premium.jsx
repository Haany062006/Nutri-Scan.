import React from "react";

export default function Premium({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <div
        style={{
          background: "white",
          padding: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
          Premium
        </h2>
      </div>

      <div style={{ padding: "24px" }}>
        <div
          style={{
            background: "linear-gradient(to right, #fbbf24, #f97316)",
            borderRadius: "16px",
            padding: "48px 24px",
            textAlign: "center",
            color: "white",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>👑</div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: "0 0 8px 0",
            }}
          >
            Go Premium
          </h1>
          <p style={{ fontSize: "16px", opacity: 0.9 }}>
            Unlock advanced nutrition tracking
          </p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Premium Features
          </h3>
          {[
            "🎯 Daily calorie goals",
            "📈 Advanced analytics",
            "🥗 Meal planning",
            "📱 Export your data",
            "🔔 Smart reminders",
            "🌟 Priority support",
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                padding: "12px 0",
                borderBottom: index < 5 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px" }}>{feature}</p>
            </div>
          ))}
        </div>

        <button
          style={{
            width: "100%",
            background: "linear-gradient(to right, #fbbf24, #f97316)",
            color: "white",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Upgrade Now - ₹99/month
        </button>
      </div>
    </div>
  );
}
