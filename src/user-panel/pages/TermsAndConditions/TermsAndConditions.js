import React, { useEffect } from 'react'
import './TermsAndConditions.scss'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';


const TermsAndConditions = () => {
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
                <img className='app-logo' onClick={() => navigate('/')} style={{ cursor: "pointer" }} src="/images/header/app-logo-header.svg" alt=''></img>
            </div>
            <div className='banner-section' >
                <img src="/images/sub-pages-banner-icon.svg" className="main-icon"
                    style={window.innerWidth > 992 ? { bottom: -577, right: 100, transform: `rotate(${123}deg)` } : window.innerWidth > 767 ? { bottom: -590, right: 45, transform: `rotate(${131}deg)` } : { bottom: -470, right: -116, transform: `rotate(${117}deg)` }}></img>
                <div className='banner-title'>Terms & Conditions </div>
            </div>
            <div className='sec-2'>
                <div className='privacy-head'>
                    <div className='title'>Terms & Conditions </div>
                    <p className='title-para'>These Terms & Conditions ("Agreement") are entered into by and between Soulcast ("Company") and the individual or entity requesting the services ("Client"). This Agreement governs the use of the IT services provided by the Company to the Client. By engaging in any transaction or utilizing any of the services provided by the Company, the Client agrees to be bound by this Agreement.  </p>
                </div>
                <div className='scope'>
                    <div className='title'>1. Services Provided </div>
                    <p>The Company agrees to provide IT services to the Client as outlined in the scope of work or service agreement. The services may include but are not limited to Software Development, Cybersecurity, Cloud Computing, AI and Automation, and Advanced Networking.  </p>
                </div>
                <div className=''>
                    <div className='title'>2. Payment  </div>
                    <p>The Client agrees to pay the Company for the services rendered as per the agreed-upon rates and terms. Payment terms, including invoices, due dates, and accepted payment methods, will be outlined in the service agreement or as mutually agreed upon by both parties.   </p>

                </div>
                <div className=''>
                    <div className='title'>3. Confidentiality </div>
                    <p>Both parties agree to maintain the confidentiality of any proprietary or sensitive information exchanged during the course of the engagement. The Company will take necessary measures to protect the Client's confidential information and will not disclose it to any third party without the Client's consent. </p>

                </div>


                <div className=''>
                    <div className='title'>4. Ownership and Intellectual Property </div>
                    <p>Any intellectual property rights related to the services provided by the Company, including but not limited to software, applications, or other solutions, shall remain the property of the Company. The Client shall not reproduce, distribute, or modify any of the Company's intellectual property without prior written consent. </p>

                </div>
                <div className=''>
                    <div className='title'>5. License to Use Website  </div>
                    <p>Unless explicitly stated otherwise, the website and its content are owned by us or our licensors and are protected by intellectual property rights. Subject to the license described below, all these rights are reserved.
                        <br />
                        <br />
                        <br />
                        You are permitted to view, download, and print pages from the website for personal use only. However, certain restrictions apply, as outlined below and in the terms and conditions. </p>
                    <br />
                    <p>You are not allowed to: </p>
                    <br />
                    <br />
                    <ul>
                        <li><p>(a) Republish material from this website, including on other platforms. </p></li>
                        <li><p>(b) Sell, rent, or sublicense material from the website. </p></li>
                        <li><p>(c) Display any material from the website in public. </p></li>
                        <li><p>(d) Reproduce, duplicate, copy, or exploit material on our website for commercial purposes. </p></li>
                        <li><p>(e) Edit or modify any material on the website. </p></li>
                        <li><p>(f) Redistribute material from this website, such as our newsletter content, unless explicitly allowed. </p></li>
                    </ul>
                </div>
                <div className=''>
                    <div className='title'>6. Acceptable Use </div>
                    <p>You must not use our website in ways that could cause damage, impair its availability or accessibility, or engage in unlawful, fraudulent, or harmful activities. This includes using the website for any unlawful or malicious purposes or activities.
<br/>
<br/>
                        You are prohibited from using our website to transmit or distribute any material linked to spyware, viruses, Trojans, worms, or any other malicious software. Additionally, conducting automated data collection activities or sending unsolicited commercial communications is not allowed without our express written consent. </p>

                </div>
                <div className=''>
                    <div className='title'>7. Restricted Access </div>
                    <p>Certain areas of our website may have restricted access now or in the future. We reserve the right to limit access to specific areas or the entire website at our discretion.

                        If provided with a user ID and password to access restricted areas, you must maintain the confidentiality of this information. We reserve the right to disable your user ID and password without notice. </p>

                </div>

                <div className=''>
                    <div className='title'>8. User-Generated Content </div>
                    <p>"Your user content" refers to any material (text, images, audio, video, etc.) you submit to our website.
<br/>
<br/>
                        By submitting content, you grant us a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute your content across existing or future media. We also reserve the right to sublicense these rights and take action against infringement.
                        <br/>
<br/>

                        Your submitted content must be legal, not infringe on any third-party rights, and not lead to legal action against you, us, or any third party under applicable law.
                        <br/>
<br/>

                        We reserve the right to edit or remove any material submitted to our website. However, we are not committed to monitoring all user submissions or publications on our website. </p>

                </div>

                <div className=''>
                    <div className='title'>9. Limitation of Liability </div>
                    <p>The Company will make reasonable efforts to provide high-quality IT services. However, the Company shall not be held liable for any damages, losses, or expenses incurred by the Client arising from the use or inability to use the services, including but not limited to data loss, system downtime, or any consequential damages. </p>

                </div>

                <div className=''>
                    <div className='title'>10. Term and Termination </div>
                    <p>This Agreement shall remain in effect until terminated by either party. Either party may terminate this Agreement with written notice if the other party breaches any material term or condition herein. Upon termination, the Client shall pay any outstanding fees owed to the Company. </p>

                </div>

                <div className=''>
                    <div className='title'>11. Governing Law and Jurisdiction </div>
                    <p>This Agreement shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of England and Wales. </p>

                </div>

                <div className=''>
                    <div className='title'>12. Miscellaneous </div>
                    <p>This Agreement constitutes the entire understanding between the Company and the Client regarding the IT services provided and supersedes any prior agreements or understandings. Failure to enforce any provision of this Agreement shall not be deemed a waiver of such provision. This Agreement may only be modified in writing and signed by both parties.
                    <br/>
<br/>

                        By accepting these Terms & Conditions, the Client acknowledges that they have read, understood, and agreed to be bound by all the terms and conditions outlined herein. </p>

                </div>

                <div className=''>
                    <div className='title'>Contact Us</div>
                    <p className='contact'>If you have any questions, concerns, or requests regarding this Terms and Conditions,<br /> please contact us at +44 2045424350.

                    </p>
                    <br /><br />
                    <p className='contact connect'><a href="mailto:connect@zogglobal.com">connect@zogglobal.com</a></p>
                    <p className='contact'>02045 424350</p>
                    <p className='contact'>Suite V3, 4 Woodland Road, Darlington, DL3 7PJ</p>
                </div>


                <div className='last'>
                    <p>Last Updated: 20-12-2023</p>
                </div>
            </div>
            <div className='footer-sec'>
                <div className='footer-content'>
                    <li onClick={() => navigate(window.location.pathname)} className='link'>Terms and Conditions</li>
                    <li>© 2024 Soulcast</li>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions