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
const currentUserId = "37d1c224-ac62-400f-b692-0808fb212022"
var firstName, surName, city, zip, street, birthdate, email, PhoneNumber = "";
var token = localStorage.getItem("token");

const tokenizedAxios = axios.create({
    baseURL: url,
    headers: {
        //Authorization: 'Bearer  + ${token}'//token from browser
        Authorization: 'Bearer ' + current_jwt_token //variable token
    }
})

// Handler for user first name change event
const handleFirstNameChange = (event) => {
    const eventVal = event.target.value
    firstName = eventVal
    console.log("First name: " + firstName)
}

// Handler for user surname change event
const handleSurnameChange = (event) => {
    const eventVal = event.target.value
    surName = eventVal
    console.log("Surname: " + surName)
}

// Handler for user city change event
const handleCityChange = (event) => {
    const eventVal = event.target.value
    city = eventVal
    console.log("City: " + city)
}

// Handler for user zip code name change event
const handleZipChange = (event) => {
    const eventVal = event.target.value
    zip = eventVal
    console.log("Zip: " + zip)
}

// Handler for user address street and no. change event
const handleStreetChange = (event) => {
    const eventVal = event.target.value
    street = eventVal
    console.log("Street: " + street)
}

// Handler for user email change event
const handleEmailChange = (event) => {
    const eventVal = event.target.value
    email = eventVal
    console.log("Email: " + email)
}

// Handler for user phone number change event
const handlePhoneNumberChange = (event) => {
    const eventVal = event.target.value
    PhoneNumber = eventVal
    console.log("PhoneNumber: " + PhoneNumber)
}

// Handler for user birthdate change event
const handleBirthdayChange = (event) => {
    const eventVal = event.target.value
    //birthdate = eventVal
    //console.log("Birthdate_YYYY-MM-DD: " + birthdate)
    // Change date format from YYYY-MM-DD to DD/MM/YYYY
    let year = eventVal.slice(0, 4)
    let month = eventVal.slice(5, 7)
    let day = eventVal.slice(8, 10)
    birthdate = day + '/' + month + '/' + year
    console.log("Birthdate_DD/MM/YYYY: " + birthdate)
}

//Create new user to db
function postUser() {
    var object = {
        "firstname": "Endeligst",
        "lastname": "Virkerst",
        "city": "DetNust",
        "zip": "Taas",
        "street": "Skæbnest",
        "birthdate": "1/3/1999",
        "teamid": "",
        "email": "1342",
        "PhoneNumber": "15312312",
        "Password": "strint125123",
        "roles": [
            "Admin"
        ]
    }
    tokenizedAxios.post("http://130.225.170.74/api/User/", object).then((response) => console.log(response.data)).catch(function (error) { //respone contains the data from post request
        if (error.response) { //if error occurs, print error info
            console.log(error.response.data.title);
            console.log(error.response.status);
            console.log(error.response.data);
        }
    })
}

// Edit user information
function editUser() {

    if (birthdate === null) { // Currently there is an issue with birthdate not being loaded from api. This fixes a potential missing date
        birthdate = "01/01/2022";
    }

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
    tokenizedAxios.put("http://130.225.170.74/api/User/", object).then((response) => console.log(response.data)).catch(function (error) { //respone contains the data from put request
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
        tokenizedAxios.get(`/api/User/` + currentUserId)
            .then(res => {
                const persons = res.data;
                this.setState({persons});

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
                document.getElementById("inputBirthdate").defaultValue = persons.birthdate;
                birthdate = persons.birthdate;

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
                                            type="number"
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
                                        <label htmlFor="inputBirthdate">Birthday</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="inputBirthdate"
                                            onChange={handleBirthdayChange}
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

                            <span></span>

                        </section>

                    </div>
                </div>
            </div>


        );
    };
}

