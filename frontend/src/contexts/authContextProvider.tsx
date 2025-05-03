import { useState, useEffect, useMemo, useContext } from "react";
import AuthContext from "./authContext";
import { AuthProviderInterface } from "../types/users";
import { UserLogin, UserLogout, UserRefreshToken } from "../services/AuthServices";

function isTokenExpired(token: string) {
    if (!token) {
      return true;
    }
    const tokenParts = token.split('.');
    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    const expirationTime = tokenPayload.exp * 1000;
    return Date.now() >= expirationTime;
}

export const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
    const accessToken = localStorage.getItem("userToken") as string;
    const refreshToken = localStorage.getItem("userRefreshToken") as string;

    const [userToken, setUserToken] = useState<string | null>(accessToken
    !== null && !isTokenExpired(accessToken) ? accessToken : null);
    const userRefreshToken = refreshToken
    !== null && !isTokenExpired(refreshToken) ? refreshToken : null;
    const [isAuthenticated, setIsAuthenticated] = useState(userToken !== null);

    useEffect(() => {
        if (userToken !== null) {
            setIsAuthenticated(true);
        } else if (userRefreshToken) {
            UserRefreshToken(refreshToken).then((response) => {
                setUserToken(response.data.access)
                localStorage.setItem('userToken', response.data.access)
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
        if (response.status !== 200) {
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
            login, 
            logout, 
            isAuthenticated, 
            updateUserToken: (token: string) => setUserToken(token) 
        }), [userToken, isAuthenticated])}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}