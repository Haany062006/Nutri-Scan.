import React, { useState, useEffect } from "react";
import Login from "./Login";
import "./App.css";
import ManualEntry from "./ManualEntry";
import Results from "./Results";
import Scanner from "./Scanner";
import Records from "./Records";
import Premium from "./Premium";
import Analytics from "./Analytics";
import Signup from "./Signup";

export default function App() {
  const [userName, setUserName] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const premiumStatus = localStorage.getItem("isPremium") === "true";
    if (savedName) {
      setUserName(savedName);
      setIsPremium(premiumStatus);
    }
  }, []);

  // Calculate today's total from localStorage
  const getTodayTotal = () => {
    const saved = localStorage.getItem("foodHistory");
    if (!saved) return 0;

    try {
      const history = JSON.parse(saved);
      const today = new Date().toDateString();
      const todayItems = history.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate.toDateString() === today;
      });

      return todayItems.reduce(
        (sum, item) => sum + (item.product.calories || 0),
        0
      );
    } catch {
      return 0;
    }
  };

  const todayTotal = getTodayTotal();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName("");
  };

  const saveToHistory = (product, method) => {
    try {
      const existing = localStorage.getItem("foodHistory");
      const history = existing ? JSON.parse(existing) : [];

      history.push({
        product,
        timestamp: new Date().toISOString(),
        method,
      });

      localStorage.setItem("foodHistory", JSON.stringify(history));
      return true;
    } catch (error) {
      console.error("Error saving history:", error);
      alert("❌ Failed to save. Please try again.");
      return false;
    }
  };

  if (!userName) {
    return <Login />;
  }

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "16px",
            animation: "bounce 2s infinite",
          }}
        >
          🥗
        </div>

        <style>{`
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`}</style>
      </div>
    );
  }

  // Show Manual Entry screen
  if (currentScreen === "manual") {
    return (
      <ManualEntry
        onBack={() => setCurrentScreen("home")}
        onSelect={(product) => {
          setSelectedProduct(product);
          setCurrentScreen("results");
        }}
      />
    );
  }

  // Show Results screen
  if (currentScreen === "results" && selectedProduct) {
    return (
      <Results
        product={selectedProduct}
        onBack={() => {
          setCurrentScreen("home");
          setSelectedProduct(null);
        }}
        onAddToRecords={(product) => {
          const method =
            selectedProduct && selectedProduct.barcode ? "scanned" : "manual";

          const success = saveToHistory(product, method);

          if (success) {
            alert("✅ Added to your records!");
            setCurrentScreen("records");
          }
        }}
      />
    );
  }

  // Show placeholder screens for other buttons
  if (currentScreen === "scanner") {
    return (
      <Scanner
        onBack={() => setCurrentScreen("home")}
        onScanSuccess={(barcode) => {
          // Find product by barcode
          import("./products.json").then((module) => {
            const products = module.default;
            const product = products.find((p) => p.barcode === barcode);

            if (product) {
              setSelectedProduct(product);
              setCurrentScreen("results");
            } else {
              alert("Product not found in database");
              setCurrentScreen("home");
            }
          });
        }}
      />
    );
  }

  if (currentScreen === "records") {
    return <Records onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "premium") {
    return <Premium onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "analytics") {
    return <Analytics onBack={() => setCurrentScreen("home")} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header with Animation */}
      <div
        className="animate-fade-in"
        style={{
          background: "linear-gradient(to right, #10b981, #3b82f6)",
          color: "white",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: "0 0 4px 0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              Hello, {userName}! 👋
              {isPremium && (
                <span
                  style={{
                    background: "linear-gradient(135deg, #fbbf24, #f97316)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  👑 PREMIUM
                </span>
              )}
            </h1>
            <p
              style={{
                color: "#d1fae5",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Ready to track your nutrition?
            </p>
            {todayTotal > 0 && (
              <div
                style={{
                  background: "rgba(255,255,255,0.2)",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginTop: "12px",
                  display: "inline-block",
                }}
              >
                <span style={{ fontSize: "14px" }}>Today: </span>
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {todayTotal} cal
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.3)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.2)")
            }
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Scan Barcode Button with Animation */}
        <div
          className="animate-slide-in"
          onClick={() => setCurrentScreen("scanner")}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            border: "2px solid transparent",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#10b981";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "#d1fae5",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "32px",
              }}
            >
              📷
            </div>
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 4px 0",
                }}
              >
                Scan Barcode
              </h3>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                Quick nutrition check
              </p>
            </div>
          </div>
        </div>

        {/* Enter Manually Button with Animation */}
        <div
          className="animate-slide-in"
          onClick={() => setCurrentScreen("manual")}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            border: "2px solid transparent",
            transition: "all 0.2s",
            animationDelay: "0.1s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "#dbeafe",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "32px",
              }}
            >
              🔍
            </div>
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 4px 0",
                }}
              >
                Enter Manually
              </h3>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                Search food database
              </p>
            </div>
          </div>
        </div>

        {/* My Records Button with Animation */}
        <div
          className="animate-slide-in"
          onClick={() => setCurrentScreen("records")}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            border: "2px solid transparent",
            transition: "all 0.2s",
            animationDelay: "0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#a855f7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "#f3e8ff",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "32px",
              }}
            >
              📊
            </div>
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 4px 0",
                }}
              >
                My Records
              </h3>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                View your history
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Button with Animation */}
        <div
          className="animate-slide-in"
          onClick={() => setCurrentScreen("analytics")}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            border: "2px solid transparent",
            transition: "all 0.2s",
            animationDelay: "0.25s",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#8b5cf6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          {!isPremium && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "linear-gradient(135deg, #fbbf24, #f97316)",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              👑 PREMIUM
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "#ede9fe",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "32px",
              }}
            >
              📈
            </div>
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 4px 0",
                }}
              >
                Weekly Analytics
              </h3>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                Track your nutrition trends
              </p>
            </div>
          </div>
        </div>

        {/* Premium Button with Animation */}
        <div
          className="animate-slide-in"
          onClick={() => {
            if (isPremium) {
              alert("You're already Premium! 🎉");
            } else {
              setCurrentScreen("premium");
            }
          }}
          style={{
            background: "linear-gradient(to right, #fbbf24, #f97316)",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "all 0.2s",
            animationDelay: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "white",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "32px",
              }}
            >
              👑
            </div>
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "white",
                  margin: "0 0 4px 0",
                }}
              >
                Premium
              </h3>
              <p style={{ color: "#fef3c7", margin: 0, fontSize: "14px" }}>
                Unlock advanced features
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "24px",
          color: "#6b7280",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: "0 0 8px 0" }}>NutriScan v1.0 - Built with ❤️</p>
        <p style={{ margin: 0 }}>Powered by Open Food Facts API</p>
      </div>
    </div>
  );
}
