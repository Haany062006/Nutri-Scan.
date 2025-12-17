import React, { useState } from "react";

export default function Scanner({ onBack, onScanSuccess }) {
  const [manualBarcode, setManualBarcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      onScanSuccess(manualBarcode.trim());
    }
  };

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
          Scan Barcode
        </h2>
      </div>

      <div style={{ padding: "24px" }}>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "48px 24px",
            textAlign: "center",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>📷</div>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Camera scanning coming soon!
          </p>
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            For now, you can enter a barcode manually below
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter barcode (e.g., 8901725123456)"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              outline: "none",
              marginBottom: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(to right, #10b981, #3b82f6)",
              color: "white",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            Search Product
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            background: "#eff6ff",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <p
            style={{ margin: "0 0 8px 0", fontWeight: "600", color: "#1e40af" }}
          >
            Try these barcodes:
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px", color: "#3b82f6" }}>
            8901725123456 - Maggi Noodles
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px", color: "#3b82f6" }}>
            8901719104015 - Parle-G Biscuits
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px", color: "#3b82f6" }}>
            8901430500019 - Amul Milk
          </p>
        </div>
      </div>
    </div>
  );
}
