import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss"


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="body">
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default Home;
