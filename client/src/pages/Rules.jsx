import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";

import { Loader } from "../components/Loader";
import { MyCard } from "../components/UI/MyCard";

import "../styles/Rules.css";

export const Rules = () => {
  const [cards, setCards] = useState([]);

  const { loading, request } = useHttp();

  const fetchData = useCallback(async () => {
    let data = await request("/api/card", "POST");
    const uniqueArray = data.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );
    uniqueArray.forEach((card) => {
      card.status = "public";
    });
    setCards(uniqueArray);
  }, [request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loader info={"Loading cards..."} />;
  }

  return (
    <div className="row Rules">
      <div className="col s4">
        <h1>HERE Rules</h1>
      </div>
      <div className="col s8">
        <h1>All cards:</h1>
        <div className="CardContainer">
          {cards.map((data, index) => (
            <div key={index} className="CardImgContainer">
              <MyCard card={data} classes={["RulesCard"]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
