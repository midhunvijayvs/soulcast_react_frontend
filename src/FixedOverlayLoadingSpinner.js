
import React from 'react'


const LoadingSpinner=()=>{


    return(
        <div
style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width:"100vw",
  position:"fixed",
  zIndex:"999",
  top:0
}}
>
<div className="spinner-border" role="status">
  <span className="sr-only "></span>
</div>
</div>
    )
} 

export default LoadingSpinner