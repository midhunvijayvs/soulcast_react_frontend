import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://13.203.57.21', // Set your fixed base URL here "https://soulcast-django-backend.onrender.com/" 'https://sibufishnmeat.co.uk'    'https://friendsmalayali.uk'
  headers: {
    'Content-Type': 'application/json',
    // 'Set-Cookie': 'secure',                                                                                  // 'Cache-Control': 'max-age=31536000', // Add the Cache-Control header
    //'Strict-Transport-Security': 'max-age=315360000; includeSubDomains; preload', // Add the HSTS header
     //'X-Frame-Options':'DENY',  // Add X-Frame-Options header to prevent clickjacking
     //'X-Content-Type-Options': 'nosniff',                                                                                   
     //Permissions-Policy: <directive> <allowlist>  // no need for this. it is for camera mic etc permitions.
     // Note: About content security policy header: it is to be added from the backend to the response header, not from frontend.
  },

}); 

// Request interceptor to conditionally add Authorization header
instance.interceptors.request.use(
  config => {
    const isLoginAPI = config.url === '/api/login/';

    if (!isLoginAPI) {
      // Include the authentication token from the cookie
      //const authToken = Cookies.get('authToken');use this for more secure login. the token will be removed after page refresh
      const authToken = localStorage.getItem('accessToken')
      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;

