import React, { Component, useState, useEffect } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  const handleClick = (e) => {
    const userObj = { id, name };
    e.preventDefault();
    console.log({userObj});
    axios.put("http://localhost:8080/person/", userObj).then((response) => {
      console.log(response.data);
      setResponse(response.data);
    });
  };

  return (
    <div>
      <h2>Update user by id</h2>
      <form onSubmit={handleClick}>
        <label>id</label>
        <input
          type="text"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></input>
        <label>new name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type="submit">update</button>
      </form>
      {response}
    </div>
  );
};

export default UpdateUser;
