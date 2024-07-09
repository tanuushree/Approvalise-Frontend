import React, { useState } from "react";

interface PopupProps {
  date: string;
  letterType: string;
  onClose: () => void;
  onDisapprove: () => void;
  reason: string;
  setReason: (reason: string) => void;
}

const Popup: React.FC<PopupProps> = ({
  date,
  letterType,
  onClose,
  onDisapprove,
  reason,
  setReason,
}) => {
  const handleDisapprove = () => {
    onDisapprove();
  };

  const popupStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  };

  const buttonContainerStyle: React.CSSProperties = {
    marginTop: "20px",
  };

  const disapproveButtonStyle: React.CSSProperties = {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    marginRight: "10px",
    cursor: "pointer",
  };

  const closeButtonStyle: React.CSSProperties = {
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    cursor: "pointer",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    boxSizing: "border-box",
  };

  return (
    <div style={popupStyle}>
      <h2>Review Request</h2>
      <p>Date: {date}</p>
      <p>Letter Type: {letterType}</p>
      <textarea
        style={textareaStyle}
        placeholder="Reason for disapproval"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <div style={buttonContainerStyle}>
        <button style={disapproveButtonStyle} onClick={handleDisapprove}>
          Submit
        </button>
        <button style={closeButtonStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
