import React, { useState } from "react";
import { Modal } from "../components/UI/Modal";

export const Home = () => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1
          style={{ textAlign: "center", color: "#afb42b ", fontWeight: "bold" }}
        >
          Welcome to Radianite!
        </h1>
      </div>
      <div className="col s6">
        <button
          className="btn waves-effect waves-light"
          onClick={() => setModalActive(true)}
        >
          button
        </button>
      </div>
      <div className="col s6">nen</div>
      <Modal active={modalActive} setActive={setModalActive}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
          aliquid molestiae. Asperiores cum vero reiciendis ipsam assumenda,
          vel, nesciunt molestiae impedit laborum dolorum at, distinctio quo et
          esse nostrum autem.
        </p>
      </Modal>
    </div>
  );
};
