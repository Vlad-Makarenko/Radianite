import React, { useEffect, useState } from "react";
import { chooseCard } from "../../tools/card";
import "../../styles/Card.css";

import shirt from "../../assets/cards/Shirt.png";
import Secret from "../../assets/cards/Secret.png";

export const MyCard = ({ card, classes }) => {
  const [displayName, setDisplayName] = useState(shirt);

  useEffect(() => {
    if (!classes.includes("opponent")) {
      chooseCard(card, setDisplayName);
    }
  }, [card, classes]);

  return <img className={classes.join(" ")} src={displayName} alt="" />;
};
