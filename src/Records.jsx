import React, { useState, useEffect } from "react";

export default function Records({ onBack }) {
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("today");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const saved = localStorage.getItem("foodHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
      } catch (error) {
        console.error("Error loading history:", error);
        setHistory([]);
      }
    }
  };

  // Filter by selected date
  const todayRecords = history.filter((item) => {
    const itemDate = new Date(item.timestamp);
    const today = new Date();
    return itemDate.toDateString() === today.toDateString();
  });

  // Calculate totals
  const totals = todayRecords.reduce(
    (acc, item) => {
      return {
        calories: acc.calories + (item.product.calories || 0),
        protein: acc.protein + (item.product.protein || 0),
        carbs: acc.carbs + (item.product.carbs || 0),
        fat: acc.fat + (item.product.fat || 0),
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all records?")) {
      localStorage.removeItem("foodHistory");
      setHistory([]);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "16px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            ←
          </button>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
            My Records
          </h2>
        </div>

        {/* Date Selector */}
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="week">This Week</option>
        </select>
      </div>

      <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
        {/* Today's Summary */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px 0",
              fontSize: "18px",
              color: "#6b7280",
            }}
          >
            Today's Summary
          </h3>

          {/* Total Calories */}
          <div
            style={{
              textAlign: "center",
              padding: "24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              TOTAL CALORIES
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {Math.round(totals.calories)}
            </h2>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "14px",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              kcal consumed today
            </p>
          </div>

          {/* Macros Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "#dbeafe",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                PROTEIN
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#3b82f6",
                }}
              >
                {Math.round(totals.protein)}g
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "#fef3c7",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                CARBS
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#eab308",
                }}
              >
                {Math.round(totals.carbs)}g
              </p>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "#fee2e2",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                FAT
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#ef4444",
                }}
              >
                {Math.round(totals.fat)}g
              </p>
            </div>
          </div>
        </div>

        {/* Food List */}
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
              margin: "0 0 16px 0",
              fontSize: "18px",
              color: "#1f2937",
            }}
          >
            Today's Foods ({todayRecords.length})
          </h3>

          {todayRecords.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                color: "#9ca3af",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>📝</div>
              <p style={{ margin: 0, fontSize: "16px" }}>No records yet!</p>
              <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
                Start scanning or searching foods to track your nutrition.
              </p>
            </div>
          ) : (
            <div>
              {todayRecords.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    borderBottom:
                      index < todayRecords.length - 1
                        ? "1px solid #e5e7eb"
                        : "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    style={{
                      fontSize: "32px",
                      flexShrink: 0,
                    }}
                  >
                    {item.product.category === "packaged" ? "📦" : "🍽️"}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1f2937",
                      }}
                    >
                      {item.product.name}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#6b7280",
                      }}
                    >
                      {item.method === "scanned" ? "📷 Scanned" : "✍️ Manual"} •{" "}
                      {formatTime(item.timestamp)}
                    </p>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      {item.product.calories}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      kcal
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear All Button */}
        {todayRecords.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              width: "100%",
              padding: "16px",
              background: "white",
              border: "2px solid #ef4444",
              borderRadius: "12px",
              color: "#ef4444",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#ef4444";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#ef4444";
            }}
          >
            🗑️ Clear All Records
          </button>
        )}
      </div>
    </div>
  );
}
