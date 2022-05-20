import React, { useEffect, useState } from "react";
import { CardList } from "../components/CardList";
import { CardPopup } from "../components/CardPopup";
import { Loader } from "../components/Loader";
import { useHttp } from "../hooks/http.hook";

function noop() {}

export const Battle = () => {
  const [popupCard, setPopupCard] = useState(null); // TODO: обнулять взависимости от счетчика карт
  const [cards, setCards] = useState([]);
  const { request, loading } = useHttp();

  const [UserCards, setUserCards] = useState([]);
  const [OppCards, setOppCards] = useState([]);

  console.log("Battle USER CARDS:", UserCards)

  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    const data = await request("/api/card", "POST");
    setCards(data);
    console.log(data);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <CardList
        classes={["CardList"]}
        side="Opponent"
        allCards={cards}
        setPopupCard={noop}
        setTableCards={setOppCards}
        TableCards={OppCards}
      />
      {OppCards.length && (
        <CardList
          classes={["OppOnTable", "Table"]}
          side="User"
          allCards={OppCards}
          setPopupCard={popupCard}
        />
      )}
      {popupCard && <CardPopup popupCard={popupCard} />}
      {UserCards.length && (
          console.log("UserCards:", UserCards),
        <CardList
          classes={["UserOnTable", "Table"]}
          side="User"
          allCards={UserCards}
          setPopupCard={popupCard}
        />
      )}
      <CardList
        classes={["CardList"]}
        side="User"
        allCards={cards}
        setPopupCard={setPopupCard}
        setTableCards={setUserCards}
        TableCards={UserCards}

      />
    </div>
  );
};
