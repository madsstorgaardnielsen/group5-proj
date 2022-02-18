import React, { Component, useState, useEffect } from "react";
import axios from "axios";

export const GetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    axios.get("http://localhost:8080/all").then((response) => {
      setAllUsers(response.data);
    });
    console.log(allUsers);
  };

  const hideList = () => {
    setAllUsers([]);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8080/person/" + id)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <h2>Get all users</h2>
      <button onClick={handleClick}>Get all</button>
      <button onClick={hideList}>hide list</button>
      {allUsers.map((person) => (
        <ul key={person.id}>
          {person.id}{" "}{person.name}
          {/* <input
            value={name}
            placeholder={person.name}
            onChange={(e) => setName(e.target.value)}
          ></input> */}
          <button value={person.id} onClick={() => handleDelete(person.id)}>
            Delete
          </button>
        </ul>
      ))}
    </div>
  );
};

