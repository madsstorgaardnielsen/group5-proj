import React, { Component, useState, useEffect } from "react";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = { name };
    console.log(userObj);
      axios.post("http://localhost:8080/add",userObj).then((res) => {
        console.log(res);
        //setName(res.data);
      });
    // axios.post("http://localhost:8080/add").then((res) => {
    //   console.log(res);
    //   setUser(res.data);
    // });
  };
  // useEffect(() => {
  //   postUser();
  // }, []);

  return (
    <div className="Submit user">
      <h2>Add user</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateUser;
