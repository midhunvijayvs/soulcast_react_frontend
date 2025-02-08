import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer'
import './Layout.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import API from "../../API"
import { UserContext } from '../../authentication/pages/UserContext';


import Home from '../pages/Home/Home';
import ResumePreview from '../pages/ResumePreview/ResumePreview';
import ResumeList from '../pages/ResumeList/ResumeList';
import ContactUs from '../pages/ContactUs/ContactUs';

import ToolsHome from '../pages/ToolsHome/ToolsHome';




 



import Profile from '../pages/Profile/Profile';
import FAQContact from '../pages/FAQContact/FAQContact';


import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import CookiePolicy from '../pages/CookiePolicy/CookiePolicy';
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
import InformationSecurityPolicy from '../pages/InformationSecurityPolicy/InformationSecurityPolicy';


import NoPage from '../pages/NoPage/NoPage';


import { Navigate, useNavigate } from 'react-router-dom';


const Layout = () => {
  const navigate = useNavigate()

  const [showCookieBar, setShowCookieBar] = useState(true)
  const [userData, setUserData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);

  const [navSelected, setNavSelected] = useState(null)

  const [isNotificatioShown, setNotificationShown] = useState(false)

  const [isNotificationSettingsShow, setNotificationSettingsShow] = useState(false)
  const [isSecurityModalShow, setSecurityModalShow] = useState(false)

  const [navOpen, setnavOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const { isLoggedIn, login, logout } = useContext(UserContext);

  const [categorySelected, selectCategory] = useState(null);
  const [subCategorySelected, selectSubCategory] = useState(null);
  const [brandSelected, selectBrand] = useState(null);
  const [tripwiseAvailability, setTripwiseAvailability] = useState(null);
  const [searchKey, setSearchKey] = useState(null);

  const [activePage, setActivePage] = useState("home");




  const navLeft = () => {
    setNavSelected(null)

  }
  useEffect(() => {

  }, [])
  const loadUserData = () => {
    API.get(`/users/${window.localStorage.getItem('userID')}`)
      .then(response => {

        setUserData(response.data)

      })
      .catch(error => {
        console.error(error);
      });


  }

  const loadNotificatiosData = () => {

    API.get(`notifications/${window.localStorage.getItem('userID')}/`)
      .then(response => {
        setNotificationData(response.data)
        console.log("notification data from layout", response.data)
      }
      )

      .catch(error => {
        console.error(error);
      })
  }


  useEffect(() => {
    loadUserData();
    loadNotificatiosData()
  }, [])




  return (

    <>

      <Header userData={userData} isLoggedIn={isLoggedIn} setSearchKey={setSearchKey} selectCategory={selectCategory}></Header>
      
      <div className='app-content'>
        <Routes>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home/>} />
          
          <Route path="tools-home" element={<ToolsHome />} />
          <Route path="resume-list" element={<ResumeList />} />
          <Route path="resume-preview/:id" element={<ResumePreview />} />
          <Route path="contact-us" element={<ContactUs />} />



         
          
     
           <Route path="privacy-policy" element={<PrivacyPolicy />} />
           <Route path="terms-and-conditions" element={<TermsAndConditions />} />
           <Route path="cookie-policy" element={<CookiePolicy />} />
           <Route path="information-security-policy" element={<InformationSecurityPolicy />} />
          
          <Route path="*" element={<NoPage />} />

        </Routes>

      </div>
      <Footer></Footer>



    </>
  )
}


export default Layout