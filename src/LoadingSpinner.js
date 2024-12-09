import React from 'react'


const LoadingSpinner=()=>{


    return(
        <div
style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh'
}}
>
{/* <div className="spinner-border" role="status">
  <span className="sr-only "></span>
</div> */}
<img style={{height:"40px"}} src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/loader.gif`}></img>
</div>
    )
} 

export default LoadingSpinner