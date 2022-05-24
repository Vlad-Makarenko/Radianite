import React, { useContext } from "react";
import { BattleContext } from "../contexts/BattleContext";
import "../styles/Table.css";
import { CardList } from "./CardList";


export const Table = ({ setPopupCard }) => {
  const { tableUserCards, tableOppCards } = useContext(BattleContext);

  return (
    <div className="Table">
      <CardList classes={["TableList"]} cards={tableOppCards} setPopupCard={setPopupCard} placement='true'/>
      <CardList classes={["TableList"]} cards={tableUserCards} setPopupCard={setPopupCard} placement='true'/>
    </div>
  );
};
