import React, { useEffect, useContext } from 'react'
import $ from 'jquery';

import './AboutUs.css'
import {useNavigate } from 'react-router-dom'
import { UserContext } from '../../../authentication/pages/UserContext';

const Aboutus = ({ selectCategory }) => {
    const navigate = useNavigate()
    const { isLoggedIn, login, logout } = useContext(UserContext);



    useEffect(() => {
        $(function () {
            $(window).scrollTop(0);
        });
    }, [])

    return (
        <div>

          


            <div className='w-100 d-flex flex-column-reverse flex-lg-row justify-content-between mb-3 mb-lg-0'>
                <div className='w-50-resp-tab'>
                    <div className='brick-clr mb-4 f-xl'><b>SIBU FISH N’ MEAT</b></div>
                    <div className='clr-868790 f-sm lh-33 fw-500 text-justify text-lg-start'>
                        Welcome to Sibu Fish N' Meat delivery service! We are a team of dedicated professionals who believe in providing our customers with the freshest and highest quality seafood and meat products. With a passion for exceptional taste and unparalleled customer service, we have built a reputation for being the go-to destination for discerning food lovers.
                        <br />
                        <br />

                        We source our products from trusted local suppliers and ensure that all of our meats and fish are hand-selected for their freshness and flavour. We offer a hassle-free ordering process, flexible delivery options, and the ability to customise your order to suit your preferences.
                        <br />
                        <br />



                    </div>
                </div>
                <div className='w-50-resp-mob text-end'>
                    <img src="/images/Aboutus/aboutusimg.svg" alt='' className='aboutusimgsize'></img>
                </div>
            </div>

            <div className='w-100 d-flex flex-column flex-lg-row missionvission'>
                <div className='w-50-mob-resp box-shadow bg-white py-3 p-5 radius-11 me-0 me-lg-3 d-flex flex-column flex-lg-row align-items-center mb-3 mb-lg-0'>
                    <img src="/images/Aboutus/mission.svg" alt='' className='mb-2 mb-lg-0'></img>
                    <div className='ms-0 ms-lg-5'>
                        <div className='fw-600 text-center text-lg-start'>Mission</div>
                        <div className='f-xs mt-2 text-center text-lg-start'>
                            Our mission is to provide our customers with the freshest and highest-quality fish and meat, ensuring convenience, reliability, and exceptional customer service.
                        </div>
                    </div>
                </div>
                <div className='w-50-mob-resp box-shadow  bg-white py-3 p-5 radius-11 me-2 d-flex flex-column flex-lg-row align-items-center'>
                    <img src="/images/Aboutus/vission.svg" alt='' className='mb-2 mb-lg-0'></img>
                    <div className='ms-0 ms-lg-5'>
                        <div className='fw-600 text-center text-lg-start'>Vision</div>
                        <div className='f-xs mt-2 text-center text-lg-start'>
                            We aim to expand our reach, ensuring that everyone can have access to premium seafood and meats, regardless of their location.
                        </div>
                    </div>
                </div>
            </div>

            <div className='ousrservices w-100 mt-5 my-lg-5'>
                <div className='mb-100 text-center f-xl fw-600 black-clr'>Our Services </div>
                <div className='d-flex flex-column flex-md-row justify-content-between'>
                    <div className='item'>
                        <div className='absolute img-bg'><img src="/images/Aboutus/fish.svg" alt=''></img></div>
                        <div className='fw-600 black-clr mb-2'>Fish</div>
                        <p className='f-xs clr-868790 mb-4'>
                            Get the freshest catch and succulent cuts straight to your kitchen, ensuring convenience without compromising quality.
                        </p>
                        <button className='lightbrick-btn f-xs px-4 underline-none py-1' onClick={() => { selectCategory(8); navigate('/shop') }} >View</button>
                    </div>
                    <div className='mx-0 mx-lg-4 item'>
                        <div className='absolute img-bg'><img src="/images/Aboutus/meat.svg" alt=''></img></div>
                        <div className='fw-600 black-clr mb-2'>Meat</div>
                        <p className='f-xs clr-868790 mb-4'>
                            We provide high-quality meat cuts that are responsibly sourced and delivered with great care.


                        </p>
                        <button className='lightbrick-btn f-xs px-4 underline-none py-1' onClick={() => { selectCategory(2); navigate('/shop') }} >View</button>

                    </div>
                    <div className='item'>
                        <div className='absolute img-bg'><img src="/images/Aboutus/crab.svg" alt=''></img></div>
                        <div className='fw-600 black-clr mb-2'>Seashell</div>
                        <p className='f-xs clr-868790 mb-4'>
                            Elevate your seafood presentations with stunning seashells, adding a touch of elegance to your dining experience.
                        </p>
                        <button className='lightbrick-btn f-xs px-4 underline-none py-1' onClick={() => { selectCategory(3); navigate('/shop') }} >View</button>

                    </div>
                </div>
            </div>
            {/* 
        <video>
    <source src={hbhd} type="video/mp4" />
    Sorry, your browser doesn't support videos.
</video> */}

            <div className='keepintouch bg-F7EBEC my-4 radius-11 py-3 px-5 d-flex flex-column-reverse flex-lg-row align-items-center justify-content-center'>
                <div className=''>
                    <div className='fw-600 f-xl'>Get In Touch with Us!  </div>
                    <div className='f-xs clr-868790 mt-2 mb-3'>Discover the finest selection.</div>

                    {isLoggedIn ?
                        <button className='lightbrick-btn  f-sm' onClick={() => navigate('/')}>Go to Home</button>
                        :
                        <div>
                            <button className='lightbrick-btn w-90px f-sm me-2' onClick={() => navigate('/sign-up')}>Sign Up</button>
                            <button className='white-btn w-90px f-sm' onClick={() => { localStorage.setItem("userRoleRequest", "user"); navigate('/login') }}>Login</button>
                        </div>
                    }
                </div>
                <div>
                    <img src="images/Aboutus/keepintouch.svg" alt='' className='keepintouchimg'></img>
                </div>
            </div>
        </div>
    )

}

export default Aboutus