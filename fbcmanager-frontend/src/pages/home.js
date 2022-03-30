import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss"
import "../scss/homePage.scss"


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="body">
        <div className="grid-container-home">
          <div className="grid-item-home">
            
            {/* next practice */}
            <div className="next-practice">
              <p className="h">Næste træning</p>
              <h1>Træning for seniorer</h1>

              {/* info container */}
              <div className="practice-info-container">
                <section>
                  <p>25 oktober</p>
                  <h3>Mandag</h3>
                  <p>16:00 - 17:30</p>
                </section>
                <section>
                  <p><img></img></p>
                </section>
                <section>
                  <p>test</p>
                </section>
              </div>

            </div>

            {/* Calendar */}
            <div className="home-calendar">

            </div>

            {/* Events */}
            <div>

            </div>
          </div>
          <div className="grid-item-home">
            {/* Profile */}
            <div>

            </div>

            {/* News */}
            <div>

            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Home;
