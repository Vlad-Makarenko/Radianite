import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

import { CardList } from "../components/CardList";
import { CardPopup } from "../components/CardPopup";
import { Loader } from "../components/Loader";
import { Table } from "../components/Table";
import { BattleProfile } from "../components/BattleProfile";
import { InfoBlock } from "../components/InfoBlock";
import { GiveUp } from "../components/GiveUp";
import { Result } from "../components/Result";

import { AuthContext } from "../contexts/AuthContext";
import { BattleContext } from "../contexts/BattleContext";

import { useBattle } from "../hooks/battle.hook";
import { useBattleProfile } from "../hooks/battleProfile.hook";

import Game from "../Game/Game";
import Player from "../Game/Player";

const socket = io("http://localhost:5000");

function noop() {}

export const Gameplay = () => {
  const { userId } = useContext(AuthContext);

  const [popupCard, setPopupCard] = useState(null);
  const [result, setResult] = useState();
  const [resaltActive, setResaltActive] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [turn, setTurn] = useState(false);
  const history = useNavigate();

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

    socket.on("gameOver", (data) => {
      setResult(data.result);
      setResaltActive(true);
      setTimeout(() => {
        setResaltActive(false);
        history("/battle");
      }, 3000);
    });
  }, [state, battleInfo, history]);

  if (waiting) {
    return <Loader info={"Waiting for the opponent..."} />;
  }

  return (
    <BattleContext.Provider value={state}>
      <div className="row">
        <div className="col s3">
          {!resaltActive && <GiveUp socket={socket} />}
        </div>
        <div className="col s6">
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
        <Result
          active={resaltActive}
          setActive={setResaltActive}
          status={result}
        />
      </div>
    </BattleContext.Provider>
  );
};
