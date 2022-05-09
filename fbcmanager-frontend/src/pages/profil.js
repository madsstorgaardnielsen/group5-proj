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
import {getFullDateDash} from "../model/DateFormatter";
import LoginPopup from "../components/login_component/Login";

const url = "http://130.225.170.74"
var currentUserId, firstName, surName, city, zip, street, birthdate, email, PhoneNumber = "";
var token = localStorage.getItem("token");

const tokenizedAxios = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${token}` //JWT token from browser
    }
})

// Handler for user first name change event
const handleFirstNameChange = (event) => {
    firstName = event.target.value
    console.log("First name: " + firstName)
}

// Handler for user surname change event
const handleSurnameChange = (event) => {
    surName = event.target.value
    console.log("Surname: " + surName)
}

// Handler for user city change event
const handleCityChange = (event) => {
    city = event.target.value
    console.log("City: " + city)
}

// Handler for user zip code name change event
const handleZipChange = (event) => {
    zip = event.target.value
    console.log("Zip: " + zip)
}

// Handler for user address street and no. change event
const handleStreetChange = (event) => {
    street = event.target.value
    console.log("Street: " + street)
}

// Handler for user email change event
const handleEmailChange = (event) => {
    email = event.target.value
    console.log("Email: " + email)
}

// Handler for user phone number change event
const handlePhoneNumberChange = (event) => {
    PhoneNumber = event.target.value
    console.log("PhoneNumber: " + PhoneNumber)
}

// Handler for user birthdate change event
const handleBirthdayChange = (event) => {
    const eventVal = event.target.value
    birthdate = getFullDateDash(eventVal) // Change date format from YYYY-MM-DDTHH-MM-SS to YYYY-MM-DD
    console.log("Birthdate_DD/MM/YYYY: " + birthdate)
}

//Create new user to db
function postUser() {
    var object = {
        "firstname": "Name",
        "lastname": "Surname",
        "city": "Cityname",
        "zip": "1234",
        "street": "Roadname 25",
        "birthdate": "1995-12-21",
        "teamid": "",
        "email": "danny",
        "PhoneNumber": "1324132413",
        "Password": "string125123",
        "roles": [
            "Admin"
        ]
    }
    tokenizedAxios.post(`/api/User/`, object).then((response) => console.log(response.data)).catch(function (error) { //respone contains the data from post request - "http://130.225.170.74/api/User/"
        if (error.response) { //if error occurs, print error info
            console.log(error.response.data.title);
            console.log(error.response.status);
            console.log(error.response.data);
        }
    })
}

// Edit user information
function editUser() {

    //Detect if fields have been filled correctly before attempting api call
    if (firstName === null || firstName === "" || surName === null || surName === "" || city === null || city === "" || email === null || email === "" || street === null || street === "" || zip === null || zip === "" || PhoneNumber === null || PhoneNumber === "") {
        alert("Every field needs to be filled out");
        return;
    }

    var object = {
        "id": currentUserId,
        "firstname": firstName,
        "lastname": surName,
        "city": city,
        "zip": zip,
        "street": street,
        "birthdate": birthdate,
        "teamid": "",
        "email": email,
        "PhoneNumber": PhoneNumber,
        "Password": "admin",
        "roles": [
            "Admin"
        ]
    }
    console.log(object)
    tokenizedAxios.put(`/api/User/`, object).then((response) => console.log(response.data)).catch(function (error) { //respone contains the data from put request - "http://130.225.170.74/api/User/"
        if (error.response) { //if error occurs, print error info
            console.log(error.response.data.title);
            console.log(error.response.status);
            console.log(error.response.data);
        }
    })
}


export default class Profil extends React.Component {

    state = {
        persons: [],
        name: String
    }

    componentDidMount() {
        tokenizedAxios.get(`/api/User/`)// + currentUserId)
            .then(res => {
                const persons = res.data;
                this.setState({persons});

                currentUserId = persons.id; // update user id
                console.log("Loaded User ID: " + persons.id)

                document.getElementById("inputFirstName").defaultValue = persons.firstname; //update input field
                firstName = persons.firstname; // update variable
                document.getElementById("inputSurname").defaultValue = persons.lastname;
                surName = persons.lastname;
                document.getElementById("inputEmail").defaultValue = persons.email;
                email = persons.email;
                document.getElementById("inputCity").defaultValue = persons.city;
                city = persons.city;
                document.getElementById("inputZip").defaultValue = persons.zip;
                zip = persons.zip;
                document.getElementById("inputStreet").defaultValue = persons.street;
                street = persons.street;
                document.getElementById("inputPhone").defaultValue = persons.phoneNumber;
                PhoneNumber = persons.phoneNumber;

                birthdate = getFullDateDash(persons.birthdate);
                document.getElementById("inputBirthdate").defaultValue = birthdate;

                this.render()

            }).catch(function (error) { //respone contains the data from get request
            if (error.response) { //if error occurs, print error info
                console.log(error.response.data.title);
                console.log(error.response.status);
                console.log(error.response.data);
            }
        })
    }


    render() {

        if (token == null) {//null){ //user is not logged in
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
                                    <div className="centerStat">
                                        <h4>You need to login to access this page<br/>
                                            Please login or create a new user</h4>
                                    </div>
                                </form>

                                <span>

                            <div className="tilmeldBtn">
                                <button type="submit" className="btn btn-primary-lg">
                                   <LoginPopup/>
                                </button>

                                &nbsp;

                                <a href="/signup"><button type="submit" className="btn btn-primary-lg">
                                    <button className="headerTilmeld">Sign up</button>
                                </button></a>
                            </div>

                            <span>{""}</span>

                        </span>

                            </section>

                        </div>
                    </div>
                </div>
            );
        }

        // User is logged in
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
                                            onChange={handleFirstNameChange}
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
                                            onChange={handleSurnameChange}
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
                                            onChange={handleEmailChange}
                                            //value={"mette@frederiksen.dk"}
                                        />
                                    </div>


                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputAddress">Phone no.</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputPhone"
                                            placeholder=""
                                            onChange={handlePhoneNumberChange}
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
                                            onChange={handleStreetChange}
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
                                            onChange={handleCityChange}
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
                                            onChange={handleZipChange}
                                            //value={"1119"}
                                        />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputBirthdate">Birthdate</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="inputBirthdate"
                                            onChange={handleBirthdayChange}
                                            //value='2019-12-22'

                                            //placeholder={2000-11-11}
                                            //value={2000/11/11}
                                        />
                                    </div>
                                </div>
                            </form>

                            <span>

                            <div className="tilmeldBtn">
                                <button type="submit" className="btn btn-primary" onClick={() => editUser()}>
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
                                <p id={"numpractices_no"}>18 </p>
                            </div>

                        </section>

                    </div>
                </div>
            </div>


        );
    };
}

