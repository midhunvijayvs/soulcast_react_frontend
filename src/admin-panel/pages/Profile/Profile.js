import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import API from '../../../API';
import axios from 'axios';
import '../../common-components/ImageUploader.css'
import './Profile.css'
import ErrorModal from "../../../ErrorModal";
import PositiveModal from "../../../PositiveModal";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner"

const Profile = () => {

  const navigate=useNavigate()

  const [userData, setUserData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [message, setMessage] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [imageError, setImageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  useEffect(() => {
    $(function() {
  $(window).scrollTop(0);
  });
  }, []) 
  useEffect(() => {
    loadData();

  }, []);


  const loadData = () => {
    API.get(`/users/${window.localStorage.getItem('userID')}`)
      .then(response => {

        API.get(`/profile_image/${userID}`)
          .then(imgresponse => {

            if (imgresponse.data.profile_image) {

              setPreviewImage(`https://sibufishnmeat.co.uk${imgresponse.data.profile_image}`);
            }

            response.data.dob = imgresponse.data.dob;
            response.data.gender = imgresponse.data.gender;

            setUserData(response.data)
          }
          )
          .catch(error =>
            console.error('Error fetching preview image:', error))

      })
      .catch(error => {
        console.error(error);
      });
  }





  useEffect(() => {

    if (userData) {
      $("#first_name").val(userData.first_name)
      $("#last_name").val(userData.last_name)
      $("#email").val(userData.email)
      $("#phone").val(userData.phonenumber)
      let date = new Date()

      console.log("userData.dob", userData.dob)
      //  date.setDate(userData.dob)
      console.log("date.toISOString().substr(0, 10) ", date.toISOString().substr(0, 10))
      $("#dob").val(userData.dob)
      $("#gender").val(userData.gender).change()
    }
  }, [userData])






  const userID = localStorage.getItem('userID'); // Fetch the user ID from local storage




  const handleImageSelect = (event) => {
    const file = event.target.files[0];

    // Check image dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const validAspectRatio = aspectRatio >= 0.9 && aspectRatio <= 1.1;


      if (img.width <= 150 && img.height <= 150 && validAspectRatio) {
        if (file.size <= 300 * 1024) { // Max size in bytes (300 KB)
          setImageError(null)
          setIsImgLoading(true);
          setPreviewImage(URL.createObjectURL(file));

          const formData = new FormData();
          formData.append('profile_image', file);

          axios
            .put(`https://sibufishnmeat.co.uk/profile_image/${userID}/`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
            .then((res) => {
              setMessage("Profile image updated successfuly!")
              setIsMessageModalOpen(true)
              setIsImgLoading(false);
            })
            .catch((error) => {
              setIsImgLoading(false);
              console.error('Error uploading image:', error);
            });
        }
        else {
          setImageError('Image file size is too large.');
        }
      } else {
        setImageError('Image dimensions are not within the specified limits.');
      }
    };
  };




  const handleImageDelete = async () => {
    try {
      await API.delete(`/profile_image/${userID}`);
      setPreviewImage(null);
      window.location.reload()
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const update = () => {

    setIsLoading(true)
    const formData = new FormData();
    formData.append('first_name', $("#first_name").val());
    formData.append('last_name', $("#last_name").val());
    formData.append('email', $("#email").val());
    formData.append('phone', $("#phone").val());
    formData.append('dob', $("#dob").val());
    formData.append('gender', $("#gender").val());

    axios.put(`https://sibufishnmeat.co.uk/profile_image/${userID}/`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        }
      })

      .then(res => {
        loadData();
        setIsLoading(false)
        setMessage("Details updated successfuly!")
        setIsMessageModalOpen(true)
      })

      .catch(error => {
        setIsLoading(false)
        console.error('Error uploading :', error);
      })

  }


  return (
    <div>
      <div className='w-100 d-flex  flex-lg-row mt-2 mt-lg-5 cr'>


        <div className='form-section me-3 bg-white box-shadow radius-11 p-5  mb-lg-0'>
          <div className='brick-clr fw-600 mb-3'>Edit Profile</div>
          <div className='d-flex justify-content-between align-items-center mb-2'>
            {/* <button className='white-btn px-3'><i className="fa-solid fa-pencil"></i></button> */}
          </div>
          <div className='w-100 d-block d-md-flex '>
            <div className='w-50 me-2 mb-3'>
              <div className='f-13 clr-898989 mb-1'>First Name</div>
              <input id="first_name" name="first_name" className='inp-D9D9D9 f-xs fw-500 w-100' required></input>
            </div>
            <div className='w-50 mb-3'>
              <div className='f-13 clr-898989 mb-1'>Last Name</div>
              <input id="last_name" name="last_name" className='inp-D9D9D9 f-xs fw-500 w-100' required></input>
            </div>
          </div>
          <div className='w-100 d-block d-md-flex'>
            <div className='w-50 me-2 mb-3'>
              <div className='f-13 clr-898989 mb-1'>Phone Number</div>
              <input id="phone" name="phone" className='inp-D9D9D9 f-xs fw-500 w-100' required></input>
            </div>
            <div className='w-50 mb-3'>
              <div className='f-13 clr-898989 mb-1'>Email</div>
              <input id="email" name="email" className='inp-D9D9D9 f-xs fw-500 w-100' disabled></input>
            </div>
          </div>
          <div className='w-100 d-block d-md-flex'>
            <div className='w-50 me-2 mb-3'>
              <div className='f-13 clr-898989 mb-1'>Date of birth ( Optional)</div>
              <input type="date" id="dob" name="dob" className='inp-D9D9D9 f-xs fw-500 w-100'></input>
            </div>
            <div className='w-50 mb-3'>
              <div className='f-13 clr-898989 mb-1'>Gender</div>
              <select className="form-select" id="gender" name="gender" >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
                <option value={2}>LGBTQ</option>
              </select>
            </div>
          </div>
          <div className='d-flex justify-content-end mt-3 button-box'>
            <button className='f-xs fw-500 lightbrick-btn px-4 me-3' onClick={() => update()}>Update</button>
            <button className='f-xs fw-500 white-btn px-4' onClick={() => {navigate('/admin')}}>Cancel</button>
          </div>
        </div>

        <div className='img-section bg-white box-shadow radius-11 mb-3 mb-lg-0 p-4'>

          <div className="profile-image-uploader d-flex flex-column justify-content-center align-items-center" style={{ position: "static", zIndex: 1, backgroundColor: "transparent", height: "fit-content" }}>

            <div className="image-preview-box">

              {previewImage ?
                <img src={previewImage} alt="" style={isImgLoading ? { opacity: '40%' } : { opacity: '100%' }} className="preview-image" />
                :
                <img src="/images/profile/avatar-no-profile-image.png"></img>
              }
              {previewImage &&
                <button className="btn btn-small-danger d-flex justify-content-center  w-100 delete-btn" onClick={handleImageDelete}> <svg className="me-2" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.9878 6.41309H3.98779V9.41309C5.09236 9.41309 5.98779 10.3085 5.98779 11.4131V15.4131C5.98779 18.2415 5.98779 19.6557 6.86647 20.5344C7.74515 21.4131 9.15937 21.4131 11.9878 21.4131H13.9878C16.8162 21.4131 18.2304 21.4131 19.1091 20.5344C19.9878 19.6557 19.9878 18.2415 19.9878 15.4131V11.4131C19.9878 10.3085 20.8832 9.41309 21.9878 9.41309V6.41309ZM11.4878 11.4131C11.4878 10.8608 11.0401 10.4131 10.4878 10.4131C9.93551 10.4131 9.48779 10.8608 9.48779 11.4131V16.4131C9.48779 16.9654 9.93551 17.4131 10.4878 17.4131C11.0401 17.4131 11.4878 16.9654 11.4878 16.4131V11.4131ZM16.4878 11.4131C16.4878 10.8608 16.0401 10.4131 15.4878 10.4131C14.9355 10.4131 14.4878 10.8608 14.4878 11.4131V16.4131C14.4878 16.9654 14.9355 17.4131 15.4878 17.4131C16.0401 17.4131 16.4878 16.9654 16.4878 16.4131V11.4131Z" fill="#fff" fill-opacity="0.85" />
                  <path d="M11.0559 3.78368C11.1699 3.67736 11.421 3.58341 11.7703 3.51641C12.1196 3.4494 12.5475 3.41309 12.9878 3.41309C13.4281 3.41309 13.856 3.4494 14.2053 3.51641C14.5546 3.58341 14.8057 3.67736 14.9196 3.78368" stroke="#fff" strokeOpacity="0.85" strokeWidth="2" stroke-linecap="round" />
                </svg>Remove Image</button>}
              {isImgLoading &&
                <div
                  style={{

                    position: "absolute",
                    zIndex: "201",
                    top: "200px"
                  }}
                >
                  <div className="spinner-border" role="status">
                    <span className="sr-only "></span>
                  </div>
                </div>}

            </div>

            <div className=" mb-2 d-flex justify-content-center">
              <input className="btn btn-secondary image-input-button w-100" type="file" accept="image/*" onChange={handleImageSelect} />

            </div>


            {imageError && <p className="img-error-msg">{imageError}</p>}
            <p className="image-instruction text-center"> File size should be less than 300kB<br></br>
              File resolution Max height: 150px and Max width:150px, in a square aspect ratio. </p>



          </div>
        </div>

        {/* <div className='w-50-resp-mob bg-white box-shadow radius-11 p-3'>
                        <div className='brick-clr fw-600 mb-3'>Address</div>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div className='fw-500 f-xs'>Edit Address</div>
                        </div>
                        <div className='w-100 d-flex mb-3'>
                            <div className='w-50 me-2'>
                                <div className='f-13 clr-898989 mb-1'>Address/Street</div>
                                <input className='inp-D9D9D9 f-xs fw-500 w-100' value='76 Hertingfordbury Rd'></input>
                            </div>
                            <div className='w-50'>
                                <div className='f-13 clr-898989 mb-1'>Postal Code</div>
                                <input className='inp-D9D9D9 f-xs fw-500 w-100' value='TR8 7HE'></input>
                            </div>
                        </div>
                        <div className='w-100 d-flex mb-3'>
                            <div className='w-50 me-2'>
                                <div className='f-13 clr-898989 mb-1'>City/Town</div>
                                <input className='inp-D9D9D9 f-xs fw-500 w-100' value='Newlyn East'></input>
                            </div>
                            <div className='w-50'>
                                <div className='f-13 clr-898989 mb-1'>Coutry</div>
                                <input className='inp-D9D9D9 f-xs fw-500 w-100' value='United Kingdom'></input>
                            </div>
                        </div>
                        <div className='w-100 d-flex mb-3'>
                            <div className='w-50 me-2'>
                                <div className='f-13 clr-898989 mb-1'>Address Type</div>
                                <select name="addresstype" id="addresstype" className='inp-D9D9D9 f-xs fw-500 w-100'>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                </select>
                            </div>
                        </div>
                    </div> */}


      </div>
      <ErrorModal state={isErrorModalOpen} message={message} setterFunction={setIsErrorModalOpen} okClickedFunction={loadData} />
      {isMessageModalOpen&&<PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={() => window.location.reload()} />}
      {isLoading && <FixedOverlayLoadingSpinner />}
    </div>
  )

}

export default Profile