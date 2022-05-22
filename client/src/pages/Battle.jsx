import React, { useCallback, useEffect, useState } from "react";
import { CardList } from "../components/CardList";
import { CardPopup } from "../components/CardPopup";
import { Loader } from "../components/Loader";
import { useHttp } from "../hooks/http.hook";
import { useBattle } from "../hooks/battle.hook";
import { BattleContext } from "../contexts/BattleContext";
import { Table } from "../components/Table";

function noop() {}

export const Battle = () => {
  const [popupCard, setPopupCard] = useState(null); // TODO: обнулять взависимости от счетчика карт
  const { request, loading } = useHttp();
  const { userCards, setUserCards, oppCards, setOppCards, tableUserCards, setTableUserCards, tableOppCards, setTableOppCards, moveCard} = useBattle();

  const getCards = useCallback( async () => {
    const data = await request("/api/card", "POST");
    setUserCards(data);
    setOppCards(data);
    console.log(data); // TODO:
  }, [setUserCards, setOppCards, request]);

  useEffect(() => {
    getCards();
  }, [getCards]);

  useEffect( () => {
    console.log("TABLE USER CARD: ", tableUserCards)
  }, [tableUserCards])

  if (loading) {
    return <Loader />;
  }

  return (
    <BattleContext.Provider
      value={{ userCards, setUserCards, oppCards, setOppCards, tableUserCards, setTableUserCards, tableOppCards, setTableOppCards, moveCard}}
    >
      <div>
        <CardList
          classes={["CardList"]}
          side="Opponent"
          cards={oppCards}
          setPopupCard={noop}
        />

        {popupCard && <CardPopup popupCard={popupCard} />}
        <Table setPopupCard={setPopupCard}/>
        <CardList
          classes={["CardList"]}
          side="User"
          cards={userCards}
          setPopupCard={setPopupCard}
        />
      </div>
    </BattleContext.Provider>
  );
};
