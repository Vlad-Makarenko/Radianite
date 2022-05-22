import React, { useContext } from "react";
import { MyCard } from "../components/UI/MyCard";
import { BattleContext } from "../contexts/BattleContext";
import "../styles/Card.css";

export const Card = ({ card, setPopupCard, side }) => {
  const {moveCard} = useContext(BattleContext);

  return (
    <div
      onMouseEnter={() => setPopupCard(card)}
      onMouseLeave={() => setPopupCard(null)}
      onClick={() => {
        moveCard(card, side);
        setPopupCard(null)
      }}
      className="Card"
    >
      <MyCard classes={["CardImg", side]} card={card} />
    </div>
  );
};
