//SCSS
import "../scss/style.scss";
import "../scss/profileColumn.scss"

import React, {Fragment, PureComponent} from "react";


import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";



//Images
import profile from "../res/img/profile/tmp-profile.png";
import arrow from "../res/img/profile/down-arrow.svg"




export default function profileColumn() {
    const membership_status = "Aktiv"
    const league = "U18"


    function profileMenu(){
        var x = document.getElementById("profile-dropdown");
        if (x.style.display === "flex") {
            x.style.display = "none";
        } else {
            x.style.display = "flex";
        }

      }
    

    return (
        <div className="">
            <section className="profile-pic-section" >
                <a onClick={profileMenu}><img src={arrow}/></a>
                <a href="/profil"><img target={"_blank"} src={profile} className="profile-pic"/></a>
            </section>
            <div className="profile-dropdown" id="profile-dropdown">
                <a>Profil</a>
                <a>Indstillinger</a>
                <a>Admin</a>
            </div>
            <div className="profile-column-body" id="profile-column">
                <div className="profile-column-profile-container">
                    
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
            
        </div>
    );
}