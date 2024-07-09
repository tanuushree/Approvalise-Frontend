// src/components/popup.tsx
import React from "react";

interface PopupProps {
  date: string;
  letterType: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ date, letterType, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Popup</h2>
        <p>Date: {date}</p>
        <p>Letter Type: {letterType}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
export type { PopupProps }; // Exporting PopupProps type