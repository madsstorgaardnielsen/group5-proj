import React, { Component } from "react";
import Navbar from "../components/Navbar";
import "../style.css";
import axios from "axios";

class Medlemmer extends Component {
  state = {
    medlemmer: [],
  };

  fetchMedlemmer = () => {
    axios.get("http://localhost:8080/all").then((response) => {
      this.setState({medlemmer: response.data})
    });
  };

  populateDb = () => {
    let name = (Math.random() + 1).toString(36).substring(7);
    const userObj = { name };
    axios.post("http://localhost:8080/add", userObj).then((res) => {
    });
    axios.get("http://localhost:8080/all").then((response) => {
      this.setState({medlemmer: response.data})
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="body">
          <button onClick={this.fetchMedlemmer}>Hent medlemmer</button>
          <button onClick={this.populateDb}>add person to db</button>
          <ul className="medlemmerList">
            {this.state.medlemmer.map((medlem) => (
              <li key={medlem.id}>{medlem.id} {medlem.name}</li>
            ))}
          </ul>
          {/* <h1>Medlemmer</h1> */}
        </div>
      </div>
    );
  }
}

export default Medlemmer;
