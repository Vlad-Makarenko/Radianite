import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

import { CardList } from "../components/CardList";
import { CardPopup } from "../components/CardPopup";
import { Loader } from "../components/Loader";
import { useBattle } from "../hooks/battle.hook";
import { BattleContext } from "../contexts/BattleContext";
import { Table } from "../components/Table";
import { AuthContext } from "../contexts/AuthContext";
import { BattleProfile } from "../components/BattleProfile";
import { useBattleProfile } from "../hooks/battleProfile.hook";

import Game from "../Game/Game";
import Player from "../Game/Player";
import { InfoBlock } from "../components/InfoBlock";

const socket = io("http://localhost:5000");

function noop() {}

export const Gameplay = () => {
  const { userId } = useContext(AuthContext);

  const [popupCard, setPopupCard] = useState(null); // TODO: обнулять взависимости от счетчика карт
  const [waiting, setWaiting] = useState(true);
  const [turn, setTurn] = useState(false);

  const battleInfo = useBattleProfile();
  const state = useBattle();
  state.socket = socket;

  const room = useParams().id;

  const changeTurn = () => {
    socket.emit("changeTurn");
  };

  useEffect(() => {
    socket.emit("initGame", { room, userId });
  }, [room, userId]);

  useEffect(() => {
    socket.on("waiting", (data) => {
      setWaiting(true);
    });

    socket.on("startGame", (data) => {
      const player = new Player(data.player);
      const opponent = new Player(data.opponent);
      new Game(player, socket, opponent, {
        ...state,
        ...battleInfo,
      });
      setTurn(data.turn);
      setWaiting(false);
    });

    socket.on("changeTurn", (data) => {
      setTurn(data.turn);
    });
  }, [state, battleInfo]);

  if (waiting) {
    return <Loader info={"Waiting for the opponent..."} />;
  }

  return (
    <BattleContext.Provider value={state}>
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
          <InfoBlock
            oppTimer="00:10"
            userTimer="00:10"
            action={changeTurn}
            turn={turn}
          />
        </div>

        <div className="col s6 offset-s3">
          <CardList
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
