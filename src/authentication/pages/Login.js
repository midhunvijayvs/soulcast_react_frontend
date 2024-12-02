import React, { Component, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Authentication.scss';
import { useState } from "react";
import $ from 'jquery';
// import { GoogleLogin } from '@react-oauth/google';

import API from '../../API';

import { useContext } from 'react';
import { UserContext } from './UserContext';

import ErrorModal from "../../ErrorModal";
import AuthBanner from './AuthBanner';

<script src="https://accounts.google.com/gsi/client" async defer></script>

const Login = () => {
  const { login, isOTPInputShown, showOTPInput, otpTimer, otpTimeout, setRedirectUrl } = useContext(UserContext);

  // Function to check localStorage redirect URL and redirect if available
  const checkRedirectUrl = () => {
    const redirectUrl = localStorage.getItem('LoginRedirectURL');
    if (redirectUrl) {
      setRedirectUrl(redirectUrl);
    } else {
      setRedirectUrl('/');
    }
  };
  useEffect(() => {
    checkRedirectUrl();
  }, []);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    $(function () {
      $(window).scrollTop(0);
    });
  }, [])


  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });

  const [passwordShown, showPassword] = useState(false);





  const [errors, setErrors] = useState({});

  const [OTP, setOTP] = useState([null, null, null, null, null, null])


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOTPInputShown) {  // for login button
      // Validate the form fields
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {



        login(formData); // Call the login function from UserContext

      }
    }
    else {   //for OTP SUBMIT BUTTON.
      if (OTP[0] && OTP[1] && OTP[2] && OTP[3] && OTP[4] && OTP[5]) {
        setErrors({})
        login(

          {
            "user_id": window.localStorage.getItem("userID"),
            "otp": `${OTP[0]}${OTP[1]}${OTP[2]}${OTP[3]}${OTP[4]}${OTP[5]}`
          }
        )
      }
      else {
        setErrors({ otp: "Please enter 6 digits" })
      }
    }

  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.username_or_email.trim()) {
      errors.username_or_email = "username or email is required.";
    }
    else if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(data.username)) {
      errors.general = "Invalid username or password" //Username must start with a letter and can only contain letters and numbers. Error details are not showing to user because security reason
    }
    else if (/^\d+$/.test(data.username_or_email)) {
      errors.general = "Invalid username or password" //username or email cannot be full of numbers.  Error details are not showing to user because security reason
    }

    if (!data.password.trim()) {
      errors.password = "Password is required.";
    }
    else if (data.password.length < 8) {
      errors.general = "Invalid username or password"//Password must be at least 8 characters. Error details are not showing to user because security reason
    }
    else {
      // Password must contain at least one letter, one number, and one special character Error details are not showing to user because security reason
      if (!/[a-zA-Z]/.test(data.password)) {
        errors.general = "Invalid username or password"//Password must contain at least one letter."; Error details are not showing to user because security reason
      }
      // else if (!/\d/.test(data.password)) {
      //   errors.general = "Invalid username or password" //Password must contain at least one number. Error details are not showing to user because security reason
      // }
      else if (!/[!@#$%^&*]/.test(data.password)) {
        errors.general = "Invalid username or password" //Password must contain at least one special character (!@#$%^&*). Error details are not showing to user because security reason
      }
    }

    return errors;
  };




  const handleOTPInputChange = (e, currentIndex) => {
    console.log("e", e)
    if (currentIndex < 6) {
      // Handle backspace
      if (e.nativeEvent.inputType === 'deleteContentBackward' || e.nativeEvent.inputType === 'deleteContentForward') {


        let temp = [...OTP];
        temp[currentIndex] = null;
        setOTP(temp);

        // Move to the previous input
        if (currentIndex > 0) {
          document.getElementById(`otp${currentIndex - 1}`).focus();
        }
      } else if (/[0-9]/.test(e.target.value)) {
        // Update the current input value
        const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
        let temp = [...OTP];
        temp[currentIndex] = inputValue;
        setOTP(temp);

        // Move to the next input
        if (currentIndex < 5) {
          document.getElementById(`otp${currentIndex + 1}`).focus();
        }
      }
    }
  };




  const onGoogleLoginSuccess = (response) => {
    console.log(response.credential);

    API.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.credential}`, {
      headers: {
        Authorization: `Bearer ${response.credential}`,
        Accept: 'application/json'
      }
    })
      .then((res) => {
        console.log("google user basic details", res.data);
      })
      .catch((err) => console.log("error ongoogle user basic details", err));

  };
  const onGoogleLoginError = (error) => {
    console.log(error);
  };

  



  return (
    <div className='auth-container'>
      <AuthBanner
        pageName={"login"}
        titleWeb={"Welcome to<br/>ZOG Global!"}
        titleTab={"Welcome to ZOG<br/>Global!"}
        titleMob={"Welcome to<br/>ZOG Global!"}
        paraWeb={"Don’t have an account? Sign up<br/>now and get started. "}
        paraTab={"Don’t have an account? Sign up now<br/> and get started. "}
        paraMob={"Don’t have an account? Sign up now<br/> and get started. "}
        buttonText="SIGN UP"
        buttonOnClick='/authentication-privacy-policy'
        iconTopWeb={'70%'}
        iconLeftWeb={'20%'}
        iconTopTab={'52%'}
        iconLeftTab={"42%"}
        iconTopMob={'43%'}
        iconLeftMob={165}
        iconRotationWeb={28}
        iconRotationTab={-39}
        iconRotationMob={-42}
      />
      <div className='card'>
      <div className='f-xl black-clr mb-2 '><b className='title'>{(localStorage.getItem("userRoleRequest") === "admin") && "Admin"} Login to your account</b></div>
        <div className='blue-line'></div>
        <form onSubmit={handleSubmit} noValidate>
          <div className=' form-row'>
            <label className='lightgrey-clr user-name text-start'>USERNAME OR EMAIL</label>
            <div><input
              type="text"
              id="username_or_email"
              name="username_or_email"
              className={`form-control ${errors.username_or_email ? "is-invalid" : ""}`}
              value={formData.username_or_email}
              onChange={handleChange}
              placeholder='Username'
              disabled={isOTPInputShown}
            ></input>
              {errors.username_or_email && <div className="invalid-feedback">{errors.username_or_email}</div>}

            </div>
          </div>
          <div className='form-row'>
            <label className='lightgrey-clr f-xxs text-start'>PASSWORD</label>

            <div className="input-group">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={formData.password}
                onChange={handleChange}
                disabled={isOTPInputShown}
                placeholder='Password'
              />
              <span className="input-group-text" onClick={() => showPassword(!passwordShown)} style={{ cursor: "pointer" }}>

                {passwordShown ?

                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12.668C1 12.668 5 4.66797 12 4.66797C19 4.66797 23 12.668 23 12.668C23 12.668 19 20.668 12 20.668C5 20.668 1 12.668 1 12.668Z" stroke="#8F8F8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 15.668C13.6569 15.668 15 14.3248 15 12.668C15 11.0111 13.6569 9.66797 12 9.66797C10.3431 9.66797 9 11.0111 9 12.668C9 14.3248 10.3431 15.668 12 15.668Z" stroke="#8F8F8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  :


                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1777_2198)">
                      <path d="M17.94 18.608C16.2306 19.911 14.1491 20.6329 12 20.668C5 20.668 1 12.668 1 12.668C2.24389 10.3499 3.96914 8.3246 6.06 6.72799M9.9 4.90799C10.5883 4.74687 11.2931 4.66633 12 4.66799C19 4.66799 23 12.668 23 12.668C22.393 13.8036 21.6691 14.8727 20.84 15.858M14.12 14.788C13.8454 15.0827 13.5141 15.3191 13.1462 15.4831C12.7782 15.6471 12.3809 15.7353 11.9781 15.7424C11.5753 15.7495 11.1752 15.6754 10.8016 15.5245C10.4281 15.3736 10.0887 15.149 9.80385 14.8641C9.51897 14.5793 9.29439 14.2399 9.14351 13.8664C8.99262 13.4928 8.91853 13.0927 8.92563 12.6899C8.93274 12.2871 9.02091 11.8898 9.18488 11.5218C9.34884 11.1538 9.58525 10.8226 9.88 10.548" stroke="#8F8F8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 1.66797L23 23.668" stroke="#8F8F8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1777_2198">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.667969)" />
                      </clipPath>
                    </defs>
                  </svg>
                }

              </span>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}



            </div>
            {errors.general && <div className="text-danger">{errors.general}</div>}


          </div>
          <div className='password form-row'>
            <Link to="/forgot-password" className='black-clr  f-xs forgetpass-anc'>Forgot your password?</Link>
          </div>

          {!isOTPInputShown &&
            <button className="button-black-box">LOG IN </button>
          }
          {(localStorage.getItem("userRoleRequest") === "admin") && isOTPInputShown && (
            <>
              <label htmlFor="otp" className="form-label">
                OTP
              </label>
              <div className="input-group mb-2 otp-container">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp${index}`}
                    name={`otp${index}`}
                    value={OTP[index] || ''}
                    onChange={(e) => handleOTPInputChange(e, index)}
                    maxLength={1}
                    className="otp-input"

                  />
                ))}

              </div>
              {errors.otp && <div className="text-danger">{errors.otp}</div>}
              {otpTimeout ? <p className="otp-timer expired">OTP expired! <span className="resend" onClick={() => showOTPInput(false)}>Resend OTP</span></p> : <div className="otp-timer">OTP will expire within {Math.floor(otpTimer / 60)}:{(otpTimer % 60) < 10 && "0"}{(otpTimer % 60)} min.</div>}
              <button className="button-black-box f-xs ">SUBMIT OTP</button>
            </>
          )}

          <div>

          </div>
        </form>
        

      </div>
      <ErrorModal message={message} state={isErrorModalOpen} setterFunction={setIsErrorModalOpen} okClickedFunction={() => { window.location.reload() }} />

    </div>
  )

}

export default Login