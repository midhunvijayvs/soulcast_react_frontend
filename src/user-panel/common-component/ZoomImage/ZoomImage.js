import React from "react";
import './ZoomImage.css';

const View = ({ url, closeZoom}) => {




  return (
    <div className="zoom-model" >
      <button className="btn-modal-close" onClick={closeZoom}><img  src="/images/close-icon.svg"></img></button>
      <img src={url}></img>
    </div>

  )
}

export default View