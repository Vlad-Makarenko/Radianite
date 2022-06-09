import React from "react";

import "../styles/Result.css";
import win from "../assets/Victory.png";
import lose from "../assets/Defeat.png";

export const Result = ({ status, active }) => {
  let displayName = win;
  if (status === "lose") {
    displayName = lose;
  }

  const classes = ["Result"];
  active ? classes.push("active") : classes.push("");
  status === "lose" ? classes.push("ResBackL") : classes.push("ResBackW");
  return (
    <div className={classes.join(" ")}>
      <img
        className={active ? "ResultContainer active" : "ResultContainer"}
        src={displayName}
        alt=""
      />
    </div>
  );
};
