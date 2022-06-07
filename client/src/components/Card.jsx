import React, { useContext } from "react";
import { MyCard } from "../components/UI/MyCard";
import { BattleContext } from "../contexts/BattleContext";
import "../styles/Card.css";

export const Card = ({ card, setPopupCard, side, placement, turn }) => {
  const { moveCard, socket } = useContext(BattleContext);
  console.log(turn);
  return (
    <div
      onMouseEnter={() => setPopupCard(card)}
      onMouseLeave={() => setPopupCard(null)}
      onClick={() => {
        if( side === "user" && !turn){
          // moveCard(card, side);
          socket.emit("moveCard", card);
          setPopupCard(null);
        }
      }}
      className={placement ? "TableCard" : "Card"}
    >
      {placement ? (
        <MyCard classes={["CardOnTable", side]} card={card} />
      ) : (
        <MyCard classes={["CardImg", side]} card={card} />
      )}
    </div>
  );
};
