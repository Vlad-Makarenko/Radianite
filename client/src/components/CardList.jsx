import React from "react";
import "../styles/CardList.css";
import { Card } from "./Card";

export const CardList = ({ classes, side, setPopupCard, cards }) => {

  return (
    <div className={[...classes, side].join(" ")}>
      {cards.map((data, index) => (
        <Card
          card={data}
          side={side?.toLowerCase()}
          key={index}
          setPopupCard={setPopupCard}
        />
      ))}
    </div>
  );
};
