import React from "react";
import { MyCard } from "../components/UI/MyCard";
import "../styles/Card.css";

export const Card = ({ card, moveCard, setPopupCard, side }) => {
  return (
    <div
      onMouseEnter={() => {
        setPopupCard(card);
      }}
      onMouseLeave={() => {
        setPopupCard(null);
      }}
      className="Card"
    >
      <MyCard classes={["CardImg", side]} card={card} moveCard={moveCard} />
    </div>
  );
};
