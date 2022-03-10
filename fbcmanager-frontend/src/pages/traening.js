import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss"


const Traening = () => {
  return (
    <div>
      <Navbar />
      <div className="body">
        <h1>Træning</h1>
          <p>Dine træninger:</p>
          <table>
              <tr>
                  <th>Dato</th>
                  <th>Klokkeslæt</th>
                  <th>Træningstype</th>
                  <th>Træner</th>
                  <th>Note</th>
              </tr>
              <tr>
                  <td>11-03-2022</td>
                  <td>08:00</td>
                  <td>Backend</td>
                  <td>Daniel</td>
                  <td>Forelæsnings tid, husk at læse op</td>
              </tr>
          </table>
          <p>Søg efter træninger</p>
      </div>
    </div>
  );
};

export default Traening;
