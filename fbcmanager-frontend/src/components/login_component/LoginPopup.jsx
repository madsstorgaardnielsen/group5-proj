import React, { useState, useCallback, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";
import "./style.css";
// import { attemptLogin } from "fbcmanager-frontend/src/services/login_service";

import axios from "axios";

const LoginPopup = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = async (e) => {
    console.log("test");
    var loginObj = { email: username, password: password };
    console.log(loginObj);
    axios
      .post("http://130.225.170.74:80/api/Auth/login", loginObj)
      .then((res) => {
        // console.log(res.status);
        localStorage.setItem("token", res.data["token"]);
        close(true);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.title);
          console.log(error.response.status);
          console.log(error.response.data);
        }
      });

    e.preventDefault();
  };

  return (
    <div>
      <button className="headerLogin" onClick={open}>
        Login
      </button>
      <Modal>
        <div className="modalDiv">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="username"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                err
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="loginBtnDiv">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => attemptLogin(e)}>
                Login
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPopup;
