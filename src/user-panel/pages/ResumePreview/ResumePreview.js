import React, { useEffect, useState, useRef } from 'react'
import './ResumePreview.scss'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import ErrorModal from "../../../ErrorModal.js";
import PositiveModal from "../../../PositiveModal.js";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner.js"
import $ from 'jquery';
import API from "../../../API.js"

import { fetchResumeDataAndGeneratePdf } from '../../../GeneralFunctions'


const ResumePreview = ({ userData, loadUserData }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract 'id' from the URL

  const mainContentRef = useRef(null);
  const sidePaneRef = useRef(null);
  const pageRef = useRef(null);

  const [data, setData] = useState(
   
    {
    "id": 1,
    "soft_skills": [
      {
        "id": 1,
        "skill": "Outstanding Technical Aptitude - I love  to build and alter Machines",
        "created_at": "2025-02-06T19:59:00.511085Z",
        "updated_at": "2025-02-06T19:59:00.511093Z",
        "resume": 1
      },
      {
        "id": 2,
        "skill": "Outstanding Creativity- Have  good sense of technical designing,  can Invent, Design, Improve and make significant changes",
        "created_at": "2025-02-06T19:59:00.515304Z",
        "updated_at": "2025-02-06T19:59:00.515311Z",
        "resume": 1
      },
      {
        "id": 3,
        "skill": "Excellent in critical Analysis and problem solving – can make solutions to any critical problems if it is solvable by any human being.",
        "created_at": "2025-02-06T19:59:00.516119Z",
        "updated_at": "2025-02-06T19:59:00.516125Z",
        "resume": 1
      },
      {
        "id": 4,
        "skill": "Right Vision-I can make prophecy on the future of a system and architectural decisions based on scientific and rational analysis",
        "created_at": "2025-02-06T19:59:00.517051Z",
        "updated_at": "2025-02-06T19:59:00.517058Z",
        "resume": 1
      },
      {
        "id": 5,
        "skill": "Can manage and make result of a work with minimum guidance and supervision in a competitive environment",
        "created_at": "2025-02-06T19:59:00.517581Z",
        "updated_at": "2025-02-06T19:59:00.517587Z",
        "resume": 1
      }
    ],
    "technical_skills": [
      {
        "id": 1,
        "skill": "ReactJS",
        "created_at": "2025-02-06T19:59:00.518676Z",
        "updated_at": "2025-02-06T19:59:00.518683Z",
        "resume": 1
      },
      {
        "id": 2,
        "skill": "Django",
        "created_at": "2025-02-06T19:59:00.521744Z",
        "updated_at": "2025-02-06T19:59:00.521751Z",
        "resume": 1
      },
      {
        "id": 3,
        "skill": "Laravel",
        "created_at": "2025-02-06T19:59:00.522645Z",
        "updated_at": "2025-02-06T19:59:00.522651Z",
        "resume": 1
      },
      {
        "id": 4,
        "skill": "HTML",
        "created_at": "2025-02-06T19:59:00.523495Z",
        "updated_at": "2025-02-06T19:59:00.523502Z",
        "resume": 1
      },
      {
        "id": 5,
        "skill": "CSS",
        "created_at": "2025-02-06T19:59:00.524040Z",
        "updated_at": "2025-02-06T19:59:00.524046Z",
        "resume": 1
      },
      {
        "id": 6,
        "skill": "SAAS",
        "created_at": "2025-02-06T19:59:00.524701Z",
        "updated_at": "2025-02-06T19:59:00.524707Z",
        "resume": 1
      },
      {
        "id": 7,
        "skill": "JS",
        "created_at": "2025-02-06T19:59:00.525478Z",
        "updated_at": "2025-02-06T19:59:00.525485Z",
        "resume": 1
      }
    ],
    "work_history": [
      {
        "id": 1,
        "title": "Full Stack Developer Team Lead",
        "company": "ZOG Global pvt. ltd.",
        "company_city": "Darlington",
        "company_state": "Darlington",
        "company_country": "UK",
        "from_date": "2023-03-01",
        "to_date": "Current",
        "short_description": "Team lead and product architect. React and Django Rest API.",
        "detailed_description": "Directing, making decisions and coordinating a team of 2 designers and 2 developers in  the whole process from the user story to the final product testing. The major tasks I under take are : making user experience and business goal oriented decisions  for each minute details and advising them to the  UI design team for wire framing, designing high levels of API, giving optimized back end logic high level plans to the back end developers, solving logical issues they face. My direct development works are mainly on the front end web development with react. Developed  front end of 8 complete apps as follows \r\nzog 1-Companies own primary wesite\r\nzog 2- Companies own primary wesite rewamp\r\nmeadowview nursing home- A portfollio website\r\nFriends malayali - A complete shopping web app\r\nSibu fish and Meat - a special pupose shopping web app\r\nTravelista -  A portfollio website\r\nReserve finacial services 1  -  A portfollio website\r\nBestfoods - A complete shopping web app",
        "created_at": "2025-02-09T06:22:35.525337Z",
        "updated_at": "2025-02-10T07:41:31.605250Z",
        "resume": 1
      },
      {
        "id": 2,
        "title": "Full Stack Lead Developer",
        "company": "Tranetech Software Solutions",
        "company_city": "Kozhikode",
        "company_state": "Kerala",
        "company_country": "India",
        "from_date": "2022-08-01",
        "to_date": "2022-12-31",
        "short_description": "Worked as full Stack Software Developer. Worked on ReactJS and Laravel .",
        "detailed_description": "Expert Level Experienced in React on;-\r\n How to make use of react in its best for saving time effort and code size.\r\n Class Components & Function Components\r\n Hooks\r\n Planning optimal reuse of components.\r\n Optimal Planning and implementing of States and props\r\n Redux Library\r\n MUI, antD UI Libraries, their customizations as well as Making custom UI\r\nlibraries.\r\n AXIOS API integration with file handling.\r\n User authentication with token.\r\nBeginner Level Experienced in Laravel on:-\r\n Migration and Models\r\n Request Routings.\r\n Optimal designing and implementation of Controllers.\r\n File storage and retrieval.\r\n MySQL and MariaDB Database Handling including usage of foreign keys.\r\n Can Make APIs for all basic operations on database.",
        "created_at": "2025-02-10T07:41:31.607064Z",
        "updated_at": "2025-02-10T07:41:31.607072Z",
        "resume": 1
      }
    ],
    "education": [
      {
        "id": 10,
        "qualification_name": "B.Tech",
        "level": "Graduation",
        "subject": "Applied Electronics And Instrumentation",
        "institute_name": "Govt. Engineering College",
        "institute_city": "Kozhikode",
        "institute_country": "India",
        "agregate_marks": "59",
        "marks_unit": "%",
        "description": "Elected Artificial Intelligence as optional subject.",
        "from_date": "2008-06-01",
        "to_date": "2012-03-31",
        "created_at": "2025-02-08T05:53:20.932230Z",
        "updated_at": "2025-02-08T09:46:18.476023Z",
        "resume": 1
      },
      {
        "id": 11,
        "qualification_name": "GATE Qualified",
        "level": "Competition Exam",
        "subject": "INSTRUMENTATION",
        "institute_name": "IIT Madras",
        "institute_city": "Madras",
        "institute_country": "India",
        "agregate_marks": "2514",
        "marks_unit": "AIR",
        "description": "Qualified with All India Rank: 2514",
        "from_date": "2013-03-01",
        "to_date": "2013-03-01",
        "created_at": "2025-02-08T09:46:18.477143Z",
        "updated_at": "2025-02-08T09:46:18.477149Z",
        "resume": 1
      },
      {
        "id": 12,
        "qualification_name": "Plus Two",
        "level": "Higher Secondary",
        "subject": "Science",
        "institute_name": "HSS Perambra",
        "institute_city": "Kozhikode",
        "institute_country": "India",
        "agregate_marks": "86",
        "marks_unit": "%",
        "description": "Passed with Distinction . Aggregate marks of 86%",
        "from_date": "2006-06-01",
        "to_date": "2008-03-31",
        "created_at": "2025-02-08T09:56:58.640040Z",
        "updated_at": "2025-02-08T09:56:58.640047Z",
        "resume": 1
      },
      {
        "id": 13,
        "qualification_name": "SSLC",
        "level": "High School",
        "subject": "General",
        "institute_name": "Koothali VHSS",
        "institute_city": "Kozhikode",
        "institute_country": "India",
        "agregate_marks": "82",
        "marks_unit": "%",
        "description": "Passed with Distinction with 82% Marks. Topper in science subjects in the\r\nschool.",
        "from_date": "1995-06-01",
        "to_date": "2006-03-31",
        "created_at": "2025-02-08T09:58:35.568157Z",
        "updated_at": "2025-02-08T09:58:35.568164Z",
        "resume": 1
      }
    ],
    "accomplishments": [],
    "hobbies": [],
    "name": "Midhun Vijay V. S.",
    "title": "Exceptional Technical Aptitude, Innovative Architectural Vision, 3year Full Time Industrial Experience + 3 Months training course + 3 Years Hobby Freelance Experience.",
    "email": "midhunvijayvs@gmail.com",
    "phone": "+91 96055-56054",
    "house_name": "Saketham",
    "room_number": "",
    "posttown": "Koothali",
    "sub_city": "Perambra",
    "city": "Kozhikode",
    "state": "Kerala",
    "country": "India",
    "summary": "A genius level technical problem solver. Have broad and deep knowledge, skills, temper and true enthusiasm in general science and technology. Educated myself for the aptitude that, Learning a technology is not about just learning how to use the tools, It is also the development of the temper to use the tool for the creative betterment of the systems. Always try to Learn a tool by understanding the exact working mechanism and intention of making the tool clearly and deeply. Hence I am a fast learner and after learning, can apply it creatively and in the best productive way.",
    "career_objective": "To be one of the best Engineers on the planet. To contribute breakthrough innovative ideas to the technical knowledge pool of the world.",
    "created_at": "2025-02-06T19:59:00.503965Z",
    "updated_at": "2025-02-10T07:41:31.601853Z"
  }

);

  const [tabSelected, selectTab] = useState(0);

  const [message, setMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [bannerSoundOn, setBannerSoundOn] = useState(false)
  const [videoSrc, setVideoSrc] = useState('');

  const testdata ={
  "id": 1,
  "soft_skills": [
    {
      "id": 1,
      "skill": "Outstanding Technical Aptitude - I love  to build and alter Machines",
      "created_at": "2025-02-06T19:59:00.511085Z",
      "updated_at": "2025-02-06T19:59:00.511093Z",
      "resume": 1
    },
    {
      "id": 2,
      "skill": "Outstanding Creativity- Have  good sense of technical designing,  can Invent, Design, Improve and make significant changes",
      "created_at": "2025-02-06T19:59:00.515304Z",
      "updated_at": "2025-02-06T19:59:00.515311Z",
      "resume": 1
    },
    {
      "id": 3,
      "skill": "Excellent in critical Analysis and problem solving – can make solutions to any critical problems if it is solvable by any human being.",
      "created_at": "2025-02-06T19:59:00.516119Z",
      "updated_at": "2025-02-06T19:59:00.516125Z",
      "resume": 1
    },
    {
      "id": 4,
      "skill": "Right Vision-I can make prophecy on the future of a system and architectural decisions based on scientific and rational analysis",
      "created_at": "2025-02-06T19:59:00.517051Z",
      "updated_at": "2025-02-06T19:59:00.517058Z",
      "resume": 1
    },
    {
      "id": 5,
      "skill": "Can manage and make result of a work with minimum guidance and supervision in a competitive environment",
      "created_at": "2025-02-06T19:59:00.517581Z",
      "updated_at": "2025-02-06T19:59:00.517587Z",
      "resume": 1
    }
  ],
  "technical_skills": [
    {
      "id": 1,
      "skill": "ReactJS",
      "created_at": "2025-02-06T19:59:00.518676Z",
      "updated_at": "2025-02-06T19:59:00.518683Z",
      "resume": 1
    },
    {
      "id": 2,
      "skill": "Django",
      "created_at": "2025-02-06T19:59:00.521744Z",
      "updated_at": "2025-02-06T19:59:00.521751Z",
      "resume": 1
    },
    {
      "id": 3,
      "skill": "Laravel",
      "created_at": "2025-02-06T19:59:00.522645Z",
      "updated_at": "2025-02-06T19:59:00.522651Z",
      "resume": 1
    },
    {
      "id": 4,
      "skill": "HTML",
      "created_at": "2025-02-06T19:59:00.523495Z",
      "updated_at": "2025-02-06T19:59:00.523502Z",
      "resume": 1
    },
    {
      "id": 5,
      "skill": "CSS",
      "created_at": "2025-02-06T19:59:00.524040Z",
      "updated_at": "2025-02-06T19:59:00.524046Z",
      "resume": 1
    },
    {
      "id": 6,
      "skill": "SAAS",
      "created_at": "2025-02-06T19:59:00.524701Z",
      "updated_at": "2025-02-06T19:59:00.524707Z",
      "resume": 1
    },
    {
      "id": 7,
      "skill": "JS",
      "created_at": "2025-02-06T19:59:00.525478Z",
      "updated_at": "2025-02-06T19:59:00.525485Z",
      "resume": 1
    }
  ],
  "work_history": [
    {
      "id": 1,
      "title": "Full Stack Developer Team Lead",
      "company": "ZOG Global pvt. ltd.",
      "company_city": "Darlington",
      "company_state": "Darlington",
      "company_country": "UK",
      "from_date": "2023-03-01",
      "to_date": "Current",
      "short_description": "Team lead and product architect. React and Django Rest API.",
      "detailed_description": "Directing, making decisions and coordinating a team of 2 designers and 2 developers in  the whole process from the user story to the final product testing. The major tasks I under take are : making user experience and business goal oriented decisions  for each minute details and advising them to the  UI design team for wire framing, designing high levels of API, giving optimized back end logic high level plans to the back end developers, solving logical issues they face. My direct development works are mainly on the front end web development with react. Developed  front end of 8 complete apps as follows \r\nzog 1-Companies own primary wesite\r\nzog 2- Companies own primary wesite rewamp\r\nmeadowview nursing home- A portfollio website\r\nFriends malayali - A complete shopping web app\r\nSibu fish and Meat - a special pupose shopping web app\r\nTravelista -  A portfollio website\r\nReserve finacial services 1  -  A portfollio website\r\nBestfoods - A complete shopping web app",
      "created_at": "2025-02-09T06:22:35.525337Z",
      "updated_at": "2025-02-10T07:41:31.605250Z",
      "resume": 1
    },
    {
      "id": 2,
      "title": "Full Stack Lead Developer",
      "company": "Tranetech Software Solutions",
      "company_city": "Kozhikode",
      "company_state": "Kerala",
      "company_country": "India",
      "from_date": "2022-08-01",
      "to_date": "2022-12-31",
      "short_description": "Worked as full Stack Software Developer. Worked on ReactJS and Laravel .",
      "detailed_description": "Expert Level Experienced in React on;-\r\n How to make use of react in its best for saving time effort and code size.\r\n Class Components & Function Components\r\n Hooks\r\n Planning optimal reuse of components.\r\n Optimal Planning and implementing of States and props\r\n Redux Library\r\n MUI, antD UI Libraries, their customizations as well as Making custom UI\r\nlibraries.\r\n AXIOS API integration with file handling.\r\n User authentication with token.\r\nBeginner Level Experienced in Laravel on:-\r\n Migration and Models\r\n Request Routings.\r\n Optimal designing and implementation of Controllers.\r\n File storage and retrieval.\r\n MySQL and MariaDB Database Handling including usage of foreign keys.\r\n Can Make APIs for all basic operations on database.",
      "created_at": "2025-02-10T07:41:31.607064Z",
      "updated_at": "2025-02-10T07:41:31.607072Z",
      "resume": 1
    }
  ],
  "education": [
    {
      "id": 10,
      "qualification_name": "B.Tech",
      "level": "Graduation",
      "subject": "Applied Electronics And Instrumentation",
      "institute_name": "Govt. Engineering College",
      "institute_city": "Kozhikode",
      "institute_country": "India",
      "agregate_marks": "59",
      "marks_unit": "%",
      "description": "Elected Artificial Intelligence as optional subject.",
      "from_date": "2008-06-01",
      "to_date": "2012-03-31",
      "created_at": "2025-02-08T05:53:20.932230Z",
      "updated_at": "2025-02-08T09:46:18.476023Z",
      "resume": 1
    },
    {
      "id": 11,
      "qualification_name": "GATE Qualified",
      "level": "Competition Exam",
      "subject": "INSTRUMENTATION",
      "institute_name": "IIT Madras",
      "institute_city": "Madras",
      "institute_country": "India",
      "agregate_marks": "2514",
      "marks_unit": "AIR",
      "description": "Qualified with All India Rank: 2514",
      "from_date": "2013-03-01",
      "to_date": "2013-03-01",
      "created_at": "2025-02-08T09:46:18.477143Z",
      "updated_at": "2025-02-08T09:46:18.477149Z",
      "resume": 1
    },
    {
      "id": 12,
      "qualification_name": "Plus Two",
      "level": "Higher Secondary",
      "subject": "Science",
      "institute_name": "HSS Perambra",
      "institute_city": "Kozhikode",
      "institute_country": "India",
      "agregate_marks": "86",
      "marks_unit": "%",
      "description": "Passed with Distinction . Aggregate marks of 86%",
      "from_date": "2006-06-01",
      "to_date": "2008-03-31",
      "created_at": "2025-02-08T09:56:58.640040Z",
      "updated_at": "2025-02-08T09:56:58.640047Z",
      "resume": 1
    },
    {
      "id": 13,
      "qualification_name": "SSLC",
      "level": "High School",
      "subject": "General",
      "institute_name": "Koothali VHSS",
      "institute_city": "Kozhikode",
      "institute_country": "India",
      "agregate_marks": "82",
      "marks_unit": "%",
      "description": "Passed with Distinction with 82% Marks. Topper in science subjects in the\r\nschool.",
      "from_date": "1995-06-01",
      "to_date": "2006-03-31",
      "created_at": "2025-02-08T09:58:35.568157Z",
      "updated_at": "2025-02-08T09:58:35.568164Z",
      "resume": 1
    }
  ],
  "accomplishments": [],
  "hobbies": [],
  "name": "Midhun Vijay V. S.",
  "title": "Exceptional Technical Aptitude, Innovative Architectural Vision, 3year Full Time Industrial Experience + 3 Months training course + 3 Years Hobby Freelance Experience.",
  "email": "midhunvijayvs@gmail.com",
  "phone": "+91 96055-56054",
  "house_name": "Saketham",
  "room_number": "",
  "posttown": "Koothali",
  "sub_city": "Perambra",
  "city": "Kozhikode",
  "state": "Kerala",
  "country": "India",
  "summary": "A genius level technical problem solver. Have broad and deep knowledge, skills, temper and true enthusiasm in general science and technology. Educated myself for the aptitude that, Learning a technology is not about just learning how to use the tools, It is also the development of the temper to use the tool for the creative betterment of the systems. Always try to Learn a tool by understanding the exact working mechanism and intention of making the tool clearly and deeply. Hence I am a fast learner and after learning, can apply it creatively and in the best productive way.",
  "career_objective": "To be one of the best Engineers on the planet. To contribute breakthrough innovative ideas to the technical knowledge pool of the world.",
  "created_at": "2025-02-06T19:59:00.503965Z",
  "updated_at": "2025-02-10T07:41:31.601853Z"
} 

  // useEffect(() => {
  //   $(function () {
  //     $(window).scrollTop(0);
  //   });
  // }, [])

  const [opacity, setOpacity] = useState(0);



  useEffect(() => {

    setData({...testdata})

    // API.get(`/resume-builder/resumes/${id}`)

    //   .then((response) => {
    //     console.log(JSON.stringify(response.data, null, 2)); // Copy this output
    //     setData(response.data); // Only take the first 4 items
    //     setIsLoading(false)

    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       // setMessage(error.response.data.message);
    //       // setIsErrorModalOpen(true)
    //     }
    //     setIsLoading(false)

    //   });
  }, [])


  useEffect(() => {

  }, []);




  return (
    <div className='resume-preview-page'>


      <div className='page'>
        <button className='download-button' onClick={() => fetchResumeDataAndGeneratePdf(data)}>Download PDF</button>


        <div className='main-content' >


          <div className='section top-section'>
            <div className='segment'>
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
          </div>

          <div className='section summary-section'>
          <div className='segment title-segment'>
              <div className='lhs'>
              </div>
              <div className='rhs'>
                <h2>Summary</h2>
              </div>
            </div>
            
            <div className='segment'>
              <div className='lhs'>
              </div>
              <div className='rhs'>
                <p>{data.summary}</p>
              </div>
            </div>
          </div>


          <div className='section career-objective-section'>
            <div className='segment'>
              <div className='lhs'>

              </div>
              <div className='rhs'>
                <h2>Career Objective</h2>
                <p>{data.career_objective}</p>
              </div>
            </div>
          </div>


          <div className='section timeline-section skills-section'>

            <div className='segment title-segment'>
              <div className='lhs'>

              </div>
              <div className='rhs'>
              <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/skills.svg`}></img>
              <h1>Soft Skills</h1>

              </div>
            </div>


            <div className='segment'>


              <div className='lhs'>
              </div>

              <div className='rhs'>

                {data && data.soft_skills.map((item, index) => {
                  return (
                    <div className='timeline-segment'>

                      <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/timeline-bullet.svg`}></img>
                      <div className='center-part'>
                        <p className='text'>{item.skill}</p>
                      </div>
                      <div className='right-part'>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>








          <div className='section timeline-section work-history-section'>


          <div className='segment title-segment'>



            <div className='lhs'>
            </div>

            <div className='rhs'>
              <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/work-history.svg`}></img>
              <h1>Work History</h1>
            </div>
            </div>



            {data && data.work_history.map((item, index) => {
              return (
                <div className='segment timeline-segment'>
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



            <div className=' segment title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/education.svg`}></img>
                <h1>Education</h1>
              </div>

            </div>

            {data && data.education.map((item, index) => {
              return (
                <div className='segment timeline-segment'>
                  <div className='lhs'>
                    <p className='text'>{item.from_date} - {item.to_date}</p>
                  </div>

                  <div className='rhs'>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/timeline-bullet.svg`}></img>
                    <div className='center-part'>
                      <h2 className='text'>{item.qualification_name}:&nbsp;{item.subject}</h2>
                      <p className='text'><strong>{item.institute_name}</strong>, {item.institute_city}</p>

                      <p className='text'>{item.description}</p>
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



            <div className=' segment title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/certifications.svg`}></img>
                <h1>Certifications</h1>
              </div>

            </div>

            {data && data.certifications && data.certifications.map((item, index) => {
              return (
                <div className='segment timeline-segment'>
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



            <div className='segment title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/accomplishments.svg`}></img>
                <h1>Accomplishments</h1>
              </div>

            </div>

            {data && data.accomplishments.map((item, index) => {
              return (
                <div className='segment timeline-segment'>
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



            <div className='segment title-segment'>

              <div className='lhs'>
              </div>

              <div className='rhs'>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-preview-page/hobbies.svg`}></img>
                <h1>Hobbies</h1>
              </div>

            </div>

            {data && data.hobbies.map((item, index) => {
              return (
                <div className='segment timeline-segment'>
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