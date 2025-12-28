import React, { useState } from "react";

export default function PaymentModal({ onClose, onSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    if (cardNumber.length < 16) {
      alert("Enter valid 16-digit card number");
      return;
    }

    setProcessing(true);

    // Simulate payment processing (2 seconds)
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>💳 Payment</h2>
        <p style={{ color: "#6b7280", margin: "0 0 24px 0" }}>
          Test Payment (Dummy)
        </p>

        {/* Card Number */}
        <input
          type="text"
          placeholder="Card Number (e.g., 4111111111111111)"
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
          }
          style={{
            width: "100%",
            padding: "12px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "16px",
            boxSizing: "border-box",
          }}
        />

        {/* CVV & Expiry */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input
            type="text"
            placeholder="MM/YY"
            maxLength="5"
            style={{
              flex: 1,
              padding: "12px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />
          <input
            type="text"
            placeholder="CVV"
            maxLength="3"
            style={{
              flex: 1,
              padding: "12px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Amount */}
        <div
          style={{
            background: "#f3f4f6",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          <p
            style={{ margin: "0 0 4px 0", color: "#6b7280", fontSize: "14px" }}
          >
            Amount
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            ₹99
          </p>
        </div>

        {/* Buttons */}
        <button
          onClick={handlePayment}
          disabled={processing}
          style={{
            width: "100%",
            background: processing ? "#9ca3af" : "#10b981",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: processing ? "not-allowed" : "pointer",
            marginBottom: "12px",
          }}
        >
          {processing ? "Processing..." : "Pay ₹99"}
        </button>

        <button
          onClick={onClose}
          disabled={processing}
          style={{
            width: "100%",
            background: "white",
            color: "#6b7280",
            border: "2px solid #e5e7eb",
            padding: "14px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: processing ? "not-allowed" : "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
