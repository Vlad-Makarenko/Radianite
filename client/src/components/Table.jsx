import React, { useState } from "react";
import "../styles/CardList.css";
import { Card } from "./Card";

const noop = () => {};

export const Table = ({ classes, side, setPopupCard, UserCards, OppCards  }) => {


  return (
    <div className={[...classes, side].join(" ")}>
      {UserCards.map((data, index) => (
        <Card
          card={data}
          side={side.toLowerCase()}
          moveCard={noop()}
          key={index}
          setPopupCard={setPopupCard}
        />
      ))}
    </div>
  );
};