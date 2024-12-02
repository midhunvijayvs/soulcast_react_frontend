import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './BottomBanner.scss'
const BottomBanner =({pageName, titleWeb, titleTab, titleMob,subTitlePresent,subTitleWeb, subTitleTab, subTitleMob, buttonText,buttonLink, buttonTheme,textTheme })=>{
   const navigate=useNavigate()
  const renderHTML = (text) => ({ __html: text });

  const titleRefW = useRef(null);
  const titleRefT = useRef(null);
  const titleRefM = useRef(null);
  
  const descriptionRefW = useRef(null);
  const descriptionRefT = useRef(null);
  const descriptionRefM = useRef(null);

  const buttonRef = useRef(null);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        },
        {
            threshold: 0.1,
        }
    );

    const elementsToObserve = [titleRefW.current,titleRefT.current,titleRefM.current,descriptionRefW.current, descriptionRefT.current,descriptionRefM.current, buttonRef.current,];
    elementsToObserve.forEach((element) => {
        if (element) observer.observe(element);
    });
  
    return () => {
        elementsToObserve.forEach((element) => {
            if (element) observer.unobserve(element);
        });
    };


    
    
}, []);


    return(
        <div className='bottom-banner' style={{backgroundImage:`url("/images/${pageName}/banner-bottom-${window.innerWidth<768?"mob":window.innerWidth<992?"tab":"web"}.png")`}}>

        <div className='inner'>

          <div className='title only-web'  ref={titleRefW} style={textTheme==="dark"?{color:"#000"}:{color:"#fff"}} dangerouslySetInnerHTML={renderHTML(titleWeb)}></div>
           <div className='title only-tab'  ref={titleRefT} style={textTheme==="dark"?{color:"#000"}:{color:"#fff"}} dangerouslySetInnerHTML={renderHTML(titleTab)}></div>
          <div className='title only-mob'  ref={titleRefM} style={textTheme==="dark"?{color:"#000"}:{color:"#fff"}} dangerouslySetInnerHTML={renderHTML(titleMob)}></div>

        {subTitlePresent&&<p className=' only-web' ref={descriptionRefW} style={textTheme==="dark"?{color:"#000"}:{color:"#fff"}} dangerouslySetInnerHTML={renderHTML(subTitleWeb)}></p>}
          {subTitlePresent&& <p className='only-tab' ref={descriptionRefT} style={textTheme==="dark"?{color:"#000"}:{color:"#fff"}} dangerouslySetInnerHTML={renderHTML(subTitleTab)}></p>}
          {subTitlePresent&&<p className='only-mob' ref={descriptionRefM} style={textTheme==="dark"?{color:"#000"}:{color:"#fff"}} dangerouslySetInnerHTML={renderHTML(subTitleMob)}></p>}
            
          <button   ref={buttonRef} onClick={()=>navigate(buttonLink)} className={buttonTheme==="dark"?"button-black-box":"button-white-box"} dangerouslySetInnerHTML={renderHTML(buttonText)}></button>
          
        </div>

      </div>
    )
}

export default BottomBanner