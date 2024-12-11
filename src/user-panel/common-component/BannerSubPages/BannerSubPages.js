import React, { useEffect, useRef, useState } from 'react'


import './BannerSubPages.scss'
const BannerSubPages = ({ pageName, blueTitle, titleWeb, titleTab, titleMob, subTitleWeb, subTitleTab, subTitleMob, iconTopWeb, iconLeftWeb, iconTopTab, iconLeftTab, iconTopMob, iconLeftMob, iconRotationWeb, iconRotationTab, iconRotationMob }) => {
 
  const [imagePosition, setImagePosition] = useState({iconTopWeb:iconTopWeb, iconLeftWeb:iconLeftWeb, iconTopTab:iconTopTab, iconLeftTab:iconLeftTab, iconTopMob:iconTopMob, iconLeftMob:iconLeftMob});

  const renderHTML = (text) => ({ __html: text });

  const mainHRef= useRef(null);
 
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
    const elementsToObserve = [mainHRef.current];
    elementsToObserve.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elementsToObserve.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);


  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const speedX = clientX - window.innerWidth / 2; // Speed relative to the center of the window
      const speedY = clientY - window.innerHeight / 2;

      const iconTopWebMoved = `${parseInt(iconTopWeb, 10) + speedY / 200}%`;
      const iconLeftWebMoved = `${parseInt(iconLeftWeb, 10) + speedX / 200}%`;
      const iconTopTabMoved = `${parseInt(iconTopTab, 10) + speedY / 200}%`;
      const iconLeftTabMoved = `${parseInt(iconLeftTab, 10) + speedX / 200}%`;
      const iconTopMobMoved = `${parseInt(iconTopMob, 10) + speedY / 200}%`;
      const iconLeftMobMoved = `${parseInt(iconLeftMob, 10) + speedX / 200}%`;

      // Update image position adjustment based on speed and direction
      setImagePosition({"iconTopWeb":iconTopWebMoved, "iconLeftWeb":iconLeftWebMoved, "iconTopTab":iconTopTabMoved, "iconLeftTab":iconLeftTabMoved, "iconTopMob":iconTopMobMoved, "iconLeftMob":iconLeftMobMoved});
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Only run this effect once



  return (
    <div className='banner-sub-pages' >

      <div className='inner' ref={mainHRef}>
        <div className="blue-title">{blueTitle}</div>
        <div className='title only-web' dangerouslySetInnerHTML={renderHTML(titleWeb)}></div>
        <div className='title only-tab' dangerouslySetInnerHTML={renderHTML(titleTab)}></div>
        <div className='title only-mob' dangerouslySetInnerHTML={renderHTML(titleMob)}></div>
        <div className='blue-line'></div>
        <div className='sub-title only-web' dangerouslySetInnerHTML={renderHTML(subTitleWeb)}></div>
        <div className='sub-title only-tab' dangerouslySetInnerHTML={renderHTML(subTitleTab)}></div>
        <div className='sub-title only-mob' dangerouslySetInnerHTML={renderHTML(subTitleMob)}></div>

      </div>
      <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/sub-pages-banner-icon.svg`} className="main-icon" style={window.innerWidth > 992 ? { top: imagePosition.iconTopWeb, left: imagePosition.iconLeftWeb, transform: `rotate(${iconRotationWeb}deg)` } : window.innerWidth > 768 ? { top: imagePosition.iconTopTab, left: imagePosition.iconLeftTab, transform: `rotate(${iconRotationTab}deg)` } : { top: imagePosition.iconTopMob, left: imagePosition.iconLeftMob, transform: `rotate(${iconRotationMob}deg)` }}></img>
    </div>
  )
}

export default BannerSubPages