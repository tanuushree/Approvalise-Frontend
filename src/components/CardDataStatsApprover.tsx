// components/CardDataStats.tsx

import React, { useState } from "react";
import Popup from "./PopupApprover";

interface CardData {
  id: number;
  title: string;
  status: string;
}

interface CardDataStatsProps {
  title: string;
  cards: CardData[];
  onApprove: (id: number) => void;
  onDisapprove: (id: number) => void;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  cards,
  onApprove,
  onDisapprove,
}) => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const handleApprove = () => {
    if (selectedCard) {
      onApprove(selectedCard.id);
      setSelectedCard(null);
    }
  };

  const handleDisapprove = () => {
    if (selectedCard) {
      onDisapprove(selectedCard.id);
      setSelectedCard(null);
    }
  };

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
  };

  return (
    <div className="card-section">
      <h2>{title}</h2>
      <div className="card-list">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${selectedCard === card ? "selected" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            <div>{card.title}</div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <Popup
          date="2024-03-30" // Replace with actual date
          letterType={selectedCard.status} // Use card status instead of fixed value
          onClose={() => setSelectedCard(null)}
          onApprove={handleApprove}
          onDisapprove={handleDisapprove}
        />
      )}
    </div>
  );
};

export default CardDataStats;
