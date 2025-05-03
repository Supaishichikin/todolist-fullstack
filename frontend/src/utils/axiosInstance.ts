import axios from "axios";
import { UserRefreshToken } from "../services/AuthServices";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (req) => {

      if (
        req.url?.includes('auth/token/') ||
        req.url?.includes('auth/register/') ||
        req.url?.includes('auth/login/') ||
        req.url?.includes('auth/reset-password/') ||
        req.url?.includes('auth/reset-password-confirm/') 
      ) {
        return req;
      }

      let accessToken = localStorage.getItem('userToken');
      const refreshToken = localStorage.getItem('userRefreshToken');
      
  
      if (!accessToken || !refreshToken) {
        return Promise.reject(new Error("User not authenticated"));
      }
  
      const isExpired = (token: string): boolean => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return Date.now() >= payload.exp * 1000;
        } catch {
          return true;
        }
      };
  
      if (isExpired(accessToken)) {
        try {
          UserRefreshToken(refreshToken).then((response) =>{
            accessToken = response.data.access as string;
            localStorage.setItem('userToken', accessToken);
          })
        } catch (err) {
          localStorage.clear();
          return Promise.reject(err);
        }
      }
  
      req.headers['Authorization'] = `Bearer ${accessToken}`;
      return req;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  

export default axiosInstance;