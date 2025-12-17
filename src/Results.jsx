import React from "react";

export default function Results({ product, onBack, onAddToRecords }) {
  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#f9fafb",
          padding: "24px",
        }}
      >
        <p style={{ color: "#6b7280" }}>No product selected</p>
        <button
          onClick={onBack}
          style={{
            marginTop: "16px",
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Calculate macro percentages
  const proteinCals = (product.protein || 0) * 4;
  const carbsCals = (product.carbs || 0) * 4;
  const fatCals = (product.fat || 0) * 9;
  const totalCals = proteinCals + carbsCals + fatCals || 1;

  const macros = {
    protein: Math.round((proteinCals / totalCals) * 100),
    carbs: Math.round((carbsCals / totalCals) * 100),
    fat: Math.round((fatCals / totalCals) * 100),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        paddingBottom: "80px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
            Nutrition Details
          </h2>
        </div>
      </div>

      <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
        {/* Product Info Card */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>
            {product.category === "packaged" ? "📦" : "🍽️"}
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 0 8px 0",
              color: "#1f2937",
            }}
          >
            {product.name}
          </h1>
          {product.brand && (
            <p style={{ color: "#6b7280", margin: "0 0 8px 0" }}>
              {product.brand}
            </p>
          )}
          <p
            style={{
              color: "#10b981",
              fontWeight: "600",
              margin: 0,
            }}
          >
            Serving: {product.serving || "100g"}
          </p>
        </div>

        {/* Allergen Warning (if allergens exist) */}
        {product.allergens && product.allergens.length > 0 && (
          <div
            style={{
              background: "#fef2f2",
              border: "3px solid #ef4444",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 4px 6px rgba(239,68,68,0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
              <span style={{ fontSize: "32px" }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    color: "#991b1b",
                    fontWeight: "bold",
                    fontSize: "18px",
                    margin: "0 0 8px 0",
                  }}
                >
                  ALLERGEN WARNING!
                </h3>
                <p
                  style={{
                    color: "#991b1b",
                    margin: "0 0 8px 0",
                    fontWeight: "600",
                  }}
                >
                  This product contains:
                </p>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "20px",
                    color: "#dc2626",
                  }}
                >
                  {product.allergens.map((allergen, i) => (
                    <li
                      key={i}
                      style={{ marginBottom: "4px", fontWeight: "600" }}
                    >
                      {allergen.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Calories Highlight */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontSize: "14px", opacity: 0.9 }}>
            TOTAL CALORIES
          </p>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {product.calories}
          </h2>
          <p style={{ margin: "8px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
            kcal per serving
          </p>
        </div>

        {/* Macro Breakdown with Bar Charts */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              margin: "0 0 20px 0",
              color: "#1f2937",
            }}
          >
            📊 Macro Breakdown
          </h3>

          {/* Protein Bar */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontWeight: "600", color: "#1f2937" }}>
                Protein
              </span>
              <span style={{ fontWeight: "600", color: "#3b82f6" }}>
                {macros.protein}%
              </span>
            </div>
            <div
              style={{
                background: "#dbeafe",
                borderRadius: "9999px",
                height: "24px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#3b82f6",
                  height: "100%",
                  width: `${macros.protein}%`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  transition: "width 0.5s ease",
                }}
              >
                {product.protein}g
              </div>
            </div>
          </div>

          {/* Carbs Bar */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontWeight: "600", color: "#1f2937" }}>
                Carbohydrates
              </span>
              <span style={{ fontWeight: "600", color: "#eab308" }}>
                {macros.carbs}%
              </span>
            </div>
            <div
              style={{
                background: "#fef3c7",
                borderRadius: "9999px",
                height: "24px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#eab308",
                  height: "100%",
                  width: `${macros.carbs}%`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  transition: "width 0.5s ease",
                }}
              >
                {product.carbs}g
              </div>
            </div>
          </div>

          {/* Fat Bar */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontWeight: "600", color: "#1f2937" }}>Fat</span>
              <span style={{ fontWeight: "600", color: "#ef4444" }}>
                {macros.fat}%
              </span>
            </div>
            <div
              style={{
                background: "#fee2e2",
                borderRadius: "9999px",
                height: "24px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#ef4444",
                  height: "100%",
                  width: `${macros.fat}%`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  transition: "width 0.5s ease",
                }}
              >
                {product.fat}g
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Nutrition Table */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              margin: "0 0 16px 0",
              color: "#1f2937",
            }}
          >
            📋 Nutrition Facts
          </h3>

          {[
            {
              label: "Calories",
              value: `${product.calories} kcal`,
              bold: true,
            },
            { label: "Protein", value: `${product.protein}g` },
            { label: "Carbohydrates", value: `${product.carbs}g` },
            { label: "Fat", value: `${product.fat}g` },
            { label: "Fiber", value: `${product.fiber || 0}g` },
            { label: "Sugar", value: `${product.sugar || 0}g` },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: i < 5 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <span
                style={{
                  color: "#6b7280",
                  fontWeight: item.bold ? "600" : "normal",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: "#1f2937",
                  fontSize: item.bold ? "18px" : "16px",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onAddToRecords(product);
            alert("Added to your records!");
          }}
          style={{
            width: "100%",
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(16,185,129,0.3)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#059669";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 8px rgba(16,185,129,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#10b981";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 6px rgba(16,185,129,0.3)";
          }}
        >
          ✓ Add to My Records
        </button>
      </div>
    </div>
  );
}
