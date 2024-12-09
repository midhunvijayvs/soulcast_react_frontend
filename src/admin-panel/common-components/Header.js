import React, { Component, useState } from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

import LogoutPopup from "../../authentication/LogoutPopup";


const Header = ({ userData, isLoggedIn }) => {

    const [isSecurityModalShow, setSecurityModalShow] = useState(false)
    const [isNotificationSettingsShow, setNotificationSettingsShow] = useState(false)

    const [profileMenuOpen, setProfileMenuOpen] = useState(false)

    const [isLogoutModalShow, setLogoutModalShow] = useState(false)
    let navigate = useNavigate();


    const myFunction = () => {
        var x = document.getElementById("profile-logout-popup");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }

    }

    return (
        <div className="admin-header">

            <div className="left" >
                <img className="app-logo" src="/images/admin-panel/header/app-logo.svg"></img>
            </div>




            <div className="right" >
                
                    <div className="btn-box">
                        <button className="btn btn-borderless" onClick={() => { }}>
                            <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/header/notification.svg`}></img>
                        </button>
                       
                    </div>
                

                {isLoggedIn && (localStorage.getItem("userRole") === "admin") ?
                    <div className="user-box" tabIndex="0" onFocus={() => setProfileMenuOpen(true)} >
                        <div className="img-box">
                            <img src={userData && userData.profile_image ? `https://friendsmalayali.uk${userData.profile_image}` : "/images/admin-panel/header/avatar-no-profile-image.png"} className="rounded"></img>
                        </div>
                        <img src="/images/admin-panel/header/down-arrow.svg"></img>
                        {profileMenuOpen && <ProfileMenu userData={userData} setNotificationSettingsShow={setNotificationSettingsShow} setSecurityModalShow={setSecurityModalShow} setLogoutModalShow={setLogoutModalShow}></ProfileMenu>}
                    </div>
                    :
                    <div className="login-btn-box">

                        <button className="btn btn-primary login-btn " onClick={() => { localStorage.setItem("userRoleRequest", "admin"); navigate('/admin-login') }}>Log In</button>
                        <button className="btn btn-primary signup-btn">Sign Up</button>
                    </div>}

            </div>











        </div>
    )

}

export default Header