import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CreateUser from "./api/createUser";
import GetAllUsers from "./api/getAllUsers";
import DeleteUser from "./api/deleteUser";
import GetUser from "./api/getUser";
import UpdateUser from "./api/updateUser";



class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <UserProfiles /> */}
        {/* <PostUser/> */}
        <CreateUser/>
        <br></br>
        <GetAllUsers/>
        <br></br>
        <DeleteUser/>
        <br></br>
        <GetUser/>
        <br></br>
        <UpdateUser/>
      </div>
    );
  }
}
export default App;
