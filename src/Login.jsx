import React, { useState } from 'react';

export default function Login() {
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim()) {
      // Save name to browser localStorage
      localStorage.setItem('userName', name);
      // Reload page to show home
      window.location.reload();
    } else {
      alert('Please enter your name!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #4ade80, #3b82f6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxWidth: '400px',
        width: '100%'
      }}>
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🥗</div>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#1f2937',
            marginBottom: '8px',
            margin: 0
          }}>
            NutriScan
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Know What You Eat</p>
        </div>
        
        {/* Input and Button */}
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '18px',
              marginBottom: '16px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#10b981'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
          
          <button
            onClick={handleLogin}
            disabled={!name.trim()}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              border: 'none',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              background: name.trim() ? '#06b6d4' : '#d1d5db',
              color: name.trim() ? 'white' : '#6b7280',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (name.trim()) {
                e.target.style.background = '#0891b2';
              }
            }}
            onMouseLeave={(e) => {
              if (name.trim()) {
                e.target.style.background = '#06b6d4';
              }
            }}
          >
            Get Started
          </button>
          
          <p style={{ 
            textAlign: 'center', 
            fontSize: '14px', 
            color: '#6b7280',
            marginTop: '16px',
            margin: '16px 0 0 0'
          }}>
            ✓ No password needed • Just your name to start
          </p>
        </div>
      </div>
    </div>
  );
}