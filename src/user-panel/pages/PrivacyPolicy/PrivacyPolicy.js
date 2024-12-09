import React, { useEffect } from 'react'
import './PrivacyPolicy.scss'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';


const PrivacyPolicy = () => {
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
                <div className='banner-title'>Privacy Policy</div>
            </div>
            <div className='sec-2'>
                <div className='privacy-head'>
                    <div className='title'>Privacy Policy</div>
                    <p className='title-para'>At Soulcast, we value the privacy and security of our customers' personal information. This Privacy Policy outlines how we collect, use, and protect the information you provide to us when using our IT services. By using our services, you agree to the terms of this Privacy Policy. </p>
                </div>
                <div className='scope'>
                    <div className='title'>Information Collection </div>
                    <p>We may collect your personal information when you interact with our website, contact us via email or phone, or sign up for our services. The types of personal information we collect may include your name, email address, phone number, company name, and any other information you voluntarily provide to us. </p>
                </div>
                <div className=''>
                    <div className='title'>Use of Information </div>
                    <p>We use the information we collect to provide and improve our IT services. This may include:  </p>
                    <ul>
                        <li><p>Responding to your inquiries and providing customer support.</p></li>
                        <li><p>Processing payments and completing transactions.</p></li>
                        <li><p>Sending you important service-related information and updates. </p></li>
                        <li><p>Personalising your user experience and improving our website and services. </p></li>
                        <li><p>Conducting market research and analysing trends to enhance our offerings.</p></li>
                    </ul>
                </div>
                <div className=''>
                    <div className='title'>Information Sharing </div>
                    <p>We do not sell, trade, or rent your personal information to third parties without your consent. However, we may share your information with trusted third-party service providers, such as payment processors or hosting providers, who assist us in operating our business. These partners are obligated to keep your information confidential and secure.
                        <br />
                        <br />
                        <br />
                        <br />
                        We may also disclose your personal information if required by law or in response to a valid legal request, such as a court order or government investigation. </p>

                </div>


                <div className=''>
                    <div className='title'>Data Security </div>
                    <p>We take data security seriously and implement measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. We use industry-standard security technologies and procedures to safeguard your data. </p>
                  
                </div>
                <div className=''>
                    <div className='title'>Cookies and Tracking Technologies </div>
                    <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyse website traffic. These technologies may collect information such as your IP address, browser type, and pages visited. You can choose to disable cookies in your browser settings, but please note that some features of our website may not function properly. </p>
                    
                </div>
                <div className=''>
                    <div className='title'>Third-Party Links </div>
                    <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any websites you visit. </p>
                    
                </div>
                <div className=''>
                    <div className='title'>Children's Privacy </div>
                    <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately, and we will take appropriate steps to remove the information from our records. </p>

                </div>
                <div className=''>
                    <div className='title'>Changes to the Privacy Policy </div>
                    <p>We reserve the right to modify or update this Privacy Policy at any time. Any changes will be posted on this page with the updated effective date. We encourage you to review this Privacy Policy periodically. </p>
                    
                </div>
               
                <div className=''>
                    <div className='title'>Contact Us</div>
                    <p className='contact'>If you have any questions, concerns, or requests regarding this Privacy Policy or handling your personal information,<br/> please contact us at +44 2045424350. 

</p>
<br/><br/>
                    <p className='contact connect'><a href="mailto:connect@zogglobal.com">connect@zogglobal.com</a></p>
                    <p className='contact'>02045 424350</p>
                    <p className='contact'>Suite V3, 4 Woodland Road, Darlington, DL3 7PJ</p>
                </div>

                <dev className=''>

                    <p>This Privacy Policy is intended to inform you about our policies and practices regarding the collection, use, and disclosure of personal information. By using our services, you acknowledge that you have read and understood this Privacy Policy. </p>
                </dev>
                <div className='last'>
                    <p>Last Updated: 20-12-2023</p>
                </div>
            </div>
            <div className='footer-sec'>
                <div className='footer-content'>
                    <li onClick={() => navigate(window.location.pathname)} className='link'>Privacy Policy</li>
                    <li>© 2024 Soulcast</li>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy