import React, { Component } from 'react'
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import './Layout.scss';
import LeftNavbar from './LeftNavbar'
import Header from './Header';

import { UserContext } from '../../authentication/pages/UserContext';
import { useNavigate } from 'react-router-dom';

import API from '../../API';
import { Navigate } from 'react-router-dom';

import Profile from '../pages/Profile/Profile'
import Overview from '../pages/Overview/Overview';
import InvoiceList from '../pages/InvoiceList/InvoiceList';
import InvoiceCreate from '../pages/InvoiceCreate/InvoiceCreate';

import InvoiceConfirm from '../pages/InvoiceConfirm/InvoiceConfirm';



const Layout = () => {


  let navigate = useNavigate();


  const [userData, setUserData] = useState(null);
  const [notificationData, setNotificationData] = useState();

  const [isNotificationSettingsShow, setNotificationSettingsShow] = useState(false)
  const [isSecurityModalShow, setSecurityModalShow] = useState(false)
  const [isLogoutModalShow, setLogoutModalShow] = useState(false)


  const submitNotification = () => {
    setNotificationSettingsShow(false)
  }




  const [navOpen, setnavOpen] = useState(false);

  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const { isLoggedIn, login, logout } = useContext(UserContext);

  const toggleLeftNav = () => {
    setnavOpen(!navOpen)
  }


  const loadUserData = () => {
    API.get(`/users/${window.localStorage.getItem('userID')}`)
      .then(response => {

        setUserData(response.data)
        console.log("userdata from adminlayout", userData)
      })

      .catch(error => {
        console.error(error);
      });
  }

  const loadNotificatiosData = () => {
    API.get(`notifications/${window.localStorage.getItem('userID')}/`)
      .then(response => {
        setNotificationData(response.data)
      }

      )

      .catch(error => {
        console.error(error);
      })
  }


  useEffect(() => {
    if (localStorage.getItem("userRole") === "admin") {
      loadUserData();
    }
    loadNotificatiosData()
  }, [])



  const myFunction = () => {
    document.getElementsByClassName("navbar-left")[0].classList.toggle("open");
  
  }




  return (
    <div className='admin-layout'>


      <LeftNavbar></LeftNavbar>

      <div className='rhs'>
        <Header userData={userData} isLoggedIn={isLoggedIn}></Header>

        {isLoggedIn && (window.localStorage.getItem("userRole") === "admin") ?

          <div className='app-content'>
            <Routes>
              <Route index element={<Overview />} />

              <Route path="profile" element={<Profile />} />



              


              <Route path="invoice/list" element={<InvoiceList />} />
              <Route path="invoice/add/service" element={<InvoiceCreate invoiceType={'service'} />} />
              <Route path="invoice/add/product" element={<InvoiceCreate invoiceType={'product'} />} />
              <Route path="invoice/add/contract" element={<InvoiceCreate invoiceType={'contract'} />} />
              <Route path="invoice/add/custom" element={<InvoiceCreate invoiceType={'custom'} />} />
              <Route path="invoice/confirm" element={<InvoiceConfirm />} />

            </Routes>
          </div>
          :
          <div className="auth-mask">
            <p>Please login as Admin to continue</p>
          </div>
        }

      </div>
    </div>


  )

}

export default Layout