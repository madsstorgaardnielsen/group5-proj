import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss";
import { Helmet } from 'react-helmet';

const Registration = () => {
  return (
    <div>
      <Helmet>
        <title>Register | NemSport</title>
      </Helmet>
      <Navbar />
      <div className="body">
        <h1>Tilmelding</h1>
        <div>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Kodeord</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Fornavn</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Hans"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Efternavn</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Hansen"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Telefon nummer</label>
              <input
                type="number"
                className="form-control"
                id="inputAddress"
                placeholder=""
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Adresse</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputCity">By</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Postnummer</label>
              <input type="text" className="form-control" id="inputZip" />
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="inputBirthdate">Fødselsdato</label>
              <input type="date" className="form-control" id="inputZip" />
            </div>
            <div className="tilmeldBtn">
              <button type="submit" className="btn btn-primary">
                Tilmeld
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
