import React, { useState } from "react";
import "../styles/CardList.css";
import { Card } from "./Card";

export const CardList = ({ classes, side, setPopupCard }) => {

  const [cards, setCards] = useState([
    {name:"Devour.png", id: Math.random()},
    {name:"Devour.png", id: Math.random()},
    {name:"Devour.png", id: Math.random()},
    {name:"Devour1.png", id: Math.random()},
    {name:"Devour.png", id: Math.random()},
    {name:"Devour.png", id: Math.random()},
  ]);

  const moveCard = (target) => {
    setCards([...cards.filter((card) => card.id !== target)]);
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
