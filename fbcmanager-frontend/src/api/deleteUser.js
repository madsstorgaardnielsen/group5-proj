import React, { Component, useState, useEffect } from "react";
import axios from "axios";

const DeleteUser = () => {
  const [id, setId] = useState("");
  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete("http://localhost:8080/person/" + id).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="Delete user">
      <h2>Delete user by id</h2>
      <form onSubmit={handleDelete}>
        <label>id</label>
        <input
          type="text"
          pattern="[0-9]*"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></input>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeleteUser;
