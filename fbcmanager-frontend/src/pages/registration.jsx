import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss";
import { Helmet } from "react-helmet";
import axios from "axios";
const Registration = () => {
  const [status, setStatus] = useState();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    email: "",
    password: "",
    city: "",
    zip: "",
    street: "",
    phoneNumber: "",
  });

  const SubmitRegistration = async (e) => {
    axios
      .post("http://130.225.170.74:80/api/Auth/register", user)
      .then((res) => {
        console.log(res.status)
        e.preventDefault();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.title);
          console.log(error.response.status);
          console.log(error.response.data);
        }
      });
  };

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
                  placeholder=""
                  onChange={(e) =>
                    setUser((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Kodeord</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder=""
                  onChange={(e) =>
                    setUser((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Fornavn</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder=""
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    firstname: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Efternavn</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder=""
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    lastname: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Telefon nummer</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder=""
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputCity">By</label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    city: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Gade</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder=""
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    street: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Postnummer</label>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    zip: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group col-md-2">
              <label htmlFor="inputBirthdate">Fødselsdato</label>
              <input
                type="date"
                className="form-control"
                id="inputZip"
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    birthdate: e.target.value + "T00:00:00",
                  }))
                }
              />
            </div>
            <div className="tilmeldBtn">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  SubmitRegistration();
                  e.preventDefault();
                  // e.preventDefault();
                  // console.log(user);
                }}>
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
