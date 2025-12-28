import React, { useState, useEffect } from "react";

export default function Analytics({ onBack }) {
  const [weekData, setWeekData] = useState([]);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const premium = localStorage.getItem("isPremium") === "true";
    setIsPremium(premium);

    if (premium) {
      loadWeekData();
    }
  }, []);

  const loadWeekData = () => {
    const saved = localStorage.getItem("foodHistory");
    if (!saved) return;

    try {
      const history = JSON.parse(saved);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const weekItems = history.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= weekAgo;
      });

      // Group by day
      const grouped = {};
      weekItems.forEach((item) => {
        const day = new Date(item.timestamp).toLocaleDateString();
        if (!grouped[day]) {
          grouped[day] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        }
        grouped[day].calories += item.product.calories || 0;
        grouped[day].protein += item.product.protein || 0;
        grouped[day].carbs += item.product.carbs || 0;
        grouped[day].fat += item.product.fat || 0;
      });

      setWeekData(Object.entries(grouped));
    } catch (error) {
      console.error("Error loading week data:", error);
    }
  };

  if (!isPremium) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
        <div
          style={{
            background: "white",
            padding: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "48px 24px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔒</div>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "24px" }}>
            Premium Feature
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Upgrade to Premium to access weekly analytics and insights!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
          <h2 style={{ margin: 0 }}>📈 Weekly Analytics</h2>
        </div>
      </div>

      <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
        {weekData.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "48px 24px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📊</div>
            <p style={{ color: "#6b7280", margin: 0 }}>
              No data yet! Start tracking to see analytics.
            </p>
          </div>
        ) : (
          <div>
            {weekData.map(([day, data], index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "16px",
                    color: "#6b7280",
                  }}
                >
                  {day}
                </h3>

                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: "16px",
                    borderRadius: "12px",
                    color: "white",
                    textAlign: "center",
                    marginBottom: "16px",
                  }}
                >
                  <p style={{ margin: "0 0 4px 0", fontSize: "12px" }}>
                    TOTAL CALORIES
                  </p>
                  <p
                    style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}
                  >
                    {Math.round(data.calories)}
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      background: "#dbeafe",
                      padding: "12px",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "10px",
                        color: "#6b7280",
                      }}
                    >
                      PROTEIN
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#3b82f6",
                      }}
                    >
                      {Math.round(data.protein)}g
                    </p>
                  </div>

                  <div
                    style={{
                      background: "#fef3c7",
                      padding: "12px",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "10px",
                        color: "#6b7280",
                      }}
                    >
                      CARBS
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#eab308",
                      }}
                    >
                      {Math.round(data.carbs)}g
                    </p>
                  </div>

                  <div
                    style={{
                      background: "#fee2e2",
                      padding: "12px",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "10px",
                        color: "#6b7280",
                      }}
                    >
                      FAT
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#ef4444",
                      }}
                    >
                      {Math.round(data.fat)}g
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
