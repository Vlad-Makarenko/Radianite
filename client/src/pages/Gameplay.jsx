import React, { useCallback, useContext, useEffect, useState } from "react";
import { CardList } from "../components/CardList";
import { CardPopup } from "../components/CardPopup";
import { Loader } from "../components/Loader";
import { useHttp } from "../hooks/http.hook";
import { useBattle } from "../hooks/battle.hook";
import { BattleContext } from "../contexts/BattleContext";
import { Table } from "../components/Table";
import { useParams } from "react-router-dom";

import io from "socket.io-client";
import { AuthContext } from "../contexts/AuthContext";
const socket = io("http://localhost:5000");

function noop() {}

export const Gameplay = () => {
  const [popupCard, setPopupCard] = useState(null); // TODO: обнулять взависимости от счетчика карт
  const [waiting, setWaiting] = useState(true);
  const { request, loading } = useHttp();
  const { userId } = useContext(AuthContext);
  const {
    userCards,
    setUserCards,
    oppCards,
    setOppCards,
    tableUserCards,
    setTableUserCards,
    tableOppCards,
    setTableOppCards,
    moveCard,
  } = useBattle();

  const room = useParams().id;

  useEffect(() => {
    socket.emit("initGame", { room, userId });
  }, [room, userId]);

  useEffect(() => {
    socket.on("waiting", (data) => {
      setWaiting(true);
    });
    socket.on("startGame", (data) => {
      setUserCards(data.deck);
      setOppCards(data.deck); //!!!!!!
      setWaiting(false);
    });
  }, []);

  // TODO: 1.Добавить слушатели в сокетах на "вэйтинг" и показывать ладер
  //       2. добавить слушатель на "старт гейм" и создавать в нем класс гейм где будут реализованы последующие методы


  if (waiting) {
    return <Loader info={"Waiting for the opponent..."} />;
  }

  return (
    <BattleContext.Provider
      value={{
        userCards,
        setUserCards,
        oppCards,
        setOppCards,
        tableUserCards,
        setTableUserCards,
        tableOppCards,
        setTableOppCards,
        moveCard,
      }}
    >
      {!waiting && (
        <div className="row pipec">
          <div className="col s6 offset-s3">
            <CardList
              classes={["CardList"]}
              side="Opponent"
              cards={oppCards}
              setPopupCard={noop}
            />
          </div>

          {popupCard && <CardPopup popupCard={popupCard} />}
          <div className="col s6 offset-s3">
            <Table setPopupCard={setPopupCard} />
          </div>

          <div className="col s6 offset-s3">
            <CardList
              classes={["CardList"]}
              side="User"
              cards={userCards}
              setPopupCard={setPopupCard}
            />
          </div>
        </div>
      )}
    </BattleContext.Provider>
  );
};
