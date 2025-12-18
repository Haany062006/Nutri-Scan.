import React, { useState } from "react";
import productsData from "./products.json";

export default function ManualEntry({ onBack, onSelect }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Local products as fallback
  const localProducts = productsData;

  const handleSearch = async (text) => {
    setSearchText(text);

    if (text.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // First, show local results immediately
    const localResults = localProducts.filter((p) =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );

    setSearchResults(localResults);

    // Then search API for more results
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          text
        )}&search_simple=1&action=process&json=1&page_size=10`
      );
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        const apiProducts = data.products
          .map((p) => ({
            barcode: p.code,
            name: p.product_name || "Unknown Product",
            brand: p.brands || null,
            serving: p.serving_size || "100g",
            calories: Math.round(p.nutriments["energy-kcal"] || 0),
            protein: Math.round(p.nutriments.proteins || 0),
            carbs: Math.round(p.nutriments.carbohydrates || 0),
            fat: Math.round(p.nutriments.fat || 0),
            fiber: Math.round(p.nutriments.fiber || 0),
            sugar: Math.round(p.nutriments.sugars || 0),
            allergens: p.allergens_tags
              ? p.allergens_tags.map((a) => a.replace("en:", ""))
              : [],
            category: "packaged",
            imageUrl: p.image_url,
            source: "api",
          }))
          .filter((p) => p.calories > 0); // Only show products with nutrition data

        // Combine local and API results (local first)
        setSearchResults([...localResults, ...apiProducts]);
      }
    } catch (error) {
      console.error("Search API error:", error);
      // Keep showing local results
    }

    setIsSearching(false);
  };

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
            placeholder="Type food name (e.g., maggi, bread, apple)"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
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
          {isSearching && (
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "20px",
              }}
            >
              ⏳
            </span>
          )}
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
              <p>Start typing to search from millions of foods...</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                Powered by Open Food Facts + Local Database
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "12px",
                }}
              >
                Found {searchResults.length} results
              </p>
              {searchResults.map((product, index) => (
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
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "#f3f4f6",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                        }}
                      >
                        {product.category === "packaged" ? "📦" : "🍽️"}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          margin: "0 0 4px 0",
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        {product.name}
                        {product.source === "api" && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "12px",
                              color: "#10b981",
                              fontWeight: "normal",
                            }}
                          >
                            • API
                          </span>
                        )}
                      </h3>
                      {product.brand && (
                        <p
                          style={{
                            margin: "0 0 4px 0",
                            fontSize: "14px",
                            color: "#6b7280",
                          }}
                        >
                          {product.brand}
                        </p>
                      )}
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#6b7280",
                        }}
                      >
                        {product.calories} cal • {product.serving}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isSearching ? (
            <div
              style={{ textAlign: "center", padding: "48px", color: "#6b7280" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔄</div>
              Searching...
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
