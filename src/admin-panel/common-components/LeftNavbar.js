import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import './LeftNavbar.scss';
import { NavLink, Navigate } from 'react-router-dom'


export default function LeftNavbar() {

    const navigate = useNavigate()

    const [catNavSelected, selectCatNav] = useState(0);

    const [catNavOpened, openCatNav] = useState(false);

    const [navList, setNavList] = useState(
        [
            {
                "id": 1,
                "label": "Dashboard",
                "icon_image_url": `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/dashboard.svg`,
                "position": 1
            },
            {
                "id": 2,
                "label": "Jobs",
                "icon_image_url": `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/jobs.svg`,
                "items": [
                    {
                        "id": 1,
                        "label": "Jobs Library",
                        "frontend_url": "/admin/jobs",
                        "position": 1,
                    },
                    {
                        "id": 2,
                        "label": "Create Job",
                        "frontend_url": "/admin/jobs/add",
                        "position": 2,
                    },
                    {
                        "id": 3,
                        "label": "Candidate Library",
                        "frontend_url": "/admin/jobs/applicants",
                        "position": 3,
                    },
                    {
                        "id": 4,
                        "label": "Job Categories",
                        "frontend_url": "/admin/jobs/categories",
                        "position": 4,
                    },
                    {
                        "id": 5,
                        "label": "Job Types",
                        "frontend_url": "/admin/jobs/types",
                        "position": 5,
                    },
                    {
                        "id": 6,
                        "label": "Job Locations",
                        "frontend_url": "/admin/jobs/locations",
                        "position": 6,
                    },

                ],
                "position": 2
            },


            {
                "id": 3,
                "label": "Invoice",
                "icon_image_url": `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/invoice.svg`,
                "items": [
                    {
                        "id": 7,
                        "label": "Invoice Library",
                        "frontend_url": "/events-and-mass-time/mass",
                        "icon_image_url": "icon-image-mass",
                        "position": 1,
                    },
                    {
                        "id": 8,
                        "label": "Invoice Library",
                        "frontend_url": "/events-and-mass-time/events",
                        "icon_image_url": "icon-image-events",
                        "position": 2,
                    }
                ],
                "position": 3
            },


            {
                "id": 4,
                "label": "Management",
                "icon_image_url": `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/management.svg`,
                "items": [
                    {
                        "id": 3,
                        "label": "Projects",
                        "frontend_url": "/events-and-mass-time/mass",
                        "icon_image_url": "icon-image-mass",
                        "position": 1,
                        "category": 2
                    },
                    {
                        "id": 2,
                        "label": "Tasks",
                        "frontend_url": "/events-and-mass-time/events",
                        "icon_image_url": "icon-image-events",
                        "position": 2,
                        "category": 2
                    },

                    {
                        "id": 3,
                        "label": "Clients",
                        "frontend_url": "/events-and-mass-time/mass",
                        "icon_image_url": "icon-image-mass",
                        "position": 1,
                        "category": 2
                    },
                    {
                        "id": 2,
                        "label": "Calendar",
                        "frontend_url": "/events-and-mass-time/events",
                        "icon_image_url": "icon-image-events",
                        "position": 2,
                        "category": 2
                    },
                    {
                        "id": 3,
                        "label": "Team Member",
                        "frontend_url": "/events-and-mass-time/mass",
                        "icon_image_url": "icon-image-mass",
                        "position": 1,
                        "category": 2
                    },
                    {
                        "id": 2,
                        "label": "Reports",
                        "frontend_url": "/events-and-mass-time/events",
                        "icon_image_url": "icon-image-events",
                        "position": 2,
                        "category": 2
                    }
                ],
                "position": 4
            },

            {
                "id": 5,
                "label": "HR",
                "icon_image_url": `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/hr.svg`,
                "items": [


                ],
                "position": 2
            },


            {
                "id": 2,
                "label": "Blog",
                "icon_image_url": `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/blog.svg`,
                "items": [
                    {
                        "id": 3,
                        "label": "Blog Library",
                        "frontend_url": "/admin/blogs",
                        "icon_image_url": "icon-image-mass",
                        "position": 1,
                    },
                    {
                        "id": 2,
                        "label": "Create Blog",
                        "frontend_url": "/admin/blogs/add",
                        "icon_image_url": "/blog/edit",
                        "position": 2,
                    }
                ],
                "position": 5
            },



            {
                "id": 6,
                "label": "Monitor",
                "icon_image_url": `${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/monitor.svg`,

                "position": 6
            }
        ]);

    return (

        <div className='  navbar-left'>

            <div className={catNavOpened ? 'category-box' : 'category-box shrinked'}>

                <div className='item hamburger-btn' onClick={() => { openCatNav(!catNavOpened) }}>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/hamburger.svg`}></img>
                    <div className='label'></div>
                </div>

                {navList && navList.map((item, index) => {
                    return (
                        <div className='item' key={index} onClick={() => { selectCatNav(index) }}>
                            <img src={item.icon_image_url}></img>
                            <div className='label'>{item.label}</div>
                        </div>
                    )

                })}





            </div>

            <div className={catNavSelected==null ? 'main-box shrinked' : 'main-box'}>
                <button className='close-btn' onClick={() => { selectCatNav(null) }}>
                    <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/left-arrow-white.svg`} />

                </button>
                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/header/app-logo-header.svg`} width="100" height="50" alt="" className='logo' />

              
                {catNavSelected !== null && (
    <div className='title'>
        <img src={navList[catNavSelected].icon_image_url} alt="icon"></img>
        {navList[catNavSelected].label}
    </div>
)}



{catNavSelected !== null && navList[catNavSelected] && navList[catNavSelected].items && navList[catNavSelected].items.length > 0 &&
                    navList[catNavSelected].items.map((item, index) => {
                        return (
                            <div className='item' key={index} onClick={() => navigate(item.frontend_url)}>
                                <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/left-nav-bar/item-arrow.svg`}></img>
                                <div className='label'>{item.label}</div>
                            </div>
                        );
                    })
                }

            </div>



        </div>

    )
}
