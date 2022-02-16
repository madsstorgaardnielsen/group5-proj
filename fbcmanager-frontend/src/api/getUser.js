import React, { Component, useState, useEffect } from "react";
import axios from "axios";

const GetUser = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8080/person/" + id)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser({})
      });
  };

  return (
    <div>
      <h2>Get user by id</h2>
      <form onSubmit={handleClick}>
        <label>id</label>
        <input
          type="text"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></input>
        <button type="submit">get</button>
      </form>
      {user.name}
    </div>
  );
};

export default GetUser;
