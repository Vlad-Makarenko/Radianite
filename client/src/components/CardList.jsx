import React, { useState } from "react";
import "../styles/CardList.css";
import { Card } from "./Card";

export const CardList = ({ classes, side, setPopupCard, allCards, setTableCards, TableCards }) => {

  const [cards, setCards] = useState(allCards);


  const moveCard = (target) => {
    setCards([...cards.filter((card) => card.id !== target.id)]);
    console.log("TABLE CARDS:",TableCards,"NEW Card:", target)
    setTableCards([...TableCards, target])
    console.log("NEW TABLE CARDS:", [...TableCards, target])
    
    setPopupCard(null)
  };

  return (
    <div className={[...classes, side].join(" ")}>
      {cards.map((data, index) => (
        <Card
          card={data}
          side={side.toLowerCase()}
          moveCard={moveCard}
          key={index}
          setPopupCard={setPopupCard}
        />
      ))}
    </div>
  );
};
