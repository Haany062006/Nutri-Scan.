import React from "react";

export default function Records({ onBack, foodHistory }) {
  const groupByDate = () => {
    const groups = {};
    foodHistory.forEach((item) => {
      const date = new Date(item.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
    });
    return groups;
  };

  const grouped = groupByDate();

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
          My Records
        </h2>
      </div>

      <div style={{ padding: "24px" }}>
        {Object.keys(grouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📊</div>
            <p style={{ color: "#6b7280" }}>
              No records yet. Start tracking your meals!
            </p>
          </div>
        ) : (
          Object.keys(grouped)
            .reverse()
            .map((date) => (
              <div key={date} style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    color: "#1f2937",
                  }}
                >
                  {date}
                </h3>
                {grouped[date].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      background: "white",
                      padding: "16px",
                      marginBottom: "8px",
                      borderRadius: "12px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h4 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>
                          {item.product.name}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            color: "#6b7280",
                          }}
                        >
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#10b981",
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
                          calories
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    background: "#f3f4f6",
                    padding: "12px",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                >
                  <p
                    style={{ margin: 0, textAlign: "right", fontWeight: "600" }}
                  >
                    Total:{" "}
                    {grouped[date].reduce(
                      (sum, item) => sum + item.product.calories,
                      0
                    )}{" "}
                    cal
                  </p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
