import React, { useContext } from "react";
import { BattleContext } from "../contexts/BattleContext";
import "../styles/Table.css";
import { Card } from "./Card";
import { CardList } from "./CardList";

const noop = () => {};

export const Table = ({ setPopupCard }) => {
  const { tableUserCards, tableOppCards } = useContext(BattleContext);

  return (
    <div className="Table">
      <CardList classes={["TableList"]} cards={tableOppCards} setPopupCard={setPopupCard} />
      <CardList classes={["TableList"]} cards={tableUserCards} setPopupCard={setPopupCard}/>
    </div>
  );
};
