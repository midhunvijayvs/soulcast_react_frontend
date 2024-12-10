import React, {useState, useEffect} from 'react'
import $ from 'jquery';
import Slider from 'react-slick'
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

import './LandingPage.scss'
import API from "../API"
import ErrorModal from '../ErrorModal';
import PositiveModal from '../PositiveModal';
import FixedOverlayLoadingSpinner from "../FixedOverlayLoadingSpinner.js"

import validatePhoneNumber from './CustomPhone/ValidatePhone.js';
// import PhoneInputField from './CustomPhone/CustomPhoneInput.js';


const LandingPage = () => {
  
    useEffect(() => {
      $(function () {
        $(window).scrollTop(0);
      });
    }, [])
    
    const renderHTML = (text) => ({ __html: text });
    let navigate = useNavigate();
    const scrollTop = () =>{
      window.scrollTo(0,0);
      }
    // header scroll
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

      const [formData, setFormData] = useState({
        "source":"landing",
        "first_name": "",
        "last_name": "",
        "email": "",
        "phone_number": "",
        "category": "",
        "country_code":"91"
      });
      const [message, setMessage] = useState(null);
      const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
      const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

      const [errors, setErrors] = useState({});
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      const handlePhoneChange = (value, country) => {
        setFormData({
          ...formData,
          phone_number: value,
          country_code: country.dialCode
        });
      };


    const [optionListOpened, toggleOptionList] = useState(false)
    
    const selectCategory = (value) => {
      setFormData({
        ...formData,
        "category": value
      });
    }
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
      //  else if (!/^\d{10}$/.test(data.phone_number)) {
      //   errors.phone_number = "Phone number must be 10 digits.";
      // }
      else if(validatePhoneNumber(data.phone_number, data.country_code)){
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
      // if (!data.industry.trim()) {
      //   errors.industry = "Choose Your Industry.";
      // }
  
      if (data.category === "") {
        errors.category = "Choose a Category.";
      }
      return errors;
    };
    const handleSubmit = async (e) => {
      console.log("entered into handle submit")
      e.preventDefault();
      const phoneNumberWithoutCountryCode = formData.phone_number.substring(formData.country_code.length);
      const updatedFormData = { ...formData, phone_number: phoneNumberWithoutCountryCode, country_code: `+${formData.country_code}` };


  
      // Validate the form fields
      const validationErrors = validateForm(formData);
      console.log("validation errors", validationErrors)
      console.log("formData", updatedFormData)
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length === 0) {
        // Perform the API call
        setIsLoading(true)
        console.log('no error');
        API.post("/contact_us/", updatedFormData).then((response) => {
          // Handle the API response as needed
          setIsLoading(false)
          setMessage("Your Message is sent Succesfully! Our team will contact you shortly. Thank you for showing interest in Soulcast.");
          setIsMessageModalOpen(true)
        })
          .catch(error => {
            // Handle API errors
            setIsLoading(false)
            console.log(error);
  
            setMessage(error.message);
            setIsErrorModalOpen(true)
          })
      }
    };

      
    useEffect(() => {
      if (optionListOpened) {
        $(".option-list").animate({ height: $(".option-list")[0].scrollHeight }, 400);
        $(".option-list").css("opacity", "1");
      } else {
        $(".option-list").animate({ height: "0px" }, 400);
        $(".option-list").css("opacity", "0");
      }
    }, [optionListOpened]);


    const sec2data = [
      {
        title: "Website Security<br/> Audit",
        description: "Identify vulnerabilities and weaknesses in web applications quickly.",
      },
      {
        title: "IT<br/> Systems Audit",
        description: "Comprehensive review of IT systems for security and compliance.",
      },
      {
        title: "Penetration<br/> Testing",
        description: "Simulate cyber-attacks to test defences and identify weaknesses.",
      },
      {
        title: "GDPR<br/> Advisory",
        description: "Expert guidance for compliance with EU's General Data Protection.",
      },
      {
        title: "ISO27001<br/> Advisory",
        description: "Expert guidance for implementing ISO27001 information security standard.",
      },
      {
        title: "PCI-DSS<br/> Advisory",
        description: "Ensure compliance with Payment Card Industry Data Security Standard.",
      },
      {
        title: "Cyber Essentials<br/> Certification",
        description: "Achieve UK government-backed certification for cybersecurity best practices.",
      },
      {
        title: "Cybersecurity<br/> Assurance",
        description: "Independent verification of cybersecurity controls and effectiveness.",
      },
      {
        title: "Third Party Security<br/> Due Diligence",
        description: "Evaluate the security risks associated with third-party vendors and suppliers.",
      },
      {
        title: "Risk<br/> Assessments",
        description: "Identify and prioritise cybersecurity risks to business operations.",
      },
      {
        title: "Security Maturity<br/> Assessment",
        description: "Evaluate and improve cybersecurity maturity and posture.",
      },
      {
        title: "Security as<br/> a Service",
        description: "Ongoing cybersecurity monitoring and protection services.",
      },
      {
        title: "Data Privacy<br/> Assessments",
        description: "Identify and mitigate data privacy risks and vulnerabilities.",
      },
      {
        title: "Specialist<br/> Contractor Services",
        description: "Expert cybersecurity services for short-term projects and needs.",
      },
      {
        title: "Incident<br/> Response",
        description: "Rapid response and remediation of cybersecurity incidents and breaches.",
      }
    ]
    const slider2Settings = {
      dots: false,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 6000,
      speed: 2000,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth:true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    };
    const slider4Settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1000,
      speed: 2000,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth:true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    };
    const sec4Data = [
      {title: 'We keep your digital assets safe from all kinds of cyber threats.'},
      {title: 'Our services adapt to your growth, ensuring continued protection.'},
      {title: 'We monitor your systems 24/7 and respond quickly to any issues.'},
      {title: 'We help you meet industry regulations, avoiding fines and legal problems.'},
      {title: 'Get insights to make smart security decisions.'},
    ]
    const sec5Data = [
      {description: "I can finally sleep soundly knowing our company's cybersecurity is in great hands. They swiftly secured our data, earning my trust",
        author: "Michael L",
        date: "Jun 02"
      },
      {description: "Working with Soulcast team was a breath of fresh air. They not only understood our needs but also made the whole process seamless and stress-free.",
        author: "Sarah Thompson",
        date: "Feb 03"
      },
      {description: "Impressed with their professionalism and dedication. They provided top-notch cybersecurity solutions tailored to our needs on time and within budget.",
        author: "James Wilson",
        date: "Aug 10"
      },
      {description: "Highly recommend their services! Their team went above and beyond to ensure our digital assets were safe and secure.",
        author: "John Smith",
        date: "Apr 05"
      },
      {description: "I can't sing their praises enough! From start to finish, they exceeded our expectations, ensuring our digital assets are safe and sound.",
        author: "David Patel",
        date: "Oct 06"
      },
    ]

    // click effect for Sec-2
    const [isBlackCardHovered, setIsBlackCardHovered] = useState(Array(sec2data.length).fill(false));

    const handleArrowButtonClick = (index) => {
      const newHoveredState = [...isBlackCardHovered];
      newHoveredState[index] = !newHoveredState[index];
      setIsBlackCardHovered(newHoveredState);
    };
    
  return (
    <div className='landing-page'>
        <div className='header' id='header' >
            <img className='app-logo' src="/images/header/app-logo-header.svg" alt=''></img>
        </div>
        <div className='banner-section' style={{backgroundImage:`url("/images/landing-page/banner-${window.innerWidth<767?"mob":window.innerWidth<992?"tab":"web"}.png")`}}>
            <div className='banner-title only-web'>Trusted <br/> Cybersecurity <br/> Services for <br/> Ultimate Protection</div>
            <div className='banner-title only-tab'>Trusted Cybersecurity Services for<br/>Ultimate Protection</div>
            <div className='banner-title only-mob'>Trusted Cybersecurity<br/>Services for Ultimate<br/>Protection</div>
            
            <div className='banner-para only-web'>Protect your digital assets with our advanced<br/>cybersecurity services, shielding you from ever-<br/>changing online threats with expert care and<br/>innovation.</div>
            <div className='banner-para only-tab'>Protect your digital assets with our advanced<br/>cybersecurity services, shielding you from ever-changing<br/> online threats with expert care and innovation.</div>
            <div className='banner-para only-mob'>Protect your digital assets with our advanced cybersecurity services, shielding you from ever-changing online threats with expert care and innovation.</div>
        </div>

        <div className='form-sec'>
          <form onSubmit={handleSubmit} noValidate>
            <div className='title only-web'> Speak to Our Cybersecurity Expert </div>
            <div className='title only-tab'> Speak to Our Cybersecurity Expert </div>
            <div className='title only-mob'> Speak to Our Cybersecurity<br/> Expert </div>
            <div className='name form-row'>
              <div className=' w-100'>
                <label className='lightgrey-clr f-xxs text-start'>FIRST NAME</label>

                <input type="text"
                  id="first_name"
                  name="first_name"
                  className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="">

                </input>
                {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
              </div>


              

            </div>
            <div  className='name form-row'>
              <div className=' w-100'>
                <label className='lightgrey-clr f-xxs text-start'>LAST NAME</label>

                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="">

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
                placeholder=""></input>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}

            </div>

            <div className=' form-row'>
              <label className='lightgrey-clr f-xxs text-start'>PHONE NUMBER</label>
                <div className={`phone-input-container ${errors.phone_number ? "is-invalid" : ""}`}>
                  <PhoneInput
                    inputProps={{
                      name: 'phone_number',
                      id: 'phone_number',
                      className: 'form-control',
                      placeholder: '',
                    }}
                    country={'gb'} 
                    value={formData.phone_number}
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

                {/* <PhoneInputField formData={formData} setFormData={setFormData} errors={errors} /> */}
                
                
                  {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}

            </div>
            <div className='form-row'>
              <label className='lightgrey-clr f-xxs text-start'>Select the Service Category you are interested in</label>
              <div class="custom-select" id="category" name="category"
                onClick={() => toggleOptionList(!optionListOpened)} >
                <div className="selected-value">{formData.category ? formData.category : "Select"}
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
                  <div className='option' onClick={() => selectCategory("Website Security Audit")}>Website Security Audit</div>
                  <div className='option' onClick={() => selectCategory("IT Systems Audit")}>IT Systems Audit</div>
                  <div className='option' onClick={() => selectCategory("Penetration Testing")}>Penetration Testing</div>
                  <div className='option' onClick={() => selectCategory("Website Compliance")}>Website Compliance</div>
                  <div className='option' onClick={() => selectCategory("Other")}>Other</div>
                </div>

              </div>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>
            <button className='button-black-box' type='submit'>SUBMIT</button>
            <div className='descr'>Please submit your details, and we'll reach out to you within 24 hours.</div>
          </form>
        </div>

        <div className='sec-2'>
          <img src="/images/sub-pages-banner-icon.svg" className="main-icon" 
            style={window.innerWidth > 992 ? { top: -420, left: -368, transform: `rotate(${67}deg)` } : window.innerWidth > 767 ? { top: -660, left: -328, transform: `rotate(${86}deg)` } : { top: -530, left: -232, transform: `rotate(${77}deg)` }}></img>
          <div className='title only-web'>Cybersecurity<br/> Services We Offer</div>
          <div className='title only-tab'>Cybersecurity Services<br/> We Offer</div>
          <div className='title only-mob'>Cybersecurity<br/> Services We Offer</div>
          
      

          <div className='black-card-section'>
            <div className=''>
              <Slider {...slider2Settings}>
                {sec2data.map((item, index) => {
                  return (
                    <div className={`card ${isBlackCardHovered[index] ? 'hovered' : ''}`} key={index} >
                      {isBlackCardHovered[index] &&
                      <button className='close-btn' onClick={() => handleArrowButtonClick(index)}>
                        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.8125 11.8125L42.1875 42.1875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.8125 42.1875L42.1875 11.8125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      }
                      
                      
                      <div className='card-inner'>
                        <div className='moving-box'>
                          <div className='icon'>
                            <img src={`/images/landing-page/sec-2/${index + 1}.svg`}></img>
                          </div>
                          <div className='card-title'  dangerouslySetInnerHTML={renderHTML(item.title)}></div>
                            <button onClick={() => handleArrowButtonClick(index)} className='hover'>
                              <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.065 8.70711C33.4555 8.31658 33.4555 7.68342 33.065 7.29289L26.701 0.928932C26.3105 0.538408 25.6773 0.538408 25.2868 0.928932C24.8963 1.31946 24.8963 1.95262 25.2868 2.34315L30.9436 8L25.2868 13.6569C24.8963 14.0474 24.8963 14.6805 25.2868 15.0711C25.6773 15.4616 26.3105 15.4616 26.701 15.0711L33.065 8.70711ZM0.357849 9H32.3578V7H0.357849V9Z" fill="#000" />
                              </svg>
                            </button>
                          
                          <div className='description' >{item.description}</div>
                          {isBlackCardHovered[index] && (
                            <button className='navigate-btn' onClick={() => navigate('/cyber-security')}>
                              Learn More
                              <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M33.065 8.70711C33.4555 8.31658 33.4555 7.68342 33.065 7.29289L26.701 0.928932C26.3105 0.538408 25.6773 0.538408 25.2868 0.928932C24.8963 1.31946 24.8963 1.95262 25.2868 2.34315L30.9436 8L25.2868 13.6569C24.8963 14.0474 24.8963 14.6805 25.2868 15.0711C25.6773 15.4616 26.3105 15.4616 26.701 15.0711L33.065 8.70711ZM0.357849 9H32.3578V7H0.357849V9Z" fill="#fff" />
                              </svg>
                            </button>
                          )}
                        </div>
                       
                      </div>
                      
                    </div>
                  )
                })}

              </Slider>
            </div>
            {/* <div className='card-container only-mob'>
              {sec2data.map((item, index) => {
                    return (
                      <div className='card' key={index}>
                        <div className='icon'>
                          <img src={`/images/landing-page/sec-2/${index + 1}.svg`}}></img>
                        </div>
                        <div className='card-title' dangerouslySetInnerHTML={renderHTML(item.title)}></div>
                      </div>
                    )
                  })}
            </div> */}
            
          </div>
        </div>

        <div className='sec-3' style={{backgroundImage:`url("/images/landing-page/sec3-${window.innerWidth<767?"mob":window.innerWidth<992?"tab":"web"}.png")`}}>
              <div className='greycard'>
                <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3767_11792)">
                  <path d="M41.9141 6.49902C41.9141 6.49902 20.1594 6.49902 18.4297 6.49902C17.7687 6.49902 16.925 5.10713 15.8281 3.82773C14.8297 2.66079 13.7609 2 12.9453 2C11.8906 2 4.46562 2 4.46562 2C2.28594 2 0.5 3.25129 0.5 5.41644V38.3999C0.5 40.5791 2.28594 42.4912 4.46562 42.4912H41.9141C44.0938 42.4912 45.5 40.5791 45.5 38.3999V9.98576C45.5 7.80655 44.0938 6.49902 41.9141 6.49902ZM4.46562 4.24951H10.625C10.625 4.24951 11.6656 4.24951 12.2141 4.24951C12.7625 4.24951 13.4234 4.47446 14.225 5.41644C15.9266 7.42694 16.4047 8.74853 18.4297 8.74853H41.9141C42.8422 8.74853 43.25 9.05783 43.25 9.98576V13.2475H2.75V5.41644C2.75 4.15109 4.19844 4.24951 4.46562 4.24951ZM41.9141 40.2416H4.46562C3.55156 40.2416 2.75 39.37 2.75 38.3999V15.4971H43.25V38.3999C43.25 39.2434 42.8844 40.2416 41.9141 40.2416Z" fill="#66C6EB"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_3767_11792">
                  <rect width="45" height="45" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                  </defs>
                </svg>
                <div className='title'>
                  <span className='num'>15+</span>
                  <div>Projects</div>
                </div>
                <p>Securing digital infrastructure through a history of successful projects.</p>
              </div>
              <div className='greycard'>
                <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.125 7.5H9.875C7.80393 7.5 6.125 9.17893 6.125 11.25V37.5C6.125 39.5711 7.80393 41.25 9.875 41.25H36.125C38.1961 41.25 39.875 39.5711 39.875 37.5V11.25C39.875 9.17893 38.1961 7.5 36.125 7.5Z" stroke="#26B2E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M30.5 3.75V11.25" stroke="#26B2E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.5 3.75V11.25" stroke="#26B2E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.125 18.75H39.875" stroke="#26B2E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className='title'>
                  <span className='num'>8+</span>
                  <div>Years</div>
                </div>
                <p>We are dedicated to ensuring every client's complete satisfaction, every time.</p>
              </div>
              <div className='greycard'>
                <svg width="68" height="45" viewBox="0 0 68 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3767_11773)">
                  <path d="M42.0132 21.2653C42.0225 22.2792 41.5561 22.8818 40.9948 23.4369C38.4957 25.9025 36.0046 28.3761 33.4882 30.8259C33.0632 31.2399 32.9309 31.617 33.0538 32.213C33.726 35.4552 34.3395 38.7094 34.9903 41.9556C35.1974 42.9867 34.9034 43.8358 34.0829 44.47C33.2543 45.1108 32.3402 45.157 31.394 44.6823C28.2841 43.1212 25.1623 41.5824 22.0644 39.9976C21.4484 39.6824 20.9579 39.6653 20.3311 39.9791C17.1585 41.5627 13.9604 43.0974 10.7744 44.6546C9.99125 45.037 9.22548 45.0462 8.50515 44.5412C7.76077 44.0204 7.34514 43.2833 7.50818 42.3867C8.04542 39.4319 8.53054 36.4613 9.24419 33.5473C9.63041 31.9743 9.3511 30.9353 8.11892 29.8304C5.75346 27.7089 3.55773 25.4015 1.30185 23.16C0.387744 22.2515 0.25143 21.1136 0.906275 20.1063C1.30453 19.4945 1.88721 19.1543 2.61422 19.0857C6.0849 18.764 9.55424 18.4383 13.0276 18.1509C13.7947 18.0876 14.229 17.8147 14.5591 17.0829C16.0051 13.8789 17.5353 10.7118 19.0188 7.52357C19.4785 6.53468 20.1988 5.91497 21.3227 5.93211C22.4587 5.95057 23.1135 6.65334 23.5639 7.62378C25.062 10.8529 26.5936 14.0674 28.077 17.3031C28.3229 17.8384 28.6583 18.0665 29.2236 18.114C31.3472 18.2907 33.4694 18.4858 35.5917 18.6809C37.0069 18.8102 38.4235 18.9209 39.8335 19.095C41.1445 19.2571 42.0158 20.2368 42.0118 21.2653H42.0132ZM4.35423 21.8902C4.48921 22.2396 4.71106 22.3926 4.89281 22.5719C7.24758 24.8991 9.59567 27.2342 11.9718 29.5416C12.5919 30.1429 12.7937 30.7995 12.62 31.6223C12.326 33.016 12.0574 34.4162 11.7807 35.8139C11.4212 37.6348 11.0657 39.4557 10.7062 41.2858C11.0216 41.3319 11.1967 41.1737 11.3891 41.0814C14.3413 39.6508 17.2974 38.2294 20.2349 36.7711C20.8951 36.4441 21.4697 36.431 22.1246 36.7632C25.1289 38.2861 28.1465 39.7826 31.1614 41.2858C31.3338 41.3715 31.5236 41.5679 31.7067 41.4479C31.9312 41.3016 31.7842 41.0484 31.7441 40.8427C31.1414 37.7666 30.5561 34.6865 29.9172 31.617C29.7462 30.7956 29.9306 30.1943 30.5333 29.6089C32.9563 27.2553 35.3511 24.8741 37.7513 22.4968C37.9144 22.3359 38.1549 22.2199 38.1923 21.8797C36.8132 21.7492 35.4473 21.6173 34.0815 21.4934C31.9593 21.3009 29.8371 21.1123 27.7148 20.9277C26.8956 20.8565 26.3129 20.5058 25.9561 19.7331C24.5007 16.5819 23.0173 13.4424 21.5406 10.3004C21.4738 10.158 21.4697 9.94307 21.1784 9.93384C21.0688 10.154 20.9472 10.3848 20.8363 10.6195C19.4357 13.6033 18.0164 16.5779 16.6506 19.5775C16.2697 20.4135 15.7258 20.8591 14.7997 20.9317C12.6534 21.1004 10.5098 21.2995 8.36616 21.496C7.04845 21.616 5.73342 21.7531 4.35423 21.8889V21.8902Z" fill="#66C6EB"/>
                  <path d="M50.0143 4.00043C49.0775 6.02569 48.1487 8.03513 47.2172 10.0459C46.986 10.5443 46.7347 11.0348 46.5236 11.5411C46.3645 11.9208 46.1641 12.0487 45.7618 11.8443C45.2286 11.5741 44.6793 11.3341 44.1274 11.102C43.7425 10.9398 43.6383 10.7183 43.8187 10.3294C45.2085 7.34026 46.577 4.34061 47.9776 1.35679C48.3825 0.493152 49.1055 -0.00393215 50.0905 2.34295e-05C51.1102 0.00397901 51.7957 0.549849 52.21 1.44381C53.3767 3.9556 54.5702 6.45553 55.6821 8.98974C56.0322 9.78613 56.4986 10.0881 57.3713 10.1421C60.0521 10.3083 62.7277 10.5561 65.4018 10.804C66.3253 10.8897 67.059 11.3354 67.373 12.2478C67.6831 13.151 67.4065 13.9408 66.7476 14.5948C64.6802 16.6491 62.6114 18.702 60.5172 20.7312C60.0842 21.1505 59.972 21.5566 60.0909 22.1368C60.6081 24.6723 61.0892 27.2144 61.5703 29.7565C61.871 31.3467 61.1453 32.4938 59.7261 32.7179C59.1474 32.8089 58.6208 32.6322 58.1224 32.3883C55.3546 31.0329 52.5976 29.659 49.8272 28.3088C49.3715 28.0873 49.2405 27.8499 49.5078 27.3924C49.7858 26.9191 50.029 26.4233 50.2495 25.9209C50.4486 25.4674 50.6999 25.4239 51.1329 25.6401C53.2725 26.7147 55.4215 27.7682 57.5731 28.8177C57.7976 28.9272 58.0462 29.2093 58.2867 29.0248C58.4885 28.8705 58.3068 28.5725 58.2627 28.3418C57.8324 26.0805 57.4114 23.8166 56.9583 21.5593C56.7926 20.7365 56.9557 20.0878 57.5905 19.4813C59.4107 17.7421 61.1841 15.9555 62.9749 14.1861C63.1286 14.0344 63.2716 13.8736 63.4587 13.6758C62.6421 13.3712 61.8336 13.4543 61.0558 13.3712C59.269 13.1813 57.4742 13.0429 55.6794 12.9414C54.6851 12.8847 54.0343 12.497 53.624 11.5701C52.5936 9.23894 51.5057 6.93284 50.4313 4.62146C50.335 4.41313 50.2936 4.15734 50.0156 3.99911L50.0143 4.00043Z" fill="#66C6EB"/>
                  <path d="M36.9856 7.80046C36.3574 9.15459 35.7961 10.3637 35.2362 11.5741C34.6455 12.8504 34.0414 14.1202 33.4761 15.407C33.265 15.887 33.011 15.9621 32.5567 15.7222C32.0488 15.4532 31.5143 15.2317 30.9824 15.0102C30.6122 14.8559 30.5534 14.6528 30.7218 14.2916C32.1143 11.3051 33.4868 8.30941 34.8794 5.32163C35.2843 4.45272 35.9766 3.94905 36.9682 3.93982C37.9946 3.93059 38.6922 4.45536 39.1091 5.34537C40.2812 7.8532 41.4759 10.3518 42.5785 12.8887C42.938 13.7154 43.4298 14.0226 44.3105 14.0793C46.99 14.2547 49.6628 14.5052 52.3383 14.7372C53.2578 14.8163 53.9354 15.2673 54.2628 16.1362C54.5902 17.0077 54.367 17.7751 53.7108 18.4238C51.6087 20.5045 49.5158 22.5943 47.3909 24.6512C46.978 25.0521 46.8523 25.4173 46.9686 25.9764C47.4952 28.5303 47.9829 31.0936 48.4788 33.6541C48.6485 34.531 48.6057 35.3643 47.8947 36.0301C47.141 36.7369 46.1427 36.8516 45.0455 36.3294C44.0245 35.8442 43.0182 35.33 42.0051 34.8303C40.3159 33.997 38.6267 33.165 36.9388 32.329C36.4007 32.0627 36.2706 31.6548 36.5485 31.1054C36.7477 30.7138 36.9749 30.3328 37.1392 29.9267C37.3451 29.4177 37.6163 29.3518 38.1082 29.601C40.2437 30.6795 42.394 31.7291 44.543 32.7826C44.7542 32.8854 44.9934 33.1373 45.2032 32.9856C45.4197 32.8301 45.2326 32.536 45.1885 32.3079C44.7448 30.0058 44.3145 27.6997 43.8387 25.4028C43.669 24.5853 43.8841 23.9709 44.4829 23.3934C46.2937 21.645 48.0738 19.8676 49.8593 18.0942C50.0036 17.9505 50.2963 17.8318 50.188 17.5852C50.1078 17.4033 49.8379 17.4363 49.6401 17.4204C47.2947 17.2345 44.9506 17.0302 42.6039 16.8759C41.5922 16.81 40.9293 16.4197 40.5124 15.4585C39.5515 13.242 38.5077 11.0612 37.4974 8.86715C37.3531 8.55466 37.2007 8.24613 36.9869 7.79783L36.9856 7.80046Z" fill="#66C6EB"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_3767_11773">
                  <rect width="67" height="45" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                  </defs>
                </svg>
                <div className='title'>
                  <span className='num'>100%</span>
                  <div>Satisfaction</div>
                </div>
                <p>Industry-experienced team committed to safeguarding your digital presence.</p>
              </div>
        </div>

        <div className='sec-4'>
          <img src="/images/sub-pages-banner-icon.svg" className="main-icon" 
            style={window.innerWidth > 992 ? { top: -667, left: "40%", transform: `rotate(${53}deg)` } : window.innerWidth > 767 ? { top: -650, left: "25%", transform: `rotate(${112}deg)` } : { top: -550, left: "-6%", transform: `rotate(${127}deg)` }}></img>
          <div className='title only-web'>Why Choose Soulcast for your Security<br/> Needs?</div>
          <div className='title only-tab'>Why Choose Soulcast<br/> for your Security Needs?</div>
          <div className='title only-mob'>Why Choose ZOG<br/> Global for your<br/> Security Needs?</div>

          <div className='black-card-section'>
            <div className='only-web'>
              <Slider {...slider4Settings}>
                {sec4Data.map((item, index) => {
                  return (
                    <div className='card' key={index}>
                      <div className='card-title'>{item.title}</div>
                    </div>
                  )
                })}

              </Slider>
            </div>
            <div className='card-container only-tab only-mob'>
              {sec4Data.map((item, index) => {
                    return (
                      <div className='card' key={index}>
                        <div className='card-title'>{item.title}</div>
                      </div>
                    )
                  })}
            </div>
          </div>
        </div>

        <div className='sec-5'>
          <img src="/images/sub-pages-banner-icon.svg" className="main-icon" 
              style={window.innerWidth > 992 ? { top: -574, right: -422, transform: `rotate(${223}deg)` } : window.innerWidth > 767 ? { top: -511, right: -503, transform: `rotate(${74}deg)` } : { top: -510, right: -221, transform: `rotate(${188}deg)` }}></img>
          <div className='title only-web'>What Do Our Clients Say ?</div>
          <div className='title only-tab'>What Do Our Clients Say ?</div>
          <div className='title only-mob'>What Do Our Clients Say ?</div>
          <div className='card-container'>
            {sec5Data.map((item, index) => {
              return (
                <div className='card' key={index}>
                  <svg width="53" height="43" viewBox="0 0 53 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.368 42.854C8.932 42.854 6.83433 42.245 5.075 41.027C3.451 39.809 2.16533 38.1173 1.218 35.952C0.406 33.6513 0 31.08 0 28.238C0 24.584 0.609 20.9977 1.827 17.479C3.18033 13.9603 5.14267 10.7123 7.714 7.735C10.2853 4.75767 13.5333 2.32167 17.458 0.427002L23.142 5.50201C19.894 6.58467 17.052 8.344 14.616 10.78C12.18 13.0807 10.2853 15.652 8.932 18.494C7.714 21.2007 7.17267 23.8397 7.308 26.411L7.917 26.614C8.323 26.0727 8.86433 25.6667 9.541 25.396C10.2177 24.99 11.2327 24.787 12.586 24.787C13.804 24.787 15.022 25.1253 16.24 25.802C17.5933 26.4787 18.6083 27.4937 19.285 28.847C20.097 30.065 20.503 31.689 20.503 33.719C20.503 35.343 20.097 36.8993 19.285 38.388C18.473 39.7413 17.3903 40.824 16.037 41.636C14.6837 42.448 13.1273 42.854 11.368 42.854ZM41.006 42.854C38.57 42.854 36.4723 42.245 34.713 41.027C33.089 39.809 31.8033 38.1173 30.856 35.952C30.044 33.6513 29.638 31.08 29.638 28.238C29.638 24.584 30.247 20.9977 31.465 17.479C32.8183 13.9603 34.7807 10.7123 37.352 7.735C39.9233 4.75767 43.1713 2.32167 47.096 0.427002L52.78 5.50201C49.532 6.58467 46.69 8.344 44.254 10.78C41.818 13.0807 39.9233 15.652 38.57 18.494C37.352 21.2007 36.8107 23.8397 36.946 26.411L37.555 26.614C37.961 26.0727 38.5023 25.6667 39.179 25.396C39.8557 24.99 40.8707 24.787 42.224 24.787C43.442 24.787 44.66 25.1253 45.878 25.802C47.2313 26.4787 48.2463 27.4937 48.923 28.847C49.735 30.065 50.141 31.689 50.141 33.719C50.141 35.343 49.735 36.8993 48.923 38.388C48.111 39.7413 46.9607 40.824 45.472 41.636C44.1187 42.448 42.63 42.854 41.006 42.854Z" fill="#9CD6EF"/>
                  </svg>
                  <div className='card-description'><p>{item.description}</p></div>
                  <div className='card-author'><p>{item.author}</p> <p>{item.date}</p></div>
                </div>
              )
            })}
          </div>

        </div>

        <div className='bottom-banner' style={{backgroundImage:`url("/images/landing-page/bottom-banner-${window.innerWidth<767?"mob":window.innerWidth<992?"tab":"web"}.png")`}}>
          <img src="/images/sub-pages-banner-icon.svg" className="main-icon" 
            style={window.innerWidth > 992 ? { top: "-26%", right: -520, transform: `rotate(${-18}deg)` } : window.innerWidth > 767 ? { top: "28%", right: -368, transform: `rotate(${90}deg)` } : { top: "20%", right: -232, transform: `rotate(${90}deg)` }}></img>
          
          <div className='banner-title only-web'>Secure your IT<br/> Infrastructure with<br/><span>Soulcast</span> </div>
          <div className='banner-title only-tab'>Secure your IT<br/> Infrastructure with<br/><span>Soulcast</span> </div>
          <div className='banner-title only-mob'>Secure your IT<br/> Infrastructure with<br/><span>Soulcast</span> </div>
          <button onClick={scrollTop} className="button-white-box">ENQUIRE NOW</button>
        </div>
        <div className='footer-sec'>
            <div className='footer-content'>
              <li onClick={() => navigate("/landing-page-privacy-policy")} className='link'>Privacy Policy</li>
              <li>© 2024 Soulcast</li>
            </div>
        </div>

        {isLoading && <FixedOverlayLoadingSpinner/>}
        <ErrorModal state={isErrorModalOpen} message={message} setterFunction={setIsErrorModalOpen} okClickedFunction={() => navigate()} />
        {isMessageModalOpen && <PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={() => { navigate() }} />}

    </div>
  )
}

export default LandingPage