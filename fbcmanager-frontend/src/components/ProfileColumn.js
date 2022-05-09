//SCSS
import "../scss/style.scss";
import "../scss/profileColumn.scss"

import React, {Fragment, PureComponent} from "react";


import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";



//Images
import profile from "../res/img/profile/tmp-profile.png";
import arrow from "../res/img/profile/down-arrow.svg"




export default function ProfileColumn() {
    const membership_status = "Aktiv"
    const league = "U18"

    const navigate = useNavigate()

    const toProfile = () => {
        navigate('/profile')
    }

    const toAdmin = () => {
        navigate('/adminPanel')
    }


    function profileMenu(){
        var x = document.getElementById("profile-dropdown");
        var arrow = document.getElementById("profileArrow")
        if (x.style.display === "flex") {
            x.style.display = "none";
            arrow.style.transform = "rotate(0turn)";
        } else {
            x.style.display = "flex";
            arrow.style.transform = "rotate(0.5turn)";
        }

      }
    

    return (
        <div className="">
            <section className="profile-pic-section" >
                <a onClick={profileMenu} id="profileArrow"><img src={arrow}/></a>
                <a href="/profile"><img target={"_blank"} src={profile} className="profile-pic"/></a>
            </section>
            <div className="profile-dropdown" id="profile-dropdown">
                <a onClick={toProfile}>Profil</a>
                <a onClick={toAdmin}>Admin</a>
                {/* <a>Indstillinger</a> */}
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