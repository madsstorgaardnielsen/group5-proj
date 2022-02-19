import React from "react";

import axios from "axios";

export const getAll = () => {
  return axios.get("http://localhost:8080/all");
};

export const updateUser = (userObj) => {
  axios.put("http://localhost:8080/person/", userObj).then((response) => {
    console.log(response.data);
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
  let name = (Math.random() + 1).toString(36).substring(7);
  const userObj = { name };
  axios.post("http://localhost:8080/add", userObj);
};
