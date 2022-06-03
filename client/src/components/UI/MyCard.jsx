import React from "react";
import "../../styles/Card.css";

import devour from "../../assets/cards/Devour.png";
import shirt from "../../assets/cards/Shirt.png";

export const MyCard = ({ card, classes }) => {
  let displayName = shirt;
  if (!classes.includes("opponent")) {
    switch (card?.name) {
      case "Devour.png":
        displayName = devour;
        break;
      default:
        displayName = shirt;
        break;
    }
  }

  return <img className={classes.join(" ")} src={displayName} alt="" />;
};
