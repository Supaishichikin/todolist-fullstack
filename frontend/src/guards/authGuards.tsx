import {useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/authContextProvider"; 
import { useEffect } from "react";

interface RequireAuthInterface {
    children?: React.ReactNode
}

export const AuthGuard: React.FC<RequireAuthInterface> = ({children}) => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!auth?.isAuthenticated){
            navigate('/login')
        }
    },[auth])
    
    return (
        <>
            {children}
        </>
    );
}