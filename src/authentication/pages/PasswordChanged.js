import React from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MessagePopup from "./MessagePopup";
<script src="https://accounts.google.com/gsi/client" async defer></script>

const View = () => {
    
    let navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("userRoleRequest", "user")
        const redirectTimeout = setTimeout(() => {
            navigate("/login");
        }, 50000);

        return () => clearTimeout(redirectTimeout);

    }, [])

    return (
        <>
            <MessagePopup
                okClickedFunction={() => navigate('/login')}
                pageName={"password-changed"}
                titleWeb={"Your Password has been<br/>Reset Successfully !!!"}
                titleTab={"Your Password<br/>has been Reset<br/>Successfully !!!"}
                titleMob={"Your<br/>Password has<br/>been Reset<br/>Successfully !!!"}
                paraWeb={"Access your account<br/> securely with your newly reset password."}
                paraTab={"Access your account securely<br/> with your newly reset password. "}
                paraMob={"Access your account<br/> securely with your<br/> newly reset password. "}
                buttonText="LOGIN IN NOW"
                buttonOnClick='/login'
                iconTopWeb={'50%'}
                iconLeftWeb={'70%'}
                iconRotationWeb={0}
                iconTopTab={'53%'}
                iconLeftTab={"55%"}
                iconRotationTab={215}
                iconTopMob={'50%'}
                iconLeftMob={170}
                iconRotationMob={-23}
            />
        </>
    )
}

export default View;