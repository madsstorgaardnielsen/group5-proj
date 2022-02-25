import React from "react";
import Navbar from "../components/Navbar";
import "../scss/forside.scss";
import "../scss/style.scss";




const Forside = () => {
  return (
    <div>
      <Navbar />
      <header className="frontPageHeader">
        <div className="headerWrapper">
          <section>
            <h1 className="mainHeader">Velkommen til NemSport</h1>
            <p className="mainDescription">Danmarks største fodbold klub gjort nem</p>
            <button className="headerLogin">Login</button>
          </section>
        </div>
      </header>
    </div>
  );
};

export default Forside;
