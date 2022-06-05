import { useState, useCallback } from "react";

export const useBattle = () => {
  const [userCards, setUserCards] = useState([]);
  const [oppCards, setOppCards] = useState([]);
  const [tableUserCards, setTableUserCards] = useState([]);
  const [tableOppCards, setTableOppCards] = useState([]);

  const moveCard = useCallback(
    (target, side) => {
      if (side === "user") {
        setUserCards([...userCards.filter((card) => card.id !== target.id)]);
        setTableUserCards([...tableUserCards, target]);
      } else if (side === "opponent") {
        setOppCards([...oppCards.filter((card) => card.id !== target.id)]);
        setTableOppCards([...tableOppCards, target]);
      }
      console.log("USER TABLE:", tableUserCards);
      console.log("OPP TABLE:", tableOppCards);
    },
    [
      setUserCards,
      setOppCards,
      setTableOppCards,
      setTableUserCards,
      userCards,
      oppCards,
      tableUserCards,
      tableOppCards
    ]
  );

  return {
    userCards,
    setUserCards,
    oppCards,
    setOppCards,
    tableUserCards,
    setTableUserCards,
    tableOppCards,
    setTableOppCards,
    moveCard,
  };
};
