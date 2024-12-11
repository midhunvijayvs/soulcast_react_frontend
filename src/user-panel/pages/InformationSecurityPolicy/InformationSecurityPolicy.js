import React, { useEffect } from 'react'
import './InformationSecurityPolicy.scss'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';


const InformationSecurityPolicy = () => {
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
                <img className='app-logo' onClick={() => navigate('/')} style={{ cursor: "pointer" }} src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/header/app-logo-header.svg`} alt=''></img>
            </div>
            <div className='banner-section' >
                <img src="/images/sub-pages-banner-icon.svg" className="main-icon"
                    style={window.innerWidth > 992 ? { bottom: -577, right: 100, transform: `rotate(${123}deg)` } : window.innerWidth > 767 ? { bottom: -590, right: 45, transform: `rotate(${131}deg)` } : { bottom: -470, right: -116, transform: `rotate(${117}deg)` }}></img>
                <div className='banner-title'>Information Security Policy </div>
            </div>
            <div className='sec-2'>
                <div className='privacy-head'>
                    <div className='title'>Information Security Policy </div>
                    <p className='title-para'></p>
                </div>
                <div className='scope'>
                    <div className='title'>Purpose </div>
                    <p>This policy outlines the measures and protocols implemented by Soulcast to protect sensitive information and assets against unauthorised access, disclosure, alteration, or destruction. It aims to ensure confidentiality, integrity, and availability of data across all operations within the company. </p>
                </div>
                
                
                <div className='scope'>
                    <div className='title'>Audience </div>
                    <p>This policy is directed towards all employees, contractors, third-party vendors, and any individual accessing Soulcast's network, systems, or data. </p>
                </div>
                
                
                <div className=''>
                    <div className='title'>Information Security Objectives </div>
                    <p></p>
                    <ul>
                        <li><p>Safeguarding sensitive information and assets from unauthorised access or disclosure. </p></li> 
                        <li><p>Ensuring the integrity and accuracy of data. </p></li> 
                        <li><p>Ensuring the availability and reliability of systems and services. </p></li> 
                        <li><p>Compliance with relevant laws, regulations, and industry standards regarding data security. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'> 

Data Classification </div>
                    <p>Soulcast classifies data into categories based on sensitivity: 
<br/>
<br/>
<strong>Confidential:</strong> Information requiring the highest level of protection (e.g., customer data, financial records). 
<br/>
<br/>

<strong>Internal Use:</strong> Data used within the company but not sensitive enough to be classified as confidential. 
<br/>
<br/>

<strong>Public:</strong> Information that can be shared openly without risk. </p>
<br/>
<br/>
                    
                </div>
               


                <div className=''>
                    <div className='title'>Data Support and Operations </div>
                    <p></p>
                    <ul>
                        <li><p>Data handling and storage must comply with the designated classification. </p></li> 
                        <li><p>Regular data backups and secure storage protocols will be maintained according to the data's sensitivity. </p></li> 
                        <li><p>Access to confidential and sensitive data will be granted on a need-to-know basis. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'>Security Awareness Training </div>
                    <p>All employees will undergo regular training on information security best practices, including: </p>
                    <ul>
                        <li><p>Recognising and reporting security threats. </p></li> 
                        <li><p>Proper handling of sensitive data. </p></li> 
                        <li><p>Compliance with company security policies and procedures. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'>Responsibilities and Duties of Employees </div>
                    <p>All employees are responsible for: </p>
                    <ul>
                        <li><p>Protecting company assets, including data and equipment.  </p></li> 
                        <li><p>Adhering to information security policies and procedures.  </p></li> 
                        <li><p>Reporting any security incidents or vulnerabilities immediately. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'> 

Virus Protection Procedure </div>
                    <p></p>
                    <ul>
                        <li><p>All devices connected to Soulcast's network must have updated antivirus software installed. </p></li> 
                        <li><p>Regular scans and updates will be conducted to ensure protection against viruses and malware. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'>Malware Protection Procedure  </div>
                    <p></p>
                    <ul>
                        <li><p>Firewalls and intrusion prevention systems will be implemented to prevent malware infiltration. </p></li> 
                        <li><p>Regular system updates and patches will be applied to address vulnerabilities. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'> 

Network Intrusion Detection Procedure </div>
                    <p></p>
                    <ul>
                        <li><p>Intrusion detection systems will monitor network traffic for suspicious activity. </p></li> 
                        <li><p>An incident response plan will be in place to address and mitigate detected intrusions. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'>Remote Work Procedure </div>
                    <p></p>
                    <ul>
                    <li><p>Employees accessing company systems remotely must use secure, encrypted connections. </p></li> 
                        <li><p>Multi-factor authentication and VPNs must be utilised for remote access to sensitive data. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'>Technical Guidelines </div>
                    <p></p>
                    <ul>
                    <li><p>Clear guidelines will be provided for secure password management, data encryption, and software usage. </p></li> 
                        <li><p>Regular security assessments and audits will be conducted to identify and address vulnerabilities. </p></li> 
                    </ul>
                </div>
               


                <div className=''>
                    <div className='title'>Consequences for Non-Compliance </div>
                    <p>Non-compliance with information security policies may result in disciplinary action, including warnings, suspension, or termination, depending on the severity of the breach.  </p>
                    
                </div>
               


                <div className=''>
                    <div className='title'>Physical Security Requirements </div>
                    <ul>
                        <li><p>Access to physical facilities containing sensitive data will be restricted and monitored. </p></li> 
                        <li><p>Surveillance and access controls will be implemented to prevent unauthorised entry. </p></li> 
                    </ul>
                    <br/>
                    <br/>
                    <p>Our commitment to safeguarding information is unwavering. Through adherence to these policies, we ensure data integrity, confidentiality, and availability. Thank you for your dedication to upholding these principles and fostering a secure environment essential for trust and sustained excellence at Soulcast. </p>

                </div>
               


               

            
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

export default InformationSecurityPolicy