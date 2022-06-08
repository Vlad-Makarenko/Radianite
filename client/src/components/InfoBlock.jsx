import React from "react";

import "../styles/InfoBlock.css";

export const InfoBlock = ({
  oppTimer = "00:00",
  turn,
  userTimer = "00:00",
  action,
}) => {
  return (
    <div className="InfoBlock">
      <div className="col s12 OppTimer">
        <span>{oppTimer}</span>
      </div>
      <div className="col s12 TurnBlock">
        <button
          className="btn waves-effect waves-light orange TurnButton"
          onClick={action}
          disabled={!turn}
        >
          End turn
        </button>
      </div>
      <div className="col s12 TextInfBlock">
        {turn ? (
          <span className="TurnText" style={{ color: "greenyellow" }}>
            Your turn
          </span>
        ) : (
          <span className="TurnText" style={{ color: "red" }}>
            Opponent turn
          </span>
        )}
      </div>

      <div className="col s12 UserTimer">
        <span>{userTimer}</span>
      </div>
    </div>
  );
};
