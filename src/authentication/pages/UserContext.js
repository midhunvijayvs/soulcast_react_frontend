


import { createContext, useState, useEffect } from 'react';
import API from '../../API';


import ErrorModal from "../../ErrorModal";
import PositiveModal from "../../PositiveModal";
import FixedOverlayLoadingSpinner from "../../FixedOverlayLoadingSpinner"

import { useNavigate } from 'react-router-dom';
import MessagePopup from './MessagePopup';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [isLoading, setIsLoading] = useState(false);
  const [roleFromBackend, setRoleFromBackend] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [popupTitle,setPopupTitle]=useState(null)
  const [isOTPInputShown, showOTPInput] = useState(false);
  const [otpTimer, setOtpTimer] = useState(5*60)
  const [otpTimeout, setOtpTimeout] = useState(false)
  
  const [redirectUrl, setRedirectUrl]=useState("/")

  const startOtpTimer = () => {
    setOtpTimeout(false);
    setOtpTimer(5 * 60);
  
    let intervalId = setInterval(() => {
      setOtpTimer((prevTimer) => {
        if (prevTimer === 0) {
          setOtpTimeout(true);
          clearInterval(intervalId);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  };
  
  const refreshIntervalTime = 15*60*1000//15*60*1000//15 minutes.
  useEffect(() => {
    // Check if the authentication token exists in the cookie
    //const accessToken = Cookies.get('accessToken'); use this for more secure login. the token will be removed after page refresh


    if (!!localStorage.getItem('accessToken')) {
      setIsLoggedIn(true);
    }
    if(localStorage.getItem("refreshToken")){
    updateToken();// to do a refresh when the app loadding for the first time. other wise it will do only after the first 4 minutes. this is for loging out just after opening the app after a closing the tab from the user side.
    let intervalId = setInterval(() => {
      updateToken();
    }, refreshIntervalTime);  //on 4 minutes 4*60*2000

    return () => {
      clearInterval(intervalId);
    };
  }
  }, [isLoggedIn]);

  const login = (formData) => {
    setIsLoading(true)
    let url;
    if (isOTPInputShown) {
      url = "/user/submit_otp/"
    }
    else {
      url = "/user/login/"
    }
    API.post(url, formData).then(response => {
      setIsLoading(false)
      if (response.data.access_token === "otp_required") {
        localStorage.setItem('userID', response.data.user_id);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userRoleRequest', 'admin');
        setRedirectUrl("/admin")

        showOTPInput(true)
        startOtpTimer()
      }
      else {
        setMessage("Logged in succesfully");
        // setPopupTitle("Logged in succesfully");
        navigate(redirectUrl)
        setRedirectUrl("/")
        // Store the token in an HTTP-only cookie
        //Cookies.set('accessToken', response.data.token, { secure: true, sameSite: 'strict', httpOnly: true }); use this for more secure login. the token will be removed after page refresh
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('userID', response.data.user_id);
        localStorage.setItem('refreshToken', response.data.refresh_token)
        setRoleFromBackend(response.data.role)
        // setIsMessageModalOpen(true);
        setIsLoggedIn(true);
      }
    })
      .catch(error => {
        console.log("error",error )
        setMessage(error.response?error.response.data.error:"No connection!");
        setIsErrorModalOpen(true);
        setIsLoading(false)
      });

  };

  const updateToken = () => {

    API.post(`/user/token/refresh/`, {
      "refresh": localStorage.getItem('refreshToken')
    })
      .then(response => {
        localStorage.setItem('accessToken', response.data.access);
      })
      .catch(error => {
        logout()
        setPopupTitle("Session Expired! You have logged out of the session! Please login again to continue..")
        setMessage("You have logged out of the session! Please login again to continue..")
        setRedirectUrl("/login")
        setIsMessageModalOpen(true)
      });
  }

  const logout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    

  };

  const redirect = () => {
    if (roleFromBackend === "admin") {
      localStorage.setItem("userRole", "admin")
      navigate('/admin')
    }

    else {
      localStorage.setItem("userRole", "user")

      navigate(redirectUrl)
      console.log("before reload")
      window.location.reload()
    }
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout, isOTPInputShown, showOTPInput,otpTimer, otpTimeout, setRedirectUrl }}>
      {children}
      {isLoading && <FixedOverlayLoadingSpinner />}
      <ErrorModal message={message} state={isErrorModalOpen} setterFunction={setIsErrorModalOpen} okClickedFunction={() => { }} />
      {/* {isMessageModalOpen&&<PositiveModal title={popupTitle} message={message}  setterFunction={setIsMessageModalOpen} okClickedFunction={redirect} />} */}
      {isMessageModalOpen&&
      <MessagePopup 
        setterFunction={setIsMessageModalOpen}
        okClickedFunction={redirect}
        pageName={""}
        titleWeb={popupTitle}
        titleTab={popupTitle}
        titleMob={popupTitle}
        paraWeb={""}
        paraTab={""}
        paraMob={""}
        buttonText=""
        buttonOnClick=''
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
      }

    </UserContext.Provider>
  );
};
