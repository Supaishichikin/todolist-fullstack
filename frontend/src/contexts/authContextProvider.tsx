/**
 * Context provider to share auth informations and operations within the entire app
 */

import { useState, useEffect, useMemo, useContext } from "react";
import AuthContext from "./authContext";
import { AuthProviderInterface } from "../types/users";
import { UserLogin, UserLogout } from "../services/AuthServices";
import { handleAuthRefresh, isTokenExpired } from "../utils/authTokenRefresh";


export const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
    const accessToken = localStorage.getItem("userToken") ?? null;
    const refreshToken = localStorage.getItem("userRefreshToken") ?? null;

    const [userToken, setUserToken] = useState<string | null>(accessToken
    !== null && !isTokenExpired(accessToken) ? accessToken : null);
    const [userRefreshToken, setUserRefreshToken] = useState(refreshToken
    !== null && !isTokenExpired(refreshToken) ? refreshToken : null);
    const [isAuthenticated, setIsAuthenticated] = useState(userToken !== null);

    useEffect( () => {
        if (userToken !== null) {
            setIsAuthenticated(true);
        } else if (userRefreshToken !== null) {
            handleAuthRefresh().then((response) => {
                if(response.access){
                    setIsAuthenticated(true);
                    setUserToken(response.access)
                }else{
                    setIsAuthenticated(false);
                }
            })
        } else {
            setIsAuthenticated(false);
            localStorage.clear()
        }
    }, [userToken]);


    async function login(username: string, password: string) {
        const response = await UserLogin(username, password);
      
        if (response?.status === 200) {
          const { access, refresh } = response.data;
          setUserToken(access);
          localStorage.setItem('userToken', access);
          localStorage.setItem('userRefreshToken', refresh);
          setIsAuthenticated(true);
        }
      
        return response;
      }
         

    async function logout(token: string) {
        const response = await UserLogout(token);
        if (response.status !== 205) {
            throw new Error(response.error ?? 'Logout failed');
        }
        setUserToken(null);
        setIsAuthenticated(false);
        localStorage.clear();
        return response;
    }

    return (
        <AuthContext.Provider value={useMemo(() => ({ 
            userToken,
            userRefreshToken,
            setUserToken,
            setUserRefreshToken,
            login, 
            logout, 
            isAuthenticated, 
            setIsAuthenticated,
            updateUserToken: (token: string) => setUserToken(token) 
        }), [userToken, isAuthenticated])}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}