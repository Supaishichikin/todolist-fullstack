/**
 * Creation of an axios instance to handle requests authorizations 
 * on routes and refresh token
 */
import axios from "axios";
import { handleAuthRefresh, isTokenExpired } from "./authTokenRefresh";

// Base axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});

// Interceptor to handle requests authorizations and refresh token
axiosInstance.interceptors.request.use(
    async (req) => {
      /**
       * exclude free acess pages from authorization handling 
       */
      if (
        req.url?.includes('auth/token/') ||
        req.url?.includes('auth/register/') ||
        req.url?.includes('auth/login/') ||
        req.url?.includes('auth/reset-password/') ||
        req.url?.includes('auth/reset-password-confirm/') 
      ) {
        return req;
      }

      //Authorization header handling

      //Retrieve access token from localstorage
      let accessToken = localStorage.getItem('userToken');
  
      // if exist, check if token as expired
      if(accessToken){
        if (isTokenExpired(accessToken)) {
            // handling refresh token
            const response = await handleAuthRefresh();
            if(response.access){
                accessToken = response.access;
            }
        }
      }
      // Add Authorization header with a valid token
      req.headers['Authorization'] = `Bearer ${accessToken}`;
      return req;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  

export default axiosInstance;