import React from "react";

import axios from "axios";

export const getAll = async () => {
  var token = localStorage.getItem("token");
  return await axios.get("http://130.225.170.74:80/api/User/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = async (userObj) => {
  await axios.put("http://localhost:8080/person/", userObj).then((response) => {
    console.log(response.data + "user with id: " + userObj.userid);
  });
};

export const searchUser = async (query) => {
  return await axios.get("http://localhost:8080/searchuser/?query=" + query);
};

export const getByActivity = async (bool) => {
  return await axios.get("http://localhost:8080/all/" + bool);
};

export const getUser = async (id) => {
  await axios.get("http://localhost:8080/person/" + id).then((response) => {
    console.log(response.data);
  });
};

export const deleteUser = async (id) => {
  await axios.delete("http://localhost:8080/person/" + id).then((response) => {
    console.log(response.data);
  });
};

export const createUser = async (userObj) => {
  await axios.post("http://localhost:8080/add", userObj).then((res) => {
    console.log(res);
  });
};

export const addRandom = async () => {
  console.log("Adding random user");
  let isactive = Math.random() < 0.5;
  let firstname = (Math.random() + 1).toString(36).substring(5);
  let lastname = (Math.random() + 1).toString(36).substring(7);
  let team = (Math.random() + 1).toString(36).substring(10);
  let usertype = Math.floor(Math.random() * 1);
  const userObj = { isactive, firstname, lastname, team, usertype };
  await axios.post("http://localhost:8080/add", userObj);
};
