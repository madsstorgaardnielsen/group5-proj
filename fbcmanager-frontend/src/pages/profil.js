import React from "react";
import "../scss/profilePage.scss";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import CollapsibleTable from "../components/TrainingsTable";
import profile from "../res/img/profile/tmp-profile.png";
import {Helmet} from 'react-helmet';
import ImagePopup from "../components/imageChange_component/ImagePopup";
import PasswordPopup from "../components/pwChange_component/PasswordPopup";
import axios from 'axios';

const current_jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQURNSU4iLCJpZCI6Ii0xIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2NTI1NDEwMzMsImlzcyI6ImVtcy1hcGkifQ.JXNqeSD58tjdb6QpF7HGiZmm08P8Tm5rcu2zP9DRPH0"
const url = "http://130.225.170.74"
const currentUserId = "27fb41a0-0445-4ca5-a7cc-f0987f03f3b8"
var something = "";

const authAxios = axios.create({
    baseURL: url,
    headers: {
        Authorization: 'Bearer ' + current_jwt_token
    }
})

function change () {
    document.getElementById("status").defaultValue = this.state.persons.firstname;
}


export default class Profil extends React.Component {
    state = {
        persons: [],
        name: String
    }


    componentDidMount() {
        authAxios.get(`/api/User/` + currentUserId)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
                ////console.log(persons.firstname)
                ////something = persons.firstname
                //console.log(something) //(something)
                document.getElementById("inputFirstName").defaultValue = persons.firstname;
                document.getElementById("inputSurname").defaultValue = persons.lastname;
                document.getElementById("inputEmail").defaultValue = persons.email;
                document.getElementById("inputCity").defaultValue = persons.city;
                document.getElementById("inputZip").defaultValue = persons.zip;
                document.getElementById("inputStreet").defaultValue = persons.street;
                document.getElementById("inputPhone").defaultValue = persons.phoneNumber;
                //change();
                this.render()

            })
    }
    //change()

    render() {
    return (
        <div>
            <Helmet>
                <title>Profile | NemSport</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info">

                <div>
                    {}
                    <section>

                        <form>
                            <h4>Profile information</h4>

                            <div className="centerStat">
                                <ImagePopup/>
                            </div>

                            <div className="form-row">

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputFirstName"
                                        placeholder="John"
                                        //value={"Mette"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">Surname</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputSurname"
                                        placeholder="Doe"
                                        //value={"Frederiksen"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="Email"
                                        //value={"mette@frederiksen.dk"}
                                    />
                                </div>


                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">Phone no.</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputPhone"
                                        placeholder=""
                                        //value={70707070}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputStreet"
                                        placeholder="1234 Main St"
                                        //value={"Landemærket 11"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputCity"
                                        placeholder={"City name"}
                                        //value={"København K"}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputZip">Zip code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputZip"
                                        placeholder={"1234"}
                                        //value={"1119"}
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

                                &nbsp;

                                <button type="submit" className="btn btn-primary-lg">
                                    <PasswordPopup/>
                                </button>
                            </div>

                            <span>{""}</span>

                        </span>

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

                        <span></span>

                    </section>

                </div>
            </div>
        </div>


    );
};
}

