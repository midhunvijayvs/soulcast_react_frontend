import React, { useEffect, useState, useRef } from 'react'
import DocumentMeta from 'react-document-meta';
import { metaTags } from '../../../Constants.js'
import './Home.scss'

import { useNavigate } from 'react-router-dom';

import ErrorModal from "../../../ErrorModal.js";
import PositiveModal from "../../../PositiveModal.js";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner.js"
import $ from 'jquery';
import API from "../../../API.js"

import Slider from 'react-slick';



const Userhome = ({ userData, loadUserData }) => {




  const navigate = useNavigate();


  const [tabSelected, selectTab] = useState(0);

  const [message, setMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [bannerSoundOn, setBannerSoundOn] = useState(false)
  const [videoSrc, setVideoSrc] = useState('');

  const sec4Data = [
    { title: "Digital Engineering", description: "Efficient solutions, proactive support, and seamless IT management for optimised business performance and security." },
    { title: "Quality Assurance", description: "Exceptional QA solutions ensure seamless performance, reliability, and precision for your products and applications." },
    { title: "Future-Tech Solutions", description: "Enhance business productivity through advanced AI and Automation, optimising processes for improved efficiency and innovation." }
  ]
  const sec5Data = [
    {
      title: "Healthcare",
      description: "Empower your healthcare organisation with comprehensive IT services, fostering seamless operations, advanced data management, and robust security solutions. Enhance efficiency and connectivity within the healthcare industry, ensuring optimal performance and compliance in a rapidly evolving digital landscape.",
      link: "/healthcare"
    },
    {
      title: "Technology",
      description: "Strengthen your tech venture with our top IT services. Our solutions seamlessly integrate with your business, enhancing operational efficiency and fostering growth. From automation to cybersecurity, trust us for reliable support that aligns seamlessly with your technological aspirations.",
      link: "/technology"
    },
    {
      title: "Telecom",
      description: "Efficiently navigate the dynamic landscape of the Telecom industry with our specialised IT services. Streamline operations, enhance connectivity, and stay ahead in the competitive market. Our solutions are crafted to optimise performance and ensure seamless technological integration.",
      link: "/telecom"
    },
    {
      title: "Education",
      description: "Enhance educational environments with proficient IT services designed to integrate technology seamlessly. Our solutions optimise connectivity, streamline operations, and foster a dynamic learning experience. Elevate your institution's digital landscape with our specialised support for the education industry.",
      link: "/education"
    },
    {
      title: "Travel",
      description: "Unlock the potential of your travel business with our IT services. Seamlessly integrate technology to enhance customer experiences, streamline operations, and stay ahead in the dynamic travel industry. Explore innovative solutions that redefine your journey towards success.",
      link: "/travel"
    },
    {
      title: "Banking Services",
      description: "Explore our dynamic suite of IT solutions designed exclusively for the banking industry. Seamlessly integrate innovative technologies to enhance operational efficiency, strengthen security protocols, and foster a resilient digital ecosystem. Elevate your banking experience with our specialised IT services.",
      link: "/banking"
    },
    {
      title: "Insurance",
      description: "Navigating the complex landscape of the insurance industry demands adept IT solutions. Our services address industry challenges head-on, offering nuanced support. From data security to streamlined processes, we ensure your insurance operations flourish in an ever-evolving digital landscape.",
      link: "/insurance"
    },
    {
      title: "Legal",
      description: "Enhance your legal operations with our IT solutions, addressing industry challenges seamlessly. Streamline workflow, mitigate data security concerns, and enhance collaboration. Our services optimise your technology landscape, fostering efficiency and resilience in the dynamic legal environment.",
      link: "/legal"
    },
    {
      title: "Media",
      description: "Streamline your media business with our IT services, addressing industry challenges. We enhance efficiency, minimise downtime, and ensure seamless workflows. Our personalised solutions align with your unique needs, fostering innovation and growth in a dynamic media landscape.",
      link: "/media"
    },
    {
      title: "Pharma",
      description: "Enhance pharmaceutical operations with our proficient IT services, seamlessly integrating technology to optimise processes. Streamline data management, ensure regulatory compliance, and fortify security protocols. Drive efficiency and innovation within the pharmaceutical realm, fostering a resilient and agile industry landscape.",
      link: "/pharma"
    },

  ]

  useEffect(() => {
    $(function () {
      $(window).scrollTop(0);
    });
  }, [])

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.body.scrollHeight - window.innerHeight;
      const calculatedOpacity = (scrollTop / ((window.innerHeight)));
      setOpacity(Math.min(calculatedOpacity, 1));
    };

    window.addEventListener('scroll', throttle(handleScroll, 10));
    return () => {
      window.removeEventListener('scroll', throttle(handleScroll, 10));
    };
  }, []);




  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

  useEffect(() => {
    const updateVideoSource = () => {
      const width = window.innerWidth;
      if (width > 1004) {
        setVideoSrc('/images/home/banner-web.mp4');
      } else if (width < 1005 && width > 767) {
        setVideoSrc('/images/home/banner-tab.mp4');
      } else if (width < 768) {
        setVideoSrc('/images/home/banner-mob.mp4');
      }
    };

    // Initial video source setting
    updateVideoSource();

    // Update video source on resize
    window.addEventListener('resize', updateVideoSource);

    return () => {
      window.removeEventListener('resize', updateVideoSource);
    };
  }, []);




  //sec 2 & 3 animation
  useEffect(() => {
    const handleScroll = () => {
      var sec2TextElement = null;
      var sec2ImageElement = null;

      const sec3Text1Element = document.getElementById('sec-3-text-1');
      const sec3Text2Element = document.getElementById('sec-3-text-2');
      const sec3ImageElement = document.getElementById('sec-3-image');

      if (window.innerWidth > 1004) {
        sec2TextElement = document.getElementById('scrolling-text-web');
        sec2ImageElement = document.getElementById('sec-2-animation-web-tab');

      }
      else if (window.innerWidth > 767) {
        sec2TextElement = document.getElementById('scrolling-text-tab');
        sec2ImageElement = document.getElementById('sec-2-animation-web-tab');


      }


      if (sec2TextElement) {
        const text = sec2TextElement.textContent;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        console.log("scrollPosition", scrollPosition)
        let coloredText = '';

        // Adjust these values to control speed and offset
        const scrollSensitivity = .3; // Change this value to control speed

        var offset = 0;

        if (window.innerWidth > 1004) {
          offset = -800;
        }

        else if (window.innerWidth > 767) {
          offset = -1100;
        }



        for (let i = 0; i < text.length; i++) {
          const color = ((scrollPosition + offset) / (windowHeight * scrollSensitivity)) > (i / text.length) ? '#fff' : '#777';

          coloredText += `<span style="color: ${color}">${text[i]}</span>`;

          if (window.innerWidth > 767) {
            if (i == 25 || i == 56 || i == 86 || i == 117) {
              coloredText += '<br/>'
            }
          }


        }

        var breakPoint1 = 0;
        var breakPoint2 = 0;
        var breakPoint3 = 0;
        var breakPoint4 = 0;
        var breakPoint5 = 0;
        var breakPoint6 = 0;

        if (window.innerWidth > 1004) {
          var breakPoint1 = 700;
          var breakPoint2 = 1000;
          var breakPoint3 = 1200;
          var breakPoint4 = 1500;
          var breakPoint5 = 1700;
          var breakPoint6 = 1900;
        }
        else if (window.innerWidth > 767) {
          var breakPoint1 = windowHeight;
          var breakPoint2 = windowHeight * 2;
          var breakPoint3 = (windowHeight * 2) + 200;
          var breakPoint4 = (windowHeight * 2) + 500;
          var breakPoint5 = (windowHeight * 2) + 700;
          var breakPoint6 = (windowHeight * 2) + 900;
        }


        if (window.innerWidth > 768) {
          if (scrollPosition < 700) {
            sec2TextElement.classList.remove("in-view");
            sec2TextElement.classList.remove("passed");

            sec2ImageElement.classList.remove("in-view");
            sec2ImageElement.classList.remove("passed");




          }

          else if (scrollPosition > breakPoint1 && scrollPosition < breakPoint2) {

            sec2TextElement.classList.add("in-view");
            sec2TextElement.classList.remove("passed")

            sec2ImageElement.classList.add("in-view");
            sec2ImageElement.classList.remove("passed")

            sec3Text1Element.classList.remove("in-view")
            sec3Text1Element.classList.remove("passed")

            sec3ImageElement.classList.remove("in-view")
            sec3ImageElement.classList.remove("passed")

            sec3Text2Element.classList.remove("in-view")
            sec3Text2Element.classList.remove("passed")


          }
          else if (scrollPosition > breakPoint2 && scrollPosition < breakPoint3) {
            sec2TextElement.classList.remove("in-view")
            sec2TextElement.classList.add("passed");


            sec2ImageElement.classList.remove("in-view");
            sec2ImageElement.classList.add("passed")

            sec3Text1Element.classList.remove("in-view");
            sec3Text1Element.classList.remove("passed");

            sec3ImageElement.classList.remove("in-view");
            sec3ImageElement.classList.remove("passed")

            sec3Text2Element.classList.remove("in-view");
            sec3Text2Element.classList.remove("passed");


          }
          else if (scrollPosition > breakPoint3 && scrollPosition < breakPoint4) {
            sec3Text1Element.classList.add("in-view");
            sec3Text1Element.classList.remove("passed")



          }

          else if (scrollPosition > breakPoint4 && scrollPosition < breakPoint5) {
            sec3ImageElement.classList.add("in-view");
            sec3ImageElement.classList.remove("passed")
          }

          else if (scrollPosition > breakPoint5 && scrollPosition < breakPoint6) {
            sec3Text2Element.classList.add("in-view");
            sec3Text2Element.classList.remove("passed")
          }

          else if (scrollPosition > breakPoint6) {
            sec3Text1Element.classList.remove("in-view");
            sec3Text1Element.classList.add("passed");

            sec3ImageElement.classList.remove("in-view");
            sec3ImageElement.classList.add("passed")

            sec3Text2Element.classList.remove("in-view");
            sec3Text2Element.classList.add("passed");
          }
        }





        sec2TextElement.innerHTML = coloredText;
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 10);

    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1033,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,

        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 500,
          autoplaySpeed: 4000,
          pauseOnHover: true,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: '0px',
        },
      },
    ]

  };


  const settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 3,

    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1033,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: '0px',
        },
      },
    ]

  };

  const settings3 = {
    dots: false,
    infinite: true,
    slidesToShow: 12,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1033,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,

        },
      },
    ]
  };
  const settings4 = {
    dots: false,
    infinite: true,
    slidesToShow: 12,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1033,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,

        },
      },
    ]
  };
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const [content1, setContent1] = useState(false);

  const cont1btn = () => {
    setContent1(!content1);
  }

  const sections = [
    { title: 'Healthcare', content: 'Empower your healthcare organisation with comprehensive IT services, fostering seamless operations, advanced data management, and robust security solutions. Enhance efficiency and connectivity within the healthcare industry, ensuring optimal performance and compliance in a rapidly evolving digital landscape.', path: "/images/home/content-dropdown/Rectangle 185.png" },
    { title: 'Technology', content: 'Strengthen your tech venture with our top IT services. Our solutions seamlessly integrate with your business, enhancing operational efficiency and fostering growth. From automation to cybersecurity, trust us for reliable support that aligns seamlessly with your technological aspirations.', path: "/images/home/content-dropdown/Rectangle 186.png" },
    { title: 'Telecom', content: 'Efficiently navigate the dynamic landscape of the Telecom industry with our specialised IT services. Streamline operations, enhance connectivity, and stay ahead in the competitive market. Our solutions are crafted to optimise performance and ensure seamless technological integration.', path: "/images/home/content-dropdown/Rectangle 187.png" },
    { title: 'Education', content: 'Enhance educational environments with proficient IT services designed to integrate technology seamlessly. Our solutions optimise connectivity, streamline operations, and foster a dynamic learning experience. Elevate your institution`s digital landscape with our specialised support for the education industry.', path: "/images/home/content-dropdown/Rectangle 188.png" },
    { title: 'Travel', content: 'Unlock the potential of your travel business with our IT services. Seamlessly integrate technology to enhance customer experiences, streamline operations, and stay ahead in the dynamic travel industry. Explore innovative solutions that redefine your journey towards success.', path: "/images/home/content-dropdown/Rectangle 189.png" },
    { title: 'Banking Services', content: 'Explore our dynamic suite of IT solutions designed exclusively for the banking industry. Seamlessly integrate innovative technologies to enhance operational efficiency, strengthen security protocols, and foster a resilient digital ecosystem. Elevate your banking experience with our specialised IT services.', path: "/images/home/content-dropdown/Rectangle 190.png" },
    { title: 'Insurance', content: 'Navigating the complex landscape of the insurance industry demands adept IT solutions. Our services address industry challenges head-on, offering nuanced support. From data security to streamlined processes, we ensure your insurance operations flourish in an ever-evolving digital landscape.', path: "/images/home/content-dropdown/Rectangle 191.png" },
    { title: 'Legal', content: 'Enhance your legal operations with our IT solutions, addressing industry challenges seamlessly. Streamline workflow, mitigate data security concerns, and enhance collaboration. Our services optimise your technology landscape, fostering efficiency and resilience in the dynamic legal environment.', path: "/images/home/content-dropdown/Rectangle 192.png" },
    { title: 'Media', content: 'Streamline your media business with our IT services, addressing industry challenges. We enhance efficiency, minimise downtime, and ensure seamless workflows. Our personalised solutions align with your unique needs, fostering innovation and growth in a dynamic media landscape.', path: "/images/home/content-dropdown/Rectangle 193.png" },
    { title: 'Pharma', content: 'Enhance pharmaceutical operations with our proficient IT services, seamlessly integrating technology to optimise processes. Streamline data management, ensure regulatory compliance, and fortify security protocols. Drive efficiency and innovation within the pharmaceutical realm, fostering a resilient and agile industry landscape.', path: "/images/home/content-dropdown/Rectangle 194.png" },
  ];



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



  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [optionListOpened, toggleOptionList] = useState(false)
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

  // const validatePhoneNumber = (phoneNumber, countryCode) => {
  //   try {
  //     const parsedPhoneNumber = isValidPhoneNumber(`+${phoneNumber}`, countryCode);
  //     return parsedPhoneNumber ? null : 'Invalid phone number';
  //   } catch (error) {
  //     return 'Invalid phone number';
  //   }
  // };

  // const validateForm = (data) => {
  //   const errors = {};

  //   // Validate each field and add errors if necessary
  //   if (!data.first_name.trim()) {
  //     errors.first_name = "First name is required.";
  //   }

  //   if (!data.last_name.trim()) {
  //     errors.last_name = "Last name is required.";
  //   }

  //   if (!data.phone_number.trim()) {
  //     errors.phone_number = "Phone number is required.";
  //   }

  //   // else if (!/^\d{10}$/.test(data.phone_number)) {
  //   //   errors.phone_number = "Phone number must be 10 digits.";
  //   // }
  //   else if (validatePhoneNumber(data.phone_number, data.country_code)) {
  //     errors.phone_number = 'Invalid phone number'
  //   }


  //   if (!data.email.trim()) {
  //     errors.email = "Email is required.";
  //   } else if (!/\S+@\S+\.\S+/.test(data.email)) {
  //     errors.email = "Invalid email address.";
  //   }

  //   // if (!data.company_name.trim()) {
  //   //   errors.company_name = "Company name is required.";
  //   // }
  //   if (!data.industry.trim()) {
  //     errors.industry = "Choose Your Industry.";
  //   }

  //   if (data.category === "") {
  //     errors.category = "Choose a Category.";
  //   }
  //   if (!data.message.trim()) {
  //     errors.message = "Enter your message with atleast 100 Character";
  //   }

  //   if (!agree1) {
  //     errors.agree1 = "Please agree the above terms and condition to proceed."
  //   }
  //   if (!agree2) {
  //     errors.agree2 = "Please agree the above terms and condition to proceed."
  //   }
  //   return errors;
  // };
  // const handleSubmit = async (e) => {
  //   console.log("entered into handle submit")
  //   // e.preventDefault();

  //   // Validate the form fields
  //   const validationErrors = validateForm(formData);
  //   console.log("validation errors", validationErrors)
  //   console.log("formData", formData)
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     const phoneNumberWithoutCountryCode = formData.phone_number.substring(formData.country_code.length);
  //     const updatedFormData = { ...formData, phone_number: phoneNumberWithoutCountryCode, country_code: `+${formData.country_code}` };

  //     // Perform the API call
  //     setIsLoading(true)
  //     API.post("/contact_us/", updatedFormData).then((response) => {
  //       // Handle the API response as needed
  //       setIsLoading(false)
  //       setMessage("Your Message is sent Succesfully! Our team will contact you shortly. Thank you for showing interest in ZOG Global.");
  //       setIsMessageModalOpen(true)
  //       window.localStorage.removeItem("emailForSignup")

  //     })
  //       .catch(error => {
  //         // Handle API errors
  //         setIsLoading(false)

  //         setMessage(error.message);
  //         setIsErrorModalOpen(true)
  //       })
  //   }
  // };


  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);


  const sliderRef = useRef(null)
  const sliderRef2 = useRef(null)
  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };
  const next2 = () => {
    sliderRef2.current.slickNext();
  };

  const previous2 = () => {
    sliderRef2.current.slickPrev();
  };







  const [blogData, setBlogData] = useState(null);


  useEffect(() => {

    API.get("blogs/?page_name=generic&section_number=1")

      .then((response) => {

        setBlogData(response.data.slice(0, 4)); // Only take the first 4 items
        setIsLoading(false)



      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);
          setIsErrorModalOpen(true)
        }
        setIsLoading(false)

      });
  }, [blogData])





  return (
    <div className="home-page">
    
      <div className="banner">
        <div className="inner ">
          <div
            className="main-heading only-web montserrat-hard"
            // style={{ color: `rgba(255, 255, 255, ${1 - opacity * 3})` }}>
            style={{ color: `rgba(255, 255, 255, 1)` }}>
           Oval
            <br />Group of Hi-Tech Farms

          </div>
          <div
            className="main-heading only-tab montserrat-hard"
            style={{ color: `rgba(255, 255, 255, 1)` }}>
            Your Next Digital
            <br /> Partner For Innovative
            <br /> IT Services
          </div>
          <div
            className="main-heading only-mob montserrat-hard"
            style={{ color: `rgba(255, 255, 255, 1)` }}>
            Your Next
            <br /> Digital Partner
            <br /> For Innovative
            <br />IT Services
          </div>
          <button

            className="button-primary "
           
            onClick={() => navigate("/contact-us")}>
            BOOK A MEETING
          </button>
        </div>
        <div
          className="bannerimg-home "
          style={{
            backgroundImage: `url("${process.env.REACT_APP_PUBLIC_IMAGES_URL}/home/banner-web.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}></div>
      </div>

      {/* <div style={{ display: "none" }}>
        {videoSrc && (
          <video autoPlay playsinline muted={!bannerSoundOn} loop>
            {/* playsinline   is for i phone autoplay*/}
      {/* <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        <div
          className="mask"
          style={{ background: `rgba(0, 0, 0, ${0.568 + opacity})` }}>
          {bannerSoundOn ? (
            <img
              src="/images/home/speaker-unmuted.svg"
              onClick={() => setBannerSoundOn(!bannerSoundOn)}
              style={{ opacity: `${1 - opacity * 3}` }}></img>
          ) : (
            <img
              src="/images/home/speaker-muted.svg"
              onClick={() => setBannerSoundOn(!bannerSoundOn)}
              style={{ opacity: `${1 - opacity * 3}` }}></img>
          )}
        </div>
      </div> */}

      {/* <div className='sec-2'>
        <p className='title only-web' id="scrolling-text-web" >
          Transform with confidence—<br />innovative IT, seamless digital<br />experiences, robust security.<br /> Your trusted partner for every<br /> step.
        </p>

        <div className='title only-tab' id="scrolling-text-tab" >
          Transform with confidence—<br />innovative IT, seamless digital<br />experiences, robust security.<br /> Your trusted partner for every<br /> step.
        </div>
        <div className='title only-mob' id="scrolling-text-mob" >
          Transform with confidence— innovative IT, seamless digital experiences, robust security. Your trusted partner for every step.
        </div>

        <video autoPlay muted loop className='d-none d-md-block animation' id='sec-2-animation-web-tab'  >
          <source src="/images/home/sec-2-video-web.mp4" type="video/mp4" />
        </video>

        <video autoPlay muted loop className='d-block d-md-none animation' id='sec-2-animation-mob'>
          <source src="/images/home/sec-2-video-mob.mp4" type="video/mp4" />
        </video>
      </div> */}

      <div className="section2-homepage">
        <div className="imglogo-line-home">
          <img
            src="\images\home\Intersect (1).svg"
            className="textlogo-homepage"
          />

          <div className="blueline"></div>
        </div>

        <img
          src="\images\home\bg-triangle.png"
          className="trianglelogo-homepage"
        />

        <div className="slider-container montserrat-lit">


          <img src="\images\home\Frame (2).svg" className='arrow2-home' onClick={previous} />
          <img src="\images\home\Frame (1).svg" className='arrow1-home' onClick={next} />
          <Slider ref={sliderRef} {...settings}>
            <div>
              <div className='hm1' onClick={()=>navigate('/software-development')}>
                <div
                  className="sliderimg"
                >
                  <img src='/images/home/Frame 322.png' className='imo' />
                  <div className='title'>Software Development</div>
                  <p>Craft innovative, high-quality software solutions for diverse business needs.</p>

                </div>
              </div>
            </div>

            <div>
              <div className='hm1' onClick={()=>navigate('/cloud')}>
                <div
                  className="sliderimg"
                >
                  <img src='/images/home/Frame 327.png' className='imo' />
                  <div className='title'>Cloud Solutions</div>
                  <p>Harness the power of cloud computing for scalable and flexible solutions.</p>

                </div>
              </div>
            </div>


            <div>
              <div className='hm1' onClick={()=>navigate('/automation')}>
                <div
                  className="sliderimg"
                >
                  <img src='/images/home/Frame 328.png' className='imo' />
                  <div className='title'>Automation</div>
                  <p>Boost efficiency and reduce manual efforts with streamlined, automated processes.</p>

                </div>
              </div>
            </div>

            <div>
              <div className='hm1' onClick={()=>navigate('/devops')}>
                <div
                  className="sliderimg"
                >
                  <img src='/images/home/Frame 325.png' className='imo' />
                  <div className='title'>DevOps</div>
                  <p>Merge development and operations for faster, more reliable software delivery.</p>
                </div>
              </div>

            </div>


            <div>
              <div className='hm1' onClick={()=>navigate('/devsecops')}>
                <div
                  className="sliderimg"
                >
                  <img src='/images/home/Frame 329.png' className='imo' />
                  <div className='title'>DevSecOps</div>
                    <p>Integrate security seamlessly into the development process for robust apps.</p>

                </div>
              </div>
            </div>

            <div>
              <div className='hm1' onClick={()=>navigate('/advanced-networking-services')}>
                <div
                  className="sliderimg"
                >
                  <img src="\images\home\cybersec\Rectangle 187 (6).png" className='imo' />

                  <div className='title'>Advanced Networking Services</div>
                    <p>Transform connectivity with SD-WAN and SDN for agile, scalable networks.</p>

                </div>
              </div>
            </div>

            <div>
                <div className='hm1' onClick={()=>navigate('/cybersecurity')}>
                  <div
                    className="sliderimg"
                  >
                    <img src="\images\home\cybersec\Rectangle 187 (6).png" className='imo' />

                    <div className='title'>Testing</div>
                    <p>Ensure software reliability through expert testing for optimal performance.</p>

                  </div>
                </div>
              </div>


              <div>
                <div className='hm1'>
                  <div
                    className="sliderimg"
                  >
                    <img src="\images\home\cybersec\Rectangle 187 (6).png" className='imo' />

                    <div className='title'>Unified Communications</div>
                    <p>Seamlessly integrate communication tools for efficient and collaborative workflows.</p>

                  </div>
                </div>
              </div>
          </Slider>
        </div>
      </div>


      <div className="subsection3-home">
        <img src="/images/home/Isolation_Mode.svg" className="build4u" alt="Build 4U" />
        <span className="bl4text montserrat-hard">
          Build
          <span className={`rotating-text ${scrollDirection === 'up' ? 'rotate' : ''}`}>
            4
          </span>


          <br />
          Happiness
        </span>
        <p className="montserrat-lit">
          <span className="montserrat-hard">Transform with confidence -</span>
          <br />
          innovative IT, seamless digital experiences, robust security. Your
          trusted partner for every step.
        </p>
      </div>

      <div className="sec4-homepage">
        <div className="bluecontainer-homepage montserrat-hard">
          <p>Cybersecurity Solutions</p>
          <div className="hr1-homepage"></div>
          <div className='arr-absl'>
            <img src="\images\home\Frame (2).svg" className='arr-homepage' onClick={previous2} />
            <img src="\images\home\Frame (1).svg" className='arr-homepage' onClick={next2} />
          </div>
        </div>

        <div className="secondbluecontainer-homepage">
          <div className="slider-container montserrat-lit">
            <Slider ref={sliderRef2} {...settings2}>
              <div>
                <div className="pageinslider montserrat-lit">
                  <span>01</span>
                  <p>Website Security Audit</p>
                </div>
                <div
                  className="sliderimg"
                  style={{
                    backgroundImage:
                      'url("/images/home/cybersec/Rectangle 187 (1).png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>

                </div>
              </div>

              <div>
                <div className="pageinslider montserrat-lit">
                  <span>02</span>
                  <p>IT Systems Audit</p>
                </div>
                <div
                  className="sliderimg"
                  style={{
                    backgroundImage:
                      'url("/images/home/cybersec/Rectangle 187 (2).png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>

                </div>
              </div>

              <div>
                <div className="pageinslider montserrat-lit">
                  <span>03</span>
                  <p>Penetration Testing</p>
                </div>
                <div
                  className="sliderimg"
                  style={{
                    backgroundImage:
                      'url("/images/home/cybersec/Rectangle 187 (4).png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>

                </div>
              </div>

              <div>
                <div className="pageinslider montserrat-lit">
                  <span>04</span>
                  <p>GDPR Advisory</p>
                </div>
                <div
                  className="sliderimg"
                  style={{
                    backgroundImage:
                      'url("/images/home/cybersec/Rectangle 187 (5).png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>

                </div>
              </div>

              <div>
                <div className="pageinslider montserrat-lit">
                  <span>05</span>
                  <p>ISO27001 Advisory</p>
                </div>
                <div
                  className="sliderimg"
                  style={{
                    backgroundImage:
                      'url("/images/home/cybersec/Rectangle 187 (6).png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>

                </div>
              </div>

              <div>
                <div className="pageinslider montserrat-lit">
                  <span>06</span>
                  <p> PCI-DSS Advisory</p>
                </div>
                <div
                  className="sliderimg"
                  style={{
                    backgroundImage:
                      'url("/images/home/cybersec/Rectangle 187 (7).png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>

                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>


      <div className='sec5-homepage'>
        <div className='linediv-home'>
          <div className='hr2'></div>
        </div>
        <div className='contentdiv-home montserrat-hard'>
          <p className='montserrat-hard'>Industries We <span>Cover</span></p>
        </div>


      </div>



      <div className='sec6-homepage'>
        <div className='maincontentdiv-sec6-home'>
          {sections.map((section, index) => (
            <div className='firstdiv-sec6' key={index}>
              <div className='title-sec6' onClick={() => handleSectionClick(index)}>
                <span className='montserrat-hard'>{section.title}</span>
                <img
                  src="/images/home/Vector (5).svg"
                  alt="Toggle Content"
                  className={activeSection === index ? 'rotate' : ''}
                />
              </div>
              <div className={`content-s6 ${activeSection === index ? 'show' : ''}`}>
                <p>{section.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='forimage-sec6-home'>
          {activeSection !== null ? (
            <img
              src={sections[activeSection].path}
              className='sec6-img'
              alt={sections[activeSection].title}
            />
          ) :
            <img src="\images\home\content-dropdown\Rectangle 185.png" className='sec6-img' />}
        </div>

      </div>














{/* 
      <div className='sec7-homepage'>

        <div className='forimage-sec7' style={{
          backgroundImage:
            'url("/images/home/Contact-form-home.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>





          <form onSubmit={handleSubmit} noValidate className='form-homepage'>
            <div className='textbox urbanist-lit'>
              <div className='f1-box'>
                <label className='labbox'>First name<span>*</span></label>
                <input type='text'
                  id="first_name"
                  name="first_name"
                  className={`inpbox form-control-lg ${errors.first_name ? "is-invalid" : ""}`}
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder='First Name'
                />
                {errors.first_name && <div className="invalid-feedback-home">{errors.first_name}</div>}


              </div>
              <div className='f1-box'>
                <label className='labbox'>Last name <span>*</span></label>
                <input type='text'
                  id="last_name"
                  name="last_name"
                  className={`inpbox form-control-lg ${errors.last_name ? "is-invalid" : ""}`}
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder='Last Name'
                />
                {errors.first_name && <div className="invalid-feedback-home">{errors.last_name}</div>}
              </div>

            </div>
            <div className='textbox urbanist-lit'>
              <div className='f1-box'>
                <label className='labbox'>email<span>*</span></label>
                <input type='text'
                  id="email"
                  name="email"
                  className={`inpbox form-control-lg ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Company Email'
                />
                {errors.email && <div className="invalid-feedback-home">{errors.email}</div>}
              </div>
              <div className='f1-box'>
                <label className='labbox'>country <span>*</span></label>
                <select type='text' className=' form-control-lg' value={formData.country} name='country'  onChange={handleChange} >
                  {countries && countries.map((item, index) => {
                    return (
                      <option value={item} label={item}></option>
                    )
                  })}
                </select>

              </div>

            </div>
            <div className='textbox urbanist-lit'>
              <div className='f1-box'>
                <label className='labbox'>Phone No.<span>*</span></label>
                <PhoneInput
                  inputProps={{
                    name: 'phone_number',
                    id: 'phone_number',
                    className: 'inpboxph form-control-lg',
                    placeholder: 'Phone Number',
                  }}
                  country={'gb'}
                  value={formData.phone_number}
                  onChange={(value, country) => handlePhoneChange(value, country)}
                />
                {errors.phone_number && <div className="invalid-feedback-home">{errors.phone_number}</div>}
              </div>

              <div className='f1-box'>
                <label className='labbox'>company <span>*</span></label>
                <input type='text'
                  id="company_name"
                  name="company_name"
                  className={`inpbox form-control-lg ${errors.company_name ? "is-invalid" : ""}`}
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder='Company Name'
                />

              </div>
              {errors.company_name && <div className="invalid-feedback-home">{errors.company_name}</div>}

            </div>
            
            <div className='textbox urbanist-lit'>
              <div className='f2-box'>
                <label className='labbox'>Type of Enquiry<span>*</span></label>
                <select type='text'
                  id="message"
                  name="category"
                  className={`inpbox2 form-control-lg ${errors.category ? "is-invalid" : ""}`}
                  value={formData.category}
                  onChange={handleChange}
                  placeholder='Select here..'
                >
                      <option value="General Enquiry" label="General Enquiry"></option>
                      <option value="Cyber Security" label="Cyber Security"></option>
                      <option value="Software Development" label="Software Development"></option>

                </select>
                {errors.category && <div className="invalid-feedback-home">{errors.category}</div>}
              </div>

            </div>

            <div className='textbox urbanist-lit'>
              <div className='f2-box'>
                <label className='labbox'>Message<span>*</span></label>
                <textarea type='text'
                  id="message"
                  name="message"
                  className={`inpbox2 form-control-lg ${errors.message ? "is-invalid" : ""}`}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Type your message here..'
                ></textarea>
                {errors.message && <div className="invalid-feedback-home">{errors.message}</div>}
              </div>

            </div>

            
            <button>
              SEND
            </button>


          </form>



          <div className='pack'>
            <p className='montserrat-hard'>From Code to Success</p>
            <button
              className="button montserrat-hard "
              onClick={() => navigate("/contact-us")}>
              DISCUSS WITH US
            </button>

          </div>


        </div>
        <div className='forcontent-sec7'>
          <div className='title-sec7-in montserrat-hard'>
            Tech Stack

          </div>
          <div className='logo-small-home'>

            <div className="slider-container">
              <Slider {...settings3}>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Dark.png" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Tech Stack Logos\reactjs\Dark.svg" className='img-sec7-small' />

                  </div>
                </div>


                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Dark.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 46.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 33.svg" className='img-sec7-small' />

                  </div>

                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 65.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 66.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 73.svg" className='img-sec7-small' />

                  </div>

                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 74.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Dark.png" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Tech Stack Logos\reactjs\Dark.svg" className='img-sec7-small' />

                  </div>
                </div>


                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Dark.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 46.svg" className='img-sec7-small' />

                  </div>
                </div>




              </Slider>









              <Slider {...settings4}>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\logo21.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 98.svg" className='img-sec7-small' />

                  </div>
                </div>


                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 25.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 39.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 49.svg" className='img-sec7-small' />

                  </div>

                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 51.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 58.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 21.svg" className='img-sec7-small' />

                  </div>

                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 24.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 25.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 39.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 49.svg" className='img-sec7-small' />

                  </div>

                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 51.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 58.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 21.svg" className='img-sec7-small' />

                  </div>

                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 24.svg" className='img-sec7-small' />

                  </div>
                </div>



              </Slider>







              <Slider {...settings3}>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 100.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 99.svg" className='img-sec7-small' />

                  </div>
                </div>


                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Vector.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 91.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 92.svg" className='img-sec7-small' />

                  </div>

                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 95.svg" className='img-sec7-small' />

                  </div>
                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 94.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 97.svg" className='img-sec7-small' />

                  </div>

                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 96.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 93.svg" className='img-sec7-small' />

                  </div>
                </div>


                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 79.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 85.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 94.svg" className='img-sec7-small' />

                  </div>
                </div>
                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 92.svg" className='img-sec7-small' />

                  </div>

                </div>

                <div>
                  <div className='smallbox-sec7'>
                    <img src="\images\home\Group 95.svg" className='img-sec7-small' />

                  </div>
                </div>




              </Slider>
            </div>


          </div>

        </div>

      </div> */}





      <div className='sec8-homepage'>
        <p className='montserrat-hard'>Blog Highlights</p>
        <div className='boxcontent-sec8'>
          <div className='firstsec8'>
            {blogData && blogData.slice(0, 2).map((blog, index) => (
              <div key={index} className='box1 montserrat-lit '
                style={{
                  backgroundImage: `url(${blog.image_url})`,
                  backgroundSize: "cover",
                }}
                onClick={() => navigate(`/blog-details/${blog.id}`)}>
                  <div className='inner'>
                <p className='montserrat-hard'>
                  {blog.title}</p>
                <span>{blog.extra}</span>
                <span>{blog.created_at}</span>
                <img src="\images\home\arrow-bl-anim.svg" className='arrow-sec8' />
</div>
              </div>
            ))}



          </div>
          <div className='secondsec8'>
            {blogData && blogData.slice(2, 3).map((blog, index) => (
              <div className='box3 montserrat-lit ' style={{
                backgroundImage: `url(${blog.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
                <div className='inner'>
                <p className='montserrat-hard'>{blog.title}</p>
                <span>{blog.extra}</span>
                <span>{blog.created_at}</span>
                <img src="\images\home\arrow-bl-anim.svg" className='arrow-sec8' />

                </div> 
                </div>
            ))}
            {blogData && blogData.slice(3, 4).map((blog, index) => (
              <div className='box4 montserrat-lit ' style={{
                backgroundImage: `url(${blog.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
                <div className='inner'>
                <p className='montserrat-hard'>{blog.title}</p>
                <span>{blog.extra}</span>
                <span>{blog.created_at}</span>
                <img src="\images\home\arrow-bl-anim.svg" className='arrow-sec8' />
                </div>
              </div>
            ))}

          </div>

        </div>


      </div>














      {/* <div className='sec-5 d-none d-lg-block'>
        <div className='title'>
          INDUSTRIES WE COVER
        </div>
        <div className='tab-view'>
          <div className="tab-btn-container">
            {sec5Data.map((item, index) => {
              return (
                <div key={index} className={tabSelected == index ? "tab-btn active" : 'tab-btn'} onClick={() => selectTab(index)}><div className='number'>{index < 9 && "0"}{index + 1}</div><div className='text'>{item.title}</div></div>

              )
            })}
          </div>
          <div className='tab-content-container' >
            {sec5Data.map((item, index) => {
              return (
                <div className={tabSelected == index ? "tab-content active" : 'tab-content'} key={index}>
                  <p>{item.description}</p>
                  <button className='btn-transparent-arrow' onClick={() => navigate(item.link)}>Learn More</button>
                </div>
              )
            })}

            <div className='line'></div>


          </div>
        </div>
      </div>  */}

      {/* 
       <div className='sec-5 d-block d-lg-none'>
        <div className='title'>
          INDUSTRIES WE COVER
        </div>
        <div className='tab-view'>

          {sec5Data.map((item, index) => {
            return (
              <div key={index}>
                <div className={tabSelected == index ? "tab-btn active" : 'tab-btn'} onClick={tabSelected === index ? () => selectTab(null) : () => selectTab(index)}><div className='number'>{index < 9 && "0"}{index + 1}</div><div className='text'>{item.title}</div></div>
                <div className='tab-content-container' onClick={() => { selectTab(null) }}>
                  <div className={tabSelected == index ? "tab-content active" : 'tab-content'}>
                    <p>{item.description}</p>
                    <button className='btn-transparent-arrow' onClick={() => navigate(item.link)}>Learn More
                    </button>
                  </div>
                  <div className='line'></div>
                </div>
              </div>
            )
          })}



        </div>
      </div> */}

      {isLoading && <FixedOverlayLoadingSpinner />}

      <ErrorModal
        state={isErrorModalOpen}
        message={message}
        setterFunction={setIsErrorModalOpen}
        okClickedFunction={() => navigate("/")}
      />
      {isMessageModalOpen && (
        <PositiveModal
          message={message}
          setterFunction={setIsMessageModalOpen}
          okClickedFunction={() => { }}
        />
      )}
    </div>
  );


}

export default Userhome