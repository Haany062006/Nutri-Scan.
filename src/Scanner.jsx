import React, { useState, useEffect, useRef } from "react";

export default function Scanner({ onBack, onScanSuccess }) {
  const [cameraStatus, setCameraStatus] = useState("loading");
  const [scannedCode, setScannedCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    requestCamera();
    return () => {
      stopScanning();
    };
  }, []);

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      setCameraStatus("ready");

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Start scanning for barcodes
        startBarcodeDetection();
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraStatus("error");
    }
  };

  const startBarcodeDetection = () => {
    // Use BarcodeDetector API if available
    if ("BarcodeDetector" in window) {
      const barcodeDetector = new window.BarcodeDetector({
        formats: ["ean_13", "ean_8", "upc_a", "upc_e"],
      });

      scanIntervalRef.current = setInterval(async () => {
        if (
          videoRef.current &&
          videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA &&
          !isProcessing
        ) {
          try {
            const barcodes = await barcodeDetector.detect(videoRef.current);
            if (barcodes.length > 0) {
              handleBarcodeDetected(barcodes[0].rawValue);
            }
          } catch (err) {
            console.log("Detection error:", err);
          }
        }
      }, 1000); // Check every second
    } else {
      console.log("BarcodeDetector not supported");
    }
  };

  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const handleBarcodeDetected = async (barcode) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setScannedCode(barcode);

    // Fetch from Open Food Facts API
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();

      if (data.status === 1) {
        // Product found in API!
        const product = data.product;
        const formattedProduct = {
          barcode: barcode,
          name: product.product_name || "Unknown Product",
          brand: product.brands || null,
          serving: product.serving_size || "100g",
          calories: Math.round(product.nutriments["energy-kcal"] || 0),
          protein: Math.round(product.nutriments.proteins || 0),
          carbs: Math.round(product.nutriments.carbohydrates || 0),
          fat: Math.round(product.nutriments.fat || 0),
          fiber: Math.round(product.nutriments.fiber || 0),
          sugar: Math.round(product.nutriments.sugars || 0),
          allergens: product.allergens_tags
            ? product.allergens_tags.map((a) => a.replace("en:", ""))
            : [],
          category: "packaged",
          imageUrl: product.image_url || null,
        };

        stopScanning();
        onScanSuccess(formattedProduct);
      } else {
        // Not found in API, try local database
        alert("Product not found in database. Checking local database...");
        onScanSuccess(barcode); // Pass barcode to check local
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to fetch product data. Please try again.");
      setIsProcessing(false);
      setScannedCode("");
    }
  };

  const handleTestScan = () => {
    // Test with Maggi barcode
    handleBarcodeDetected("8901725123456");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {
            stopScanning();
            onBack();
          }}
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
        <h2 style={{ margin: 0, fontSize: "20px" }}>Scan Barcode</h2>
      </div>

      {/* Camera Preview */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: cameraStatus === "ready" ? "block" : "none",
          }}
          playsInline
          autoPlay
        />

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Scanner Frame */}
        {cameraStatus === "ready" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "280px",
              height: "200px",
              border: "3px solid #10b981",
              borderRadius: "12px",
              boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "2px",
                background: "#ef4444",
                top: "50%",
                animation: "scan 2s infinite",
                boxShadow: "0 0 10px #ef4444",
              }}
            />
          </div>
        )}

        {/* Loading */}
        {cameraStatus === "loading" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📷</div>
            <p>Initializing camera...</p>
          </div>
        )}

        {/* Error */}
        {cameraStatus === "error" && (
          <div style={{ textAlign: "center", padding: "24px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>❌</div>
            <h3>Camera Access Denied</h3>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>
              Please enable camera permissions.
            </p>
            <button
              onClick={requestCamera}
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
              Try Again
            </button>
          </div>
        )}

        {/* Scanned Code Display */}
        {scannedCode && (
          <div
            style={{
              position: "absolute",
              bottom: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#10b981",
              padding: "16px 24px",
              borderRadius: "12px",
              fontWeight: "bold",
            }}
          >
            {isProcessing ? "Fetching data..." : `Found: ${scannedCode}`}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 16px 0", color: "#9ca3af" }}>
          {cameraStatus === "ready"
            ? "Point camera at barcode and hold steady"
            : "Waiting for camera..."}
        </p>

        {/* Test Button */}
        {cameraStatus === "ready" && !isProcessing && (
          <button
            onClick={handleTestScan}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "12px",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            Test Scan (Maggi from API)
          </button>
        )}

        <button
          onClick={() => {
            stopScanning();
            onBack();
          }}
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "300px",
          }}
        >
          Cancel
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
