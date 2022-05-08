import React from "react";

import axios from "axios";

export const attemptLogin = async () => {
  var loginObj = { email: "admin", password: "admin" };
  return await axios
    .post("http://130.225.170.74:80/api/Auth/login", loginObj)
    .then((res) => {
      console.log(res);
    });
  //axios.get("http://localhost:8080/all").then((r) => console.log(r.data));
};
