//SCSS
import "../scss/style.scss";
import "../scss/profileColumn.scss"

import React, {Fragment, PureComponent} from "react";


import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";



//Images
import profile from "../res/img/profile/tmp-profile.png";
import arrow from "../res/img/profile/down-arrow.svg"




export default function Navbar() {
    const membership_status = "Aktiv"
    const league = "U18"
    

    return (
        <div className="profile-column-body">
            <div className="profile-column-profile-container">
                <section className="profile-pic-section">
                    <img src={arrow}/>
                    <img src={profile} className="profile-pic"/>
                </section>
                <p>Mette Frederiksen</p>
                <p>Medlemsskab: {membership_status}</p>
                <p>{league}</p>
            </div>
            <div className="profile-column-news-container">
                <section>
                    <h4>Ny bane!</h4>
                    <p>Se den helt nye baner i fælledparken....</p>
                    <p>03/03/2022 11:47</p>
                </section>
                <section>
                    <h4>Ny bane!</h4>
                    <p>Se den helt nye baner i fælledparken....</p>
                    <p>03/03/2022 11:47</p>
                </section>
                <section>
                    <h4>Ny bane!</h4>
                    <p>Se den helt nye baner i fælledparken....</p>
                    <p>03/03/2022 11:47</p>
                </section>
                <section>
                    <h4>Ny bane!</h4>
                    <p>Se den helt nye baner i fælledparken....</p>
                    <p>03/03/2022 11:47</p>
                </section>
                <section>
                    <h4>Ny bane!</h4>
                    <p>Se den helt nye baner i fælledparken....</p>
                    <p>03/03/2022 11:47</p>
                </section>
            </div>
        </div>
    );
}