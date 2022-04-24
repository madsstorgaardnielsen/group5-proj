import React from "react";
import "../scss/profilePage.scss";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import CollapsibleTable from "../components/TrainingsTable";
import profile from "../res/img/profile/tmp-profile.png";
import {Helmet} from 'react-helmet';

function Profil() {
    return (
        <div>
            <Helmet>
                <title>Profile | NemSport</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info">
                <section className="profile-pic-section">
                    <a href="/profil"><img target={"_blank"} src={profile} className="profile-pic"/></a>
                </section>

                <div>
                    {}
                    <section>

                        <form>
                            <h4>Contact information</h4>

                            <div className="form-row">

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="John"
                                        value={"Mette"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">Surname</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Doe"
                                        value={"Frederiksen"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail4"
                                        placeholder="Email"
                                        value={"mette@frederiksen.dk"}
                                    />
                                </div>


                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">Phone no.</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder=""
                                        value={70707070}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="1234 Main St"
                                        value={"Landemærket 11"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputCity"
                                        placeholder={"City name"}
                                        value={"København K"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputZip">Zip code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputZip"
                                        placeholder={"1234"}
                                        value={"1119"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputBirthdate">Birthday</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="inputZip"
                                        //placeholder={2000-11-11}
                                        //value={2000/11/11}
                                    />
                                </div>

                            </div>

                        </form>

                        <span>
                            <div className="tilmeldBtn">
                                <button type="submit" className="btn btn-primary">
                                    Update information
                                </button>
                                &nbsp;  &nbsp;  &nbsp;
                                <button type="submit" className="btn btn-primary">
                                    Change password
                                </button>
                            </div>
                        </span>

                    </section>

                    {}

                    <section>

                        <h4>My training sessions</h4>


                        <span>
                        </span>

                        <button type="button">See complete history</button>

                    </section>

                    {}

                    <section>

                        <h4>My statistics</h4>

                        <div className="centerStat">
                            <p id={"numpractices"} style={{fontWeight: "bold"}}>Number of practices</p>
                        </div>

                        <div className="centerStat">
                            <p id={"numpractices_no"}>150 </p>
                        </div>

                        <span>
                        </span>

                    </section>

                </div>
            </div>
        </div>


    );
};

export default Profil;

