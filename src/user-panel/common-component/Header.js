import React, {useEffect, useState } from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import LogoutPopup from "../../authentication/LogoutPopup";
import $ from 'jquery';
import NavPane from './NavPane/NavPane';


const Header = ({ userData, isLoggedIn, setSearchKey, selectCategory }) => {

  const navigate = useNavigate();

  const [isLogoutModalShow, setLogoutModalShow] = useState(false)


  const [isNavpaneOpen, setNavPaneOpen] = useState(false);

  const[currentPageIndex, setCurrentPageIndex]=useState(0);

  // For Security popup, not implemented, but the states are just to make the switch UI work

useEffect(()=>{

setCurrentPageIndex(localStorage.getItem("currentPageIndex"))
},[])

  useEffect(() => {
    if (isNavpaneOpen) {
      $(".nav-pane").animate({ left: "0vw" })
      // $(".nav-pane").animate({ width: "100vw" })
    }
    else {
      // $(".nav-pane").animate({ width: "0%" })
      $(".nav-pane").animate({ left: "100vw" })


    }
  }, [isNavpaneOpen])


  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const header = document.getElementById('header');
  //       const headerRect = header.getBoundingClientRect();
  //       const elementsUnderHeader = document.elementsFromPoint(headerRect.left + headerRect.width / 2, headerRect.bottom + 1);
  //       const divUnderneathElements = elementsUnderHeader.filter(element => element.id !== 'header');

  //       if (divUnderneathElements.length > 0) {
  //         let totalRed = 0;
  //         let totalGreen = 0;
  //         let totalBlue = 0;

  //         divUnderneathElements.forEach(element => {
  //           const computedStyle = window.getComputedStyle(element);
  //           const backgroundColor = computedStyle.backgroundColor;

  //           // Parse background color into RGB components
  //           const [red, green, blue] = backgroundColor.match(/\d+/g).map(Number);

  //           totalRed += red;
  //           totalGreen += green;
  //           totalBlue += blue;
  //         });

  //         const averageRed = Math.round(totalRed / divUnderneathElements.length);
  //         const averageGreen = Math.round(totalGreen / divUnderneathElements.length);
  //         const averageBlue = Math.round(totalBlue / divUnderneathElements.length);

  //         const invertedRed = 255 - averageRed;
  //   const invertedGreen = 255 - averageGreen;
  //   const invertedBlue = 255 - averageBlue;

  //   setHeaderBackground(`rgb(${invertedRed}, ${invertedGreen}, ${invertedBlue})`);
  // } else {
  //   // If there are no divs underneath, set default background color
  //   setHeaderBackground('transparent');
  // }


  //     }
  //     window.addEventListener('scroll', handleScroll);

  //     // Clean up event listener
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, []);


  useEffect(() => {
    const handleScroll = () => {

      const scrollPosition = window.scrollY;

      // Check if scroll position is at 100vh
      if (scrollPosition >= 5) {
    $(".header").addClass("shrinked");
      } else {
    $(".header").removeClass("shrinked");

      }


    }
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);





  return (
    <div className='header' id='header' >

      <img className='app-logo' onClick={() => navigate('/')} role='button' src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/header/app-logo-header.svg`} alt='logo'></img>

      <div className='text-menu-box'>
        <span onClick={()=>{localStorage.setItem("currentPageIndex",1); setCurrentPageIndex(1); navigate("/why-zog-global")}} className={currentPageIndex===1&&"active"}>WHY SOULCAST</span>
        <span onClick={()=>{localStorage.setItem("currentPageIndex",6);setCurrentPageIndex(6); navigate("/insights")}} className={currentPageIndex===6&&"active"}>INSIGHTS</span>
        <span onClick={()=>{localStorage.setItem("currentPageIndex",7);setCurrentPageIndex(7); navigate("/contact-us")}} className={currentPageIndex===7&&"active"}>CONTACT</span>
      </div>
      <button className='login-btn' onClick={() => { localStorage.setItem("userRoleRequest", "user"); localStorage.setItem('LoginRedirectURL', `/`); navigate('/login') }}><img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/header/login-icon.svg`}></img></button>
      <button className='hamburger-btn' onClick={() => setNavPaneOpen(true)}><img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/header/hamburger-icon.svg`}></img></button>



      <NavPane setterFunction={setNavPaneOpen}></NavPane>
      {isLogoutModalShow && <LogoutPopup setterFunction={setLogoutModalShow}></LogoutPopup>}

    </div>
  )
}


export default Header


