import React from "react";

import axios from "axios";

export const getAll = () => {
  return axios.get("http://localhost:8080/all");
  //axios.get("http://localhost:8080/all").then((r) => console.log(r.data));
};

export const updateUser = (userObj) => {
  axios.put("http://localhost:8080/person/", userObj).then((response) => {
    console.log(response.data + "user with id: " + userObj.user_id);
  });
};

export const getUser = (id) => {
  axios.get("http://localhost:8080/person/" + id).then((response) => {
    console.log(response.data);
  });
};

export const deleteUser = (id) => {
  axios.delete("http://localhost:8080/person/" + id).then((response) => {
    console.log(response.data);
  });
};

export const createUser = (userObj) => {
  axios.post("http://localhost:8080/add", userObj).then((res) => {
    console.log(res);
  });
};

export const addRandom = () => {
  console.log("Adding random user");
  let is_active = Math.random() < 0.5;
  let first_name = (Math.random() + 1).toString(36).substring(5);
  let last_name = (Math.random() + 1).toString(36).substring(7);
  let team = (Math.random() + 1).toString(36).substring(10);
  let user_type = Math.floor(Math.random() * 1);
  const userObj = { is_active, first_name, last_name, team, user_type };
  axios.post("http://localhost:8080/add", userObj);
};
