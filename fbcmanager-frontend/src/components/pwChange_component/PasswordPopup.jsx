import React, {useState, useCallback} from "react";
import {useModal} from "react-hooks-use-modal";
import "./style.css";
import axios from 'axios';

const url = "http://130.225.170.74"
var currentUserId, oldPassword, newPassword1, newPassword2 = "";
var token = localStorage.getItem("token");

const tokenizedAxios = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${token}` //JWT token from browser
    }
})


//Get current user id
function getUserId() {
    tokenizedAxios.get(`/api/User/`).then(res => {
        currentUserId = res.data.id; // update user id
        //console.log("Loaded User ID from PWD change: " + res.data.id)
        //console.log(token)
        //console.log(res.data)
        console.log(currentUserId)

    }).catch(function (error) { //respone contains the data from put request - "http://130.225.170.74/api/User/"
        if (error.response) { //if error occurs, print error info
            console.log(error.response.data.title);
            console.log(error.response.status);
            console.log(error.response.data);
        }
    })

    var object = {
        "id": currentUserId,
        "oldpassword": oldPassword,
        "newpassword": newPassword1
    }
    //console.log(object);

}

//Function for api call to change the password in the backend
function changePassword() {

    if (oldPassword == null || newPassword1 == null || newPassword2 == null) { // any of the fields are null
        alert("You need to fill all the fields. Password not changed");
        return;
    }

    if (newPassword1 !== newPassword2) { //new passwords should match
        alert("The new passwords did not match. Password not changed");
        return;
    }

    var object = {
        "id": currentUserId,
        "oldpassword": oldPassword,
        "newpassword": newPassword1
    }
    console.log(object);


    tokenizedAxios.post(`http://130.225.170.74:80/api/User/updatepwd`, object).then((response) => console.log(response.data)).catch(function (error) { //respone contains the data from put request - "http://130.225.170.74/api/User/"
        if (error.response) { //if error occurs, print error info
            console.log(error.response.data.title);
            console.log(error.response.status);
            console.log(error.response.data);
        }
    })
}

// Handler for old password change event
const handleOldPasswordChange = (event) => {
    const eventVal = event.target.value
    oldPassword = eventVal
    console.log("Old Password: " + oldPassword)
}

// Handler for new password 1/2 change event
const handleNewPassword1Change = (event) => {
    const eventVal = event.target.value
    newPassword1 = eventVal
    console.log("New Password1: " + newPassword1)
}

// Handler for new password 2/2 change event
const handleNewPassword2Change = (event) => {
    const eventVal = event.target.value
    newPassword2 = eventVal
    console.log("New Password2: " + newPassword2)
}


const PasswordPopup = () => {
    const [Modal, open, close, isOpen] = useModal("root", {
        preventScroll: true,
        closeOnOverlayClick: true,
    });

    getUserId() // api call to get the user id for the password change

    return (
        <div className="tilmeldBtn">
            <button type="submit" className="btn btn-primary" onClick={open}>
                Change password
            </button>
            <Modal>
                <div className="modalDiv">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Current password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                onChange={handleOldPasswordChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword2">New password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                onChange={handleNewPassword1Change}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword3">Confirm new password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                onChange={handleNewPassword2Change}
                            />
                        </div>
                        <div className="loginBtnDiv">
                            <button type="submit" class="btn btn-primary" onClick={() => changePassword()}>
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default PasswordPopup;
