
// src/components/CardDataStats.tsx
"use client";
import React, { useState } from "react";
import Popup, { PopupProps } from "./PopupUser";

interface CardDataStatsProps {
  title: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({ title }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <button onClick={togglePopup}>View Details</button>
      </div>
      {isPopupOpen && (
        <Popup
          date="2024-03-30" // Replace with actual date
          letterType="pending" // Replace with actual letter type
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default CardDataStats;
