import React from "react"

const LoadingSpinner = () => (
    <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.6)",
        zIndex: 1000,
    }}>
        <div style={{
            width: 48,
            height: 48,
            border: "6px solid #e0e0e0",
            borderTop: "6px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
        }} />
        <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    </div>
)

export default LoadingSpinner 