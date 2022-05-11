import {React, useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import "../scss/forside.scss";
import "../scss/style.scss";
import img1 from "../res/img/forside/team.jpg";
import img3 from "../res/img/forside/bkskjold.jpg";
import img2 from "../res/img/forside/fieldgras.jpeg";

function Forside() {
  var token = localStorage.getItem("token");

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
        .get("http://130.225.170.74:80/api/User", {
          headers: { Authorization: `Bearer ${token}` },
        })
        // .then((response) => console.log(response.data))
        .then((response) => {
          setUser(response.data);
        });
  }, [setUser]);

  const navigate = useNavigate();

  const toHome = () => {
    navigate("/home");
  };

  const toRegistrationPage = () => {
    navigate("/signup");
  };

  const toLoginPage = () => {
    navigate("/signin");
  };

  const toProfilePage = () => {
    navigate("/profile");
  };

  return (
      <div>
        <Helmet>
          <title>NemSport</title>
        </Helmet>
        <Navbar />
        <div className="body">
          <header className="frontPageHeader">
            <div className="headerWrapper">
              <section>
                <h1 className="mainHeader">Velkommen til NemSport</h1>
                <p className="mainDescription">
                  Danmarks største fodboldklub gjort nem
                </p>
                {token !== null ? (
                    <button className="headerLogin" onClick={toProfilePage}>
                      Velkommen {user.firstname}!
                    </button>
                ) : (
                    <button className="headerLogin" onClick={toLoginPage}>
                      Login
                    </button>
                )}
                {token !== null ? null : (
                    <button className="headerTilmeld" onClick={toRegistrationPage}>
                      Tilmeld
                    </button>
                )}
              </section>
            </div>
          </header>

          <div className="grid-container-frontpage">
            <section className="grid-item-frontpage">
              <img src={img1} alt={"bkskjold"}/>
              <section>
                <h4>Danmarks største fodboldklub</h4>
                <p>NemSport er en del af BKSkjold sport.</p>
                <p>Vi holder til i Telia Parken</p>
              </section>
            </section>
            <section className="grid-item-frontpage">
              <img src={img2}/>
              <section>
                <h4>Helt nye kunstbaner</h4>
                <p>Parken har netop fået helt nye kunstbaner</p>
                <p>Vi holder til i Telia Parken</p>
              </section>
            </section>
            <section className="grid-item-frontpage">
              <img src={img3}/>
              <section>
                <h4>Tilmeld dig nemt og hurtigt</h4>
                <p>Hos NemSport er det lidt nemmere</p>
                <p>Vi holder til i Telia Parken</p>
              </section>
            </section>
          </div>
        </div>
      </div>
  );
}
export default Forside;