import React from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import MessagePopup from "./MessagePopup";

<script src="https://accounts.google.com/gsi/client" async defer></script>

const View = () => {
    let navigate = useNavigate();

    return (
        <>
            <MessagePopup
                okClickedFunction={() => navigate('/login')}
                pageName={"email-confirmation"}
                titleWeb={"Verify your<br/>Email Address"}
                titleTab={"Verify your<br/>Email Address"}
                titleMob={"Verify your<br/>Email Address"}
                paraWeb={"Complete the registration process by<br/>verifying your email address."}
                paraTab={"Complete the registration process by<br/>verifying your email address."}
                paraMob={"Complete the registration process by<br/>verifying your email address."}
                buttonText=""
                buttonOnClick=''
                iconTopWeb={'63%'}
                iconLeftWeb={'53%'}
                iconRotationWeb={40}
                iconTopTab={'53%'}
                iconLeftTab={"55%"}
                iconRotationTab={215}
                iconTopMob={'43%'}
                iconLeftMob={150}
                iconRotationMob={-23}
            />
            

        </>
    )
}

export default View;