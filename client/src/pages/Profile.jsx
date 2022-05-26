import React, { useEffect, useState, useContext, useCallback } from "react";
import avatar1 from "../assets/newKuzya.jpg";
import "../styles/Profile.css";
import { Modal } from "../components/UI/Modal";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../contexts/AuthContext";
import { Loader } from "../components/Loader";

export const Profile = () => {
  const auth = useContext(AuthContext);
  const [modalActive, setModalActive] = useState(false);
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(avatar1);
  const [userLogin, setUserLogin] = useState('');
  const [userData, setUserData] = useState(null);
  const { loading, request } = useHttp();

  const fetchData = useCallback(async () => {
    try {
      const data = await request("/api/user", "POST", { id: auth.userId });
      console.log(data);
      setUserLogin(data.login);
      setAvatar(data.avatar);
      setDescription(data.description);
      setUserData(data)
    } catch (e) {}
  }, [request, auth.userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangeDescriptionMessage = (event) => {
    setDescriptionMessage(event.target.value);
  };

  const handleDescription = async (event) => {
    event.preventDefault();
    setDescription(descriptionMessage);
    try {
      const data = await request("/api/user/update", "POST", { id: auth.userId, description: descriptionMessage, avatar: 'default.png' }); // TODO: Change avatar
      console.log(data);
    } catch (e) {}
    setDescriptionMessage('');
    setModalActive(false);
    //add here *user_desction = descripion
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2">
        {/*maybe add here s10/12 for profile description*/}
        <h1 style={{ color: "white", textAlign: "center" }}> User Profile</h1>
        <div className="row">
          <div className="col s5 ">
            {/*change here for width (here was s12 m5 -> changed into s5)*/}
            <div className="card">
              <div className="card-image profileBlockImage">
                <img className="profileImage" src={avatar} alt="avatar" />
                <span className="card-title userNickname">
                  {userLogin}
                </span>
              </div>
              <div className="card-content profileBlockContent row">
                <div className="col s10">
                  <p> {description} </p>
                </div>
                <div className="col s2">
                  <button
                    // className="btn waves-effect waves-light changeDescription col s2 offset-s10"
                    className="btn waves-effect waves-light changeDescription"
                    name="action"
                    onClick={() => {
                      setModalActive(true);
                    }}
                  >
                    <i className="material-icons">create</i>
                  </button>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                  <form>
                    <input
                      placeholder="Enter Description"
                      id="description"
                      type="text"
                      onChange={handleChangeDescriptionMessage}
                      value={descriptionMessage}
                      autoComplete="off"
                      maxLength='128'
                    />
                    <button
                      className="btn waves-effect waves-light changeDescription"
                      type="submit"
                      name="action"
                      onClick={handleDescription}
                    >
                      Save
                    </button>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
          <div className="col s7">
            <div className="card-image profileBlockImage">
              <p>Statistics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
