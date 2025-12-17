import React, { useState } from "react";

export default function ManualEntry({ onBack, onSelect }) {
  const [searchText, setSearchText] = useState("");

  // Dummy products for now - will connect to real data later
  const products = [
    {
      name: "Dal (1 bowl)",
      serving: "200g",
      calories: 180,
      protein: 12,
      carbs: 30,
      fat: 2,
      fiber: 8,
      sugar: 2,
      allergens: [],
      category: "homemade",
    },
    {
      name: "Roti (1 piece)",
      serving: "40g",
      calories: 120,
      protein: 3,
      carbs: 25,
      fat: 2,
      fiber: 3,
      sugar: 1,
      allergens: ["wheat", "gluten"],
      category: "homemade",
    },
    {
      name: "Maggi Masala Noodles",
      brand: "Nestle",
      serving: "100g",
      calories: 310,
      protein: 8.5,
      carbs: 60,
      fat: 12,
      fiber: 2,
      sugar: 5,
      allergens: ["wheat", "gluten", "msg"],
      category: "packaged",
    },
    {
      name: "Apple (1 medium)",
      serving: "182g",
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      fiber: 4,
      sugar: 19,
      allergens: [],
      category: "homemade",
    },
  ];

  // Filter products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
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
          Search Food
        </h2>
      </div>

      {/* Search Bar */}
      <div style={{ padding: "24px" }}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Type food name (e.g., Dal, Roti, Apple)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 16px 16px 48px",
              fontSize: "16px",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
        </div>

        {/* Results */}
        <div style={{ marginTop: "24px" }}>
          {searchText === "" ? (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                marginTop: "48px",
                fontSize: "16px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍽️</div>
              Start typing to search foods...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => onSelect(product)}
                  style={{
                    background: "white",
                    padding: "16px",
                    marginBottom: "12px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    border: "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,0,0,0.1)";
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    {product.calories} calories
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                marginTop: "48px",
                fontSize: "16px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>😕</div>
              No foods found. Try different search terms.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
