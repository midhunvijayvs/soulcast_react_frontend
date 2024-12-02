import React from "react";
import {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../authentication/pages/UserContext';

import './ProfileMenu.css';
const View = ({ userData, setNotificationSettingsShow,setSecurityModalShow, setLogoutModalShow}) => {

    let navigate = useNavigate();
    const { isLoggedIn, login, logout } = useContext(UserContext);
   
   
    return (
        <div className="profile-menu">
            {isLoggedIn&&userData?
            <div className="header">
            <div className="img-circle">
                <img src={userData.profile_image ?`https://friendsmalayali.uk${userData.profile_image}`:"/images/profile/avatar-no-profile-image.png"}></img>
            </div>
            <div className="text-box">
                <h4>{userData.first_name} {userData.last_name}</h4>
                <p>{userData.email}</p>
            </div>
        </div>
        :
        <div className="header">
        <div className="img-circle">
            <img src="/images/profile/avatar-no-profile-image.png"></img>
        </div>
        <div className="text-box">
            <h4>Hello There</h4>
            <p>Please login or SignUp</p>
        </div>
    </div>}
            <div className="body">
                <button className="btn btn-secondary" onClick={()=>navigate("/admin/admin-profile")}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.2207 22.9355C4.2207 20.8138 5.06356 18.779 6.56385 17.2787C8.06414 15.7784 10.099 14.9355 12.2207 14.9355C14.3424 14.9355 16.3773 15.7784 17.8776 17.2787C19.3778 18.779 20.2207 20.8138 20.2207 22.9355H4.2207ZM12.2207 13.9355C8.9057 13.9355 6.2207 11.2505 6.2207 7.93555C6.2207 4.62055 8.9057 1.93555 12.2207 1.93555C15.5357 1.93555 18.2207 4.62055 18.2207 7.93555C18.2207 11.2505 15.5357 13.9355 12.2207 13.9355Z" fill="#325A3E" />
                    </svg>
                    Edit Profile</button>
                
                <button className="btn btn-secondary" onClick={()=>setNotificationSettingsShow(true)}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.2207 17.9043H22.2207V19.9043H2.2207V17.9043H4.2207V10.9043C4.2207 8.78257 5.06356 6.74773 6.56385 5.24744C8.06414 3.74715 10.099 2.9043 12.2207 2.9043C14.3424 2.9043 16.3773 3.74715 17.8776 5.24744C19.3778 6.74773 20.2207 8.78257 20.2207 10.9043V17.9043ZM9.2207 21.9043H15.2207V23.9043H9.2207V21.9043Z" fill="#325A3E" />
                    </svg>
                    Notification</button>
                
                
                <button className="btn btn-secondary"  onClick={()=>setSecurityModalShow(true)}>
                    <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg"  onClick={()=>navigate("/profile")}>
                        <path d="M15.2207 7.1543H17.2207C17.4859 7.1543 17.7403 7.25965 17.9278 7.44719C18.1153 7.63473 18.2207 7.88908 18.2207 8.1543V20.1543C18.2207 20.4195 18.1153 20.6739 17.9278 20.8614C17.7403 21.0489 17.4859 21.1543 17.2207 21.1543H1.2207C0.955487 21.1543 0.701133 21.0489 0.513596 20.8614C0.32606 20.6739 0.220703 20.4195 0.220703 20.1543V8.1543C0.220703 7.88908 0.32606 7.63473 0.513596 7.44719C0.701133 7.25965 0.955487 7.1543 1.2207 7.1543H3.2207V6.1543C3.2207 4.563 3.85284 3.03687 4.97806 1.91166C6.10328 0.786438 7.6294 0.154297 9.2207 0.154297C10.812 0.154297 12.3381 0.786438 13.4633 1.91166C14.5886 3.03687 15.2207 4.563 15.2207 6.1543V7.1543ZM13.2207 7.1543V6.1543C13.2207 5.09343 12.7993 4.07601 12.0491 3.32587C11.299 2.57572 10.2816 2.1543 9.2207 2.1543C8.15984 2.1543 7.14242 2.57572 6.39228 3.32587C5.64213 4.07601 5.2207 5.09343 5.2207 6.1543V7.1543H13.2207ZM8.2207 13.1543V15.1543H10.2207V13.1543H8.2207ZM4.2207 13.1543V15.1543H6.2207V13.1543H4.2207ZM12.2207 13.1543V15.1543H14.2207V13.1543H12.2207Z" fill="#325A3E" />
                    </svg>
                    Security</button>
                

            </div>

            <div className="footer">
                <button className="btn btn-secondary"  onClick={()=>setLogoutModalShow(true)}><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3078 17.9634C13.5364 18.1635 13.7935 18.2492 14.0506 18.2492C14.3649 18.2492 14.6792 18.1063 14.9079 17.8492L18.5079 13.6775C18.8794 13.249 18.8794 12.6204 18.5079 12.1917L14.9079 8.02021C14.5079 7.5345 13.7651 7.47728 13.3079 7.906C12.8222 8.30601 12.7649 9.0488 13.1937 9.50601L15.1652 11.7919L7.93637 11.7917C7.30778 11.7917 6.79358 12.3059 6.79358 12.9345C6.79358 13.563 7.30778 14.0772 7.93637 14.0772H15.1652L13.1937 16.3631C12.7651 16.849 12.8224 17.5633 13.3081 17.9633L13.3078 17.9634Z" fill="white" />
                    <path d="M21.6225 9.25018C21.8511 9.82158 22.5369 10.1074 23.1083 9.87877C23.6797 9.65017 23.9656 8.96435 23.7369 8.39295C21.8798 3.84999 17.5081 0.935547 12.6223 0.935547C5.99345 0.935547 0.621826 6.30717 0.621826 12.936C0.621826 19.5648 5.99345 24.9364 12.6223 24.9364C17.5082 24.9364 21.8797 22.022 23.7369 17.479C23.9655 16.9076 23.7084 16.2218 23.1083 15.9932C22.5369 15.7646 21.8511 16.0217 21.6225 16.6218C20.1082 20.2792 16.5938 22.6506 12.6222 22.6506C7.27915 22.6506 2.90757 18.279 2.90757 12.9359C2.90757 7.59287 7.27915 3.22129 12.6222 3.22129C16.5938 3.22109 20.1082 5.59265 21.6225 9.25008V9.25018Z" fill="white" />
                </svg>
                    Logout</button>
            </div>
        </div>
    )
}

export default View;