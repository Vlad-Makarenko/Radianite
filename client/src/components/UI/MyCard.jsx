import React, { useEffect, useState } from "react";
import { chooseCard } from "../../tools/card";
import "../../styles/Card.css";

import Shirt from "../../assets/cards/Shirt.png";
import Secret from "../../assets/cards/Secret.png";

export const MyCard = ({ card, classes }) => {
  const [displayName, setDisplayName] = useState(Shirt);
  useEffect(() => {
    console.log(`Card:`, card.status);

    if (!classes.includes("opponent")) {
      if (!classes.includes("user") && card.status === "secret") {
        setDisplayName(Secret);
      } else {
        chooseCard(card, setDisplayName);
      }
    }
  }, [card, classes]);

  return <img className={classes.join(" ")} src={displayName} alt="" />;
};
