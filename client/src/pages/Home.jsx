import React, { useState, useEffect } from "react";
import { useMessage } from "../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";
import { Modal } from "../components/UI/Modal";
import "../styles/Home.css";
import { MyForm } from "../components/UI/MyForm";

function noop() {}

export const Home = () => {
  const [JmodalActive, setJModalActive] = useState(false);
  const [CmodalActive, setCModalActive] = useState(false);

  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const createHandler = async () => {
    try {
      const data = await request("/api/room/create", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const joinHandler = async () => {
    try {
      const data = await request("/api/room/join", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 center">
        <div
          className="createRoom waves-effect waves-light"
          onClick={() => setCModalActive(true)}
        ></div>
      </div>
      <div className="col s6 center">
        <div
          className="joinRoom waves-effect waves-light"
          onClick={() => setJModalActive(true)}
        ></div>
      </div>
      <Modal active={JmodalActive} setActive={setJModalActive}>
        <MyForm
          action={"Join Room!"}
          form={form}
          changeHandler={changeHandler}
          loading={loading}
          actionHandler={noop}
        />
      </Modal>
      <Modal active={CmodalActive} setActive={setCModalActive}>
        <MyForm
          action={"Create Room!"}
          form={form}
          changeHandler={changeHandler}
          loading={loading}
          actionHandler={noop}
        />
      </Modal>
    </div>
  );
};
