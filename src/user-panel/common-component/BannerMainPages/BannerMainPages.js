import React, { useEffect, useRef } from 'react'

import './BannerMainPages.scss'
const BannerMainPages = ({ pageName, titleWeb, titleTab, titleMob, subTitleWeb, subTitleTab, subTitleMob }) => {
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


  return (
    <div className='banner' style={{ backgroundImage: `url("/images/${pageName}/banner-${window.innerWidth < 768 ? "mob" : window.innerWidth < 992 ? "tab" : "web"}.png")` }}>

      <div className='inner' ref={mainHRef}>

        <div className='title only-web' dangerouslySetInnerHTML={renderHTML(titleWeb)}></div>
        <div className='title only-tab'  dangerouslySetInnerHTML={renderHTML(titleTab)}></div>
        <div className='title only-mob'  dangerouslySetInnerHTML={renderHTML(titleMob)}></div>

        <div className='sub-title only-web'  dangerouslySetInnerHTML={renderHTML(subTitleWeb)}></div>
        <div className='sub-title only-tab' dangerouslySetInnerHTML={renderHTML(subTitleTab)}></div>
        <div className='sub-title only-mob' dangerouslySetInnerHTML={renderHTML(subTitleMob)}></div>

      </div>

    </div>
  )
}

export default BannerMainPages