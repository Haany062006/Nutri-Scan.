import React, { useState, useEffect } from 'react';

export default function Scanner({ onBack, onScanSuccess }) {
  const [cameraStatus, setCameraStatus] = useState('loading'); // loading, ready, error
  const [scannedCode, setScannedCode] = useState('');

  useEffect(() => {
    // Request camera permission
    requestCamera();
  }, []);

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      // Camera access granted
      setCameraStatus('ready');
      
      // Show camera in video element
      const video = document.getElementById('camera-preview');
      if (video) {
        video.srcObject = stream;
        video.play();
      }
    } catch (error) {
      console.error('Camera error:', error);
      setCameraStatus('error');
    }
  };

  const handleManualEntry = () => {
    // For testing - simulate scanning
    const testBarcode = '8901725123456'; // Maggi barcode
    setScannedCode(testBarcode);
    
    setTimeout(() => {
      onScanSuccess(testBarcode);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(0,0,0,0.8)',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        zIndex: 10
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '8px'
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: '20px' }}>
          Scan Barcode
        </h2>
      </div>

      {/* Camera Preview Area */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Video element for camera */}
        <video
          id="camera-preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: cameraStatus === 'ready' ? 'block' : 'none'
          }}
          playsInline
          autoPlay
        />

        {/* Scanner Frame Overlay */}
        {cameraStatus === 'ready' && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            height: '200px',
            border: '3px solid #10b981',
            borderRadius: '12px',
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
          }}>
            {/* Scanning line animation */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '2px',
                background: '#ef4444',
                top: '50%',
                animation: 'scan 2s infinite',
                boxShadow: '0 0 10px #ef4444'
              }}
            />
          </div>
        )}

        {/* Loading State */}
        {cameraStatus === 'loading' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '16px',
              animation: 'pulse 1.5s infinite'
            }}>
              📷
            </div>
            <p>Initializing camera...</p>
          </div>
        )}

        {/* Error State */}
        {cameraStatus === 'error' && (
          <div style={{ 
            textAlign: 'center', 
            padding: '24px',
            maxWidth: '300px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
            <h3>Camera Access Denied</h3>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>
              Please enable camera permissions in your browser settings.
            </p>
            <button
              onClick={requestCamera}
              style={{
                marginTop: '16px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Scanned Code Display */}
        {scannedCode && (
          <div style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#10b981',
            padding: '16px 24px',
            borderRadius: '12px',
            fontWeight: 'bold'
          }}>
            Found: {scannedCode}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{
        background: 'rgba(0,0,0,0.8)',
        padding: '24px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 16px 0', color: '#9ca3af' }}>
          {cameraStatus === 'ready' 
            ? 'Point camera at barcode and hold steady'
            : 'Waiting for camera...'}
        </p>
        
        {/* Test Button (for development) */}
        {cameraStatus === 'ready' && (
          <button
            onClick={handleManualEntry}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '12px',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            Test Scan (Maggi)
          </button>
        )}

        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          Cancel
        </button>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}