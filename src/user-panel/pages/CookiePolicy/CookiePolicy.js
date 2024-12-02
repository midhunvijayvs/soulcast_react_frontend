import React, { useEffect } from 'react'
import './CookiePolicy.scss'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';


const CookiePolicy = () => {
    let navigate = useNavigate();
    useEffect(() => {
        $(function () {
            $(window).scrollTop(0);
        });
    }, [])

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

    return (
        <div className=' privacy-policy'>
            <div className='header' id='header' >
                <img className='app-logo' onClick={() => navigate('/')} style={{ cursor: "pointer" }} src="/images/app-logo-header.svg" alt=''></img>
            </div>
            <div className='banner-section' >
                <img src="/images/sub-pages-banner-icon.svg" className="main-icon"
                    style={window.innerWidth > 992 ? { bottom: -577, right: 100, transform: `rotate(${123}deg)` } : window.innerWidth > 767 ? { bottom: -590, right: 45, transform: `rotate(${131}deg)` } : { bottom: -470, right: -116, transform: `rotate(${117}deg)` }}></img>
                <div className='banner-title'>Cookie Policy</div>
            </div>
            <div className='sec-2'>
                <div className='privacy-head'>
                    <div className='title'>Cookie Policy</div>
                    <p className='title-para'>At ZOG Global, we value your privacy and strive to provide you with the best online experience possible. In order to achieve this, we use cookies and similar technologies on our website. This Cookie Policy outlines the types of cookies we collect and how they are used. </p>
                </div>
                <div className='scope'>
                    <div className='title'>What are Cookies? </div>
                    <p>Cookies are small text files that are stored on your device (computer, smartphone, tablet) when you visit a website. They help us analyse website traffic, remember your preferences, and improve your overall browsing experience. </p>
                </div>
                <div className=''>
                    <div className='title'>Types of Cookies We Use </div>
                   
                        <ul>
                            <li><p><strong>Strictly Necessary Cookies:</strong> These cookies are essential for the proper functioning of our website. They enable you to navigate our site and use its features, such as accessing secure areas. Without these cookies, certain parts of our website may not function correctly.</p></li>

                            <li><p><strong>First Party Analytic Cookies:</strong> We use these cookies to gather information about how visitors use our website. This data helps us understand user behaviour, improve our website, and make it more user-friendly. The information collected is aggregated and anonymous. </p></li>

                            <li><p><strong>Performance Cookies:</strong> These cookies allow us to track and analyse the performance of our website. They help us understand which pages are most popular, how users navigate through our site, and identify any technical issues. This information enables us to improve the overall performance and functionality of our website. </p></li>

                            <li><p><strong>Functionality Cookies:</strong> Functionality cookies enable our website to remember your preferences and provide enhanced features. For example, they can remember your language preference or the region you are in. These cookies enhance your browsing experience by personalising the content and settings for you. </p></li>

                            <li><p><strong>Advertising and Social Media Cookies:</strong> We may use these cookies to deliver personalised advertisements and content based on your interests and browsing behaviour. They also allow you to share content on social media platforms. These cookies are used with your consent and enable us to provide you with relevant and targeted advertising. </p></li>

                            <li><p></p></li>



                        </ul>
                </div>
                <div className=''>
                    <div className='title'>Managing Your Cookie Preferences  </div>
                    <p>You have the right to choose whether or not to accept cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, please note that disabling cookies may impact the functionality and performance of our website. 

You can also delete cookies that have already been placed on your device. The process for managing and deleting cookies varies depending on the browser you are using. Please consult the help documentation of your specific browser for more information on how to manage cookies. </p>

                </div>


               
               
                <div className=''>
                    <div className='title'>Contact Us</div>
                    <p className='contact'>If you have any questions or concerns about our use of cookies, please contact us at connect@zogglobal.com. We will be happy to assist you. <br /></p>
                    <br /><br />
                    <p className='contact connect'><a href="mailto:connect@zogglobal.com">connect@zogglobal.com</a></p>
                    <p className='contact'>02045 424350</p>
                    <p className='contact'>Suite V3, 4 Woodland Road, Darlington, DL3 7PJ</p>
                </div>

                <dev className=''>

                    <p>By continuing to use our website, you consent to the use of cookies as described in this Cookie Policy. </p>
                </dev>
                <div className='last'>
                    <p>Last Updated: 20-12-2023</p>
                </div>
            </div>
            <div className='footer-sec'>
                <div className='footer-content'>
                    <li onClick={() => navigate(window.location.pathname)} className='link'>Cookie Policy</li>
                    <li>© 2024 ZOG Global</li>
                </div>
            </div>
        </div>
    )
}

export default CookiePolicy