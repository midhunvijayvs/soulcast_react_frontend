import React, { useEffect, useState, useRef } from 'react'
import './ResumePreview.scss'

import { useNavigate } from 'react-router-dom';

import ErrorModal from "../../../ErrorModal.js";
import PositiveModal from "../../../PositiveModal.js";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner.js"
import $ from 'jquery';


import {fetchResumeDataAndGeneratePdf} from '../../../GeneralFunctions'



const ResumePreview = ({ userData, loadUserData }) => {
  const navigate = useNavigate();


  const [tabSelected, selectTab] = useState(0);

  const [message, setMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [bannerSoundOn, setBannerSoundOn] = useState(false)
  const [videoSrc, setVideoSrc] = useState('');

  const data = {
    name: "midhun vijay v s",
    title: "Exceptional Technical Aptitude, Innovative Architectural Vision, 2year and 11 months Full Time Industrial Experience + 3 Months training course + 3 Years Hobby Freelance Experience.",
    email: "midhunvijayvs@gmail.com",
    phone: "+919605556054",
    house_name: "Saketham",
    room_number: "",
    posttown: "Koothali",
    sub_city: "Perambra",
    city: "Kozhikode",
    state: "Kerala",
    country: "India",
    summary: "A genius level technical problem solver. Have broad and deep knowledge, skills and true enthusiasm in general science and technology. Educated myself for the aptitude that, Learning a technology is not about just learning how to use the tools, It is also the development of the temper to use the tool for the creative betterment of the systems. Always try to Learn a tool by understanding the exact working mechanism and intention of making the tool clearly and deeply. Hence I am a fast learner and after learning, can apply it creatively and in the best productive way.",
    career_objective: "To be one of the best Engineers on the planet. To contribute breakthrough innovative ideas to the technical knowledge pool of the world.",
    soft_skills: [
      "Outstanding Technical Aptitude - I love  to build and alter Machines  ",
      "Outstanding Creativity- Have  good sense of technical designing,  can Invent, Design, Improve and make significant changes",
      "Excellent Communication skill- Can explain ideas effectively.  ",
      "Excellent in critical Analysis and problem solving – can make solutions to any critical problems if it is solvable by any human being. ",
      "Right Vision-I can make prophecy on the future of a system and architectural decisions based on scientific and rational analysis ",
      "Can manage and make result of a work with minimum guidance and supervision in a competitive environment ",

    ],
    technical_skills: [
      "HTML",
      "CSS",
      "SAAS",
      "JS",
      "ReactJS",
      "Django",
      "Laravel",
    ],

    work_history: [
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },

    ],

    education: [
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
    ],

    accomplishments: [
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
    ],

    certifications: [
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
    ],

    hobbies: [
      {
        title: "Android Application Developer",
        company: "Freelance",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        company_city:"Kozhikode",
        company_state:"Kerala",
        company_country:"India",
        from_date: "02-2014",
        to_date: " 02-2021",
        short_description: "Freelance",
        detailed_description: "Created a number of applications for personal and business uses including a high end mathematical processing app for calculating quantity of content to be added to mix feed for our farming business.  Designed user interfaces that engaged multiple senses and produced. immersive experiences. Java:- Used java as the functional language for the applications. Expert in all basic functionalities of java. xml :- Used xml for designing UI for the app. oops :- Used all possibilities of the oops concept in java, gained expert level knowledge and working skills on oops concepts.",
      },
    ],
  }

  // useEffect(() => {
  //   $(function () {
  //     $(window).scrollTop(0);
  //   });
  // }, [])

  const [opacity, setOpacity] = useState(0);





  useEffect(() => {
    // Ensure the DOM is fully loaded
    $(document).ready(function() {
      // Get the height of the main-content div
      const mainContentHeight = $('.main-content').height();
      
      // Apply the same height to the side-pane and page divs
      $('.side-pane').height(mainContentHeight);
      $('.page').height(mainContentHeight);
    });
  }, []);




  return (
    <div className='resume-preview-page'>



      <div className='page'>
        <button className='download-button' onClick={()=>fetchResumeDataAndGeneratePdf(1)}>Download PDF</button>
        <div className='side-pane'>

        </div>

        <div className='main-content'>


          <div className='section top-section'>
            <div className='lhs'>
              <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/profile-image.png`}></img>
            </div>
            <div className='rhs'>
              <div className='name'>{data.name}</div>
              <div className='resume-title'>{data.title}</div>

              <div className='address strip'>
                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#091d54" />
                  <path d="M50 10c-13.81 0-25 11.19-25 25 0 18.75 25 45 25 45s25-26.25 25-45c0-13.81-11.19-25-25-25zm0 32.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="#ffffff" />
                </svg>

                <div className='text'>{data.house_name},</div>
                <div className='text'>{data.room_number && data.room_number + ","}</div>
                <div className='text'>{data.posttown}, </div>
                <div className='text'>{data.sub_city},</div>
                <div className='text'>{data.city}, </div>
              </div>

              <div className='address strip'>
                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#091d54" />

                  <path d="M72 30H28c-2.21 0-4 1.79-4 4v32c0 2.21 1.79 4 4 4h44c2.21 0 4-1.79 4-4V34c0-2.21-1.79-4-4-4zm0 8L50 53 28 38V34l22 15 22-15v4z" fill="#ffffff" />
                </svg>


                <div className='text'>{data.email},</div>

              </div>

              <div className='address strip'>
                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#091d54" />

                  <path d="M70.66,66.36c-2.5,0-5-.4-7.39-1.2-1.82-.6-3.8-.18-5.14,1.11l-4.71,4.32c-10.79-5.48-19.7-14.38-25.19-25.18l4.31-4.71c1.29-1.34,1.72-3.32,1.11-5.14-2.01-6.11-3.01-12.51-3.01-18.93,0-2.76-2.24-5-5-5H23.67c-2.76,0-5,2.24-5,5,0,27.57,22.43,50,50,50,2.76,0,5-2.24,5-5v-6.79C75.66,68.61,73.42,66.36,70.66,66.36z" fill="#ffffff" />
                </svg>


                <div className='text'>{data.phone},</div>

              </div>



            </div>
          </div>

          <div className='section summary-section'>
            <div className='lhs'>
            </div>
            <div className='rhs'>
              <h2>Summary</h2>
              <p>{data.summary}</p>
            </div>
          </div>

          <div className='section career-objective-section'>
            <div className='lhs'>

            </div>
            <div className='rhs'>
              <h2>Career Objective</h2>
              <p>{data.career_objective}</p>
            </div>
          </div>


          <div className='section timeline-section skills-section'>



            <div className='title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/skills.svg`}></img>
                <h1>Skills</h1>
              </div>

            </div>

            {data && data.soft_skills.map((item, index) => {
              return (
                <div className='timeline-segment'>
                  <div className='lhs'>
                  </div>

                  <div className='rhs'>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/timeline-bullet.svg`}></img>

                    <div className='center-part'>
                      <p className='text'>{item}</p>
                    </div>

                    <div className='right-part'>
                    </div>

                  </div>
                </div>
              )
            })}


          </div>


          <div className='section timeline-section work-history-section'>



            <div className='title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/work-history.svg`}></img>
                <h1>Work History</h1>
              </div>

            </div>

            {data && data.work_history.map((item, index) => {
              return (
                <div className='timeline-segment'>
                  <div className='lhs'>
                  <p className='text'>{item.from_date} - {item.to_date}</p>
                  </div>

                  <div className='rhs'>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/timeline-bullet.svg`}></img>
                    <div className='center-part'>
                      <h2 className='text'>{item.title}</h2>
                      <p className='text'><strong>{item.company}</strong>, {item.company_city}, {item.company_state}, {item.company_country}</p>
                      
                      <p className='text'>{item.short_description}</p>
                      <p className='text'>{item.detailed_description}</p>
                    </div>
                    <div className='right-part'>
                    </div>

                  </div>
                </div>
              )
            })}


          </div>


          <div className='section timeline-section education-section'>



            <div className='title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/education.svg`}></img>
                <h1>Education</h1>
              </div>

            </div>

            {data && data.education.map((item, index) => {
              return (
                <div className='timeline-segment'>
                  <div className='lhs'>
                  <p className='text'>{item.from_date} - {item.to_date}</p>
                  </div>

                  <div className='rhs'>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/timeline-bullet.svg`}></img>
                    <div className='center-part'>
                      <h2 className='text'>{item.title}</h2>
                      <p className='text'><strong>{item.company}</strong>, {item.company_city}, {item.company_state}, {item.company_country}</p>
                      
                      <p className='text'>{item.short_description}</p>
                      <p className='text'>{item.detailed_description}</p>
                    </div>
                    <div className='right-part'>
                    </div>

                  </div>
                </div>
              )
            })}


          </div>


          <div className='section timeline-section accomplishments-section'>



            <div className='title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/certifications.svg`}></img>
                <h1>Certifications</h1>
              </div>

            </div>

            {data && data.certifications.map((item, index) => {
              return (
                <div className='timeline-segment'>
                  <div className='lhs'>
                  <p className='text'>{item.from_date} - {item.to_date}</p>
                  </div>

                  <div className='rhs'>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/timeline-bullet.svg`}></img>
                    <div className='center-part'>
                      <h2 className='text'>{item.title}</h2>
                      <p className='text'><strong>{item.company}</strong>, {item.company_city}, {item.company_state}, {item.company_country}</p>
                      
                      <p className='text'>{item.short_description}</p>
                      <p className='text'>{item.detailed_description}</p>
                    </div>
                    <div className='right-part'>
                    </div>

                  </div>
                </div>
              )
            })}


          </div>


          <div className='section timeline-section certificates-section'>



            <div className='title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/accomplishments.svg`}></img>
                <h1>Accomplishments</h1>
              </div>

            </div>

            {data && data.accomplishments.map((item, index) => {
              return (
                <div className='timeline-segment'>
                  <div className='lhs'>
                  <p className='text'>{item.from_date} - {item.to_date}</p>
                  </div>

                  <div className='rhs'>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/timeline-bullet.svg`}></img>
                    <div className='center-part'>
                      <h2 className='text'>{item.title}</h2>
                      <p className='text'><strong>{item.company}</strong>, {item.company_city}, {item.company_state}, {item.company_country}</p>
                      
                      <p className='text'>{item.short_description}</p>
                      <p className='text'>{item.detailed_description}</p>
                    </div>
                    <div className='right-part'>
                    </div>

                  </div>
                </div>
              )
            })}
           


          </div>


          <div className='section timeline-section hobbies-section'>



            <div className='title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/hobbies.svg`}></img>
                <h1>Hobbies</h1>
              </div>

            </div>

            {data && data.hobbies.map((item, index) => {
              return (
                <div className='timeline-segment'>
                  <div className='lhs'>
                  <p className='text'>{item.from_date} - {item.to_date}</p>
                  </div>

                  <div className='rhs'>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/timeline-bullet.svg`}></img>
                    <div className='center-part'>
                      <h2 className='text'>{item.title}</h2>
                      <p className='text'><strong>{item.company}</strong>, {item.company_city}, {item.company_state}, {item.company_country}</p>
                      
                      <p className='text'>{item.short_description}</p>
                      <p className='text'>{item.detailed_description}</p>
                    </div>
                    <div className='right-part'>
                    </div>

                  </div>
                </div>
              )
            })}


          </div>



        </div>
      </div>

      {isLoading && <FixedOverlayLoadingSpinner />}


      <ErrorModal state={isErrorModalOpen} message={message} setterFunction={setIsErrorModalOpen} okClickedFunction={() => navigate("/")} />
      {isMessageModalOpen && <PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={() => { }} />}

    </div >

  );


}

export default ResumePreview