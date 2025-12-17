import React, { useState, useEffect } from "react";
import Login from "./Login";
import "./App.css";
import ManualEntry from "./ManualEntry";
import Results from "./Results";
import Scanner from './Scanner';

export default function App() {
  const [userName, setUserName] = useState("");
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName("");
  };

  if (!userName) {
    return <Login />;
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
          // We'll implement this in Day 5
          console.log("Added to records:", product);
        }}
      />
    );
  }

  // Show placeholder screens for other buttons
  if (currentScreen === 'scanner') {
    return (
      <Scanner
        onBack={() => setCurrentScreen('home')}
        onScanSuccess={(barcode) => {
          // Find product by barcode
          import('./products.json').then((module) => {
            const products = module.default;
            const product = products.find(p => p.barcode === barcode);
            
            if (product) {
              setSelectedProduct(product);
              setCurrentScreen('results');
            } else {
              alert('Product not found in database');
              setCurrentScreen('home');
            }
          });
        }}
      />
    );
  }

  if (currentScreen === "records") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>📊</div>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
          Records Coming Soon
        </h2>
        <button
          onClick={() => setCurrentScreen("home")}
          style={{
            background: "#a855f7",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (currentScreen === "premium") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #fbbf24, #f97316)",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>👑</div>
        <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "white" }}>
          Premium Coming Soon
        </h2>
        <button
          onClick={() => setCurrentScreen("home")}
          style={{
            background: "white",
            color: "#f97316",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Back to Home
        </button>
      </div>
    );
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
              }}
            >
              Hello, {userName}! 👋
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

        {/* Premium Button with Animation */}
        <div
          className="animate-slide-in"
          onClick={() => setCurrentScreen("premium")}
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
    </div>
  );
}
