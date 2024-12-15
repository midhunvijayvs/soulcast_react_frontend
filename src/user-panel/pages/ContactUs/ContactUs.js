import React, { useEffect, useState, useRef } from 'react'
import './ContactUs.scss'
import Banner from '../../common-component/BannerMainPages/BannerMainPages.js'

import { useNavigate } from 'react-router-dom';

import API from "../../../API.js"
import ErrorModal from "../../../ErrorModal.js";
import PositiveModal from "../../../PositiveModal.js";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner.js"
import $ from 'jquery';


import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { isValidPhoneNumber } from 'libphonenumber-js';

const View = () => {

  useEffect(() => {
    $(function () {
      $(window).scrollTop(0);
    });
  }, [])


  // Create a ref for the target div
  const targetDivRef = useRef(null);

  // Create a function that scrolls to the target div
  const scrollToDiv = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };




  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [optionListOpened, toggleOptionList] = useState(false)


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "country_code": "",
    "phone_number": "",
    "company_name": "",
    "industry": "",
    "category": "",
    "message": ""
  });
  const [message, setMessage] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const [errors, setErrors] = useState({});
  const handleChange = (e) => {


    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });


  };
  const handlePhoneChange = (value, country) => {
    setFormData({
      ...formData,
      phone_number: value,
      country_code: country.dialCode
    });
  };

  const selectCategory = (value) => {

    setFormData({
      ...formData,
      "category": value
    });
  }

  const setAgree = (index, e) => {
    console.log("e.target.checked", e.target.checked)
    if (index === 1) {
      if (e.target.checked) {
        setAgree1(true)
      }
      else {
        setAgree1(false)
      }

    }
    else if (index === 2) {
      if (e.target.checked) {
        setAgree2(true)
      }
      else {
        setAgree2(false)
      }
    }
  }

  const validatePhoneNumber = (phoneNumber, countryCode) => {
    try {
      const parsedPhoneNumber = isValidPhoneNumber(`+${phoneNumber}`, countryCode);
      return parsedPhoneNumber ? null : 'Invalid phone number';
    } catch (error) {
      return 'Invalid phone number';
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

    if (!data.phone_number.trim()) {
      errors.phone_number = "Phone number is required.";
    }
    // else if (!/^\d{10}$/.test(data.phone_number)) {
    //   errors.phone_number = "Phone number must be 10 digits.";
    // }
    else if (validatePhoneNumber(data.phone_number, data.country_code)) {
      errors.phone_number = 'Invalid phone number'
    }


    if (!data.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address.";
    }

    // if (!data.company_name.trim()) {
    //   errors.company_name = "Company name is required.";
    // }
    if (!data.industry.trim()) {
      errors.industry = "Choose Your Industry.";
    }

    if (data.category === "") {
      errors.category = "Choose a Category.";
    }
    if (!data.message.trim()) {
      errors.message = "Enter your message with atleast 100 Character";
    }

    if (!agree1) {
      errors.agree1 = "Please agree the above terms and condition to proceed."
    }
    if (!agree2) {
      errors.agree2 = "Please agree the above terms and condition to proceed."
    }
    return errors;
  };



  const handleSubmit = async (e) => {
    console.log("entered into handle submit")
    e.preventDefault();

    // Validate the form fields
    const validationErrors = validateForm(formData);
    console.log("validation errors", validationErrors)
    console.log("formData", formData)
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const phoneNumberWithoutCountryCode = formData.phone_number.substring(formData.country_code.length);
      const updatedFormData = { ...formData, phone_number: phoneNumberWithoutCountryCode, country_code: `+${formData.country_code}` };

      // Perform the API call
      setIsLoading(true)
      API.post("/contact_us/", updatedFormData).then((response) => {
        // Handle the API response as needed
        setIsLoading(false)
        setMessage("Your Message is sent Succesfully! Our team will contact you shortly. Thank you for showing interest in Soulcast.");
        setIsMessageModalOpen(true)
        window.localStorage.removeItem("emailForSignup")

      })
        .catch(error => {
          // Handle API errors
          setIsLoading(false)

          setMessage(error.message);
          setIsErrorModalOpen(true)
        })
    }
  };


  useEffect(() => {
    //window.scrollTo(0, 0);

    // Get the textarea element
    var textarea = document.getElementById("message");

    // Add an event listener for input
    textarea.addEventListener("input", function () {
      // Set the textarea height to auto to get its full height
      this.style.height = "auto";
      // Then set the height to the scrollHeight, which will adjust the height based on content
      this.style.height = (this.scrollHeight) + "px";

    }, []);

  })
  useEffect(() => {
    if (optionListOpened == true) {
      if (window.innerWidth > 992) {
        $(".option-list").animate({ height: "217px" }, 400)
      }
      else if (window.innerWidth > 767) {
        $(".option-list").animate({ height: "217px" }, 400)

      }
      else {
        $(".option-list").animate({ height: "10rem" }, 400)
      }
      $(".option-list").css("opacity", "1")
    }
    else {
      $(".option-list").animate({ height: "0px" }, 400)
      $(".option-list").css("opacity", "0")
    }
  }, [optionListOpened])
  return (
    <div className='contact-us-page'>

      <Banner
        pageName={"contact-us"}
        titleWeb={"Let's Start a<br/> Conversation.<br/> We Can help!"}
        titleTab={"Let's Start a<br/> Conversation.<br/> We Can help!"}
        titleMob={"Let's Start a Conversation.<br/> We Can help!"}
        subTitleWeb={"Reach out to our team for any query<br/> solutions. To assist you better, please fill out the form below."}
        subTitleTab={"Reach out to our team for any query<br/> solutions. To assist you better, please fill out the<br/> form below."}
        subTitleMob={"Reach out to our team for any query solutions. To assist you better, please fill out the form below."}>
      </Banner>
      <div className='scroll-btn-container'>
        <button className='scroll-down-btn' onClick={scrollToDiv}>Get Support Now
          <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/contact-us/scroll-down.gif`}></img></button>

      </div>
      <div className='sec-2'>
        <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/contact-us/sec-2.svg`}></img>
        <div className='inner'>
          <div className='segment'>
            <div className='sub-title'>Location</div>
            <div className='text'>Head office, Oval Farms, Koothali
              Kozhikode, 673525,
              India</div>
          </div>
          <div className='segment'>
            <div className='sub-title'>Mail</div>
            <div className='text'>ovaleggfarm@gmail.com</div>
          </div>
          <div className='segment'>
            <div className='sub-title'>Phone</div>
            <div className='text'>9605556054</div>
          </div>
        </div>
      </div>


      <div className='sec-3' ref={targetDivRef}>
        <div className='lhs'>
          <h1 className='title only-web'>Connect<br /> with Us</h1>
          <h1 className='title only-tab'>Connect with Us</h1>
          <h1 className='title only-mob'>Connect with Us</h1>
        </div>
        <div className="rhs">
          <form onSubmit={handleSubmit} noValidate>

            <div class="">

              <div class="row form-row" >
                <div class="col-lg-6 mb-5">
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className={`form-control form-control-lg ${errors.first_name ? "is-invalid" : ""}`}
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder='First Name'
                  />
                  {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                </div>

                <div class="col-lg-6 mb-5">
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className={`form-control form-control-lg ${errors.last_name ? "is-invalid" : ""}`}
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder='Last Name'
                  />

                  {errors.first_name && <div className="invalid-feedback">{errors.last_name}</div>}
                </div>
              </div>

            </div>

            <div class="col-lg-12">
              <div class="row form-row">
                <div class="col-lg-12 mb-5">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Company Email'
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-lg-12 mb-5">
                  {/* <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    className={`form-control form-control-lg ${errors.phone_number ? "is-invalid" : ""}`}
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder='Phone Number'
                  /> */}
                  <div className={`phone-input-container ${errors.phone_number ? "is-invalid" : ""}`}>
                    <PhoneInput
                      inputProps={{
                        name: 'phone_number',
                        id: 'phone_number',
                        className: 'form-control form-control-lg',
                        placeholder: 'Phone Number',
                      }}
                      country={'gb'}
                      value={formData.phone_number}
                      onChange={(value, country) => handlePhoneChange(value, country)}
                    />
                    <div className='down-arrow'>
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_3810_8531" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                          <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_3810_8531)">
                          <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                      </svg>

                    </div>
                  </div>
                  {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
                </div>
              </div>
            </div>

            <div class="">
              <div class="row form-row">
                <div class="col-lg-12 mb-5">
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    className={`form-control form-control-lg ${errors.company_name ? "is-invalid" : ""}`}
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder='Company Name'
                  />
                  {errors.company_name && <div className="invalid-feedback">{errors.company_name}</div>}
                </div>
                <div className="col-lg-12 mb-5">
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    className={`form-control form-control-lg ${errors.industry ? "is-invalid" : ""}`}
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder='Industry'
                  />
                  {errors.industry && <div className="invalid-feedback">{errors.industry}</div>} </div>
              </div>
            </div>

            <div class="">
              <div class="row form-row">
                <div class="col-lg-12 mb-5">
                  <div class="custom-select" id="category" name="category"
                    onClick={() => toggleOptionList(!optionListOpened)} >
                    <div className="selected-value">{formData.category ? formData.category : "Select Enquiry Type"}
                      <img className='arrow' src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/contact-us/drop-down-arrow.svg`}></img>
                    </div>
                    <div className='option-list'>
                      <div className='option' onClick={() => selectCategory("General Enquiry")}>General Enquiry</div>
                      <div className='option' onClick={() => selectCategory("Partnership Opportunities")}>Partnership Opportunities</div>
                      <div className='option' onClick={() => selectCategory("Service Specific")}>Service Specific</div>
                      <div className='option' onClick={() => selectCategory("Career Opportunities")}>Career Opportunities</div>
                    </div>

                  </div>
                  {errors.category && <div className="invalid-feedback">{errors.category}</div>}

                </div>
              </div>
            </div>

            <div class="">
              <div class="row form-row">
                <div class="col-lg-12 mb-5">

                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    className={`form-control form-control-lg ${errors.message ? "is-invalid" : ""}`}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='Message'
                  />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
              </div>

            </div>

            <div className="">
              <div class="row form-row">
                <div class="col-lg-12 mb-5">
                  <div class="form-check agreement">
                    <input class="form-check-input" type="checkbox" value="" id="agree_checkbox_1" name="agree_checkbox_1" onChange={(e) => setAgree(1, e)} checked={agree1}></input>
                    <label class="form-check-label" for="flexCheckDefault">
                      Yes, I agree with the storage and handling of my data by this website, to receive periodic emails from Soulcast related to products and services and can unsubscribe
                      at any time. I accept Soulcast’s <span className="pp">Privacy Policy.</span>
                    </label>

                  </div>
                  {errors.agree1 && <div className="invalid-feedback">{errors.agree1}</div>}
                </div>
              </div>
            </div>

            <div className="">
              <div class="row form-row">
                <div class="col-lg-12 mb-5">
                  <div class="form-check agreement">
                    <input class="form-check-input" type="checkbox" value="" id="agree_checkbox_2" name="agree_checkbox_2" onChange={(e) => setAgree(2, e)} checked={agree2}></input>
                    <label class="form-check-label" for="flexCheckDefault" >
                      By clicking submit below, you consent to allow Soulcast to store and process the personal information submitted above to provide you the content requested.*
                    </label>

                  </div>
                  {errors.agree2 && <div className="invalid-feedback">{errors.agree2}</div>}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <button className="button-black-box" type="submit" >SUBMIT<span>

              </span></button>
            </div>

          </form>
        </div>

      </div>










      {isLoading && <FixedOverlayLoadingSpinner />}
      <ErrorModal state={isErrorModalOpen} message={message} setterFunction={setIsErrorModalOpen} okClickedFunction={() => navigate("/")} />
      {isMessageModalOpen && <PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={() => { navigate("/") }} />}

    </div>

  );


}

export default View