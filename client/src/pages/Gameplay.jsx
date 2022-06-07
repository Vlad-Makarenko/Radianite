import React, { useContext, useEffect, useState } from "react";
import { CardList } from "../components/CardList";
import { CardPopup } from "../components/CardPopup";
import { Loader } from "../components/Loader";
import { useBattle } from "../hooks/battle.hook";
import { BattleContext } from "../contexts/BattleContext";
import { Table } from "../components/Table";
import { useParams } from "react-router-dom";
import Game from "../Game/Game";
import Player from "../Game/Player";

import "../styles/Gameplay.css";

import io from "socket.io-client";
import { AuthContext } from "../contexts/AuthContext";
import { BattleProfile } from "../components/BattleProfile";
import { useBattleProfile } from "../hooks/battleProfile.hook";
const socket = io("http://localhost:5000");

function noop() {}

function changeTurn() {
  socket.emit("changeTurn");
}

export const Gameplay = () => {
  const [popupCard, setPopupCard] = useState(null); // TODO: обнулять взависимости от счетчика карт
  const [waiting, setWaiting] = useState(true);
  const [turn, setTurn] = useState(false);

  const { userId } = useContext(AuthContext);
  const battleInfo = useBattleProfile();

  // const {
  //   userCards,
  //   setUserCards,
  //   oppCards,
  //   setOppCards,
  //   tableUserCards,
  //   setTableUserCards,
  //   tableOppCards,
  //   setTableOppCards,
  //   moveCard,
  // } = useBattle();

  const state = useBattle();
  state.socket = socket;

  const room = useParams().id;

  useEffect(() => {
    socket.emit("initGame", { room, userId });
  }, [room, userId]);

  useEffect(() => {
    socket.on("waiting", (data) => {
      setWaiting(true);
    });
    socket.on("startGame", (data) => {
      // battleInfo.setOpponentLogin(data.opponent)
      // battleInfo.setUserLogin(data.player)
      const player = new Player(data.player);
      const opponent = new Player(data.opponent);
      const game = new Game(player, socket, opponent, {
        ...state,
        ...battleInfo,
      });
      setTurn(data.turn);
      console.log(data.turn);
      setWaiting(false);
    });
  }, [state, battleInfo]);

  useEffect(() => {
    socket.on("changeTurn", (data) => {
      setTurn(data.turn);
    });
  }, []);

  if (waiting) {
    return <Loader info={"Waiting for the opponent..."} />;
  }

  return (
    <BattleContext.Provider
      // value={{
      //   userCards,
      //   setUserCards,
      //   oppCards,
      //   setOppCards,
      //   tableUserCards,
      //   setTableUserCards,
      //   tableOppCards,
      //   setTableOppCards,
      //   moveCard,
      // }}
      value={state}
    >
      {/* {number == 1 && <div className="row pipec"> */}
      <div className="row">
        <div className="col s6 offset-s3">
          <CardList
            classes={["CardList"]}
            side="Opponent"
            cards={state.oppCards}
            setPopupCard={noop}
          />
        </div>
        <div className="col s3">
          <BattleProfile
            Avatar={battleInfo.opponentAvatar}
            HP={battleInfo.opponentHitPoints}
            RP={battleInfo.opponentRadianitePoints}
            Login={battleInfo.opponentLogin}
          />
        </div>

        {popupCard && <CardPopup popupCard={popupCard} />}
        <div className="col s6 offset-s3">
          <Table setPopupCard={setPopupCard} />
        </div>
        <div className="col s3">
          <button
            className="btn waves-effect waves-light changeDescription"
            name="action"
            onClick={changeTurn} //? ()??
          >
            End turn
          </button>
        </div>
        <div className="col s6 offset-s3">
          <CardList
            // classes={["CardList"]}
            classes={turn ? ["CardList"] : ["CardList", "disabledTurn"]}
            side="User"
            cards={state.userCards}
            setPopupCard={setPopupCard}
          />
        </div>
        <div className="col s3">
          <BattleProfile
            Avatar={battleInfo.userAvatar}
            HP={battleInfo.userHitPoints}
            RP={battleInfo.userRadianitePoints}
            Login={battleInfo.userLogin}
          />
        </div>
      </div>
    </BattleContext.Provider>
  );
};
