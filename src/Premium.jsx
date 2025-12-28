import React from "react";
import PaymentModal from "./PaymentModal";

export default function Premium({ onBack }) {
  const features = [
    {
      icon: "🎯",
      title: "Personalized Recommendations",
      description: "AI-powered meal suggestions based on your health goals",
    },
    {
      icon: "❤️",
      title: "Health Condition Tracking",
      description: "Manage diabetes, allergies, pregnancy nutrition needs",
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Weekly and monthly nutrition insights with trends",
    },
    {
      icon: "🍽️",
      title: "Meal Planning",
      description: "Custom meal plans designed for your dietary needs",
    },
    {
      icon: "♾️",
      title: "Unlimited Scans",
      description: "No daily limits on barcode scanning",
    },
    {
      icon: "🚫",
      title: "Ad-Free Experience",
      description: "Enjoy the app without any advertisements",
    },
  ];
  const [showPayment, setShowPayment] = useState(false);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fbbf24, #f97316)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(0,0,0,0.2)",
          padding: "16px",
          color: "white",
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
          <h2 style={{ margin: 0 }}>Premium Features</h2>
        </div>
      </div>

      <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
        {/* Hero Card */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            textAlign: "center",
            marginBottom: "24px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>👑</div>
          <h1
            style={{ margin: "0 0 8px 0", fontSize: "32px", color: "#1f2937" }}
          >
            Go Premium
          </h1>
          <p
            style={{ margin: "0 0 24px 0", color: "#6b7280", fontSize: "16px" }}
          >
            Unlock all features and take control of your nutrition
          </p>

          {/* Pricing */}
          <div
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
              padding: "24px",
              borderRadius: "16px",
              marginBottom: "16px",
            }}
          >
            <p
              style={{ margin: "0 0 8px 0", color: "white", fontSize: "14px" }}
            >
              LIMITED TIME OFFER
            </p>
            <h2
              style={{ margin: "0 0 8px 0", fontSize: "48px", color: "white" }}
            >
              ₹99
            </h2>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.9)",
                fontSize: "16px",
              }}
            >
              per month
            </p>
          </div>

          <div
            style={{
              background: "#fef3c7",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#92400e",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              🎉 Launch Price: 60% OFF (Regular ₹249/month)
            </p>
          </div>

          <button
            onClick={() => setShowPayment(true)}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
              border: "none",
              color: "white",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(251,191,36,0.4)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Notify Me at Launch
          </button>
        </div>

        {/* Features List */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          }}
        >
          <h3
            style={{ margin: "0 0 24px 0", fontSize: "20px", color: "#1f2937" }}
          >
            What You Get:
          </h3>

          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: index < features.length - 1 ? "24px" : 0,
                paddingBottom: index < features.length - 1 ? "24px" : 0,
                borderBottom:
                  index < features.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <div style={{ fontSize: "32px", flexShrink: 0 }}>
                {feature.icon}
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "16px",
                    color: "#1f2937",
                  }}
                >
                  {feature.title}
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            marginTop: "24px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          }}
        >
          <h3
            style={{ margin: "0 0 16px 0", fontSize: "20px", color: "#1f2937" }}
          >
            Frequently Asked Questions
          </h3>

          <div style={{ marginBottom: "16px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                color: "#1f2937",
              }}
            >
              When will Premium launch?
            </h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
              Premium features are currently in development and will launch in
              Q1 2026.
            </p>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                color: "#1f2937",
              }}
            >
              Can I cancel anytime?
            </h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
              Yes! No contracts, cancel anytime from your account settings.
            </p>
          </div>

          <div>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                color: "#1f2937",
              }}
            >
              Will the free version still exist?
            </h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
              Absolutely! Core features (scan, search, track) will always be
              free.
            </p>
          </div>
        </div>
      </div>
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            localStorage.setItem("isPremium", "true");
            alert("🎉 Payment Successful! You're now Premium!");
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
