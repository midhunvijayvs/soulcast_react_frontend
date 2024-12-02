
import React, { useState,useContext } from 'react';
import "../CustomPopup.css";
import API from '../API'
import FixedOverlayLoadingSpinner from "../FixedOverlayLoadingSpinner"
import { useNavigate } from 'react-router-dom';

import { UserContext } from './pages/UserContext';
import ErrorModal from "../ErrorModal";

const LocationCollectionPopup = ({setterFunction}) => {
    
  let navigate = useNavigate();
  
  
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, login, logout } = useContext(UserContext);
    

    

    

   
    const handleLogout = () => {
        logout();
        setterFunction(false)

        setTimeout(navigate("/home"), 1000)
    }

    return (
        <div className='custom-modal logout-modal'>
            <div className='card'>
               
                    <div className='first-screen'>
                        <img src='/images/authentication-screens/logout-popup-icon.svg'></img>
                        <h1>Logout</h1>
                        <p>Are you sure you want to logout?</p>
                        
                        <div className='footer'>
                        <button type='button' className='cancel-button' onClick={()=>{setterFunction(false)}}>Cancel</button>
                        <button type='button' className='ok-button' onClick={handleLogout}>Yes, Logout</button>

                        </div>
                    </div>
                    
            </div>
            <ErrorModal message={message} state={isErrorModalOpen} setterFunction={setIsErrorModalOpen} okClickedFunction={() => { window.location.reload() }} />
            {isLoading && <FixedOverlayLoadingSpinner />}

        </div>
    );
};

export default LocationCollectionPopup;

