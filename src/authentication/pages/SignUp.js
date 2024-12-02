import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { isValidPhoneNumber } from 'libphonenumber-js';
import API from '../../API';
import ErrorModal from "../../ErrorModal";
import PositiveModal from "../../PositiveModal";
import FixedOverlayLoadingSpinner from "../../FixedOverlayLoadingSpinner"
import $ from 'jquery';

import './Authentication.scss'
import AuthBanner from "./AuthBanner";
import MessagePopup from "./MessagePopup";
<script src="https://accounts.google.com/gsi/client" async defer></script>

const View = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phonenumber: "",
    country_code: "",
    email: window.localStorage.getItem("emailForSignup") ? window.localStorage.getItem("emailForSignup") : "",
    username: "",
    password: "",
    confirmPassword: "",
    country: ""
  });

  const [message, setMessage] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [passwordShown1, showPassword1] = useState(false);
  const [passwordShown2, showPassword2] = useState(true);


  const [errors, setErrors] = useState({});

  const [tnc, setTNC]=useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handlePhoneChange = (value, country) => {
    setFormData({
      ...formData,
      phonenumber: value,
      country_code: country.dialCode
    });
  };

  const countries = ['United Kingdom','United States','India']
  const handleCountryChange = (value) => {
    setFormData({
      ...formData,
      country: value,
    });
  };

  

  const validatePhoneNumber = (phoneNumber, countryCode) => {
    try {
      const parsedPhoneNumber = isValidPhoneNumber(`+${phoneNumber}`, countryCode);
      return parsedPhoneNumber ? null : 'Invalid phone number';
    } catch (error) {
      return 'Invalid phone number';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Perform the API call
      setIsLoading(true)
      const phoneNumberWithoutCountryCode = formData.phonenumber.substring(formData.country_code.length);
      const updatedFormData = { ...formData, phonenumber: phoneNumberWithoutCountryCode, country_code: `+${formData.country_code}` };
      // console.log(updatedFormData);

      try {
        // Replace the following code with your actual API logic
        const response = await API.post("/user/register/", updatedFormData);
        // Handle the API response as needed
        setIsLoading(false)
        setMessage("Signed-Up Succesfully!");
        navigate("/confirm-mail")
        setIsMessageModalOpen(true)

        window.localStorage.removeItem("emailForSignup")
      } catch (error) {
        // Handle API errors
        setIsLoading(false)
        console.log(error)
        let errorMessage = "An error occurred";
        if (error.response && error.response.data && error.response.data.length > 0) {
            errorMessage = error.response.data[0];
        } else if (error.message) {
            errorMessage = error.message;
        }

        setMessage(errorMessage);
        setIsErrorModalOpen(true)
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Validate each field and add errors if necessary
    if (!data.first_name.trim()) {
      errors.first_name = "First name is required.";
    }

    if (!data.last_name.trim()) {
      errors.last_name = "Last name is required.";
    }
    if (!data.country.trim()) {
      errors.country = "Select country.";
    }

    if (!data.phonenumber.trim()) {
      errors.phonenumber = "Phone number is required.";
    } 
    // else if (!/^\d{10}$/.test(data.phonenumber)) {
    //   errors.phonenumber = "Phone number must be 10 digits.";
    // }
    else if(validatePhoneNumber(data.phonenumber, data.country_code)){
      errors.phonenumber = 'Invalid phone number'
    }

    if (!data.email.trim()) {
      errors.email = "Email is required.";
    }
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address.";
    }



    if (!data.password.trim()) {
      errors.password = "Password is required.";
    } 
    else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } 
    else if (data.password.length > 127) {
      errors.password = "Maximum allowed Password length is 127 characters.";
    } 
    else {
      // Password must contain at least one letter, one number, and one special character
      if (!/[a-zA-Z]/.test(data.password)) {
        errors.password = "Password must contain at least one letter.";
      } else if (!/\d/.test(data.password)) {
        errors.password = "Password must contain at least one number.";
      } else if (!/[!@#$%^&*]/.test(data.password)) {
        errors.password = "Password must contain at least one special character (!@#$%^&*).";
      }
    }


    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    // if(!tnc){
    //   errors.tnc = "Please accept our Terms & Conditions to proceed.";
    // }
    return errors;
  };


  const onGoogleLoginSuccess = (response) => {
    console.log(response);
  };
  const onGoogleLoginError = (error) => {
    console.log(error);
  };

  // Country
  const [countryListOpened, toggleCountryList] = useState(false)
  useEffect(() => {
      const $OptionDropList = $("#country .option-list");
      if (countryListOpened) {
          const height = $OptionDropList[0].scrollHeight;
          $OptionDropList.animate({ height: height + "px" }, 400);
          $OptionDropList.css("opacity", "1");
      } else {
          $OptionDropList.animate({ height: "0px" }, 400);
          $OptionDropList.css("opacity", "0");
      }
  }, [countryListOpened]);



  return (
    <div className='signup auth-container'>
      <AuthBanner
        pageName={"signup"}
        titleWeb={"Register<br/>an Account to Apply"}
        titleTab={"Register an Account to Apply"}
        titleMob={"Register an<br/>Account to<br/>Apply"}
        paraWeb={"Complete registration to start applying<br/> for your preferred jobs. "}
        paraTab={"Complete registration to start<br/> applying for your preferred jobs. "}
        paraMob={"Complete registration<br/> to start applying for<br/> your preferred jobs. "}
        buttonText=""
        buttonOnClick=''
        iconTopWeb={'63%'}
        iconLeftWeb={'53%'}
        iconRotationWeb={40}
        iconTopTab={'53%'}
        iconLeftTab={"55%"}
        iconRotationTab={215}
        iconTopMob={'50%'}
        iconLeftMob={150}
        iconRotationMob={-23}
      />
      <div className='card'>
        {/* <div className='f-xl black-clr mb-2 ff-dmsans'><b>Sign Up</b></div> */}

        <form onSubmit={handleSubmit} noValidate>
          <div className='name form-row'>
            <div className='mb-2 w-100'>
              <label className='lightgrey-clr f-xxs text-start only-web'>FIRST NAME</label>
              <label className='lightgrey-clr f-xxs text-start only-tab'>FIRST NAME</label>
              <label className='lightgrey-clr f-xxs text-start only-mob'>NAME</label>

              <input type="text"
                id="first_name"
                name="first_name"
                className={` form-control ${errors.first_name ? "is-invalid" : ""}`}
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name">

              </input>
              {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
            </div>


            <div className='mb-2 w-100'>
            <label className='lightgrey-clr f-xxs text-start only-web'>LAST NAME</label>
              <label className='lightgrey-clr f-xxs text-start only-tab'>LAST NAME</label>

              <input
                type="text"
                id="last_name"
                name="last_name"
                className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name">

              </input>
              {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                
            </div>

          </div>


          <div className=' form-row'>
            <label className='lightgrey-clr f-xxs text-start'>EMAIL</label>

            <input
              type="text"
              id="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email here"></input>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}

          </div>

          <div className='password form-row'>

            <div className='w-100'>
              <label className='lightgrey-clr f-xxs text-start'>PASSWORD</label>
              <div className="input-group">
                <input
                  type={passwordShown1 ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="input-group-text" onClick={() => showPassword1(!passwordShown1)}>
                  {passwordShown1 ?

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

              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}

            </div>

            <div className='w-100'>
              <label className='lightgrey-clr f-xxs text-start'>CONFIRM PASSWORD</label>

              <div className="input-group">
                <input
                  type={passwordShown2 ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span className="input-group-text" onClick={() => showPassword2(!passwordShown2)}>
                  {passwordShown2 ?

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

              </div>
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}

            </div>
          </div>

          <div className=' form-row'>
            <label className='lightgrey-clr f-xxs text-start  '>PHONE NUMBER</label>
              <div className={`phone-input-container ${errors.phonenumber ? "is-invalid" : ""}`}>
                  <PhoneInput
                    inputProps={{
                      name: 'phonenumber',
                      id: 'phonenumber',
                      className: 'form-control',
                      placeholder: '',
                    }}
                    country={'gb'} 
                    value={formData.phonenumber}
                    onChange={(value, country) => handlePhoneChange(value, country)}
                  />
                  <div className='down-arrow'>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_3810_8531" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                    <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_3810_8531)">
                    <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    </svg>

                  </div>
                </div>
              {/* <PhoneInputField formData={formData} setFormData={setFormData} errors={errors}></PhoneInputField> */}
              {errors.phonenumber && <div className="invalid-feedback">{errors.phonenumber}</div>}
          </div>
          <div className=' form-row'>
            <label for="selectRow" className="lightgrey-clr f-xxs text-start">Country/Region of Residence</label>
            <div className="custom-select form-control form-select" id="country" name="country"
                onClick={() => toggleCountryList(!countryListOpened)} >
                <div className="selected-value">{formData.country ? formData.country : "Select"}
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_3764_11686" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                  <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_3764_11686)">
                  <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  </svg>
                </div>
                <div className='option-list'>
                  {countries.map(country => (
                    <div 
                      key={country} 
                      className='option' 
                      onClick={() => handleCountryChange(country)}
                    >
                      {country}
                    </div>
                  ))}
                </div>
                
              </div>
              {errors.country && <div className="invalid-feedback">{errors.country}</div>}
          </div>
          {/* <div className="form-row">
            <div class="d-flex align-items-center">
              <input class="form-check-input" type="checkbox" value="" id="tnc-checkbox" onChange={e=>{setTNC(e.target.checked)}} checked={tnc}></input>
                <label class="form-check-label" for="flexCheckDefault">
                  I accept the terms and conditions
                </label>

            </div>
            {errors.tnc && <div className="invalid-feedback d-block mb-2">{errors.tnc}</div>}

          </div> */}
          

          <button className='sign-up-btn button-black-box' type='submit'>REGISTER</button>


        </form>
      


        


      </div>

      <ErrorModal message={message} state={isErrorModalOpen} setterFunction={setIsErrorModalOpen} okClickedFunction={() => navigate('/sign-up')} />
      {isLoading && <FixedOverlayLoadingSpinner />}
      {/* {isMessageModalOpen&&<PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={() => navigate('/confirm-mail')} />} */}
      
    </div>

  )

}

export default View

